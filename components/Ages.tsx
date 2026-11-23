import { AGES } from '@/lib/data';
import Photo from './ui/Photo';
import { Reveal, SplitHeading } from './ui/Reveal';

const TONES = [
  { bg: '#FDF1E8', accent: '#C9663F', tint: '#E58A68', text: '#1F2A2A' },
  { bg: '#EAF5F1', accent: '#1E8A89', tint: '#2CA6A5', text: '#1F2A2A' },
  { bg: '#2B2340', accent: '#F4C9B8', tint: '#8C78C8', text: '#F0ECF8' },
  { bg: '#164B4B', accent: '#7FD4D2', tint: '#2CA6A5', text: '#E6F4EF' },
];

export default function Ages() {
  return (
    <section id="ages" aria-labelledby="ages-title" className="relative bg-[#FBF6EF] py-16 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-coral"><span className="h-px w-10 bg-coral" /> Every stage matters</p>
            </Reveal>
            <SplitHeading id="ages-title" text="Different Ages, *Different* Worlds." emClass="italic text-coral" className="display mt-5 text-[clamp(2rem,3.4vw,3.25rem)] text-[#1F2A2A]" />
          </div>
          <Reveal className="md:col-span-4 md:pb-3" delay={0.15}>
            <p className="text-lg leading-relaxed text-[#1F2A2A]/65">
              A toddler, a ten-year-old, a teenager and an adult each live in a very different world. Our care changes with them.
            </p>
          </Reveal>
        </div>

        <div className="-mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:mt-14 lg:grid lg:grid-cols-2 lg:gap-6 xl:grid-cols-4 xl:gap-5 lg:overflow-visible lg:pb-0">
          {AGES.map((a, i) => {
            const t = TONES[i];
            return (
              <Reveal key={a.id} delay={i * 0.1} className="w-[85%] shrink-0 snap-start sm:w-[60%] lg:w-auto">
                <article className="flex h-full flex-col overflow-hidden rounded-[2rem]" style={{ background: t.bg, color: t.text }} aria-labelledby={`age-${a.id}`}>
                  <Photo src={a.image || undefined} brief={a.photo} alt={a.label} tint={t.tint} className="aspect-[4/3] w-full" />
                  <div className="flex flex-1 flex-col p-7 md:p-8">
                    <p className="eyebrow" style={{ color: t.accent }}>{a.range}</p>
                    <h3 id={`age-${a.id}`} className="display mt-3 text-[1.8rem] leading-tight">{a.label}</h3>
                    <p className="mt-1 font-display text-lg italic opacity-70">{a.title}</p>
                    <p className="mt-4 text-[15px] leading-relaxed opacity-75">{a.copy}</p>
                    <ul className="mt-6 flex flex-wrap gap-2 pt-1">
                      {a.focus.map((f) => (
                        <li key={f} className="rounded-full border px-3 py-1.5 text-[13px] font-medium" style={{ borderColor: `${t.accent}55` }}>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
