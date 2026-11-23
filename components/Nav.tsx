'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ADULT_SERVICES, CONTACT, NAV, SERVICES } from '@/lib/data';
import Logo from './ui/Logo';
import { useExplore } from './ui/Explore';
import { useIntro } from './ui/Intro';
import { Arrow, Close, Phone, WhatsApp } from './ui/Icons';

const ease = [0.22, 1, 0.36, 1] as const;

export function goToServices(tab: 'children' | 'adults') {
  window.dispatchEvent(new CustomEvent('ay-services-tab', { detail: tab }));
  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
}


export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [active, setActive] = useState('#home');
  const { open: openPanel } = useExplore();
  const { done } = useIntro();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const ids = NAV.map((n) => n.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`));
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ opacity: 0 }}
        animate={done ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        {/* Utility bar — collapses on scroll */}
        <div
          className={`relative overflow-hidden bg-gradient-to-r from-[#164B4B] via-[#1F7A78] to-[#C9663F] text-cream transition-all duration-500 ${
            scrolled ? 'max-h-0' : 'max-h-11'
          }`}
        >
          <span aria-hidden className="animate-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <div className="relative mx-auto flex h-9 max-w-[1400px] items-center justify-between px-4 sm:px-8 md:h-11">
            <p className="flex min-w-0 items-center gap-2.5">
              <span aria-hidden className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F6B79E] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F6B79E]" />
              </span>
              <span className="hidden rounded-full bg-white/20 px-2 py-0.5 font-heading text-[10px] font-extrabold uppercase tracking-[0.14em] text-white sm:inline">
                Anandha Yazh
              </span>
              <span className="whitespace-nowrap font-heading text-[12.5px] font-bold tracking-wide md:text-[14px]">
                Mental Health &amp; Wellbeing Centre
              </span>
              <span className="hidden text-[13px] text-cream/60 lg:inline">· Chennai</span>
            </p>
            <a href={`tel:${CONTACT.phones[0].tel}`} className="flex shrink-0 items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 font-heading text-[11px] font-bold lg:hidden" aria-label={`Call ${CONTACT.phones[0].display}`}>
              <Phone className="h-3 w-3" /> Call
            </a>
            <div className="hidden items-center gap-6 whitespace-nowrap text-[13px] text-cream/85 lg:flex">
              {CONTACT.phones.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`} className="flex items-center gap-1.5 hover:text-white">
                  <Phone className="h-3.5 w-3.5" /> {p.display}
                </a>
              ))}
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white">
                <WhatsApp className="h-3.5 w-3.5" /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <nav
          aria-label="Primary"
          className={`relative transition-all duration-500 ${
            scrolled
              ? 'bg-gradient-to-r from-white/95 via-[#FFF6F0]/95 to-[#F0F8F5]/95 shadow-[0_10px_30px_-20px_rgba(22,75,75,.35)] backdrop-blur-xl lg:bg-none lg:bg-white/95'
              : 'bg-gradient-to-r from-[#FFFDF9]/95 via-[#FDF0E8]/95 to-[#EAF5F1]/95 backdrop-blur-md lg:bg-none lg:bg-[#FBF6EF]/85'
          }`}
        >
          <span aria-hidden className={`absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-coral/0 via-coral/60 to-teal/60 transition-opacity lg:from-transparent lg:via-teal-deep/10 lg:to-transparent ${scrolled ? 'opacity-100' : 'opacity-70'}`} />
          <div
            className={`mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 transition-all duration-500 sm:px-8 ${
              scrolled ? 'h-[60px] lg:h-[68px]' : 'h-[64px] lg:h-[84px]'
            }`}
          >
            <a href="#home" className="shrink-0" aria-label="Anandha Yazh — home">
              {done ? (
                <motion.div layoutId="ay-logo" transition={{ duration: 0.75, ease }}>
                  <Logo className={`transition-all duration-500 ${scrolled ? 'w-[88px] lg:w-[100px]' : 'w-[96px] lg:w-[132px]'}`} />
                </motion.div>
              ) : (
                <div className="opacity-0">
                  <Logo className="w-[96px] lg:w-[132px]" />
                </div>
              )}
            </a>

            <ul className="hidden items-center gap-6 min-[1320px]:flex 2xl:gap-7">
              {NAV.map((n) => {
                const on = active === n.href;
                const isServices = n.href === '#services';
                return (
                  <li key={n.href} className={isServices ? 'group/mega relative' : ''}>
                    <a
                      href={n.href}
                      aria-haspopup={isServices ? 'true' : undefined}
                      className={`group relative flex items-center gap-1 py-2 font-heading text-[14px] font-semibold transition-colors ${
                        on ? 'text-teal-deep' : 'text-[#1F2A2A]/60 hover:text-teal-deep'
                      }`}
                    >
                      {n.label}
                      {isServices && (
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform group-hover/mega:rotate-180" fill="none" aria-hidden>
                          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-coral transition-all duration-300 ${
                          on ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </a>
                    {isServices && (
                      <div className="invisible absolute left-1/2 top-full z-50 w-[760px] -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-300 group-focus-within/mega:visible group-focus-within/mega:translate-y-0 group-focus-within/mega:opacity-100 group-hover/mega:visible group-hover/mega:translate-y-0 group-hover/mega:opacity-100">
                        <div className="grid grid-cols-2 overflow-hidden rounded-[1.75rem] bg-white shadow-[0_30px_70px_-25px_rgba(22,75,75,0.45)] ring-1 ring-teal-deep/8">
                          <div className="bg-gradient-to-br from-[#FFF4EE] to-[#FDEAE0] p-6">
                            <p className="flex items-center gap-2">
                              <span className="font-heading text-[15px] font-extrabold text-teal-deep">Children &amp; Teens</span>
                              <span className="rounded-full bg-coral px-2 py-0.5 font-heading text-[10px] font-extrabold uppercase tracking-wider text-white">Our speciality</span>
                            </p>
                            <ul className="mt-4 space-y-0.5">
                              {SERVICES.map((sv) => (
                                <li key={sv.id}>
                                  <button
                                    onClick={() => openPanel({ kind: 'service', id: sv.id })}
                                    className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left font-heading text-[13.5px] font-semibold text-[#1F2A2A]/75 transition-colors hover:bg-white/70 hover:text-coral-deep"
                                  >
                                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                                    {sv.title}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-6">
                            <p className="font-heading text-[15px] font-extrabold text-teal-deep">Adults</p>
                            <ul className="mt-4 space-y-0.5">
                              {ADULT_SERVICES.map((sv) => (
                                <li key={sv.id}>
                                  <button
                                    onClick={() => openPanel({ kind: 'adult', id: sv.id })}
                                    className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left font-heading text-[13.5px] font-semibold text-[#1F2A2A]/75 transition-colors hover:bg-[#EAF5F1] hover:text-teal-deep"
                                  >
                                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                                    {sv.title}
                                  </button>
                                </li>
                              ))}
                            </ul>
                            <button onClick={() => goToServices('children')} className="mt-5 inline-flex items-center gap-2 px-2 font-heading text-[13px] font-bold text-coral">
                              See all services <Arrow className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-3">
              <a
                href={`tel:${CONTACT.phones[0].tel}`}
                className="hidden h-11 w-11 place-items-center rounded-full border border-teal-deep/15 text-teal-deep transition-colors hover:border-coral hover:text-coral min-[1440px]:grid"
                aria-label={`Call ${CONTACT.phones[0].display}`}
              >
                <Phone />
              </a>
              <button onClick={() => openPanel({ kind: 'booking' })} className="btn-coral hidden whitespace-nowrap !py-3 sm:inline-flex">
                Book an Appointment <Arrow />
              </button>
              <button
                onClick={() => setOpen(true)}
                className="group grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#1F7A78] to-[#0F3B3B] text-cream shadow-[0_8px_20px_-8px_rgba(15,59,59,0.7)] lg:h-11 lg:w-11 min-[1320px]:hidden"
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="mobile-menu"
              >
                <span className="flex flex-col items-end gap-[5px]">
                  <span className="h-[2px] w-5 rounded bg-current" />
                  <span className="h-[2px] w-3.5 rounded bg-current transition-all group-hover:w-5" />
                </span>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-teal-deep text-cream"
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.9, ease }}
          >
            <div className="grain grain-light pointer-events-none absolute inset-0" />
            <div className="relative flex items-center justify-between px-5 pt-5">
              <div className="rounded-2xl bg-cream px-3 py-2">
                <Logo className="w-[96px]" />
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid h-12 w-12 place-items-center rounded-full border border-cream/25"
                aria-label="Close menu"
                autoFocus
              >
                <Close />
              </button>
            </div>

            <ul className="relative mt-10 flex-1 px-6">
              {NAV.map((n, i) => (
                <motion.li
                  key={n.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.8, ease }}
                  className="border-b border-cream/10"
                >
                  <div className="flex items-center justify-between">
                    <a href={n.href} onClick={() => setOpen(false)} className="group flex items-baseline gap-4 py-3.5">
                      <span className="font-heading text-xs font-bold text-coral">0{i + 1}</span>
                      <span className="display text-[2.15rem] transition-all duration-500 group-hover:translate-x-2 group-hover:italic sm:text-5xl">
                        {n.label}
                      </span>
                    </a>
                    {n.href === '#services' && (
                      <button
                        onClick={() => setSvcOpen((v) => !v)}
                        aria-expanded={svcOpen}
                        aria-label="Show services"
                        className="grid h-10 w-10 place-items-center rounded-full border border-cream/25"
                      >
                        <svg viewBox="0 0 24 24" className={`h-4 w-4 transition-transform ${svcOpen ? 'rotate-180' : ''}`} fill="none" aria-hidden>
                          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {n.href === '#services' && (
                    <AnimatePresence initial={false}>
                      {svcOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-4 pb-5 pl-8">
                            <div>
                              <p className="flex items-center gap-2 font-heading text-[13px] font-extrabold">
                                Children &amp; Teens <span className="rounded-full bg-coral px-2 py-0.5 text-[9.5px] uppercase tracking-wider text-white">Our speciality</span>
                              </p>
                              <ul className="mt-2 space-y-1.5">
                                {SERVICES.map((sv) => (
                                  <li key={sv.id}>
                                    <button onClick={() => { setOpen(false); openPanel({ kind: 'service', id: sv.id }); }} className="text-left text-[14px] text-cream/75">
                                      {sv.title}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="font-heading text-[13px] font-extrabold text-[#7FD4D2]">Adults</p>
                              <ul className="mt-2 space-y-1.5">
                                {ADULT_SERVICES.map((sv) => (
                                  <li key={sv.id}>
                                    <button onClick={() => { setOpen(false); openPanel({ kind: 'adult', id: sv.id }); }} className="text-left text-[14px] text-cream/75">
                                      {sv.short}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="relative space-y-4 px-6 pb-8 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <button
                onClick={() => { setOpen(false); openPanel({ kind: 'booking' }); }}
                className="btn-coral w-full justify-between"
              >
                Book an Appointment <Arrow />
              </button>
              <div className="flex gap-3">
                <a href={`tel:${CONTACT.phones[0].tel}`} className="btn-ghost flex-1 justify-center">
                  <Phone /> {CONTACT.phones[0].display}
                </a>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost justify-center" aria-label="WhatsApp">
                  <WhatsApp />
                </a>
              </div>
              <p className="text-center text-xs text-cream/50">A safe space for everyone · Chennai</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
