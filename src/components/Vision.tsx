"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const quoteText =
  "The people of Ogun East deserve more than promises. They deserve a representative who shows up, follows through, and fights for them every single day.";

export default function Vision() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
  const words = quoteText.split(" ");

  return (
    <section id="vision" ref={ref} className="bg-[#EDF1F5] py-28 md:py-44 px-6 md:px-12 lg:px-20">
      <div className="max-w-300 mx-auto">
        <div className="max-w-190">

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[#294B68] text-[10px] tracking-[0.4em] uppercase mb-12"
          >
            His Vision
          </motion.p>

          {/* Quote - blur+fade word stagger */}
          <blockquote
            className="font-light text-[#162B3D] leading-tight mb-12"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)", letterSpacing: "-0.01em" }}
          >
            &ldquo;
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, filter: "blur(6px)", y: 18 }}
                animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.04, ease: "easeOut" }}
                style={{ display: "inline" }}
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
            className="w-14 h-px bg-[#294B68] origin-left mb-10"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7, ease }}
            className="text-[#8A94A6] leading-[1.85]"
            style={{ fontSize: "clamp(0.9rem, 1.05vw, 1rem)" }}
          >
            Omoowo&apos;s approach is rooted in community &mdash; listening to farmers in Ijebu-East,
            traders in Ogun Waterside, youth in Ikenne, and families across every local government in
            Ogun East. Legislation that works must start at the grassroots. Development that lasts must
            be owned by the people it serves.
          </motion.p>
        </div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#C8D4DE] mt-20">
          {[
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
          ].map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.9 + i * 0.15 }}
              whileHover={{ y: -5, transition: { type: "spring", stiffness: 280, damping: 24 } }}
              className="bg-[#EDF1F5] px-8 py-10 group hover:bg-[#DFE8EF] transition-colors duration-300 cursor-default"
            >
              <p className="text-[#294B68] text-[10px] tracking-[0.3em] uppercase mb-5 group-hover:tracking-[0.45em] transition-all duration-300">0{i + 1}</p>
              <h3 className="text-[#162B3D] font-light text-lg mb-4 leading-snug group-hover:text-[#294B68] transition-colors duration-300">{p.title}</h3>
              <p className="text-[#8A94A6] text-sm leading-[1.8]">{p.body}</p>
              <motion.div
                className="mt-8 h-px bg-[#294B68] origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.35 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
