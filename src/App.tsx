import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
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
  Radar,
  Shield,
  ShieldCheck,
  Sparkles,
  Terminal,
  Vault,
  WandSparkles,
} from "lucide-react";

const MonteLockLandingPage = () => {
  const { scrollYProgress } = useScroll();
  const navBlur = useTransform(scrollYProgress, [0, 0.12], [0, 18]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 260]);

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
        "Your vault is designed around client-side encryption, so secrets stay unreadable before they ever touch storage.",
    },
    {
      icon: Fingerprint,
      title: "Master-key protection",
      description:
        "A strong KDF route protects the master password and turns it into a vault key with hardened defaults.",
    },
    {
      icon: EyeOff,
      title: "Private by default",
      description:
        "Sensitive values like usernames, passwords, URLs, and notes are stored as encrypted records, not plain text.",
    },
    {
      icon: Radar,
      title: "Weakness detection",
      description:
        "Surface repeated, old, or fragile credentials with calm security scoring and clear vault health signals.",
    },
    {
      icon: DatabaseZap,
      title: "Fast encrypted access",
      description:
        "Built for a SaaS workflow with quick searching, smooth dashboards, and responsive credential management.",
    },
    {
      icon: CloudOff,
      title: "No casual exposure",
      description:
        "MonteLock’s interface is designed to hide secrets until explicitly revealed, copied, or unlocked.",
    },
  ];

  const securityStack = [
    "Argon2id / PBKDF2-ready KDF settings",
    "Per-user master password salt",
    "Per-entry IV and auth tag storage",
    "Encrypted usernames, passwords, URLs, and notes",
    "Cascade-safe user-owned vault entries",
    "Dark-first dashboard built for secrecy",
  ];

  const stats = [
    { value: "256-bit", label: "encryption mindset" },
    { value: "0", label: "plain-text vault secrets" },
    { value: "∞", label: "entries per user" },
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
    <main className="min-h-screen overflow-hidden bg-[#050812] text-slate-100 selection:bg-emerald-400/30 selection:text-emerald-50">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.22),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(20,184,166,0.16),transparent_32%),linear-gradient(180deg,rgba(5,8,18,0),#050812_72%)]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:64px_64px]" />
        <motion.div
          style={{ y: orbY }}
          className="absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl"
        />
      </div>

      <motion.nav
        style={{
          backdropFilter: navBlur.get()
            ? `blur(${navBlur.get()}px)`
            : "blur(0px)",
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#050812]/70"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#" className="group flex items-center gap-3">
            <div className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-2xl border border-emerald-300/25 bg-emerald-400/10 shadow-[0_0_45px_rgba(16,185,129,0.22)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_36%)]" />
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

          <div className="hidden items-center gap-8 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-slate-300 shadow-2xl shadow-black/20 lg:flex">
            {["Security", "Vault", "Architecture", "Pricing"].map((item) => (
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
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div style={{ y: heroY }} className="relative">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-100 shadow-[0_0_50px_rgba(16,185,129,0.14)]"
            >
              <Sparkles className="h-4 w-4 text-emerald-300" />
              Luxury cybersecurity for your most private credentials
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.8 }}
              className="max-w-4xl text-6xl font-semibold tracking-[-0.07em] text-white md:text-8xl lg:text-9xl"
            >
              Your digital vault,
              <span className="block bg-gradient-to-r from-emerald-200 via-emerald-400 to-teal-200 bg-clip-text text-transparent">
                elevated.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.7 }}
              className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl"
            >
              MonteLock protects credentials like a mountain fortress: silent,
              hardened, and hidden from everyone except the person holding the
              master key.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.7 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <button className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-emerald-400 px-7 py-4 text-base font-bold text-[#04100b] shadow-[0_0_55px_rgba(16,185,129,0.4)] transition hover:-translate-y-1 hover:bg-emerald-300">
                Start securing secrets
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </button>
              <button className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 text-base font-semibold text-white transition hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-emerald-300/10">
                <LockKeyhole className="h-5 w-5 text-emerald-300" />
                View architecture
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.38, duration: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-slate-400"
            >
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-300" /> Encrypted entries
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-300" /> KDF hardened
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-300" /> No plain-text
                vault secrets
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: 0.22,
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="absolute -inset-8 rounded-[3rem] bg-emerald-500/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B1020]/86 p-4 shadow-2xl shadow-black/50 backdrop-blur-2xl">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
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
                      className="group flex items-center justify-between rounded-2xl border border-white/10 bg-[#050812]/70 p-4 transition hover:border-emerald-300/30 hover:bg-emerald-300/[0.06]"
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
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 top-16 hidden rounded-2xl border border-white/10 bg-[#0B1020]/90 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl md:block"
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
              animate={{ y: [0, 14, 0] }}
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
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/10 bg-[#0B1020]/60 p-6 text-center"
            >
              <p className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="security"
        className="relative z-10 mx-auto max-w-7xl px-5 py-28 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-300">
            <GlobeLock className="h-7 w-7" />
          </div>
          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
            Built for secrets that should never become visible.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-400">
            Every part of MonteLock’s identity is designed around calm security:
            minimal surfaces, hidden data, hardened defaults, and a vault
            experience that feels premium without feeling loud.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B1020]/70 p-7 shadow-2xl shadow-black/20 transition hover:-translate-y-2 hover:border-emerald-300/30"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.14),transparent_42%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="relative grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-emerald-300 transition group-hover:scale-110 group-hover:bg-emerald-300/10">
                  <Icon className="h-7 w-7" />
                </div>
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

      <section id="vault" className="relative z-10 overflow-hidden py-28">
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-medium text-emerald-200">
              Secrecy-first interface
            </div>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
              A dashboard that looks like a locked command center.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-400">
              MonteLock uses dark surfaces, emerald signal colors, and
              controlled reveal patterns to make security feel serious, elegant,
              and calm.
            </p>
            <div className="mt-8 grid gap-4">
              {securityStack.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <BadgeCheck className="h-5 w-5 shrink-0 text-emerald-300" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#0B1020] p-4 shadow-2xl shadow-black/50">
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
                    <div className="mt-6 flex gap-1">
                      {[...Array(16)].map((_, index) => (
                        <motion.div
                          key={index}
                          initial={{ height: 8 }}
                          whileInView={{ height: 14 + ((index * 7) % 34) }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.03 }}
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
          </div>
        </div>
      </section>

      <section
        id="architecture"
        className="relative z-10 mx-auto max-w-7xl px-5 py-28 lg:px-8"
      >
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300">
              Developer-ready direction
            </div>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
              Designed around your actual schema.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-400">
              The product identity matches the underlying model: users own
              encrypted password records, KDF settings stay per user, and each
              vault entry carries encryption metadata.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#0B1020]/80 p-4 shadow-2xl shadow-black/30">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#050812]">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
                <div className="h-3 w-3 rounded-full bg-red-400/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
                <p className="ml-3 font-mono text-xs text-slate-500">
                  monte-lock/schema.ts
                </p>
              </div>
              <div className="p-5 font-mono text-sm leading-7 text-slate-300">
                <p>
                  <span className="text-emerald-300">users</span> &#123;
                </p>
                <p className="pl-5 text-slate-400">
                  id, username, email, password_hash
                </p>
                <p className="pl-5 text-slate-400">master_password_salt</p>
                <p className="pl-5 text-slate-400">
                  kdf_algorithm, kdf_iterations
                </p>
                <p>&#125;</p>
                <br />
                <p>
                  <span className="text-emerald-300">passwords</span> &#123;
                </p>
                <p className="pl-5 text-slate-400">user_id, title</p>
                <p className="pl-5 text-slate-400">encrypted_username</p>
                <p className="pl-5 text-slate-400">encrypted_password</p>
                <p className="pl-5 text-slate-400">
                  encrypted_url, encrypted_notes
                </p>
                <p className="pl-5 text-slate-400">iv, auth_tag</p>
                <p>&#125;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="relative overflow-hidden rounded-[3rem] border border-emerald-300/20 bg-gradient-to-br from-emerald-300/14 via-[#0B1020] to-[#050812] p-8 shadow-[0_0_100px_rgba(16,185,129,0.18)] md:p-12 lg:p-16">
            <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
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
                  [Terminal, "Developer-ready", "Clean schema direction"],
                  [WandSparkles, "Premium", "Luxury SaaS aesthetic"],
                  [Layers3, "Scalable", "User-owned vault model"],
                ].map(([Icon, title, desc]) => {
                  const TypedIcon = Icon as typeof Lock;
                  return (
                    <div
                      key={title as string}
                      className="rounded-3xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl"
                    >
                      <TypedIcon className="h-7 w-7 text-emerald-300" />
                      <p className="mt-6 text-xl font-semibold text-white">
                        {title as string}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {desc as string}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="relative z-10 mx-auto max-w-7xl px-5 py-28 lg:px-8"
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
          {pricing.map((tier) => (
            <div
              key={tier.name}
              className={`relative overflow-hidden rounded-[2rem] border p-7 ${
                tier.highlighted
                  ? "border-emerald-300/35 bg-emerald-300/[0.08] shadow-[0_0_80px_rgba(16,185,129,0.18)]"
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
            </div>
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
            <a
              className="transition hover:text-emerald-300"
              href="#architecture"
            >
              Architecture
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
