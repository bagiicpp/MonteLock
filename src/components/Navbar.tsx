import { motion } from "framer-motion";
import { Mountain, ArrowRight, Menu } from "lucide-react";
import { Link } from "react-router";

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#03050d]/80 backdrop-blur-2xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-2xl border border-emerald-300/25 bg-emerald-400/10 shadow-[0_0_45px_rgba(16,185,129,0.22)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_36%)]" />
            <Mountain className="relative h-5 w-5 text-emerald-300 transition-transform duration-500 group-hover:-translate-y-0.5" />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-white">
              MonteLock
            </p>
            <p className="-mt-1 text-[11px] uppercase tracking-[0.34em] text-emerald-300/70">
              Vault elevated
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 rounded-full border border-white/10 bg-white/[0.035] px-6 py-3 text-sm text-slate-300 shadow-2xl shadow-black/20 lg:flex">
          {["Security", "Vault", "System", "Pricing"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative transition hover:text-emerald-200"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/auth"
            className="group hidden items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-[#04100b] shadow-[0_0_36px_rgba(16,185,129,0.35)] transition hover:-translate-y-0.5 hover:bg-emerald-300 md:flex"
          >
            Open vault
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          <button className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};
