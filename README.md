# Anandha Yazh — Homepage (Phase 1)

Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · GSAP ScrollTrigger · Framer Motion

## Run
    npm install
    npm run dev          # http://localhost:3000
    npm run build && npm start

Static, relative-path export (for previews / static hosting):
    PREVIEW_EXPORT=1 npx next build   # outputs ./out

## Structure
- `app/` — layout (SEO metadata, JSON-LD MedicalClinic), page, global styles/tokens
- `components/hero/` — image hero + auto-sliding "How we help" strip
- `components/` — Services, Concerns, Ages, Doctor, Approach, ParentsCorner, Contact, Footer, Nav
- `components/ui/` — Explore drawer (service details / booking / profile / articles), Reveal, Cursor, Logo
- `lib/data.ts` — ALL homepage copy and data in one place

## Performance & accessibility
- Images: drop service photos at public/images/services/<id>.jpg and set `image` in lib/data.ts (placeholders show the suggested photo until then)
- Skip link, focus styles, keyboard-closable dialogs, semantic sections

## Before publication (to confirm with the clinic)
- Service categories & descriptions (`SERVICES`) and concern explanations (`CONCERNS`) are proposed copy
- Parent's Corner articles are labelled placeholders
- Street address, clinic timings, social links, privacy policy — placeholders
- Booking, full service pages and full doctor profile are marked "next phase"
