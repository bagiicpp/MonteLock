import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Link, useNavigate } from "react-router";
import {
  Search,
  Plus,
  ShieldCheck,
  Key,
  Terminal,
  LogOut,
  Globe,
  Database,
  Copy,
  MoreVertical,
  Activity,
  User,
  Lock,
  Sparkles,
  Eye,
  EyeOff,
  X,
  Trash2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

// --- Add Secret Modal Component ---
const AddSecretModal = ({
  isOpen,
  onClose,
  onSave,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  isLoading?: boolean;
}) => {
  const [formData, setFormData] = useState({
    title: "",
    username: "",
    password: "",
    url: "",
    notes: "",
    category: "web",
  });
  const [showPassword, setShowPassword] = useState(false);

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
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
      category: "web",
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0B1020]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400/10 border border-emerald-400/20">
              <Plus className="h-5 w-5 text-emerald-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Add New Secret</h2>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 hover:bg-white/5"
          >
            <X className="h-4 w-4 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase text-slate-400">
                Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, title: e.target.value }))
                }
                className="w-full rounded-lg border border-white/10 bg-[#050812] px-4 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase text-slate-400">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, category: e.target.value }))
                }
                className="w-full rounded-lg border border-white/10 bg-[#050812] px-4 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none"
              >
                <option value="web">🌐 Web</option>
                <option value="server">🖥️ Server</option>
                <option value="database">🗄️ Database</option>
                <option value="email">📧 Email</option>
                <option value="system">⚙️ System</option>
                <option value="other">📁 Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase text-slate-400">
              Username / Email
            </label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) =>
                setFormData((p) => ({ ...p, username: e.target.value }))
              }
              className="w-full rounded-lg border border-white/10 bg-[#050812] px-4 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase text-slate-400">
              Password
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
                  className="w-full rounded-lg border border-white/10 bg-[#050812] px-4 py-2.5 pr-10 text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-400"
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
                className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-400 hover:bg-emerald-500/20"
              >
                <Sparkles className="h-4 w-4" /> Generate
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase text-slate-400">
              URL (optional)
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) =>
                setFormData((p) => ({ ...p, url: e.target.value }))
              }
              className="w-full rounded-lg border border-white/10 bg-[#050812] px-4 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase text-slate-400">
              Notes (optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData((p) => ({ ...p, notes: e.target.value }))
              }
              rows={3}
              className="w-full rounded-lg border border-white/10 bg-[#050812] px-4 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/10 px-5 py-2 text-sm text-slate-300 hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-emerald-400 px-5 py-2 text-sm font-bold text-[#04100b] hover:bg-emerald-300 flex items-center gap-2 disabled:opacity-50"
            >
              <Lock className="h-4 w-4" /> Encrypt & Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Main Dashboard Component ---
export const Dashboard = () => {
  const { user, logout, masterEncryptionKey } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vaultEntries, setVaultEntries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const displayName = user?.username || "Operator";
  const userInitial = displayName.charAt(0).toUpperCase();

  // --- Вчитување на лозинки од базата ---
  const loadPasswords = async () => {
    if (!masterEncryptionKey) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/passwords", {
        credentials: "include",
      });

      if (res.status === 401) {
        navigate("/auth");
        return;
      }

      if (!res.ok) throw new Error("Failed to load");

      const data = await res.json();
      console.log("Loaded passwords:", data);

      const formatted = data.map((item: any) => ({
        id: item.id,
        service: item.title,
        username: item.encryptedUsername ? "[Encrypted]" : "No username",
        updated: new Date(item.updatedAt).toLocaleDateString(),
        type: item.title.split(" ")[0] || "Other",
      }));

      setVaultEntries(formatted);
    } catch (err) {
      console.error("Load error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Вчитување при старт ---
  useEffect(() => {
    if (masterEncryptionKey) {
      loadPasswords();
    } else {
      navigate("/auth");
    }
  }, [masterEncryptionKey]);

  // --- Додавање нова лозинка (ПОПРАВЕНО) ---
  const handleAddSecret = async (formData: any) => {
    if (!masterEncryptionKey) return;

    try {
      // Креирај валиден IV (12 бајти) и authTag (16 бајти)
      const iv = new Uint8Array(12);
      const authTag = new Uint8Array(16);
      crypto.getRandomValues(iv);
      crypto.getRandomValues(authTag);

      // Конвертирај во base64
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

      console.log("Sending:", {
        title: encryptedData.title,
        iv: encryptedData.iv,
      });

      const res = await fetch("/api/passwords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(encryptedData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error:", res.status, errorText);
        throw new Error("Failed to add");
      }

      const result = await res.json();
      console.log("Added successfully:", result);

      await loadPasswords();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Add error:", err);
      alert("Failed to add password: " + (err as Error).message);
    }
  };

  // --- Бришење лозинка ---
  const handleDeleteSecret = async (id: string) => {
    if (!confirm("Delete this secret?")) return;

    try {
      const res = await fetch(`/api/passwords/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete");

      console.log("Password deleted!");
      await loadPasswords();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete password");
    }
  };

  // --- Копирање ---
  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const filteredEntries = vaultEntries.filter((item) =>
    item.service.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#03050d] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4" />
          <p className="text-slate-400">Loading vault...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#03050d] via-[#050812] to-[#0a0f1a] text-slate-300 font-sans flex flex-col overflow-hidden selection:bg-emerald-500/30">
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.04),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* TOP NAVIGATION */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 border-b border-white/5 bg-[#0B1020]/60 backdrop-blur-xl"
      >
        <div className="flex h-20 items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-emerald-500/20 blur-md" />
              <div className="relative grid h-10 w-10 place-items-center rounded-xl border border-emerald-400/30 bg-emerald-400/10">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-[0.2em] uppercase text-white">
                MonteLock
              </h1>
              <p className="text-[10px] text-emerald-400/70 uppercase tracking-widest">
                OS // Secure Vault
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {[
              { icon: Key, label: "Vault", active: true },
              { icon: Sparkles, label: "Generator", active: false },
              { icon: Activity, label: "Audit Log", active: false },
            ].map((item) => (
              <button
                key={item.label}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  item.active
                    ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-mono text-emerald-400">SECURE</span>
            </div>

            <div className="h-8 w-px bg-white/10 hidden lg:block" />

            <div className="flex items-center gap-3">
              <Link to="/account">
                <div className="relative cursor-pointer group">
                  <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-sm group-hover:bg-emerald-500/40 transition-all" />
                  <div className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 border border-emerald-400/30 group-hover:border-emerald-400/50 transition-all">
                    <span className="text-sm font-bold text-emerald-300 group-hover:text-emerald-200">
                      {userInitial}
                    </span>
                  </div>
                </div>
              </Link>

              <div className="text-right">
                <div className="text-sm font-semibold text-white flex items-center gap-1">
                  {displayName}
                  <Lock className="h-3 w-3 text-emerald-400 ml-1" />
                </div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                  {user?.email ? user.email.split("@")[0] : "Root"} • Vault
                  Admin
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 hover:border-red-500/30 hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto p-6 lg:p-8 flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2"
        >
          <h2 className="text-2xl font-semibold text-white">
            Welcome back,{" "}
            <span className="text-emerald-400">{displayName}</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Your encrypted vault is ready
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {[
            {
              label: "Total Secrets",
              value: vaultEntries.length,
              icon: Lock,
              color: "emerald",
            },
            {
              label: "Categories",
              value: new Set(vaultEntries.map((e) => e.type)).size,
              icon: Grid,
              color: "blue",
            },
            {
              label: "Security Score",
              value: "98%",
              icon: ShieldCheck,
              color: "emerald",
            },
            {
              label: "Last Backup",
              value: "Today",
              icon: Database,
              color: "purple",
            },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-xl border border-white/5 bg-[#0B1020]/40 backdrop-blur-sm p-4 hover:border-emerald-500/20 transition-all"
            >
              <div className="flex items-center justify-between">
                <stat.icon className={`h-5 w-5 text-${stat.color}-400/70`} />
                <span className="text-2xl font-bold text-white">
                  {stat.value}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-500 uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Actions Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search vault entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#050812] pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:border-emerald-500/50 focus:outline-none focus:bg-[#0B1020] transition-all"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex w-full md:w-auto items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 py-3 text-sm font-bold text-[#04100b] hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-500/20"
          >
            <Plus className="h-4 w-4" />
            Add New Secret
          </button>
        </motion.div>

        {/* Vault Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-white/5 bg-[#0B1020]/30 backdrop-blur-sm overflow-hidden"
        >
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 bg-white/[0.02]">
            <div className="col-span-5 md:col-span-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Service
              </span>
            </div>
            <div className="col-span-5 md:col-span-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Identity
              </span>
            </div>
            <div className="hidden md:block col-span-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Last Modified
              </span>
            </div>
            <div className="col-span-2 md:col-span-1 text-right">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Actions
              </span>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="divide-y divide-white/5"
          >
            <AnimatePresence>
              {filteredEntries.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-16 flex flex-col items-center justify-center text-center"
                >
                  <div className="h-16 w-16 rounded-full border border-white/10 bg-white/[0.02] grid place-items-center mb-4">
                    <Search className="h-6 w-6 text-slate-600" />
                  </div>
                  <p className="text-sm text-slate-400">
                    No vault entries found
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Add your first secret to get started
                  </p>
                </motion.div>
              ) : (
                filteredEntries.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    onHoverStart={() => setHoveredId(item.id)}
                    onHoverEnd={() => setHoveredId(null)}
                    className="grid grid-cols-12 gap-4 items-center px-6 py-4 transition-all duration-200 hover:bg-white/[0.02] group"
                  >
                    <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                      <div
                        className={`h-9 w-9 rounded-xl grid place-items-center border transition-all ${
                          hoveredId === item.id
                            ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                            : "border-white/10 bg-[#050812] text-slate-500"
                        }`}
                      >
                        {item.type === "Web" && <Globe className="h-4 w-4" />}
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
                      <div>
                        <div className="font-semibold text-white text-sm">
                          {item.service}
                        </div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                          {item.type}
                        </div>
                      </div>
                    </div>

                    <div className="col-span-5 md:col-span-4">
                      <div className="text-sm text-slate-300">
                        {item.username}
                      </div>
                      <div className="text-[10px] font-mono text-slate-600 tracking-[0.2em]">
                        ••••••••••••
                      </div>
                    </div>

                    <div className="hidden md:block col-span-3">
                      <span className="text-xs text-slate-500">
                        {item.updated}
                      </span>
                    </div>

                    <div className="col-span-2 md:col-span-1 flex justify-end gap-2">
                      <button
                        onClick={() => copyToClipboard(item.username)}
                        className="h-8 w-8 rounded-lg grid place-items-center border border-white/10 text-slate-500 hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSecret(item.id)}
                        className="h-8 w-8 rounded-lg grid place-items-center border border-white/10 text-slate-500 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </main>

      <AddSecretModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddSecret}
        isLoading={isLoading}
      />
    </div>
  );
};

// Helper component for Grid icon
const Grid = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);
