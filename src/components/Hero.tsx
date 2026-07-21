"use client";

import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const headline: [string[], string[]] = [
  ["Alhaji", "Omoowo"],
  ["Omotayo."],
];

function PortraitFrame({ scrolled }: { scrolled: number }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 22 });
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full"
      style={{ perspective: "900px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", y: scrolled * -60 }}
        className="relative w-full h-full"
      >
        {/* Offset decorative border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.6, ease }}
          className="absolute border border-[#E63035]/50"
          style={{ inset: "-14px 14px 14px -14px", zIndex: 0 }}
        />

        {/* Main frame - clip reveal top-down */}
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.2, delay: 0.4, ease }}
          className="relative w-full h-full overflow-hidden"
          style={{ zIndex: 1 }}
        >
          <Image
            src="https://res.cloudinary.com/dhmqhless/image/upload/v1784251310/omoowo_zflh1d.jpg"
            alt="Alhaji Abdulhameed Oluwafemi Omotayo (Omoowo)"
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
          />

          {/* Subtle bottom fade */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent 45%, rgba(9,78,125,0.5) 80%, rgba(9,78,125,0.9) 100%)" }}
          />

          {/* Glass name badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.45, ease }}
            className="absolute bottom-0 left-0 right-0 mx-5 mb-5 rounded-sm overflow-hidden"
            style={{
              backdropFilter: "blur(14px) saturate(1.4)",
              WebkitBackdropFilter: "blur(14px) saturate(1.4)",
              background: "rgba(9,78,125,0.85)",
              border: "1px solid rgba(246,246,246,0.10)",
              boxShadow: "0 8px 32px rgba(26,26,26,0.25), inset 0 1px 0 rgba(246,246,246,0.07)",
            }}
          >
            <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(246,246,246,0.18), transparent)" }} />
            <div className="px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-[#FFFFFF] text-[11px] font-medium tracking-[0.2em] uppercase mb-0.5">Alhaji Omoowo</p>
                <p className="text-[#E63035] text-[10px] tracking-[0.15em] uppercase">PDP &middot; Ogun East &middot; 2027</p>
              </div>
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(230,48,53,0.3)", border: "1px solid rgba(230,48,53,0.5)" }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="3" fill="#E63035" /></svg>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Corner ornaments */}
        {[
          { top: -1, left: -1, rotate: "0deg" },
          { top: -1, right: -1, rotate: "90deg" },
          { bottom: -1, right: -1, rotate: "180deg" },
          { bottom: -1, left: -1, rotate: "270deg" },
        ].map((pos, i) => (
          <motion.svg
            key={i}
            width="22" height="22" viewBox="0 0 22 22" fill="none"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.2 + i * 0.07, ease }}
            className="absolute"
            style={{ ...pos, zIndex: 2, transform: `rotate(${pos.rotate})` }}
          >
            <path d="M1 21 L1 1 L21 1" stroke="#E63035" strokeWidth="1.5" fill="none" />
          </motion.svg>
        ))}

        {/* Floating accent */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.5, ease }}
          className="absolute -right-5 top-1/3 w-2 h-2 rounded-full bg-[#E63035]"
          style={{ zIndex: 3 }}
        />
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.6, delay: 1.55, ease }}
          className="absolute -right-5 w-px bg-[#E63035]/30 origin-top"
          style={{ zIndex: 3, top: "calc(33% + 10px)", height: "80px" }}
        />
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const [scrolled, setScrolled] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        const h = heroRef.current.offsetHeight;
        setScrolled(Math.min(window.scrollY / h, 1));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-[#FFFFFF]">

      {/* Subtle radial accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(230,48,53,0.08) 0%, transparent 65%)" }}
      />

      {/* Two-column layout */}
      <div className="relative z-10 min-h-screen max-w-300 mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-20 items-center pt-24 pb-16 lg:pb-20">

        {/* Text column */}
        <div className="flex flex-col justify-center">
          <motion.p
            className="text-[#E63035] text-[11px] font-medium tracking-[0.4em] uppercase mb-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            PDP &middot; Ogun East Senatorial District &middot; 2027
          </motion.p>

          <h1
            className="text-[#1A1A1A] font-light leading-[1.04] mb-6"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", letterSpacing: "-0.02em" }}
          >
            {headline.map((lineWords, li) => (
              <span key={li} style={{ display: "block" }}>
                {lineWords.map((word, wi) => (
                  <span key={wi} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.28em" }}>
                    <motion.span
                      style={{ display: "inline-block" }}
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.85, delay: 0.3 + li * 0.18 + wi * 0.09, ease }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p
            className="text-[#888888] font-light leading-relaxed max-w-lg"
            style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease }}
          >
            Bringing experienced, community-driven leadership to the National Assembly
            for the people of Ogun East.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 mt-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease }}
          >
            <a
              href="#involved"
              className="px-7 py-3 bg-[#008B4D] text-[#FFFFFF] text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#E63035] transition-colors duration-200"
            >
              Join the Campaign
            </a>
            <a
              href="/profile"
              className="px-7 py-3 border border-[#E63035] text-[#1A1A1A] text-[11px] tracking-[0.2em] uppercase hover:bg-[#E63035] hover:text-[#FFFFFF] transition-all duration-200"
            >
              Meet Omoowo
            </a>
          </motion.div>
        </div>

        {/* Portrait: above text on mobile, right column on desktop */}
        <div className="order-first lg:order-last flex items-center justify-center py-6 lg:py-16 lg:h-full">
          <div
            className="relative w-[220px] sm:w-[270px] lg:w-full lg:max-w-[360px]"
            style={{ aspectRatio: "3/4" }}
          >
            <PortraitFrame scrolled={scrolled} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <motion.div
          className="w-px h-14 bg-[#E63035] origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
