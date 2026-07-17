"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

function MaskedLine({ children, delay, className, style }: {
  children: React.ReactNode;
  delay: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.85, delay, ease }}
        className={className}
        style={style}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Candidate() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section id="candidate" ref={ref} className="py-28 md:py-40 px-6 md:px-12 lg:px-20" style={{ background: "#3E5C76" }}>
      <div className="max-w-300 mx-auto grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-14 md:gap-24 items-center">

        {/* Portrait — clipPath curtain reveal bottom-up */}
        <div className="relative">
          {/* Offset decorative border behind the frame */}
          <div
            className="absolute border border-[rgba(237,241,245,0.2)]"
            style={{ inset: "-12px 12px 12px -12px" }}
          />

          <motion.div
            className="w-full aspect-4/5 relative overflow-hidden"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={inView ? { clipPath: "inset(0% 0 0 0)" } : {}}
            transition={{ duration: 1.3, ease }}
          >
            <Image
              src="https://res.cloudinary.com/dhmqhless/image/upload/v1784255332/omoowo4_wyrzo8.png"
              alt="Alhaji Abdulhameed Oluwafemi Omotayo (Omoowo)"
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />

            {/* Bottom gradient fade */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(11,14,19,0.7) 100%)" }}
            />

            {/* Glass name badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 1.2, ease }}
              className="absolute bottom-0 left-0 right-0 mx-4 mb-4 overflow-hidden"
              style={{
                backdropFilter: "blur(16px) saturate(1.5)",
                WebkitBackdropFilter: "blur(16px) saturate(1.5)",
                background: "rgba(11,14,19,0.35)",
                border: "1px solid rgba(237,241,245,0.12)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(237,241,245,0.08)",
              }}
            >
              {/* Glass top shine */}
              <div
                className="absolute inset-x-0 top-0 h-px pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(237,241,245,0.2), transparent)" }}
              />
              <div className="px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-[#EDF1F5] text-[11px] font-medium tracking-[0.22em] uppercase mb-0.5">
                    Alhaji Omoowo
                  </p>
                  <p className="text-[10px] tracking-[0.15em] uppercase" style={{ color: "rgba(237,241,245,0.55)" }}>
                    PDP &middot; Ogun East &middot; 2027
                  </p>
                </div>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(62,92,118,0.3)", border: "1px solid rgba(62,92,118,0.55)" }}
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <circle cx="4" cy="4" r="2.5" fill="#3E5C76" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Top-right glass accent chip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.35, ease }}
              className="absolute top-4 right-4 px-3 py-1.5"
              style={{
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                background: "rgba(62,92,118,0.28)",
                border: "1px solid rgba(237,241,245,0.12)",
              }}
            >
              <p className="text-[#EDF1F5]/70 text-[9px] tracking-[0.3em] uppercase">2027</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Text */}
        <div>
          {inView && (
            <>
              <div className="mb-5">
                <MaskedLine delay={0.3} className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "rgba(237,241,245,0.55)" }}>
                  The Candidate
                </MaskedLine>
              </div>

              <div className="mb-7">
                <MaskedLine
                  delay={0.45}
                  className="font-light text-[#EDF1F5] leading-[1.1]"
                  style={{ fontSize: "clamp(1.7rem, 3vw, 2.7rem)", letterSpacing: "-0.02em" }}
                >
                  A lifelong servant of Ogun East and its people.
                </MaskedLine>
              </div>

              <div className="mb-5">
                <MaskedLine
                  delay={0.6}
                  className="leading-[1.8]"
                  style={{ fontSize: "clamp(0.9rem, 1.05vw, 1rem)", color: "rgba(237,241,245,0.72)" }}
                >
                  Alhaji Abdulhameed Oluwafemi Omotayo, widely known as Omoowo, is a prominent community
                  leader, businessman, and PDP stalwart with deep roots across the Ogun East Senatorial
                  District. He has dedicated years to grassroots development, youth empowerment, and
                  championing the welfare of ordinary people in Ogun State.
                </MaskedLine>
              </div>

              <div className="mb-8">
                <MaskedLine
                  delay={0.72}
                  className="leading-[1.8]"
                  style={{ fontSize: "clamp(0.9rem, 1.05vw, 1rem)", color: "rgba(237,241,245,0.72)" }}
                >
                  As the PDP candidate for the 2027 Ogun East Senatorial District election, Omoowo brings
                  a clear, people-first agenda to the National Assembly &mdash; focused on infrastructure,
                  education, security, and economic opportunity for every community in Ogun East.
                </MaskedLine>
              </div>

              <div style={{ overflow: "hidden" }} className="mb-8">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.75, delay: 0.85, ease }}
                >
                  <a
                    href="/profile"
                    className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase pb-1 hover:gap-5 transition-all duration-300"
                    style={{ color: "#EDF1F5", borderBottom: "1px solid rgba(237,241,245,0.35)" }}
                  >
                    Read Full Profile <span style={{ color: "rgba(237,241,245,0.6)" }}>&rarr;</span>
                  </a>
                </motion.div>
              </div>

              <div style={{ overflow: "hidden" }}>
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.85, delay: 0.9, ease }}
                  className="flex gap-8 pt-8"
                  style={{ borderTop: "1px solid rgba(237,241,245,0.15)" }}
                >
                  {[
                    ["PDP", "Party Affiliation"],
                    ["2027", "Election Year"],
                    ["Ogun East", "Senatorial District"],
                  ].map(([num, label]) => (
                    <div key={label}>
                      <p className="font-light text-[#EDF1F5] leading-none mb-1.5" style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)" }}>
                        {num}
                      </p>
                      <p className="text-[10px] tracking-[0.15em] uppercase" style={{ color: "rgba(237,241,245,0.5)" }}>{label}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
