'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { ADULT_SERVICES, ARTICLES, CONTACT, DOCTOR, SERVICES } from '@/lib/data';
import Photo from './Photo';
import { Arrow, Close, Mail, Phone, WhatsApp } from './Icons';

type Panel =
  | { kind: 'service'; id: string }
  | { kind: 'adult'; id: string }
  | { kind: 'booking' }
  | { kind: 'profile' }
  | { kind: 'article'; id: string }
  | null;

const Ctx = createContext<{ open: (p: Exclude<Panel, null>) => void; close: () => void }>({
  open: () => {},
  close: () => {},
});

export const useExplore = () => useContext(Ctx);

const ease = [0.22, 1, 0.36, 1] as const;

export function ExploreProvider({ children }: { children: ReactNode }) {
  const [panel, setPanel] = useState<Panel>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const open = useCallback((p: Exclude<Panel, null>) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setPanel(p);
  }, []);
  const close = useCallback(() => {
    setPanel(null);
    lastFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    if (!panel) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab' && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>('a,button');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    setTimeout(() => dialogRef.current?.querySelector<HTMLElement>('button')?.focus(), 50);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [panel, close]);

  return (
    <Ctx.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>
        {panel && (
          <motion.div className="fixed inset-0 z-[80]" initial="hidden" animate="show" exit="hidden">
            <motion.div
              className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 0.5 }}
              onClick={close}
            />
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Details"
              className="absolute bottom-0 right-0 top-0 flex w-full max-w-[560px] flex-col overflow-y-auto bg-cream shadow-2xl sm:rounded-l-[2rem]"
              variants={{ hidden: { x: '100%' }, show: { x: 0 } }}
              transition={{ duration: 0.8, ease }}
            >
              <button
                onClick={close}
                className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/80 text-ink backdrop-blur hover:bg-white"
                aria-label="Close"
              >
                <Close />
              </button>
              <PanelBody panel={panel} open={open} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

function Phase2Note({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 rounded-2xl border border-dashed border-teal/40 bg-mint/60 px-4 py-3 text-[13px] leading-relaxed text-teal-deep">
      {children}
    </p>
  );
}

function ContactActions() {
  return (
    <div className="mt-8 grid gap-3">
      <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-coral justify-between">
        <span className="flex items-center gap-3"><WhatsApp /> WhatsApp the clinic</span>
        <Arrow />
      </a>
      {CONTACT.phones.map((p) => (
        <a key={p.tel} href={`tel:${p.tel}`} className="btn-ghost justify-between text-teal-deep">
          <span className="flex items-center gap-3"><Phone /> Call {p.display}</span>
          <Arrow />
        </a>
      ))}
      <a href={`mailto:${CONTACT.email}`} className="btn-ghost justify-between text-teal-deep">
        <span className="flex items-center gap-3"><Mail /> {CONTACT.email}</span>
        <Arrow />
      </a>
    </div>
  );
}

function PanelBody({ panel, open }: { panel: Exclude<Panel, null>; open: (p: Exclude<Panel, null>) => void }) {
  if (panel.kind === 'service') {
    const s = SERVICES.find((x) => x.id === panel.id)!;
    return (
      <>
        <Photo src={s.image} alt={s.title} brief={s.photo} tint={s.color === '#FFF9F2' ? '#E58A68' : s.color} className="h-64 w-full shrink-0" />
        <div className="px-7 pb-10 pt-8">
          <p className="eyebrow text-coral">Our Services · {s.no}</p>
          <h3 className="display mt-3 text-3xl text-teal-deep">{s.title}</h3>
          <p className="mt-5 text-[17px] leading-relaxed text-ink/80">{s.long}</p>
          <ul className="mt-7 divide-y divide-ink/10 border-y border-ink/10">
            {s.areas.map((a) => (
              <li key={a} className="flex items-center gap-3 py-3 font-heading text-sm font-semibold text-teal-deep">
                <span className="h-1.5 w-1.5 rounded-full bg-coral" /> {a}
              </li>
            ))}
          </ul>
          <Phase2Note>
            A dedicated page for this service is coming in the next phase. Service details are proposed and will be
            confirmed by the clinic before publication.
          </Phase2Note>
          <button onClick={() => open({ kind: 'booking' })} className="btn-coral mt-8 w-full justify-between">
            Book an Appointment <Arrow />
          </button>
        </div>
      </>
    );
  }

  if (panel.kind === 'adult') {
    const a = ADULT_SERVICES.find((x) => x.id === panel.id)!;
    return (
      <>
        <Photo src={a.image} alt={a.title} brief={a.photo} tint={a.color} className="h-64 w-full shrink-0" />
        <div className="px-7 pb-10 pt-8">
          <p className="eyebrow text-teal">Adults · Specialised care · {a.no}</p>
          <h3 className="display mt-3 text-3xl text-teal-deep">{a.title}</h3>
          <p className="mt-5 text-[17px] leading-relaxed text-ink/80">{a.desc}</p>
          <ul className="mt-7 divide-y divide-ink/10 border-y border-ink/10">
            {a.tags.map((t) => (
              <li key={t} className="flex items-center gap-3 py-3 font-heading text-sm font-semibold text-teal-deep">
                <span className="h-1.5 w-1.5 rounded-full bg-teal" /> {t}
              </li>
            ))}
          </ul>
          <Phase2Note>A dedicated page for this service is coming in the next phase. Service details are proposed and will be confirmed by the clinic.</Phase2Note>
          <button onClick={() => open({ kind: 'booking' })} className="btn-coral mt-8 w-full justify-between">
            Book an Appointment <Arrow />
          </button>
        </div>
      </>
    );
  }

  if (panel.kind === 'profile') {
    return (
      <div className="px-7 pb-10 pt-16">
        <p className="eyebrow text-coral">Meet the Doctor</p>
        <h3 className="display mt-3 text-3xl text-teal-deep">{DOCTOR.name}</h3>
        <p className="mt-2 font-heading text-sm font-semibold text-teal">{DOCTOR.role} · {DOCTOR.creds}</p>
        <p className="mt-6 text-[17px] leading-relaxed text-ink/80">{DOCTOR.intro}</p>
        <h4 className="eyebrow mt-8 text-teal-deep">Clinical experience</h4>
        <ul className="mt-3 space-y-2 text-[15px] text-ink/80">
          <li>Psychiatry Registrar — Gleneagles Global Hospital, Chennai</li>
          <li>Senior Resident — Central Institute of Psychiatry, Ranchi</li>
        </ul>
        <h4 className="eyebrow mt-8 text-teal-deep">Research interests</h4>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/80">
          Neuromodulation and autism — including a DM thesis on anxiety in children with autism, and published work in
          journals such as <em>Autism</em> and <em>The Journal of ECT</em>.
        </p>
        <h4 className="eyebrow mt-8 text-teal-deep">Languages</h4>
        <p className="mt-3 text-[15px] text-ink/80">{DOCTOR.languages.join(' · ')}</p>
        <Phase2Note>The complete doctor profile page is coming in the next phase.</Phase2Note>
      </div>
    );
  }

  if (panel.kind === 'article') {
    const a = ARTICLES.find((x) => x.id === panel.id)!;
    return (
      <div className="px-7 pb-10 pt-16">
        <p className="eyebrow text-coral">Parent’s Corner · {a.category}</p>
        <h3 className="display mt-3 text-3xl text-teal-deep">{a.title}</h3>
        <p className="mt-6 text-[17px] leading-relaxed text-ink/80">{a.excerpt}</p>
        <Phase2Note>
          This is a placeholder article. Clinically reviewed articles will be published in the Parent’s Corner in a
          later phase.
        </Phase2Note>
      </div>
    );
  }

  return (
    <div className="px-7 pb-10 pt-16">
      <p className="eyebrow text-coral">Book an Appointment</p>
      <h3 className="display mt-3 text-3xl text-teal-deep">Let’s begin with a conversation.</h3>
      <p className="mt-5 text-[17px] leading-relaxed text-ink/80">
        Reach out by WhatsApp, phone or email and our team will help you find a suitable time for your child’s first
        consultation.
      </p>
      <ContactActions />
      <Phase2Note>Online appointment booking will be available in the next phase.</Phase2Note>
    </div>
  );
}
