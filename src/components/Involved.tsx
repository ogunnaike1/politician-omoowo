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
    <section id="involved" ref={ref} className="bg-[#EDF1F5] py-28 md:py-40 px-6 md:px-12 lg:px-20">
      <div className="max-w-300 mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[#8A94A6] text-[10px] tracking-[0.4em] uppercase mb-4"
        >
          Get Involved
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="font-light text-[#0B0E13] mb-16"
          style={{ fontSize: "clamp(1.7rem, 3.5vw, 3.2rem)", letterSpacing: "-0.02em" }}
        >
          Ogun East wins together.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#C8D4DE]">
          {cards.map((c, i) => {
            const anim = cardAnimations[i];
            return (
              <motion.div
                key={c.id}
                initial={anim.initial}
                animate={inView ? anim.animate : anim.initial}
                transition={anim.transition}
                className={`flex flex-col p-10 ${c.dark ? "bg-[#0B0E13]" : "bg-[#EDF1F5]"}`}
              >
                <p className={`text-[10px] tracking-[0.35em] uppercase mb-6 ${c.dark ? "text-[#3E5C76]" : "text-[#C8D4DE]"}`}>
                  {c.label}
                </p>
                <h3
                  className={`font-light leading-tight mb-5 ${c.dark ? "text-[#EDF1F5]" : "text-[#0B0E13]"}`}
                  style={{ fontSize: "clamp(1.3rem, 1.8vw, 1.7rem)" }}
                >
                  {c.title}
                </h3>
                <p className="text-[#8A94A6] text-sm leading-[1.8] mb-10 flex-1">
                  {c.body}
                </p>

                {c.id === "inform" ? (
                  <div className="flex">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 bg-transparent border px-4 py-2.5 text-[11px] outline-none transition-colors duration-200 min-w-0 placeholder:opacity-50"
                      style={{ color: "#0B0E13", borderColor: "#C8D4DE" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#3E5C76")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#C8D4DE")}
                    />
                    <button className="px-5 py-2.5 bg-[#3E5C76] text-[#EDF1F5] text-[11px] shrink-0 hover:bg-[#4A6E8A] transition-colors duration-200">
                      &rarr;
                    </button>
                  </div>
                ) : (
                  <a
                    href={`#${c.id}`}
                    className={`inline-flex items-center gap-3 text-[11px] tracking-[0.18em] uppercase border-b pb-1 w-fit transition-all duration-300 hover:gap-5 ${
                      c.dark
                        ? "text-[#EDF1F5] border-[#3E5C76]"
                        : "text-[#0B0E13] border-[#3E5C76]"
                    }`}
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

