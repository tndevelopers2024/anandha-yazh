'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ADULT_CONCERNS, ADULT_SERVICES, CONCERNS, SERVICES } from '@/lib/data';
import { AudienceToggle, useAudience } from './ui/Audience';
import { Reveal, SplitHeading } from './ui/Reveal';
import { useExplore } from './ui/Explore';
import { Arrow } from './ui/Icons';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Concerns() {
  const [active, setActive] = useState(0);
  const { open } = useExplore();
  const { audience } = useAudience();
  const adults = audience === 'adults';
  const LIST = adults ? ADULT_CONCERNS : CONCERNS;
  useEffect(() => setActive(0), [audience]);
  const findSvc = (id: string) => {
    const k = SERVICES.find((s) => s.id === id);
    if (k) return { id, title: k.title, color: k.color, kind: 'service' as const };
    const a = ADULT_SERVICES.find((s) => s.id === id)!;
    return { id, title: a.title, color: a.color, kind: 'adult' as const };
  };
  const c = LIST[Math.min(active, LIST.length - 1)];
  const svc = findSvc(c.service);

  return (
    <section id="concerns" aria-labelledby="concerns-title" className="relative overflow-hidden bg-lavender py-16 md:py-28">
      {/* floating thought marks */}
      <div aria-hidden className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full border border-plum/10" />
      <div aria-hidden className="pointer-events-none absolute -right-8 top-32 h-48 w-48 rounded-full border border-coral/30" />
      <div aria-hidden className="animate-drift pointer-events-none absolute left-[46%] top-24 h-5 w-5 rounded-full bg-coral/70" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-plum/70">
                <span className="h-px w-10 bg-plum/40" /> What brings you here today?
              </p>
            </Reveal>
            <SplitHeading
              id="concerns-title"
              text="Sometimes, You Just Want to *Understand* What’s Going On."
              emClass="italic text-coral"
              className="display mt-5 text-[clamp(2rem,3.2vw,3rem)] text-plum"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-lg text-plum/70">
                Choose what sounds most like your situation. We’ll share a gentle explanation and the kind of support that
                may help.
              </p>
            </Reveal>
            <div className="mt-7">
              <AudienceToggle id="concerns" />
            </div>
          <ul key={audience} className="mt-8" role="listbox" aria-label={adults ? "Adult concerns" : "Parent concerns"} aria-activedescendant={`concern-${c.id}`}>
            {LIST.map((item, i) => {
              const on = i === active;
              return (
                <Reveal as="li" key={item.id} delay={i * 0.05}>
                  <button
                    id={`concern-${item.id}`}
                    role="option"
                    aria-selected={on}
                    onClick={() => setActive(i)}
                    className="group relative block w-full py-3 text-left md:py-3.5"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className={`font-heading text-xs font-bold transition-colors ${on ? 'text-coral' : 'text-plum/35'}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`display relative text-[clamp(1.1rem,1.7vw,1.5rem)] transition-all duration-500 ${
                          on ? 'italic text-plum' : 'text-plum/40 group-hover:text-plum/70'
                        }`}
                      >
                        “{item.text}”
                        <svg viewBox="0 0 300 12" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-3 w-full" aria-hidden>
                          <motion.path
                            d="M2 8 C 60 2, 120 11, 180 6 S 270 3, 298 7"
                            fill="none"
                            stroke="#E58A68"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            initial={false}
                            animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }}
                            transition={{ duration: 0.8, ease }}
                          />
                        </svg>
                      </span>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        className="overflow-hidden lg:hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease }}
                      >
                        <div className="mb-3 mt-1 rounded-2xl bg-white p-5 shadow-[0_20px_40px_-30px_rgba(43,35,64,0.4)]">
                          <p className="text-[15px] leading-relaxed text-ink/75">{item.explain}</p>
                          <p className="mt-4 text-[12px] text-ink/50">Often explored under</p>
                          <p className="font-heading text-[15px] font-bold text-teal-deep">
                            {findSvc(item.service).title}
                          </p>
                          <button onClick={() => { const f = findSvc(item.service); open({ kind: f.kind, id: f.id }); }} className="btn-coral mt-4 !px-5 !py-2.5 text-[13px]">
                            Explore this service <Arrow />
                          </button>
                          <p className="mt-4 text-[11px] leading-relaxed text-ink/45">General information only — not a diagnosis.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </ul>
          </div>

          <div className="hidden lg:col-span-5 lg:block lg:pt-10">
            <div className="sticky top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 24, rotate: -1 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.6, ease }}
                  className="relative overflow-hidden rounded-[2.25rem] bg-white p-8 shadow-[0_40px_80px_-40px_rgba(43,35,64,0.35)] md:p-10"
                  aria-live="polite"
                >
                  <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-[4rem]" style={{ background: svc.color }} />
                  <p className="eyebrow relative text-teal">Understanding this</p>
                  <p className="display relative mt-4 pr-20 text-2xl italic text-plum">“{c.text}”</p>
                  <p className="relative mt-5 text-[16px] leading-relaxed text-ink/75">{c.explain}</p>
                  <div className="relative mt-7 flex items-center gap-3 border-t border-plum/10 pt-6">
                    <span className="h-3 w-3 rounded-full" style={{ background: svc.color, boxShadow: '0 0 0 4px rgba(0,0,0,.04)' }} />
                    <span className="text-sm text-ink/60">Often explored under</span>
                  </div>
                  <p className="relative mt-2 font-heading text-xl font-bold text-teal-deep">{svc.title}</p>
                  <div className="relative mt-6 flex flex-wrap gap-3">
                    <button onClick={() => open({ kind: svc.kind, id: svc.id })} className="btn-coral">
                      Explore this service <Arrow />
                    </button>
                    <button onClick={() => open({ kind: 'booking' })} className="btn-ghost text-teal-deep">
                      Talk to us
                    </button>
                  </div>
                  <p className="relative mt-6 text-xs leading-relaxed text-ink/50">
                    This is general information to help you understand — not a diagnosis or assessment.{' '}
                    {adults
                      ? 'Everyone is different; a consultation is the best way to understand your needs.'
                      : 'Every child is different; a consultation is the best way to understand your child’s needs.'}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
