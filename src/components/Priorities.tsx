"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const items = [
  {
    n: "01",
    title: "Infrastructure & Roads",
    body: "Rehabilitating federal roads, bridges, and rural access routes across Ogun East — connecting communities to markets, schools, and hospitals.",
  },
  {
    n: "02",
    title: "Education & Youth Empowerment",
    body: "Securing federal intervention funding for schools, scholarships for Ogun East students, and vocational training centres that equip young people with real skills.",
  },
  {
    n: "03",
    title: "Healthcare Access",
    body: "Sponsoring legislation to upgrade primary healthcare centres in every LGA, improve rural maternal care, and bring affordable medicine closer to home.",
  },
  {
    n: "04",
    title: "Security & Community Safety",
    body: "Advocating for increased federal security presence, community policing support, and resources to protect farmers, traders, and families across Ogun East.",
  },
  {
    n: "05",
    title: "Agriculture & Economic Growth",
    body: "Championing agribusiness investment, rural electrification, and small business support to unlock the economic potential of Ogun East's land and people.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, rotateX: 55, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    rotateX: 0,
    y: 0,
    backgroundColor: "#EDF1F5",
    boxShadow: "0 0px 0px rgba(11,14,19,0)",
    transition: { type: "spring" as const, stiffness: 90, damping: 18, delay: 0.15 + i * 0.09 },
  }),
  hovered: {
    y: -10,
    backgroundColor: "#E2EAF2",
    boxShadow: "0 28px 48px rgba(11,14,19,0.13)",
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

const numVariants = {
  show: { color: "#C8D4DE" },
  hovered: { color: "#3E5C76", transition: { duration: 0.2 } },
};

const titleVariants = {
  show: { x: 0 },
  hovered: { x: 4, transition: { type: "spring" as const, stiffness: 300, damping: 25 } },
};

const barVariants = {
  show: { width: 24, backgroundColor: "#3E5C76" },
  hovered: {
    width: 56,
    backgroundColor: "#3E5C76",
    transition: { type: "spring" as const, stiffness: 280, damping: 22 },
  },
};

const arrowVariants = {
  show: { opacity: 0, x: -6 },
  hovered: { opacity: 1, x: 0, transition: { duration: 0.2, delay: 0.05 } },
};

export default function Priorities() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

  return (
    <section id="priorities" ref={ref} className="bg-[#EDF1F5] py-28 md:py-40 px-6 md:px-12 lg:px-20">
      <div className="max-w-300 mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[#8A94A6] text-[10px] tracking-[0.4em] uppercase mb-3"
            >
              Key Priorities
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="font-light text-[#0B0E13] leading-[1.1]"
              style={{ fontSize: "clamp(1.7rem, 3vw, 2.7rem)", letterSpacing: "-0.02em" }}
            >
              What Omoowo will fight for.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#8A94A6] text-[11px] md:text-right max-w-xs leading-relaxed"
          >
            Five clear commitments to the people of Ogun East &mdash; each with a plan, not just a promise.
          </motion.p>
        </div>

        {/* 3D perspective grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#C8D4DE]" style={{ perspective: "1200px" }}>
          {items.map((item, i) => (
            <motion.div
              key={item.n}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              whileHover="hovered"
              style={{ transformOrigin: "bottom center", cursor: "default" }}
              className="p-8 md:p-10 overflow-hidden"
            >
              {/* Number */}
              <motion.p
                variants={numVariants}
                className="text-[11px] tracking-[0.25em] mb-6"
              >
                {item.n}
              </motion.p>

              {/* Title row */}
              <div className="flex items-center justify-between mb-4">
                <motion.h3
                  variants={titleVariants}
                  className="font-light text-[#0B0E13] leading-[1.2]"
                  style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.3rem)" }}
                >
                  {item.title}
                </motion.h3>
                <motion.span
                  variants={arrowVariants}
                  className="text-[#3E5C76] text-lg shrink-0 ml-3"
                >
                  &rarr;
                </motion.span>
              </div>

              {/* Body */}
              <p className="text-[#8A94A6] text-sm leading-[1.8]">{item.body}</p>

              {/* Accent bar */}
              <motion.div
                variants={barVariants}
                className="mt-8 h-px"
              />
            </motion.div>
          ))}

          {/* Dark count cell */}
          <motion.div
            custom={5}
            variants={{
              hidden: { opacity: 0, rotateX: 55, y: 30 },
              show: (i: number) => ({
                opacity: 1, rotateX: 0, y: 0,
                transition: { type: "spring" as const, stiffness: 90, damping: 18, delay: 0.15 + i * 0.09 },
              }),
              hovered: {
                y: -10,
                boxShadow: "0 28px 48px rgba(11,14,19,0.3)",
                transition: { type: "spring" as const, stiffness: 300, damping: 24 },
              },
            }}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            whileHover="hovered"
            style={{ transformOrigin: "bottom center" }}
            className="bg-[#0B0E13] p-8 md:p-10 flex flex-col justify-between"
          >
            <p className="text-[#3E5C76] text-[10px] tracking-[0.3em] uppercase">Five Priorities</p>
            <div>
              <p
                className="font-light text-[#EDF1F5] leading-none mb-2"
                style={{ fontSize: "clamp(3rem, 5vw, 5rem)" }}
              >
                05
              </p>
              <p className="text-[#8A94A6] text-[11px] tracking-[0.15em] uppercase">Clear commitments</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
