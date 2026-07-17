"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "Profile", href: "/profile" },
  { label: "Policies", href: "#priorities" },
  { label: "Vision", href: "#vision" },
  { label: "Events", href: "#events" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const filled = useTransform(scrollY, [0, 70], [0, 1]);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (v) => {
    setIsScrolled(v > 70);
  });

  // Home hero is light (#EDF1F5) → links always dark
  // Profile hero is dark photo → links start white, turn dark on scroll
  const isHome = pathname === "/";
  const linkColor = isHome ? "#0B0E13" : isScrolled ? "#0B0E13" : "#EDF1F5";
  const brandColor = isHome ? "#0B0E13" : isScrolled ? "#0B0E13" : "#EDF1F5";

  return (
    <motion.header className="fixed top-0 inset-x-0 z-50 h-15">
      {/* Filled background */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: filled,
          background: "rgba(237,241,245,0.97)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      />
      {/* Bottom border fades in */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-px bg-[#C8D4DE]"
        style={{ opacity: filled }}
      />

      <nav className="relative h-full max-w-300 mx-auto px-6 md:px-12 flex items-center justify-between">
        <a
          href="/"
          className="text-[13px] font-semibold tracking-[0.12em] uppercase"
          style={{ color: brandColor, transition: "color 0.35s ease" }}
        >
          Omoowo &middot; 2027
        </a>

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
              className="text-[11.5px] font-medium tracking-[0.14em] uppercase hover:opacity-60"
              style={{ color: linkColor, transition: "color 0.35s ease, opacity 0.2s ease" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#involved"
            className="ml-2 px-5 py-2 text-[11px] font-medium tracking-[0.16em] uppercase bg-[#3E5C76] text-[#EDF1F5] hover:bg-[#0B0E13] transition-colors duration-200"
          >
            Support Us
          </a>
        </motion.div>
      </nav>
    </motion.header>
  );
}
