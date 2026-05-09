import { useAuth } from "../context/AuthContext";
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
} from "lucide-react";
import { useNavigate, Link } from "react-router";

export const Account = () => {
  const { user, masterEncryptionKey, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  if (!user || !masterEncryptionKey) {
    return (
      <div className="min-h-screen bg-[#03050d] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
            <ShieldCheck className="h-8 w-8 text-red-400" />
          </div>
          <div className="text-red-400 font-mono mb-4">UNAUTHORIZED ACCESS</div>
          <p className="text-slate-500 text-sm mb-4">KDF KEY MISSING</p>
          <Link to="/auth" className="text-emerald-400 hover:text-emerald-300">
            Return to Login →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#03050d] via-[#050812] to-[#0a0f1a]">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-[#0B1020]/60 backdrop-blur-xl sticky top-0 z-10">
        <div className="flex h-16 items-center justify-between px-6 lg:px-8">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Vault</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-mono text-emerald-400">SECURE</span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/30 to-emerald-600/20 blur-md" />
            <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 border border-emerald-400/30">
              <User className="h-7 w-7 text-emerald-400" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Account Settings</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Manage your profile and security preferences
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl border border-white/5 bg-[#0B1020]/40 backdrop-blur-sm overflow-hidden">
              <div className="p-5 border-b border-white/5 bg-white/[0.02]">
                <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                  <User className="h-4 w-4 text-emerald-400" />
                  Profile Information
                </h2>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                    Username
                  </label>
                  <div className="flex items-center gap-2 text-white font-mono text-sm">
                    <User className="h-3.5 w-3.5 text-slate-500" />
                    {user.username}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2 text-slate-300 font-mono text-sm">
                    <Mail className="h-3.5 w-3.5 text-slate-500" />
                    {user.email}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                    User ID
                  </label>
                  <div className="flex items-center gap-2 text-slate-500 font-mono text-xs">
                    <Fingerprint className="h-3.5 w-3.5 text-slate-500" />
                    {user.id}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="rounded-2xl border border-white/5 bg-[#0B1020]/40 backdrop-blur-sm overflow-hidden">
              <div className="p-5 border-b border-white/5 bg-white/[0.02]">
                <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Database className="h-4 w-4 text-emerald-400" />
                  Vault Stats
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
            </div>
          </div>

          {/* Security Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Security Status */}
            <div className="rounded-2xl border border-white/5 bg-[#0B1020]/40 backdrop-blur-sm overflow-hidden">
              <div className="p-5 border-b border-white/5 bg-white/[0.02]">
                <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Lock className="h-4 w-4 text-emerald-400" />
                  Security Status
                </h2>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <Key className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Master Encryption Key
                      </p>
                      <p className="text-[10px] text-slate-500">
                        AES-256-GCM • Derived from master password
                      </p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                    ACTIVE
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-500/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-slate-500/10 flex items-center justify-center">
                      <ShieldCheck className="h-4 w-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Session Status
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Authenticated with JWT
                      </p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                    SECURE
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-500/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-slate-500/10 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Session Expiry
                      </p>
                      <p className="text-[10px] text-slate-500">
                        7 days from last login
                      </p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-slate-500/20 text-slate-400">
                    VALID
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="rounded-2xl border border-white/5 bg-[#0B1020]/40 backdrop-blur-sm overflow-hidden">
              <div className="p-5 border-b border-white/5 bg-white/[0.02]">
                <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-emerald-400" />
                  Actions
                </h2>
              </div>
              <div className="p-5">
                <button
                  onClick={() => alert("Backup feature coming soon!")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 transition-all text-sm mb-3"
                >
                  <Database className="h-4 w-4" />
                  Export Vault Backup
                </button>
                <button
                  onClick={() => alert("Password change feature coming soon!")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 transition-all text-sm"
                >
                  <Key className="h-4 w-4" />
                  Change Master Password
                </button>
              </div>
            </div>

            {/* Danger Zone */}
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
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all text-sm"
                >
                  <LogOut className="h-4 w-4" />
                  Terminate Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
