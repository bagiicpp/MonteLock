import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Binary,
  Check,
  ChevronRight,
  CircuitBoard,
  CloudOff,
  DatabaseZap,
  EyeOff,
  Fingerprint,
  Gem,
  GlobeLock,
  KeyRound,
  Layers3,
  Lock,
  LockKeyhole,
  Menu,
  Mountain,
  Orbit,
  Radar,
  ScanLine,
  Shield,
  ShieldCheck,
  Sparkles,
  Terminal,
  Vault,
  WandSparkles,
} from "lucide-react";

const MonteLockLandingPage = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  });
  const heroY = useTransform(smoothProgress, [0, 1], [0, -240]);
  const heroScale = useTransform(smoothProgress, [0, 0.35], [1, 0.86]);
  const rotateVault = useTransform(smoothProgress, [0, 1], [0, 70]);
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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

  const features = [
    {
      icon: ShieldCheck,
      title: "Zero-knowledge vault",
      description:
        "Secrets are designed to become encrypted before storage, turning the database into a sealed chamber instead of a readable list.",
    },
    {
      icon: Fingerprint,
      title: "Master-key architecture",
      description:
        "Per-user KDF settings and salts give the vault a hardened unlock path while keeping the experience smooth.",
    },
    {
      icon: EyeOff,
      title: "Concealed by default",
      description:
        "Usernames, passwords, URLs, and notes stay masked, encrypted, and intentionally hidden until the user acts.",
    },
    {
      icon: Radar,
      title: "Threat-aware interface",
      description:
        "Vault strength, stale credentials, reused passwords, and suspicious risk signals can be surfaced with premium clarity.",
    },
    {
      icon: DatabaseZap,
      title: "Neon-backed speed",
      description:
        "A modern Drizzle + Neon foundation gives MonteLock a clean, scalable backend for secure SaaS workflows.",
    },
    {
      icon: CloudOff,
      title: "No casual exposure",
      description:
        "The UI is built around intentional reveal, copy, and lock flows so secrets never feel casually visible.",
    },
  ];

  const securityStack = [
    "Argon2id / PBKDF2-ready KDF settings",
    "Random app-generated master password salt",
    "Per-entry IV and auth tag storage",
    "Encrypted usernames, passwords, URLs, and notes",
    "Cascade-safe user-owned vault entries",
    "Dark-first interface engineered around secrecy",
  ];

  const stats = [
    { value: "0", label: "plain-text vault secrets" },
    { value: "2", label: "core encrypted entities" },
    { value: "∞", label: "vault entries per user" },
    { value: "24/7", label: "silent protection" },
  ];

  const pricing = [
    {
      name: "Personal",
      price: "Free",
      description: "For private users who want calm password security.",
      features: [
        "Encrypted vault",
        "Password generator",
        "Vault health",
        "Dark mode dashboard",
      ],
      highlighted: false,
    },
    {
      name: "Pro Vault",
      price: "€6",
      description:
        "For serious users and small teams that need stronger control.",
      features: [
        "Everything in Personal",
        "Advanced KDF settings",
        "Shared vaults",
        "Priority security alerts",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For organizations that need elevated security governance.",
      features: [
        "Team policies",
        "Audit-ready controls",
        "Admin dashboards",
        "Dedicated onboarding",
      ],
      highlighted: false,
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#03050d] text-slate-100 selection:bg-emerald-400/30 selection:text-emerald-50">
      <motion.div
        style={{ width: lineWidth }}
        className="fixed left-0 top-0 z-[80] h-1 bg-gradient-to-r from-emerald-500 via-teal-300 to-emerald-100"
      />

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(16,185,129,0.28),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(45,212,191,0.18),transparent_32%),radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.12),transparent_35%),linear-gradient(180deg,rgba(3,5,13,0),#03050d_76%)]" />
        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:58px_58px]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_center,#10B981_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-1/2 top-20 h-[760px] w-[760px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal-200/10"
        />
      </div>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#03050d]/80 backdrop-blur-2xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#" className="group flex items-center gap-3">
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
          </a>

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
            <button className="hidden rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-emerald-300/40 hover:bg-emerald-300/10 hover:text-white md:block">
              Sign in
            </button>
            <button className="group hidden items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-[#04100b] shadow-[0_0_36px_rgba(16,185,129,0.35)] transition hover:-translate-y-0.5 hover:bg-emerald-300 md:flex">
              Open vault
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
            <button className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.nav>

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
              encrypted records, silent reveal flows, master-key protection, and
              a premium interface built around secrecy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.7 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <button className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-emerald-400 px-7 py-4 text-base font-bold text-[#04100b] shadow-[0_0_65px_rgba(16,185,129,0.46)] transition hover:-translate-y-1 hover:bg-emerald-300">
                Enter the fortress
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </button>
              <button className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 text-base font-semibold text-white transition hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-emerald-300/10">
                <LockKeyhole className="h-5 w-5 text-emerald-300" />
                Inspect security layer
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 46 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-xl"
          >
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
                      transition={{
                        delay: 0.7,
                        duration: 1.4,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-emerald-300 to-teal-200"
                    />
                  </div>
                </div>
              </div>
            </div>

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

      <section className="relative z-10 border-y border-white/10 bg-white/[0.025] py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 lg:grid-cols-4 lg:px-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-3xl border border-white/10 bg-[#0B1020]/60 p-6 text-center"
            >
              <p className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id="security"
        className="relative z-10 mx-auto max-w-7xl px-5 py-32 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-3xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-300 shadow-[0_0_60px_rgba(16,185,129,0.18)]"
          >
            <GlobeLock className="h-8 w-8" />
          </motion.div>
          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
            Security that feels like entering a restricted facility.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-400">
            The product language is not cute. It is deliberate, quiet, premium,
            and built around secrets that should remain unreadable.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 34, rotateX: -8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.05, duration: 0.65 }}
                whileHover={{ y: -12, rotate: index % 2 === 0 ? 0.6 : -0.6 }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B1020]/70 p-7 shadow-2xl shadow-black/20 hover:border-emerald-300/30"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_42%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-emerald-300 group-hover:bg-emerald-300/10"
                >
                  <Icon className="h-7 w-7" />
                </motion.div>
                <h3 className="relative mt-7 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="relative mt-3 leading-7 text-slate-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section id="vault" className="relative z-10 overflow-hidden py-36">
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-5 inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-medium text-emerald-200">
              Secrecy-first interface
            </div>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
              A dashboard that looks like a locked command center.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-400">
              MonteLock uses dark surfaces, emerald signals, animated scans, and
              controlled reveal patterns to make security feel serious, elegant,
              and alive.
            </p>
            <div className="mt-8 grid gap-4">
              {securityStack.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <BadgeCheck className="h-5 w-5 shrink-0 text-emerald-300" />
                  <span className="text-slate-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-10 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#0B1020] p-4 shadow-2xl shadow-black/50">
              <motion.div
                animate={{ y: ["-20%", "120%"] }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-0 right-0 z-10 h-24 bg-gradient-to-b from-transparent via-emerald-300/10 to-transparent"
              />
              <div className="rounded-[1.75rem] border border-white/10 bg-[#050812] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-emerald-300/70">
                      MonteLock OS
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">
                      Vault Intelligence
                    </h3>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-300 text-[#04100b]">
                    <CircuitBoard className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
                    <p className="text-sm text-slate-500">Security posture</p>
                    <p className="mt-3 text-4xl font-semibold text-white">
                      Elite
                    </p>
                    <div className="mt-6 flex items-end gap-1">
                      {[...Array(18)].map((_, index) => (
                        <motion.div
                          key={index}
                          initial={{ height: 8 }}
                          whileInView={{ height: 14 + ((index * 9) % 38) }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.025 }}
                          className="w-full rounded-full bg-emerald-300/80"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
                    <p className="text-sm text-slate-500">Secrets exposed</p>
                    <p className="mt-3 text-4xl font-semibold text-white">0</p>
                    <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm text-emerald-100">
                      All vault entries remain encrypted at rest.
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.035] p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="font-semibold text-white">
                      Recent vault activity
                    </p>
                    <p className="text-sm text-emerald-300">Private log</p>
                  </div>
                  {[
                    ["Master key derived", "argon2id", "hidden"],
                    ["Stripe password copied", "8 seconds", "masked"],
                    ["Weak entry upgraded", "GitHub", "sealed"],
                  ].map(([title, meta, state]) => (
                    <div
                      key={title}
                      className="flex items-center justify-between border-t border-white/10 py-4 first:border-t-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(16,185,129,0.85)]" />
                        <div>
                          <p className="text-sm font-medium text-white">
                            {title}
                          </p>
                          <p className="text-xs text-slate-500">{meta}</p>
                        </div>
                      </div>
                      <p className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
                        {state}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="system"
        className="relative z-10 mx-auto max-w-7xl px-5 py-36 lg:px-8"
      >
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300">
              <Orbit className="h-4 w-4 text-emerald-300" /> Vault transmission
              map
            </div>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
              From master password to unreadable vault records.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-400">
              Show the product like a security system, not a form app. Every
              step should feel intentional: derive, encrypt, seal, store, reveal
              only on command.
            </p>
          </div>

          <div className="relative min-h-[620px] overflow-hidden rounded-[2.6rem] border border-white/10 bg-[#07101b]/80 p-8 shadow-2xl shadow-black/40">
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,#10B981_1px,transparent_1px),linear-gradient(to_bottom,#10B981_1px,transparent_1px)] [background-size:46px_46px]" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 56, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-teal-300/20"
            />

            <div className="absolute left-1/2 top-1/2 grid h-32 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[2rem] border border-emerald-300/30 bg-emerald-300/10 shadow-[0_0_80px_rgba(16,185,129,0.22)] backdrop-blur-xl">
              <Vault className="h-14 w-14 text-emerald-200" />
            </div>

            {[
              { icon: Fingerprint, title: "Master key", pos: "left-8 top-10" },
              { icon: Binary, title: "KDF", pos: "right-10 top-16" },
              { icon: ScanLine, title: "Encrypt", pos: "left-14 bottom-20" },
              { icon: DatabaseZap, title: "Neon", pos: "right-12 bottom-14" },
            ].map((node, index) => {
              const Icon = node.icon;
              return (
                <motion.div
                  key={node.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.16 }}
                  animate={{ y: [0, index % 2 ? -12 : 12, 0] }}
                  className={`absolute ${node.pos} rounded-3xl border border-white/10 bg-[#03050d]/85 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl`}
                >
                  <Icon className="h-7 w-7 text-emerald-300" />
                  <p className="mt-3 font-semibold text-white">{node.title}</p>
                  <p className="mt-1 text-xs text-slate-500">sealed signal</p>
                </motion.div>
              );
            })}

            <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/10 bg-black/30 p-5 font-mono text-xs text-emerald-200/80 backdrop-blur-xl">
              <motion.div
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              >
                &gt; deriving vault key... complete
                <br />
                &gt; encrypting entry payload... sealed
                <br />
                &gt; storing ciphertext... success
                <br />
                &gt; plain text exposure... 0
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-36">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="relative overflow-hidden rounded-[3rem] border border-emerald-300/20 bg-gradient-to-br from-emerald-300/14 via-[#0B1020] to-[#03050d] p-8 shadow-[0_0_120px_rgba(16,185,129,0.22)] md:p-12 lg:p-16">
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />
            <motion.div
              animate={{ x: ["-30%", "35%", "-30%"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent"
            />
            <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-100">
                  <Gem className="h-4 w-4" /> Premium security identity
                </div>
                <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
                  Quiet power for people who take privacy seriously.
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                  MonteLock should feel like Swiss banking, alpine architecture,
                  and enterprise security fused into one sharp SaaS product.
                </p>
                <button className="group mt-9 inline-flex items-center gap-3 rounded-2xl bg-white px-7 py-4 font-bold text-[#050812] transition hover:-translate-y-1 hover:bg-emerald-100">
                  Build the vault
                  <ChevronRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  [Lock, "Sealed", "Entries stay encrypted"],
                  [Terminal, "Developer-ready", "Clean Drizzle schema"],
                  [WandSparkles, "Premium", "Luxury SaaS aesthetic"],
                  [Layers3, "Scalable", "User-owned vault model"],
                ].map(([Icon, title, desc], index) => {
                  const TypedIcon = Icon as typeof Lock;
                  return (
                    <motion.div
                      key={title as string}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="rounded-3xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl"
                    >
                      <TypedIcon className="h-7 w-7 text-emerald-300" />
                      <p className="mt-6 text-xl font-semibold text-white">
                        {title as string}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {desc as string}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="relative z-10 mx-auto max-w-7xl px-5 py-32 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
            Pricing that feels as clean as the product.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-400">
            Keep it simple while the project grows. Start with a clean product
            story and expand from there.
          </p>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {pricing.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.09 }}
              whileHover={{ y: -12, scale: tier.highlighted ? 1.025 : 1.015 }}
              className={`relative overflow-hidden rounded-[2rem] border p-7 will-change-transform ${
                tier.highlighted
                  ? "border-emerald-300/35 bg-emerald-300/[0.08] shadow-[0_0_90px_rgba(16,185,129,0.22)]"
                  : "border-white/10 bg-[#0B1020]/70"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute right-5 top-5 rounded-full bg-emerald-300 px-3 py-1 text-xs font-bold text-[#04100b]">
                  Best choice
                </div>
              )}
              <p className="text-xl font-semibold text-white">{tier.name}</p>
              <p className="mt-4 text-5xl font-semibold tracking-tight text-white">
                {tier.price}
              </p>
              <p className="mt-4 min-h-14 leading-7 text-slate-400">
                {tier.description}
              </p>
              <button
                className={`mt-8 w-full rounded-2xl px-5 py-4 font-bold transition ${tier.highlighted ? "bg-emerald-300 text-[#04100b] hover:bg-emerald-200" : "border border-white/10 bg-white/[0.04] text-white hover:border-emerald-300/30 hover:bg-emerald-300/10"}`}
              >
                Choose {tier.name}
              </button>
              <div className="mt-8 space-y-4">
                {tier.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-slate-300"
                  >
                    <Check className="h-5 w-5 text-emerald-300" />
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-5 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl border border-emerald-300/25 bg-emerald-400/10">
              <Mountain className="h-5 w-5 text-emerald-300" />
            </div>
            <div>
              <p className="font-semibold text-white">MonteLock</p>
              <p className="text-sm text-slate-500">
                Fortress-grade password security, elevated.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-slate-500">
            <a className="transition hover:text-emerald-300" href="#security">
              Security
            </a>
            <a className="transition hover:text-emerald-300" href="#vault">
              Vault
            </a>
            <a className="transition hover:text-emerald-300" href="#system">
              System
            </a>
            <a className="transition hover:text-emerald-300" href="#pricing">
              Pricing
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default MonteLockLandingPage;
