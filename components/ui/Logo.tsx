import { asset } from '@/lib/data';

/**
 * The original Anandha Yazh logo, untouched (white background removed only).
 * Always place it on a light surface — on dark sections wrap it in <LogoPlate>.
 */
export default function Logo({ className = '', alt = 'Anandha Yazh — Mental Health & Wellbeing Centre' }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset('/images/anandha-yazh-logo-1000.png')}
      alt={alt}
      width={1000}
      height={537}
      className={`h-auto select-none ${className}`}
      draggable={false}
    />
  );
}

export function LogoPlate({ className = '', logoClass = 'w-40' }) {
  return (
    <div className={`inline-flex rounded-[1.75rem] bg-cream px-6 py-5 ${className}`}>
      <Logo className={logoClass} />
    </div>
  );
}
