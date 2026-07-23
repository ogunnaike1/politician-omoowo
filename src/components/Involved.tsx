"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const cards = [
  {
    id: "volunteer",
    label: "01",
    title: "Volunteer",
    body: "Join our campaign team on the ground. Door-to-door canvassing, community meetings, and voter registration drives across Ogun East.",
    cta: "Join the Team",
    bg: "#008B4D",
    dark: true,
  },
  {
    id: "donate",
    label: "02",
    title: "Donate",
    body: "Support a people-powered campaign. Every contribution funds grassroots outreach and ensures Omoowo's message reaches every community.",
    cta: "Support Us",
    bg: "#E63035",
    dark: true,
  },
  {
    id: "inform",
    label: "03",
    title: "Stay Informed",
    body: "Get campaign updates, policy announcements, and event schedules delivered directly to you. No spam, ever.",
    cta: "Subscribe",
    bg: "#FFFFFF",
    dark: false,
  },
];

const cardAnimations = [
  {
    initial: { opacity: 0, x: -60, rotate: -4 },
    animate: { opacity: 1, x: 0, rotate: 0 },
    transition: { duration: 0.85, delay: 0.2, ease },
  },
  {
    initial: { opacity: 0, y: 60, scale: 0.92 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.85, delay: 0.35, ease },
  },
  {
    initial: { opacity: 0, x: 60, rotate: 4 },
    animate: { opacity: 1, x: 0, rotate: 0 },
    transition: { duration: 0.85, delay: 0.5, ease },
  },
];

export default function Involved() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");

  return (
    <section
      id="involved"
      ref={ref}
      className="py-28 md:py-40 px-6 md:px-12 lg:px-20"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-300 mx-auto">

        {/* Header */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2.5 text-[#E63035] text-[10px] tracking-[0.4em] uppercase mb-4"
        >
          <span className="w-0.5 h-4 bg-[#008B4D] shrink-0 inline-block" />
          Get Involved
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="font-light text-[#1A1A1A] mb-16"
          style={{ fontSize: "clamp(1.7rem, 3.5vw, 3.2rem)", letterSpacing: "-0.02em" }}
        >
          Ogun East wins together.
        </motion.h2>

        {/* Cards: green | red | light — equal balance */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: "rgba(26,26,26,0.07)" }}
        >
          {cards.map((c, i) => {
            const anim = cardAnimations[i];
            const labelColor  = c.dark ? "rgba(246,246,246,0.55)" : "#E63035";
            const headingColor = c.dark ? "#FFFFFF" : "#1A1A1A";
            const bodyColor   = c.dark ? "rgba(246,246,246,0.65)" : "#888888";
            const ctaColor    = c.dark ? "#FFFFFF" : "#008B4D";
            const ctaBorder   = c.dark ? "rgba(246,246,246,0.35)" : "rgba(0,139,77,0.35)";

            return (
              <motion.div
                key={c.id}
                initial={anim.initial}
                animate={inView ? anim.animate : anim.initial}
                transition={anim.transition}
                whileHover={{
                  y: -6,
                  boxShadow: "0 24px 48px rgba(0,0,0,0.18)",
                  transition: { type: "spring", stiffness: 260, damping: 22 },
                }}
                className="flex flex-col p-10 cursor-default"
                style={{ background: c.bg }}
              >
                <p
                  className="text-[10px] tracking-[0.35em] uppercase mb-6"
                  style={{ color: labelColor }}
                >
                  {c.label}
                </p>
                <h3
                  className="font-light leading-tight mb-5"
                  style={{ fontSize: "clamp(1.3rem, 1.8vw, 1.7rem)", color: headingColor }}
                >
                  {c.title}
                </h3>
                <p
                  className="text-sm leading-[1.8] mb-10 flex-1"
                  style={{ color: bodyColor }}
                >
                  {c.body}
                </p>

                {c.id === "inform" ? (
                  <div className="flex">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 bg-transparent border px-4 py-2.5 text-[11px] outline-none transition-colors duration-200 min-w-0 placeholder:opacity-40"
                      style={{ color: "#1A1A1A", borderColor: "rgba(26,26,26,0.2)" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#008B4D")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(26,26,26,0.2)")}
                    />
                    <button className="px-5 py-2.5 bg-[#008B4D] text-[#FFFFFF] text-[11px] shrink-0 font-medium hover:bg-[#E63035] transition-colors duration-200">
                      &rarr;
                    </button>
                  </div>
                ) : (
                  <a
                    href={`#${c.id}`}
                    className="inline-flex items-center gap-3 text-[11px] tracking-[0.18em] uppercase pb-1 w-fit transition-all duration-300 hover:gap-5"
                    style={{ color: ctaColor, borderBottom: `1px solid ${ctaBorder}` }}
                  >
                    {c.cta} <span>&rarr;</span>
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
