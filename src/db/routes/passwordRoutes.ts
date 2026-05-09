// src/db/routes/passwordRoutes.ts
import { Elysia, t } from "elysia";
import { jwt } from "@elysia/jwt";
import { db } from "../index";
import { passwords } from "../schema";
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
