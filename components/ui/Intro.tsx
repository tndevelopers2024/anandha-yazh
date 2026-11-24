'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { asset } from '@/lib/data';

/**
 * Brand intro (~1.8s): the original Anandha Yazh logo is revealed part by part —
 * the mark blooms, the name wipes in, the descriptor and tagline settle — then the
 * logo glides into its place in the navigation and the page appears.
 * Plays on every page load; skipped for reduced-motion users.
 */

const Ctx = createContext<{ done: boolean }>({ done: true });
export const useIntro = () => useContext(Ctx);

const ease = [0.22, 1, 0.36, 1] as const;
const PARTS = [
  { k: 'mark', h: 46.99 },
  { k: 'word', h: 31.2 },
  { k: 'desc', h: 14.19 },
  { k: 'tag', h: 7.62 },
];

export function IntroProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<'pending' | 'playing' | 'landing' | 'done'>('pending');

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setPhase('done'); return; }
    setPhase('playing');
    document.documentElement.style.overflow = 'hidden';
    const t1 = setTimeout(() => setPhase('landing'), 1700);
    const t2 = setTimeout(() => {
      setPhase('done');
      document.documentElement.style.overflow = '';
    }, 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); document.documentElement.style.overflow = ''; };
  }, []);

  const done = phase === 'done' || phase === 'landing';

  return (
    <Ctx.Provider value={{ done }}>
      {children}
      <AnimatePresence>
        {(phase === 'pending' || phase === 'playing') && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FBF6EF]"
            exit={{ opacity: 0, transition: { duration: 0.6, ease, delay: 0.15 } }}
            aria-hidden
          >
            {phase === 'playing' && (
              <>
                <div className="relative w-[min(78vw,420px)]">
                  {/* soft halo behind the mark */}
                  <motion.div
                    className="absolute left-1/2 top-[22%] h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(229,138,104,0.22),transparent_65%)]"
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1.4, opacity: 1 }}
                    transition={{ duration: 1.4, ease }}
                  />
                  <motion.div layoutId="ay-logo" className="relative" transition={{ duration: 0.75, ease }}>
                    {PARTS.map((p, i) => (
                      <div key={p.k} className="relative overflow-hidden" style={{ aspectRatio: `1000 / ${(p.h * 543) / 100}` }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <motion.img
                          src={asset(`/images/logo-part-${p.k}.png`)}
                          alt=""
                          className="absolute inset-0 h-full w-full"
                          initial={
                            p.k === 'mark'
                              ? { opacity: 0, scale: 0.6, y: 20 }
                              : p.k === 'word'
                                ? { clipPath: 'inset(0 100% 0 0)' }
                                : { opacity: 0, y: 10 }
                          }
                          animate={
                            p.k === 'mark'
                              ? { opacity: 1, scale: 1, y: 0 }
                              : p.k === 'word'
                                ? { clipPath: 'inset(0 0% 0 0)' }
                                : { opacity: 1, y: 0 }
                          }
                          transition={{
                            duration: p.k === 'word' ? 0.7 : 0.6,
                            delay: [0.05, 0.45, 0.95, 1.15][i],
                            ease,
                          }}
                        />
                      </div>
                    ))}
                  </motion.div>
                </div>
                <motion.div
                  className="mt-10 h-px w-40 overflow-hidden bg-teal-deep/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className="h-full bg-coral"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                  />
                </motion.div>
                <motion.p
                  className="mt-4 font-display text-sm italic text-teal-deep/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                >
                  Nurturing young minds
                </motion.p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
