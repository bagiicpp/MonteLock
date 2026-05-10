import { useState } from "react";
import {
  X,
  Copy,
  Globe,
  Terminal,
  Database,
  Activity,
  ExternalLink,
  Key,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  Fingerprint,
} from "lucide-react";

interface PasswordDetailsProps {
  secret: any;
  onClose: () => void;
}

export const PasswordDetails = ({ secret, onClose }: PasswordDetailsProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  // --- Base64 Decryption Helper ---
  // Reverses the exact mock encryption used in handleAddSecret
  const decryptPayload = (base64String: string | null) => {
    if (!base64String) return "";
    try {
      return decodeURIComponent(escape(atob(base64String)));
    } catch (e) {
      return "[Decryption Error]";
    }
  };

  const handleCopy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopySuccess(label);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "Web":
        return <Globe className="h-5 w-5" />;
      case "System":
        return <Terminal className="h-5 w-5" />;
      case "Database":
        return <Database className="h-5 w-5" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };

  // Run decryption
  const decryptedUsername = decryptPayload(secret.raw.encryptedUsername);
  const decryptedPassword = decryptPayload(secret.raw.encryptedPassword);
  const decryptedUrl = decryptPayload(secret.raw.encryptedUrl);
  const decryptedNotes = decryptPayload(secret.raw.encryptedNotes);

  return (
    <div className="ml-6 h-full rounded-2xl border border-white/5 bg-[#0B1020]/90 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden relative">
      {/* Top Glass Header */}
      <div className="p-6 border-b border-white/5 bg-gradient-to-b from-white/[0.05] to-transparent shrink-0 flex items-start justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 grid place-items-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            {getIcon(secret.type)}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide truncate max-w-[200px]">
              {secret.service}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-[10px] text-emerald-400 font-mono uppercase tracking-widest">
                Decrypted
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="h-8 w-8 rounded-full grid place-items-center bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Main Details Body */}
      <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6 relative z-10">
        {/* Identity Vector */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex justify-between">
            <span>Identity Vector</span>
            {copySuccess === "user" && (
              <span className="text-emerald-400">Copied!</span>
            )}
          </label>
          <div className="flex items-center gap-2 group">
            <div className="flex-1 bg-[#050812] border border-white/5 rounded-xl p-3.5 overflow-hidden transition-colors group-hover:border-emerald-500/30">
              <span className="text-sm font-mono text-white truncate block">
                {decryptedUsername || "N/A"}
              </span>
            </div>
            <button
              onClick={() => handleCopy(decryptedUsername, "user")}
              className="h-[52px] w-[52px] shrink-0 rounded-xl border border-white/5 bg-[#050812] grid place-items-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all cursor-pointer"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Cipherphrase (Hold to Reveal) */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex justify-between">
            <span>Payload (Cipherphrase)</span>
            {copySuccess === "pass" && (
              <span className="text-emerald-400">Copied!</span>
            )}
          </label>
          <div className="flex items-center gap-2 group">
            <div className="flex-1 bg-[#050812] border border-white/5 rounded-xl p-3.5 flex items-center justify-between overflow-hidden transition-colors group-hover:border-emerald-500/30">
              <span
                className={`text-sm font-mono tracking-wider truncate mr-2 transition-all ${showPassword ? "text-white" : "text-slate-500"}`}
              >
                {showPassword ? decryptedPassword : "••••••••••••••••••••••••"}
              </span>
              <button
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
                onTouchStart={() => setShowPassword(true)}
                onTouchEnd={() => setShowPassword(false)}
                className="text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer shrink-0 bg-white/5 p-1.5 rounded-lg"
                title="Hold to reveal"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <button
              onClick={() => handleCopy(decryptedPassword, "pass")}
              className="h-[52px] w-[52px] shrink-0 rounded-xl border border-emerald-500/30 bg-emerald-500/10 grid place-items-center text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.15)]"
            >
              <Key className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Target URL */}
        {decryptedUrl && (
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Target Host
            </label>
            <div className="flex items-center gap-2 group">
              <div className="flex-1 bg-[#050812] border border-white/5 rounded-xl p-3.5 overflow-hidden text-ellipsis transition-colors group-hover:border-white/10">
                <span className="text-sm font-mono text-blue-400 truncate block">
                  {decryptedUrl}
                </span>
              </div>
              <a
                href={
                  decryptedUrl.startsWith("http")
                    ? decryptedUrl
                    : `https://${decryptedUrl}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="h-[52px] w-[52px] shrink-0 rounded-xl border border-white/5 bg-[#050812] grid place-items-center text-slate-400 hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/10 transition-all cursor-pointer"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}

        {/* Secure Notes */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Secure Notes
          </label>
          <div className="bg-[#050812] border border-white/5 rounded-xl p-5 min-h-[100px]">
            {decryptedNotes ? (
              <p className="text-sm font-mono text-slate-300 leading-relaxed whitespace-pre-wrap">
                {decryptedNotes}
              </p>
            ) : (
              <div className="flex items-center gap-2 text-slate-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-xs font-mono uppercase tracking-widest">
                  No telemetry provided
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-white/5 bg-[#050812] text-center shrink-0 flex justify-between items-center px-6">
        <div className="flex items-center gap-2">
          <Fingerprint className="h-3 w-3 text-slate-600" />
          <span className="text-[9px] font-mono text-slate-600 truncate max-w-[100px]">
            {secret.id}
          </span>
        </div>
        <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-500">
          Sync: {secret.updated}
        </p>
      </div>
    </div>
  );
};
