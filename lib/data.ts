/**
 * Anandha Yazh — homepage content.
 *
 * NOTE: Service categories, descriptions and parent-concern explanations are
 * PROPOSED copy and must be verified by the clinic before publication.
 * Placeholder articles are labelled as such in the UI.
 */

export const asset = (p: string) =>
  `${process.env.NEXT_PUBLIC_ASSET_BASE ?? ''}${p.startsWith('/') ? p : `/${p}`}`;

export const CONTACT = {
  name: 'Anandha Yazh',
  descriptor: 'Mental Health & Wellbeing Centre',
  tagline: 'A safe space for everyone.',
  phones: [
    { display: '75020 76929', tel: '+917502076929' },
    { display: '86674 13791', tel: '+918667413791' },
  ],
  whatsapp: 'https://wa.me/917502076929?text=' +
    encodeURIComponent('Hello Anandha Yazh, I would like to book an appointment.'),
  email: 'anandhayazh.clinic@gmail.com',
  location: 'Chennai, Tamil Nadu, India',
};

export const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'Explore Concerns', href: '#concerns' },
  { label: 'Our Services', href: '#services' },
  { label: 'Meet the Doctor', href: '#doctor' },
  { label: 'Our Approach', href: '#approach' },
  { label: "Parent's Corner", href: '#parents-corner' },
  { label: 'Contact', href: '#contact' },
];

export type Service = {
  id: string;
  no: string;
  title: string;
  short: string;
  long: string;
  areas: string[];
  color: string;
  ink: string;
  /** Suggested photograph — drop a file at /public/images/services/<id>.jpg and set `image`. */
  photo: string;
  image?: string;
};

export const SERVICES: Service[] = [
  {
    id: 'psychiatry',
    no: '01',
    title: 'Child & Adolescent Psychiatry',
    short: "Comprehensive child and adolescent psychiatry in Chennai — careful evaluation and care, made for young minds.",
    long:
      'A thorough evaluation of your child’s emotional, behavioural and developmental wellbeing — listening to your child, to you, and to the people who know them best — followed by a clear, collaborative plan of care.',
    areas: ["Child psychiatric evaluation", "Diagnostic clarity", "Medication guidance where appropriate", "Coordinated care with schools & therapists"],
    color: '#E58A68',
    ink: '#FFF9F2',
    photo: 'A calm consultation — doctor listening to a parent and child',
  },
  {
    id: 'autism',
    no: '02',
    title: 'Autism & Neurodevelopmental Care',
    short: "Autism assessment and diagnosis for children, with support built around how your child experiences the world.",
    long:
      'Neurodevelopmental assessment and ongoing support for autistic children and their families, with attention to communication, sensory needs, behaviour, and co-occurring emotional difficulties.',
    areas: ["Autism assessment & diagnosis", "Speech & developmental delay evaluation", "Behavioural & developmental support", "Family guidance"],
    color: '#2CA6A5',
    ink: '#FFFFFF',
    photo: 'A child absorbed in sorting or lining up colourful objects',
  },
  {
    id: 'adhd',
    no: '03',
    title: 'ADHD & Attention Difficulties',
    short: "ADHD assessment and treatment for children — when focus, restlessness or impulsivity get in the way.",
    long:
      'Assessment and individualised management of attention, activity and impulse-control difficulties — at home, in school and with friends — combining practical strategies with clinical care.',
    areas: ["ADHD assessment", "Home & school strategies", "Parent training", "Clinical management"],
    color: '#F2B544',
    ink: '#164B4B',
    photo: 'A child mid-movement, full of energy, at a study table',
  },
  {
    id: 'sld',
    no: '04',
    title: 'Specific Learning Disorder',
    short: "Learning difficulties assessment for bright children who find reading, writing or maths unexpectedly hard.",
    long:
      'Identifying specific difficulties with reading, writing or mathematics, understanding their impact, and guiding families and schools towards the right accommodations and support.',
    areas: ["Learning disability & dyslexia assessment", "School collaboration", "Accommodation guidance", "Emotional impact"],
    color: '#F0ECF8',
    ink: '#2B2340',
    photo: 'A child reading with a finger tracing the words',
  },
  {
    id: 'idd',
    no: '05',
    title: 'Intellectual Developmental Disorder',
    short: "Child developmental assessment that recognises each child’s abilities and supports growth at their own pace.",
    long:
      'Developmental and adaptive-functioning assessment, with long-term guidance that focuses on strengths, independence, wellbeing and the needs of the whole family.',
    areas: ["Child developmental assessment", "Developmental delay evaluation", "Adaptive skills & long-term planning", "Caregiver support"],
    color: '#E6F4EF',
    ink: '#164B4B',
    photo: 'A child learning an everyday skill with a caregiver’s help',
  },
  {
    id: 'emotional',
    no: '06',
    title: 'Emotional & Behavioural Wellbeing',
    short: "Anxiety, low mood, OCD, school refusal, tantrums and aggressive behaviour — the feelings behind the behaviour.",
    long:
      'Support for anxiety, low mood, anger, irritability and behavioural difficulties, helping children name what they feel and families respond with confidence and calm.',
    areas: ["Child anxiety & OCD", "Childhood depression", "School refusal", "Tantrums, anger & aggressive behaviour", "Sleep problems & bedwetting"],
    color: '#164B4B',
    ink: '#FFF9F2',
    photo: 'A child hugging a cushion, quiet and thoughtful',
  },
  {
    id: 'adolescent',
    no: '07',
    title: 'Adolescent Mental Health',
    short: "A confidential space for teenagers — depression, exam stress, anger, screen habits and more.",
    long:
      'Care for the emotional realities of the teenage years — stress, anxiety, mood, relationships, identity and academic pressure — delivered with the privacy and respect young people deserve.',
    areas: ["Teenage depression & anxiety", "Exam stress", "Anger & violent outbursts", "Screen & gaming addiction", "Substance use (smoking, vaping)", "Self-harm — urgent, compassionate support"],
    color: '#2B2340',
    ink: '#F0ECF8',
    photo: 'A teenager by a window with headphones, reflective',
  },
  {
    id: 'therapy',
    no: '08',
    title: 'Psychotherapeutic Interventions',
    short: "Behavioural therapy, play therapy, CBT and anger management — practising new ways of coping.",
    long:
      'Evidence-informed therapeutic approaches matched to your child’s age and needs, which may include play therapy, cognitive behavioural therapy (CBT), dialectical behavioural therapy (DBT) and emotion-focused work.',
    areas: ["Behavioural therapy for children", "Play therapy", "CBT & DBT", "Anger management", "Trauma-informed care"],
    color: '#F4C9B8',
    ink: '#164B4B',
    photo: 'Play therapy — hands arranging figures or drawing together',
  },
  {
    id: 'family',
    no: '09',
    title: 'Parent & Family Support',
    short: "Parent training and parent counselling — because when parents feel supported, children feel it too.",
    long:
      'Guidance, parent training and family sessions that help you understand your child’s needs, build confident routines, and work together as a team — at home and with school.',
    areas: ["Parent training & counselling", "Managing aggressive behaviour at home", "Family sessions", "School liaison"],
    color: '#FFF9F2',
    ink: '#164B4B',
    photo: 'Parent and child sitting close, talking',
  },
];

export const CONCERNS = [
  {
    id: 'concentration',
    text: 'My child struggles with concentration.',
    explain:
      'Every child drifts off sometimes. When difficulty focusing, finishing tasks or sitting still shows up across home and school for months, it can help to understand why — it may relate to attention, learning, sleep, worry or something else entirely.',
    service: 'adhd',
  },
  {
    id: 'communication',
    text: 'My child finds communication difficult.',
    explain:
      'Children communicate in many ways. Delayed speech, limited eye contact, difficulty with back-and-forth conversation or with understanding others can have different reasons, and early understanding often makes a meaningful difference.',
    service: 'autism',
  },
  {
    id: 'learning',
    text: 'My child has learning difficulties.',
    explain:
      'When a capable child struggles unusually with reading, spelling, writing or maths, it isn’t laziness. A careful look can reveal specific learning differences — and the right support can change how a child feels about school.',
    service: 'sld',
  },
  {
    id: 'distress',
    text: 'My child experiences emotional distress.',
    explain:
      'Frequent worry, tearfulness, fears, irritability or physical complaints without a clear cause can be a child’s way of saying something feels too big. Understanding the feeling behind it is the first step.',
    service: 'emotional',
  },
  {
    id: 'behaviour',
    text: 'My child struggles with behaviour.',
    explain:
      'Tantrums, defiance or aggression are often signals rather than choices. Looking at what happens before, during and after can help families find calmer, more confident ways forward.',
    service: 'family',
  },
  {
    id: 'withdrawn',
    text: 'My teenager seems withdrawn.',
    explain:
      'Some distance is a normal part of growing up. But a lasting change in mood, sleep, friendships, interest or school performance deserves a gentle, non-judgemental conversation — and sometimes, a specialist’s view.',
    service: 'adolescent',
  },
  {
    id: 'development',
    text: 'I have concerns about my child’s development.',
    explain:
      'Children grow at different paces. If you notice your child is not meeting milestones in movement, speech, play or self-care, a developmental assessment can help you understand where they are and what may help.',
    service: 'idd',
  },
  {
    id: 'school-refusal',
    text: 'My child refuses to go to school.',
    explain:
      'Morning stomach aches, tears at the gate or flat refusal to go are often signs of anxiety, bullying, learning struggles or low mood — not simply stubbornness. Understanding the reason early helps your child return to school with confidence.',
    service: 'emotional',
  },
  {
    id: 'aggression',
    text: 'My child hits, bites or has big tantrums.',
    explain:
      'Hitting, biting, breaking things or explosive tantrums usually mean a child is overwhelmed and doesn’t yet have the words or skills to cope. Behavioural therapy and parent training can bring calmer days for the whole family.',
    service: 'family',
  },
  {
    id: 'speech',
    text: 'My child isn’t talking yet.',
    explain:
      'Some children simply talk later; for others, a speech or developmental delay — sometimes linked to autism or hearing — needs attention. A developmental evaluation gives clarity, and early support makes a real difference.',
    service: 'autism',
  },
  {
    id: 'screens',
    text: 'My child is glued to the phone or games.',
    explain:
      'When screen time crowds out sleep, studies, friends or family — and taking the device away leads to anger — it may be more than a habit. We help families understand what’s driving it and set limits that actually hold.',
    service: 'adolescent',
  },
  {
    id: 'outbursts',
    text: 'My teenager has angry or violent outbursts.',
    explain:
      'Shouting, threats or breaking things can leave parents frightened and exhausted. These outbursts often sit on top of stress, low mood or other difficulties. You don’t have to manage this alone — a specialist can help the whole family feel safe again.',
    service: 'adolescent',
  },
];

export const AGES = [
  {
    id: 'early',
    label: 'Early Childhood',
    range: 'Birth – 5 years',
    photo: 'A toddler playing on the floor with blocks or a parent',
    image: '',
    title: 'The world, discovered.',
    copy:
      'In the earliest years, every sound, gesture and game is a building block. We look closely at how little ones grow, connect, communicate and express what they feel.',
    focus: ['Development', 'Communication', 'Play', 'Behaviour', 'Emotional development'],
  },
  {
    id: 'school',
    label: 'School-Age Children',
    range: '6 – 12 years',
    photo: 'A school child with a backpack, curious and smiling',
    image: '/images/school-age.jpg',
    title: 'The world, explored.',
    copy:
      'School brings new rules, friendships and expectations. We help children and parents make sense of learning, attention, behaviour and the growing world of feelings.',
    focus: ['Learning', 'Attention', 'Behaviour', 'Social interaction', 'Emotional regulation'],
  },
  {
    id: 'teen',
    label: 'Adolescents & Teenagers',
    range: '13 – 18 years',
    photo: 'A teenager in natural light, candid and thoughtful',
    image: '',
    title: 'The world, questioned.',
    copy:
      'The teenage years are intense, complex and full of becoming. We offer young people a confidential, respectful space — and their families a steady guide.',
    focus: ['Mental health', 'Anxiety', 'Mood-related concerns', 'Emotional wellbeing', 'Relationships', 'Academic pressure'],
  },
  {
    id: 'adult',
    label: 'Adults',
    range: '18+ years',
    photo: 'An adult in a calm, sunlit space, looking hopeful',
    image: '',
    title: 'The world, rebalanced.',
    copy:
      'Work, relationships, parenthood and ageing bring their own pressures. We offer adults confidential, specialised psychiatric care — with the same warmth we bring to every child.',
    focus: ['Depression & anxiety', 'Stress & sleep', 'De-addiction', 'Relationships', 'Women’s mental health', 'Ageing'],
  },
];

export const APPROACH = [
  {
    no: '01',
    title: 'Reach Out',
    copy: 'Call, WhatsApp or write to us. Share a little about your child and what’s on your mind — no referral needed to begin a conversation.',
  },
  {
    no: '02',
    title: 'Initial Consultation',
    copy: 'An unhurried first meeting to listen to your concerns, your child’s story and what you hope will change.',
  },
  {
    no: '03',
    title: 'Clinical Assessment',
    copy: 'A careful, age-appropriate evaluation — drawing on observation, conversation and, where needed, structured assessments.',
  },
  {
    no: '04',
    title: 'Individualised Care Plan',
    copy: 'A clear plan built around your child and family, explained in plain language, with your questions welcomed.',
  },
  {
    no: '05',
    title: 'Ongoing Guidance',
    copy: 'Regular follow-ups, adjustments and support for parents and schools as your child grows and changes.',
  },
];

export const ARTICLE_CATEGORIES = [
  'Understanding ADHD',
  'Understanding Autism',
  'Learning Difficulties',
  'Childhood Anxiety',
  'Adolescent Mental Health',
  'Emotional Development',
  'Parenting & Behaviour',
] as const;

export type Article = {
  id: string;
  category: (typeof ARTICLE_CATEGORIES)[number];
  title: string;
  excerpt: string;
  read: string;
  palette: [string, string, string];
};

export const ARTICLES: Article[] = [
  {
    id: 'a1',
    category: 'Understanding ADHD',
    title: 'Is it ADHD, or is my child just energetic?',
    excerpt: 'Placeholder article — a gentle guide to what attention difficulties can look like at home and in the classroom.',
    read: '6 min read',
    palette: ['#F2B544', '#E58A68', '#164B4B'],
  },
  {
    id: 'a2',
    category: 'Understanding Autism',
    title: 'Seeing the world differently: early signs of autism',
    excerpt: 'Placeholder article — understanding communication, play and sensory differences in young children.',
    read: '8 min read',
    palette: ['#2CA6A5', '#E6F4EF', '#164B4B'],
  },
  {
    id: 'a3',
    category: 'Learning Difficulties',
    title: 'When reading feels like a puzzle',
    excerpt: 'Placeholder article — how specific learning differences show up, and how schools can help.',
    read: '5 min read',
    palette: ['#F0ECF8', '#2B2340', '#E58A68'],
  },
  {
    id: 'a4',
    category: 'Childhood Anxiety',
    title: 'Little worries, big feelings',
    excerpt: 'Placeholder article — helping children name and navigate anxious thoughts.',
    read: '4 min read',
    palette: ['#F4C9B8', '#E58A68', '#FFF9F2'],
  },
  {
    id: 'a5',
    category: 'Adolescent Mental Health',
    title: 'How to talk to a teenager who doesn’t want to talk',
    excerpt: 'Placeholder article — staying connected through the quiet years.',
    read: '7 min read',
    palette: ['#2B2340', '#F0ECF8', '#2CA6A5'],
  },
  {
    id: 'a6',
    category: 'Emotional Development',
    title: 'The language of feelings, from toddlers to tweens',
    excerpt: 'Placeholder article — building emotional vocabulary at every age.',
    read: '5 min read',
    palette: ['#E6F4EF', '#2CA6A5', '#F2B544'],
  },
  {
    id: 'a7',
    category: 'Parenting & Behaviour',
    title: 'Calm is contagious: responding to meltdowns',
    excerpt: 'Placeholder article — practical, compassionate strategies for hard moments.',
    read: '6 min read',
    palette: ['#164B4B', '#E58A68', '#FFF9F2'],
  },
];

export const DOCTOR = {
  name: 'Dr. Dharani Ramamoorthy',
  role: 'Child, Adolescent & Adult Psychiatrist',
  creds: 'DM (NIMHANS) · MD (CIP) · MBBS (MMC)',
  intro:
    'A psychiatrist by choice, with a passion for child development and student mental health. Dr. Dharani brings together psychopharmacology, behavioural interventions and multidisciplinary care — working alongside clinical psychologists and social workers to understand each child as a whole person. Her MD in Psychiatry also allows her to care for adults, while children and adolescents remain her super-speciality.',
  qualifications: [
    { degree: 'DM', field: 'Child & Adolescent Psychiatry', place: 'NIMHANS, Bengaluru' },
    { degree: 'MD', field: 'Psychiatry', place: 'Central Institute of Psychiatry, Ranchi' },
    { degree: 'MBBS', field: 'Medicine', place: 'Madras Medical College, Chennai' },
  ],
  medal: { title: 'Gold Medallist', detail: 'DM Child & Adolescent Psychiatry, NIMHANS' },
  registration: 'TNMC Reg. No. 125556',
  expertise: [
    'Neurodevelopmental assessment (ASD, ADHD, SLD, IDD)',
    'Emotional & behavioural disorders',
    'Psychopharmacology',
    'Parent Management Training',
    'Play therapy',
    'CBT & DBT',
    'Trauma-informed care',
    'tDCS & rTMS neuromodulation',
  ],
  languages: ['English', 'Tamil', 'Hindi', 'Telugu', 'Kannada'],
};

/** Adult services — proposed; to be verified by the clinic. */
export type AdultService = { id: string; no: string; title: string; short: string; desc: string; tags: string[]; color: string; photo: string; image?: string };

export const ADULT_SERVICES: AdultService[] = [
  { id: 'mood', no: '01', title: 'Mood & Emotional Disorders', short: 'Mood & Emotional Disorders',
    desc: 'Care for low mood, mood swings and life transitions that feel too heavy to carry alone.',
    color: '#6B8FB8', photo: 'An adult sitting by a window in soft morning light, reflective',
    tags: ['Depression', 'Bipolar disorder', 'Adjustment disorder', 'Grief & bereavement'] },
  { id: 'anxiety', no: '02', title: 'Anxiety, Trauma & Obsessive-Compulsive Disorders', short: 'Anxiety, Trauma & OCD',
    desc: 'Evidence-based treatment for persistent worry, panic, intrusive thoughts and the effects of trauma.',
    color: '#2CA6A5', photo: 'Hands calmly holding a cup of tea — a moment of calm',
    tags: ['Generalized anxiety', 'Panic disorder', 'Phobias', 'OCD', 'PTSD & trauma-related disorders'] },
  { id: 'severe', no: '03', title: 'Severe & Complex Mental Health Conditions', short: 'Severe & Complex Conditions',
    desc: 'Careful, long-term psychiatric care for complex conditions, working closely with families.',
    color: '#8C78C8', photo: 'A supportive conversation between a family member and an adult',
    tags: ['Schizophrenia', 'Psychosis', 'Personality disorders'] },
  { id: 'sleep', no: '04', title: 'Sleep, Stress & Lifestyle Concerns', short: 'Sleep, Stress & Lifestyle Concerns',
    desc: 'Help when sleep, work pressure or unexplained physical symptoms start to wear you down.',
    color: '#3E5C8A', photo: 'A peaceful bedroom at dusk, soft lamp light',
    tags: ['Insomnia', 'Sleep disorders', 'Workplace stress', 'Burnout', 'Somatic symptom disorders'] },
  { id: 'addiction', no: '05', title: 'Addiction & De-addiction Services', short: 'Addiction & De-addiction Services',
    desc: 'Confidential, non-judgemental support to break free from habits that have taken control.',
    color: '#E58A68', photo: 'Two people talking openly in a calm, private setting',
    tags: ['Alcohol use disorder', 'Substance use', 'Tobacco & smoking cessation', 'Gambling addiction', 'Internet & gaming addiction'] },
  { id: 'women', no: '06', title: "Relationship & Women's Mental Health", short: "Relationship & Women's Mental Health",
    desc: 'Support through relationship strain and the emotional changes of pregnancy and motherhood.',
    color: '#D9867A', photo: 'A new mother holding her baby, gentle and warm',
    tags: ['Relationship & marital issues', "Women's mental health", 'Perinatal mental health', 'Postpartum mental health'] },
  { id: 'geriatric', no: '07', title: 'Geriatric & Ageing-Related Mental Health', short: 'Geriatric Mental Health',
    desc: 'Gentle, respectful care for older adults and guidance for the families who look after them.',
    color: '#B8902F', photo: 'An older adult smiling with a family member',
    tags: ['Geriatric mental health', 'Dementia care'] },
];

export const ADULT_CONCERNS = [
  { id: 'low', text: 'I’ve been feeling low or empty for weeks.',
    explain: 'Everyone has hard days. When sadness, emptiness or loss of interest stays for weeks and affects sleep, work or relationships, it may be depression — and it is very treatable.',
    service: 'mood' },
  { id: 'panic', text: 'I worry all the time or get panic attacks.',
    explain: 'Constant worry, a racing heart or sudden waves of fear can be exhausting. Anxiety and panic respond well to the right mix of therapy and, where needed, medication.',
    service: 'anxiety' },
  { id: 'intrusive', text: 'I can’t stop certain thoughts or rituals.',
    explain: 'Unwanted thoughts that keep returning, or the urge to check, clean or repeat things, may be OCD. It isn’t a personality quirk — specialist care can bring real relief.',
    service: 'anxiety' },
  { id: 'sleep', text: 'I can’t sleep, and stress is wearing me down.',
    explain: 'Poor sleep and constant work pressure feed each other. Understanding what’s behind them helps us build a plan to restore rest and balance.',
    service: 'sleep' },
  { id: 'habits', text: 'I want to cut down on alcohol, smoking or other habits.',
    explain: 'Wanting to change is a strong first step. Confidential, non-judgemental de-addiction care can help you manage cravings and stay on track.',
    service: 'addiction' },
  { id: 'reality', text: 'Someone in my family seems out of touch with reality.',
    explain: 'Hearing voices, unusual beliefs or sudden withdrawal can be frightening for families. Early psychiatric care makes a big difference — and you don’t have to handle it alone.',
    service: 'severe' },
  { id: 'baby', text: 'I’m struggling emotionally since having a baby.',
    explain: 'Feeling overwhelmed, tearful or disconnected after childbirth is more common than many realise. Postpartum mental health care supports both you and your baby.',
    service: 'women' },
  { id: 'memory', text: 'My parent is becoming forgetful or confused.',
    explain: 'Some forgetfulness comes with age, but increasing confusion or personality change deserves a careful look. Assessment helps families plan the right care.',
    service: 'geriatric' },
];
