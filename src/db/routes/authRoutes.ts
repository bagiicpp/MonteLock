import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users, otps } from "../../db/schema";
import { jwt } from "@elysia/jwt";
import {
  handleSaltRequest,
  handleRegister,
  handleLogin,
  handleGetSession,
  handleChangePassword,
} from "../../api/authHandlers";

export const authRoutes = new Elysia({ prefix: "/api/auth" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET || "MONTE_LOCK_V1_SECRET_KEY",
    }),
  )
  .get("/session", handleGetSession)
  .post("/salt", handleSaltRequest)
  .post("/register", handleRegister)
  .post("/login", handleLogin)
  .post("/change-password", handleChangePassword)
  .post(
    "/verify-otp",
    async ({ body, set, jwt }) => {
      const { code } = body;
      const [otpRecord] = await db
        .select()
        .from(otps)
        .where(eq(otps.code, code));

      if (!otpRecord || otpRecord.expiresAt < new Date()) {
        set.status = 401;
        return { error: "Invalid or expired authorization code." };
      }

      const [foundUser] = await db
        .select()
        .from(users)
        .where(eq(users.id, otpRecord.userId));

      if (!foundUser) {
        set.status = 404;
        return { error: "Operator not found." };
      }

      const token = await jwt.sign({
        sub: foundUser.id,
        email: foundUser.email,
      });

      set.headers["Set-Cookie"] =
        `session=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=604800`;

      await db.delete(otps).where(eq(otps.id, otpRecord.id));

      return {
        user: {
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
          masterPasswordSalt: foundUser.masterPasswordSalt,
        },
      };
    },
    {
      body: t.Object({
        email: t.String(),
        code: t.String(),
      }),
    },
  )
  .post("/logout", ({ set }) => {
    set.headers["Set-Cookie"] =
      "session=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0";
    return { success: true, message: "Operator session terminated." };
  });
