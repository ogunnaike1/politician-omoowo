"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";

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

  // Nav bg: #E63035 â†’ #F6F6F6
  const bgColor = useTransform(scrollY, [0, 80], ["#E63035", "#F6F6F6"]);
  // Links & brand: light â†’ dark
  const linkColor = useTransform(scrollY, [0, 80], ["#F6F6F6", "#1A1A1A"]);
  // Button: bg inverts â€” #F6F6F6 â†’ #E63035, text #E63035 â†’ #F6F6F6
  const btnBg = useTransform(scrollY, [0, 80], ["#F6F6F6", "#E63035"]);
  const btnColor = useTransform(scrollY, [0, 80], ["#333333", "#F6F6F6"]);
  const borderOpacity = useTransform(scrollY, [40, 80], [0, 1]);

  return (
    <motion.header className="fixed top-0 inset-x-0 z-50 h-15" style={{ background: bgColor }}>
      {/* Bottom border fades in when scrolled */}
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

        <motion.div
          className="hidden lg:flex items-center gap-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {links.map((l) => {
            const isActive = l.href === "/"
              ? pathname === "/"
              : pathname.startsWith(l.href);
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
      </nav>
    </motion.header>
  );
}
