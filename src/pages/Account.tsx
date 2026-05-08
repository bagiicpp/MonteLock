import { useAuth } from "../context/AuthContext";
import { Key, ShieldCheck, LogOut } from "lucide-react";

export const Account = () => {
  const { user, masterEncryptionKey, logout } = useAuth();

  if (!user || !masterEncryptionKey) {
    return (
      <div className="p-10 text-red-500 font-mono">
        UNAUTHORIZED ACCESS. KDF KEY MISSING.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1020] text-slate-300 font-mono p-8">
      <div className="max-w-6xl mx-auto border border-emerald-500/20 bg-[#121826] p-6 shadow-none">
        <header className="flex justify-between items-center border-b border-emerald-500/20 pb-4 mb-8">
          <div>
            <h1 className="text-xl font-bold text-white uppercase tracking-wider">
              MonteLock Console
            </h1>
            <p className="text-xs text-emerald-500 mt-1 flex items-center gap-2">
              <ShieldCheck className="h-3 w-3" /> SESSION SECURED
            </p>
          </div>

          <button
            onClick={logout}
            className="border border-slate-700 p-2 text-xs hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50 transition-colors flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" /> TERMINATE SESSION
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 border border-slate-700 p-4">
            <h2 className="text-xs uppercase text-slate-500 mb-4 border-b border-slate-800 pb-2">
              Identity Matrix
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-slate-500 block text-xs">
                  Operator ID
                </span>
                <span className="text-emerald-400">{user.username}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-xs">
                  Comm Vector
                </span>
                <span className="text-slate-300">{user.email}</span>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800">
                <span className="text-slate-500 block text-xs mb-1">
                  Key State
                </span>
                <span className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-2 py-1 text-xs border border-emerald-500/30">
                  <Key className="h-3 w-3" /> DERIVED & ACTIVE
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-2 border border-slate-700 p-4 flex items-center justify-center bg-[#0B1020]">
            <p className="text-slate-600 text-sm italic">
              [ Vault Data Grid Pending Implementation ]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
