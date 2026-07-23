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
   DATA
══════════════════════════════════════════ */
type NewsCategory = "Press Release" | "Campaign Update" | "Community" | "Statement" | "Speech";

interface NewsItem {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
  readMin: number;
  live?: boolean;
}

const NEWS: NewsItem[] = [
  { id: 1, date: "18 Jul 2026", title: "Grand Campaign Launch Rally Set for 2 August — Omoowo Calls on All of Ogun East to Attend",       excerpt: "Alhaji Abdulhameed Oluwafemi Omotayo has formally announced the Grand Campaign Launch Rally scheduled for Saturday, 2 August 2026 at Ijebu-Ode Township Stadium. The event is open to all residents of Ogun East Senatorial District. Omoowo says the rally marks the official start of a people-first campaign — not in Abuja, but in the community.", category: "Campaign Update", readMin: 3, live: true },
  { id: 2, date: "12 Jul 2026", title: "Omoowo Unveils Five-Point Infrastructure Plan for Ogun East Federal Roads",                        excerpt: "The PDP candidate for Ogun East has published a detailed legislative agenda for road infrastructure rehabilitation, targeting all three LGAs of the Senatorial District — with specific reference to long-abandoned federal road projects.", category: "Statement", readMin: 4 },
  { id: 3, date: "10 Jul 2026", title: "Omoowo Calls for Urgent Federal Intervention in Ogun East Healthcare Facilities",                  excerpt: "In a statement, the PDP Senatorial candidate highlighted chronic underfunding of primary healthcare centres across the district and called on NHIA to prioritise Ogun East in its next allocation cycle.", category: "Statement", readMin: 3 },
  { id: 4, date: "05 Jul 2026", title: "Youth Leaders Across Ikenne LGA Formally Back Omoowo's 2027 Senatorial Bid",                       excerpt: "A coalition of youth associations in Ikenne Local Government Area issued a formal endorsement of Omoowo, citing his education and empowerment commitments as central to their support.", category: "Community", readMin: 2 },
  { id: 5, date: "28 Jun 2026", title: "Stakeholders Consultation Concludes in Sagamu — Over 200 Community Leaders Engaged",               excerpt: "Omoowo's team concluded a three-day consultation in Sagamu, meeting market associations, youth groups, and community elders across Ikenne LGA.", category: "Campaign Update", readMin: 3 },
  { id: 6, date: "22 Jun 2026", title: "Omoowo Meets Fishing Communities in Ogun Waterside — Pledges Action on Coastal Security",         excerpt: "The PDP candidate met fishing community leaders in Ogun Waterside LGA and outlined legislative proposals to address coastal piracy and support fishermen's livelihoods.", category: "Community", readMin: 3 },
  { id: 7, date: "08 Jun 2026", title: "PDP Ward Congress Endorses Omoowo Across All Three LGAs of Ogun East",                            excerpt: "Following the completion of the PDP ward congress, Omoowo secured endorsements from ward delegates across Ijebu-East, Ogun Waterside, and Ikenne LGAs.", category: "Press Release", readMin: 2 },
  { id: 8, date: "15 May 2026", title: "Omoowo Formally Declares Candidacy for the 2027 Ogun East Senatorial Election",                   excerpt: "In a formal declaration before party leaders in Ijebu-Ode, Alhaji Abdulhameed Oluwafemi Omotayo officially announced his candidacy for the 2027 Ogun East Senatorial District election under the PDP platform.", category: "Press Release", readMin: 4 },
];

const LEAD        = NEWS[0];
const FEATURED    = [NEWS[1], NEWS[2]];
const INDEX_NEWS  = NEWS.slice(3);

const FILTERS = ["All", "Press Release", "Campaign Update", "Community", "Statement", "Speech"] as const;
type Filter = (typeof FILTERS)[number];

/* Pills — solid colours that read on both light and dark backgrounds */
const CAT_STYLE: Record<NewsCategory, { bg: string; color: string }> = {
  "Press Release":   { bg: C.dark,    color: C.light },
  "Campaign Update": { bg: C.red,     color: C.light },
  "Community":       { bg: C.green,   color: C.light },   /* green */
  "Statement":       { bg: C.muted,   color: C.light },
  "Speech":          { bg: C.dark,    color: C.light },
};

function CategoryPill({ cat }: { cat: NewsCategory }) {
  const s = CAT_STYLE[cat];
  return (
    <span className="inline-block px-3 py-1.5 text-[8.5px] tracking-[0.3em] uppercase shrink-0" style={{ background: s.bg, color: s.color }}>
      {cat}
    </span>
  );
}

/* ══════════════════════════════════════════
   1. HERO — WHITE background
══════════════════════════════════════════ */
function NewsHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const headY   = useTransform(scrollYProgress, [0, 1], ["0%", "11%"]);
  const tickerY = useTransform(scrollYProgress, [0, 1], ["0%", "4%"]);

  const headline = [
    { words: ["The"],         d: 0.3  },
    { words: ["campaign,"],   d: 0.44 },
    { words: ["in"],          d: 0.57 },
    { words: ["the", "open."], d: 0.68 },
  ];

  const tickerText = "Grand Launch Rally · 2 Aug · Ijebu-Ode Stadium   ·   Infrastructure Plan Published   ·   Youth Leaders Back Omoowo   ·   PDP Ward Congress Complete   ·   Stakeholders Consultation Concluded   ·   ";

  return (
    <section ref={ref} className="relative overflow-hidden flex flex-col" style={{ minHeight: "100vh", background: "#FFFFFF" }}>
      {/* Subtle vertical rule — dark on white */}
      <div className="absolute top-0 bottom-0 w-px pointer-events-none" style={{ left: "clamp(1.5rem, 5vw, 5rem)", background: "rgba(26,26,26,0.05)" }} />

      {/* Radial glows: green bottom-left, red top-right */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 8% 85%, rgba(0,139,77,0.06) 0%, transparent 50%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 88% 15%, rgba(230,48,53,0.06) 0%, transparent 50%)" }} />
      </div>

      <motion.div className="relative z-10 flex-1 flex flex-col max-w-300 mx-auto w-full px-6 md:px-12 lg:px-20" style={{ y: headY }}>

        {/* Masthead */}
        <div className="flex items-center justify-between pt-32 md:pt-36 pb-5 border-b" style={{ borderColor: "rgba(26,26,26,0.07)" }}>
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="flex items-center gap-3"
          >
            <span className="w-0.5 h-4 shrink-0 inline-block" style={{ background: C.green }} />
            <div className="w-5 h-px" style={{ background: C.red }} />
            <span className="text-[10px] tracking-[0.42em] uppercase" style={{ color: C.muted }}>
              Press &amp; News
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
            <span className="text-[9px] tracking-[0.28em] uppercase" style={{ color: "rgba(26,26,26,0.35)" }}>
              Dispatches from the campaign
            </span>
          </motion.div>
        </div>

        {/* Headline */}
        <div className="flex-1 flex items-center py-16 md:py-20">
          <div>
            <h1 className="font-light leading-[0.96] mb-10" style={{ fontSize: "clamp(3.6rem, 10vw, 10.5rem)", letterSpacing: "-0.04em", color: C.dark }}>
              {headline.map(({ words, d }) => (
                <span key={d} style={{ display: "block" }}>
                  {words.map((word, wi) => (
                    <span key={wi} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.19em" }}>
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
              transition={{ duration: 0.85, delay: 1.05, ease }}
              className="text-sm leading-[1.95] max-w-md"
              style={{ color: C.muted }}
            >
              All statements, updates, and dispatches from the Omoowo 2027 Senatorial Campaign —
              published directly, without filter or spin.
            </motion.p>
          </div>
        </div>

        {/* News ticker strip */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.4 }} style={{ y: tickerY }}>
          <div className="border-t py-4 overflow-hidden" style={{ borderColor: "rgba(26,26,26,0.07)" }}>
            <div className="flex items-center gap-6">
              <span className="shrink-0 text-[8.5px] tracking-[0.35em] uppercase px-2.5 py-1.5" style={{ background: C.red, color: C.light }}>
                Latest
              </span>
              <div className="overflow-hidden flex-1">
                <motion.div
                  className="flex whitespace-nowrap"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                  style={{ fontSize: "0.68rem", letterSpacing: "0.12em", color: C.muted }}
                >
                  <span>{tickerText}</span>
                  <span>{tickerText}</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   2. LEAD STORY — white background
      Card: white left panel, green right panel
══════════════════════════════════════════ */
function LeadStory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 md:py-32 px-6 md:px-12 lg:px-20" style={{ background: "#FFFFFF" }}>
      <div className="max-w-300 mx-auto">

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2.5 text-[10px] tracking-[0.42em] uppercase mb-10"
          style={{ color: C.red }}
        >
          <span className="w-0.5 h-4 shrink-0 inline-block" style={{ background: C.green }} />
          Lead Dispatch
        </motion.p>

        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
          transition={{ duration: 1.1, ease }}
          className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-0"
          style={{ background: C.light, border: "1px solid rgba(26,26,26,0.08)" }}
        >
          {/* Left — white panel, dark text */}
          <div className="p-10 md:p-14 lg:p-16 flex flex-col justify-between" style={{ background: C.light }}>
            <div className="flex items-center gap-4 mb-8">
              <CategoryPill cat={LEAD.category} />
              {LEAD.live && (
                <div className="flex items-center gap-2">
                  <div className="relative w-1.5 h-1.5">
                    <div className="absolute inset-0 rounded-full bg-green-400 opacity-60 animate-ping" />
                    <div className="rounded-full w-1.5 h-1.5 bg-green-400" />
                  </div>
                  <span className="text-[8.5px] tracking-[0.28em] uppercase" style={{ color: C.muted }}>Latest</span>
                </div>
              )}
            </div>

            <div>
              <h2 className="font-light leading-[1.12] mb-6" style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.6rem)", color: C.dark, letterSpacing: "-0.02em" }}>
                {LEAD.title}
              </h2>
              <div className="h-px mb-6" style={{ background: "rgba(26,26,26,0.08)" }} />
              <p className="text-sm leading-[1.95] mb-8" style={{ color: C.muted }}>{LEAD.excerpt}</p>
              <div className="flex items-center gap-5">
                <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: C.border }}>{LEAD.date}</span>
                <span style={{ color: C.border }}>·</span>
                <span className="text-[10px]" style={{ color: C.border }}>{LEAD.readMin} min read</span>
              </div>
            </div>
          </div>

          {/* Right — green date panel */}
          <div className="hidden lg:flex flex-col items-center justify-center p-14 relative overflow-hidden" style={{ background: C.green }}>
            <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
              <span className="font-light leading-none" style={{ fontSize: "clamp(10rem, 20vw, 18rem)", color: "rgba(246,246,246,0.06)", letterSpacing: "-0.06em" }}>
                01
              </span>
            </div>
            <div className="relative z-10 text-center">
              <p className="font-light leading-none mb-2" style={{ fontSize: "clamp(2.5rem, 5vw, 5.5rem)", color: C.light, letterSpacing: "-0.04em" }}>
                {LEAD.date.split(" ")[0]}
              </p>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: "rgba(246,246,246,0.5)" }}>
                {LEAD.date.split(" ")[1]} {LEAD.date.split(" ")[2]}
              </p>
              <p className="text-[9px] tracking-[0.22em] uppercase" style={{ color: "rgba(246,246,246,0.35)" }}>
                Campaign Dispatch
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   3. FEATURED PAIR — WHITE background
      Cards: card 0 = red hover, card 1 = green hover
══════════════════════════════════════════ */
const featuredAccent = [C.red, C.green] as string[];

function FeaturedCard({ item, i, inView }: { item: NewsItem; i: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const accent = featuredAccent[i];

  return (
    <motion.div
      initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.12 + i * 0.14, ease }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group p-10 md:p-12 cursor-pointer"
      style={{ background: C.bg }}
    >
      <div className="flex items-center justify-between mb-7">
        <CategoryPill cat={item.category} />
        <span className="text-[10px] tracking-[0.18em]" style={{ color: C.border }}>{item.readMin} min</span>
      </div>

      <div className="mb-5">
        <h3
          className="font-light leading-[1.18] transition-colors duration-300"
          style={{ fontSize: "clamp(1.1rem, 1.7vw, 1.5rem)", color: hovered ? accent : C.dark, letterSpacing: "-0.015em" }}
        >
          {item.title}
        </h3>
        <div
          className="h-px mt-3 origin-left transition-transform duration-500"
          style={{ background: accent, transform: hovered ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left" }}
        />
      </div>

      <p className="text-sm leading-[1.9] mb-7" style={{ color: C.muted }}>{item.excerpt}</p>

      <div className="flex items-center justify-between">
        <span className="text-[10px] tracking-[0.18em] uppercase" style={{ color: C.border }}>{item.date}</span>
        <span
          className="text-[11px] tracking-[0.18em] uppercase inline-block transition-all duration-300"
          style={{ color: accent, transform: hovered ? "translateX(6px)" : "translateX(0)" }}
        >
          Read &rarr;
        </span>
      </div>
    </motion.div>
  );
}

function FeaturedPair() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ background: C.bg }}>
      <div className="max-w-300 mx-auto">
        <div className="border-t mb-10 pt-6 flex items-center justify-between" style={{ borderColor: C.border }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5 text-[10px] tracking-[0.42em] uppercase"
            style={{ color: C.red }}
          >
            <span className="w-0.5 h-4 shrink-0 inline-block" style={{ background: C.green }} />
            Also in this edition
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[10px] tracking-[0.22em] uppercase"
            style={{ color: C.border }}
          >
            2 dispatches
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: C.border }}>
          {FEATURED.map((item, i) => (
            <FeaturedCard key={item.id} item={item} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   4. NEWS INDEX — white background
      Accent bars alternate green / red per row
══════════════════════════════════════════ */
const indexAccent = [C.green, C.red, C.green, C.red, C.green] as string[];

function IndexRow({ item, num, i }: { item: NewsItem; num: string; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const accent = indexAccent[i % indexAccent.length];

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, delay: i * 0.07 }}
      className="group grid grid-cols-1 md:grid-cols-[52px_1fr_auto] items-start gap-4 md:gap-10 py-8 border-t relative cursor-pointer overflow-hidden"
      style={{ borderColor: "rgba(26,26,26,0.08)" }}
    >
      {/* Animated left accent bar — alternating green / red */}
      <motion.div
        className="absolute left-0 top-0 w-0.5 origin-top"
        style={{ background: accent }}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.55, delay: i * 0.07, ease }}
      />

      {/* Sequence number */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.08 + i * 0.07 }}
        className="font-light leading-none pt-1 pl-4"
        style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", color: "rgba(26,26,26,0.1)", letterSpacing: "-0.04em" }}
      >
        {num}
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.12 + i * 0.07, ease }}
      >
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <CategoryPill cat={item.category} />
          <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "rgba(26,26,26,0.4)" }}>{item.date}</span>
        </div>
        <h3
          className="font-light leading-[1.22] transition-colors duration-300"
          style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.25rem)", color: "rgba(26,26,26,0.85)", letterSpacing: "-0.01em" }}
        >
          {item.title}
        </h3>
        {/* Accent underline on hover */}
        <div
          className="h-px mt-3 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
          style={{ background: accent }}
        />
      </motion.div>

      {/* Reading time + arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
        className="shrink-0 flex flex-col items-end gap-2 pt-1"
      >
        <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "rgba(26,26,26,0.35)" }}>{item.readMin} min</span>
        <span
          className="text-lg opacity-0 group-hover:opacity-60 group-hover:translate-x-1 transition-all duration-300"
          style={{ color: C.dark }}
        >
          &rarr;
        </span>
      </motion.div>
    </motion.div>
  );
}

function NewsIndex() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<Filter>("All");

  const filtered = active === "All" ? INDEX_NEWS : INDEX_NEWS.filter((n) => n.category === active);

  return (
    <section ref={ref} className="py-24 md:py-40 px-6 md:px-12 lg:px-20" style={{ background: "#FFFFFF" }}>
      <div className="max-w-300 mx-auto">

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
              All Dispatches
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="font-light leading-[1.06]"
              style={{ fontSize: "clamp(1.7rem, 3vw, 2.8rem)", color: C.dark, letterSpacing: "-0.025em" }}
            >
              Every word, on the record.
            </motion.h2>
          </div>

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
                className={`relative px-4 py-2 text-[9.5px] tracking-[0.22em] uppercase overflow-hidden transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/20 ${active === f ? "" : "hover:opacity-70"}`}
                style={{
                  color: active === f ? C.light : "rgba(26,26,26,0.45)",
                  border: `1px solid ${active === f ? C.red : "rgba(26,26,26,0.15)"}`,
                }}
              >
                {active === f && (
                  <motion.span
                    layoutId="news-filter-pill"
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

        <div className="flex items-center justify-between mb-2">
          <p className="text-[9.5px] tracking-[0.25em] uppercase" style={{ color: "rgba(26,26,26,0.35)" }}>
            {filtered.length} dispatch{filtered.length !== 1 ? "es" : ""}
          </p>
        </div>

        <div className="min-h-50">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <IndexRow key={item.id} item={item} num={String(i + 1).padStart(2, "0")} i={i} />
            ))}
          </AnimatePresence>
          <div className="h-px" style={{ background: "rgba(26,26,26,0.08)" }} />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   5. NEWSLETTER CTA — WHITE background
══════════════════════════════════════════ */
function NewsletterCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section ref={ref} className="py-28 md:py-44 px-6 md:px-12 lg:px-20" style={{ background: "#FFFFFF" }}>
      <div className="max-w-300 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-28 items-end">

          {/* Left — copy */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 text-[10px] tracking-[0.42em] uppercase mb-5"
              style={{ color: C.red }}
            >
              <span className="w-0.5 h-4 shrink-0 inline-block" style={{ background: C.green }} />
              Stay Informed
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.95, delay: 0.1, ease }}
              className="font-light leading-[1.04] mb-7"
              style={{ fontSize: "clamp(2rem, 4.5vw, 5rem)", letterSpacing: "-0.035em", color: C.dark }}
            >
              Don&apos;t miss a dispatch.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.22, ease }}
              className="text-sm leading-[1.95]"
              style={{ color: C.muted }}
            >
              Every statement, update, and event notice from the Omoowo 2027 campaign —
              delivered directly to your inbox. No noise. Just the campaign, in your own time.
            </motion.p>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.3, ease }}
          >
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="flex flex-col sm:flex-row gap-0" style={{ border: "1px solid rgba(26,26,26,0.12)" }}>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="flex-1 bg-transparent px-5 py-4 text-sm outline-none"
                      style={{ color: C.dark, caretColor: C.dark }}
                    />
                    <button
                      onClick={() => value.includes("@") && setSent(true)}
                      className="px-7 py-4 text-[10px] tracking-[0.22em] uppercase shrink-0 transition-colors duration-200 hover:bg-[#008B4D] focus-visible:outline-none focus-visible:bg-[#008B4D]"
                      style={{ background: C.red, color: C.light }}
                    >
                      Subscribe
                    </button>
                  </div>
                  <p className="text-[10px] mt-3" style={{ color: "rgba(26,26,26,0.3)" }}>
                    No spam. Unsubscribe at any time.
                  </p>
                </motion.div>
              ) : (
                <motion.div key="thanks" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="py-8">
                  <div className="flex items-center gap-4 mb-3">
                    <motion.div
                      className="w-8 h-px origin-left"
                      style={{ background: C.green }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: C.green }}>Subscribed</p>
                  </div>
                  <p className="text-sm leading-[1.85]" style={{ color: C.muted }}>
                    You&apos;re on the list. Watch your inbox for dispatches from the campaign.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Nav links — neutral / green / red / neutral */}
            <div className="flex flex-wrap gap-3 mt-10">
              {[
                { label: "← Home",    href: "/",          style: { border: `1px solid ${C.border}`,          color: C.muted  } },
                { label: "Events",    href: "/events",     style: { border: `1px solid ${C.green}`,           color: C.green  } },
                { label: "Vision",    href: "/vision",     style: { border: `1px solid ${C.red}`,             color: C.red    } },
                { label: "Policies",  href: "/policies",   style: { border: `1px solid ${C.border}`,          color: C.muted  } },
              ].map((l) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  className="px-5 py-2.5 text-[9.5px] tracking-[0.22em] uppercase hover:opacity-70 transition-opacity duration-200"
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.97 }}
                  style={l.style}
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function NewsPage() {
  return (
    <>
      <Nav />
      <main>
        <NewsHero />
        <LeadStory />
        <FeaturedPair />
        <NewsIndex />
        <NewsletterCTA />
      </main>
      <Footer />
    </>
  );
}
