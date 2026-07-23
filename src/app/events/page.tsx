"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";

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
   CHARACTER SCRAMBLE
══════════════════════════════════════════ */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function ScrambleText({ text, active }: { text: string; active: boolean }) {
  const [display, setDisplay] = useState(() =>
    text.split("").map((c) => (c === " " ? " " : "·")).join("")
  );
  const iterRef = useRef(0);

  useEffect(() => {
    iterRef.current = 0;
    if (!active) {
      setDisplay(text.split("").map((c) => (c === " " ? " " : "·")).join(""));
      return;
    }
    const id = setInterval(() => {
      iterRef.current += 0.42;
      const iter = iterRef.current;
      setDisplay(
        text.split("").map((char, i) => {
          if (char === " ") return " ";
          if (i < iter) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );
      if (iter >= text.length) clearInterval(id);
    }, 32);
    return () => clearInterval(id);
  }, [active, text]);

  return <>{display}</>;
}

/* ══════════════════════════════════════════
   COUNTDOWN TIMER
══════════════════════════════════════════ */
const NEXT_EVENT_DATE = new Date("2026-08-02T10:00:00+01:00");

function Countdown() {
  const calc = () => {
    const diff = Math.max(0, NEXT_EVENT_DATE.getTime() - Date.now());
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff / 3600000) % 24),
      m: Math.floor((diff / 60000) % 60),
      s: Math.floor((diff / 1000) % 60),
    };
  };

  const [t, setT] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { v: t.d, label: "Days" },
    { v: t.h, label: "Hrs" },
    { v: t.m, label: "Min" },
    { v: t.s, label: "Sec" },
  ];

  return (
    <div className="flex items-end">
      {units.map(({ v, label }, i) => (
        <div key={label} className="flex items-end">
          {i > 0 && (
            <span className="font-light pb-5 px-1.5 md:px-2 text-xl md:text-2xl" style={{ color: "rgba(246,246,246,0.18)" }}>
              :
            </span>
          )}
          <div className="text-center">
            <div
              className="font-light leading-none tabular-nums"
              style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)", color: C.light, letterSpacing: "-0.045em" }}
            >
              {String(v).padStart(2, "0")}
            </div>
            <p className="text-[8px] tracking-[0.32em] uppercase mt-2" style={{ color: "rgba(246,246,246,0.32)" }}>
              {label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
type EventType = "Rally" | "Town Hall" | "Forum" | "Summit" | "Consultation";

interface CEvent {
  id: number;
  day: string;
  month: string;
  year: string;
  time: string;
  title: string;
  location: string;
  lga: string;
  type: EventType;
  featured?: boolean;
}

const UPCOMING: CEvent[] = [
  { id: 1, day: "02", month: "Aug", year: "2026", time: "10:00 AM", title: "Grand Campaign Launch Rally",           location: "Ijebu-Ode Township Stadium",      lga: "Ijebu-East",    type: "Rally",        featured: true },
  { id: 2, day: "23", month: "Aug", year: "2026", time: "9:00 AM",  title: "Youth Empowerment Summit",             location: "Sagamu Polytechnic Hall",         lga: "Ikenne",        type: "Summit" },
  { id: 3, day: "06", month: "Sep", year: "2026", time: "2:00 PM",  title: "Women's Forum & Town Hall",            location: "Ijebu-East LGA Secretariat",      lga: "Ijebu-East",    type: "Forum" },
  { id: 4, day: "20", month: "Sep", year: "2026", time: "11:00 AM", title: "Ogun Waterside Stakeholders Consultation", location: "Ogun Waterside LGA Headquarters", lga: "Ogun Waterside",type: "Consultation" },
  { id: 5, day: "04", month: "Oct", year: "2026", time: "8:00 AM",  title: "Ikenne Ward-by-Ward Consultation",    location: "Ikenne LGA Community Centre",     lga: "Ikenne",        type: "Town Hall" },
  { id: 6, day: "08", month: "Nov", year: "2026", time: "12:00 PM", title: "PDP Mega Rally — Ogun East",           location: "Ijebu-Ode Expressway Grounds",    lga: "Ijebu-East",    type: "Rally" },
  { id: 7, day: "06", month: "Dec", year: "2026", time: "10:00 AM", title: "Omoowo Women Leaders Forum",           location: "Sagamu Multi-purpose Hall",       lga: "Ikenne",        type: "Forum" },
  { id: 8, day: "10", month: "Jan", year: "2027", time: "9:00 AM",  title: "Final Campaign Town Hall",            location: "Ijebu-East LGA Grounds",          lga: "Ijebu-East",    type: "Town Hall" },
];

const PAST = [
  { id: 10, date: "15 May 2026", title: "Declaration of Intent",         location: "Ijebu-Ode, Ogun State",  note: "Official declaration of Omoowo's 2027 Senatorial candidacy before party leaders and stakeholders." },
  { id: 11, date: "08 Jun 2026", title: "PDP Ward Congress",             location: "Ogun East District",     note: "Ward-level delegate consultations completed across all 3 LGAs of Ogun East." },
  { id: 12, date: "22 Jun 2026", title: "Stakeholders Consultation",     location: "Sagamu, Ogun State",     note: "Private engagement with community leaders, market associations, and youth organisations." },
];

const FILTERS = ["All", "Rally", "Town Hall", "Forum", "Summit", "Consultation"] as const;
type Filter = (typeof FILTERS)[number];

/* Rally=red, Town Hall=green, Summit=green — balanced */
const TYPE_PILL: Record<EventType, { bg: string; color: string }> = {
  "Rally":        { bg: C.red,                        color: C.light },
  "Town Hall":    { bg: C.green,                      color: C.light },
  "Forum":        { bg: "rgba(26,26,26,0.08)",        color: "rgba(26,26,26,0.75)" },
  "Summit":       { bg: C.green,                      color: C.light },
  "Consultation": { bg: "rgba(26,26,26,0.05)",         color: "rgba(26,26,26,0.6)" },
};

/* ══════════════════════════════════════════
   1. HERO — WHITE background
══════════════════════════════════════════ */
function EventsHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY  = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const panelY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  const [scrambleActive, setScrambleActive] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setScrambleActive(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden flex flex-col"
      style={{ minHeight: "100vh", background: "#FFFFFF" }}
    >
      {/* Ghost grid lines — dark on white */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.04 }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="absolute top-0 bottom-0 w-px" style={{ left: `${25 * (i + 1)}%`, background: C.dark }} />
        ))}
      </div>

      {/* Subtle radial glows: green left, red right */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 10% 80%, rgba(0,139,77,0.06) 0%, transparent 50%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 85% 20%, rgba(230,48,53,0.06) 0%, transparent 50%)" }} />
      </div>

      <motion.div
        className="relative z-10 flex-1 flex flex-col max-w-300 mx-auto w-full px-6 md:px-12 lg:px-20"
        style={{ y: textY }}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between pt-32 md:pt-36 pb-0 border-b"
          style={{ borderColor: "rgba(26,26,26,0.07)" }}
        >
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="pb-5 flex items-center gap-2.5 font-mono text-[11px] tracking-[0.32em] uppercase"
            style={{ color: C.muted }}
          >
            <span className="w-0.5 h-4 shrink-0 inline-block" style={{ background: C.green }} />
            <ScrambleText text="CAMPAIGN SCHEDULE · 2026–2027" active={scrambleActive} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pb-5 text-[10px] tracking-[0.25em] uppercase"
            style={{ color: "rgba(26,26,26,0.35)" }}
          >
            PDP &middot; Ogun East
          </motion.div>
        </div>

        {/* Main content split */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-14 lg:gap-20 items-center py-16 md:py-24">

          {/* Left — headline */}
          <div>
            <h1
              className="font-light leading-[0.97] mb-10"
              style={{ fontSize: "clamp(3.5rem, 9vw, 9.5rem)", letterSpacing: "-0.04em", color: C.dark }}
            >
              {[
                { words: ["On", "the"], d: 0.4 },
                { words: ["ground."], d: 0.56 },
                { words: ["In", "the"], d: 0.7 },
                { words: ["community."], d: 0.84 },
              ].map(({ words, d }) => (
                <span key={d} style={{ display: "block" }}>
                  {words.map((word, wi) => (
                    <span key={wi} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.2em" }}>
                      <motion.span
                        style={{ display: "inline-block" }}
                        initial={{ y: "112%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 1.1, delay: d + wi * 0.07, ease }}
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
              transition={{ duration: 0.8, delay: 1.1, ease }}
              className="text-sm leading-[1.95] max-w-md"
              style={{ color: C.muted }}
            >
              Omoowo is not campaigning from a distance. He is showing up — ward by ward, LGA by LGA — to
              listen to the people of Ogun East and share what he will do for them in Abuja.
            </motion.p>
          </div>

          {/* Right — Next Event panel on navy box */}
          <motion.div
            style={{ y: panelY }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
            className="lg:w-80 xl:w-96 shrink-0"
          >
            <div
              className="relative overflow-hidden p-8 md:p-10"
              style={{ background: "#008B4D", border: "1px solid rgba(26,26,26,0.06)" }}
            >
              {/* Green top accent bar */}
              <div className="absolute inset-x-0 top-0 flex h-0.5">
                <div className="flex-1 bg-[#008B4D]" />
                <div className="flex-1 bg-[#E63035]" />
              </div>

              {/* Live indicator */}
              <div className="flex items-center gap-2.5 mb-8 mt-2">
                <div className="relative w-2 h-2">
                  <div className="absolute inset-0 rounded-full bg-green-400 opacity-60 animate-ping" />
                  <div className="relative rounded-full w-2 h-2 bg-green-400" />
                </div>
                <span className="text-[9px] tracking-[0.35em] uppercase" style={{ color: "rgba(246,246,246,0.4)" }}>
                  Next Event
                </span>
              </div>

              <p className="font-light leading-[1.2] mb-2" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)", color: C.light }}>
                Grand Campaign Launch Rally
              </p>
              <p className="text-[11px] mb-1.5" style={{ color: "rgba(246,246,246,0.45)" }}>
                Ijebu-Ode Township Stadium
              </p>
              <p className="text-[10px] tracking-[0.2em] uppercase mb-8" style={{ color: "rgba(246,246,246,0.3)" }}>
                02 August 2026 &middot; 10:00 AM WAT
              </p>

              <div className="pt-7 border-t" style={{ borderColor: "rgba(246,246,246,0.08)" }}>
                <p className="text-[9px] tracking-[0.32em] uppercase mb-6" style={{ color: "rgba(246,246,246,0.28)" }}>
                  Countdown
                </p>
                <Countdown />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom LGA strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="border-t py-5 overflow-hidden"
          style={{ borderColor: "rgba(26,26,26,0.07)" }}
        >
          <motion.div
            className="flex whitespace-nowrap gap-0 text-[10px] tracking-[0.38em] uppercase"
            style={{ color: C.muted, fontWeight: 500 }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i}>
                Ijebu-East&nbsp;&nbsp;&middot;&nbsp;&nbsp;Ogun Waterside&nbsp;&nbsp;&middot;&nbsp;&nbsp;Ikenne&nbsp;&nbsp;&middot;&nbsp;&nbsp;Sagamu&nbsp;&nbsp;&middot;&nbsp;&nbsp;Ijebu-Ode&nbsp;&nbsp;&middot;&nbsp;&nbsp;Ogun East&nbsp;&nbsp;&middot;&nbsp;&nbsp;
              </span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   2. UPCOMING EVENTS — white background
══════════════════════════════════════════ */
function EventRow({ event, index }: { event: CEvent; index: number }) {
  const [hovered, setHovered] = useState(false);
  const pill       = TYPE_PILL[event.type];
  const hoverBg    = index % 2 === 0 ? "rgba(0,139,77,0.08)" : "rgba(230,48,53,0.08)";
  const dateColor  = event.featured ? C.red : index % 2 === 0 ? C.green : "rgba(26,26,26,0.18)";
  const titleHover = index % 2 === 0 ? C.green : C.red;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, scale: 0.98 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group grid grid-cols-1 md:grid-cols-[100px_1fr_auto] items-center gap-4 md:gap-10 py-6 border-t cursor-default transition-colors duration-300"
      style={{
        borderColor: "rgba(26,26,26,0.08)",
        backgroundColor: hovered ? hoverBg : "transparent",
      }}
    >
      {/* Date */}
      <div className="flex md:flex-col items-baseline md:items-start gap-2 md:gap-0">
        <div
          className="font-light leading-none transition-colors duration-300"
          style={{
            fontSize: event.featured ? "clamp(2rem, 3.5vw, 3.2rem)" : "clamp(1.8rem, 3vw, 2.8rem)",
            color: dateColor,
            letterSpacing: "-0.04em",
          }}
        >
          {event.day}
        </div>
        <div className="md:mt-1">
          <p className="text-[10px] tracking-[0.22em] uppercase" style={{ color: "rgba(26,26,26,0.4)" }}>
            {event.month} {event.year}
          </p>
          <p className="text-[9px] tracking-[0.15em]" style={{ color: "rgba(26,26,26,0.3)" }}>
            {event.time}
          </p>
        </div>
      </div>

      {/* Title + location */}
      <div>
        <p
          className="font-light leading-tight mb-1.5 transition-colors duration-300"
          style={{
            fontSize: event.featured ? "clamp(1.05rem, 1.6vw, 1.4rem)" : "clamp(0.95rem, 1.3vw, 1.15rem)",
            color: hovered ? titleHover : "rgba(26,26,26,0.85)",
            letterSpacing: "-0.01em",
          }}
        >
          {event.title}
          {event.featured && (
            <span className="ml-3 text-[9px] tracking-[0.25em] uppercase align-middle" style={{ color: C.red }}>
              Featured
            </span>
          )}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-[11px]" style={{ color: "rgba(26,26,26,0.5)" }}>{event.location}</p>
          <span style={{ color: "rgba(26,26,26,0.3)" }}>·</span>
          <p className="text-[10px] tracking-[0.15em] uppercase" style={{ color: "rgba(26,26,26,0.35)" }}>{event.lga}</p>
        </div>
      </div>

      {/* Type + arrow */}
      <div className="flex items-center gap-4 md:gap-6 shrink-0">
        <span className="px-3 py-1.5 text-[9px] tracking-[0.28em] uppercase" style={{ background: pill.bg, color: pill.color }}>
          {event.type}
        </span>
        <motion.span
          className="text-lg"
          style={{ color: "rgba(26,26,26,0.3)" }}
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          &rarr;
        </motion.span>
      </div>
    </motion.div>
  );
}

function UpcomingEvents() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<Filter>("All");

  const filtered = active === "All" ? UPCOMING : UPCOMING.filter((e) => e.type === active);

  return (
    <section ref={ref} className="py-24 md:py-40 px-6 md:px-12 lg:px-20" style={{ background: "#FFFFFF" }}>
      <div className="max-w-300 mx-auto">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 text-[10px] tracking-[0.42em] uppercase mb-4"
              style={{ color: C.red }}
            >
              <span className="w-0.5 h-4 shrink-0 inline-block" style={{ background: C.green }} />
              On the Calendar
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="font-light leading-[1.06]"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)", color: C.dark, letterSpacing: "-0.025em" }}
            >
              Where Omoowo will be.
            </motion.h2>
          </div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="flex flex-wrap gap-2"
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`relative px-4 py-2 text-[10px] tracking-[0.22em] uppercase transition-colors duration-200 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 ${active === f ? "" : "hover:opacity-70"}`}
                style={{
                  color: active === f ? C.light : "rgba(26,26,26,0.5)",
                  border: `1px solid ${active === f ? C.red : "rgba(26,26,26,0.15)"}`,
                }}
              >
                {active === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0"
                    style={{ background: C.red }}
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  />
                )}
                <span className="relative z-10">{f}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Count line */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] tracking-[0.25em] uppercase" style={{ color: "rgba(26,26,26,0.35)" }}>
            {filtered.length} event{filtered.length !== 1 ? "s" : ""}
          </p>
          <p className="text-[10px]" style={{ color: "rgba(26,26,26,0.35)" }}>
            {active !== "All" ? active : "All types"}
          </p>
        </div>

        {/* Event rows */}
        <div className="min-h-50">
          <AnimatePresence mode="popLayout">
            {filtered.map((event, i) => (
              <EventRow key={event.id} event={event} index={i} />
            ))}
          </AnimatePresence>
          <div className="h-px" style={{ background: "rgba(26,26,26,0.08)" }} />
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-[11px] mt-8 leading-relaxed"
          style={{ color: "rgba(26,26,26,0.4)" }}
        >
          Dates and venues subject to confirmation. Follow the campaign on social media or join the WhatsApp group for updates.
        </motion.p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   3. PAST EVENTS — WHITE background
══════════════════════════════════════════ */
const pastAccent = [C.green, C.red, C.green];

function PastEvents() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-40 px-6 md:px-12 lg:px-20" style={{ background: "#FFFFFF" }}>
      <div className="max-w-300 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 text-[10px] tracking-[0.42em] uppercase mb-4"
              style={{ color: C.red }}
            >
              <span className="w-0.5 h-4 shrink-0 inline-block" style={{ background: C.green }} />
              Previously
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="font-light leading-[1.06]"
              style={{ fontSize: "clamp(1.7rem, 3vw, 2.8rem)", color: C.dark, letterSpacing: "-0.025em" }}
            >
              What we have already done.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[11px] leading-[1.7] max-w-xs text-right hidden md:block"
            style={{ color: C.muted }}
          >
            The campaign did not begin with the launch rally.<br />
            It began quietly — in communities, one conversation at a time.
          </motion.p>
        </div>

        <div>
          {PAST.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.12 + i * 0.12, ease }}
              className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-12 py-8 border-t cursor-default"
              style={{ borderColor: C.border }}
            >
              <div>
                {/* Accent bar per past event: green / red / green */}
                <div className="w-4 h-0.5 mb-3" style={{ background: pastAccent[i] }} />
                <p className="text-[11px] tracking-[0.18em] uppercase leading-[1.8]" style={{ color: C.muted }}>
                  {event.date}
                </p>
              </div>
              <div>
                <p
                  className="font-light mb-2 leading-tight"
                  style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", color: C.dark, letterSpacing: "-0.01em" }}
                >
                  {event.title}
                </p>
                <p className="text-[11px] mb-3" style={{ color: C.muted }}>{event.location}</p>
                <p className="text-[12px] leading-[1.8]" style={{ color: C.muted }}>{event.note}</p>
              </div>
            </motion.div>
          ))}
          <div className="h-px" style={{ background: C.border }} />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   4. ATTEND CTA — white background, card 1 green / card 2 red
══════════════════════════════════════════ */
function AttendCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const cards = [
    {
      label: "WhatsApp Updates",
      headline: "Get event alerts on WhatsApp",
      body: "Join the official Omoowo 2027 campaign WhatsApp group to receive event notices, venue updates, and campaign news directly on your phone.",
      action: "Join the Group →",
      bg: "#008B4D",   /* green */
    },
    {
      label: "Stay Informed",
      headline: "Follow the campaign",
      body: "Stay connected with the campaign on social media for live event coverage, speeches, and community stories from across all 3 LGAs of Ogun East.",
      action: "Follow Updates →",
      bg: "#E63035",  /* red */
    },
  ];

  return (
    <section ref={ref} className="py-28 md:py-44 px-6 md:px-12 lg:px-20" style={{ background: "#FFFFFF" }}>
      <div className="max-w-300 mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-28 items-end mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 text-[10px] tracking-[0.42em] uppercase mb-5"
              style={{ color: "rgba(26,26,26,0.5)" }}
            >
              <span className="w-0.5 h-4 shrink-0 inline-block" style={{ background: C.green }} />
              Be There
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.95, delay: 0.1, ease }}
              className="font-light text-[#1A1A1A] leading-[1.04]"
              style={{ fontSize: "clamp(2rem, 5vw, 5.5rem)", letterSpacing: "-0.035em" }}
            >
              Come and be counted.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="text-sm leading-[1.95]"
            style={{ color: "rgba(26,26,26,0.55)" }}
          >
            Every rally, town hall, and forum is open to all residents of Ogun East. Omoowo campaigns
            without barriers. Your presence at these events is not just support — it is a statement
            that the people of Ogun East demand better, and they are willing to show up for it.
          </motion.p>
        </div>

        {/* Two option cards — green | red */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "rgba(26,26,26,0.06)" }}>
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 + i * 0.12, ease }}
              className="p-10 md:p-12 group hover:brightness-110 transition-all duration-300"
              style={{ background: card.bg }}
            >
              <p className="text-[9px] tracking-[0.38em] uppercase mb-5" style={{ color: "rgba(246,246,246,0.7)" }}>
                {card.label}
              </p>
              <h3
                className="font-light text-[#FFFFFF] leading-tight mb-4"
                style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)", letterSpacing: "-0.01em" }}
              >
                {card.headline}
              </h3>
              <p className="text-sm leading-[1.9] mb-8" style={{ color: "rgba(246,246,246,0.85)" }}>
                {card.body}
              </p>
              <p
                className="text-[11px] tracking-[0.2em] uppercase group-hover:translate-x-1.5 transition-transform duration-300"
                style={{ color: "rgba(246,246,246,0.9)" }}
              >
                {card.action}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom nav links — neutral / green / red */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap gap-4 mt-12"
        >
          {[
            { label: "← Back to Home", href: "/",         style: { border: "1px solid rgba(26,26,26,0.15)",  color: "rgba(26,26,26,0.5)" } },
            { label: "View Policies",  href: "/policies",  style: { border: `1px solid ${C.green}`,              color: C.green } },
            { label: "Omoowo's Vision",href: "/vision",    style: { border: `1px solid ${C.red}`,                color: C.red   } },
          ].map((l) => (
            <motion.a
              key={l.label}
              href={l.href}
              className="px-6 py-3 text-[10px] tracking-[0.22em] uppercase transition-all duration-200 hover:opacity-70"
              whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              style={l.style}
            >
              {l.label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function EventsPage() {
  return (
    <>
      <Nav />
      <main>
        <EventsHero />
        <UpcomingEvents />
        <PastEvents />
        <AttendCTA />
      </main>
      <Footer />
    </>
  );
}
