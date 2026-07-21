"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";

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
            <span
              className="font-light pb-5 px-1.5 md:px-2 text-xl md:text-2xl"
              style={{ color: "rgba(246,246,246,0.18)" }}
            >
              :
            </span>
          )}
          <div className="text-center">
            <div
              className="font-light leading-none tabular-nums"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 5rem)",
                color: C.light,
                letterSpacing: "-0.045em",
              }}
            >
              {String(v).padStart(2, "0")}
            </div>
            <p
              className="text-[8px] tracking-[0.32em] uppercase mt-2"
              style={{ color: "rgba(246,246,246,0.32)" }}
            >
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
  {
    id: 1, day: "02", month: "Aug", year: "2026", time: "10:00 AM",
    title: "Grand Campaign Launch Rally",
    location: "Ijebu-Ode Township Stadium", lga: "Ijebu-East",
    type: "Rally", featured: true,
  },
  {
    id: 2, day: "23", month: "Aug", year: "2026", time: "9:00 AM",
    title: "Youth Empowerment Summit",
    location: "Sagamu Polytechnic Hall", lga: "Ikenne",
    type: "Summit",
  },
  {
    id: 3, day: "06", month: "Sep", year: "2026", time: "2:00 PM",
    title: "Women's Forum & Town Hall",
    location: "Ijebu-East LGA Secretariat", lga: "Ijebu-East",
    type: "Forum",
  },
  {
    id: 4, day: "20", month: "Sep", year: "2026", time: "11:00 AM",
    title: "Ogun Waterside Stakeholders Consultation",
    location: "Ogun Waterside LGA Headquarters", lga: "Ogun Waterside",
    type: "Consultation",
  },
  {
    id: 5, day: "04", month: "Oct", year: "2026", time: "8:00 AM",
    title: "Ikenne Ward-by-Ward Consultation",
    location: "Ikenne LGA Community Centre", lga: "Ikenne",
    type: "Town Hall",
  },
  {
    id: 6, day: "08", month: "Nov", year: "2026", time: "12:00 PM",
    title: "PDP Mega Rally — Ogun East",
    location: "Ijebu-Ode Expressway Grounds", lga: "Ijebu-East",
    type: "Rally",
  },
  {
    id: 7, day: "06", month: "Dec", year: "2026", time: "10:00 AM",
    title: "Omoowo Women Leaders Forum",
    location: "Sagamu Multi-purpose Hall", lga: "Ikenne",
    type: "Forum",
  },
  {
    id: 8, day: "10", month: "Jan", year: "2027", time: "9:00 AM",
    title: "Final Campaign Town Hall",
    location: "Ijebu-East LGA Grounds", lga: "Ijebu-East",
    type: "Town Hall",
  },
];

const PAST = [
  {
    id: 10, date: "15 May 2026",
    title: "Declaration of Intent",
    location: "Ijebu-Ode, Ogun State",
    note: "Official declaration of Omoowo's 2027 Senatorial candidacy before party leaders and stakeholders.",
  },
  {
    id: 11, date: "08 Jun 2026",
    title: "PDP Ward Congress",
    location: "Ogun East District",
    note: "Ward-level delegate consultations completed across all 3 LGAs of Ogun East.",
  },
  {
    id: 12, date: "22 Jun 2026",
    title: "Stakeholders Consultation",
    location: "Sagamu, Ogun State",
    note: "Private engagement with community leaders, market associations, and youth organisations.",
  },
];

const FILTERS = ["All", "Rally", "Town Hall", "Forum", "Summit", "Consultation"] as const;
type Filter = (typeof FILTERS)[number];

const TYPE_PILL: Record<EventType, { bg: string; color: string }> = {
  "Rally":        { bg: C.mid,    color: C.light },
  "Town Hall":    { bg: C.dark,   color: C.light },
  "Forum":        { bg: C.border, color: C.dark  },
  "Summit":       { bg: C.mid,    color: C.light },
  "Consultation": { bg: "rgba(136,136,136,0.2)", color: C.dark },
};

/* ══════════════════════════════════════════
   1. HERO
══════════════════════════════════════════ */
function EventsHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
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
      style={{ minHeight: "100vh", background: "#094e7d" }}
    >
      {/* Ghost grid lines */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.04 }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px"
            style={{ left: `${25 * (i + 1)}%`, background: C.light }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 flex-1 flex flex-col max-w-300 mx-auto w-full px-6 md:px-12 lg:px-20"
        style={{ y: textY }}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between pt-32 md:pt-36 pb-0 border-b"
          style={{ borderColor: "rgba(246,246,246,0.07)" }}
        >
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="pb-5 font-mono text-[11px] tracking-[0.32em] uppercase"
            style={{ color: "rgba(246,246,246,0.38)" }}
          >
            <ScrambleText text="CAMPAIGN SCHEDULE · 2026–2027" active={scrambleActive} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pb-5 text-[10px] tracking-[0.25em] uppercase"
            style={{ color: "rgba(246,246,246,0.25)" }}
          >
            PDP · Ogun East
          </motion.div>
        </div>

        {/* Main content split */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-14 lg:gap-20 items-center py-16 md:py-24">

          {/* Left — headline */}
          <div>
            <h1
              className="font-light leading-[0.97] mb-10"
              style={{
                fontSize: "clamp(3.5rem, 9vw, 9.5rem)",
                letterSpacing: "-0.04em",
                color: C.light,
              }}
            >
              {[
                { words: ["On", "the"], d: 0.4 },
                { words: ["ground."], d: 0.56 },
                { words: ["In", "the"], d: 0.7 },
                { words: ["community."], d: 0.84 },
              ].map(({ words, d }) => (
                <span key={d} style={{ display: "block" }}>
                  {words.map((word, wi) => (
                    <span
                      key={wi}
                      style={{ display: "inline-block", overflow: "hidden", marginRight: "0.2em" }}
                    >
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
              style={{ color: "rgba(246,246,246,0.5)" }}
            >
              Omoowo is not campaigning from a distance. He is showing up — ward by ward, LGA by LGA — to
              listen to the people of Ogun East and share what he will do for them in Abuja.
            </motion.p>
          </div>

          {/* Right — Next Event panel */}
          <motion.div
            style={{ y: panelY }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
            className="lg:w-80 xl:w-96 shrink-0"
          >
            <div
              className="relative overflow-hidden p-8 md:p-10"
              style={{
                background: "rgba(230,48,53,0.45)",
                border: "1px solid rgba(246,246,246,0.08)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Top shine */}
              <div
                className="absolute inset-x-0 top-0 h-px pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(246,246,246,0.12), transparent)" }}
              />

              {/* Live indicator */}
              <div className="flex items-center gap-2.5 mb-8">
                <div className="relative w-2 h-2">
                  <div className="absolute inset-0 rounded-full bg-green-400 opacity-60 animate-ping" />
                  <div className="relative rounded-full w-2 h-2 bg-green-400" />
                </div>
                <span className="text-[9px] tracking-[0.35em] uppercase" style={{ color: "rgba(246,246,246,0.4)" }}>
                  Next Event
                </span>
              </div>

              <p
                className="font-light leading-[1.2] mb-2"
                style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)", color: C.light }}
              >
                Grand Campaign Launch Rally
              </p>
              <p className="text-[11px] mb-1.5" style={{ color: "rgba(246,246,246,0.45)" }}>
                Ijebu-Ode Township Stadium
              </p>
              <p className="text-[10px] tracking-[0.2em] uppercase mb-8" style={{ color: "rgba(246,246,246,0.3)" }}>
                02 August 2026 · 10:00 AM WAT
              </p>

              <div
                className="pt-7 border-t"
                style={{ borderColor: "rgba(246,246,246,0.08)" }}
              >
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
          style={{ borderColor: "rgba(246,246,246,0.07)" }}
        >
          <motion.div
            className="flex whitespace-nowrap gap-0 text-[10px] tracking-[0.38em] uppercase"
            style={{ color: "rgba(246,246,246,0.22)", fontWeight: 500 }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i}>
                Ijebu-East&nbsp;&nbsp;·&nbsp;&nbsp;Ogun Waterside&nbsp;&nbsp;·&nbsp;&nbsp;Ikenne&nbsp;&nbsp;·&nbsp;&nbsp;Sagamu&nbsp;&nbsp;·&nbsp;&nbsp;Ijebu-Ode&nbsp;&nbsp;·&nbsp;&nbsp;Ogun East&nbsp;&nbsp;·&nbsp;&nbsp;
              </span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   2. UPCOMING EVENTS — filter + rows
══════════════════════════════════════════ */
function EventRow({ event, index }: { event: CEvent; index: number }) {
  const pill = TYPE_PILL[event.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, scale: 0.98 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease }}
      className="group grid grid-cols-1 md:grid-cols-[100px_1fr_auto] items-center gap-4 md:gap-10 py-6 border-t cursor-default"
      style={{ borderColor: C.border }}
      whileHover={{ backgroundColor: "rgba(230,48,53,0.06)" }}
    >
      {/* Date */}
      <div className="flex md:flex-col items-baseline md:items-start gap-2 md:gap-0">
        <div
          className="font-light leading-none"
          style={{
            fontSize: event.featured ? "clamp(2rem, 3.5vw, 3.2rem)" : "clamp(1.8rem, 3vw, 2.8rem)",
            color: event.featured ? C.mid : C.border,
            letterSpacing: "-0.04em",
          }}
        >
          {event.day}
        </div>
        <div className="md:mt-1">
          <p className="text-[10px] tracking-[0.22em] uppercase" style={{ color: C.muted }}>
            {event.month} {event.year}
          </p>
          <p className="text-[9px] tracking-[0.15em]" style={{ color: C.border }}>
            {event.time}
          </p>
        </div>
      </div>

      {/* Title + location */}
      <div>
        <p
          className="font-light leading-tight mb-1.5 group-hover:text-[#E63035] transition-colors duration-300"
          style={{
            fontSize: event.featured ? "clamp(1.05rem, 1.6vw, 1.4rem)" : "clamp(0.95rem, 1.3vw, 1.15rem)",
            color: C.dark,
            letterSpacing: "-0.01em",
          }}
        >
          {event.title}
          {event.featured && (
            <span
              className="ml-3 text-[9px] tracking-[0.25em] uppercase align-middle"
              style={{ color: C.mid }}
            >
              Featured
            </span>
          )}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-[11px]" style={{ color: C.muted }}>
            {event.location}
          </p>
          <span className="text-[C.border] text-[10px]" style={{ color: C.border }}>·</span>
          <p className="text-[10px] tracking-[0.15em] uppercase" style={{ color: C.border }}>
            {event.lga}
          </p>
        </div>
      </div>

      {/* Type + arrow */}
      <div className="flex items-center gap-4 md:gap-6 shrink-0">
        <span
          className="px-3 py-1.5 text-[9px] tracking-[0.28em] uppercase"
          style={{ background: pill.bg, color: pill.color }}
        >
          {event.type}
        </span>
        <motion.span
          className="text-lg"
          style={{ color: C.border }}
          animate={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          →
        </motion.span>
      </div>
    </motion.div>
  );
}

function UpcomingEvents() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  const [active, setActive] = useState<Filter>("All");

  const filtered = active === "All"
    ? UPCOMING
    : UPCOMING.filter((e) => e.type === active);

  return (
    <section ref={ref} className="py-24 md:py-40 px-6 md:px-12 lg:px-20" style={{ background: C.bg }}>
      <div className="max-w-300 mx-auto">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[10px] tracking-[0.42em] uppercase mb-4"
              style={{ color: C.mid }}
            >
              On the Calendar
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="font-light leading-[1.06]"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)",
                color: C.dark,
                letterSpacing: "-0.025em",
              }}
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
                className="relative px-4 py-2 text-[10px] tracking-[0.22em] uppercase transition-colors duration-200 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63035]/60"
                style={{
                  color: active === f ? C.light : C.muted,
                  border: `1px solid ${active === f ? C.mid : C.border}`,
                }}
              >
                {active === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0"
                    style={{ background: C.mid }}
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
          <p className="text-[10px] tracking-[0.25em] uppercase" style={{ color: C.border }}>
            {filtered.length} event{filtered.length !== 1 ? "s" : ""}
          </p>
          <p className="text-[10px]" style={{ color: C.border }}>
            {active !== "All" ? active : "All types"}
          </p>
        </div>

        {/* Event rows */}
        <div className="min-h-[200px]">
          <AnimatePresence mode="popLayout">
            {filtered.map((event, i) => (
              <EventRow key={event.id} event={event} index={i} />
            ))}
          </AnimatePresence>
          <div className="h-px" style={{ background: "rgba(246,246,246,0.15)" }} />
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-[11px] mt-8 leading-relaxed"
          style={{ color: C.border }}
        >
          Dates and venues subject to confirmation. Follow the campaign on social media or join the WhatsApp group for updates.
        </motion.p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   3. PAST EVENTS
══════════════════════════════════════════ */
function PastEvents() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-40 px-6 md:px-12 lg:px-20" style={{ background: "#008B4D" }}>
      <div className="max-w-300 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[10px] tracking-[0.42em] uppercase mb-4"
              style={{ color: "rgba(246,246,246,0.38)" }}
            >
              Previously
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="font-light leading-[1.06]"
              style={{
                fontSize: "clamp(1.7rem, 3vw, 2.8rem)",
                color: C.light,
                letterSpacing: "-0.025em",
              }}
            >
              What we have already done.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[11px] leading-[1.7] max-w-xs text-right hidden md:block"
            style={{ color: "rgba(246,246,246,0.4)" }}
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
              className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-12 py-8 border-t group hover:bg-[rgba(246,246,246,0.03)] transition-colors duration-200 cursor-default"
              style={{ borderColor: "rgba(246,246,246,0.08)" }}
            >
              <div>
                <p
                  className="text-[11px] tracking-[0.18em] uppercase leading-[1.8]"
                  style={{ color: "rgba(246,246,246,0.35)" }}
                >
                  {event.date}
                </p>
              </div>
              <div>
                <p
                  className="font-light mb-2 leading-tight"
                  style={{
                    fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                    color: "rgba(246,246,246,0.65)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {event.title}
                </p>
                <p className="text-[11px] mb-3" style={{ color: "rgba(246,246,246,0.35)" }}>
                  {event.location}
                </p>
                <p className="text-[12px] leading-[1.8]" style={{ color: "rgba(246,246,246,0.4)" }}>
                  {event.note}
                </p>
              </div>
            </motion.div>
          ))}
          <div className="h-px" style={{ background: "rgba(246,246,246,0.08)" }} />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   4. ATTEND CTA
══════════════════════════════════════════ */
function AttendCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 md:py-44 px-6 md:px-12 lg:px-20" style={{ background: "#094e7d" }}>
      <div className="max-w-300 mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-28 items-end mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[10px] tracking-[0.42em] uppercase mb-5"
              style={{ color: "rgba(246,246,246,0.3)" }}
            >
              Be There
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.95, delay: 0.1, ease }}
              className="font-light text-[#FFFFFF] leading-[1.04]"
              style={{
                fontSize: "clamp(2rem, 5vw, 5.5rem)",
                letterSpacing: "-0.035em",
              }}
            >
              Come and be counted.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="text-sm leading-[1.95]"
            style={{ color: "rgba(246,246,246,0.48)" }}
          >
            Every rally, town hall, and forum is open to all residents of Ogun East. Omoowo campaigns
            without barriers. Your presence at these events is not just support — it is a statement
            that the people of Ogun East demand better, and they are willing to show up for it.
          </motion.p>
        </div>

        {/* Two option cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "rgba(246,246,246,0.06)" }}>
          {[
            {
              label: "WhatsApp Updates",
              headline: "Get event alerts on WhatsApp",
              body: "Join the official Omoowo 2027 campaign WhatsApp group to receive event notices, venue updates, and campaign news directly on your phone.",
              action: "Join the Group →",
            },
            {
              label: "Stay Informed",
              headline: "Follow the campaign",
              body: "Stay connected with the campaign on social media for live event coverage, speeches, and community stories from across all 3 LGAs of Ogun East.",
              action: "Follow Updates →",
            },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 + i * 0.12, ease }}
              className="p-10 md:p-12 group hover:bg-[rgba(255,255,255,0.03)] transition-colors duration-300"
              style={{ background: "rgba(230,48,53,0.25)" }}
            >
              <p
                className="text-[9px] tracking-[0.38em] uppercase mb-5"
                style={{ color: "rgba(246,246,246,0.3)" }}
              >
                {card.label}
              </p>
              <h3
                className="font-light text-[#FFFFFF] leading-tight mb-4"
                style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)", letterSpacing: "-0.01em" }}
              >
                {card.headline}
              </h3>
              <p className="text-sm leading-[1.9] mb-8" style={{ color: "rgba(246,246,246,0.45)" }}>
                {card.body}
              </p>
              <p
                className="text-[11px] tracking-[0.2em] uppercase group-hover:translate-x-1.5 transition-transform duration-300"
                style={{ color: "rgba(246,246,246,0.5)" }}
              >
                {card.action}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom nav links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap gap-4 mt-12"
        >
          {[
            { label: "← Back to Home", href: "/" },
            { label: "View Policies", href: "/policies" },
            { label: "Omoowo's Vision", href: "/vision" },
          ].map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              className="px-6 py-3 text-[10px] tracking-[0.22em] uppercase transition-all duration-200 hover:opacity-60"
              style={{
                border: "1px solid rgba(246,246,246,0.1)",
                color: "rgba(246,246,246,0.45)",
              }}
            >
              {l.label}
            </a>
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
