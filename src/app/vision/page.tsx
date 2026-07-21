"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  animate,
} from "framer-motion";
import { useRef, useEffect } from "react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const C = {
  dark: "#1A1A1A",
  mid: "#E63035",
  light: "#F6F3F3",
  muted: "#888888",
  bg: "#F6F3F3",
  border: "#DCDCDC",
} as const;

/* ── Animated Counter ────────────────────── */
function Counter({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) { el.textContent = Math.round(v) + suffix; },
    });
    return () => controls.stop();
  }, [inView, to, duration, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ── Marquee ─────────────────────────────── */
function Marquee({ text, faint = false }: { text: string; faint?: boolean }) {
  const doubled = `${text}   ·   ${text}   ·   `;
  return (
    <div className="overflow-hidden select-none" style={{ opacity: faint ? 0.28 : 0.4 }}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        style={{ fontSize: "0.65rem", letterSpacing: "0.38em", color: C.mid, textTransform: "uppercase", fontWeight: 500 }}
      >
        <span>{doubled}</span>
        <span>{doubled}</span>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════
   1. HERO — architectural split + running line + marquee belt
══════════════════════════════════════════ */
function VisionHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const lineH   = useTransform(scrollYProgress, [0, 0.65], ["0%", "100%"]);
  const ghostY  = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY   = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const headline = [
    { words: ["Not", "a"], d: 0.35 },
    { words: ["promise."], d: 0.52 },
    { words: ["A", "plan."], d: 0.68 },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden flex flex-col"
      style={{ minHeight: "100vh", background: C.bg }}
    >
      {/* Vertical running line — left edge */}
      <div
        className="absolute top-0 bottom-0 w-px pointer-events-none"
        style={{ left: "clamp(1.5rem, 5vw, 5rem)", background: C.border }}
      />
      <motion.div
        className="absolute top-0 w-px pointer-events-none origin-top"
        style={{ left: "clamp(1.5rem, 5vw, 5rem)", height: lineH, background: C.mid }}
      />

      {/* Ghost year — parallax */}
      <motion.div
        className="absolute inset-0 flex items-center justify-end pointer-events-none overflow-hidden"
        style={{ y: ghostY, paddingRight: "clamp(0.5rem, 4vw, 4rem)" }}
      >
        <span
          className="font-light leading-none select-none"
          style={{
            fontSize: "clamp(11rem, 33vw, 40rem)",
            color: "rgba(230,48,53,0.045)",
            letterSpacing: "-0.06em",
          }}
        >
          2031
        </span>
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col flex-1"
        style={{ y: textY }}
      >
        {/* Top label strip */}
        <div
          className="flex items-center justify-between px-6 md:px-12 lg:px-20 pt-32 md:pt-36 pb-0"
        >
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="flex items-center gap-4"
          >
            <div className="w-6 h-px" style={{ background: C.mid }} />
            <span className="text-[10px] tracking-[0.42em] uppercase" style={{ color: C.mid }}>
              Vision &middot; Ogun East &middot; 2027–2031
            </span>
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="hidden md:block text-[10px] tracking-[0.25em] uppercase"
            style={{ color: C.muted }}
          >
            PDP · Nigeria
          </motion.span>
        </div>

        {/* Headline block */}
        <div className="flex-1 flex items-center px-6 md:px-12 lg:px-20 py-16">
          <div className="w-full">
            <h1
              className="font-light leading-[0.98] mb-10"
              style={{
                fontSize: "clamp(3.4rem, 9.5vw, 9.5rem)",
                letterSpacing: "-0.04em",
                color: C.dark,
              }}
            >
              {headline.map(({ words, d }) => (
                <span key={d} style={{ display: "block" }}>
                  {words.map((word, wi) => (
                    <span key={wi} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.18em" }}>
                      <motion.span
                        style={{ display: "inline-block" }}
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 1.05, delay: d + wi * 0.07, ease }}
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            {/* Two-column sub text */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
              {[
                "Omoowo's vision for Ogun East is not built on rhetoric. It is built on a specific understanding of what the district needs — and a concrete legislative plan to deliver it.",
                "Four years. Three LGAs. One direction. When you send Omoowo to Abuja, you are not sending a symbol. You are sending a person with a plan.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 1.05 + i * 0.15, ease }}
                  className="text-sm leading-[1.9]"
                  style={{ color: C.muted }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom marquee belt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="border-t px-6 md:px-12 lg:px-20 py-5"
          style={{ borderColor: C.border }}
        >
          <Marquee text="ROADS · SCHOOLS · CLINICS · SECURITY · JOBS · ACCOUNTABILITY · TRANSPARENCY · GROWTH · EQUITY · COMMUNITY" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   2. THE NUMBERS — dark, counting stats
══════════════════════════════════════════ */
const stats = [
  {
    value: 3,
    suffix: " LGAs",
    label: "The constituency",
    note: "Ogun Waterside. Ijebu-East. Ikenne. Three distinct communities with different terrains, economies, and needs — all deserving equal attention and federal representation.",
  },
  {
    value: 4,
    suffix: " years",
    label: "One term. One chance.",
    note: "A senatorial term is four years. Not a long time. Long enough, if you come prepared. Omoowo arrives in Abuja with a legislative agenda, not a learning curve.",
  },
  {
    value: 5,
    suffix: " priorities",
    label: "Infrastructure · Education · Health · Security · Growth",
    note: "Not fifty promises. Five clear focus areas — each with specific bills, specific advocacy, and specific accountability benchmarks that constituents can hold him to.",
  },
];

function TheNumbers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 md:py-44 px-6 md:px-12 lg:px-20" style={{ background: "#094e7d" }}>
      <div className="max-w-300 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease }}
            className="font-light leading-[1.06]"
            style={{ fontSize: "clamp(1.7rem, 3vw, 2.9rem)", color: C.light, letterSpacing: "-0.025em", maxWidth: "480px" }}
          >
            The numbers behind the vision.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[10px] tracking-[0.35em] uppercase"
            style={{ color: "rgba(246,246,246,0.3)" }}
          >
            What this mandate means
          </motion.p>
        </div>

        <div>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-[2fr_1fr_3fr] items-start gap-6 md:gap-14 py-10 border-t"
              style={{ borderColor: "rgba(246,246,246,0.07)" }}
            >
              <div
                className="font-light leading-none"
                style={{ fontSize: "clamp(4.5rem, 9vw, 9rem)", letterSpacing: "-0.055em", color: C.light }}
              >
                <Counter to={s.value} suffix={s.suffix} duration={1.6} />
              </div>
              <div className="md:pt-3">
                <motion.div
                  className="h-px w-full mb-4 origin-left"
                  style={{ background: "rgba(246,246,246,0.15)" }}
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.25 + i * 0.1 }}
                />
                <p className="text-[10px] tracking-[0.18em] uppercase leading-[1.8]" style={{ color: "rgba(246,246,246,0.4)" }}>
                  {s.label}
                </p>
              </div>
              <p className="text-sm leading-[1.95] md:pt-3" style={{ color: "rgba(246,246,246,0.5)" }}>
                {s.note}
              </p>
            </motion.div>
          ))}
          <motion.div
            className="h-px origin-left"
            style={{ background: "rgba(246,246,246,0.07)" }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   3. HORIZONTAL SCROLL — 3 pillar panels
══════════════════════════════════════════ */
const pillars = [
  {
    n: "I",
    title: "People First",
    sub: "Every decision starts with one question: how does this change daily life?",
    body: "Not policy for policy's sake. Not legislation to fill a legislative record. Every bill Omoowo sponsors will be traceable — in plain language — to a real, measurable improvement in how the people of Ogun East live.",
    items: ["Town halls every quarter across all 3 LGAs", "Open constituency office — no appointment needed", "Voting record published and updated weekly", "Annual state-of-constituency report"],
    bg: C.mid,
    light: true,
  },
  {
    n: "II",
    title: "Inclusive Growth",
    sub: "Development that reaches every community — not just the visible ones.",
    body: "Ogun East is not one community. Ogun Waterside has different needs from Ikenne. Ijebu-East has different challenges from both. Omoowo's agenda is calibrated for geographic equity — measured, tracked, and publicly reported.",
    items: ["Equal project distribution across all 3 LGAs", "Biannual equity report on resource allocation", "Special advocacy for underserved wards", "Infrastructure mapping published online"],
    bg: C.bg,
    light: false,
  },
  {
    n: "III",
    title: "Accountability",
    sub: "Power without accountability is just privilege.",
    body: "Omoowo does not see the Senate seat as a destination. He sees it as a contract. Every naira of constituency fund will be publicly documented. Every Senate vote will be explained to constituents within 48 hours.",
    items: ["Constituency fund expenditure published quarterly", "Senate votes explained in plain language within 48hrs", "Independent community oversight committee", "Annual performance audit open to all"],
    bg: C.dark,
    light: true,
  },
];

function VisionPillars() {
  const outerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ["start start", "end end"] });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6667%"]);
  const progressW = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={outerRef} style={{ height: "400vh", overflowX: "hidden" }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Thin progress bar at very top */}
        <div className="absolute top-0 inset-x-0 h-0.5 z-30" style={{ background: "rgba(246,246,246,0.2)" }}>
          <motion.div className="h-full" style={{ width: progressW, background: C.mid }} />
        </div>

        {/* Sliding track — 300vw wide */}
        <motion.div className="flex h-full" style={{ x, width: "300vw" }}>
          {pillars.map((p, i) => (
            <div
              key={p.n}
              className="relative flex-shrink-0 h-screen overflow-hidden flex flex-col"
              style={{ width: "100vw", background: p.bg }}
            >
              {/* Massive ghost roman numeral */}
              <div
                className="absolute right-0 bottom-0 font-light leading-none pointer-events-none select-none"
                style={{
                  fontSize: "clamp(16rem, 40vw, 44rem)",
                  color: p.light ? "rgba(255,255,255,0.04)" : "rgba(230,48,53,0.06)",
                  letterSpacing: "-0.07em",
                  transform: "translate(8%, 8%)",
                }}
              >
                {p.n}
              </div>

              {/* Panel content */}
              <div
                className="relative z-10 flex flex-col h-full max-w-300 mx-auto w-full px-6 md:px-12 lg:px-20 py-20 md:py-24"
                style={{ justifyContent: "space-between" }}
              >
                {/* Top row */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] tracking-[0.42em] uppercase"
                    style={{ color: p.light ? "rgba(246,246,246,0.4)" : C.muted }}
                  >
                    Pillar {p.n}
                  </span>
                  <span
                    className="text-[10px] tracking-[0.25em] uppercase"
                    style={{ color: p.light ? "rgba(246,246,246,0.3)" : C.border }}
                  >
                    {i + 1} / {pillars.length}
                  </span>
                </div>

                {/* Middle — title */}
                <div>
                  <h2
                    className="font-light leading-[1.0] mb-5"
                    style={{
                      fontSize: "clamp(2.8rem, 7vw, 8rem)",
                      letterSpacing: "-0.04em",
                      color: p.light ? C.light : C.dark,
                    }}
                  >
                    {p.title}
                  </h2>
                  <p
                    className="text-base leading-[1.65] max-w-lg"
                    style={{ color: p.light ? "rgba(246,246,246,0.65)" : C.muted }}
                  >
                    {p.sub}
                  </p>
                </div>

                {/* Bottom — body + list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <p
                    className="text-sm leading-[1.95]"
                    style={{ color: p.light ? "rgba(246,246,246,0.5)" : C.muted }}
                  >
                    {p.body}
                  </p>
                  <ul className="space-y-3">
                    {p.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[12.5px] leading-[1.6]"
                        style={{ color: p.light ? "rgba(246,246,246,0.75)" : C.dark }}
                      >
                        <span
                          className="mt-[6px] w-3 h-px flex-shrink-0"
                          style={{ background: p.light ? "rgba(246,246,246,0.4)" : C.border }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   4. ROADMAP — year rows with micro wipe on hover
══════════════════════════════════════════ */
const roadmap = [
  {
    yr: "01",
    label: "Year One",
    title: "Establish. Present. Listen.",
    body: "The first year is about presence and foundation. Constituency offices open. First infrastructure bills tabled. Inaugural town halls in every ward of all three LGAs. The long-term federal lobbying work begins immediately.",
    actions: ["Open constituency offices across all 3 LGAs", "Infrastructure bills tabled in National Assembly", "Town halls in every ward of Ogun East", "Federal road lobby initiated with FERMA"],
  },
  {
    yr: "02",
    label: "Year Two",
    title: "Invest. Build. Begin.",
    body: "Federal allocations secured in year one translate into visible activity on the ground. Scholarship recipients announced. School intervention funding disbursed. First road and infrastructure contracts awarded.",
    actions: ["Constituency scholarship programme launched", "School intervention funding disbursed", "First road rehabilitation contracts awarded", "Healthcare centre upgrade legislation progressed"],
  },
  {
    yr: "03",
    label: "Year Three",
    title: "Measure. Report. Adjust.",
    body: "Mid-term is not a break — it is a reckoning. A full public accountability report is published. Community auditors review constituency fund spending. Omoowo meets openly with constituents to report on what has moved and what has not.",
    actions: ["Mid-term accountability report published publicly", "Community audit of all constituency spending", "Vocational training centre operational", "Adjusted priorities tabled based on feedback"],
  },
  {
    yr: "04",
    label: "Year Four",
    title: "Deliver. Complete. Account.",
    body: "The final year delivers on what was promised. Infrastructure projects commissioned. Impact on school enrolment, healthcare access, and economic activity measured independently. A full four-year record published — not to campaign, but to account.",
    actions: ["Infrastructure projects completed and commissioned", "Independent four-year impact assessment", "Full expenditure report published", "End-of-term public accountability forum held"],
  },
];

function Roadmap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 md:py-44 px-6 md:px-12 lg:px-20" style={{ background: C.bg }}>
      <div className="max-w-300 mx-auto">
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[10px] tracking-[0.42em] uppercase mb-5"
            style={{ color: C.mid }}
          >
            Four-Year Roadmap
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="font-light leading-[1.06]"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.4rem)", color: C.dark, letterSpacing: "-0.025em", maxWidth: "560px" }}
          >
            How four years become a legacy.
          </motion.h2>
        </div>

        <div>
          {roadmap.map((r, i) => (
            <motion.div
              key={r.yr}
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08 + i * 0.11, ease }}
              className="grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] items-start gap-6 md:gap-14 py-12 border-t group"
              style={{ borderColor: C.border }}
            >
              {/* Year number */}
              <div>
                <div
                  className="font-light leading-none group-hover:text-[#E63035] transition-colors duration-300"
                  style={{ fontSize: "clamp(2.2rem, 4vw, 3.8rem)", color: C.border, letterSpacing: "-0.05em" }}
                >
                  {r.yr}
                </div>
                <p className="text-[9px] tracking-[0.25em] uppercase mt-1.5" style={{ color: C.muted }}>
                  {r.label}
                </p>
              </div>

              {/* Description */}
              <div>
                <h3
                  className="font-light mb-4"
                  style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.45rem)", color: C.dark, letterSpacing: "-0.01em" }}
                >
                  {r.title}
                </h3>
                <p className="text-sm leading-[1.95]" style={{ color: C.muted }}>{r.body}</p>
              </div>

              {/* Action list */}
              <ul className="space-y-3 md:pt-1">
                {r.actions.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-[12px] leading-[1.65]" style={{ color: C.dark }}>
                    <motion.span
                      className="mt-[5px] flex-shrink-0 h-px"
                      style={{ background: C.mid }}
                      initial={{ width: 0 }}
                      whileInView={{ width: 12 }}
                      viewport={{ once: false, margin: "-80px" }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                    />
                    {a}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          <div className="h-px" style={{ background: "rgba(246,246,246,0.15)" }} />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   5. MANIFESTO — two-column typographic
══════════════════════════════════════════ */
const sentences = [
  { text: "Ogun East has been patient for too long.", strong: false },
  { text: "The roads exist on paper.", strong: true },
  { text: "The schools deserve better.", strong: false },
  { text: "The clinics need to be equipped.", strong: false },
  { text: "Under Omoowo — that changes.", strong: true },
];

function Manifesto() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });

  return (
    <section ref={ref} className="py-32 md:py-56 px-6 md:px-12 lg:px-20" style={{ background: "#094e7d" }}>
      <div className="max-w-300 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-14 lg:gap-28 items-start">

          {/* Left — label */}
          <div className="lg:pt-3">
            <motion.div
              className="w-8 h-px mb-6 origin-left"
              style={{ background: "rgba(246,246,246,0.2)" }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7 }}
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="text-[10px] tracking-[0.38em] uppercase"
              style={{ color: "rgba(246,246,246,0.3)" }}
            >
              The Commitment
            </motion.p>
          </div>

          {/* Right — stacked sentences */}
          <div className="space-y-0.5">
            {sentences.map((s, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <motion.p
                  initial={{ y: "108%", opacity: 0 }}
                  animate={inView ? { y: "0%", opacity: 1 } : {}}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease }}
                  className="font-light leading-[1.18]"
                  style={{
                    fontSize: "clamp(1.6rem, 3.8vw, 4rem)",
                    letterSpacing: "-0.025em",
                    color: s.strong ? C.light : "rgba(246,246,246,0.38)",
                  }}
                >
                  {s.text}
                </motion.p>
              </div>
            ))}
          </div>
        </div>

        {/* Attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-20 pt-8 flex items-center gap-5"
          style={{ borderTop: "1px solid rgba(246,246,246,0.07)" }}
        >
          <div className="w-6 h-px shrink-0" style={{ background: "rgba(246,246,246,0.18)" }} />
          <p className="text-[10px] tracking-[0.28em] uppercase" style={{ color: "rgba(246,246,246,0.28)" }}>
            Alhaji Abdulhameed Oluwafemi Omotayo (Omoowo) &mdash; PDP Candidate, Ogun East 2027
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   6. CTA — dark mid, commanding
══════════════════════════════════════════ */
function VisionCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  const buttons = [
    { label: "← Back to Home", href: "/", variant: "ghost" as const },
    { label: "View Policies", href: "/policies", variant: "outline" as const },
    { label: "Join the Campaign", href: "/#involved", variant: "solid" as const },
  ];

  return (
    <section ref={ref} className="py-32 md:py-44 px-6 md:px-12 lg:px-20" style={{ background: C.mid }}>
      <div className="max-w-300 mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-28 items-end">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease }}
            className="font-light text-[#F6F3F3] leading-[1.05] mb-8"
            style={{ fontSize: "clamp(2.2rem, 5vw, 5.2rem)", letterSpacing: "-0.035em" }}
          >
            Be part of what comes next.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="text-sm leading-[1.9] max-w-sm"
            style={{ color: "rgba(246,246,246,0.6)" }}
          >
            This vision only works if the people of Ogun East are part of it — not as spectators,
            but as partners. If you believe in what Omoowo is building, join the movement.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.3, ease }}
          className="flex flex-col gap-3"
        >
          {buttons.map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              className="px-8 py-4 text-center text-[11px] tracking-[0.22em] uppercase transition-all duration-200 hover:opacity-75"
              style={
                btn.variant === "solid"
                  ? { background: C.light, color: C.dark }
                  : btn.variant === "outline"
                  ? { border: "1px solid rgba(246,246,246,0.35)", color: C.light }
                  : { border: "1px solid rgba(246,246,246,0.12)", color: "rgba(246,246,246,0.5)" }
              }
            >
              {btn.label}
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
export default function VisionPage() {
  return (
    <>
      <Nav />
      <main>
        <VisionHero />
        <TheNumbers />
        <VisionPillars />
        <Roadmap />
        <Manifesto />
        <VisionCTA />
      </main>
      <Footer />
    </>
  );
}
