"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const links = [
  { label: "Home", href: "/" },
  { label: "Profile", href: "/profile" },
  { label: "Policies", href: "/policies" },
  { label: "Vision", href: "/vision" },
  { label: "Events", href: "#events" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const { scrollY } = useScroll();

  // Nav bg: #3E5C76 → #E8ECF1
  const bgColor = useTransform(scrollY, [0, 80], ["#3E5C76", "#E8ECF1"]);
  // Links & brand: light → dark
  const linkColor = useTransform(scrollY, [0, 80], ["#EDF1F5", "#0B0E13"]);
  // Button: bg inverts — #E8ECF1 → #3E5C76, text #3E5C76 → #EDF1F5
  const btnBg = useTransform(scrollY, [0, 80], ["#E8ECF1", "#3E5C76"]);
  const btnColor = useTransform(scrollY, [0, 80], ["#46494E", "#EDF1F5"]);
  const borderOpacity = useTransform(scrollY, [40, 80], [0, 1]);

  return (
    <motion.header className="fixed top-0 inset-x-0 z-50 h-15" style={{ background: bgColor }}>
      {/* Bottom border fades in when scrolled */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-px bg-[#C8D4DE]"
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

        <motion.div
          className="hidden lg:flex items-center gap-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {links.map((l) => (
            <motion.a
              key={l.label}
              href={l.href}
              style={{ color: linkColor }}
              className="text-[11.5px] font-medium tracking-[0.14em] uppercase hover:opacity-60 transition-opacity duration-200"
            >
              {l.label}
            </motion.a>
          ))}
          <motion.a
            href="#involved"
            style={{ background: btnBg, color: btnColor }}
            className="ml-2 px-5 py-2 text-[11px] font-medium tracking-[0.16em] uppercase hover:opacity-80 transition-opacity duration-200"
          >
            Support Us
          </motion.a>
        </motion.div>
      </nav>
    </motion.header>
  );
}
