"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const quoteText =
  "The people of Ogun East deserve more than promises. They deserve a representative who shows up, follows through, and fights for them every single day.";

// Indices of words to highlight in green
const greenWords = new Set([5, 10, 14, 15, 16, 17, 19]);

// Pillar 0 = green, 1 = red, 2 = green — offsets the red grid gap
const pillarAccent = ["#008B4D", "#E63035", "#008B4D"];

const pillars = [
  {
    title: "People First",
    body: "Every policy decision begins with one question: how does this improve daily life for the people of Ogun East?",
  },
  {
    title: "Inclusive Growth",
    body: "Development must reach every local government — from Ijebu-East to Ogun Waterside. No community left behind.",
  },
  {
    title: "Accountable Leadership",
    body: "Regular town halls, published voting records, and open constituency offices. Power must answer to the people who gave it.",
  },
];

function PillarCard({
  p,
  i,
  accent,
  inView,
}: {
  p: { title: string; body: string };
  i: number;
  accent: string;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const hoverBg =
    accent === "#E63035" ? "rgba(230,48,53,0.12)" : "rgba(0,139,77,0.12)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.9 + i * 0.15 }}
      whileHover={{ y: -5, transition: { type: "spring", stiffness: 280, damping: 24 } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="px-8 py-10 cursor-default transition-colors duration-300"
      style={{ backgroundColor: hovered ? hoverBg : "#F6F3F3" }}
    >
      <p
        className="text-[10px] uppercase mb-5 transition-all duration-300"
        style={{
          color: accent,
          letterSpacing: hovered ? "0.45em" : "0.3em",
        }}
      >
        0{i + 1}
      </p>
      <h3
        className="font-light text-lg mb-4 leading-snug transition-colors duration-300"
        style={{ color: hovered ? accent : "#1A1A1A" }}
      >
        {p.title}
      </h3>
      <p className="text-[#888888] text-sm leading-[1.8]">{p.body}</p>
      <motion.div
        className="mt-8 h-px origin-left"
        style={{ backgroundColor: accent }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />
    </motion.div>
  );
}

export default function Vision() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
  const words = quoteText.split(" ");

  return (
    <section id="vision" ref={ref} className="bg-[#F6F3F3] py-28 md:py-44 px-6 md:px-12 lg:px-20">
      <div className="max-w-300 mx-auto">
        <div className="max-w-190">

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5 text-[#E63035] text-[10px] tracking-[0.4em] uppercase mb-12"
          >
            <span className="w-0.5 h-4 bg-[#008B4D] shrink-0 inline-block" />
            His Vision
          </motion.p>

          {/* Quote - blur+fade word stagger */}
          <blockquote
            className="font-light text-[#1A1A1A] leading-tight mb-12"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)", letterSpacing: "-0.01em" }}
          >
            &ldquo;
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, filter: "blur(6px)", y: 18 }}
                animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.04, ease: "easeOut" }}
                style={{ display: "inline", color: greenWords.has(i) ? "#008B4D" : undefined }}
              >
                {word}{i < words.length - 1 ? " " : ""}
              </motion.span>
            ))}
            &rdquo;
          </blockquote>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="w-14 h-px bg-[#008B4D] origin-left mb-10"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7, ease }}
            className="text-[#888888] leading-[1.85]"
            style={{ fontSize: "clamp(0.9rem, 1.05vw, 1rem)" }}
          >
            Omoowo&apos;s approach is rooted in community &mdash; listening to farmers in Ijebu-East,
            traders in Ogun Waterside, youth in Ikenne, and families across every local government in
            Ogun East. Legislation that works must start at the grassroots. Development that lasts must
            be owned by the people it serves.
          </motion.p>
        </div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px mt-20" style={{ background: "rgba(26,26,26,0.07)" }}>
          {pillars.map((p, i) => (
            <PillarCard
              key={p.title}
              p={p}
              i={i}
              accent={pillarAccent[i]}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
