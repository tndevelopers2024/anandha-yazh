'use client';

import type React from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { ADULT_SERVICES, SERVICES } from '@/lib/data';
import Photo from './ui/Photo';
import { Reveal, SplitHeading } from './ui/Reveal';
import { useExplore } from './ui/Explore';
import { AudienceToggle, useAudience } from './ui/Audience';
import { Arrow } from './ui/Icons';

const ease = [0.22, 1, 0.36, 1] as const;

type Card = { key: string; no: string; title: string; shortTitle: string; text: string; photo: string; image?: string; tint: string; tags?: string[]; onOpen: () => void };

function PanelIntro({ accent, title, sub, count }: { accent: 'coral' | 'teal'; title: string; sub: React.ReactNode; count: string }) {
  const c = accent === 'coral';
  return (
    <div
      className={`mt-8 flex items-center gap-4 rounded-[1.5rem] border p-4 md:mt-10 md:gap-5 md:px-6 md:py-5 ${
        c ? 'border-coral/15 bg-gradient-to-r from-[#FCE9E0] via-[#FDF3EC] to-white' : 'border-teal/15 bg-gradient-to-r from-[#DDF1EC] via-[#EEF8F5] to-white'
      }`}
    >
      <span className={`hidden h-11 w-11 shrink-0 place-items-center rounded-2xl text-lg text-white min-[400px]:grid md:h-12 md:w-12 ${c ? 'bg-coral' : 'bg-teal-deep'}`} aria-hidden>
        {c ? '★' : '✦'}
      </span>
      <div className="min-w-0 flex-1">
        <p className={`font-display text-[1.1rem] italic leading-tight md:text-[1.3rem] ${c ? 'text-coral-deep' : 'text-teal-deep'}`}>{title}</p>
        <p className="mt-1 text-[13.5px] leading-snug text-[#1F2A2A]/65 md:text-[15px]">{sub}</p>
      </div>
      <span className={`hidden shrink-0 rounded-full bg-white px-3.5 py-1.5 font-heading text-[12px] font-bold shadow-sm sm:inline ${c ? 'text-coral-deep' : 'text-teal-deep'}`}>{count}</span>
    </div>
  );
}

function CardRow({ cards, accent }: { cards: Card[]; accent: 'coral' | 'teal' }) {
  const a = accent === 'coral' ? 'text-coral' : 'text-teal';
  const hover = accent === 'coral' ? 'group-hover:text-coral-deep' : 'group-hover:text-teal';
  return (
    <>
      <p className={`mt-3 flex items-center gap-2 font-heading text-[13px] font-semibold sm:hidden ${a}`}>
        Swipe to see all {cards.length} <Arrow className="h-4 w-4" />
      </p>
      <ul className="-mx-5 mt-3 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-12">
        {cards.map((c) => (
          <li key={c.key} className="w-[80%] shrink-0 snap-start sm:w-auto lg:col-span-4">
            <button onClick={c.onOpen} className="group flex h-full w-full flex-col text-left" aria-label={`${c.title} — explore more`}>
              <div className="relative overflow-hidden rounded-[1.75rem]">
                <Photo src={c.image} alt={c.title} brief={c.photo} tint={c.tint} className={`${accent === 'teal' ? 'aspect-[3/2]' : 'aspect-[4/3]'} w-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]`} />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-heading text-xs font-bold text-[#1F2A2A]">{c.no}</span>
              </div>
              <h3 className={`mt-5 font-heading text-lg font-bold leading-snug text-[#1F2A2A] transition-colors ${hover}`}>
                <span className="sm:hidden">{c.shortTitle}</span>
                <span className="hidden sm:inline">{c.title}</span>
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#1F2A2A]/60">{c.text}</p>
              {c.tags && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <li key={t} className="rounded-full bg-[#EAF5F1] px-2.5 py-1 font-heading text-[11.5px] font-bold text-teal-deep">{t}</li>
                  ))}
                </ul>
              )}
              <span className={`mt-4 inline-flex items-center gap-2 font-heading text-sm font-bold ${a}`}>
                See how we help <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Services() {
  const { open } = useExplore();
  const { audience } = useAudience();

  const childCards: Card[] = SERVICES.map((s) => ({
    key: s.id, no: s.no, title: s.title, shortTitle: s.title, text: s.short, photo: s.photo, image: s.image,
    tint: s.color === '#FFF9F2' ? '#E58A68' : s.color, onOpen: () => open({ kind: 'service', id: s.id }),
  }));
  const adultCards: Card[] = ADULT_SERVICES.map((s) => ({
    key: s.id, no: s.no, title: s.title, shortTitle: s.short, text: s.desc, photo: s.photo, image: s.image,
    tint: s.color, tags: s.tags, onOpen: () => open({ kind: 'adult', id: s.id }),
  }));

  return (
    <section id="services" aria-labelledby="services-title" className="relative bg-white py-16 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-coral">
                <span className="h-px w-10 bg-coral" /> Our Services
              </p>
            </Reveal>
            <SplitHeading
              id="services-title"
              text="Mental health care for *every* *age*"
              emClass="italic text-coral"
              className="display mt-5 text-[clamp(2rem,3.4vw,3.25rem)] text-[#1F2A2A]"
            />
            <Reveal delay={0.1}>
              <p className="mt-2 font-display text-[1.15rem] italic text-teal md:text-[1.35rem]">A safe space for everyone</p>
              <p className="mt-4 max-w-[560px] text-[16px] leading-relaxed text-[#1F2A2A]/65 md:text-[17px]">
                Super-specialised in child &amp; adolescent psychiatry, with dedicated, specialised care for adults — here in Chennai.
              </p>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-5 lg:flex lg:justify-end lg:pb-1" delay={0.15}>
            <AudienceToggle id="svc" />
          </Reveal>
        </div>

        <div id="svc-panel" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div
              key={audience}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease }}
            >
              {audience === 'children' ? (
                <>
                  <PanelIntro
                    accent="coral"
                    title="Every child understood."
                    sub={<><b className="font-heading font-bold text-coral-deep">Our super-speciality</b> — expertise built at India’s top institutions.</>}
                    count={`${childCards.length} services`}
                  />
                  <CardRow cards={childCards} accent="coral" />
                </>
              ) : (
                <>
                  <PanelIntro
                    accent="teal"
                    title="Specialised, confidential care for adults."
                    sub={<><b className="font-heading font-bold text-teal-deep">Private &amp; unhurried</b> — care for mind, mood and life’s pressures.</>}
                    count={`${adultCards.length} areas of care`}
                  />
                  <CardRow cards={adultCards} accent="teal" />
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
