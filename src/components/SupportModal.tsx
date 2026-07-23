"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const C = {
  dark:   "#1A1A1A",
  red:    "#E63035",
  green:  "#008B4D",
  light:  "#FFFFFF",
  muted:  "#888888",
  border: "#DCDCDC",
  navy:   "#008B4D",
} as const;

type Tab  = "donate" | "volunteer" | "share";
type Freq = "once"   | "monthly";

const AMOUNTS = ["₦500", "₦2,000", "₦5,000", "₦10,000", "₦25,000", "Custom"] as const;
const ROLES   = ["Canvassing", "Phone Banking", "Social Media", "Events", "Youth Outreach", "Legal Support", "Logistics"] as const;

/* ── Floating label field (white bg) ───────────────────────── */
function Field({
  label, type = "text", value, onChange, required, accent = C.green,
}: {
  label: string; type?: string; value: string;
  onChange: (v: string) => void; required?: boolean; accent?: string;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;
  return (
    <div className="relative border-b transition-colors duration-300" style={{ borderColor: focused ? accent : C.border }}>
      <label
        className="absolute left-0 pointer-events-none transition-all duration-200 select-none"
        style={{
          top: lifted ? "4px" : "50%",
          transform: lifted ? "none" : "translateY(-50%)",
          fontSize: lifted ? "9px" : "13px",
          letterSpacing: lifted ? "0.28em" : "0.04em",
          textTransform: "uppercase",
          color: focused ? accent : C.muted,
          fontWeight: 400,
        }}
      >
        {label}
      </label>
      <input
        type={type} value={value} required={required}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent pt-6 pb-2 text-sm outline-none"
        style={{ color: C.dark, caretColor: accent }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-px origin-left"
        style={{ background: accent }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

/* ── Success checkmark ─────────────────────────────────────── */
function SuccessCheck({ title, body }: { title: string; body: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="py-10 text-center"
    >
      <motion.svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto mb-6">
        <motion.circle cx="24" cy="24" r="22" stroke={C.green} strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7 }} />
        <motion.path d="M14 24l7 7 13-14" stroke={C.green} strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.55 }} />
      </motion.svg>
      <p className="text-[10px] tracking-[0.35em] uppercase mb-2" style={{ color: C.green }}>Done</p>
      <h3 className="text-xl font-light leading-tight mb-4" style={{ color: C.dark }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{body}</p>
    </motion.div>
  );
}

/* ── DONATE tab ────────────────────────────────────────────── */
function DonateTab() {
  const [freq,      setFreq]      = useState<Freq>("once");
  const [amount,    setAmount]    = useState("₦5,000");
  const [customAmt, setCustomAmt] = useState("");
  const [name,      setName]      = useState("");
  const [email,     setEmail]     = useState("");
  const [done,      setDone]      = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && (amount !== "Custom" || customAmt)) setDone(true);
  };

  if (done) {
    const displayAmount = amount === "Custom" ? `₦${customAmt}` : amount;
    return (
      <SuccessCheck
        title={`Thank you, ${name.split(" ")[0]}.`}
        body={<>Your {freq === "monthly" ? "monthly " : ""}contribution of <strong style={{ color: C.dark }}>{displayAmount}</strong> will help build a better Ogun East. Confirmation going to <strong style={{ color: C.dark }}>{email}</strong>.</>}
      />
    );
  }

  return (
    <form onSubmit={submit} className="space-y-7">
      {/* Frequency */}
      <div>
        <p className="text-[9px] tracking-[0.32em] uppercase mb-3" style={{ color: C.muted }}>Contribution Type</p>
        <div className="flex gap-2">
          {(["once", "monthly"] as Freq[]).map((f) => (
            <button key={f} type="button" onClick={() => setFreq(f)}
              className={`relative px-4 py-2 text-[10px] tracking-[0.18em] uppercase overflow-hidden transition-colors duration-200 ${freq === f ? "" : "hover:opacity-70"}`}
              style={{ color: freq === f ? C.light : C.muted, border: `1px solid ${freq === f ? C.green : C.border}` }}
            >
              {freq === f && <motion.span layoutId="sm-freq" className="absolute inset-0" style={{ background: C.green }} transition={{ type: "spring", stiffness: 270, damping: 26 }} />}
              <span className="relative z-10">{f === "once" ? "One-time" : "Monthly"}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Amounts */}
      <div>
        <p className="text-[9px] tracking-[0.32em] uppercase mb-3" style={{ color: C.muted }}>Amount</p>
        <div className="flex flex-wrap gap-2">
          {AMOUNTS.map((a) => (
            <button key={a} type="button" onClick={() => setAmount(a)}
              className={`relative px-4 py-2 text-[11px] tracking-[0.1em] overflow-hidden transition-colors duration-200 ${amount === a ? "" : "hover:opacity-70"}`}
              style={{ color: amount === a ? C.light : C.dark, border: `1px solid ${amount === a ? C.red : C.border}`, fontWeight: amount === a ? 500 : 400 }}
            >
              {amount === a && <motion.span layoutId="sm-amount" className="absolute inset-0" style={{ background: C.red }} transition={{ type: "spring", stiffness: 270, damping: 26 }} />}
              <span className="relative z-10">{a}</span>
            </button>
          ))}
        </div>
        <AnimatePresence>
          {amount === "Custom" && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-4">
              <Field label="Custom Amount (₦)" type="number" value={customAmt} onChange={setCustomAmt} accent={C.red} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Field label="Full Name"      value={name}  onChange={setName}  required />
      <Field label="Email Address"  type="email"  value={email} onChange={setEmail} required />

      {/* CTA */}
      <motion.button
        type="submit"
        className="group relative w-full flex items-center justify-center gap-4 py-4 overflow-hidden"
        style={{ background: C.red, color: C.light }}
        whileHover="hov" whileTap={{ scale: 0.98 }}
      >
        <motion.div className="absolute inset-0 origin-left" style={{ background: C.green }}
          variants={{ hov: { scaleX: 1 }, default: { scaleX: 0 } }} initial="default" transition={{ duration: 0.35, ease }} />
        <span className="relative z-10 text-[11px] tracking-[0.22em] uppercase font-medium">Contribute Now</span>
        <motion.span className="relative z-10" variants={{ hov: { x: 4 }, default: { x: 0 } }} transition={{ duration: 0.22 }}>→</motion.span>
      </motion.button>
      <p className="text-[10px] text-center" style={{ color: C.border }}>All contributions support the Omoowo 2027 campaign for Ogun East.</p>
    </form>
  );
}

/* ── VOLUNTEER tab ─────────────────────────────────────────── */
function VolunteerTab() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [name,  setName]  = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [done,  setDone]  = useState(false);

  const toggle = (r: string) => setSelected((s) => {
    const n = new Set(s);
    n.has(r) ? n.delete(r) : n.add(r);
    return n;
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && selected.size > 0) setDone(true);
  };

  if (done) {
    return (
      <SuccessCheck
        title={`You're in, ${name.split(" ")[0]}.`}
        body={<>The campaign team will reach out at <strong style={{ color: C.dark }}>{email}</strong> with your volunteer schedule and briefing pack.</>}
      />
    );
  }

  return (
    <form onSubmit={submit} className="space-y-7">
      <div>
        <p className="text-[9px] tracking-[0.32em] uppercase mb-1" style={{ color: C.muted }}>
          Areas of Interest <span style={{ color: C.border }}>— pick all that apply</span>
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {ROLES.map((r) => {
            const active = selected.has(r);
            return (
              <button key={r} type="button" onClick={() => toggle(r)}
                className={`px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase transition-all duration-200 ${active ? "" : "hover:opacity-70"}`}
                style={{ background: active ? C.green : "transparent", color: active ? C.light : C.muted, border: `1px solid ${active ? C.green : C.border}` }}
              >
                {r}
              </button>
            );
          })}
        </div>
        {selected.size === 0 && <p className="text-[9px] mt-2" style={{ color: C.border }}>Select at least one area to continue.</p>}
      </div>

      <Field label="Full Name"        value={name}  onChange={setName}  required />
      <Field label="Email Address"    type="email"  value={email} onChange={setEmail} required />
      <Field label="Phone (optional)" type="tel"    value={phone} onChange={setPhone} />

      <motion.button
        type="submit"
        className="group relative w-full flex items-center justify-center gap-4 py-4 overflow-hidden"
        style={{ background: C.green, color: C.light }}
        whileHover="hov" whileTap={{ scale: 0.98 }}
      >
        <motion.div className="absolute inset-0 origin-left" style={{ background: "#006B3A" }}
          variants={{ hov: { scaleX: 1 }, default: { scaleX: 0 } }} initial="default" transition={{ duration: 0.35, ease }} />
        <span className="relative z-10 text-[11px] tracking-[0.22em] uppercase font-medium">Join the Team</span>
        <motion.span className="relative z-10" variants={{ hov: { x: 4 }, default: { x: 0 } }} transition={{ duration: 0.22 }}>→</motion.span>
      </motion.button>
    </form>
  );
}

/* ── SHARE tab ─────────────────────────────────────────────── */
function ShareTab() {
  const [copied, setCopied] = useState(false);
  const siteUrl = "https://omoowo2027.ng";
  const message = `I'm standing with Alhaji Omoowo for Ogun East Federal Constituency in 2027. He represents real change for our communities. Join me — ${siteUrl}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch { /* clipboard access denied */ }
  };

  const platforms = [
    {
      label: "WhatsApp",
      color: "#25D366",
      href: `https://wa.me/?text=${encodeURIComponent(message)}`,
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      ),
    },
    {
      label: "Twitter / X",
      color: "#000000",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`,
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      label: "Facebook",
      color: "#1877F2",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`,
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Share buttons */}
      <div>
        <p className="text-[9px] tracking-[0.32em] uppercase mb-4" style={{ color: C.muted }}>Share on Social Media</p>
        <div className="grid grid-cols-3 gap-3">
          {platforms.map((p, i) => (
            <motion.a
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07, ease }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 280, damping: 20 } }}
              className="flex flex-col items-center gap-3 py-5 cursor-pointer"
              style={{ background: `${p.color}12`, border: `1px solid ${p.color}30`, color: p.color }}
            >
              {p.icon}
              <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: C.dark }}>{p.label}</span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Copy message */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[9px] tracking-[0.32em] uppercase" style={{ color: C.muted }}>Ready-made Message</p>
          <motion.button
            onClick={copy}
            whileHover={{ opacity: 0.7 }}
            whileTap={{ scale: 0.95 }}
            className="text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 transition-colors duration-200"
            style={{ color: copied ? C.green : C.muted, border: `1px solid ${copied ? C.green : C.border}` }}
          >
            {copied ? "Copied ✓" : "Copy"}
          </motion.button>
        </div>
        <p
          className="p-4 text-[12px] leading-[1.9] select-all cursor-text"
          style={{ background: "rgba(26,26,26,0.03)", border: `1px solid ${C.border}`, color: C.dark }}
        >
          {message}
        </p>
      </div>

      {/* Divider + note */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1" style={{ background: C.border }} />
        <span className="text-[9px] tracking-[0.22em] uppercase shrink-0" style={{ color: C.muted }}>Every share reaches 50+ people</span>
        <div className="h-px flex-1" style={{ background: C.border }} />
      </div>
    </div>
  );
}

/* ── Left decorative panel (desktop only) ──────────────────── */
function SidePanel() {
  return (
    <div
      className="hidden lg:flex flex-col relative overflow-hidden shrink-0"
      style={{ background: C.navy, width: "280px" }}
    >
      {/* Ghost "S" */}
      <div
        className="absolute pointer-events-none select-none"
        style={{ right: "-30px", bottom: "-60px", fontSize: "20rem", fontWeight: 300, letterSpacing: "-0.1em", color: "rgba(246,246,246,0.04)", lineHeight: 1 }}
      >
        S
      </div>

      <div className="flex flex-col h-full p-10 xl:p-12">
        <div className="w-0.5 h-14 mb-8 shrink-0" style={{ background: C.light }} />

        <h2 className="font-light leading-[1.1] mb-5 text-[1.7rem]" style={{ letterSpacing: "-0.02em", color: C.light }}>
          Stand with<br />Omoowo.
        </h2>
        <p className="text-[12px] leading-[1.9]" style={{ color: "rgba(246,246,246,0.5)" }}>
          Every contribution — money, time, or a single share — brings Ogun East one step closer to the leadership it deserves.
        </p>

        <div className="mt-auto pt-10 space-y-7">
          {[
            { n: "12+",    label: "LGAs Reached", accent: C.light },
            { n: "5,000+", label: "Supporters",   accent: C.red   },
            { n: "2027",   label: "Election Year", accent: C.light },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-light mb-0.5 leading-none" style={{ color: s.accent }}>{s.n}</p>
              <p className="text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(246,246,246,0.35)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── MODAL ─────────────────────────────────────────────────── */
export default function SupportModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("donate");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  /* Lock scroll + Escape to close */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const tabs: { id: Tab; label: string; accent: string }[] = [
    { id: "donate",    label: "Donate",    accent: C.red   },
    { id: "volunteer", label: "Volunteer", accent: C.green },
    { id: "share",     label: "Share",     accent: C.green },
  ];

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[100]"
            style={{ background: "rgba(0,139,77,0.65)", backdropFilter: "blur(8px)" }}
          />

          {/* Centering wrapper — pointer-events-none so clicks pass through to backdrop */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 36, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.42, ease }}
              onClick={(e) => e.stopPropagation()}
              className="pointer-events-auto flex w-full overflow-hidden"
              style={{ maxWidth: "860px", maxHeight: "90vh", boxShadow: "0 32px 80px rgba(0,0,0,0.28)" }}
            >
              <SidePanel />

              {/* Right pane */}
              <div className="flex-1 flex flex-col overflow-hidden" style={{ background: C.light }}>

                {/* Mobile-only top accent bar */}
                <div className="lg:hidden flex h-1 w-full shrink-0">
                  <div className="flex-1" style={{ background: C.green }} />
                  <div className="flex-1" style={{ background: C.red }} />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-7 md:px-8 pt-6 shrink-0">
                  <p className="flex items-center gap-2.5 text-[10px] tracking-[0.38em] uppercase" style={{ color: C.muted }}>
                    <span className="w-0.5 h-4 shrink-0 inline-block" style={{ background: C.green }} />
                    Support Omoowo 2027
                  </p>
                  <button
                    onClick={onClose}
                    aria-label="Close"
                    className="flex items-center justify-center w-8 h-8 hover:opacity-40 transition-opacity duration-200"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 1l12 12M13 1L1 13" stroke={C.dark} strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                {/* Mobile tagline — only visible when side panel is hidden */}
                <div className="lg:hidden px-7 md:px-8 pt-4 pb-0">
                  <p className="text-lg font-light" style={{ letterSpacing: "-0.02em", color: C.dark }}>Stand with Omoowo.</p>
                </div>

                {/* Tabs */}
                <div
                  className="flex items-end gap-0 px-7 md:px-8 pt-5 pb-0 border-b shrink-0 overflow-x-auto"
                  style={{ borderColor: C.border }}
                >
                  {tabs.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className="relative pb-3 mr-6 text-[10px] tracking-[0.22em] uppercase shrink-0 transition-colors duration-200 hover:opacity-70"
                      style={{ color: tab === t.id ? C.dark : C.muted }}
                    >
                      {t.label}
                      {tab === t.id && (
                        <motion.div
                          layoutId="sm-tab-ul"
                          className="absolute bottom-0 left-0 w-full h-0.5"
                          style={{ background: t.accent }}
                          transition={{ type: "spring", stiffness: 300, damping: 28 }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Scrollable tab content */}
                <div className="flex-1 overflow-y-auto px-7 md:px-8 py-7">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={tab}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.28, ease }}
                    >
                      {tab === "donate"    && <DonateTab />}
                      {tab === "volunteer" && <VolunteerTab />}
                      {tab === "share"     && <ShareTab />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
