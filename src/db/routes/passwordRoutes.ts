// src/db/routes/passwordRoutes.ts
import { Elysia, t } from "elysia";
import { jwt } from "@elysia/jwt";
import { db } from "../index";
import { passwords, users } from "../schema";
import { eq } from "drizzle-orm";

export const passwordRoutes = new Elysia({ prefix: "/api/passwords" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET || "MONTE_LOCK_V1_SECRET_KEY",
    }),
  )
  // GET /api/passwords
  .get("/", async ({ jwt, request, set }) => {
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
    if (!payload || typeof payload !== "object" || !payload.sub) {
      set.status = 401;
      return { error: "Invalid session" };
    }
    const userPasswords = await db
      .select()
      .from(passwords)
      .where(eq(passwords.userId, payload.sub as string));
    return userPasswords;
  })
  // POST /api/passwords - ПОПРАВЕНА ВАЛИДАЦИЈА
  .post(
    "/",
    async ({ body, jwt, request, set }) => {
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
      if (!payload || typeof payload !== "object" || !payload.sub) {
        set.status = 401;
        return { error: "Invalid session" };
      }

      const {
        title,
        encryptedUsername,
        encryptedPassword,
        encryptedUrl,
        encryptedNotes,
        iv,
        authTag,
      } = body;

      const [newPassword] = await db
        .insert(passwords)
        .values({
          userId: payload.sub as string,
          title,
          encryptedUsername: encryptedUsername || null,
          encryptedPassword,
          encryptedUrl: encryptedUrl || null,
          encryptedNotes: encryptedNotes || null,
          iv,
          authTag,
        })
        .returning();

      return newPassword;
    },
    {
      body: t.Object({
        title: t.String(),
        encryptedUsername: t.Union([t.String(), t.Null()]), // ← ПРИФАЌА null
        encryptedPassword: t.String(),
        encryptedUrl: t.Union([t.String(), t.Null()]), // ← ПРИФАЌА null
        encryptedNotes: t.Union([t.String(), t.Null()]), // ← ПРИФАЌА null
        iv: t.String(),
        authTag: t.String(),
      }),
    },
  )
  // DELETE /api/passwords/:id
  .delete("/:id", async ({ params, jwt, request, set }) => {
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
    if (!payload || typeof payload !== "object" || !payload.sub) {
      set.status = 401;
      return { error: "Invalid session" };
    }
    await db.delete(passwords).where(eq(passwords.id, params.id));
    return { success: true };
  });

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
