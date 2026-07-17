"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const policies = [
  {
    n: "01",
    title: "Infrastructure & Roads",
    tagline: "Connecting Ogun East to opportunity.",
    color: "#3E5C76",
    summary:
      "Poor road networks remain one of the biggest barriers to economic growth in Ogun East. Farmers cannot move produce to market. Traders lose hours to impassable roads. Communities stay isolated. Omoowo will make infrastructure rehabilitation a legislative priority from his first day in the National Assembly.",
    commitments: [
      "Sponsor bills to fast-track federal allocation for road rehabilitation across all three LGAs",
      "Lobby for the completion of long-abandoned federal road projects in Ijebu-East and Ogun Waterside",
      "Advocate for rural bridge construction to open up farming communities",
      "Push for street lighting and drainage infrastructure in urban centres",
      "Ensure FERMA (Federal Roads Maintenance Agency) accountability in Ogun East",
    ],
    impact:
      "Better roads mean lower transport costs, faster access to hospitals and schools, and a more connected economy that works for everyone.",
  },
  {
    n: "02",
    title: "Education & Youth Empowerment",
    tagline: "Investing in the next generation of Ogun East.",
    color: "#0B0E13",
    summary:
      "Education is the single most powerful tool for lifting communities out of poverty. Yet too many schools in Ogun East are underfunded, understaffed, and underequipped. Omoowo believes that every child in the Senatorial District deserves access to quality education — and every young person deserves a pathway to a productive career.",
    commitments: [
      "Secure federal intervention funding for public primary and secondary schools across Ogun East",
      "Establish a constituency scholarship programme for outstanding students from low-income families",
      "Lobby for the siting of a federal vocational training centre in Ogun East",
      "Advocate for improved teacher recruitment and welfare in the district",
      "Support legislation for digital literacy programmes in rural schools",
    ],
    impact:
      "An educated generation is the foundation of sustainable development. When youth are empowered, communities thrive for decades.",
  },
  {
    n: "03",
    title: "Healthcare Access",
    tagline: "Quality care must reach every community.",
    color: "#3E5C76",
    summary:
      "In parts of Ogun East, the nearest functioning hospital is hours away. Women give birth without skilled attendants. Preventable diseases go untreated. This is unacceptable. Omoowo will fight in the National Assembly for healthcare infrastructure and funding that reflects the real needs of Ogun East's population.",
    commitments: [
      "Sponsor legislation to upgrade and properly equip primary healthcare centres in every LGA",
      "Advocate for the deployment of mobile health units to underserved rural communities",
      "Push for expanded NHIA (National Health Insurance Authority) coverage in Ogun East",
      "Lobby for a federal specialist hospital or upgraded general hospital for the district",
      "Support maternal and child health programmes with dedicated federal funding",
    ],
    impact:
      "When people have access to healthcare, they can work, study, and build. A healthier Ogun East is a more productive and prosperous one.",
  },
  {
    n: "04",
    title: "Security & Community Safety",
    tagline: "Every family deserves to feel safe.",
    color: "#0B0E13",
    summary:
      "Security challenges — from farmer-herder conflicts to coastal piracy in Ogun Waterside — have disrupted livelihoods and driven displacement across Ogun East. Omoowo understands that security is not just a law enforcement issue but a development one. Without safety, no investment, agricultural or otherwise, can take root.",
    commitments: [
      "Advocate for increased deployment of security personnel to hotspot areas in Ogun East",
      "Support legislation for community policing frameworks that involve local stakeholders",
      "Push for federal intervention in resolving farmer-herder conflicts through dialogue and policy",
      "Lobby for improved security infrastructure for coastal communities in Ogun Waterside",
      "Promote inter-agency coordination between military, police, and local government on security",
    ],
    impact:
      "Security is the foundation on which all other development rests. A safe Ogun East is one where investment flows and families can live without fear.",
  },
  {
    n: "05",
    title: "Agriculture & Economic Growth",
    tagline: "Unlocking the full potential of Ogun East's land and people.",
    color: "#3E5C76",
    summary:
      "Ogun East has some of the most fertile land in Nigeria and a coastline that offers immense fishing and maritime potential. Yet most of this wealth remains untapped due to lack of investment, poor infrastructure, and limited market access. Omoowo will champion agribusiness, small enterprise support, and rural electrification to build a diverse, resilient economy.",
    commitments: [
      "Lobby for federal agribusiness investment programmes targeting Ogun East farmers",
      "Advocate for rural electrification projects to power farms, cold storage, and small businesses",
      "Support legislation to connect Ogun East producers to national and regional commodity markets",
      "Push for microfinance and SME support schemes accessible to traders and entrepreneurs in the district",
      "Promote the fishing and maritime economy of Ogun Waterside through targeted federal programmes",
    ],
    impact:
      "A thriving agricultural and small business sector means jobs, food security, and economic independence for every community in Ogun East.",
  },
];

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function PoliciesHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section ref={ref} className="relative overflow-hidden flex items-end" style={{ height: "60vh", minHeight: "420px", background: "#E9EEF2" }}>
      {/* Subtle background accents */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 80% 30%, rgba(62,92,118,0.07) 0%, transparent 60%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 10% 80%, rgba(62,92,118,0.05) 0%, transparent 50%)" }} />
      </motion.div>

      <div className="relative z-10 w-full max-w-300 mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="text-[10px] tracking-[0.45em] uppercase mb-5 text-[#3E5C76]"
        >
          Policy Agenda &middot; 2027
        </motion.p>

        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.95, delay: 0.3, ease }}
            className="font-light text-[#0B0E13] leading-[1.02]"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 5rem)", letterSpacing: "-0.02em" }}
          >
            What Omoowo will fight for.
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease }}
          className="max-w-xl leading-relaxed mb-10 text-[#8A94A6]"
          style={{ fontSize: "clamp(0.9rem, 1.2vw, 1rem)" }}
        >
          Five clear commitments to the people of Ogun East — each with a concrete plan, not just a promise.
        </motion.p>

        {/* Policy index pills */}
        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease }}
        >
          {policies.map((p) => (
            <a
              key={p.n}
              href={`#policy-${p.n}`}
              className="px-4 py-2 text-[10px] tracking-[0.2em] uppercase transition-all duration-200 hover:opacity-70"
              style={{
                background: "rgba(62,92,118,0.08)",
                border: "1px solid rgba(62,92,118,0.2)",
                color: "#3E5C76",
              }}
            >
              {p.n} &middot; {p.title}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   INDIVIDUAL POLICY SECTION
───────────────────────────────────────── */
function PolicySection({ policy, index }: { policy: typeof policies[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  const [expanded, setExpanded] = useState(false);
  const isLight = index % 2 !== 0;
  const bg = isLight ? "#EDF1F5" : "#3E5C76";
  const heading = isLight ? "#0B0E13" : "#EDF1F5";
  const body = isLight ? "#8A94A6" : "rgba(237,241,245,0.65)";
  const label = isLight ? "#3E5C76" : "rgba(237,241,245,0.45)";
  const divider = isLight ? "#C8D4DE" : "rgba(237,241,245,0.1)";
  const dotBg = isLight ? "rgba(62,92,118,0.12)" : "rgba(237,241,245,0.08)";
  const dotBorder = isLight ? "rgba(62,92,118,0.3)" : "rgba(237,241,245,0.15)";
  const dotFill = isLight ? "#3E5C76" : "#EDF1F5";

  return (
    <section
      id={`policy-${policy.n}`}
      ref={ref}
      className="py-24 md:py-36 px-6 md:px-12 lg:px-20"
      style={{ background: bg }}
    >
      <div className="max-w-300 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_5fr] gap-12 lg:gap-24">

          {/* Left — number + tagline */}
          <div className="lg:pt-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease }}
            >
              <p
                className="font-light leading-none mb-4"
                style={{ fontSize: "clamp(3.5rem, 6vw, 6rem)", color: isLight ? "rgba(62,92,118,0.15)" : "rgba(237,241,245,0.08)", letterSpacing: "-0.04em" }}
              >
                {policy.n}
              </p>
              <p className="text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: label }}>
                Priority {policy.n}
              </p>
              <p className="text-sm leading-relaxed italic" style={{ color: body }}>
                &ldquo;{policy.tagline}&rdquo;
              </p>
            </motion.div>
          </div>

          {/* Right — content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease }}
              className="font-light leading-[1.1] mb-8"
              style={{ fontSize: "clamp(1.8rem, 3vw, 3rem)", letterSpacing: "-0.02em", color: heading }}
            >
              {policy.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="leading-[1.9] mb-10"
              style={{ fontSize: "clamp(0.9rem, 1.05vw, 1rem)", color: body }}
            >
              {policy.summary}
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-px origin-left mb-10"
              style={{ background: divider }}
            />

            {/* Commitments */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <p className="text-[10px] tracking-[0.35em] uppercase mb-6" style={{ color: label }}>
                Specific Commitments
              </p>
              <ul className="space-y-4">
                {policy.commitments.map((c, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.4 + i * 0.08, ease }}
                    className="flex items-start gap-4"
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: dotBg, border: `1px solid ${dotBorder}` }}
                    >
                      <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                        <circle cx="3" cy="3" r="2" fill={dotFill} />
                      </svg>
                    </div>
                    <p className="text-sm leading-[1.8]" style={{ color: body }}>{c}</p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Impact toggle */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.85, ease }}
              className="mt-10"
            >
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase pb-1 transition-all duration-200 hover:opacity-70"
                style={{ color: isLight ? "#3E5C76" : "#EDF1F5", borderBottom: `1px solid ${isLight ? "#3E5C76" : "rgba(237,241,245,0.3)"}` }}
              >
                {expanded ? "Hide Impact" : "Expected Impact"}
                <motion.span
                  animate={{ rotate: expanded ? 90 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  &rarr;
                </motion.span>
              </button>

              <motion.div
                initial={false}
                animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
                transition={{ duration: 0.4, ease }}
                style={{ overflow: "hidden" }}
              >
                <div
                  className="mt-5 px-5 py-5 border-l-2"
                  style={{ borderColor: isLight ? "#3E5C76" : "rgba(237,241,245,0.2)", background: isLight ? "rgba(62,92,118,0.05)" : "rgba(237,241,245,0.04)" }}
                >
                  <p className="text-sm leading-[1.85] italic" style={{ color: body }}>
                    {policy.impact}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   COMMITMENT BANNER
───────────────────────────────────────── */
function CommitmentBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const words = "These are not campaign promises. They are commitments — and Omoowo will be held to every one of them.".split(" ");

  return (
    <section ref={ref} className="py-28 md:py-44 px-6 md:px-12 lg:px-20" style={{ background: "#E9EEF2" }}>
      <div className="max-w-190 mx-auto text-center">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="w-10 h-px mx-auto mb-12 origin-center bg-[#3E5C76]"
        />
        <blockquote
          className="font-light text-[#0B0E13] leading-[1.45] mb-10"
          style={{ fontSize: "clamp(1.3rem, 2.5vw, 2.2rem)", letterSpacing: "-0.01em" }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: "blur(5px)", y: 12 }}
              animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.04, ease: "easeOut" }}
              style={{ display: "inline" }}
            >
              {word}{i < words.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </blockquote>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.85, ease }}
          className="text-[11px] tracking-[0.3em] uppercase"
          style={{ color: "#8A94A6" }}
        >
          Alhaji Omoowo &mdash; PDP, Ogun East 2027
        </motion.p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CTA
───────────────────────────────────────── */
function PoliciesCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#EDF1F5] py-28 md:py-36 px-6 md:px-12 lg:px-20">
      <div className="max-w-300 mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[#3E5C76] text-[10px] tracking-[0.4em] uppercase mb-4"
          >
            Take Action
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="font-light text-[#0B0E13]"
            style={{ fontSize: "clamp(1.7rem, 3.5vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            Stand behind this agenda.
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
            className="px-7 py-3 border border-[#C8D4DE] text-[#0B0E13] text-[11px] tracking-[0.2em] uppercase hover:border-[#0B0E13] transition-colors duration-200"
          >
            &larr; Back to Home
          </a>
          <a
            href="/profile"
            className="px-7 py-3 border border-[#3E5C76] text-[#3E5C76] text-[11px] tracking-[0.2em] uppercase hover:bg-[#3E5C76] hover:text-[#EDF1F5] transition-all duration-200"
          >
            Meet Omoowo
          </a>
          <a
            href="/#involved"
            className="px-7 py-3 bg-[#0B0E13] text-[#EDF1F5] text-[11px] tracking-[0.2em] uppercase hover:bg-[#3E5C76] transition-colors duration-200"
          >
            Join the Campaign
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function PoliciesPage() {
  return (
    <>
      <Nav />
      <main>
        <PoliciesHero />
        {policies.map((policy, index) => (
          <PolicySection key={policy.n} policy={policy} index={index} />
        ))}
        <CommitmentBanner />
        <PoliciesCTA />
      </main>
      <Footer />
    </>
  );
}
