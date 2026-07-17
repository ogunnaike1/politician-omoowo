"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";

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
  const filled = useTransform(scrollY, [0, 60], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 60], [0, 1]);
  const pathname = usePathname();

  // Home hero is now light (#EDF1F5) → links start dark, stay dark
  // Profile hero is dark (photo) → links start light, go dark on scroll
  const isHome = pathname === "/";

  const linkColorHome = useTransform(filled, [0, 1], ["#0B0E13", "#3A4452"]);
  const brandColorHome = useTransform(filled, [0, 1], ["#0B0E13", "#0B0E13"]);
  const linkColorProfile = useTransform(filled, [0, 1], ["#EDF1F5", "#3A4452"]);
  const brandColorProfile = useTransform(filled, [0, 1], ["#EDF1F5", "#0B0E13"]);

  const linkColor = isHome ? linkColorHome : linkColorProfile;
  const brandColor = isHome ? brandColorHome : brandColorProfile;

  return (
    <motion.header className="fixed top-0 inset-x-0 z-50 h-15">
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: filled,
          background: "rgba(237,241,245,0.97)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-px bg-[#C8D4DE]"
        style={{ opacity: borderOpacity }}
      />

      <nav className="relative h-full max-w-300 mx-auto px-6 md:px-12 flex items-center justify-between">
        <motion.a
          href="/"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ color: brandColor }}
          className="text-[13px] font-semibold tracking-[0.12em] uppercase"
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
              className="text-[11.5px] font-medium tracking-[0.14em] uppercase transition-opacity duration-200 hover:opacity-60"
            >
              {l.label}
            </motion.a>
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
