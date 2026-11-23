'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { DOCTOR, asset } from '@/lib/data';
import { Reveal } from './ui/Reveal';
import Credentials from './Credentials';
import { useExplore } from './ui/Explore';
import { Arrow } from './ui/Icons';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Doctor() {
  const ref = useRef<HTMLElement>(null);
  const { open } = useExplore();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section id="doctor" ref={ref} aria-labelledby="doctor-title" className="relative overflow-x-clip bg-white py-16 md:py-36">

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto lg:sticky lg:top-28 max-w-[230px] sm:max-w-[460px]">
              <motion.div
                aria-hidden
                className="absolute -right-3 -top-3 h-full w-full rounded-t-full sm:-right-5 sm:-top-5 rounded-b-[2.5rem] bg-coral"
                initial={{ opacity: 0, x: -20, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease }}
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2.5rem] bg-teal-deep">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  src={asset('/images/dr-dharani-ramamoorthy.jpg')}
                  alt="Portrait of Dr. Dharani Ramamoorthy, Child & Adolescent Psychiatrist"
                  className="absolute inset-x-0 -top-[6%] h-[112%] w-full object-cover object-[50%_20%]"
                  style={{ y: imgY }}
                />
                <motion.div
                  aria-hidden
                  className="absolute inset-0 origin-top bg-white"
                  initial={{ scaleY: 1 }}
                  whileInView={{ scaleY: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.3, ease }}
                />
              </div>

              {/* Rotating seal */}
              <div className="absolute -bottom-10 -left-6 grid h-36 w-36 place-items-center rounded-full bg-teal-deep text-cream shadow-xl md:-left-10">
                <svg viewBox="0 0 200 200" className="animate-spin-slow absolute inset-0 h-full w-full" aria-hidden>
                  <defs>
                    <path id="seal" d="M100 100 m -74 0 a 74 74 0 1 1 148 0 a 74 74 0 1 1 -148 0" />
                  </defs>
                  <text fontFamily="Manrope, sans-serif" fontSize="13.5" fontWeight="700" letterSpacing="3.2" fill="currentColor">
                    <textPath href="#seal">GOLD MEDALLIST · DM · NIMHANS ·</textPath>
                  </text>
                </svg>
                <span className="display text-4xl italic text-coral">DM</span>
              </div>
            </div>
          </div>

          {/* Story */}
          <div className="lg:col-span-7 lg:pt-4">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-coral"><span className="h-px w-10 bg-coral" /> Meet your specialist</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="doctor-title" className="display mt-5 text-[clamp(2rem,3.2vw,3rem)] text-teal-deep">
                Dr. Dharani <span className="italic">Ramamoorthy</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="font-heading text-lg font-extrabold tracking-[0.12em] text-coral">MBBS · MD · DM</span>
                <span className="hidden h-4 w-px bg-teal-deep/20 sm:block" />
                <span className="font-heading text-base font-semibold text-teal">{DOCTOR.role} in Chennai</span>
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-ink/70 md:text-[17px]">{DOCTOR.intro}</p>
            </Reveal>

            <Credentials />

            {/* Expertise */}
            <Reveal delay={0.1} className="mt-12">
              <p className="eyebrow text-teal-deep/60">Clinical expertise</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {DOCTOR.expertise.map((e) => (
                  <li key={e} className="rounded-full border border-teal-deep/12 bg-[#FBF6EF] px-3.5 py-2 font-heading text-[13px] font-semibold text-teal-deep">
                    {e}
                  </li>
                ))}
              </ul>
              <p className="eyebrow mt-8 text-teal-deep/60">Consults in</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {DOCTOR.languages.map((l) => (
                  <li key={l} className="rounded-full bg-[#EAF5F1] px-3.5 py-1.5 font-heading text-[13px] font-bold text-teal-deep">
                    {l}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15} className="mt-10 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
              <button onClick={() => open({ kind: 'profile' })} className="btn justify-center bg-teal-deep text-cream hover:bg-ink">
                Explore Full Profile <Arrow />
              </button>
              <button onClick={() => open({ kind: 'booking' })} className="btn-ghost justify-center text-teal-deep">
                Book a consultation
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
