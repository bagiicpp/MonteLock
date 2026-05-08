import React, { useState } from "react";
import { argon2id } from "hash-wasm";
import {
  Lock,
  Terminal,
  ShieldAlert,
  Settings2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import ShapeGrid from "../components/ShapeGrid";

type AuthStep = "INIT" | "OTP";
type AuthMode = "LOGIN" | "REGISTER";
type KdfAlgorithm = "argon2id" | "pbkdf2";

interface AuthState {
  step: AuthStep;
  mode: AuthMode;
  email: string;
  username: string;
  masterKeyCache: Uint8Array | null;
}

export const AuthGates = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [state, setState] = useState<AuthState>({
    step: "INIT",
    mode: "LOGIN",
    email: "",
    username: "",
    masterKeyCache: null,
  });

  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [kdfAlgorithm, setKdfAlgorithm] = useState<KdfAlgorithm>("argon2id");
  const [kdfIterations, setKdfIterations] = useState(3);

  const handleAlgoChange = (algo: KdfAlgorithm) => {
    setKdfAlgorithm(algo);
  };

  const deriveKeys = async (
    pass: string,
    salt: string,
    algo: KdfAlgorithm,
    iterations: number,
  ) => {
    const enc = new TextEncoder();

    if (algo === "argon2id") {
      const saltBytes = enc.encode(salt);
      const authHashHex = await argon2id({
        password: pass,
        salt: saltBytes,
        parallelism: 1,
        iterations: iterations,
        memorySize: 65536,
        hashLength: 32,
        outputType: "hex",
      });

      const vaultSaltBytes = enc.encode(salt + "vault");
      const vaultKeyHex = await argon2id({
        password: pass,
        salt: vaultSaltBytes,
        parallelism: 1,
        iterations: iterations,
        memorySize: 65536,
        hashLength: 32,
        outputType: "hex",
      });

      const vaultKey = new Uint8Array(
        vaultKeyHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)),
      );
      return { authHash: authHashHex, vaultKey };
    } else {
      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        enc.encode(pass),
        { name: "PBKDF2" },
        false,
        ["deriveBits"],
      );

      const authBits = await crypto.subtle.deriveBits(
        {
          name: "PBKDF2",
          salt: enc.encode(salt + "auth"),
          iterations,
          hash: "SHA-256",
        },
        keyMaterial,
        256,
      );

      const vaultBits = await crypto.subtle.deriveBits(
        {
          name: "PBKDF2",
          salt: enc.encode(salt + "vault"),
          iterations,
          hash: "SHA-256",
        },
        keyMaterial,
        256,
      );

      const authHash = Array.from(new Uint8Array(authBits))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      return { authHash, vaultKey: new Uint8Array(vaultBits) };
    }
  };

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const saltResponse = await fetch(`/api/auth/salt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: state.email, mode: state.mode }),
      });

      const saltData = await saltResponse.json().catch(() => null);

      if (!saltResponse.ok || !saltData) {
        throw new Error(
          saltData?.error || "Could not retrieve vault coordinates.",
        );
      }

      const {
        salt,
        kdfAlgorithm: serverAlgo,
        kdfIterations: serverIters,
      } = saltData;

      const activeAlgo = state.mode === "REGISTER" ? kdfAlgorithm : serverAlgo;
      const activeIters =
        state.mode === "REGISTER" ? kdfIterations : serverIters;

      const { authHash, vaultKey } = await deriveKeys(
        password,
        salt,
        activeAlgo,
        activeIters,
      );

      const endpoint =
        state.mode === "REGISTER" ? "/api/auth/register" : "/api/auth/login";
      const payload =
        state.mode === "REGISTER"
          ? {
              email: state.email,
              username: state.username,
              authHash,
              salt,
              kdfAlgorithm: activeAlgo,
              kdfIterations: activeIters,
            }
          : { email: state.email, authHash };

      const authResponse = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!authResponse.ok) {
        const errorData = await authResponse.json().catch(() => null);
        const errorMsg =
          errorData?.error || errorData || "Authentication failed.";
        throw new Error(errorMsg);
      }

      setState((prev) => ({ ...prev, step: "OTP", masterKeyCache: vaultKey }));
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: state.email, code: otp }),
      });

      if (!response.ok)
        throw new Error("Invalid or expired authorization code.");

      const { user } = await response.json();

      if (state.mode === "REGISTER") {
        setState({
          step: "INIT",
          mode: "LOGIN",
          email: state.email,
          username: "",
          masterKeyCache: null,
        });
        setOtp("");
        setPassword("");
        setError("Vault provisioned. Please initialize login.");
      } else {
        if (state.masterKeyCache) {
          login(user, state.masterKeyCache);
          navigate("/dashboard");
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 font-mono overflow-hidden bg-[#03050d]">
      <div className="absolute inset-0 z-0 w-full h-full">
        <ShapeGrid
          speed={0.3}
          squareSize={40}
          direction="diagonal"
          borderColor="rgba(16, 185, 129, 0.15)"
          hoverFillColor="rgba(16, 185, 129, 0.15)"
          shape="square"
          hoverTrailAmount={4}
        />
      </div>

      {/* Foreground Auth Card with backdrop-blur for glass effect */}
      <div className="relative z-10 w-full max-w-md border border-emerald-500/20 bg-[#0B1020]/90 backdrop-blur-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-xl">
        <div className="flex items-center gap-3 border-b border-white/10 pb-5 mb-6">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-400/10 border border-emerald-300/20 text-emerald-300">
            <Terminal className="h-4 w-4" />
          </div>
          <h1 className="text-sm font-semibold tracking-[0.2em] uppercase text-white">
            MonteLock Gates
          </h1>
        </div>

        {error && (
          <div
            className={`mb-6 flex items-center gap-3 border p-3 text-xs ${
              error.includes("provisioned")
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                : "border-red-500/20 bg-red-500/10 text-red-400"
            }`}
          >
            <ShieldAlert className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}

        {state.step === "INIT" ? (
          <form onSubmit={handleInitialSubmit} className="space-y-5">
            {state.mode === "REGISTER" && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Operator Handle
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-white/10 bg-[#050812] p-3 text-sm text-white focus:border-emerald-500/50 focus:bg-[#0B1020] focus:outline-none transition-colors"
                  value={state.username}
                  onChange={(e) =>
                    setState((s) => ({ ...s, username: e.target.value }))
                  }
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Comm Vector (Email)
              </label>
              <input
                type="email"
                required
                className="w-full border border-white/10 bg-[#050812] p-3 text-sm text-white focus:border-emerald-500/50 focus:bg-[#0B1020] focus:outline-none transition-colors"
                value={state.email}
                onChange={(e) =>
                  setState((s) => ({ ...s, email: e.target.value }))
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Master Cipherphrase
              </label>
              <input
                type="password"
                required
                className="w-full border border-white/10 bg-[#050812] p-3 text-sm text-white focus:border-emerald-500/50 focus:bg-[#0B1020] focus:outline-none transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {state.mode === "REGISTER" && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-emerald-300 transition-colors"
                >
                  <Settings2 className="h-4 w-4" /> Advanced KDF Control
                  {showAdvanced ? (
                    <ChevronUp className="h-3 w-3" />
                  ) : (
                    <ChevronDown className="h-3 w-3" />
                  )}
                </button>

                {showAdvanced && (
                  <div className="mt-4 space-y-4 border border-emerald-300/10 bg-emerald-300/[0.02] p-4 rounded-xl">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase text-slate-500">
                        Algorithm
                      </label>
                      <select
                        className="w-full border border-white/10 bg-[#050812] p-2 text-sm text-white focus:outline-none"
                        value={kdfAlgorithm}
                        onChange={(e) =>
                          handleAlgoChange(e.target.value as KdfAlgorithm)
                        }
                      >
                        <option value="argon2id">Argon2id (Recommended)</option>
                        <option value="pbkdf2">
                          PBKDF2-SHA256 (Legacy strict)
                        </option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase text-slate-500">
                        Work Factor (Iterations)
                      </label>
                      <input
                        type="number"
                        min={1}
                        className="w-full border border-white/10 bg-[#050812] p-2 text-sm text-white focus:outline-none"
                        value={kdfIterations}
                        onChange={(e) =>
                          setKdfIterations(parseInt(e.target.value) || 1)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-400 p-3 text-sm font-bold text-[#04100b] hover:bg-emerald-300 disabled:opacity-50 transition-colors mt-6 rounded-xl"
            >
              {loading
                ? "DERIVING KDF..."
                : state.mode === "LOGIN"
                  ? "INITIALIZE LOGIN"
                  : "PROVISION VAULT"}
            </button>

            <button
              type="button"
              onClick={() =>
                setState((s) => ({
                  ...s,
                  mode: s.mode === "LOGIN" ? "REGISTER" : "LOGIN",
                }))
              }
              className="w-full text-center text-xs text-slate-500 hover:text-emerald-400 mt-4 tracking-wider uppercase"
            >
              Switch to {state.mode === "LOGIN" ? "Provisioning" : "Login"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex justify-between">
                <span>Authorization Code</span>
                <span className="text-emerald-500/70">Sent to Vector</span>
              </label>
              <input
                type="text"
                maxLength={6}
                required
                className="w-full border border-white/10 bg-[#050812] p-4 text-center text-3xl tracking-[0.5em] text-white focus:border-emerald-500/50 focus:bg-[#0B1020] focus:outline-none transition-colors"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-emerald-400 p-3 text-sm font-bold text-[#04100b] hover:bg-emerald-300 mt-6 rounded-xl"
            >
              <Lock className="h-4 w-4" />{" "}
              {loading ? "VERIFYING..." : "UNLOCK VAULT"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
