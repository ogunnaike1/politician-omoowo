"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   1. HERO â€” word-by-word masked reveal + parallax bg
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function VisionHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const line1 = ["A", "clearer", "Ogun", "East"];
  const line2 = ["starts", "here."];

  return (
    <section ref={ref} className="relative overflow-hidden flex items-end" style={{ minHeight: "92vh", background: "#E9EEF2" }}>
      {/* Parallax accent shapes */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 75% 30%, rgba(62,92,118,0.09) 0%, transparent 55%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 15% 75%, rgba(62,92,118,0.06) 0%, transparent 45%)" }} />
        {/* Large decorative number */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 font-light select-none pointer-events-none"
          style={{ fontSize: "clamp(14rem, 28vw, 28rem)", color: "rgba(62,92,118,0.04)", letterSpacing: "-0.06em", lineHeight: 1 }}
        >
          V
        </div>
      </motion.div>

      <motion.div
        className="relative z-10 w-full max-w-300 mx-auto px-6 md:px-12 lg:px-20 pb-20 md:pb-32"
        style={{ y: textY }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="text-[#294B68] text-[10px] tracking-[0.45em] uppercase mb-8"
        >
          His Vision &middot; Ogun East &middot; 2027
        </motion.p>

        <h1
          className="font-light text-[#0B0E13] leading-[1.02] mb-8"
          style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)", letterSpacing: "-0.03em" }}
        >
          {[line1, line2].map((words, li) => (
            <span key={li} style={{ display: "block" }}>
              {words.map((word, wi) => (
                <span key={wi} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em" }}>
                  <motion.span
                    style={{ display: "inline-block" }}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.3 + li * 0.2 + wi * 0.1, ease }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease }}
          className="text-[#8A94A6] leading-relaxed max-w-xl"
          style={{ fontSize: "clamp(1rem, 1.3vw, 1.1rem)" }}
        >
          Omoowo&apos;s vision for Ogun East is not abstract. It is rooted in the daily realities
          of the people â€” and built on a concrete plan to change them.
        </motion.p>

        {/* Animated scroll cue */}
        <motion.div
          className="mt-16 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.4 }}
        >
          <motion.div
            className="w-10 h-px bg-[#294B68] origin-left"
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <p className="text-[#8A94A6] text-[10px] tracking-[0.3em] uppercase">Scroll to explore</p>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   2. PHILOSOPHY â€” horizontal clip-path wipe on each line
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function Philosophy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  const lines = [
    "Governing is not a performance.",
    "It is a discipline.",
    "It is showing up every day",
    "for the people who sent you.",
  ];

  return (
    <section ref={ref} className="py-28 md:py-44 px-6 md:px-12 lg:px-20" style={{ background: "#294B68" }}>
      <div className="max-w-300 mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[10px] tracking-[0.4em] uppercase mb-16"
          style={{ color: "rgba(237,241,245,0.45)" }}
        >
          His Philosophy
        </motion.p>

        <div className="space-y-3 mb-16">
          {lines.map((line, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <motion.p
                initial={{ y: "110%", opacity: 0 }}
                animate={inView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.85, delay: 0.1 + i * 0.13, ease }}
                className="font-light text-[#EDF1F5] leading-tight"
                style={{ fontSize: "clamp(1.8rem, 4vw, 4rem)", letterSpacing: "-0.02em" }}
              >
                {line}
              </motion.p>
            </div>
          ))}
        </div>

        {/* Horizontal wipe divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.7, ease }}
          className="h-px origin-left mb-12"
          style={{ background: "rgba(237,241,245,0.15)" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.85, ease }}
          className="leading-[1.9] max-w-2xl"
          style={{ fontSize: "clamp(0.9rem, 1.1vw, 1rem)", color: "rgba(237,241,245,0.65)" }}
        >
          Omoowo does not see elected office as a reward. He sees it as a responsibility â€” one that
          demands consistent presence, honest communication, and measurable results. His vision for Ogun
          East is not measured in speeches. It is measured in roads built, schools improved, clinics
          equipped, and families whose lives are meaningfully better.
        </motion.p>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   3. PILLARS â€” 3D rotateY flip-in on scroll
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const pillars = [
  {
    n: "01",
    title: "People First",
    body: "Every legislative decision Omoowo makes will begin with one question: how does this tangibly improve daily life for the people of Ogun East? Not in theory â€” in practice, on the ground, in the communities where people actually live.",
    detail: "Town halls every quarter. An open constituency office. A published voting record. The people will always know where their senator stands.",
  },
  {
    n: "02",
    title: "Inclusive Growth",
    body: "Development in Ogun East cannot mean progress for some communities and stagnation for others. From the coastal communities of Ogun Waterside to the agricultural heartland of Ijebu-East and the urban centres of Ikenne â€” every LGA must feel the difference.",
    detail: "Omoowo will track development equity across all three LGAs and report publicly on resource distribution every six months.",
  },
  {
    n: "03",
    title: "Accountable Leadership",
    body: "Power without accountability is just privilege. Omoowo commits to full transparency in how constituency funds are used, how he votes in the Senate, and how he represents the interests of Ogun East in Abuja.",
    detail: "Published voting records, quarterly reports, and regular community engagements are non-negotiables â€” not optional extras.",
  },
];

function Pillars() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#E9EEF2] py-28 md:py-44 px-6 md:px-12 lg:px-20">
      <div className="max-w-300 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[#294B68] text-[10px] tracking-[0.4em] uppercase mb-4"
            >
              Three Pillars
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="font-light text-[#0B0E13] leading-[1.08]"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)", letterSpacing: "-0.02em" }}
            >
              What this vision stands on.
            </motion.h2>
          </div>
        </div>

        {/* Flip-in cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#C8D4DE]" style={{ perspective: "1000px" }}>
          {pillars.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, rotateY: -45, x: -30 }}
              animate={inView ? { opacity: 1, rotateY: 0, x: 0 } : {}}
              transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.15 + i * 0.15 }}
              style={{ transformOrigin: "left center" }}
              className="bg-[#E9EEF2] p-10 md:p-12 group hover:bg-[#DFE8EF] transition-colors duration-300"
            >
              <div className="flex items-start justify-between mb-8">
                <p className="text-[#C8D4DE] text-[11px] tracking-[0.3em]">{p.n}</p>
                <motion.div
                  className="w-5 h-px bg-[#294B68] origin-right"
                  whileHover={{ width: 40 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <h3
                className="font-light text-[#0B0E13] leading-tight mb-5 group-hover:text-[#294B68] transition-colors duration-300"
                style={{ fontSize: "clamp(1.3rem, 1.8vw, 1.8rem)" }}
              >
                {p.title}
              </h3>
              <p className="text-[#8A94A6] text-sm leading-[1.85] mb-6">{p.body}</p>
              <div className="pt-6 border-t border-[#C8D4DE]">
                <p className="text-[#294B68] text-[11px] leading-relaxed italic">{p.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   4. FUTURE â€” staggered scale+fade paragraphs with pull quote
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const futureItems = [
  {
    heading: "Roads that connect.",
    body: "By the end of his first term, Omoowo envisions an Ogun East where no community is more than thirty minutes from a paved road â€” where farmers can move produce to market the same day it is harvested, and where ambulances can reach remote villages in time to save lives.",
  },
  {
    heading: "Schools that inspire.",
    body: "Every public school in the Senatorial District should have qualified teachers, functional classrooms, and access to digital learning tools. Omoowo sees an Ogun East where a child's postal code does not determine the quality of their education.",
  },
  {
    heading: "Clinics that heal.",
    body: "A functional primary healthcare centre in every ward. Trained staff. Essential medicines. Omoowo sees an Ogun East where no mother loses a child to a condition that a well-equipped clinic could have treated.",
  },
  {
    heading: "Communities that thrive.",
    body: "With security restored, agriculture properly supported, and young people gainfully employed, Omoowo envisions an Ogun East that attracts investment â€” one where the next generation builds their future here, not somewhere else.",
  },
];

function Future() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 md:py-44 px-6 md:px-12 lg:px-20" style={{ background: "#294B68" }}>
      <div className="max-w-300 mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[10px] tracking-[0.4em] uppercase mb-6"
          style={{ color: "rgba(237,241,245,0.45)" }}
        >
          The Future He Sees
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="font-light text-[#EDF1F5] leading-[1.08] mb-20"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)", letterSpacing: "-0.02em" }}
        >
          What Ogun East looks like in 2031.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "rgba(237,241,245,0.1)" }}>
          {futureItems.map((item, i) => (
            <motion.div
              key={item.heading}
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15 + i * 0.12, ease }}
              className="p-10 md:p-12"
              style={{ background: "rgba(44,74,98,0.4)" }}
            >
              <motion.div
                className="w-8 h-px mb-6 origin-left"
                style={{ background: "rgba(237,241,245,0.35)" }}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
              />
              <h3
                className="font-light text-[#EDF1F5] leading-tight mb-5"
                style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)" }}
              >
                {item.heading}
              </h3>
              <p className="text-sm leading-[1.9]" style={{ color: "rgba(237,241,245,0.65)" }}>
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   5. FIRST TERM â€” counter + vertical timeline
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const termItems = [
  { year: "Year 1", title: "Foundations", body: "Establish constituency office, hold inaugural town halls across all LGAs, table first infrastructure bills, and begin lobbying for priority road rehabilitation funding." },
  { year: "Year 2", title: "Investment", body: "Secure federal education and healthcare allocations. Break ground on first major infrastructure projects. Launch constituency scholarship programme." },
  { year: "Year 3", title: "Momentum", body: "Mid-term accountability report published. Vocational training centre operational. Security framework legislation progressed. Agricultural support programmes running." },
  { year: "Year 4", title: "Delivery", body: "Completed infrastructure projects commissioned. Measurable improvements in school enrolment, healthcare access, and economic activity across Ogun East." },
];

function FirstTerm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#E9EEF2] py-28 md:py-44 px-6 md:px-12 lg:px-20">
      <div className="max-w-300 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_5fr] gap-16 lg:gap-28">

          {/* Left â€” sticky label + stat */}
          <div className="lg:sticky lg:top-36 self-start">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[#294B68] text-[10px] tracking-[0.4em] uppercase mb-5"
            >
              First Term Plan
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="font-light text-[#0B0E13] leading-[1.08] mb-8"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", letterSpacing: "-0.02em" }}
            >
              Four years. A clear plan. Real results.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease }}
              className="text-[#8A94A6] text-sm leading-[1.85]"
            >
              Omoowo commits to a structured four-year agenda with defined milestones,
              public reporting, and community accountability at every stage.
            </motion.p>

            {/* Big number accent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease }}
              className="mt-12 pt-8 border-t border-[#C8D4DE]"
            >
              <p className="font-light text-[#0B0E13] leading-none mb-2" style={{ fontSize: "clamp(3.5rem, 6vw, 5.5rem)", letterSpacing: "-0.04em" }}>4</p>
              <p className="text-[#8A94A6] text-[11px] tracking-[0.2em] uppercase">Years of service</p>
            </motion.div>
          </div>

          {/* Right â€” timeline */}
          <div className="relative">
            {/* Spine */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-px bg-[#C8D4DE] origin-top"
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.2, ease }}
            />

            <div className="space-y-0">
              {termItems.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.15, ease }}
                  className="pl-10 pb-14 relative"
                >
                  {/* Dot */}
                  <motion.div
                    className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-[#294B68] border-2 border-[#E9EEF2]"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.45 + i * 0.15 }}
                    style={{ marginLeft: "-6px" }}
                  />
                  <p className="text-[#294B68] text-[10px] tracking-[0.3em] uppercase mb-2">{item.year}</p>
                  <h3 className="font-light text-[#0B0E13] text-xl mb-3">{item.title}</h3>
                  <p className="text-[#8A94A6] text-sm leading-[1.85]">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   6. MANIFESTO â€” large blur+fade stagger, dark bg
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function Manifesto() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });

  const statement = "Ogun East has waited long enough. The roads should have been built. The schools should have been funded. The clinics should have been equipped. Under Omoowo â€” they will be.";
  const words = statement.split(" ");

  return (
    <section ref={ref} className="py-28 md:py-48 px-6 md:px-12 lg:px-20" style={{ background: "#0B0E13" }}>
      <div className="max-w-260 mx-auto">
        <motion.div
          className="w-10 h-px bg-[#294B68] mb-14 origin-left"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7 }}
        />
        <div
          className="font-light text-[#EDF1F5] leading-[1.35] mb-12"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.8rem)", letterSpacing: "-0.015em" }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
              animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.05 + i * 0.03, ease: "easeOut" }}
              style={{ display: "inline" }}
            >
              {word}{i < words.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9, ease }}
          className="text-[11px] tracking-[0.3em] uppercase"
          style={{ color: "rgba(237,241,245,0.4)" }}
        >
          Alhaji Omoowo &mdash; PDP Candidate, Ogun East 2027
        </motion.p>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   7. CTA
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function VisionCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#E9EEF2] py-28 md:py-36 px-6 md:px-12 lg:px-20">
      <div className="max-w-300 mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[#294B68] text-[10px] tracking-[0.4em] uppercase mb-4"
          >
            Share This Vision
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="font-light text-[#0B0E13]"
            style={{ fontSize: "clamp(1.7rem, 3.5vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            Help make this future real.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          className="flex flex-wrap gap-4 shrink-0"
        >
          <a href="/" className="px-7 py-3 border border-[#C8D4DE] text-[#0B0E13] text-[11px] tracking-[0.2em] uppercase hover:border-[#0B0E13] transition-colors duration-200">
            &larr; Back to Home
          </a>
          <a href="/policies" className="px-7 py-3 border border-[#294B68] text-[#294B68] text-[11px] tracking-[0.2em] uppercase hover:bg-[#294B68] hover:text-[#EDF1F5] transition-all duration-200">
            View Policies
          </a>
          <a href="/#involved" className="px-7 py-3 bg-[#0B0E13] text-[#EDF1F5] text-[11px] tracking-[0.2em] uppercase hover:bg-[#294B68] transition-colors duration-200">
            Join the Campaign
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   PAGE
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function VisionPage() {
  return (
    <>
      <Nav />
      <main>
        <VisionHero />
        <Philosophy />
        <Pillars />
        <Future />
        <FirstTerm />
        <Manifesto />
        <VisionCTA />
      </main>
      <Footer />
    </>
  );
}
