import {
  LayoutDashboard,
  Database,
  Key,
  ShieldCheck,
  LogOut,
} from "lucide-react";

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#02040a] text-slate-300 font-mono flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/10 bg-[#050812] flex flex-col">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <ShieldCheck className="text-emerald-400 h-5 w-5" />
          <span className="text-xs font-bold tracking-widest uppercase text-white">
            MonteLock OS
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: LayoutDashboard, label: "Overview", active: true },
            { icon: Key, label: "Vault Items", active: false },
            { icon: Database, label: "Data Audit", active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-tighter transition-colors ${item.active ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20" : "hover:bg-white/5 text-slate-500 hover:text-white"}`}
            >
              <item.icon className="h-4 w-4" /> {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-xs uppercase text-red-400 hover:bg-red-400/10 transition-all">
            <LogOut className="h-4 w-4" /> Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-[#0B1020]/50 backdrop-blur-sm">
          <div className="text-[10px] text-slate-500 uppercase tracking-widest">
            System Status: <span className="text-emerald-400">Secure</span>
          </div>
          <div className="flex items-center gap-4 text-xs italic text-slate-400">
            Operator:{" "}
            <span className="text-white not-italic font-bold">Blagoja</span>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {["Total Secrets", "Security Score", "Active Sessions"].map(
              (label, i) => (
                <div
                  key={label}
                  className="border border-white/10 bg-[#0B1020] p-6 rounded-sm"
                >
                  <div className="text-[10px] uppercase text-slate-500 mb-2">
                    {label}
                  </div>
                  <div className="text-2xl text-white font-bold">
                    {[0, "98%", 1][i]}
                  </div>
                </div>
              ),
            )}
          </div>

          <div className="border border-white/10 bg-[#0B1020] rounded-sm">
            <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-white">
                Encrypted Vault Records
              </span>
              <button className="bg-emerald-400 text-[#04100b] px-4 py-1 text-[10px] font-bold uppercase hover:bg-emerald-300">
                New Entry
              </button>
            </div>
            <div className="p-12 text-center">
              <Database className="h-12 w-12 text-slate-700 mx-auto mb-4" />
              <p className="text-xs text-slate-500 uppercase tracking-widest italic">
                No records detected in this vault sector.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
