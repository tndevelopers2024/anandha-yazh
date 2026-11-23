'use client';

import { motion } from 'framer-motion';
import { CONTACT } from '@/lib/data';
import { Reveal, SplitHeading } from './ui/Reveal';
import { useExplore } from './ui/Explore';
import { Arrow, Mail, Phone, Pin, WhatsApp } from './ui/Icons';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const { open } = useExplore();

  const tiles = [
    {
      key: 'call',
      icon: <Phone className="h-5 w-5" />,
      label: 'Call the clinic',
      title: CONTACT.phones[0].display,
      sub: `or ${CONTACT.phones[1].display}`,
      href: `tel:${CONTACT.phones[0].tel}`,
      cls: 'bg-gradient-to-br from-[#F4A887] to-[#D9714B] text-white',
      iconCls: 'bg-white/20 text-white',
      ext: false,
    },
    {
      key: 'wa',
      icon: <WhatsApp className="h-5 w-5" />,
      label: 'WhatsApp',
      title: 'Message us',
      sub: 'Quick replies on 75020 76929',
      href: CONTACT.whatsapp,
      cls: 'bg-gradient-to-br from-[#3CC8A0] to-[#1E8A6E] text-white',
      iconCls: 'bg-white/20 text-white',
      ext: true,
    },
    {
      key: 'mail',
      icon: <Mail className="h-5 w-5" />,
      label: 'Email',
      title: 'Write to us',
      sub: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      cls: 'bg-white/10 text-cream ring-1 ring-inset ring-white/15 backdrop-blur-sm',
      iconCls: 'bg-white/12 text-cream',
      ext: false,
    },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-[#0F3B3B] text-cream">
      {/* Gradient atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#164B4B] via-[#0F3B3B] to-[#0A2C2C]" />
        <div className="absolute -right-[15%] -top-[30%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle,rgba(229,138,104,0.35),rgba(229,138,104,0)_60%)]" />
        <div className="absolute -bottom-[35%] -left-[15%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(44,166,165,0.35),rgba(44,166,165,0)_60%)]" />
        <div className="absolute left-1/2 top-1/3 h-[30vmax] w-[30vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(182,163,230,0.18),rgba(182,163,230,0)_65%)]" />
      </div>
      <div className="grain grain-light pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[1200px] px-5 py-16 sm:px-8 md:py-28">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-coral/40 bg-coral/10 px-4 py-2 text-[#F6B79E]">
              <span className="h-1.5 w-1.5 rounded-full bg-coral" /> Take the first step
            </p>
          </Reveal>
          <SplitHeading
            id="contact-title"
            text="Every Child Deserves to Be *Understood.*"
            emClass="italic text-[#F6B79E]"
            className="display mt-6 text-[clamp(2rem,4.2vw,3.8rem)] text-white"
          />
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-cream/75 md:text-[17px]">
              Let’s take the first step towards understanding your child’s world. Reach us the way that feels easiest —
              we’ll gently guide you from there.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-8 flex justify-center">
            <button
              onClick={() => open({ kind: 'booking' })}
              className="btn w-full justify-center bg-white !py-4 text-[15px] text-teal-deep shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] hover:bg-cream sm:w-auto sm:!px-8"
            >
              Book an Appointment <Arrow />
            </button>
          </Reveal>
        </div>

        {/* Action tiles */}
        <div className="mt-12 grid grid-cols-1 gap-3 md:mt-16 md:grid-cols-3 md:gap-5">
          {tiles.map((t, i) => (
            <motion.a
              key={t.key}
              href={t.href}
              {...(t.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={`group relative flex items-center gap-4 overflow-hidden rounded-[1.5rem] p-4 transition-transform duration-500 hover:-translate-y-1 md:flex-col md:items-start md:gap-0 md:rounded-[2rem] md:p-7 ${t.cls}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease }}
            >
              <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 md:h-44 md:w-44" />
              <span className={`relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl md:h-14 md:w-14 ${t.iconCls}`}>{t.icon}</span>
              <span className="relative min-w-0 flex-1 md:mt-10">
                <span className="block font-heading text-[11px] font-bold uppercase tracking-[0.16em] opacity-75">{t.label}</span>
                <span className="mt-0.5 block font-heading text-[19px] font-extrabold leading-tight md:mt-2 md:text-[26px]">{t.title}</span>
                <span className="mt-0.5 block truncate text-[13px] opacity-80 md:mt-1 md:text-[14px]">{t.sub}</span>
              </span>
              <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15 transition-transform duration-500 group-hover:translate-x-1 md:absolute md:right-6 md:top-7">
                <Arrow />
              </span>
            </motion.a>
          ))}
        </div>

        {/* Location strip */}
        <Reveal delay={0.1} className="mt-3 md:mt-5">
          <div className="flex flex-col gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between md:rounded-[2rem] md:px-7 md:py-5">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-cream">
                <Pin className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <p className="font-heading text-[16px] font-bold text-white">Anandha Yazh · {CONTACT.location}</p>
                <p className="mt-1 text-[13px] text-cream/60">Mental Health &amp; Wellbeing Centre — full address &amp; timings coming soon</p>
              </div>
            </div>
            <p className="font-display text-[15px] italic text-[#F6B79E] sm:text-right">Nurturing young minds</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
