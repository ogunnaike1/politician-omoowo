"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const stats = [
  { value: 9, suffix: "", label: "Local Governments", sub: "across Ogun East Senatorial District" },
  { value: 3, suffix: "", label: "LGAs in District", sub: "Ijebu-East, Ogun Waterside, Ikenne" },
  { value: 2027, suffix: "", label: "Election Year", sub: "National Assembly general elections" },
  { value: 1, suffix: "", label: "Clear Mission", sub: "Serve the people of Ogun East" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });

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

export default function Record() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section id="record" ref={ref} className="bg-[#EDF1F5] py-28 md:py-40 px-6 md:px-12 lg:px-20">
      <div className="max-w-300 mx-auto">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[#294B68] text-[10px] tracking-[0.4em] uppercase mb-3"
            >
              The District
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="font-light text-[#162B3D] leading-[1.1]"
              style={{ fontSize: "clamp(1.7rem, 3vw, 2.7rem)", letterSpacing: "-0.02em" }}
            >
              Ogun East deserves better representation.
            </motion.h2>
          </div>
        </div>

        {/* Stats â€” horizontal clipPath wipe */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#C8D4DE]">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 0.75, delay: 0.2 + i * 0.15, ease }}
              className="bg-[#EDF1F5] px-8 py-10"
            >
              <p
                className="font-light text-[#162B3D] tabular-nums leading-none mb-3"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em" }}
              >
                <AnimatedNumber value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-[#162B3D] text-sm mb-1">{s.label}</p>
              <p className="text-[#8A94A6] text-[11px] leading-relaxed">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#C8D4DE]">
          {[
            ["Community Roots", "Grassroots Leadership", "Decades of service across Ogun East"],
            ["PDP Candidate", "Party Nomination", "Peoples Democratic Party &middot; Ogun East"],
            ["2027 Election", "National Assembly", "Senatorial District seat campaign"],
          ].map(([yr, role, sub], i) => (
            <motion.div
              key={yr}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.8 + i * 0.12, ease }}
              className="bg-[#EDF1F5] px-8 py-6 flex items-start gap-5"
            >
              <motion.div
                className="w-px self-stretch bg-[#294B68] shrink-0"
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.9 + i * 0.12 }}
                style={{ originY: 0 }}
              />
              <div>
                <p className="text-[#294B68] text-[10px] tracking-[0.2em] uppercase mb-1">{yr}</p>
                <p className="text-[#162B3D] text-sm mb-0.5">{role}</p>
                <p className="text-[#8A94A6] text-[11px]" dangerouslySetInnerHTML={{ __html: sub }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
