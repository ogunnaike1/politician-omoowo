"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const C = {
  dark: "#1A1A1A",
  mid: "#E63035",
  light: "#FFFFFF",
  muted: "#888888",
  bg: "#FFFFFF",
  border: "#DCDCDC",
} as const;

/* ══════════════════════════════════════════
   FLOATING LABEL INPUT
══════════════════════════════════════════ */
function FloatingField({
  label,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative border-b transition-colors duration-300" style={{ borderColor: focused ? C.mid : C.border }}>
      <label
        className="absolute left-0 pointer-events-none transition-all duration-200 select-none"
        style={{
          top: lifted ? "4px" : "50%",
          transform: lifted ? "none" : "translateY(-50%)",
          fontSize: lifted ? "9px" : "13px",
          letterSpacing: lifted ? "0.28em" : "0.04em",
          textTransform: "uppercase",
          color: focused ? C.mid : C.muted,
          fontWeight: 400,
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent pt-6 pb-2 text-sm outline-none"
        style={{ color: C.dark, caretColor: C.mid }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-px origin-left"
        style={{ background: C.mid }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

function FloatingTextarea({
  label,
  value,
  onChange,
  maxLength = 500,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  maxLength?: number;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative border-b transition-colors duration-300" style={{ borderColor: focused ? C.mid : C.border }}>
      <label
        className="absolute left-0 pointer-events-none transition-all duration-200 select-none"
        style={{
          top: lifted ? "4px" : "18px",
          fontSize: lifted ? "9px" : "13px",
          letterSpacing: lifted ? "0.28em" : "0.04em",
          textTransform: "uppercase",
          color: focused ? C.mid : C.muted,
          fontWeight: 400,
        }}
      >
        {label}
      </label>
      <textarea
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={5}
        className="w-full bg-transparent pt-8 pb-2 text-sm outline-none resize-none"
        style={{ color: C.dark, caretColor: C.mid }}
      />
      <div className="flex items-center justify-between pb-2">
        <motion.div
          className="h-px origin-left flex-1"
          style={{ background: C.mid }}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <span
          className="text-[9px] tracking-[0.18em] ml-4 shrink-0 tabular-nums"
          style={{ color: value.length > maxLength * 0.85 ? "#d97706" : C.border }}
        >
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   1. HERO
══════════════════════════════════════════ */
function ContactHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden flex flex-col"
      style={{ minHeight: "72vh", background: "#094e7d" }}
    >
      {/* Ghost "C" watermark */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          right: "-4vw",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "clamp(18rem, 40vw, 42rem)",
          fontWeight: 300,
          letterSpacing: "-0.08em",
          color: "rgba(246,246,246,0.025)",
          lineHeight: 1,
        }}
      >
        C
      </div>

      {/* Vertical rule */}
      <div
        className="absolute top-0 bottom-0 w-px pointer-events-none"
        style={{ left: "clamp(1.5rem, 5vw, 5rem)", background: "rgba(246,246,246,0.04)" }}
      />

      <motion.div
        style={{ y: textY }}
        className="relative z-10 flex-1 flex flex-col max-w-300 mx-auto w-full px-6 md:px-12 lg:px-20"
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between pt-32 md:pt-36 pb-5 border-b"
          style={{ borderColor: "rgba(246,246,246,0.07)" }}
        >
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="flex items-center gap-4"
          >
            <div className="w-5 h-px" style={{ background: C.mid }} />
            <span className="text-[10px] tracking-[0.42em] uppercase" style={{ color: "rgba(246,246,246,0.35)" }}>
              Get in Touch
            </span>
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
            <span className="text-[9px] tracking-[0.28em] uppercase" style={{ color: "rgba(246,246,246,0.28)" }}>
              Campaign open
            </span>
          </motion.div>
        </div>

        {/* Headline */}
        <div className="flex-1 flex items-center py-16 md:py-20">
          <div>
            <h1
              className="font-light leading-[0.96] mb-10"
              style={{
                fontSize: "clamp(3.6rem, 10vw, 10.5rem)",
                letterSpacing: "-0.04em",
                color: C.light,
              }}
            >
              {[
                { words: ["Your"], d: 0.3 },
                { words: ["voice"], d: 0.44 },
                { words: ["matters."], d: 0.57 },
              ].map(({ words, d }) => (
                <span key={d} style={{ display: "block" }}>
                  {words.map((word, wi) => (
                    <span
                      key={wi}
                      style={{ display: "inline-block", overflow: "hidden", marginRight: "0.19em" }}
                    >
                      <motion.span
                        style={{ display: "inline-block" }}
                        initial={{ y: "112%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 1.1, delay: d + wi * 0.08, ease }}
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.85, ease }}
              className="text-sm leading-[1.95] max-w-md"
              style={{ color: "rgba(246,246,246,0.48)" }}
            >
              Omoowo is committed to hearing from every community in Ogun East &mdash;
              whether you have a question, want to get involved, or need to reach the campaign team directly.
            </motion.p>
          </div>
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="border-t py-5 flex flex-wrap gap-x-10 gap-y-2"
          style={{ borderColor: "rgba(246,246,246,0.07)" }}
        >
          {[
            { label: "Campaign Office", val: "Ijebu-Ode, Ogun State" },
            { label: "Email", val: "contact@omoowo2027.ng" },
            { label: "WhatsApp", val: "+234 800 000 0000" },
          ].map((c) => (
            <div key={c.label} className="flex items-center gap-3">
              <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(246,246,246,0.28)" }}>{c.label}</span>
              <span className="text-[9px] tracking-[0.18em]" style={{ color: "rgba(246,246,246,0.5)" }}>{c.val}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   2. CONTACT FORM + INFO
══════════════════════════════════════════ */
const SUBJECTS = ["General Enquiry", "Media & Press", "Volunteer", "Constituency Issue"] as const;
type Subject = (typeof SUBJECTS)[number];

function ContactMain() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  const [subject, setSubject] = useState<Subject>("General Enquiry");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) setSent(true);
  };

  return (
    <section ref={ref} className="py-24 md:py-40 px-6 md:px-12 lg:px-20" style={{ background: C.bg }}>
      <div className="max-w-300 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-20 lg:gap-32 items-start">

          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, ease }}
          >
            <p className="text-[10px] tracking-[0.42em] uppercase mb-5" style={{ color: C.mid }}>
              Reach Us
            </p>
            <h2
              className="font-light text-[#1A1A1A] leading-[1.08] mb-12"
              style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.6rem)", letterSpacing: "-0.02em" }}
            >
              We respond to every message.
            </h2>

            <div className="space-y-0 divide-y" style={{ borderColor: C.border }}>
              {[
                {
                  label: "Campaign Office",
                  lines: ["Omoowo 2027 Campaign HQ", "Ijebu-Ode, Ogun State", "Nigeria"],
                },
                {
                  label: "Email",
                  lines: ["contact@omoowo2027.ng", "press@omoowo2027.ng (Media only)"],
                },
                {
                  label: "WhatsApp",
                  lines: ["+234 800 000 0000", "Mon – Sat &middot; 8am – 6pm WAT"],
                },
                {
                  label: "Social",
                  lines: ["@Omoowo2027 (Twitter/X)", "@OmoowoCampaign (Facebook)"],
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease }}
                  className="py-6 group hover:bg-[rgba(230,48,53,0.03)] transition-colors duration-200 cursor-default"
                >
                  <p className="text-[9px] tracking-[0.32em] uppercase mb-2.5 group-hover:text-[#E63035] transition-colors duration-200" style={{ color: C.muted }}>
                    {item.label}
                  </p>
                  {item.lines.map((line, j) => (
                    <p
                      key={j}
                      className="text-[13px] leading-[1.7]"
                      style={{ color: j === 0 ? C.dark : C.muted }}
                      dangerouslySetInnerHTML={{ __html: line }}
                    />
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.15, ease }}
          >
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                >
                  {/* Subject tabs */}
                  <div className="mb-10">
                    <p className="text-[9px] tracking-[0.32em] uppercase mb-4" style={{ color: C.muted }}>
                      Subject
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SUBJECTS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSubject(s)}
                          className="relative px-4 py-2 text-[10px] tracking-[0.18em] uppercase overflow-hidden transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63035]/40"
                          style={{
                            color: subject === s ? C.light : C.muted,
                            border: `1px solid ${subject === s ? C.mid : C.border}`,
                          }}
                        >
                          {subject === s && (
                            <motion.span
                              layoutId="subject-pill"
                              className="absolute inset-0"
                              style={{ background: C.mid }}
                              transition={{ type: "spring", stiffness: 270, damping: 26 }}
                            />
                          )}
                          <span className="relative z-10">{s}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fields */}
                  <div className="space-y-8 mb-10">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.25 + i * 0.08, ease }}
                      >
                        {i === 0 && (
                          <FloatingField label="Full Name" value={name} onChange={setName} required />
                        )}
                        {i === 1 && (
                          <FloatingField label="Email Address" type="email" value={email} onChange={setEmail} required />
                        )}
                        {i === 2 && (
                          <FloatingField label="Phone (optional)" type="tel" value={phone} onChange={setPhone} />
                        )}
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.49, ease }}
                    >
                      <FloatingTextarea label="Your Message" value={message} onChange={setMessage} />
                    </motion.div>
                  </div>

                  {/* Send */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.58, ease }}
                  >
                    <motion.button
                      type="submit"
                      className="group relative flex items-center gap-4 px-8 py-4 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63035]/50"
                      style={{ background: "#E63035", color: C.light }}
                      whileHover="hov"
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Sliding bg on hover */}
                      <motion.div
                        className="absolute inset-0 origin-left"
                        style={{ background: C.mid }}
                        variants={{ hov: { scaleX: 1 }, default: { scaleX: 0 } }}
                        initial="default"
                        transition={{ duration: 0.35, ease }}
                      />
                      <span className="relative z-10 text-[11px] tracking-[0.22em] uppercase">
                        Send Message
                      </span>
                      <motion.span
                        className="relative z-10 text-lg"
                        variants={{ hov: { x: 5 }, default: { x: 0 } }}
                        transition={{ duration: 0.25 }}
                      >
                        &rarr;
                      </motion.span>
                    </motion.button>
                    <p className="text-[10px] mt-4" style={{ color: C.border }}>
                      We typically respond within 2 business days.
                    </p>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease }}
                  className="py-16"
                >
                  {/* Animated checkmark */}
                  <motion.svg
                    width="48" height="48" viewBox="0 0 48 48" fill="none"
                    className="mb-8"
                  >
                    <motion.circle
                      cx="24" cy="24" r="22"
                      stroke={C.mid}
                      strokeWidth="1.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.7, ease }}
                    />
                    <motion.path
                      d="M14 24l7 7 13-14"
                      stroke={C.mid}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.55, ease }}
                    />
                  </motion.svg>

                  <motion.div
                    className="w-10 h-px mb-6"
                    style={{ background: C.mid }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  />

                  <p className="text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: C.mid }}>
                    Message Received
                  </p>
                  <h3
                    className="font-light text-[#1A1A1A] leading-[1.2] mb-6"
                    style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)", letterSpacing: "-0.02em" }}
                  >
                    Thank you, {name.split(" ")[0]}.
                  </h3>
                  <p className="text-sm leading-[1.85] mb-10" style={{ color: C.muted }}>
                    Your message has been received by the Omoowo 2027 campaign team. We will respond to <strong style={{ color: C.dark, fontWeight: 500 }}>{email}</strong> within 2 business days.
                  </p>
                  <button
                    onClick={() => { setSent(false); setName(""); setEmail(""); setPhone(""); setMessage(""); }}
                    className="text-[10px] tracking-[0.22em] uppercase pb-px hover:opacity-60 transition-opacity duration-200"
                    style={{ color: C.mid, borderBottom: `1px solid ${C.mid}` }}
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
   3. OFFICE LOCATIONS
══════════════════════════════════════════ */
function Offices() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  const offices = [
    {
      lga: "Ijebu-East",
      role: "Campaign Headquarters",
      address: "Omoowo 2027 Campaign HQ\nIjebu-Ode, Ogun State",
      hours: "Mon – Sat · 8am – 6pm WAT",
      accent: C.mid,
    },
    {
      lga: "Ogun Waterside",
      role: "District Office",
      address: "Ogun Waterside LGA Area\nOgun Waterside, Ogun State",
      hours: "Mon – Fri · 9am – 5pm WAT",
      accent: C.dark,
    },
    {
      lga: "Ikenne",
      role: "Constituency Office",
      address: "Sagamu Area\nIkenne LGA, Ogun State",
      hours: "Mon – Fri · 9am – 5pm WAT",
      accent: C.mid,
    },
  ];

  return (
    <section ref={ref} className="py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ background: "#094e7d" }}>
      <div className="max-w-300 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[10px] tracking-[0.42em] uppercase mb-4"
              style={{ color: "rgba(246,246,246,0.35)" }}
            >
              Our Offices
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="font-light text-[#FFFFFF] leading-[1.08]"
              style={{ fontSize: "clamp(1.7rem, 3vw, 2.8rem)", letterSpacing: "-0.025em" }}
            >
              Present in every LGA.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[11px] leading-[1.75] max-w-xs text-right hidden md:block"
            style={{ color: "rgba(246,246,246,0.38)" }}
          >
            Every constituency office is open to residents<br />
            of Ogun East — no appointment needed.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "rgba(246,246,246,0.06)" }}>
          {offices.map((o, i) => (
            <motion.div
              key={o.lga}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease }}
              whileHover={{ y: -5, transition: { type: "spring", stiffness: 260, damping: 22 } }}
              className="p-10 md:p-12 group cursor-default"
              style={{ background: "rgba(230,48,53,0.25)" }}
            >
              <div
                className="w-8 h-px mb-8 group-hover:w-14 transition-all duration-300"
                style={{ background: o.accent }}
              />
              <p className="text-[9px] tracking-[0.35em] uppercase mb-2" style={{ color: "rgba(246,246,246,0.32)" }}>
                {o.role}
              </p>
              <h3
                className="font-light text-[#FFFFFF] leading-tight mb-5 group-hover:text-[#DCDCDC] transition-colors duration-250"
                style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)", letterSpacing: "-0.01em" }}
              >
                {o.lga}
              </h3>
              <p className="text-[12px] leading-[1.8] mb-5" style={{ color: "rgba(246,246,246,0.45)", whiteSpace: "pre-line" }}>
                {o.address}
              </p>
              <p className="text-[10px] tracking-[0.18em] uppercase" style={{ color: "rgba(246,246,246,0.25)" }}>
                {o.hours}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   4. PRESS ENQUIRIES
══════════════════════════════════════════ */
function Press() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ background: C.bg }}>
      <div className="max-w-300 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-28 items-start">

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <p className="text-[10px] tracking-[0.42em] uppercase mb-4" style={{ color: C.mid }}>
              Media &amp; Press
            </p>
            <h2
              className="font-light text-[#1A1A1A] leading-[1.1]"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", letterSpacing: "-0.02em" }}
            >
              For journalists and broadcasters.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: "#E63035" }}>
            {[
              {
                heading: "Press Releases",
                body: "All official statements and press releases from the Omoowo 2027 campaign are published on the News page and sent directly to registered media contacts.",
                link: "View News Page",
                href: "/news",
              },
              {
                heading: "Interview Requests",
                body: "To request an interview with Alhaji Omoowo or a campaign spokesperson, email press@omoowo2027.ng with your outlet, deadline, and proposed format.",
                link: "Email Press Team",
                href: "mailto:press@omoowo2027.ng",
              },
              {
                heading: "Media Resources",
                body: "High-resolution photos, approved campaign imagery, and official candidate bios are available upon request for registered media organisations.",
                link: "Request Media Kit",
                href: "mailto:press@omoowo2027.ng",
              },
              {
                heading: "Campaign Appearances",
                body: "For requests to cover campaign events, rallies, and constituency visits, contact the press office at least 48 hours in advance.",
                link: "Contact Press Office",
                href: "mailto:press@omoowo2027.ng",
              },
            ].map((card, i) => (
              <motion.div
                key={card.heading}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.08 + i * 0.08, ease }}
                className="bg-[#FFFFFF] p-8 group hover:bg-[rgba(230,48,53,0.1)] transition-colors duration-250 cursor-default"
              >
                <h4 className="text-[#1A1A1A] text-sm font-medium mb-3 group-hover:text-[#E63035] transition-colors duration-250">
                  {card.heading}
                </h4>
                <p className="text-[12px] leading-[1.85] mb-6" style={{ color: C.muted }}>
                  {card.body}
                </p>
                <a
                  href={card.href}
                  className="relative inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase group/link focus-visible:outline-none"
                  style={{ color: C.mid }}
                >
                  {card.link}
                  <span className="group-hover/link:translate-x-1 transition-transform duration-200 inline-block">&rarr;</span>
                  <span className="absolute -bottom-0.5 left-0 w-full h-px origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300" style={{ background: C.mid }} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   5. CTA
══════════════════════════════════════════ */
function ContactCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 md:py-36 px-6 md:px-12 lg:px-20" style={{ background: "#E63035" }}>
      <div className="max-w-300 mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[10px] tracking-[0.4em] uppercase mb-4"
            style={{ color: "rgba(246,246,246,0.35)" }}
          >
            Explore More
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="font-light text-[#FFFFFF]"
            style={{ fontSize: "clamp(1.7rem, 3.5vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            Join Omoowo&apos;s movement.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          className="flex flex-wrap gap-4 shrink-0"
        >
          <a
            href="/"
            className="px-7 py-3 border text-[11px] tracking-[0.2em] uppercase hover:opacity-60 transition-opacity duration-200"
            style={{ borderColor: "rgba(246,246,246,0.15)", color: "rgba(246,246,246,0.5)" }}
          >
            &larr; Back to Home
          </a>
          <a
            href="/events"
            className="px-7 py-3 border text-[11px] tracking-[0.2em] uppercase transition-all duration-200"
            style={{ borderColor: C.mid, color: C.light }}
            onMouseEnter={(e) => (e.currentTarget.style.background = C.mid)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            View Events
          </a>
          <a
            href="/#involved"
            className="px-7 py-3 text-[11px] tracking-[0.2em] uppercase transition-colors duration-200 hover:bg-[#E63035]"
            style={{ background: C.mid, color: C.light }}
          >
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
