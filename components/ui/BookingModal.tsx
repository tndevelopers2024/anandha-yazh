'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { CONTACT, DOCTOR, asset } from '@/lib/data';
import { Arrow, Close, Phone, WhatsApp } from './Icons';

const ease = [0.22, 1, 0.36, 1] as const;

type Who = 'child' | 'teen' | 'adult';

const WHO: { id: Who; title: string; sub: string; emoji: string; tint: string; ring: string }[] = [
  { id: 'child', title: 'My child', sub: 'Up to 12 years', emoji: '🧒', tint: 'bg-[#FCE3D8]', ring: 'ring-coral' },
  { id: 'teen', title: 'A teenager', sub: '13 – 17 years', emoji: '🎧', tint: 'bg-[#FFF1D0]', ring: 'ring-[#D9A93A]' },
  { id: 'adult', title: 'Myself / an adult', sub: '18 years and above', emoji: '🌿', tint: 'bg-[#DDF1EC]', ring: 'ring-teal' },
];

const CONCERNS: Record<Who, string[]> = {
  child: ['Autism', 'ADHD', 'Speech delay', 'Learning difficulty', 'Behaviour & tantrums', 'Anxiety', 'School refusal', 'Screen habits'],
  teen: ['Anxiety', 'Low mood', 'Stress & exams', 'Anger', 'OCD', 'Screen addiction', 'Sleep', 'Substance use'],
  adult: ['Depression', 'Anxiety', 'Stress & sleep', 'OCD', 'Mood swings', 'De-addiction', 'Relationships', 'Elderly care'],
};

const TIMES = ['Morning', 'Afternoon', 'Evening'];
const MODES = [
  { id: 'clinic', label: 'At the clinic' },
  { id: 'online', label: 'Online' },
];

const STEPS = ['Who', 'Concern', 'Contact'];

export default function BookingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [who, setWho] = useState<Who | null>(null);
  const [concerns, setConcerns] = useState<string[]>([]);
  const [unsure, setUnsure] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [mode, setMode] = useState('clinic');
  const [time, setTime] = useState('');
  const [touched, setTouched] = useState(false);
  const [done, setDone] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const digits = phone.replace(/\D/g, '');
  const nameOk = name.trim().length >= 2;
  const phoneOk = /^[6-9]\d{9}$/.test(digits);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [onClose]);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: 0 });
  }, [step, done]);

  const go = (n: number) => {
    setDir(n > step ? 1 : -1);
    setStep(n);
  };

  const pickWho = (w: Who) => {
    if (w !== who) setConcerns([]);
    setWho(w);
    setTimeout(() => go(1), 220);
  };

  const toggle = (c: string) => {
    setUnsure(false);
    setConcerns((v) => (v.includes(c) ? v.filter((x) => x !== c) : [...v, c]));
  };

  const message = useMemo(() => {
    const whoLabel = WHO.find((w) => w.id === who)?.title ?? '';
    const lines = [
      'Hello Anandha Yazh, I would like to book an appointment.',
      '',
      `Name: ${name.trim()}`,
      `Phone: +91 ${digits}`,
      `For: ${whoLabel}`,
      `Concern: ${unsure || !concerns.length ? 'Not sure yet' : concerns.join(', ')}`,
      `Consultation: ${MODES.find((m) => m.id === mode)?.label}`,
    ];
    if (time) lines.push(`Preferred time: ${time}`);
    return lines.join('\n');
  }, [who, name, digits, concerns, unsure, mode, time]);

  const waLink = `https://wa.me/917502076929?text=${encodeURIComponent(message)}`;

  const submit = () => {
    setTouched(true);
    if (!nameOk || !phoneOk) return;
    window.open(waLink, '_blank', 'noopener,noreferrer');
    setDone(true);
  };

  const accent = who === 'adult' ? 'teal' : 'coral';

  return (
    <motion.div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6" initial="hidden" animate="show" exit="hidden">
      <motion.div
        className="absolute inset-0 bg-[#0B2626]/55 backdrop-blur-[6px]"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-title"
        className="relative flex max-h-[94svh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-[#FBF6EF] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] sm:max-h-[min(92svh,720px)] sm:max-w-[920px] sm:flex-row sm:rounded-[2rem]"
        variants={{ hidden: { y: 60, opacity: 0, scale: 0.98 }, show: { y: 0, opacity: 1, scale: 1 } }}
        transition={{ duration: 0.55, ease }}
      >
        {/* ---------- Left: reassurance (desktop) ---------- */}
        <aside className="relative hidden w-[340px] shrink-0 flex-col justify-between overflow-hidden bg-gradient-to-br from-[#1F7A78] via-[#164B4B] to-[#0F3535] p-8 text-cream sm:flex">
          <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(229,138,104,0.55),transparent_65%)]" />
          <div aria-hidden className="absolute -bottom-28 -left-16 h-64 w-64 rounded-full border border-white/10" />
          <div className="relative">
            <p className="font-heading text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#F6B79E]">Book an appointment</p>
            <h2 className="display mt-3 text-[2rem] !leading-[1.1] text-white">
              Let’s begin with a <em className="font-normal italic text-[#F6B79E]">conversation.</em>
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-white/75">Share a few details and our team will reach out to find a time that suits you.</p>
          </div>
          <ul className="relative mt-6 space-y-3 text-[14px]">
            {[
              ['🔒', 'Private & confidential'],
              ['⏱', 'Takes under a minute'],
              ['💬', 'We reply on WhatsApp or call'],
            ].map(([i, t]) => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-[14px]">{i}</span>
                {t}
              </li>
            ))}
          </ul>
          <div className="relative mt-6 flex items-center gap-3 rounded-2xl bg-white/10 p-3 ring-1 ring-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset('/images/dr-dharani-ramamoorthy.jpg')} alt="" className="h-12 w-12 rounded-full object-cover object-top ring-2 ring-[#E9C46A]" />
            <div className="leading-tight">
              <p className="font-heading text-[14px] font-extrabold">{DOCTOR.name}</p>
              <p className="mt-0.5 text-[12px] text-white/70">MBBS, MD, DM (NIMHANS) · ★ Gold Medallist</p>
              <p className="mt-0.5 text-[11.5px] text-white/55">{DOCTOR.languages.join(' · ')}</p>
            </div>
          </div>
        </aside>

        {/* ---------- Right: the form ---------- */}
        <div className="relative flex min-h-0 flex-1 flex-col">
          <span aria-hidden className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-[#1F2A2A]/15 sm:hidden" />
          <div className="flex shrink-0 items-center justify-between gap-4 px-5 pb-2 pt-3 sm:px-8 sm:pt-7">
            {!done ? (
              <div className="flex items-center gap-2" aria-label={`Step ${step + 1} of 3`}>
                {STEPS.map((s, i) => (
                  <span key={s} className="flex items-center gap-2">
                    <span
                      className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-coral' : i < step ? 'w-4 bg-teal' : 'w-4 bg-[#1F2A2A]/12'}`}
                    />
                  </span>
                ))}
                <span className="ml-1 font-heading text-[12px] font-bold text-[#1F2A2A]/45">Step {step + 1} of 3</span>
              </div>
            ) : (
              <span />
            )}
            <button onClick={onClose} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink shadow-sm hover:bg-[#F4EFE8]">
              <Close />
            </button>
          </div>

          <div ref={boxRef} className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-5 pb-5 sm:px-8">
            <AnimatePresence mode="wait" custom={dir}>
              {done ? (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease }} className="flex flex-col items-center py-6 text-center sm:py-10">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                    className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-[#2BB673] to-[#1F7A78] text-white shadow-[0_20px_40px_-15px_rgba(31,122,120,0.7)]"
                  >
                    <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.35 }} />
                    </svg>
                  </motion.span>
                  <h3 id="book-title" className="display mt-6 text-[1.9rem] text-teal-deep">Almost done, {name.trim().split(' ')[0]}.</h3>
                  <p className="mt-3 max-w-sm text-[15.5px] leading-relaxed text-[#1F2A2A]/70">
                    We’ve opened WhatsApp with your details filled in — just tap <b className="text-teal-deep">Send</b>. Our team will get back to you to confirm a time.
                  </p>
                  <div className="mt-7 grid w-full max-w-sm gap-2.5">
                    <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn justify-center gap-2 bg-[#25D366] !py-3.5 text-[15px] font-bold text-[#073B1F]">
                      <WhatsApp className="h-5 w-5" /> Open WhatsApp again
                    </a>
                    <a href={`tel:${CONTACT.phones[0].tel}`} className="btn-ghost justify-center gap-2 bg-white text-teal-deep">
                      <Phone /> Prefer to call? {CONTACT.phones[0].display}
                    </a>
                  </div>
                  <button onClick={onClose} className="mt-5 font-heading text-[13px] font-bold text-[#1F2A2A]/50 hover:text-coral">
                    Close
                  </button>
                </motion.div>
              ) : step === 0 ? (
                <Step key="s0" dir={dir}>
                  <h3 id="book-title" className="display text-[1.65rem] !leading-[1.15] text-teal-deep sm:text-[2rem]">
                    Who is this appointment <em className="font-normal italic text-coral">for?</em>
                  </h3>
                  <p className="mt-2 text-[14.5px] text-[#1F2A2A]/60">Choose one to get started.</p>
                  <div className="mt-6 grid gap-3">
                    {WHO.map((w) => {
                      const on = who === w.id;
                      return (
                        <button
                          key={w.id}
                          onClick={() => pickWho(w.id)}
                          className={`group flex items-center gap-4 rounded-2xl border bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-20px_rgba(40,25,10,0.5)] ${
                            on ? `border-transparent ring-2 ${w.ring}` : 'border-[#1F2A2A]/8'
                          }`}
                        >
                          <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl ${w.tint}`}>{w.emoji}</span>
                          <span className="flex-1">
                            <span className="block font-heading text-[16px] font-extrabold text-teal-deep">{w.title}</span>
                            <span className="block text-[13px] text-[#1F2A2A]/55">{w.sub}</span>
                          </span>
                          <span className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${on ? 'bg-coral text-white' : 'bg-[#F4EFE8] text-[#1F2A2A]/40 group-hover:text-coral'}`}>
                            <Arrow />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </Step>
              ) : step === 1 && who ? (
                <Step key="s1" dir={dir}>
                  <h3 id="book-title" className="display text-[1.65rem] !leading-[1.15] text-teal-deep sm:text-[2rem]">
                    What would you like <em className="font-normal italic text-coral">help</em> with?
                  </h3>
                  <p className="mt-2 text-[14.5px] text-[#1F2A2A]/60">Pick any that apply — or skip if you’re not sure.</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {CONCERNS[who].map((c) => {
                      const on = concerns.includes(c);
                      return (
                        <button
                          key={c}
                          onClick={() => toggle(c)}
                          aria-pressed={on}
                          className={`rounded-full border px-4 py-2.5 font-heading text-[14px] font-bold transition-all ${
                            on
                              ? accent === 'teal'
                                ? 'border-teal-deep bg-teal-deep text-white'
                                : 'border-coral bg-coral text-white'
                              : 'border-[#1F2A2A]/10 bg-white text-[#1F2A2A]/75 hover:border-[#1F2A2A]/25'
                          }`}
                        >
                          {on && <span className="mr-1">✓</span>}
                          {c}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => {
                      setUnsure(!unsure);
                      setConcerns([]);
                    }}
                    aria-pressed={unsure}
                    className={`mt-4 flex w-full items-center gap-3 rounded-2xl border border-dashed p-3.5 text-left transition-colors ${
                      unsure ? 'border-teal bg-[#EAF5F1]' : 'border-[#1F2A2A]/15 bg-transparent hover:bg-white'
                    }`}
                  >
                    <span className={`grid h-5 w-5 place-items-center rounded-full border-2 ${unsure ? 'border-teal bg-teal text-[10px] text-white' : 'border-[#1F2A2A]/25'}`}>
                      {unsure && '✓'}
                    </span>
                    <span className="text-[14px] text-[#1F2A2A]/70">
                      <b className="font-heading text-teal-deep">Not sure yet</b> — that’s completely okay, we’ll talk it through.
                    </span>
                  </button>
                </Step>
              ) : (
                <Step key="s2" dir={dir}>
                  <h3 id="book-title" className="display text-[1.65rem] !leading-[1.15] text-teal-deep sm:text-[2rem]">
                    How can we <em className="font-normal italic text-coral">reach you?</em>
                  </h3>
                  <p className="mt-2 text-[14.5px] text-[#1F2A2A]/60">Just your name and number — we’ll take it from there.</p>

                  <div className="mt-6 grid gap-4">
                    <Field label="Your name" error={touched && !nameOk ? 'Please enter your name' : ''}>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        placeholder="e.g. Priya"
                        className="w-full bg-transparent px-4 py-3.5 text-[16px] text-ink outline-none placeholder:text-[#1F2A2A]/30"
                      />
                    </Field>
                    <Field label="Mobile number (WhatsApp)" error={touched && !phoneOk ? 'Please enter a valid 10-digit mobile number' : ''}>
                      <span className="flex items-center">
                        <span className="pl-4 pr-2 font-heading text-[15px] font-bold text-[#1F2A2A]/55">+91</span>
                        <span className="h-6 w-px bg-[#1F2A2A]/10" />
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/[^\d ]/g, '').slice(0, 11))}
                          inputMode="numeric"
                          autoComplete="tel-national"
                          placeholder="98765 43210"
                          className="w-full bg-transparent px-3 py-3.5 text-[16px] tracking-wide text-ink outline-none placeholder:text-[#1F2A2A]/30"
                        />
                      </span>
                    </Field>

                    <div>
                      <p className="mb-2 font-heading text-[13px] font-bold text-[#1F2A2A]/70">Consultation</p>
                      <div className="grid grid-cols-2 gap-1 rounded-full bg-[#F1EBE2] p-1">
                        {MODES.map((m) => (
                          <button
                            key={m.id}
                            onClick={() => setMode(m.id)}
                            className={`relative rounded-full py-2.5 font-heading text-[14px] font-bold transition-colors ${mode === m.id ? 'text-white' : 'text-[#1F2A2A]/60'}`}
                          >
                            {mode === m.id && <motion.span layoutId="book-mode" className="absolute inset-0 -z-0 rounded-full bg-teal-deep" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
                            <span className="relative">{m.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 font-heading text-[13px] font-bold text-[#1F2A2A]/70">
                        Preferred time <span className="font-medium text-[#1F2A2A]/40">(optional)</span>
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {TIMES.map((t) => (
                          <button
                            key={t}
                            onClick={() => setTime(time === t ? '' : t)}
                            aria-pressed={time === t}
                            className={`rounded-xl border py-2.5 font-heading text-[13.5px] font-bold transition-colors ${
                              time === t ? 'border-coral bg-[#FCE3D8] text-coral-deep' : 'border-[#1F2A2A]/10 bg-white text-[#1F2A2A]/65'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-5 flex items-start gap-2 text-[12.5px] leading-snug text-[#1F2A2A]/50">
                    <span aria-hidden>🔒</span> Your details are kept private and used only to arrange your appointment.
                  </p>
                </Step>
              )}
            </AnimatePresence>
          </div>

          {/* Footer actions */}
          {!done && (
            <div className="flex shrink-0 items-center gap-3 border-t border-[#1F2A2A]/8 bg-[#FBF6EF] px-5 py-3.5 sm:px-8 sm:py-4">
              {step > 0 ? (
                <button onClick={() => go(step - 1)} className="font-heading text-[14px] font-bold text-[#1F2A2A]/55 hover:text-teal-deep">
                  ← Back
                </button>
              ) : (
                <a href={`tel:${CONTACT.phones[0].tel}`} className="flex items-center gap-1.5 font-heading text-[13px] font-bold text-[#1F2A2A]/55 hover:text-teal-deep">
                  <Phone className="h-3.5 w-3.5" /> Or call {CONTACT.phones[0].display}
                </a>
              )}
              <span className="flex-1" />
              {step === 1 && (
                <button onClick={() => go(2)} className="btn-coral !px-6 !py-3">
                  {concerns.length || unsure ? 'Continue' : 'Skip'} <Arrow />
                </button>
              )}
              {step === 2 && (
                <button onClick={submit} className="btn-coral !gap-2 !px-6 !py-3">
                  Request appointment <Arrow />
                </button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Step({ children, dir }: { children: ReactNode; dir: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: dir * 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: dir * -30 }}
      transition={{ duration: 0.35, ease }}
      className="pt-3"
    >
      {children}
    </motion.div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-heading text-[13px] font-bold text-[#1F2A2A]/70">{label}</span>
      <span
        className={`block rounded-2xl border bg-white transition-shadow focus-within:shadow-[0_0_0_4px_rgba(229,138,104,0.18)] ${
          error ? 'border-[#D9534F]' : 'border-[#1F2A2A]/10 focus-within:border-coral'
        }`}
      >
        {children}
      </span>
      {error && <span className="mt-1.5 block text-[12.5px] font-semibold text-[#C0392B]">{error}</span>}
    </label>
  );
}
