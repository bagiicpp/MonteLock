import { Elysia } from "elysia";
import {
  handleSaltRequest,
  handleRegister,
  handleLogin,
  handleVerifyOTP,
} from "../../api/authHandlers";

export const authRoutes = new Elysia({ prefix: "/api/auth" })
  .post("/salt", handleSaltRequest)
  .post("/register", handleRegister)
  .post("/login", handleLogin)
  .post("/verify-otp", handleVerifyOTP);
