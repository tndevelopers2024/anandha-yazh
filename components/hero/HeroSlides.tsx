'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { asset } from '@/lib/data';

export const SLIDES = [
  {
    audience: 'children' as const,
    src: '/images/hero-child-world.jpg',
    alt: 'A child stands in a sunlit room filled with colourful blocks, lost in their own world',
    pos: '50% 50%',
    pre: 'Every Child Has a',
    em: 'World',
    post: 'of Their Own.',
    sub: 'Understanding that world is where meaningful care begins.',
    chips: [
      { t: 'Child & Adolescent Psychiatry', bg: '#164B4B', fg: '#FFF9F2' },
      { t: 'Development', bg: '#FCE3D8', fg: '#A94F2E' },
      { t: 'Emotional Wellbeing', bg: '#DDF1EC', fg: '#145F5E' },
    ],
  },
  {
    audience: 'adults' as const,
    src: '/images/hero-adult.jpg',
    alt: 'A woman sits peacefully on the grass in warm evening light, hugging herself with a calm smile',
    pos: '50% 40%',
    pre: 'A Safe Space to Feel',
    em: 'Yourself',
    post: 'Again.',
    sub: 'Specialised, confidential psychiatric care for adults — calm, unhurried and kind.',
    chips: [
      { t: 'Adult Psychiatry', bg: '#164B4B', fg: '#FFF9F2' },
      { t: 'Stress & Anxiety', bg: '#FCE3D8', fg: '#A94F2E' },
      { t: 'De-addiction', bg: '#DDF1EC', fg: '#145F5E' },
    ],
  },
];

/** Controlled cross-fading slideshow with a gentle zoom. */
export default function HeroSlides({
  index,
  onChange,
  className = '',
  dotsClassName = '',
}: {
  index: number;
  onChange: (i: number) => void;
  className?: string;
  dotsClassName?: string;
}) {
  const s = SLIDES[index];
  return (
    <div className={`overflow-hidden ${className || 'relative'}`}>
      <AnimatePresence initial={false}>
        <motion.img
          key={s.src}
          src={asset(s.src)}
          alt={s.alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: s.pos }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.2 }, scale: { duration: 6, ease: 'easeOut' } }}
        />
      </AnimatePresence>
      <div className={`absolute z-10 flex gap-1.5 ${dotsClassName}`} role="tablist" aria-label="Banner images">
        {SLIDES.map((sl, k) => (
          <button
            key={sl.src}
            role="tab"
            aria-selected={k === index}
            aria-label={k === 0 ? 'Children & teens' : 'Adults'}
            onClick={() => onChange(k)}
            className={`h-1.5 rounded-full transition-all duration-500 ${k === index ? 'w-6 bg-white' : 'w-1.5 bg-white/55'}`}
          />
        ))}
      </div>
    </div>
  );
}
