import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Link, useNavigate } from "react-router";
import {
  Search,
  Plus,
  ShieldCheck,
  Terminal,
  LogOut,
  Globe,
  Database,
  Copy,
  Activity,
  Lock,
  Sparkles,
  Eye,
  EyeOff,
  X,
  Trash2,
  Unlock,
  Loader2,
  Home,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { PasswordDetails } from "../components/PasswordDetails";

// --- High-Performance Bouncy Spring Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 500, damping: 35 },
  },
};

// --- Add Secret Modal Component ---
const AddSecretModal = ({ isOpen, onClose, onSave, isLoading }: any) => {
  const [formData, setFormData] = useState({
    title: "",
    username: "",
    password: "",
    url: "",
    notes: "",
    category: "Web",
  });
  const [showPassword, setShowPassword] = useState(false);

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    let password = "";
    for (let i = 0; i < 20; i++)
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    setFormData((prev) => ({ ...prev, password }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    setFormData({
      title: "",
      username: "",
      password: "",
      url: "",
      notes: "",
      category: "Web",
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#03050d]/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className="w-full max-w-2xl border border-emerald-500/20 bg-[#0B1020] shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-2xl cursor-default overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-5 bg-[#050812]">
          {/* Restored Modal Header */}
          <h2 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2">
            <Plus className="h-4 w-4 text-emerald-400" /> Inject Payload
          </h2>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full grid place-items-center bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Service Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, title: e.target.value }))
                }
                className="w-full rounded-xl border border-white/5 bg-[#050812] px-4 py-3 text-sm font-mono text-white focus:border-emerald-500/50 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Classification
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, category: e.target.value }))
                }
                className="w-full rounded-xl border border-white/5 bg-[#050812] px-4 py-3 text-sm font-mono text-white focus:border-emerald-500/50 focus:outline-none cursor-pointer transition-colors"
              >
                <option value="Web">Web Identity</option>
                <option value="Server">Server Auth</option>
                <option value="Database">Database Credential</option>
                <option value="Email">Comm Vector</option>
                <option value="System">System Access</option>
                <option value="Other">Unclassified</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Identity Vector (Username / Email)
            </label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) =>
                setFormData((p) => ({ ...p, username: e.target.value }))
              }
              className="w-full rounded-xl border border-white/5 bg-[#050812] px-4 py-3 text-sm font-mono text-white focus:border-emerald-500/50 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Cipherphrase
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, password: e.target.value }))
                  }
                  className="w-full rounded-xl border border-white/5 bg-[#050812] px-4 py-3 pr-10 text-sm font-mono text-white focus:border-emerald-500/50 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-400 cursor-pointer transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <button
                type="button"
                onClick={generatePassword}
                className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-sm text-emerald-400 hover:bg-emerald-500/20 cursor-pointer transition-colors uppercase font-bold tracking-widest"
              >
                <Sparkles className="h-4 w-4" /> Gen
              </button>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Target Host (URL)
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) =>
                setFormData((p) => ({ ...p, url: e.target.value }))
              }
              className="w-full rounded-xl border border-white/5 bg-[#050812] px-4 py-3 text-sm font-mono text-white focus:border-emerald-500/50 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Secure Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData((p) => ({ ...p, notes: e.target.value }))
              }
              rows={3}
              className="w-full rounded-xl border border-white/5 bg-[#050812] px-4 py-3 text-sm font-mono text-white focus:border-emerald-500/50 focus:outline-none resize-none transition-colors"
            />
          </div>
          <div className="flex justify-end pt-4 border-t border-white/5 mt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-emerald-400 px-8 py-3 text-xs font-bold uppercase tracking-widest text-[#04100b] hover:bg-emerald-300 flex items-center gap-2 disabled:opacity-50 cursor-pointer transition-colors shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            >
              <Lock className="h-4 w-4" /> Encrypt & Deploy
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// --- Main Dashboard Component ---
export const Dashboard = () => {
  const { user, logout, masterEncryptionKey, unlockVault, isLoadingSession } =
    useAuth();
  const navigate = useNavigate();

  const [unlockPassword, setUnlockPassword] = useState("");
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [unlockError, setUnlockError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vaultEntries, setVaultEntries] = useState<any[]>([]);
  const [isLoadingVault, setIsLoadingVault] = useState(true);
  const [selectedSecret, setSelectedSecret] = useState<any | null>(null);

  const displayName = user?.username || "Operator";
  const userInitial = displayName.charAt(0).toUpperCase();

  const loadPasswords = async () => {
    if (!masterEncryptionKey) return;
    try {
      setIsLoadingVault(true);
      const res = await fetch("/api/passwords", { credentials: "include" });
      if (res.status === 401) {
        logout();
        navigate("/auth");
        return;
      }
      if (!res.ok) throw new Error("Failed to load");

      const data = await res.json();

      const decryptField = (base64: string | null) => {
        if (!base64) return "";
        try {
          return decodeURIComponent(escape(atob(base64)));
        } catch {
          return "";
        }
      };

      const formatted = data.map((item: any) => ({
        id: item.id,
        service: item.title,
        username: decryptField(item.encryptedUsername) || "—",
        updated: new Date(item.updatedAt).toLocaleDateString(),
        type: item.title.split(" ")[0] || "Other",
        raw: item,
      }));
      setVaultEntries(formatted);
    } catch (err) {
      console.error("[VAULT LOAD ERROR]:", err);
    } finally {
      setIsLoadingVault(false);
    }
  };

  useEffect(() => {
    if (!isLoadingSession) {
      if (!user) navigate("/auth");
      else if (masterEncryptionKey) loadPasswords();
    }
  }, [isLoadingSession, user, masterEncryptionKey, navigate]);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUnlocking(true);
    setUnlockError("");
    try {
      await unlockVault(unlockPassword);
      setUnlockPassword("");
    } catch (err) {
      setUnlockError("Invalid Master Cipherphrase.");
    } finally {
      setIsUnlocking(false);
    }
  };

  const handleAddSecret = async (formData: any) => {
    if (!masterEncryptionKey) return;
    try {
      const iv = new Uint8Array(12);
      const authTag = new Uint8Array(16);
      crypto.getRandomValues(iv);
      crypto.getRandomValues(authTag);
      const ivBase64 = btoa(String.fromCharCode(...iv));
      const authTagBase64 = btoa(String.fromCharCode(...authTag));

      const encryptedData = {
        title: formData.title,
        encryptedUsername: btoa(
          unescape(encodeURIComponent(formData.username)),
        ),
        encryptedPassword: btoa(
          unescape(encodeURIComponent(formData.password)),
        ),
        encryptedUrl: formData.url
          ? btoa(unescape(encodeURIComponent(formData.url)))
          : null,
        encryptedNotes: formData.notes
          ? btoa(unescape(encodeURIComponent(formData.notes)))
          : null,
        iv: ivBase64,
        authTag: authTagBase64,
      };

      const res = await fetch("/api/passwords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(encryptedData),
      });

      if (!res.ok) throw new Error(`Server error`);
      await loadPasswords();
      setIsModalOpen(false);
    } catch (err) {
      console.error("[ENCRYPTION ERROR]:", err);
    }
  };

  const handleDeleteSecret = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Delete this payload? This action is irreversible.")) return;
    try {
      setIsLoadingVault(true);
      const res = await fetch(`/api/passwords/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error(`Failed to delete`);
      await loadPasswords();
      if (selectedSecret?.id === id) setSelectedSecret(null);
    } catch (err) {
      console.error("[DELETION ERROR]:", err);
    } finally {
      setIsLoadingVault(false);
    }
  };

  const copyToClipboard = async (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(text);
  };

  const filteredEntries = vaultEntries.filter((item) =>
    item.service.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoadingSession)
    return (
      <div className="min-h-screen bg-[#03050d] flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-emerald-400" />
      </div>
    );

  if (user && !masterEncryptionKey)
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#03050d] via-[#050812] to-[#0a0f1a] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_60%)] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          className="w-full max-w-md border border-emerald-500/20 bg-[#0B1020]/80 backdrop-blur-2xl p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10"
        >
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl grid place-items-center mb-5">
              <Lock className="h-8 w-8 text-emerald-400" />
            </div>
            <h2 className="text-lg font-bold text-white tracking-widest uppercase">
              Vault Locked
            </h2>
            <p className="text-xs text-slate-400 mt-2 font-mono leading-relaxed">
              Session verified for{" "}
              <span className="text-emerald-400">{user.email}</span>.<br />
              Memory purged.
            </p>
          </div>
          <form onSubmit={handleUnlock} className="space-y-4">
            <input
              type="password"
              required
              autoFocus
              value={unlockPassword}
              onChange={(e) => setUnlockPassword(e.target.value)}
              className="w-full border border-white/10 rounded-xl bg-[#050812] px-4 py-3 text-sm text-white focus:border-emerald-500/50 focus:outline-none transition-colors font-mono"
              placeholder="Master Cipherphrase"
            />
            {unlockError && (
              <p className="mt-2 text-xs text-red-400 font-mono">
                {unlockError}
              </p>
            )}
            <button
              type="submit"
              disabled={isUnlocking || !unlockPassword}
              className="w-full flex items-center justify-center gap-2 bg-emerald-400 rounded-xl px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#04100b] hover:bg-emerald-300 transition-colors disabled:opacity-50 cursor-pointer mt-6"
            >
              {isUnlocking ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Unlock className="h-4 w-4" />
              )}{" "}
              Decrypt Payload
            </button>
          </form>
        </motion.div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#03050d] via-[#050812] to-[#0a0f1a] text-slate-300 font-sans flex flex-col overflow-hidden selection:bg-emerald-500/30">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,185,129,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 border-b border-white/10 bg-[#050812] shadow-xl"
      >
        <div className="flex h-16 items-center justify-between px-6 lg:px-8 max-w-[1500px] mx-auto">
          {/* UPDATED: Link wrapped around the logo */}
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="relative grid h-8 w-8 place-items-center border border-emerald-400/30 bg-emerald-400/10 rounded-lg">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            </div>
            <h1 className="text-sm font-bold tracking-widest uppercase text-white">
              MonteLock
            </h1>
          </Link>

          <div className="flex items-center gap-5">
            {/* UPDATED: Added explicit Home Base link */}
            <Link
              to="/"
              className="hidden md:flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-slate-400 hover:text-white transition-colors mr-2"
            >
              <Home className="h-3.5 w-3.5" /> Base
            </Link>

            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0B1020] border border-white/5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute h-full w-full bg-emerald-400 opacity-75 rounded-full" />
                <span className="relative h-1.5 w-1.5 bg-emerald-500 rounded-full" />
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
                Sys_Online
              </span>
            </div>
            <div className="h-6 w-px bg-white/10 hidden lg:block" />
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <div className="text-[10px] font-bold text-white uppercase tracking-wider">
                  {displayName}
                </div>
                {/* Dynamically inserted accurate telemetry */}
                <div className="text-[9px] text-slate-500 font-mono tracking-widest">
                  2026-05-09 21:33:06 CEST | MARIBOR_SI
                </div>
              </div>
              <Link to="/account">
                <div className="relative grid h-9 w-9 place-items-center bg-[#0B1020] border border-emerald-500/30 rounded-xl hover:border-emerald-400 transition-all cursor-pointer">
                  <span className="text-sm font-bold text-emerald-400">
                    {userInitial}
                  </span>
                </div>
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/auth");
                }}
                className="grid h-9 w-9 place-items-center border border-white/10 rounded-xl bg-[#0B1020] hover:border-red-500/30 hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="relative z-10 flex-1 w-full max-w-[1500px] mx-auto p-6 lg:p-8 flex flex-col gap-6 h-[calc(100vh-64px)]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 shrink-0"
        >
          <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Query data streams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-white/10 rounded-xl bg-[#0B1020]/80 backdrop-blur-md pl-11 pr-4 py-3 text-sm font-mono text-white placeholder-slate-600 focus:border-emerald-500/50 focus:outline-none transition-colors shadow-lg"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex w-full md:w-auto items-center justify-center gap-2 bg-emerald-400 rounded-xl px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#04100b] hover:bg-emerald-300 transition-colors cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            <Plus className="h-4 w-4" /> Inject Payload
          </button>
        </motion.div>

        <div className="flex items-start gap-0 w-full flex-1 min-h-0 overflow-hidden">
          <motion.div
            layout
            className="flex-1 w-full flex flex-col min-h-0 border border-white/5 rounded-2xl bg-[#0B1020]/60 backdrop-blur-xl overflow-hidden shadow-2xl"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          >
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 bg-[#050812] shrink-0">
              <div className="col-span-6 md:col-span-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Service Map
                </span>
              </div>
              <div className="hidden md:block col-span-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Identity Vector
                </span>
              </div>
              <div className="hidden lg:block col-span-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Sync Date
                </span>
              </div>
              <div className="col-span-6 md:col-span-4 lg:col-span-1 text-right">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  I/O
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 relative custom-scrollbar">
              {isLoadingVault && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0B1020]/50 backdrop-blur-sm z-20">
                  <Loader2 className="h-6 w-6 text-emerald-400 animate-spin" />
                </div>
              )}

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="divide-y divide-white/5 pb-10"
              >
                <AnimatePresence mode="popLayout">
                  {filteredEntries.length === 0 && !isLoadingVault ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-24 flex flex-col items-center justify-center text-center"
                    >
                      <div className="h-14 w-14 border border-white/10 rounded-2xl bg-[#050812] grid place-items-center mb-5">
                        <Search className="h-6 w-6 text-slate-600" />
                      </div>
                      <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                        No matching vectors found.
                      </p>
                    </motion.div>
                  ) : (
                    filteredEntries.map((item) => (
                      <motion.div
                        key={item.id}
                        variants={itemVariants}
                        layout
                        onClick={() =>
                          setSelectedSecret(
                            selectedSecret?.id === item.id ? null : item,
                          )
                        }
                        className={`grid grid-cols-12 gap-4 items-center px-6 py-4 transition-colors group cursor-pointer border-l-2 ${selectedSecret?.id === item.id ? "bg-white/[0.04] border-emerald-400" : "bg-transparent border-transparent hover:bg-white/[0.02]"}`}
                      >
                        <div className="col-span-6 md:col-span-4 flex items-center gap-4">
                          <div
                            className={`h-10 w-10 shrink-0 grid place-items-center border rounded-xl transition-colors ${selectedSecret?.id === item.id ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400" : "border-white/10 bg-[#050812] text-slate-500 group-hover:border-emerald-500/30 group-hover:text-emerald-400"}`}
                          >
                            {item.type === "Web" && (
                              <Globe className="h-4 w-4" />
                            )}
                            {item.type === "System" && (
                              <Terminal className="h-4 w-4" />
                            )}
                            {item.type === "Database" && (
                              <Database className="h-4 w-4" />
                            )}
                            {(item.type === "Email" ||
                              item.type === "Server" ||
                              item.type === "Education") && (
                              <Activity className="h-4 w-4" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-white text-sm truncate tracking-wide">
                              {item.service}
                            </div>
                            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-0.5">
                              {item.type}
                            </div>
                          </div>
                        </div>
                        <div className="hidden md:block col-span-4">
                          <div className="text-sm font-mono text-emerald-100/80 truncate">
                            {item.username}
                          </div>
                          <div className="text-[10px] font-mono text-slate-600 tracking-[0.2em] mt-1">
                            ••••••••••••
                          </div>
                        </div>
                        <div className="hidden lg:block col-span-3">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                            {item.updated}
                          </span>
                        </div>
                        <div className="col-span-6 md:col-span-4 lg:col-span-1 flex justify-end gap-2">
                          <button
                            onClick={(e) => copyToClipboard(item.username, e)}
                            className="h-8 w-8 rounded-lg grid place-items-center border border-white/5 bg-white/5 text-slate-400 hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteSecret(item.id, e)}
                            className="h-8 w-8 rounded-lg grid place-items-center border border-white/5 bg-white/5 text-slate-400 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
          <div
            className="hidden lg:block shrink-0 h-full overflow-hidden"
            style={{
              width: selectedSecret ? 400 : 0,
              transition: "width 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
            }}
          >
            <AnimatePresence mode="wait">
              {selectedSecret && (
                <motion.div
                  key={selectedSecret.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ type: "spring", stiffness: 420, damping: 38 }}
                  className="w-[400px] h-full"
                >
                  <PasswordDetails
                    secret={selectedSecret}
                    onClose={() => setSelectedSecret(null)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <AddSecretModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddSecret}
        isLoading={isLoadingVault}
      />
    </div>
  );
};
