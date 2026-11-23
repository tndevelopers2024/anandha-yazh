'use client';

import { motion } from 'framer-motion';
import { DOCTOR } from '@/lib/data';

const ease = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  { degree: 'MBBS', level: 'Foundation', field: 'Bachelor of Medicine & Surgery', place: 'Madras Medical College', city: 'Chennai', tone: 'cream' as const, h: 'sm:min-h-[200px]' },
  { degree: 'MD', level: 'Specialisation', field: 'Psychiatry — adult mental health care', place: 'Central Institute of Psychiatry', city: 'Ranchi', tone: 'teal' as const, h: 'sm:min-h-[240px]' },
  { degree: 'DM', level: 'Super-speciality', field: 'Child & Adolescent Psychiatry', place: 'NIMHANS', city: 'Bengaluru', tone: 'gold' as const, h: 'sm:min-h-[285px]' },
];

const TONE = {
  cream: { card: 'bg-[#FBF6EF] border border-teal-deep/10 text-teal-deep', deg: 'text-coral-deep', sub: 'text-ink/55', tag: 'bg-teal-deep/8 text-teal-deep' },
  teal: { card: 'bg-teal-deep text-cream', deg: 'text-coral', sub: 'text-cream/65', tag: 'bg-cream/12 text-cream' },
  gold: { card: 'bg-gradient-to-br from-[#F6DE9C] via-[#E9C46A] to-[#C99A3C] text-[#3D2B05] shadow-[0_30px_60px_-25px_rgba(160,115,20,0.6)]', deg: 'text-[#3D2B05]', sub: 'text-[#3D2B05]/70', tag: 'bg-white/45 text-[#3D2B05]' },
};

function Medal({ className = 'h-12 w-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path d="M15 3h7l4 13h-9zM33 3h-7l-4 13h9z" fill="#164B4B" />
      <circle cx="24" cy="30" r="14" fill="#FFF6DD" />
      <circle cx="24" cy="30" r="11" fill="#E9C46A" stroke="#B8902F" strokeWidth="1.2" />
      <path d="m24 23 2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7z" fill="#FFF8E5" />
    </svg>
  );
}

export default function Credentials() {
  return (
    <div className="mt-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-coral">The academic journey</p>
          <p className="mt-2 font-display text-[1.45rem] leading-snug text-teal-deep sm:text-[1.7rem]">
            Trained at India’s finest <em className="italic text-coral">institutions.</em>
          </p>
        </div>
      </div>

      {/* Mobile — compact timeline */}
      <ol className="relative mt-5 space-y-2.5 pl-6 sm:hidden">
        <span aria-hidden className="absolute bottom-5 left-[7px] top-5 w-[2px] rounded-full bg-gradient-to-b from-teal-deep/20 via-coral/70 to-[#E9C46A]" />
        {STEPS.map((s, i) => {
          const t = TONE[s.tone];
          return (
            <motion.li
              key={s.degree}
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease }}
            >
              <span
                aria-hidden
                className={`absolute -left-6 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full ring-4 ring-white ${
                  s.tone === 'gold' ? 'bg-[#E9C46A]' : s.tone === 'teal' ? 'bg-teal-deep' : 'border border-teal-deep/25 bg-[#FBF6EF]'
                }`}
              />
              <div className={`flex items-center gap-4 rounded-2xl px-4 py-3.5 ${t.card}`}>
                <p className={`display w-[78px] shrink-0 text-[1.9rem] !leading-none ${t.deg}`}>{s.degree}</p>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className={`font-heading text-[9.5px] font-extrabold uppercase tracking-[0.14em] ${t.sub}`}>{s.level}</p>
                  <p className="mt-1 font-heading text-[14px] font-bold">{s.field}</p>
                  <p className={`mt-0.5 text-[12px] ${t.sub}`}>{s.place}, {s.city}</p>
                  {s.tone === 'gold' && (
                    <p className="mt-1.5 inline-flex rounded-full bg-[#3D2B05] px-2 py-0.5 font-heading text-[10.5px] font-bold text-[#F6DE9C]">★ Gold Medallist</p>
                  )}
                </div>
                {s.tone === 'gold' && <Medal className="h-10 w-10 shrink-0" />}
              </div>
            </motion.li>
          );
        })}
      </ol>

      {/* Tablet & desktop — rising podium */}
      <div className="relative mt-6 hidden sm:block">
        <svg aria-hidden viewBox="0 0 600 120" preserveAspectRatio="none" className="pointer-events-none absolute -top-4 left-0 h-24 w-full">
          <motion.path
            d="M40 110 C 160 100, 240 70, 300 60 S 470 20, 570 8"
            fill="none"
            stroke="#E58A68"
            strokeWidth="1.6"
            strokeDasharray="5 7"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease }}
          />
        </svg>
        <ol className="relative grid grid-cols-3 items-end gap-3 lg:gap-4">
          {STEPS.map((s, i) => {
            const t = TONE[s.tone];
            return (
              <motion.li
                key={s.degree}
                className={`relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] p-5 ${t.card} ${s.h}`}
                style={{ transformOrigin: 'bottom' }}
                initial={{ opacity: 0, scaleY: 0.6, y: 30 }}
                whileInView={{ opacity: 1, scaleY: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.15, ease }}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className={`rounded-full px-2.5 py-1 font-heading text-[9.5px] font-extrabold uppercase tracking-[0.14em] ${t.tag}`}>{s.level}</span>
                    {s.tone === 'gold' && <Medal className="-mr-1 -mt-1 h-12 w-12 shrink-0" />}
                  </div>
                  <p className={`display mt-3 text-[clamp(2.2rem,3vw,2.9rem)] !leading-none ${t.deg}`}>{s.degree}</p>
                  <p className="mt-2 font-heading text-[14px] font-bold leading-snug">{s.field}</p>
                </div>
                <div>
                  {s.tone === 'gold' && (
                    <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#3D2B05] px-3 py-1.5 font-heading text-[11.5px] font-bold text-[#F6DE9C]">
                      ★ Gold Medallist
                    </p>
                  )}
                  <div className={`border-t pt-3 ${s.tone === 'cream' ? 'border-teal-deep/10' : s.tone === 'teal' ? 'border-cream/15' : 'border-[#3D2B05]/15'}`}>
                    <p className="font-heading text-[13.5px] font-bold leading-snug">{s.place}</p>
                    <p className={`text-[12.5px] ${t.sub}`}>{s.city}</p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>

      <p className="mt-5 flex items-center gap-2 text-[12.5px] text-ink/55">
        <span className="h-1.5 w-1.5 rounded-full bg-teal" />
        {DOCTOR.registration} · Tamil Nadu Medical Council
      </p>
    </div>
  );
}
