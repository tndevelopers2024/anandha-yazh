import { asset } from '@/lib/data';

/**
 * Shows a real photograph when `src` is set; otherwise an elegant, clearly
 * labelled placeholder describing the photo to source.
 */
export default function Photo({
  src,
  alt,
  brief,
  tint = '#E58A68',
  className = '',
  imgClassName = '',
}: {
  src?: string;
  alt: string;
  brief: string;
  tint?: string;
  className?: string;
  imgClassName?: string;
}) {
  if (src) {
    return (
      <div className={`overflow-hidden ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(src)} alt={alt} loading="lazy" className={`h-full w-full object-cover ${imgClassName}`} />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${brief}`}
      className={`relative flex items-end overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 20% 10%, ${tint}38, transparent 60%), radial-gradient(90% 80% at 90% 100%, ${tint}26, transparent 60%), #F6F1EA`,
      }}
    >
      <svg aria-hidden viewBox="0 0 24 24" className="absolute right-4 top-4 h-5 w-5 text-ink/25" fill="none">
        <rect x="3" y="6" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 6l1.5-2h5L16 6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <p className="relative m-4 max-w-[90%] rounded-xl bg-white/70 px-3 py-2 text-[12px] leading-snug text-ink/60 backdrop-blur-sm">
        <span className="font-heading font-bold text-ink/70">Photo · </span>
        {brief}
      </p>
    </div>
  );
}
