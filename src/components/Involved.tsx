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
    dark: true,
  },
  {
    id: "donate",
    label: "02",
    title: "Donate",
    body: "Support a people-powered campaign. Every contribution funds grassroots outreach and ensures Omoowo's message reaches every community.",
    cta: "Support Us",
    dark: false,
  },
  {
    id: "inform",
    label: "03",
    title: "Stay Informed",
    body: "Get campaign updates, policy announcements, and event schedules delivered directly to you. No spam, ever.",
    cta: "Subscribe",
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
  const inView = useInView(ref, { once: false, margin: "-80px" });
  const [email, setEmail] = useState("");

  return (
    <section id="involved" ref={ref} className="py-28 md:py-40 px-6 md:px-12 lg:px-20" style={{ background: "#3E5C76" }}>
      <div className="max-w-300 mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[10px] tracking-[0.4em] uppercase mb-4"
          style={{ color: "rgba(237,241,245,0.55)" }}
        >
          Get Involved
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="font-light text-[#EDF1F5] mb-16"
          style={{ fontSize: "clamp(1.7rem, 3.5vw, 3.2rem)", letterSpacing: "-0.02em" }}
        >
          Ogun East wins together.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "rgba(237,241,245,0.12)" }}>
          {cards.map((c, i) => {
            const anim = cardAnimations[i];
            const cardBg = c.dark ? "#0B0E13" : "rgba(62,92,118,0.45)";
            return (
              <motion.div
                key={c.id}
                initial={anim.initial}
                animate={inView ? anim.animate : anim.initial}
                transition={anim.transition}
                className="flex flex-col p-10"
                style={{ background: cardBg }}
              >
                <p
                  className="text-[10px] tracking-[0.35em] uppercase mb-6"
                  style={{ color: c.dark ? "#3E5C76" : "rgba(237,241,245,0.4)" }}
                >
                  {c.label}
                </p>
                <h3
                  className="font-light text-[#EDF1F5] leading-tight mb-5"
                  style={{ fontSize: "clamp(1.3rem, 1.8vw, 1.7rem)" }}
                >
                  {c.title}
                </h3>
                <p className="text-sm leading-[1.8] mb-10 flex-1" style={{ color: "rgba(237,241,245,0.65)" }}>
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
                      style={{ color: "#EDF1F5", borderColor: "rgba(237,241,245,0.25)" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(237,241,245,0.7)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(237,241,245,0.25)")}
                    />
                    <button className="px-5 py-2.5 bg-[#EDF1F5] text-[#3E5C76] text-[11px] shrink-0 font-medium hover:bg-white transition-colors duration-200">
                      &rarr;
                    </button>
                  </div>
                ) : (
                  <a
                    href={`#${c.id}`}
                    className="inline-flex items-center gap-3 text-[11px] tracking-[0.18em] uppercase pb-1 w-fit transition-all duration-300 hover:gap-5 text-[#EDF1F5]"
                    style={{ borderBottom: "1px solid rgba(237,241,245,0.35)" }}
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
