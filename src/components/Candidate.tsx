"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
          <motion.div
            className="w-full aspect-4/5"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={inView ? { clipPath: "inset(0% 0 0 0)" } : {}}
            transition={{ duration: 1.3, ease }}
            style={{ background: "linear-gradient(160deg, #4A6E8A 0%, #3A5A72 45%, #2A4A60 100%)" }}
          />
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={inView ? { clipPath: "inset(0% 0 0 0)" } : {}}
            transition={{ duration: 1.3, ease }}
            style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(11,14,19,0.5) 100%)" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <div>
              <p className="text-[#EDF1F5]/90 text-[10px] tracking-[0.3em] uppercase mb-0.5">Alhaji Omoowo</p>
              <p className="text-[#EDF1F5]/55 text-[10px] tracking-[0.2em] uppercase">PDP &middot; Ogun East</p>
            </div>
            <div className="w-10 h-px bg-[#EDF1F5]/40" />
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
