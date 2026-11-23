'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SERVICES, asset } from '@/lib/data';
import { useExplore } from '../ui/Explore';
import { useIntro } from '../ui/Intro';
import { Arrow } from '../ui/Icons';
import HeroSlides, { SLIDES } from './HeroSlides';
import { useAudience } from '../ui/Audience';

const ease = [0.22, 1, 0.36, 1] as const;


export default function Hero() {
  const { open } = useExplore();
  const { done } = useIntro();
  const { setAudience } = useAudience();
  const reduce = useReducedMotion();
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!done || reduce || paused) return;
    const t = setInterval(() => setSlide((v) => (v + 1) % SLIDES.length), 6500);
    return () => clearInterval(t);
  }, [done, reduce, paused, slide]);
  const S = SLIDES[slide];
  const CHIPS = S.chips;
  const goCare = () => setAudience(S.audience);
  const swap = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.5, ease } };
  const loop = [...SERVICES, ...SERVICES];
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: done ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section id="home" aria-label="Introduction" className="relative flex h-[100svh] min-h-[600px] flex-col overflow-hidden bg-[#FBF6EF] lg:min-h-[640px]">
      {/* soft light + brand accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden xl:block">
        <div className="absolute -right-[8%] top-[6%] h-[46vmax] w-[46vmax] rounded-full bg-[radial-gradient(circle,rgba(244,201,184,0.55),rgba(244,201,184,0)_62%)]" />
        <div className="absolute -left-[12%] bottom-[-20%] h-[44vmax] w-[44vmax] rounded-full bg-[radial-gradient(circle,rgba(221,241,236,0.9),rgba(221,241,236,0)_62%)]" />
        <div className="absolute left-[46%] top-[22%] h-3 w-3 rounded-full bg-coral/60" />
        <div className="absolute left-[50%] top-[70%] h-2 w-2 rounded-full bg-teal/60" />
      </div>

      {/* ---------- Mobile & tablet: full-bleed photo + overlapping sheet, all in the first screen ---------- */}
      <div className="relative flex min-h-0 flex-1 flex-col pt-[100px] md:pt-[114px] lg:pt-[132px] xl:hidden">
        <motion.div
          className="relative min-h-[170px] flex-1 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={done ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          <HeroSlides index={slide} onChange={setSlide} className="absolute inset-0" dotsClassName="right-4 top-4" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/25 to-transparent" />
          <AnimatePresence mode="wait">
            <motion.span
              key={`ma-${slide}`}
              {...swap}
              className="absolute left-4 top-3.5 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 font-heading text-[11.5px] font-extrabold text-teal-deep shadow-sm backdrop-blur-md sm:left-6"
            >
              <span className={`h-2 w-2 rounded-full ${S.audience === 'children' ? 'bg-coral' : 'bg-teal'}`} />
              {S.audience === 'children' ? 'For Children & Teens' : 'For Adults'}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Sheet */}
        <motion.div
          className="relative z-10 -mt-7 rounded-t-[2rem] bg-[#FBF6EF] px-5 pb-3 pt-5 shadow-[0_-18px_40px_-24px_rgba(40,25,10,0.45)] sm:px-8 sm:pt-7"
          initial={{ opacity: 0, y: 30 }}
          animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
        >
          <span aria-hidden className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-[#1F2A2A]/10" />
          <AnimatePresence mode="wait">
            <motion.div key={`mt-${slide}`} {...swap}>
              <ul aria-label="Our specialities" className="-mx-5 flex gap-1.5 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
                {CHIPS.map((c) => (
                  <li key={c.t} className="shrink-0 rounded-full px-2.5 py-1 font-heading text-[10.5px] font-bold sm:text-[12px]" style={{ background: c.bg, color: c.fg }}>
                    {c.t}
                  </li>
                ))}
              </ul>
              <h1 className="display mt-3 text-[1.7rem] !font-semibold !leading-[1.1] text-[#123F3F] min-[400px]:text-[1.85rem] sm:text-[2.4rem]">
                {S.pre} <em className="font-normal italic text-coral">{S.em}</em> {S.post}
              </h1>
              <p className="mt-1.5 font-display text-[14.5px] italic leading-snug text-[#123F3F]/70 sm:text-lg">{S.sub}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <a href="#services" onClick={goCare} className="btn-coral justify-center !gap-2 !px-3 !py-3 text-[13.5px]">
              See How We Care
            </a>
            <button
              onClick={() => open({ kind: 'booking' })}
              className="btn justify-center !gap-2 border border-teal-deep/15 bg-white !px-3 !py-3 text-[13.5px] text-teal-deep"
            >
              Book Appointment
            </button>
          </div>

          <a href="#doctor" className="mt-3 flex items-center gap-3 border-t border-[#1F2A2A]/8 pt-3">
            <span className="relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset('/images/dr-dharani-ramamoorthy.jpg')} alt="Dr. Dharani Ramamoorthy" className="h-12 w-12 rounded-full object-cover object-top ring-2 ring-white" />
              <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-[#E9C46A] text-[10px] text-white ring-2 ring-[#FBF6EF]" aria-hidden>★</span>
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="font-heading text-[14px] font-extrabold text-teal-deep">
                Dr. Dharani Ramamoorthy
              </p>
              <p className="mt-0.5 text-[11.5px] font-semibold text-coral-deep">
                MBBS, MD, DM <span className="text-[#9A7414]">· ★ Gold Medallist, NIMHANS</span>
              </p>
              <p className="mt-0.5 text-[11px] text-[#1F2A2A]/55">Tamil · English · Hindi · Telugu · Kannada</p>
            </div>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-coral shadow-sm">
              <Arrow className="h-4 w-4" />
            </span>
          </a>
        </motion.div>
      </div>

      {/* ---------- Desktop ---------- */}
      <div className="relative mx-auto hidden min-h-0 w-full max-w-[1400px] flex-1 items-center gap-12 px-8 pb-[3vh] pt-[calc(128px+3vh)] xl:grid xl:grid-cols-12 2xl:gap-16">
        {/* Copy */}
        <div className="order-2 lg:order-1 lg:col-span-6 xl:pr-6">
          <motion.div {...rise(0.05)}>
            <AnimatePresence mode="wait">
              <motion.div key={`dt-${slide}`} {...swap}>
                <ul aria-label="Our specialities" className="flex flex-wrap gap-2">
                  {CHIPS.map((c) => (
                    <li key={c.t} className="rounded-full px-3.5 py-1.5 font-heading text-[12.5px] font-bold tracking-wide" style={{ background: c.bg, color: c.fg }}>
                      {c.t}
                    </li>
                  ))}
                </ul>
                <h1 className="display mt-[2.6vh] text-[clamp(2rem,min(3.25vw,5.6vh),3.15rem)] !font-semibold !leading-[1.08] text-[#123F3F]">
                  {S.pre} <em className="font-normal italic text-coral">{S.em}</em>
                  <br />
                  {S.post}
                </h1>
                <p className="mt-[1.6vh] max-w-xl font-display text-[clamp(1.15rem,min(1.75vw,2.8vh),1.7rem)] italic leading-snug text-[#123F3F]/75">
                  {S.sub}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.p className="mt-[2.2vh] flex items-center gap-2 font-heading text-[15px] font-bold text-teal" {...rise(0.58)}>
            <span className="h-px w-8 bg-coral" />
            Mental Health &amp; Wellbeing Centre, Chennai
          </motion.p>

          <motion.div className="mt-[3vh] flex flex-wrap gap-3" {...rise(0.7)}>
            <a href="#services" onClick={goCare} className="btn-coral">
              See How We Care <Arrow />
            </a>
            <a href="#doctor" className="btn-ghost bg-white text-[#1F2A2A]">
              Meet Our Specialist
            </a>
          </motion.div>

          {/* Specialist card */}
          <motion.a
            href="#doctor"
            className="group mt-[4vh] flex max-w-xl flex-col gap-4 rounded-[1.5rem] border border-[#1F2A2A]/8 bg-white/85 p-4 shadow-[0_20px_50px_-30px_rgba(80,55,30,0.45)] backdrop-blur-sm sm:flex-row sm:items-center sm:p-5"
            {...rise(0.85)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset('/images/dr-dharani-ramamoorthy.jpg')} alt="Dr. Dharani Ramamoorthy" className="h-16 w-16 shrink-0 rounded-2xl object-cover object-top" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <p className="font-heading text-[15px] font-extrabold text-teal-deep">Dr. Dharani Ramamoorthy</p>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF1D0] px-2 py-0.5 font-heading text-[10.5px] font-extrabold uppercase tracking-wider text-[#7A5A12]">
                  ★ Gold Medallist · NIMHANS
                </span>
              </div>
              <p className="mt-0.5 text-[13px] text-[#1F2A2A]/65">
                Child, Adolescent &amp; Adult Psychiatrist · <span className="font-semibold text-coral-deep">MBBS, MD, DM (NIMHANS)</span>
              </p>
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <span className="mr-1 text-[12px] font-medium text-[#1F2A2A]/55">Consults in</span>
                {['Tamil', 'English', 'Hindi', 'Telugu', 'Kannada'].map((l) => (
                  <span key={l} className="rounded-full bg-[#EAF5F1] px-2.5 py-0.5 font-heading text-[11.5px] font-bold text-teal-deep">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        </div>

        {/* Image */}
        <motion.div
          className="relative order-1 lg:order-2 lg:col-span-6"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={done ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 1.2, delay: 0.15, ease }}
        >
          <div className="relative mx-auto aspect-square" style={{ width: 'min(560px, 100%, calc(100svh - 128px - 70px - 9vh))' }}>
            <div aria-hidden className="absolute -right-4 -top-4 hidden h-full w-full rounded-[2.5rem] border-2 border-coral/35 lg:block lg:rounded-t-[300px]" />
            <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-[0_50px_100px_-40px_rgba(80,55,30,0.45)] lg:rounded-t-[300px]">
              <HeroSlides index={slide} onChange={setSlide} className="absolute inset-0" dotsClassName="bottom-5 left-1/2 -translate-x-1/2" />
            </div>
            <div className="absolute -bottom-6 -left-4 hidden rounded-2xl bg-white px-5 py-4 shadow-[0_20px_50px_-20px_rgba(80,55,30,0.4)] sm:block lg:-left-10">
              <p className="font-display text-lg italic text-coral">Nurturing young minds</p>
              <p className="mt-1 text-xs font-medium text-[#1F2A2A]/65">A safe space for everyone.</p>
            </div>
            <div className="absolute -right-3 top-10 hidden items-center gap-2 rounded-full bg-teal-deep px-4 py-2.5 text-cream shadow-lg sm:flex lg:-right-8">
              <span className="h-2 w-2 rounded-full bg-coral" />
              <span className="font-heading text-[12.5px] font-bold">Children · Teens · Adults</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* How we help — auto-sliding */}
      <nav aria-label="How we help" className="relative shrink-0 border-y border-[#1F2A2A]/8 bg-white">
        <div className="flex items-stretch">
          <div className="relative z-10 hidden shrink-0 items-center bg-white px-8 sm:flex">
            <span className="eyebrow text-coral">How we help</span>
          </div>
          <div className="group relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
            <ul className="animate-marquee flex w-max gap-2.5 py-3 lg:gap-3 lg:py-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
              {loop.map((s, i) => (
                <li key={`${s.id}-${i}`} aria-hidden={i >= SERVICES.length}>
                  <button
                    onClick={() => open({ kind: 'service', id: s.id })}
                    tabIndex={i >= SERVICES.length ? -1 : 0}
                    className="flex items-center gap-2.5 rounded-full border border-[#1F2A2A]/10 bg-[#FBF6EF] py-1.5 pl-1.5 pr-4 font-heading text-[13px] lg:gap-3 lg:py-2 lg:pl-2 lg:pr-5 lg:text-sm font-semibold text-[#1F2A2A]/80 transition-colors hover:border-coral hover:text-coral"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-full text-[11px] font-bold" style={{ background: s.color, color: s.ink }}>
                      {s.no}
                    </span>
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
}
