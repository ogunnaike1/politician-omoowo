"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const stats = [
  { value: 9,    suffix: "", label: "Local Governments", sub: "across Ogun East Senatorial District" },
  { value: 3,    suffix: "", label: "LGAs in District",  sub: "Ijebu-East, Ogun Waterside, Ikenne" },
  { value: 2027, suffix: "", label: "Election Year",     sub: "National Assembly general elections" },
  { value: 1,    suffix: "", label: "Clear Mission",     sub: "Serve the people of Ogun East" },
];

// 2 green : 2 red — perfect balance
const statAccent = ["#008B4D", "#E63035", "#008B4D", "#E63035"];
// 2 green : 1 red — offsets the neutral gap lines
const timeAccent = ["#008B4D", "#E63035", "#008B4D"];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [inView, value]);

  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
}

function StatCard({
  s,
  i,
  accent,
  inView,
}: {
  s: { value: number; suffix: string; label: string; sub: string };
  i: number;
  accent: string;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const hoverBg = accent === "#E63035" ? "rgba(230,48,53,0.12)" : "rgba(0,139,77,0.12)";

  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
      transition={{ duration: 0.75, delay: 0.2 + i * 0.15, ease }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="px-8 py-10 cursor-default transition-colors duration-300"
      style={{
        backgroundColor: hovered ? hoverBg : "#FFFFFF",
        borderTop: `3px solid ${accent}`,
      }}
    >
      <p
        className="font-light tabular-nums leading-none mb-3 transition-colors duration-300"
        style={{
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          letterSpacing: "-0.03em",
          color: hovered ? accent : "#1A1A1A",
        }}
      >
        <AnimatedNumber value={s.value} suffix={s.suffix} />
      </p>
      <p
        className="text-sm mb-1 transition-colors duration-300"
        style={{ color: hovered ? accent : "#1A1A1A" }}
      >
        {s.label}
      </p>
      <p className="text-[#888888] text-[11px] leading-relaxed">{s.sub}</p>
    </motion.div>
  );
}

function TimelineCard({
  yr,
  role,
  sub,
  i,
  accent,
  inView,
}: {
  yr: string;
  role: string;
  sub: string;
  i: number;
  accent: string;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const hoverBg = accent === "#E63035" ? "rgba(230,48,53,0.12)" : "rgba(0,139,77,0.12)";

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.8 + i * 0.12, ease }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="px-8 py-6 flex items-start gap-5 cursor-default transition-colors duration-300"
      style={{ backgroundColor: hovered ? hoverBg : "#FFFFFF" }}
    >
      {/* Vertical accent bar — green or red per card */}
      <motion.div
        className="w-0.5 self-stretch shrink-0"
        style={{ backgroundColor: accent, originY: 0 }}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.9 + i * 0.12 }}
      />
      <div>
        <p
          className="text-[10px] uppercase mb-1 transition-all duration-300"
          style={{
            color: accent,
            letterSpacing: hovered ? "0.32em" : "0.2em",
          }}
        >
          {yr}
        </p>
        <p
          className="text-sm mb-0.5 transition-colors duration-300"
          style={{ color: hovered ? accent : "#1A1A1A" }}
        >
          {role}
        </p>
        <p
          className="text-[#888888] text-[11px]"
          dangerouslySetInnerHTML={{ __html: sub }}
        />
      </div>
    </motion.div>
  );
}

export default function Record() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="record" ref={ref} className="bg-[#FFFFFF] py-28 md:py-40 px-6 md:px-12 lg:px-20">
      <div className="max-w-300 mx-auto">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 text-[#E63035] text-[10px] tracking-[0.4em] uppercase mb-3"
            >
              <span className="w-0.5 h-4 bg-[#008B4D] shrink-0 inline-block" />
              The District
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="font-light text-[#1A1A1A] leading-[1.1]"
              style={{ fontSize: "clamp(1.7rem, 3vw, 2.7rem)", letterSpacing: "-0.02em" }}
            >
              Ogun East deserves better representation.
            </motion.h2>
          </div>
        </div>

        {/* Stats grid — neutral gap so orange lines don't dominate */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: "rgba(26,26,26,0.07)" }}
        >
          {stats.map((s, i) => (
            <StatCard key={s.label} s={s} i={i} accent={statAccent[i]} inView={inView} />
          ))}
        </div>

        {/* Timeline — neutral gap */}
        <div
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-px"
          style={{ background: "rgba(26,26,26,0.07)" }}
        >
          {(
            [
              ["Community Roots", "Grassroots Leadership", "Decades of service across Ogun East"],
              ["PDP Candidate",   "Party Nomination",      "Peoples Democratic Party &middot; Ogun East"],
              ["2027 Election",   "National Assembly",     "Senatorial District seat campaign"],
            ] as [string, string, string][]
          ).map(([yr, role, sub], i) => (
            <TimelineCard
              key={yr}
              yr={yr}
              role={role}
              sub={sub}
              i={i}
              accent={timeAccent[i]}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
