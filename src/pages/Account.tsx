import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { argon2id } from "hash-wasm";
import {
  Key,
  ShieldCheck,
  LogOut,
  ArrowLeft,
  User,
  Mail,
  Fingerprint,
  Lock,
  Clock,
  Database,
  RefreshCw,
  AlertTriangle,
  Loader2,
  Terminal,
  X,
  ShieldAlert,
  CheckCircle2,
  Home,
} from "lucide-react";
import { useNavigate, Link } from "react-router";

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -8, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// --- Change Master Cipherphrase Modal ---
const ChangePasswordModal = ({
  isOpen,
  onClose,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<
    "IDLE" | "PROCESSING" | "SUCCESS" | "ERROR"
  >("IDLE");
  const [errorMessage, setErrorMessage] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const resetForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setStatus("IDLE");
    setErrorMessage("");
  };

  const handleCycleKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatus("ERROR");
      setErrorMessage("New cipherphrases do not match.");
      return;
    }

    setStatus("PROCESSING");
    setErrorMessage("");

    try {
      const enc = new TextEncoder();

      // 1. Re-derive the CURRENT auth hash to verify authorization
      const currentSaltBytes = enc.encode(user.masterPasswordSalt + "auth");
      const currentAuthHash = await argon2id({
        password: currentPassword,
        salt: currentSaltBytes,
        parallelism: 1,
        iterations: 3,
        memorySize: 65536,
        hashLength: 32,
        outputType: "hex",
      });

      // 2. Generate a NEW salt for the new password
      const newRawSalt = crypto.getRandomValues(new Uint8Array(16));
      const newSaltString = Array.from(newRawSalt)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      // 3. Derive the NEW auth hash
      const newSaltBytes = enc.encode(newSaltString + "auth");
      const newAuthHash = await argon2id({
        password: newPassword,
        salt: newSaltBytes,
        parallelism: 1,
        iterations: 3,
        memorySize: 65536,
        hashLength: 32,
        outputType: "hex",
      });

      // 4. Send to backend
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          currentAuthHash,
          newAuthHash,
          newSalt: newSaltString,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(
          errorData?.error || "Failed to authenticate current cipherphrase.",
        );
      }

      setStatus("SUCCESS");

      // Force logout so user re-authenticates with new key
      setTimeout(() => {
        logout();
        navigate("/auth");
      }, 3000);
    } catch (err: any) {
      setStatus("ERROR");
      setErrorMessage(err.message || "An unexpected error occurred.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0B1020]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400/10 border border-emerald-400/20">
              <Key className="h-5 w-5 text-emerald-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">
              Change Master Password
            </h2>
          </div>
          {status !== "SUCCESS" && (
            <button
              onClick={() => {
                onClose();
                resetForm();
              }}
              className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4 text-slate-400" />
            </button>
          )}
        </div>

        <div className="p-6">
          {status === "ERROR" && (
            <div className="flex items-center gap-3 border border-red-500/20 bg-red-500/10 p-4 mb-6 rounded-xl text-sm text-red-400">
              <ShieldAlert className="h-5 w-5 shrink-0" /> {errorMessage}
            </div>
          )}

          {status === "SUCCESS" ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl grid place-items-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              </div>
              <p className="text-lg font-bold text-white mb-2">
                Master Key Updated
              </p>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                Your session will now terminate. Please log back in using your
                new master password.
              </p>
            </div>
          ) : (
            <form onSubmit={handleCycleKey} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase text-slate-400">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#050812] px-4 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none transition-colors"
                />
              </div>
              <div className="h-px w-full bg-white/5 my-2" />
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase text-slate-400">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#050812] px-4 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase text-slate-400">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#050812] px-4 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-white/10 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    resetForm();
                  }}
                  className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={status === "PROCESSING"}
                  className="rounded-lg bg-emerald-400 px-6 py-2.5 text-sm font-bold text-[#04100b] hover:bg-emerald-300 flex items-center gap-2 disabled:opacity-50 cursor-pointer transition-colors shadow-lg shadow-emerald-500/20"
                >
                  {status === "PROCESSING" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      <Key className="h-4 w-4" /> Update Password
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export const Account = () => {
  const { user, masterEncryptionKey, logout, isLoadingSession } = useAuth();
  const navigate = useNavigate();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Redirect to auth if explicitly logged out or missing session
  useEffect(() => {
    if (!isLoadingSession && !user) {
      navigate("/auth");
    }
  }, [user, isLoadingSession, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  // 1. SHOW GLOBAL LOADER (Checking session on refresh)
  if (isLoadingSession) {
    return (
      <div className="min-h-screen bg-[#03050d] flex items-center justify-center">
        <div className="text-center flex flex-col items-center">
          <Loader2 className="animate-spin h-8 w-8 text-emerald-400 mb-4" />
          <p className="text-slate-400 text-sm font-mono tracking-widest uppercase">
            Verifying Operator...
          </p>
        </div>
      </div>
    );
  }

  // 2. UNAUTHORIZED / LOCKED STATE
  if (!user || !masterEncryptionKey) {
    return (
      <div className="min-h-screen bg-[#03050d] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.05),transparent_60%)] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-xl border border-red-500/20 bg-[#0B1020]/90 backdrop-blur-xl p-8 text-center"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <Lock className="h-8 w-8 text-red-400" />
          </div>
          <div className="text-red-400 font-bold tracking-[0.2em] uppercase mb-2">
            Vault Locked
          </div>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            Encryption keys are missing from memory. Please authenticate to
            access secure settings.
          </p>
          <Link
            to="/dashboard"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-400/10 border border-emerald-400/20 px-6 py-3 text-sm font-bold text-emerald-400 hover:bg-emerald-400/20 transition-all cursor-pointer"
          >
            <ShieldCheck className="h-4 w-4" /> Re-Initialize Session
          </Link>
        </motion.div>
      </div>
    );
  }

  // 3. MAIN ACCOUNT UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#03050d] via-[#050812] to-[#0a0f1a] text-slate-300 font-sans flex flex-col overflow-hidden selection:bg-emerald-500/30">
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.03),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 border-b border-white/5 bg-[#0B1020]/60 backdrop-blur-xl"
      >
        <div className="flex h-16 items-center justify-between px-6 lg:px-8 max-w-6xl mx-auto w-full">
          {/* UPDATED: Added Base and Vault Grid links */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group cursor-pointer"
            >
              <Home className="h-4 w-4 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest hidden sm:block">
                Base
              </span>
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-emerald-500/70 hover:text-emerald-400 transition-colors group cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Vault Grid
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-mono text-emerald-400">
                SECURE_LINK
              </span>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-5 mb-8 border-b border-white/5 pb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-emerald-500/20 blur-md" />
            <div className="relative grid h-14 w-14 place-items-center rounded-xl bg-[#050812] border border-emerald-400/30">
              <Terminal className="h-6 w-6 text-emerald-400" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Operator Config
            </h1>
            <p className="text-sm text-slate-500 mt-1 font-mono uppercase tracking-widest flex items-center gap-3">
              <span>ID: {user.id.split("-")[0]} // SYS_ADMIN</span>
              <span className="text-emerald-500/50 hidden md:inline">|</span>
              <span className="hidden md:inline text-emerald-500/70">
                LOC: MARIBOR_SI
              </span>
            </p>
          </div>
        </motion.div>

        {/* Dashboard Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* LEFT COLUMN */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Identity Matrix */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl border border-white/5 bg-[#0B1020]/40 backdrop-blur-sm overflow-hidden"
            >
              <div className="p-5 border-b border-white/5 bg-white/[0.02] flex items-center gap-2">
                <User className="h-4 w-4 text-emerald-400" />
                <h2 className="text-sm font-semibold text-white">
                  Identity Matrix
                </h2>
              </div>
              <div className="p-5 space-y-5">
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-1.5">
                    Handle
                  </label>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#050812] border border-white/5">
                    <User className="h-4 w-4 text-slate-600" />
                    <span className="text-sm font-mono text-emerald-100">
                      {user.username}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-1.5">
                    Comm Vector
                  </label>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#050812] border border-white/5">
                    <Mail className="h-4 w-4 text-slate-600" />
                    <span className="text-sm font-mono text-emerald-100">
                      {user.email}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-1.5">
                    Unique Fingerprint
                  </label>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#050812] border border-white/5">
                    <Fingerprint className="h-4 w-4 text-slate-600" />
                    <span className="text-xs font-mono text-slate-500 truncate">
                      {user.id}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Telemetry */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl border border-white/5 bg-[#0B1020]/40 backdrop-blur-sm overflow-hidden"
            >
              <div className="p-5 border-b border-white/5 bg-white/[0.02] flex items-center gap-2">
                <Database className="h-4 w-4 text-emerald-400" />
                <h2 className="text-sm font-semibold text-white">
                  Vault Telemetry
                </h2>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Total Secrets</span>
                  <span className="text-white font-semibold">—</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Last Backup</span>
                  <span className="text-white font-semibold">Never</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Security Score</span>
                  <span className="text-emerald-400 font-semibold">98%</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Cryptography Status */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl border border-emerald-500/20 bg-[#0B1020]/40 backdrop-blur-sm overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <ShieldCheck className="h-32 w-32 text-emerald-500" />
              </div>
              <div className="p-5 border-b border-emerald-500/10 bg-emerald-500/[0.02] flex items-center gap-2 relative z-10">
                <Lock className="h-4 w-4 text-emerald-400" />
                <h2 className="text-sm font-semibold text-white">
                  Cryptography Status
                </h2>
              </div>

              <div className="p-6 space-y-4 relative z-10">
                {/* Master Key Card */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-[#050812] border border-white/5 group hover:border-emerald-500/30 transition-colors">
                  <div className="flex items-center gap-4 mb-3 sm:mb-0">
                    <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 grid place-items-center">
                      <Key className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white mb-0.5">
                        Master Encryption Key
                      </p>
                      <p className="text-xs font-mono text-slate-500">
                        AES-256-GCM / 256-bit Volatile
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-400 tracking-wider">
                      ACTIVE
                    </span>
                  </div>
                </div>

                {/* Session Card */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-[#050812] border border-white/5 group hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-4 mb-3 sm:mb-0">
                    <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 grid place-items-center">
                      <Clock className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white mb-0.5">
                        Session Token
                      </p>
                      <p className="text-xs font-mono text-slate-500">
                        HttpOnly JWT / Strict SameSite
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider">
                      SECURE
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl border border-white/5 bg-[#0B1020]/40 backdrop-blur-sm overflow-hidden"
            >
              <div className="p-5 border-b border-white/5 bg-white/[0.02]">
                <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-emerald-400" />
                  Actions
                </h2>
              </div>
              <div className="p-5">
                <button
                  onClick={() => alert("Backup feature coming soon!")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 transition-all text-sm mb-3 cursor-pointer"
                >
                  <Database className="h-4 w-4" />
                  Export Vault Backup
                </button>
                <button
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all text-sm cursor-pointer"
                >
                  <Key className="h-4 w-4" />
                  Change Master Password
                </button>
              </div>
            </motion.div>

            {/* Danger Zone */}
            <motion.div variants={itemVariants} className="mt-auto">
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 backdrop-blur-sm overflow-hidden">
                <div className="p-5 border-b border-red-500/20 bg-red-500/10">
                  <h2 className="text-sm font-semibold text-red-400 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Danger Zone
                  </h2>
                </div>
                <div className="p-5">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all text-sm cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    Terminate Session
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Attach the modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        user={user}
      />
    </div>
  );
};
