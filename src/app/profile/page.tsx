"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* â”€â”€ helpers â”€â”€ */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#888888] text-[10px] tracking-[0.4em] uppercase mb-4">{children}</p>
  );
}

/* â”€â”€ 1. HERO â”€â”€ */
function ProfileHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.55, 0.9]);

  return (
    <section ref={ref} className="relative h-[92vh] min-h-[580px] overflow-hidden flex items-end">

      {/* Parallax photo */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <Image
          src="https://res.cloudinary.com/dhmqhless/image/upload/v1784253381/ChatGPT_Image_Jul_17_2026_02_54_01_AM_y1wlyw.png"
          alt="Alhaji Abdulhameed Oluwafemi Omotayo (Omoowo)"
          fill
          style={{ objectFit: "cover", objectPosition: "center 15%" }}
          priority
        />
      </motion.div>

      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: overlayOpacity,
          background: "linear-gradient(to bottom, rgba(9,78,125,0.2) 0%, rgba(9,78,125,0.55) 55%, rgba(9,78,125,0.95) 100%)",
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-300 mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-24">

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="text-[#E63035] text-[10px] tracking-[0.45em] uppercase mb-5"
        >
          Candidate Profile
        </motion.p>

        <div className="overflow-hidden mb-3">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="font-light text-[#F6F3F3] leading-[1.0]"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)", letterSpacing: "-0.02em" }}
          >
            Alhaji Abdulhameed
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, delay: 0.42, ease }}
            className="font-light text-[#F6F3F3] leading-[1.0]"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)", letterSpacing: "-0.02em" }}
          >
            Oluwafemi Omotayo
          </motion.h1>
        </div>

        {/* Glass tag row */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease }}
          className="flex flex-wrap gap-3"
        >
          {["Known as Omoowo", "PDP Candidate", "Ogun East Senatorial District", "2027 Election"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 text-[10px] tracking-[0.18em] uppercase text-[#F6F3F3]/80 rounded-sm"
              style={{
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                background: "rgba(230,48,53,0.22)",
                border: "1px solid rgba(230,48,53,0.4)",
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* â”€â”€ 2. BIO â”€â”€ */
function Biography() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#F6F3F3] py-28 md:py-40 px-6 md:px-12 lg:px-20">
      <div className="max-w-300 mx-auto grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 lg:gap-28 items-start">

        {/* Left â€” sticky photo accent */}
        <div className="lg:sticky lg:top-32">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease }}
            className="relative"
          >
            {/* Decorative offset */}
            <div
              className="absolute border border-[#E63035]/30"
              style={{ inset: "12px -12px -12px 12px" }}
            />
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <Image
                src="https://res.cloudinary.com/dhmqhless/image/upload/v1784253381/ChatGPT_Image_Jul_17_2026_02_54_01_AM_y1wlyw.png"
                alt="Omoowo"
                fill
                style={{ objectFit: "cover", objectPosition: "center 10%" }}
              />
              {/* Glass strip at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 px-5 py-4"
                style={{
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  background: "rgba(9,78,125,0.75)",
                  borderTop: "1px solid rgba(246,246,246,0.08)",
                }}
              >
                <p className="text-[#F6F3F3]/90 text-[11px] tracking-[0.2em] uppercase">Omoowo</p>
                <p className="text-[#E63035] text-[10px] tracking-[0.15em] uppercase mt-0.5">PDP &middot; Ogun East</p>
              </div>
            </div>
          </motion.div>

          {/* Quick facts */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35, ease }}
            className="mt-8 divide-y divide-[#DCDCDC]"
          >
            {[
              ["Full Name", "Alhaji Abdulhameed Oluwafemi Omotayo"],
              ["Known As", "Omoowo"],
              ["Party", "Peoples Democratic Party (PDP)"],
              ["Constituency", "Ogun East Senatorial District"],
              ["State", "Ogun State, Nigeria"],
              ["Election", "2027 National Assembly"],
            ].map(([label, val]) => (
              <div key={label} className="py-3 flex justify-between gap-4 hover:bg-[rgba(230,48,53,0.06)] transition-colors duration-200 cursor-default">
                <p className="text-[#888888] text-[10px] tracking-[0.15em] uppercase shrink-0">{label}</p>
                <p className="text-[#1A1A1A] text-[11px] text-right leading-relaxed">{val}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right â€” biography text */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel>Biography</SectionLabel>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="font-light text-[#1A1A1A] leading-[1.1] mb-10"
            style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.5rem)", letterSpacing: "-0.02em" }}
          >
            A son of Ogun East, built by its people, fighting for its future.
          </motion.h2>

          {[
            `Alhaji Abdulhameed Oluwafemi Omotayo â€” widely known and beloved across Ogun State as Omoowo â€” is a community leader, accomplished businessman, and long-standing pillar of the Peoples Democratic Party (PDP) in Ogun East. His story is inseparable from the story of the communities he has served throughout his life.`,
            `Born and raised in Ogun East, Omoowo grew up with a firsthand understanding of the challenges facing ordinary families across the Senatorial District â€” the broken roads that cut communities off from opportunity, the schools that need investment, the healthcare centres that struggle without resources, and the young people whose potential goes unrealised for want of support.`,
            `Rather than turn away from these realities, Omoowo built his career around confronting them. Through decades of grassroots engagement â€” from Ijebu-East to Ogun Waterside, from Ikenne to the remotest communities of the district â€” he has worked alongside traditional rulers, women's associations, youth groups, and business communities to drive the kind of development that begins at the grassroots.`,
            `His reputation as a man of the people is not a political slogan. It is a track record visible in the communities where he has invested his time, resources, and energy. He is the kind of leader who shows up â€” not during election season, but consistently, year after year, building relationships and earning trust the old-fashioned way.`,
            `As the PDP candidate for the 2027 Ogun East Senatorial District election, Omoowo brings to the National Assembly a clear agenda grounded in his deep knowledge of the district's needs: infrastructure rehabilitation, education investment, healthcare access, security, and economic development for every LGA under Ogun East.`,
            `His candidacy represents a new chapter â€” not just for him, but for every family in Ogun East that has waited too long for a senator who truly knows them, fights for them, and delivers for them.`,
          ].map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.08, ease }}
              className="text-[#888888] leading-[1.9] mb-6"
              style={{ fontSize: "clamp(0.9rem, 1.05vw, 1rem)" }}
            >
              {para}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€ 3. TIMELINE â”€â”€ */
const timelineItems = [
  {
    period: "Early Years",
    title: "Roots in Ogun East",
    body: "Born and raised in Ogun East, shaped by the daily realities of his community â€” its strengths, its challenges, and its enormous unrealised potential.",
  },
  {
    period: "Community Leadership",
    title: "Grassroots Organiser",
    body: "Established himself as a trusted community voice across multiple LGAs in Ogun East, working with traditional institutions, youth groups, and women's cooperatives to drive local development.",
  },
  {
    period: "Business & Philanthropy",
    title: "Entrepreneur & Investor",
    body: "Built a successful business career while consistently reinvesting in the communities of Ogun East through scholarships, infrastructure support, and economic empowerment programmes.",
  },
  {
    period: "PDP Membership",
    title: "Party Stalwart",
    body: "A dedicated and active member of the Peoples Democratic Party (PDP), contributing to party building and electoral organisation across Ogun East over many years.",
  },
  {
    period: "2027 Campaign",
    title: "Senatorial Candidate",
    body: "Emerged as the PDP candidate for the 2027 Ogun East Senatorial District election â€” bringing decades of community experience and a people-first agenda to the National Assembly.",
  },
];

function Timeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });

  return (
    <section ref={ref} className="bg-[#094e7d] py-28 md:py-40 px-6 md:px-12 lg:px-20">
      <div className="max-w-300 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Journey</SectionLabel>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="font-light text-[#F6F3F3] mb-20"
          style={{ fontSize: "clamp(1.7rem, 3vw, 2.8rem)", letterSpacing: "-0.02em" }}
        >
          A life spent in service.
        </motion.h2>

        <div className="relative">
          {/* Vertical spine */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease }}
            className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px bg-[rgba(246,243,243,0.25)] origin-top"
            style={{ marginLeft: "-0.5px" }}
          />

          <div className="space-y-0">
            {timelineItems.map((item, i) => {
              const isRight = i % 2 === 0;
              return (
                <motion.div
                  key={item.period}
                  initial={{ opacity: 0, x: isRight ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.75, delay: 0.25 + i * 0.12, ease }}
                  className={`relative pl-10 lg:pl-0 lg:w-1/2 pb-14 ${isRight ? "lg:pr-16" : "lg:ml-auto lg:pl-16"}`}
                >
                  {/* Dot on spine */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.35 + i * 0.12 }}
                    className="absolute top-1 w-3 h-3 rounded-full bg-[#E63035] border-2 border-[#1A1A1A]"
                    style={{ left: isRight ? "auto" : "-6px", right: isRight ? "-6px" : "auto", [isRight ? "right" : "left"]: "calc(100% - 5px)" }}
                  />
                  {/* Mobile dot */}
                  <div className="lg:hidden absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#E63035]" />

                  <p className="text-[#E63035] text-[10px] tracking-[0.3em] uppercase mb-2">{item.period}</p>
                  <h3 className="text-[#F6F3F3] font-light text-xl mb-3 leading-snug">{item.title}</h3>
                  <p className="text-[#888888] text-sm leading-[1.85]">{item.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€ 4. VALUES â”€â”€ */
const values = [
  {
    n: "01",
    title: "Integrity",
    body: "Leadership built on honesty. What Omoowo commits to publicly, he delivers privately. No double standards, no hidden agendas.",
  },
  {
    n: "02",
    title: "Community First",
    body: "Every decision is filtered through one question: does this make life better for the people of Ogun East? That is the only metric that matters.",
  },
  {
    n: "03",
    title: "Inclusive Development",
    body: "No LGA left behind. Development must reach the farmer in Ogun Waterside as much as the trader in Ijebu-East.",
  },
  {
    n: "04",
    title: "Youth & Future",
    body: "The energy and potential of Ogun East's young people are its greatest asset. Omoowo is committed to unlocking that potential.",
  },
];

function Values() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#F6F3F3] py-28 md:py-40 px-6 md:px-12 lg:px-20">
      <div className="max-w-300 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Core Values</SectionLabel>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="font-light text-[#1A1A1A] mb-16"
          style={{ fontSize: "clamp(1.7rem, 3vw, 2.8rem)", letterSpacing: "-0.02em" }}
        >
          What guides every decision.
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#E63035]">
          {values.map((v, i) => (
            <motion.div
              key={v.n}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease }}
              className="bg-[#F6F3F3] p-10 md:p-14 group hover:bg-[rgba(230,48,53,0.1)] transition-colors duration-300"
            >
              <p className="text-[#DCDCDC] text-[11px] tracking-[0.3em] mb-6">{v.n}</p>
              <h3
                className="font-light text-[#1A1A1A] mb-5 leading-tight group-hover:text-[#E63035] transition-colors duration-300"
                style={{ fontSize: "clamp(1.3rem, 2vw, 1.7rem)" }}
              >
                {v.title}
              </h3>
              <p className="text-[#888888] text-sm leading-[1.85]">{v.body}</p>
              <motion.div
                className="mt-8 h-px bg-[#E63035] origin-left"
                initial={{ scaleX: 0.15 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€ 5. QUOTE â”€â”€ */
function Quote() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const words = "I did not enter this race for titles. I entered it because the people of Ogun East deserve a senator who lives among them, listens to them, and fights for them every single day.".split(" ");

  return (
    <section ref={ref} className="bg-[#094e7d] py-28 md:py-44 px-6 md:px-12 lg:px-20">
      <div className="max-w-190 mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="w-10 h-px bg-[#E63035] mx-auto mb-12 origin-center"
          style={{ display: "block" }}
        />

        <blockquote
          className="font-light text-[#F6F3F3] leading-[1.45] mb-10"
          style={{ fontSize: "clamp(1.3rem, 2.5vw, 2.1rem)", letterSpacing: "-0.01em" }}
        >
          &ldquo;
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: "blur(6px)", y: 14 }}
              animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.035, ease: "easeOut" }}
              style={{ display: "inline" }}
            >
              {word}{i < words.length - 1 ? " " : ""}
            </motion.span>
          ))}
          &rdquo;
        </blockquote>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8, ease }}
          className="text-[rgba(246,243,243,0.6)] text-[11px] tracking-[0.3em] uppercase"
        >
          Alhaji Omoowo &mdash; PDP Candidate, Ogun East 2027
        </motion.p>
      </div>
    </section>
  );
}

/* â”€â”€ 6. STATS â”€â”€ */
function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  const data = [
    { value: "3", label: "LGAs", sub: "Ijebu-East, Ogun Waterside, Ikenne" },
    { value: "PDP", label: "Party", sub: "Peoples Democratic Party" },
    { value: "2027", label: "Election Year", sub: "National Assembly general elections" },
    { value: "1", label: "Goal", sub: "Deliver real change for Ogun East" },
  ];

  return (
    <section ref={ref} className="bg-[#094e7d] py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-300 mx-auto grid grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(246,243,243,0.15)]">
        {data.map((d, i) => (
          <motion.div
            key={d.label}
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={inView ? { opacity: 1, clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease }}
            className="bg-[#094e7d] px-8 py-10 group hover:bg-[#E63035] transition-colors duration-250 cursor-default"
          >
            <p
              className="font-light text-[#F6F3F3] leading-none mb-3 group-hover:text-[#DCDCDC] transition-colors duration-250"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", letterSpacing: "-0.03em" }}
            >
              {d.value}
            </p>
            <p className="text-[#DCDCDC] text-sm mb-1 group-hover:text-[#F6F3F3] transition-colors duration-250">{d.label}</p>
            <p className="text-[#888888] text-[11px] leading-relaxed">{d.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* â”€â”€ 7. CTA â”€â”€ */
function ProfileCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#F6F3F3] py-28 md:py-36 px-6 md:px-12 lg:px-20">
      <div className="max-w-300 mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[#888888] text-[10px] tracking-[0.4em] uppercase mb-4"
          >
            Get Involved
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="font-light text-[#1A1A1A]"
            style={{ fontSize: "clamp(1.7rem, 3.5vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            Be part of the movement.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          className="flex flex-wrap gap-4 shrink-0"
        >
          <a
            href="/"
            className="px-7 py-3 border border-[#DCDCDC] text-[#1A1A1A] text-[11px] tracking-[0.2em] uppercase hover:border-[#1A1A1A] transition-colors duration-200"
          >
            &larr; Back to Home
          </a>
          <a
            href="/#involved"
            className="px-7 py-3 bg-[#E63035] text-[#F6F3F3] text-[11px] tracking-[0.2em] uppercase hover:bg-[#094e7d] transition-colors duration-200"
          >
            Join the Campaign
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* â”€â”€ PAGE â”€â”€ */
export default function ProfilePage() {
  return (
    <>
      <Nav />
      <main>
        <ProfileHero />
        <Biography />
        <Timeline />
        <Values />
        <Quote />
        <Stats />
        <ProfileCTA />
      </main>
      <Footer />
    </>
  );
}
