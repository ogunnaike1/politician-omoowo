"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#candidate" },
  { label: "Policies", href: "#priorities" },
  { label: "Vision", href: "#vision" },
  { label: "Events", href: "#events" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <footer ref={ref} className="bg-[#008B4D] py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-300 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 pb-10 border-b border-[rgba(246,246,246,0.2)]"
        >
          <div>
            <p className="text-[#FFFFFF] text-sm font-medium tracking-wide mb-1.5">
              Alhaji Abdulhameed Oluwafemi Omotayo (Omoowo)
            </p>
            <p className="text-[#FFFFFF]/70 text-[11px] mb-1">
              PDP Candidate &mdash; Ogun East Senatorial District
            </p>
            <p className="text-[#FFFFFF]/50 text-[11px]">
              2027 National Assembly Election Campaign
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-7 gap-y-3">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[#FFFFFF]/55 text-[10px] tracking-[0.2em] uppercase hover:text-[#FFFFFF] transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col md:flex-row justify-between gap-4 pt-8"
        >
          <p className="text-[#FFFFFF]/50 text-[10px] max-w-lg leading-relaxed">
            &copy; 2027 Omoowo Campaign. All rights reserved. Authorised by the Omoowo 2027 Campaign
            Committee. Registered with the Independent National Electoral Commission (INEC).
            Peoples Democratic Party (PDP) &mdash; Ogun East Senatorial District.
          </p>
          <div className="flex gap-5">
            {["Privacy", "Contact", "Media"].map((t) => (
              <a
                key={t}
                href="#"
                className="text-[#FFFFFF]/50 text-[10px] tracking-[0.15em] uppercase hover:text-[#FFFFFF] transition-colors duration-200"
              >
                {t}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
