// src/components/landing/HeroSection.tsx
import { motion, MotionValue } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  LockKeyhole,
  Vault,
  KeyRound,
  Shield,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";

interface HeroSectionProps {
  heroY: MotionValue<number>;
  heroScale: MotionValue<number>;
  rotateVault: MotionValue<number>;
}

export const HeroSection = ({
  heroY,
  heroScale,
  rotateVault,
}: HeroSectionProps) => {
  const { user } = useAuth();
  const vaultEntries = [
    {
      name: "Neon Database",
      type: "Infrastructure",
      strength: "Ultra",
      pulse: "Live",
    },
    {
      name: "GitHub",
      type: "Development",
      strength: "Strong",
      pulse: "Synced",
    },
    { name: "Figma", type: "Design", strength: "Strong", pulse: "Hidden" },
    { name: "Stripe", type: "Payments", strength: "Ultra", pulse: "Sealed" },
  ];

  return (
    <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 pb-20 pt-32 lg:px-8 lg:pt-28">
      <div className="grid w-full items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="relative origin-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-100 shadow-[0_0_50px_rgba(16,185,129,0.14)]"
          >
            <Sparkles className="h-4 w-4 text-emerald-300" />
            Luxury cybersecurity for credentials that should never be seen
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.8 }}
            className="max-w-4xl text-6xl font-semibold tracking-[-0.075em] text-white md:text-8xl lg:text-[8.7rem] lg:leading-[0.82]"
          >
            The vault above
            <span className="block bg-gradient-to-r from-emerald-100 via-emerald-400 to-teal-100 bg-clip-text text-transparent">
              every threat.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.7 }}
            className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl"
          >
            MonteLock turns password storage into a sealed alpine fortress:
            encrypted records, silent reveal flows, master-key protection, and a
            premium interface built around secrecy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.7 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              to={user ? "/dashboard" : "/auth"}
              className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-emerald-400 px-7 py-4 text-base font-bold text-[#04100b] shadow-[0_0_65px_rgba(16,185,129,0.46)] transition hover:-translate-y-1 hover:bg-emerald-300"
            >
              {user ? "Access your vault" : "Enter the fortress"}
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
            <a
              href="#security"
              className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 text-base font-semibold text-white transition hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-emerald-300/10"
            >
              <LockKeyhole className="h-5 w-5 text-emerald-300" />
              Inspect security layer
            </a>
          </motion.div>
        </motion.div>

        {/* The Animated Vault Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 46 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-xl"
        >
          {/* Background Rotating Rings */}
          <motion.div
            style={{ rotate: rotateVault }}
            className="absolute -inset-12 rounded-full border border-emerald-300/15"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-24 rounded-full border border-dashed border-emerald-300/15"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-36 rounded-full border border-teal-300/10"
          />
          <div className="absolute -inset-8 rounded-[3rem] bg-emerald-500/20 blur-3xl" />

          {/* Central Vault Card */}
          <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#0B1020]/86 p-4 shadow-2xl shadow-black/50 backdrop-blur-2xl">
            <motion.div
              animate={{ x: ["-120%", "120%"] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-0 h-px w-2/3 bg-gradient-to-r from-transparent via-emerald-300 to-transparent"
            />
            <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400 text-[#04100b] shadow-[0_0_35px_rgba(16,185,129,0.34)]">
                    <Vault className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Private Vault</p>
                    <p className="text-sm text-slate-400">
                      4 encrypted entries sealed
                    </p>
                  </div>
                </div>
                <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                  LOCKED
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {vaultEntries.map((entry, index) => (
                  <motion.div
                    key={entry.name}
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.42 + index * 0.08 }}
                    whileHover={{ x: 8, scale: 1.015 }}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-[#050812]/70 p-4 hover:border-emerald-300/30 hover:bg-emerald-300/[0.06]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-emerald-300">
                        <KeyRound className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{entry.name}</p>
                        <p className="text-sm text-slate-500">{entry.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-emerald-200">
                        {entry.strength}
                      </p>
                      <p className="text-xs text-slate-500">{entry.pulse}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.06] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-emerald-100">
                    Vault Strength
                  </p>
                  <p className="text-sm text-emerald-300">98%</p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "98%" }}
                    transition={{ delay: 0.7, duration: 1.4, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-emerald-300 to-teal-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Floating Accents */}
          <motion.div
            animate={{ y: [0, -14, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-8 top-14 hidden rounded-2xl border border-white/10 bg-[#0B1020]/90 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl md:block"
          >
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-emerald-300" />
              <div>
                <p className="text-sm font-semibold text-white">
                  Threat blocked
                </p>
                <p className="text-xs text-slate-500">
                  Credential remained hidden
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 16, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-7 -left-5 hidden rounded-2xl border border-emerald-300/20 bg-emerald-950/70 p-4 shadow-2xl shadow-emerald-950/30 backdrop-blur-xl md:block"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-emerald-300/70">
              Encryption
            </p>
            <p className="mt-1 font-mono text-sm text-emerald-100">
              AES-GCM sealed
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
