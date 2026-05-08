import { Elysia } from "elysia";
import { jwt } from "@elysia/jwt";
import { authRoutes } from "./routes/authRoutes";

const app = new Elysia()
  // 2. Configure the JWT plugin
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET || "MONTE_LOCK_V1_SECRET_KEY",
      exp: "7d",
    }),
  )
  .onError(({ code, error }) => {
    const message = error instanceof Error ? error.message : "Unknown Error";
    console.error(`[ELYSIA ERROR] Code: ${code} | Message: ${message}`);
    return { error: message };
  })
  .onAfterHandle(({ request, set }) => {
    console.log(`[NETWORK] ${request.method} ${request.url} -> ${set.status}`);
  })
  .use(authRoutes)
  .listen(3000);

console.log(`[ MonteLock OS ] Booting server on port ${app.server?.port}...`);
