'use client';

import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useState } from 'react';
import { ARTICLES, ARTICLE_CATEGORIES, type Article } from '@/lib/data';
import { Reveal, SplitHeading } from './ui/Reveal';
import { useExplore } from './ui/Explore';
import { Arrow } from './ui/Icons';

const ease = [0.22, 1, 0.36, 1] as const;

/** Generative editorial cover — composition varies by article. */
function Cover({ a, className = '' }: { a: Article; className?: string }) {
  const [bg, c1, c2] = a.palette;
  const n = Number(a.id.slice(1));
  const comps = [
    <g key="0"><circle cx="300" cy="180" r="120" fill={c1} /><rect x="60" y="220" width="180" height="180" rx="90" fill={c2} /><circle cx="300" cy="180" r="40" fill={bg} /></g>,
    <g key="1">{[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${40 + i * 70} 400 a 60 60 0 0 1 120 0`} fill="none" stroke={c2} strokeWidth="14" />)}<circle cx="320" cy="110" r="50" fill={c1} /></g>,
    <g key="2"><text x="60" y="300" fontFamily="Fraunces, serif" fontSize="260" fontStyle="italic" fill={c2}>b</text><text x="210" y="330" fontFamily="Fraunces, serif" fontSize="220" fill={c1}>d</text></g>,
    <g key="3"><path d="M0 260 C 100 180, 200 340, 400 240 V 400 H 0 Z" fill={c1} /><circle cx="130" cy="130" r="54" fill={c2} /><circle cx="250" cy="90" r="20" fill={c1} /></g>,
    <g key="4"><circle cx="200" cy="200" r="130" fill={c1} /><circle cx="250" cy="170" r="120" fill={bg} /><line x1="40" y1="350" x2="360" y2="350" stroke={c2} strokeWidth="3" /></g>,
    <g key="5">{Array.from({ length: 6 }, (_, i) => <circle key={i} cx={80 + (i % 3) * 120} cy={130 + Math.floor(i / 3) * 140} r={30 + (i % 3) * 12} fill={i % 2 ? c1 : c2} />)}</g>,
    <g key="6"><rect x="70" y="80" width="260" height="260" rx="40" fill="none" stroke={c1} strokeWidth="14" transform="rotate(12 200 210)" /><circle cx="200" cy="210" r="64" fill={c2} /></g>,
  ];
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className={className} style={{ background: bg }} aria-hidden>
      {comps[(n - 1) % comps.length]}
    </svg>
  );
}

const CAT_COLOR: Record<string, string> = {
  'Understanding ADHD': '#C9663F',
  'Understanding Autism': '#1E8A89',
  'Learning Difficulties': '#6B57A8',
  'Childhood Anxiety': '#C9663F',
  'Adolescent Mental Health': '#2B2340',
  'Emotional Development': '#1E8A89',
  'Parenting & Behaviour': '#164B4B',
};

function Meta({ a, light = false }: { a: Article; light?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className="rounded-full px-2.5 py-1 font-heading text-[10.5px] font-extrabold uppercase tracking-[0.1em]"
        style={light ? { background: 'rgba(255,255,255,0.18)', color: '#fff' } : { background: `${CAT_COLOR[a.category]}14`, color: CAT_COLOR[a.category] }}
      >
        {a.category}
      </span>
      <span className={`text-[12px] ${light ? 'text-white/75' : 'text-ink/45'}`}>{a.read}</span>
    </div>
  );
}

export default function ParentsCorner() {
  const [filter, setFilter] = useState<string>('All');
  const { open } = useExplore();
  const list = filter === 'All' ? ARTICLES : ARTICLES.filter((a) => a.category === filter);
  const [feature, ...rest] = list;

  return (
    <section id="parents-corner" aria-labelledby="pc-title" className="relative overflow-hidden bg-[#FBF6EF] py-16 md:py-28">
      <div aria-hidden className="pointer-events-none absolute -right-[12%] top-0 h-[40vmax] w-[40vmax] rounded-full bg-[radial-gradient(circle,rgba(244,201,184,0.45),rgba(244,201,184,0)_62%)]" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <Reveal><p className="eyebrow flex items-center gap-3 text-coral"><span className="h-px w-10 bg-coral" /> The Parent’s Corner</p></Reveal>
            <SplitHeading id="pc-title" text="Knowledge Helps Us *Understand* Better." emClass="italic text-coral" className="display mt-4 max-w-3xl text-[clamp(2rem,3.4vw,3.25rem)] text-teal-deep" />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[15px] leading-relaxed text-ink/60">
              Gentle, clinically guided reading for parents and caregivers.{' '}
              <span className="font-semibold text-teal-deep">Articles shown are placeholders</span> until reviewed content is published.
            </p>
          </Reveal>
        </div>

        {/* Filters */}
        <LayoutGroup>
          <div className="-mx-5 mt-8 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0" role="tablist" aria-label="Article categories">
            <div className="flex w-max gap-2">
              {['All', ...ARTICLE_CATEGORIES].map((c) => {
                const on = filter === c;
                return (
                  <button key={c} role="tab" aria-selected={on} onClick={() => setFilter(c)}
                    className={`relative rounded-full border px-4 py-2 font-heading text-[13px] font-semibold transition-colors ${on ? 'border-teal-deep text-cream' : 'border-teal-deep/12 bg-white text-teal-deep/75 hover:text-teal-deep'}`}>
                    {on && <motion.span layoutId="pc-chip" className="absolute inset-0 rounded-full bg-teal-deep" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                    <span className="relative">{c}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </LayoutGroup>

        <AnimatePresence mode="wait">
          <motion.div key={filter} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease }}>
            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
              {/* Featured — immersive card */}
              {feature && (
                <article className={rest.length ? 'lg:col-span-7' : 'lg:col-span-12'}>
                  <button onClick={() => open({ kind: 'article', id: feature.id })} className="group relative block h-full min-h-[380px] w-full overflow-hidden rounded-[2rem] text-left md:min-h-[440px]">
                    <Cover a={feature} className="absolute inset-0 h-full w-full transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2626]/90 via-[#0B2626]/30 to-transparent" />
                    <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 font-heading text-[10.5px] font-extrabold uppercase tracking-[0.12em] text-teal-deep">Featured · Placeholder</span>
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-9">
                      <Meta a={feature} light />
                      <h3 className="display mt-3 max-w-xl text-[clamp(1.6rem,2.6vw,2.4rem)] text-white">{feature.title}</h3>
                      <p className="mt-2 max-w-lg text-[14.5px] leading-relaxed text-white/80">{feature.excerpt}</p>
                      <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 font-heading text-[13px] font-bold text-teal-deep">
                        Read article <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </button>
                </article>
              )}

              {/* Side list (desktop) / swipe cards (mobile) */}
              {rest.length > 0 && (
                <div className="lg:col-span-5">
                  <p className="mb-3 flex items-center gap-2 font-heading text-[13px] font-semibold text-coral lg:hidden">
                    Swipe for more reads <Arrow className="h-4 w-4" />
                  </p>
                  <ul className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-3 lg:overflow-visible lg:px-0 lg:pb-0">
                    {rest.map((a, i) => (
                      <li key={a.id} className={`w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-auto ${i >= 4 ? 'lg:hidden' : ''}`}>
                        <button
                          onClick={() => open({ kind: 'article', id: a.id })}
                          className="group flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] bg-white text-left ring-1 ring-teal-deep/8 transition-shadow hover:shadow-[0_20px_40px_-25px_rgba(22,75,75,0.45)] lg:flex-row lg:items-center lg:gap-4 lg:p-3"
                        >
                          <div className="aspect-[16/10] w-full shrink-0 overflow-hidden lg:aspect-square lg:w-[92px] lg:rounded-xl">
                            <Cover a={a} className="h-full w-full transition-transform duration-700 group-hover:scale-110" />
                          </div>
                          <div className="min-w-0 flex-1 p-4 lg:p-0 lg:pr-2">
                            <Meta a={a} />
                            <h3 className="mt-2 font-heading text-[15px] font-bold leading-snug text-teal-deep group-hover:text-coral-deep">{a.title}</h3>
                            <p className="mt-1 text-[12px] text-ink/45">Placeholder article</p>
                          </div>
                          <Arrow className="mr-3 hidden h-4 w-4 shrink-0 text-coral transition-transform group-hover:translate-x-1 lg:block" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Ask the doctor strip */}
        <Reveal delay={0.1} className="mt-8">
          <div className="flex flex-col gap-4 rounded-[1.75rem] bg-gradient-to-r from-[#164B4B] to-[#1E6A69] p-6 text-cream sm:flex-row sm:items-center sm:justify-between md:px-8">
            <div>
              <p className="font-display text-[1.3rem] italic leading-snug text-white">Have a question about your child?</p>
              <p className="mt-1 text-[14px] text-cream/70">Every child is different — sometimes it helps to talk it through.</p>
            </div>
            <button onClick={() => open({ kind: 'booking' })} className="btn-coral shrink-0 justify-center">
              Talk to us <Arrow />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
