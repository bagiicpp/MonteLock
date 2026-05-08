import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
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
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

// --- Mock Data ---
const MOCK_VAULT = [
  {
    id: 1,
    service: "GitHub Pro",
    username: "blagoja_dev",
    updated: "2 hrs ago",
    type: "Web",
  },
  {
    id: 2,
    service: "AWS Root Access",
    username: "sysadmin@montelock",
    updated: "1 day ago",
    type: "Server",
  },
  {
    id: 3,
    service: "Neon DB Production",
    username: "db_admin",
    updated: "3 days ago",
    type: "Database",
  },
  {
    id: 4,
    service: "FERI Student Portal",
    username: "blagoja.student",
    updated: "1 week ago",
    type: "Education",
  },
  {
    id: 5,
    service: "ProtonMail Secure",
    username: "contact@blagoja.me",
    updated: "2 weeks ago",
    type: "Email",
  },
  {
    id: 6,
    service: "Arch Linux Root",
    username: "root",
    updated: "1 month ago",
    type: "System",
  },
];

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

export const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-[#03050d] text-slate-300 font-mono flex flex-col overflow-hidden selection:bg-emerald-500/30">
      {/* BACKGROUND: Subtle Scanline/Grid Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      ></div>

      {/* TOP NAVIGATION TIER */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 h-20 border-b border-white/5 bg-[#0B1020]/80 backdrop-blur-md flex items-center justify-between px-8"
      >
        {/* Left Side: Brand & Quick Nav */}
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center bg-emerald-400/10 border border-emerald-400/20 text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-xs font-bold tracking-[0.2em] uppercase text-white leading-tight">
                MonteLock
              </h1>
              <p className="text-[9px] text-emerald-500/70 uppercase tracking-widest">
                OS // Sector 1
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button className="flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-400">
              <Key className="h-3 w-3" /> Vault
            </button>
            <button className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500 hover:text-white transition-colors">
              <Terminal className="h-3 w-3" /> Generator
            </button>
            <button className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500 hover:text-white transition-colors">
              <Database className="h-3 w-3" /> Audit Log
            </button>
          </nav>
        </div>

        {/* Right Side: Operator & Status */}
        <div className="flex items-center gap-8">
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-[9px] uppercase tracking-widest text-slate-500">
              System Status
            </span>
            <span className="text-xs text-emerald-400 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              SECURE
            </span>
          </div>

          <div className="h-8 w-px bg-white/10 hidden lg:block"></div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Blagoja
              </div>
              <div className="text-[9px] text-slate-500 uppercase tracking-widest">
                Root Operator
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="h-8 w-8 grid place-items-center border border-white/5 hover:border-red-500/30 hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-all"
            >
              <LogOut className="h-3 w-3" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto p-6 md:p-8 flex flex-col gap-6">
        {/* Actions Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row justify-between items-end gap-4"
        >
          <div className="w-full md:w-96 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="DECRYPT RECORDS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#050812] border border-white/10 pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-[#0B1020] transition-all uppercase tracking-wider"
            />
          </div>

          <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-emerald-400 text-[#04100b] px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-emerald-300 transition-colors">
            <Plus className="h-4 w-4" /> Add Secret
          </button>
        </motion.div>

        {/* The Vault List */}
        <div className="flex-1 border border-white/5 bg-[#0B1020]/40 backdrop-blur-sm relative">
          {/* List Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/5 bg-white/[0.02] text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
            <div className="col-span-5 md:col-span-4">Service</div>
            <div className="col-span-5 md:col-span-4">Identity</div>
            <div className="hidden md:block col-span-3">Last Modified</div>
            <div className="col-span-2 md:col-span-1 text-right">Actions</div>
          </div>

          {/* List Items */}
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            <AnimatePresence>
              {MOCK_VAULT.filter((item) =>
                item.service.toLowerCase().includes(searchQuery.toLowerCase()),
              ).map((item) => (
                <motion.li
                  key={item.id}
                  variants={itemVariants}
                  onHoverStart={() => setHoveredId(item.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  className="grid grid-cols-12 gap-4 items-center px-6 py-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors group cursor-default"
                >
                  <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                    <div
                      className={`h-8 w-8 grid place-items-center border border-white/10 transition-colors ${hoveredId === item.id ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400" : "bg-[#050812] text-slate-400"}`}
                    >
                      {item.type === "Web" && <Globe className="h-3 w-3" />}
                      {item.type === "System" && (
                        <Terminal className="h-3 w-3" />
                      )}
                      {item.type === "Database" && (
                        <Database className="h-3 w-3" />
                      )}
                      {(item.type === "Email" ||
                        item.type === "Server" ||
                        item.type === "Education") && (
                        <Activity className="h-3 w-3" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm text-white font-semibold">
                        {item.service}
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest">
                        {item.type}
                      </div>
                    </div>
                  </div>

                  {/* Identity */}
                  <div className="col-span-5 md:col-span-4 flex flex-col justify-center">
                    <div className="text-xs text-slate-300">
                      {item.username}
                    </div>
                    <div className="text-xs tracking-[0.2em] text-slate-600 mt-1">
                      ••••••••••••
                    </div>
                  </div>

                  {/* Last Modified (Hidden on mobile) */}
                  <div className="hidden md:flex col-span-3 items-center text-[10px] uppercase tracking-wider text-slate-500">
                    {item.updated}
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 md:col-span-1 flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <button className="h-8 w-8 grid place-items-center border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400 text-slate-400 transition-colors">
                      <Copy className="h-3 w-3" />
                    </button>
                    <button className="hidden md:grid h-8 w-8 place-items-center border border-white/5 hover:border-white/20 hover:bg-white/5 text-slate-400 transition-colors">
                      <MoreVertical className="h-3 w-3" />
                    </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>

            {/* Empty State */}
            {MOCK_VAULT.filter((item) =>
              item.service.toLowerCase().includes(searchQuery.toLowerCase()),
            ).length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 flex flex-col items-center justify-center text-center"
              >
                <div className="h-12 w-12 border border-white/5 grid place-items-center mb-4 text-slate-600">
                  <Search className="h-5 w-5" />
                </div>
                <p className="text-xs text-slate-400 uppercase tracking-widest">
                  No decryption targets found.
                </p>
              </motion.div>
            )}
          </motion.ul>
        </div>
      </main>
    </div>
  );
};
