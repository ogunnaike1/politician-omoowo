"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const links = [
  { label: "Home", href: "#" },
  { label: "About", href: "#candidate" },
  { label: "Policies", href: "#priorities" },
  { label: "Vision", href: "#vision" },
  { label: "Events", href: "#events" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const filled = useTransform(scrollY, [0, 60], [0, 1]);

  return (
    <motion.header className="fixed top-0 inset-x-0 z-50 h-15">
      <motion.div
        className="absolute inset-0 border-b border-[#C8D4DE]"
        style={{ opacity: filled, background: "rgba(237,241,245,0.96)", backdropFilter: "blur(10px)" }}
      />
      <nav className="relative h-full max-w-300 mx-auto px-6 md:px-12 flex items-center justify-between">
        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[13px] font-medium tracking-[0.12em] uppercase text-[#0B0E13]"
        >
          Omoowo &middot; 2027
        </motion.a>

        <motion.div
          className="hidden lg:flex items-center gap-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[11px] tracking-[0.18em] uppercase text-[#8A94A6] hover:text-[#0B0E13] transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#involved"
            className="ml-2 px-5 py-2 text-[11px] tracking-[0.18em] uppercase bg-[#0B0E13] text-[#EDF1F5] hover:bg-[#151A21] transition-colors duration-200"
          >
            Support Us
          </a>
        </motion.div>
      </nav>
    </motion.header>
  );
}
