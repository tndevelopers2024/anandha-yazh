import { CONTACT, DOCTOR, NAV, SERVICES } from '@/lib/data';
import Logo from './ui/Logo';
import { Mail, Phone, WhatsApp } from './ui/Icons';

const SOCIAL = ['Instagram', 'Facebook', 'YouTube', 'LinkedIn'];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden text-teal-deep">
      {/* soft brand gradient */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBF6EF] via-[#FDF1EA] to-[#EEF6F2]" />
        <div className="absolute -left-[10%] top-[10%] h-[40vmax] w-[40vmax] rounded-full bg-[radial-gradient(circle,rgba(244,201,184,0.55),rgba(244,201,184,0)_62%)]" />
        <div className="absolute -right-[10%] bottom-0 h-[40vmax] w-[40vmax] rounded-full bg-[radial-gradient(circle,rgba(182,163,230,0.25),rgba(182,163,230,0)_62%)]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 pb-8 pt-14 sm:px-8 md:pt-20">
        {/* Brand band — logo centred, taglines either side */}
        <div className="flex flex-col items-center border-b border-teal-deep/10 pb-10 text-center md:pb-12">
          <div className="grid w-full items-center gap-5 md:grid-cols-[1fr_auto_1fr] md:gap-10">
            <p className="display order-2 hidden text-2xl italic md:order-1 md:block md:text-right lg:text-[1.9rem]">A safe space for everyone</p>
            <div className="order-1 flex items-center justify-center gap-6 md:order-2 md:gap-10">
              <span aria-hidden className="hidden h-14 w-px bg-teal-deep/20 md:block" />
              <Logo className="w-44 md:w-52" />
              <span aria-hidden className="hidden h-14 w-px bg-teal-deep/20 md:block" />
            </div>
            <p className="order-3 hidden font-display text-2xl italic text-coral md:block md:text-left lg:text-[1.9rem]">Nurturing young minds</p>
            {/* mobile: one line with a pipe */}
            <p className="order-2 flex items-center justify-center gap-2.5 whitespace-nowrap font-display text-[clamp(0.78rem,3.7vw,1.2rem)] italic md:hidden">
              <span>A safe space for everyone</span>
              <span aria-hidden className="h-5 w-px bg-teal-deep/25" />
              <span className="text-coral">Nurturing young minds</span>
            </p>
          </div>
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            <a href={`tel:${CONTACT.phones[0].tel}`} className="flex items-center gap-2 rounded-full bg-teal-deep px-4 py-2.5 font-heading text-[13px] font-bold text-cream">
              <Phone className="h-4 w-4" /> {CONTACT.phones[0].display}
            </a>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 font-heading text-[13px] font-bold text-[#073B1F]">
              <WhatsApp className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Links — two columns on mobile */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-8 lg:grid-cols-[1fr_1.4fr]">
            <nav aria-label="Footer">
              <p className="eyebrow text-coral">Explore</p>
              <ul className="mt-4 space-y-2.5 text-[14px]">
                {NAV.map((n) => (
                  <li key={n.href}><a href={n.href} className="text-ink/70 hover:text-coral">{n.label}</a></li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="eyebrow text-coral">Services</p>
              <ul className="mt-4 space-y-2.5 text-[14px]">
                {SERVICES.map((s) => (
                  <li key={s.id}><a href="#services" className="text-ink/70 hover:text-coral">{s.title}</a></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Specialist card */}
          <div className="lg:col-span-4">
            <div className="rounded-[1.5rem] bg-white/70 p-5 shadow-[0_20px_50px_-35px_rgba(22,75,75,0.5)] ring-1 ring-teal-deep/8 backdrop-blur-sm">
              <p className="eyebrow text-coral">Specialist</p>
              <p className="mt-3 font-heading font-extrabold">{DOCTOR.name}</p>
              <p className="text-[13.5px] text-ink/60">{DOCTOR.role}</p>
              <p className="mt-1 text-[13px] font-semibold text-coral-deep">MBBS · MD · DM (NIMHANS)</p>
              <p className="mt-1 inline-flex rounded-full bg-[#FFF1D0] px-2 py-0.5 font-heading text-[11px] font-bold text-[#7A5A12]">★ Gold Medallist</p>
              <p className="mt-3 text-[12px] text-ink/50">TNMC Reg. No. 125556</p>
              <div className="mt-4 space-y-1.5 border-t border-teal-deep/10 pt-4 text-[13.5px]">
                {CONTACT.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className="flex items-center gap-2 hover:text-coral"><Phone className="h-3.5 w-3.5" /> {p.display}</a>
                ))}
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 break-all hover:text-coral"><Mail className="h-3.5 w-3.5" /> {CONTACT.email}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Social */}
        <ul className="mt-10 flex flex-wrap gap-2" aria-label="Social media (coming soon)">
          {SOCIAL.map((s) => (
            <li key={s}>
              <span className="inline-block rounded-full border border-teal-deep/15 bg-white/50 px-3.5 py-1.5 text-xs font-semibold text-teal-deep/60" title="Link coming soon">
                {s}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-[1.25rem] bg-white/60 p-5 text-[12.5px] leading-relaxed text-ink/60 ring-1 ring-teal-deep/8">
          <strong className="font-heading text-teal-deep">Medical disclaimer.</strong> The information on this website is for
          general education and awareness only. It is not a substitute for professional medical advice, diagnosis or
          treatment. Please consult a qualified professional about your child’s specific needs. In an emergency, call{' '}
          <strong>112</strong> or go to the nearest hospital emergency department. For mental health support, India’s
          Tele-MANAS helpline is available on <strong>14416</strong>.
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative bg-gradient-to-r from-[#164B4B] via-[#1E6A69] to-[#164B4B] text-cream/75">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-5 py-4 text-[12px] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Anandha Yazh · Mental Health &amp; Wellbeing Centre</p>
          <div className="flex gap-5">
            <a href="#privacy" className="hover:text-white">Privacy Policy (coming soon)</a>
            <a href="#terms" className="hover:text-white">Terms (coming soon)</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
