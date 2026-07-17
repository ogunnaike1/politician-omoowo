"use client";

import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const quotes = [
  {
    q: "Omoowo is not a stranger to our communities. He has been here through the struggles and the progress. That is the kind of senator Ogun East needs.",
    name: "PDP Ogun State Leadership",
    role: "Peoples Democratic Party, Ogun State Chapter",
  },
  {
    q: "What sets Omoowo apart is that he listens. He does not just come to town during elections â€” he has always been present.",
    name: "Community Leader, Ijebu-East LGA",
    role: "Traditional Rulers Council Representative",
  },
  {
    q: "The people of Ogun Waterside have waited long enough. Omoowo understands our challenges and has a real plan to address them.",
    name: "Market Women Association",
    role: "Ogun Waterside Local Government",
  },
  {
    q: "Our young people need someone at Abuja who will actually fight for their future. Omoowo has proven he can be that person.",
    name: "Youth Leaders Forum",
    role: "Ogun East Senatorial District",
  },
];

export default function Endorsements() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });

  const panelRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateXVal = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateYVal = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);
  const rotateX = useSpring(rotateXVal, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(rotateYVal, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="endorsements" ref={ref} className="bg-[#EDF1F5] py-28 md:py-40 px-6 md:px-12 lg:px-20">
      <div className="max-w-300 mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[#8A94A6] text-[10px] tracking-[0.4em] uppercase mb-14"
        >
          Voices of Support
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0 items-start">

          {/* Left â€” 3D tilt quote panel */}
          <div style={{ perspective: "900px" }}>
            <motion.div
              ref={panelRef}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="lg:pr-20"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.55, ease }}
                >
                  <p className="text-[#C8D4DE] font-light leading-none mb-4" style={{ fontSize: "5rem" }}>&ldquo;</p>
                  <p
                    className="font-light text-[#0B0E13] leading-[1.45] mb-8"
                    style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)" }}
                  >
                    {quotes[active].q}
                  </p>
                  <p className="text-[#0B0E13] text-sm font-medium mb-1">{quotes[active].name}</p>
                  <p className="text-[#8A94A6] text-[11px] tracking-wide">{quotes[active].role}</p>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div className="flex gap-3 mt-10">
                {quotes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Endorsement ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      active === i ? "w-7 h-1.5 bg-[#3E5C76]" : "w-1.5 h-1.5 bg-[#C8D4DE] hover:bg-[#8A94A6]"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px bg-[#C8D4DE] self-stretch" />

          {/* Right list */}
          <div className="hidden lg:block lg:pl-20 divide-y divide-[#C8D4DE]">
            {quotes.map((q, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.09, ease }}
                onClick={() => setActive(i)}
                className={`w-full text-left py-6 transition-all duration-200 ${
                  active === i ? "opacity-100" : "opacity-35 hover:opacity-65"
                }`}
              >
                <p className="text-[#0B0E13] text-sm leading-relaxed mb-1 line-clamp-2">&ldquo;{q.q}&rdquo;</p>
                <p className="text-[#8A94A6] text-[10px] tracking-[0.15em] uppercase">{q.name}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

