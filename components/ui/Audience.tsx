'use client';

import { motion } from 'framer-motion';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Audience = 'children' | 'adults';

const Ctx = createContext<{ audience: Audience; setAudience: (a: Audience) => void }>({
  audience: 'children',
  setAudience: () => {},
});

export const useAudience = () => useContext(Ctx);

/** One shared Children/Adults choice for the whole page (services + concerns follow it). */
export function AudienceProvider({ children }: { children: ReactNode }) {
  const [audience, setAudience] = useState<Audience>('children');
  useEffect(() => {
    const on = (e: Event) => setAudience((e as CustomEvent<Audience>).detail);
    window.addEventListener('ay-services-tab', on);
    return () => window.removeEventListener('ay-services-tab', on);
  }, []);
  return <Ctx.Provider value={{ audience, setAudience }}>{children}</Ctx.Provider>;
}

const OPTIONS = [
  { id: 'children' as const, label: 'Children & Teens', badge: 'Our super-speciality', bg: 'bg-coral', badgeOff: 'text-coral sm:bg-coral/10' },
  { id: 'adults' as const, label: 'Adults', badge: 'Specialised care', bg: 'bg-teal-deep', badgeOff: 'text-teal sm:bg-teal/10' },
];

export function AudienceToggle({ id, className = '' }: { id: string; className?: string }) {
  const { audience, setAudience } = useAudience();
  return (
    <div
      role="tablist"
      aria-label="Choose who the care is for"
      className={`relative grid w-full grid-cols-2 rounded-full bg-[#F4EFE8] p-1.5 ring-1 ring-black/[0.03] sm:inline-flex sm:w-auto ${className}`}
    >
      {OPTIONS.map((t) => {
        const on = audience === t.id;
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={on}
            aria-controls={`${id}-panel`}
            onClick={() => setAudience(t.id)}
            className={`relative z-10 flex shrink-0 flex-col items-center justify-center rounded-full px-3 py-2.5 font-heading transition-colors sm:flex-row sm:gap-2 sm:px-6 sm:py-3 ${
              on ? 'text-white' : 'text-[#1F2A2A]/65 hover:text-[#1F2A2A]'
            }`}
          >
            {on && (
              <motion.span
                layoutId={`${id}-pill`}
                className={`absolute inset-0 -z-10 rounded-full shadow-[0_10px_25px_-12px_rgba(0,0,0,0.45)] ${t.bg}`}
                transition={{ type: 'spring', stiffness: 420, damping: 36 }}
              />
            )}
            <span className="whitespace-nowrap text-[14px] font-extrabold sm:text-[15px]">{t.label}</span>
            <span
              className={`whitespace-nowrap text-[9.5px] font-extrabold uppercase tracking-[0.1em] sm:rounded-full sm:px-2 sm:py-0.5 sm:text-[10px] ${
                on ? 'text-white/85 sm:bg-white/20' : t.badgeOff
              }`}
            >
              {t.badge}
            </span>
          </button>
        );
      })}
    </div>
  );
}
