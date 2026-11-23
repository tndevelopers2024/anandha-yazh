import type { Metadata, Viewport } from 'next';
import './globals.css';

// TODO before launch: set NEXT_PUBLIC_SITE_URL to the live domain (used for canonical + share image URLs).
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://anandha-yazh.vercel.app';
const TITLE = 'Child Psychiatrist in Chennai | Anandha Yazh – Mental Health & Wellbeing Centre';
const DESCRIPTION =
  'Mental Health & Wellbeing Centre, Chennai. NIMHANS gold medallist Dr. Dharani Ramamoorthy (MBBS, MD, DM) — autism & ADHD assessment, learning difficulties, anxiety, behaviour & teen mental health; for adults, depression, anxiety & OCD, stress & sleep, de-addiction and women’s & elderly mental health. Call 75020 76929.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: 'Anandha Yazh',
  keywords: [
    'child psychiatrist in Chennai',
    'child and adolescent psychiatrist Chennai',
    'pediatric psychiatrist Chennai',
    'child psychiatry clinic Chennai',
    'adolescent psychiatrist Chennai',
    'child mental health specialist Chennai',
    'child specialist doctor Chennai',
    'autism assessment Chennai',
    'autism diagnosis for children',
    'ADHD assessment for children',
    'ADHD treatment for children Chennai',
    'child developmental assessment Chennai',
    'speech delay and developmental delay evaluation',
    'learning disability assessment Chennai',
    'dyslexia test for child',
    'child anxiety treatment',
    'school refusal treatment',
    'childhood depression treatment',
    'OCD in children',
    'sleep problems and bedwetting in children',
    'aggressive behaviour in children',
    'tantrums in children',
    'anger management for children',
    'violent outbursts in teenagers',
    'behavioural therapy for children',
    'parent training and counselling Chennai',
    'teenage depression treatment Chennai',
    'exam stress counselling for students',
    'screen addiction in children',
    'gaming addiction in teenagers',
    'substance use in teenagers',
    'psychiatrist in Chennai',
    'adult psychiatrist Chennai',
    'de-addiction centre Chennai',
    'depression treatment Chennai',
    'anxiety treatment Chennai',
    'mental health clinic Chennai',
    'Dr. Dharani Ramamoorthy',
    'Anandha Yazh',
  ],
  authors: [{ name: 'Dr. Dharani Ramamoorthy' }],
  category: 'health',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'Anandha Yazh — Mental Health & Wellbeing Centre',
    title: 'Child Psychiatrist in Chennai — Dr. Dharani Ramamoorthy, NIMHANS Gold Medallist',
    description:
      'Mental Health & Wellbeing Centre, Chennai. Autism & ADHD assessment, learning difficulties, anxiety, behaviour and teen mental health. For adults: depression, anxiety & OCD, stress & sleep, de-addiction, and women’s & elderly mental health.',
    images: [{ url: '/og-image-2.jpg', width: 1200, height: 630, alt: 'Anandha Yazh — Mental Health & Wellbeing Centre, Chennai. Care for children, teens and adults with Dr. Dharani Ramamoorthy, MBBS, MD, DM (NIMHANS).' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Child Psychiatrist in Chennai — Dr. Dharani Ramamoorthy',
    description: 'Mental Health & Wellbeing Centre, Chennai. Autism, ADHD, learning, anxiety & teen mental health; depression, anxiety, de-addiction & more for adults.',
    images: ['/og-image-2.jpg'],
  },
  icons: {
    icon: [
      { url: './favicon.ico', sizes: 'any' },
      { url: './favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: './icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [{ url: './apple-touch-icon.png', sizes: '180x180' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#FFF9F2',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalClinic',
      '@id': `${SITE_URL}/#clinic`,
      name: 'Anandha Yazh — Mental Health & Wellbeing Centre',
      url: SITE_URL,
      image: `${SITE_URL}/og-image-2.jpg`,
      logo: `${SITE_URL}/icon-512.png`,
      slogan: 'A safe space for everyone.',
      description: DESCRIPTION,
      medicalSpecialty: ['Psychiatric', 'Pediatric'],
      telephone: ['+91 75020 76929', '+91 86674 13791'],
      email: 'dharuridu@gmail.com',
      areaServed: { '@type': 'City', name: 'Chennai' },
      address: { '@type': 'PostalAddress', addressLocality: 'Chennai', addressRegion: 'Tamil Nadu', addressCountry: 'IN' },
      availableService: [
        'Child & Adolescent Psychiatry', 'Autism & Neurodevelopmental Care', 'ADHD & Attention Difficulties',
        'Specific Learning Disorder', 'Intellectual Developmental Disorder', 'Emotional & Behavioural Wellbeing',
        'Adolescent Mental Health', 'Psychotherapeutic Interventions', 'Parent & Family Support',
        'Adult Psychiatry', 'Depression Treatment', 'Anxiety & OCD Treatment', 'Trauma & PTSD Care',
        'Schizophrenia & Psychosis Care', 'Sleep & Stress Management', 'De-addiction Services',
        "Women's & Perinatal Mental Health", 'Geriatric Mental Health & Dementia Care',
      ].map((name) => ({ '@type': 'MedicalTherapy', name })),
    },
    {
      '@type': 'Physician',
      '@id': `${SITE_URL}/#doctor`,
      name: 'Dr. Dharani Ramamoorthy',
      jobTitle: 'Child, Adolescent & Adult Psychiatrist',
      image: `${SITE_URL}/images/dr-dharani-ramamoorthy.jpg`,
      medicalSpecialty: 'Psychiatric',
      worksFor: { '@id': `${SITE_URL}/#clinic` },
      knowsLanguage: ['ta', 'en', 'hi', 'te', 'kn'],
      award: 'Gold Medal — DM Child & Adolescent Psychiatry, NIMHANS',
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'National Institute of Mental Health and Neuro Sciences (NIMHANS)' },
        { '@type': 'CollegeOrUniversity', name: 'Central Institute of Psychiatry, Ranchi' },
        { '@type': 'CollegeOrUniversity', name: 'Madras Medical College' },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,400&family=Manrope:wght@400;500;600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-teal-deep focus:px-5 focus:py-3 focus:text-cream"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
