"use client";

import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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

  const parallaxY = scrolled * -60;

  return (
    <div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full"
      style={{ perspective: "900px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", y: parallaxY }}
        className="relative w-full h-full"
      >

        {/* Outer decorative border — offset behind */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.6, ease }}
          className="absolute border border-[#3E5C76]/40"
          style={{ inset: "-14px 14px 14px -14px", zIndex: 0 }}
        />

        {/* Main frame — clip reveal from top */}
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.2, delay: 0.4, ease }}
          className="relative w-full h-full overflow-hidden"
          style={{ zIndex: 1 }}
        >
          {/* Portrait placeholder — swap with <Image> when photo is ready */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(160deg, #2A3A4E 0%, #1E2D3F 30%, #192435 60%, #131B26 100%)",
            }}
          />

          {/* Subtle figure silhouette suggestion */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 50% 35%, rgba(62,92,118,0.18) 0%, transparent 65%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-3/4"
            style={{
              background: "radial-gradient(ellipse at 50% 100%, rgba(62,92,118,0.12) 0%, transparent 70%)",
            }}
          />

          {/* Grain overlay */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
              backgroundSize: "180px",
            }}
          />

          {/* Bottom gradient fade */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, transparent 40%, rgba(11,14,19,0.7) 85%, rgba(11,14,19,0.95) 100%)",
            }}
          />

          {/* Name badge at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4, ease }}
            className="absolute bottom-0 left-0 right-0 p-7 flex items-end justify-between"
          >
            <div>
              <p className="text-[#EDF1F5]/90 text-xs tracking-[0.25em] uppercase mb-1">
                Alhaji Omoowo
              </p>
              <p className="text-[#3E5C76] text-[10px] tracking-[0.18em] uppercase">
                PDP &middot; Ogun East
              </p>
            </div>
            <div className="text-right">
              <p className="text-[#EDF1F5]/30 text-[10px] tracking-[0.2em] uppercase">2027</p>
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
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.2 + i * 0.07, ease }}
            className="absolute"
            style={{ ...pos, zIndex: 2, transform: `rotate(${pos.rotate})` }}
          >
            <path d="M1 21 L1 1 L21 1" stroke="#3E5C76" strokeWidth="1.5" fill="none" />
          </motion.svg>
        ))}

        {/* Floating accent dot */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.5, ease }}
          className="absolute -right-5 top-1/3 w-2 h-2 rounded-full bg-[#3E5C76]"
          style={{ zIndex: 3 }}
        />
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.6, delay: 1.55, ease }}
          className="absolute -right-5 w-px bg-[#3E5C76]/30 origin-top"
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
    <section ref={heroRef} className="relative h-screen min-h-[640px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ transform: `translateY(${scrolled * 12}%)` }}>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(165deg, #1A2535 0%, #1E2D40 25%, #151A21 55%, #0B0E13 100%)" }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse at 70% 20%, #3E5C76 0%, transparent 60%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(11,14,19,0.15) 0%, rgba(11,14,19,0) 30%, rgba(11,14,19,0.6) 75%, rgba(11,14,19,0.97) 100%)" }}
        />
      </div>

      {/* Two-column layout */}
      <div className="relative z-10 h-full max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-20 items-center pt-24 pb-20">

        {/* Left — text */}
        <div className="flex flex-col justify-center">

          {/* Label */}
          <motion.p
            className="text-[#8A94A6] text-[11px] tracking-[0.4em] uppercase mb-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            PDP &middot; Ogun East Senatorial District &middot; 2027
          </motion.p>

          {/* Headline */}
          <h1
            className="text-[#EDF1F5] font-light leading-[1.04] mb-6"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", letterSpacing: "-0.02em" }}
          >
            {headline.map((lineWords, li) => (
              <span key={li} style={{ display: "block" }}>
                {lineWords.map((word, wi) => (
                  <span
                    key={wi}
                    style={{ display: "inline-block", overflow: "hidden", marginRight: "0.28em" }}
                  >
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

          {/* Subtitle */}
          <motion.p
            className="text-[#8A94A6] font-light leading-relaxed max-w-lg"
            style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease }}
          >
            Bringing experienced, community-driven leadership to the National Assembly
            for the people of Ogun East.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4 mt-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease }}
          >
            <a
              href="#involved"
              className="px-7 py-3 bg-[#EDF1F5] text-[#0B0E13] text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-white transition-colors duration-200"
            >
              Join the Campaign
            </a>
            <a
              href="#candidate"
              className="px-7 py-3 border border-[#3E5C76] text-[#EDF1F5] text-[11px] tracking-[0.2em] uppercase hover:bg-[#3E5C76]/20 transition-colors duration-200"
            >
              Meet Omoowo
            </a>
          </motion.div>
        </div>

        {/* Right — portrait frame */}
        <div className="hidden lg:flex items-center justify-center h-full py-16">
          <div className="relative w-full max-w-[360px]" style={{ aspectRatio: "3/4" }}>
            <PortraitFrame scrolled={scrolled} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <motion.div
          className="w-px h-14 bg-[#3E5C76] origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
