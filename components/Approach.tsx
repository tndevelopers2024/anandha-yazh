'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { APPROACH } from '@/lib/data';
import { Reveal, SplitHeading } from './ui/Reveal';

const ease = [0.22, 1, 0.36, 1] as const;

function StageIcon({ i }: { i: number }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const icons = [
    <g key="0" {...p}><path d="M10 14h20a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-9l-6 5v-5h-5a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4Z" /><path d="M14 22c2-2 4 2 6 0s4 2 6 0" /></g>,
    <g key="1" {...p}><circle cx="15" cy="16" r="5" /><circle cx="29" cy="16" r="5" /><path d="M7 34c1-6 4-9 8-9s7 3 8 9M21 34c1-6 4-9 8-9s7 3 8 9" /></g>,
    <g key="2" {...p}><circle cx="19" cy="19" r="10" /><path d="m27 27 8 8" /><circle cx="16" cy="18" r="1.4" fill="currentColor" /><circle cx="21" cy="21" r="1.4" fill="currentColor" /><circle cx="20" cy="15" r="1.4" fill="currentColor" /></g>,
    <g key="3" {...p}><path d="M8 32c6 0 6-8 12-8s6-12 14-12" /><circle cx="8" cy="32" r="2.5" /><path d="M31 8l4 4-4 4" /></g>,
    <g key="4" {...p}><path d="M22 36V20" /><path d="M22 24c-7 0-10-5-10-10 6 0 10 4 10 10Z" /><path d="M22 20c0-6 4-10 10-10 0 5-3 10-10 10Z" /></g>,
  ];
  return <svg viewBox="0 0 44 44" className="h-9 w-9" aria-hidden>{icons[i]}</svg>;
}

export default function Approach() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
  const draw = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <section id="approach" aria-labelledby="approach-title" className="relative overflow-hidden bg-mint py-16 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal><p className="eyebrow flex items-center gap-3 text-teal"><span className="h-px w-10 bg-teal" /> Our Approach</p></Reveal>
            <SplitHeading id="approach-title" text="Every Journey Begins With *Understanding.*" emClass="italic text-coral" className="display mt-5 text-[clamp(2rem,3.4vw,3.25rem)] text-teal-deep" />
          </div>
          <Reveal className="md:col-span-4 md:col-start-9 md:pb-3" delay={0.15}>
            <p className="text-lg leading-relaxed text-ink/70">
              Five unhurried steps — so you always know where you are, what comes next, and why.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-20">
          {/* Desktop journey path */}
          <svg className="absolute left-0 top-0 hidden h-[220px] w-full lg:block" viewBox="0 0 1000 220" preserveAspectRatio="none" aria-hidden>
            <path d="M100 48 C 170 48, 230 172, 300 172 S 430 48, 500 48 S 630 172, 700 172 S 830 48, 900 48" fill="none" stroke="#164B4B" strokeOpacity="0.12" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <motion.path d="M100 48 C 170 48, 230 172, 300 172 S 430 48, 500 48 S 630 172, 700 172 S 830 48, 900 48" fill="none" stroke="#E58A68" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ pathLength: draw }} />
          </svg>
          {/* Mobile journey line */}
          <div aria-hidden className="absolute bottom-6 left-[39px] top-6 w-px bg-teal-deep/15 lg:hidden">
            <motion.div className="h-full w-full origin-top bg-coral" style={{ scaleY: draw }} />
          </div>

          <ol className="relative grid gap-12 lg:grid-cols-5 lg:gap-6">
            {APPROACH.map((s, i) => (
              <motion.li
                key={s.no}
                className={`relative flex gap-6 lg:block ${i % 2 ? 'lg:pt-[124px]' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 0.9, delay: i * 0.12, ease }}
              >
                <div className="relative z-10 shrink-0 lg:mx-auto lg:w-fit">
                  <div className={`grid h-20 w-20 place-items-center rounded-full border-2 ${i === 4 ? 'border-coral bg-coral text-white' : 'border-teal-deep/15 bg-white text-teal-deep'} shadow-[0_18px_40px_-18px_rgba(22,75,75,.4)]`}>
                    <StageIcon i={i} />
                  </div>
                </div>
                <div className="lg:mt-6 lg:text-center">
                  <span className="display text-4xl italic text-coral/80">{s.no}</span>
                  <h3 className="mt-1 font-heading text-xl font-extrabold text-teal-deep">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/70 lg:mx-auto lg:max-w-[230px]">{s.copy}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
