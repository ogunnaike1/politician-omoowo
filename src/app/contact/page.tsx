"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const C = {
  dark:   "#1A1A1A",
  red:    "#E63035",
  green:  "#008B4D",
  light:  "#FFFFFF",
  muted:  "#888888",
  bg:     "#FFFFFF",
  border: "#DCDCDC",
} as const;

/* ══════════════════════════════════════════
   FLOATING LABEL INPUT
   Accepts theme props so it works on both white and navy backgrounds
══════════════════════════════════════════ */
function FloatingField({
  label, type = "text", value, onChange, required,
  focusColor = C.red,
  restBorder = C.border,
  textColor  = C.dark,
  labelColor = C.muted,
}: {
  label: string; type?: string; value: string;
  onChange: (v: string) => void; required?: boolean;
  focusColor?: string; restBorder?: string; textColor?: string; labelColor?: string;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative border-b transition-colors duration-300" style={{ borderColor: focused ? focusColor : restBorder }}>
      <label
        className="absolute left-0 pointer-events-none transition-all duration-200 select-none"
        style={{
          top: lifted ? "4px" : "50%",
          transform: lifted ? "none" : "translateY(-50%)",
          fontSize: lifted ? "9px" : "13px",
          letterSpacing: lifted ? "0.28em" : "0.04em",
          textTransform: "uppercase",
          color: focused ? focusColor : labelColor,
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
        style={{ color: textColor, caretColor: focusColor }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-px origin-left"
        style={{ background: focusColor }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

function FloatingTextarea({
  label, value, onChange, maxLength = 500,
  focusColor = C.red,
  restBorder = C.border,
  textColor  = C.dark,
  labelColor = C.muted,
}: {
  label: string; value: string; onChange: (v: string) => void; maxLength?: number;
  focusColor?: string; restBorder?: string; textColor?: string; labelColor?: string;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative border-b transition-colors duration-300" style={{ borderColor: focused ? focusColor : restBorder }}>
      <label
        className="absolute left-0 pointer-events-none transition-all duration-200 select-none"
        style={{
          top: lifted ? "4px" : "18px",
          fontSize: lifted ? "9px" : "13px",
          letterSpacing: lifted ? "0.28em" : "0.04em",
          textTransform: "uppercase",
          color: focused ? focusColor : labelColor,
          fontWeight: 400,
        }}
      >
        {label}
      </label>
      <textarea
        value={value} maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={5}
        className="w-full bg-transparent pt-8 pb-2 text-sm outline-none resize-none"
        style={{ color: textColor, caretColor: focusColor }}
      />
      <div className="flex items-center justify-between pb-2">
        <motion.div
          className="h-px origin-left flex-1"
          style={{ background: focusColor }}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <span
          className="text-[9px] tracking-[0.18em] ml-4 shrink-0 tabular-nums"
          style={{ color: value.length > maxLength * 0.85 ? "#d97706" : restBorder }}
        >
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   1. HERO — WHITE background
══════════════════════════════════════════ */
function ContactHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  return (
    <section ref={ref} className="relative overflow-hidden flex flex-col" style={{ minHeight: "72vh", background: "#FFFFFF" }}>
      {/* Ghost "C" watermark — dark on white */}
      <div
        className="absolute pointer-events-none select-none"
        style={{ right: "-4vw", top: "50%", transform: "translateY(-50%)", fontSize: "clamp(18rem, 40vw, 42rem)", fontWeight: 300, letterSpacing: "-0.08em", color: "rgba(26,26,26,0.025)", lineHeight: 1 }}
      >
        C
      </div>

      {/* Radial glows: green left, red right */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 5% 80%, rgba(0,139,77,0.06) 0%, transparent 50%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 90% 20%, rgba(230,48,53,0.06) 0%, transparent 50%)" }} />
      </div>

      {/* Vertical rule */}
      <div className="absolute top-0 bottom-0 w-px pointer-events-none" style={{ left: "clamp(1.5rem, 5vw, 5rem)", background: "rgba(26,26,26,0.04)" }} />

      <motion.div style={{ y: textY }} className="relative z-10 flex-1 flex flex-col max-w-300 mx-auto w-full px-6 md:px-12 lg:px-20">

        {/* Top bar */}
        <div className="flex items-center justify-between pt-32 md:pt-36 pb-5 border-b" style={{ borderColor: "rgba(26,26,26,0.07)" }}>
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="flex items-center gap-3"
          >
            <span className="w-0.5 h-4 shrink-0 inline-block" style={{ background: C.green }} />
            <div className="w-5 h-px" style={{ background: C.red }} />
            <span className="text-[10px] tracking-[0.42em] uppercase" style={{ color: C.muted }}>Get in Touch</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-2.5"
          >
            <div className="relative w-1.5 h-1.5">
              <div className="absolute inset-0 rounded-full bg-green-400 opacity-50 animate-ping" />
              <div className="rounded-full w-1.5 h-1.5 bg-green-400" />
            </div>
            <span className="text-[9px] tracking-[0.28em] uppercase" style={{ color: "rgba(26,26,26,0.35)" }}>Campaign open</span>
          </motion.div>
        </div>

        {/* Headline */}
        <div className="flex-1 flex items-center py-16 md:py-20">
          <div>
            <h1 className="font-light leading-[0.96] mb-10" style={{ fontSize: "clamp(3.6rem, 10vw, 10.5rem)", letterSpacing: "-0.04em", color: C.dark }}>
              {[
                { words: ["Your"], d: 0.3 },
                { words: ["voice"], d: 0.44 },
                { words: ["matters."], d: 0.57 },
              ].map(({ words, d }) => (
                <span key={d} style={{ display: "block" }}>
                  {words.map((word, wi) => (
                    <span key={wi} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.19em" }}>
                      <motion.span style={{ display: "inline-block" }} initial={{ y: "112%" }} animate={{ y: "0%" }} transition={{ duration: 1.1, delay: d + wi * 0.08, ease }}>
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.85, ease }}
              className="text-sm leading-[1.95] max-w-md" style={{ color: C.muted }}
            >
              Omoowo is committed to hearing from every community in Ogun East &mdash;
              whether you have a question, want to get involved, or need to reach the campaign team directly.
            </motion.p>
          </div>
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="border-t py-5 flex flex-wrap gap-x-10 gap-y-2"
          style={{ borderColor: "rgba(26,26,26,0.07)" }}
        >
          {[
            { label: "Campaign Office", val: "Ijebu-Ode, Ogun State" },
            { label: "Email",           val: "contact@omoowo2027.ng" },
            { label: "WhatsApp",        val: "+234 800 000 0000" },
          ].map((c) => (
            <div key={c.label} className="flex items-center gap-3">
              <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: C.muted }}>{c.label}</span>
              <span className="text-[9px] tracking-[0.18em]" style={{ color: C.dark }}>{c.val}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   2. CONTACT FORM + INFO — #094E7D background
══════════════════════════════════════════ */
const SUBJECTS = ["General Enquiry", "Media & Press", "Volunteer", "Constituency Issue"] as const;
type Subject = (typeof SUBJECTS)[number];

/* Info item with per-item hover accent */
const infoAccent = [C.green, C.red, C.green, C.red] as string[];

function ContactInfoItem({ item, i, inView }: { item: { label: string; lines: string[] }; i: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const accent = infoAccent[i];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="py-6 cursor-default transition-colors duration-200"
      style={{ borderColor: "rgba(246,246,246,0.1)", backgroundColor: hovered ? "rgba(255,255,255,0.04)" : "transparent" }}
    >
      <p
        className="text-[9px] tracking-[0.32em] uppercase mb-2.5 transition-colors duration-200"
        style={{ color: hovered ? accent : "rgba(246,246,246,0.4)" }}
      >
        {item.label}
      </p>
      {item.lines.map((line, j) => (
        <p
          key={j}
          className="text-[13px] leading-[1.7]"
          style={{ color: j === 0 ? "rgba(246,246,246,0.85)" : "rgba(246,246,246,0.45)" }}
          dangerouslySetInnerHTML={{ __html: line }}
        />
      ))}
    </motion.div>
  );
}

function ContactMain() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  const [subject, setSubject] = useState<Subject>("General Enquiry");
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [phone,   setPhone]   = useState("");
  const [message, setMessage] = useState("");
  const [sent,    setSent]    = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) setSent(true);
  };

  /* Field theme for navy background */
  const fieldTheme = {
    focusColor: C.green,
    restBorder: "rgba(246,246,246,0.2)",
    textColor:  "rgba(246,246,246,0.9)",
    labelColor: "rgba(246,246,246,0.4)",
  };

  const infoItems = [
    { label: "Campaign Office", lines: ["Omoowo 2027 Campaign HQ", "Ijebu-Ode, Ogun State", "Nigeria"] },
    { label: "Email",           lines: ["contact@omoowo2027.ng", "press@omoowo2027.ng (Media only)"] },
    { label: "WhatsApp",        lines: ["+234 800 000 0000", "Mon &ndash; Sat &middot; 8am &ndash; 6pm WAT"] },
    { label: "Social",          lines: ["@Omoowo2027 (Twitter/X)", "@OmoowoCampaign (Facebook)"] },
  ];

  return (
    <section ref={ref} className="py-24 md:py-40 px-6 md:px-12 lg:px-20" style={{ background: "#094E7D" }}>
      <div className="max-w-300 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-20 lg:gap-32 items-start">

          {/* Left — contact info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.85, ease }}>
            <p className="flex items-center gap-2.5 text-[10px] tracking-[0.42em] uppercase mb-5" style={{ color: C.red }}>
              <span className="w-0.5 h-4 shrink-0 inline-block" style={{ background: C.green }} />
              Reach Us
            </p>
            <h2 className="font-light leading-[1.08] mb-12" style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.6rem)", letterSpacing: "-0.02em", color: C.light }}>
              We respond to every message.
            </h2>

            <div className="space-y-0 divide-y" style={{ borderColor: "rgba(246,246,246,0.1)" }}>
              {infoItems.map((item, i) => (
                <ContactInfoItem key={item.label} item={item} i={i} inView={inView} />
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.85, delay: 0.15, ease }}>
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} onSubmit={handleSubmit}>

                  {/* Subject tabs */}
                  <div className="mb-10">
                    <p className="text-[9px] tracking-[0.32em] uppercase mb-4" style={{ color: "rgba(246,246,246,0.4)" }}>Subject</p>
                    <div className="flex flex-wrap gap-2">
                      {SUBJECTS.map((s) => (
                        <button
                          key={s} type="button" onClick={() => setSubject(s)}
                          className="relative px-4 py-2 text-[10px] tracking-[0.18em] uppercase overflow-hidden transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                          style={{
                            color: subject === s ? C.light : "rgba(246,246,246,0.5)",
                            border: `1px solid ${subject === s ? C.red : "rgba(246,246,246,0.2)"}`,
                          }}
                        >
                          {subject === s && (
                            <motion.span layoutId="subject-pill" className="absolute inset-0" style={{ background: C.red }} transition={{ type: "spring", stiffness: 270, damping: 26 }} />
                          )}
                          <span className="relative z-10">{s}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fields */}
                  <div className="space-y-8 mb-10">
                    {[0, 1, 2].map((i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.25 + i * 0.08, ease }}>
                        {i === 0 && <FloatingField label="Full Name"        value={name}  onChange={setName}  required {...fieldTheme} />}
                        {i === 1 && <FloatingField label="Email Address" type="email" value={email} onChange={setEmail} required {...fieldTheme} />}
                        {i === 2 && <FloatingField label="Phone (optional)" type="tel"  value={phone} onChange={setPhone} {...fieldTheme} />}
                      </motion.div>
                    ))}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.49, ease }}>
                      <FloatingTextarea label="Your Message" value={message} onChange={setMessage} {...fieldTheme} />
                    </motion.div>
                  </div>

                  {/* Send button — red, hover turns green */}
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.58, ease }}>
                    <motion.button
                      type="submit"
                      className="group relative flex items-center gap-4 px-8 py-4 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                      style={{ background: C.red, color: C.light }}
                      whileHover="hov" whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 origin-left"
                        style={{ background: C.green }}
                        variants={{ hov: { scaleX: 1 }, default: { scaleX: 0 } }}
                        initial="default"
                        transition={{ duration: 0.35, ease }}
                      />
                      <span className="relative z-10 text-[11px] tracking-[0.22em] uppercase">Send Message</span>
                      <motion.span className="relative z-10 text-lg" variants={{ hov: { x: 5 }, default: { x: 0 } }} transition={{ duration: 0.25 }}>
                        &rarr;
                      </motion.span>
                    </motion.button>
                    <p className="text-[10px] mt-4" style={{ color: "rgba(246,246,246,0.25)" }}>
                      We typically respond within 2 business days.
                    </p>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.div key="thanks" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="py-16">
                  <motion.svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-8">
                    <motion.circle cx="24" cy="24" r="22" stroke={C.green} strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, ease }} />
                    <motion.path d="M14 24l7 7 13-14" stroke={C.green} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.55, ease }} />
                  </motion.svg>
                  <motion.div className="w-10 h-px mb-6" style={{ background: C.green }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.3 }} />
                  <p className="text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: C.green }}>Message Received</p>
                  <h3 className="font-light leading-[1.2] mb-6" style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)", letterSpacing: "-0.02em", color: C.light }}>
                    Thank you, {name.split(" ")[0]}.
                  </h3>
                  <p className="text-sm leading-[1.85] mb-10" style={{ color: "rgba(246,246,246,0.55)" }}>
                    Your message has been received by the Omoowo 2027 campaign team. We will respond to <strong style={{ color: C.light, fontWeight: 500 }}>{email}</strong> within 2 business days.
                  </p>
                  <button
                    onClick={() => { setSent(false); setName(""); setEmail(""); setPhone(""); setMessage(""); }}
                    className="text-[10px] tracking-[0.22em] uppercase pb-px hover:opacity-60 transition-opacity duration-200"
                    style={{ color: C.red, borderBottom: `1px solid ${C.red}` }}
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   3. OFFICE LOCATIONS — WHITE background
   Office accents: green / red / green
══════════════════════════════════════════ */
const officeAccent = [C.green, C.red, C.green] as string[];

function Offices() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  const offices = [
    { lga: "Ijebu-East",    role: "Campaign Headquarters", address: "Omoowo 2027 Campaign HQ\nIjebu-Ode, Ogun State", hours: "Mon – Sat · 8am – 6pm WAT" },
    { lga: "Ogun Waterside",role: "District Office",       address: "Ogun Waterside LGA Area\nOgun Waterside, Ogun State", hours: "Mon – Fri · 9am – 5pm WAT" },
    { lga: "Ikenne",         role: "Constituency Office",   address: "Sagamu Area\nIkenne LGA, Ogun State", hours: "Mon – Fri · 9am – 5pm WAT" },
  ];

  return (
    <section ref={ref} className="py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ background: "#FFFFFF" }}>
      <div className="max-w-300 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 text-[10px] tracking-[0.42em] uppercase mb-4"
              style={{ color: C.red }}
            >
              <span className="w-0.5 h-4 shrink-0 inline-block" style={{ background: C.green }} />
              Our Offices
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1, ease }}
              className="font-light leading-[1.08]"
              style={{ fontSize: "clamp(1.7rem, 3vw, 2.8rem)", letterSpacing: "-0.025em", color: C.dark }}
            >
              Present in every LGA.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[11px] leading-[1.75] max-w-xs text-right hidden md:block" style={{ color: C.muted }}
          >
            Every constituency office is open to residents<br />of Ogun East — no appointment needed.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "rgba(26,26,26,0.07)" }}>
          {offices.map((o, i) => {
            const accent = officeAccent[i];
            return (
              <motion.div
                key={o.lga}
                initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease }}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 260, damping: 22 } }}
                className="p-10 md:p-12 group cursor-default"
                style={{ background: C.bg }}
              >
                <div className="w-8 h-px mb-8 group-hover:w-14 transition-all duration-300" style={{ background: accent }} />
                <p className="text-[9px] tracking-[0.35em] uppercase mb-2" style={{ color: C.muted }}>{o.role}</p>
                <h3
                  className="font-light leading-tight mb-5 transition-colors duration-250"
                  style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)", letterSpacing: "-0.01em", color: C.dark }}
                >
                  {o.lga}
                </h3>
                <p className="text-[12px] leading-[1.8] mb-5" style={{ color: C.muted, whiteSpace: "pre-line" }}>{o.address}</p>
                <p className="text-[10px] tracking-[0.18em] uppercase" style={{ color: C.border }}>{o.hours}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   4. PRESS ENQUIRIES — #094E7D background
   Cards alternate green / red hover
══════════════════════════════════════════ */
const pressAccent = [C.green, C.red, C.green, C.red] as string[];

const pressCards = [
  { heading: "Press Releases",      body: "All official statements and press releases from the Omoowo 2027 campaign are published on the News page and sent directly to registered media contacts.", link: "View News Page",      href: "/news" },
  { heading: "Interview Requests",  body: "To request an interview with Alhaji Omoowo or a campaign spokesperson, email press@omoowo2027.ng with your outlet, deadline, and proposed format.", link: "Email Press Team",    href: "mailto:press@omoowo2027.ng" },
  { heading: "Media Resources",     body: "High-resolution photos, approved campaign imagery, and official candidate bios are available upon request for registered media organisations.", link: "Request Media Kit",   href: "mailto:press@omoowo2027.ng" },
  { heading: "Campaign Appearances",body: "For requests to cover campaign events, rallies, and constituency visits, contact the press office at least 48 hours in advance.", link: "Contact Press Office", href: "mailto:press@omoowo2027.ng" },
];

function PressCard({ card, i, inView }: { card: typeof pressCards[0]; i: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const accent = pressAccent[i];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.08 + i * 0.08, ease }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="p-8 cursor-default transition-colors duration-250"
      style={{ background: hovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)" }}
    >
      <h4
        className="text-sm font-medium mb-3 transition-colors duration-250"
        style={{ color: hovered ? accent : "rgba(246,246,246,0.85)" }}
      >
        {card.heading}
      </h4>
      <p className="text-[12px] leading-[1.85] mb-6" style={{ color: "rgba(246,246,246,0.45)" }}>{card.body}</p>
      <a
        href={card.href}
        className="relative inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase focus-visible:outline-none"
        style={{ color: accent }}
      >
        {card.link}
        <span className="inline-block transition-transform duration-200 hover:translate-x-1">&rarr;</span>
        <span className="absolute -bottom-0.5 left-0 w-full h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{ background: accent }} />
      </a>
    </motion.div>
  );
}

function Press() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ background: "#094E7D" }}>
      <div className="max-w-300 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-28 items-start">

          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease }}>
            <p className="flex items-center gap-2.5 text-[10px] tracking-[0.42em] uppercase mb-4" style={{ color: C.red }}>
              <span className="w-0.5 h-4 shrink-0 inline-block" style={{ background: C.green }} />
              Media &amp; Press
            </p>
            <h2 className="font-light leading-[1.1]" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", letterSpacing: "-0.02em", color: C.light }}>
              For journalists and broadcasters.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: "rgba(246,246,246,0.08)" }}>
            {pressCards.map((card, i) => (
              <PressCard key={card.heading} card={card} i={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   5. CTA — WHITE background
══════════════════════════════════════════ */
function ContactCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 md:py-36 px-6 md:px-12 lg:px-20" style={{ background: "#FFFFFF" }}>
      <div className="max-w-300 mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
        <div>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5 text-[10px] tracking-[0.4em] uppercase mb-4"
            style={{ color: C.red }}
          >
            <span className="w-0.5 h-4 shrink-0 inline-block" style={{ background: C.green }} />
            Explore More
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1, ease }}
            className="font-light" style={{ fontSize: "clamp(1.7rem, 3.5vw, 3rem)", letterSpacing: "-0.02em", color: C.dark }}
          >
            Join Omoowo&apos;s movement.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3, ease }}
          className="flex flex-wrap gap-4 shrink-0"
        >
          {/* neutral */}
          <a href="/" className="px-7 py-3 text-[11px] tracking-[0.2em] uppercase hover:opacity-60 transition-opacity duration-200" style={{ border: `1px solid ${C.border}`, color: C.muted }}>
            &larr; Back to Home
          </a>
          {/* green */}
          <a href="/events" className="px-7 py-3 text-[11px] tracking-[0.2em] uppercase hover:opacity-80 transition-opacity duration-200" style={{ background: C.green, color: C.light }}>
            View Events
          </a>
          {/* red */}
          <a href="/#involved" className="px-7 py-3 text-[11px] tracking-[0.2em] uppercase hover:opacity-80 transition-opacity duration-200" style={{ background: C.red, color: C.light }}>
            Get Involved
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <ContactHero />
        <ContactMain />
        <Offices />
        <Press />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
