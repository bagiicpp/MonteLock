import { db } from "../db/index";
import { users, otps } from "../db/schema";
import { eq } from "drizzle-orm";
import { randomBytes } from "node:crypto";
import { sendVaultOtp } from "../lib/email";

const hashForDatabase = async (clientAuthHash: string) =>
  await Bun.password.hash(clientAuthHash);
const verifyForDatabase = async (clientAuthHash: string, dbHash: string) =>
  await Bun.password.verify(clientAuthHash, dbHash);
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const handleSaltRequest = async ({
  body,
  set,
}: {
  body: any;
  set: any;
}) => {
  console.log("!!! SALT GATE TRIGGERED !!!");
  try {
    const { email, mode } = body;

    if (mode === "REGISTER") {
      return { salt: randomBytes(32).toString("hex") };
    }

    const [user] = await db
      .select({
        salt: users.masterPasswordSalt,
        kdfAlgorithm: users.kdfAlgorithm,
        kdfIterations: users.kdfIterations,
      })
      .from(users)
      .where(eq(users.email, email));

    if (!user) {
      set.status = 404;
      return { error: "Operator not found in the grid." };
    }

    return user;
  } catch (error) {
    console.error("[DATABASE ERROR]", error);
    set.status = 500;
    return { error: "Vault connection failed." };
  }
};

export const handleRegister = async ({
  body,
  set,
}: {
  body: any;
  set: any;
}) => {
  try {
    // 1. Pull 'salt' out of the body
    const { email, username, authHash, salt, kdfAlgorithm, kdfIterations } =
      body;

    console.log(
      `[PROVISIONING] Hash for ${email}: ${authHash.substring(0, 12)}...`,
    );
    const passwordHash = await hashForDatabase(authHash);

    const [user] = await db
      .insert(users)
      .values({
        username,
        email,
        passwordHash,
        masterPasswordSalt: salt,
        kdfAlgorithm: kdfAlgorithm || "argon2id",
        kdfIterations: kdfIterations || 3,
      })
      .returning();

    const code = generateOTP();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    await db.insert(otps).values({ userId: user.id, code, expiresAt });

    console.log("Attempting to send email via Resend...");
    const emailResult = await sendVaultOtp(user.email, code, user.username);
    console.log("Resend API Response:", emailResult);

    return { status: "OTP_SENT" };
  } catch (error: any) {
    // 23505 is the standard PostgreSQL error code for a Unique Violation
    if (error.code === "23505") {
      set.status = 400;
      return {
        error: "Operator handle or Comm Vector (email) is already registered.",
      };
    }

    // Log any other unexpected database or runtime errors so you can see them
    console.error("[SYSTEM FAULT] Registration failed:", error);
    set.status = 500;
    return { error: "Internal server error during vault provisioning." };
  }
};

export const handleLogin = async ({ body, set }: { body: any; set: any }) => {
  const { email, authHash } = body;

  console.log(
    `[LOGIN ATTEMPT] Hash for ${email}: ${authHash.substring(0, 12)}...`,
  );

  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (user) {
    console.log(
      `[DB_DEBUG] Stored Hash for ${email}: ${user.passwordHash.substring(0, 20)}...`,
    );
  }

  if (!user || !(await verifyForDatabase(authHash, user.passwordHash))) {
    set.status = 401;
    return "Invalid credentials";
  }

  const code = generateOTP();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
  await db.insert(otps).values({ userId: user.id, code, expiresAt });

  sendVaultOtp(user.email, code, user.username).catch((err) =>
    console.error("[RESEND ERROR] Failed to dispatch comm vector:", err),
  );

  return { status: "OTP_SENT" };
};

export const handleVerifyOTP = async ({
  body,
  set,
  jwt,
}: {
  body: any;
  set: any;
  jwt: any;
}) => {
  const { email, code } = body;

  const [user] = await db.select().from(users).where(eq(users.email, email));
  if (!user) {
    set.status = 401;
    return "Unauthorized";
  }

  const [validOtp] = await db
    .select()
    .from(otps)
    .where(eq(otps.userId, user.id))
    .limit(1);

  if (!validOtp || validOtp.code !== code || new Date() > validOtp.expiresAt) {
    set.status = 400;
    return "Invalid or expired code";
  }

  await db.delete(otps).where(eq(otps.id, validOtp.id));

  const token = await jwt.sign({
    id: user.id,
    email: user.email,
  });

  set.headers["Set-Cookie"] =
    `session=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=604800`;

  return {
    user: { id: user.id, username: user.username, email: user.email },
  };
};

export const handleGetSession = async ({
  request,
  jwt,
  set,
}: {
  request: any;
  jwt: any;
  set: any;
}) => {
  const cookie = request.headers.get("cookie");
  if (!cookie) {
    set.status = 401;
    return { error: "No session active." };
  }

  const sessionMatch = cookie.match(/session=([^;]+)/);
  if (!sessionMatch) {
    set.status = 401;
    return { error: "Invalid session cookie." };
  }

  try {
    const payload = await jwt.verify(sessionMatch[1]);
    if (!payload || !payload.email) throw new Error("Invalid payload");

    // Fetch the user and salt from the grid
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, payload.email));

    if (!user) {
      set.status = 401;
      return { error: "Operator not found." };
    }

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        masterPasswordSalt: user.masterPasswordSalt, // <-- Pass the salt back to the client
      },
    };
  } catch (error) {
    set.status = 401;
    return { error: "Session verification failed." };
  }
};

export const handleChangePassword = async ({
  body,
  set,
  jwt,
  request,
}: {
  body: any;
  set: any;
  jwt: any;
  request: any;
}) => {
  try {
    const cookie = request.headers.get("cookie");
    if (!cookie) {
      set.status = 401;
      return { error: "Unauthorized" };
    }

    const sessionMatch = cookie.match(/session=([^;]+)/);
    if (!sessionMatch) {
      set.status = 401;
      return { error: "No session" };
    }

    const payload = await jwt.verify(sessionMatch[1]);
    if (!payload || !payload.email) {
      set.status = 401;
      return { error: "Invalid session" };
    }

    const { currentAuthHash, newAuthHash, newSalt } = body;

    // Fetch user to verify their current password hash
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, payload.email));

    if (!user) {
      set.status = 404;
      return { error: "Operator not found." };
    }

    // Verify current auth hash using Bun.password.verify
    const isCurrentValid = await Bun.password.verify(
      currentAuthHash,
      user.passwordHash,
    );

    if (!isCurrentValid) {
      set.status = 401;
      return { error: "Invalid current cipherphrase. Key cycle aborted." };
    }

    // Hash the NEW auth hash for the database
    const hashedNewAuthHash = await Bun.password.hash(newAuthHash);

    // Update the database with the new KDF parameters
    await db
      .update(users)
      .set({
        passwordHash: hashedNewAuthHash,
        masterPasswordSalt: newSalt,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    return { success: true, message: "KDF parameters updated successfully." };
  } catch (error) {
    console.error("[CRYPTO ERROR] Password cycle failed:", error);
    set.status = 500;
    return { error: "Failed to cycle master key on the server." };
  }
};
