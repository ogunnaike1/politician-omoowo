"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "Profile", href: "/profile" },
  { label: "Policies", href: "/policies" },
  { label: "Vision", href: "/vision" },
  { label: "Events", href: "/events" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  const bgColor = useTransform(scrollY, [0, 80], ["#094e7d", "#FFFFFF"]);
  const linkColor = useTransform(scrollY, [0, 80], ["#FFFFFF", "#094e7d"]);
  const btnBg = useTransform(scrollY, [0, 80], ["#E63035", "#094e7d"]);
  const btnColor = useTransform(scrollY, [0, 80], ["#FFFFFF", "#FFFFFF"]);
  const borderOpacity = useTransform(scrollY, [40, 80], [0, 1]);

  return (
    <>
      <motion.header className="fixed top-0 inset-x-0 z-50 h-15" style={{ background: bgColor }}>
        <motion.div
          className="absolute inset-x-0 bottom-0 h-px bg-[#E63035]"
          style={{ opacity: borderOpacity }}
        />

        <nav className="relative h-full max-w-300 mx-auto px-6 md:px-12 flex items-center justify-between">
          <motion.a
            href="/"
            className="text-[13px] font-semibold tracking-[0.12em] uppercase"
            style={{ color: linkColor }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Omoowo &middot; 2027
          </motion.a>

          {/* Desktop links */}
          <motion.div
            className="hidden lg:flex items-center gap-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {links.map((l) => {
              const isActive = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <motion.a
                  key={l.label}
                  href={l.href}
                  style={{ color: linkColor }}
                  className="relative text-[11.5px] font-medium tracking-[0.14em] uppercase focus-visible:outline-none"
                  initial="rest"
                  whileHover="hover"
                  animate={isActive ? "active" : "rest"}
                >
                  {l.label}
                  <motion.span
                    className="absolute -bottom-0.5 left-0 w-full h-px"
                    style={{ background: "currentColor", transformOrigin: "left" }}
                    variants={{
                      rest:   { scaleX: 0, opacity: 0.45 },
                      hover:  { scaleX: 1, opacity: 0.45 },
                      active: { scaleX: 1, opacity: 0.8 },
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </motion.a>
              );
            })}
            <motion.a
              href="#involved"
              style={{ background: btnBg, color: btnColor }}
              className="ml-2 px-5 py-2 text-[11px] font-medium tracking-[0.16em] uppercase hover:opacity-80 transition-opacity duration-200"
            >
              Support Us
            </motion.a>
          </motion.div>

          {/* Hamburger — mobile only */}
          <motion.button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden flex flex-col gap-[5px] p-2 z-[60]"
            style={{ color: linkColor }}
            aria-label="Toggle menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.span
              className="block w-6 h-px bg-current"
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.28 }}
            />
            <motion.span
              className="block w-6 h-px bg-current"
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.28 }}
            />
            <motion.span
              className="block w-6 h-px bg-current"
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.28 }}
            />
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 top-15 z-40 bg-[#094e7d] flex flex-col px-8 pt-10 pb-10 lg:hidden overflow-y-auto"
          >
            {/* Nav links */}
            <div className="flex flex-col">
              {links.map((l, i) => {
                const isActive = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
                return (
                  <motion.a
                    key={l.label}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.28, delay: 0.04 + i * 0.055 }}
                    className="flex items-center justify-between py-4 border-b text-[13px] tracking-[0.22em] uppercase font-light"
                    style={{
                      color: isActive ? "#FFFFFF" : "rgba(246,246,246,0.6)",
                      borderColor: "rgba(246,246,246,0.1)",
                    }}
                  >
                    {l.label}
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#008B4D]" />
                    )}
                  </motion.a>
                );
              })}
            </div>

            {/* CTA + tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42 }}
              className="mt-auto pt-10"
            >
              <a
                href="#involved"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center py-4 bg-[#E63035] text-[#FFFFFF] text-[11px] tracking-[0.22em] uppercase font-medium"
              >
                Support Us
              </a>
              <p
                className="text-center mt-6 text-[10px] tracking-[0.28em] uppercase"
                style={{ color: "rgba(246,246,246,0.3)" }}
              >
                PDP &middot; Ogun East &middot; 2027
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
