'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'p' | 'span';
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </M>
  );
}

const wordVariants: Variants = {
  hidden: { y: '110%', rotate: 4 },
  show: (i: number) => ({
    y: '0%',
    rotate: 0,
    transition: { duration: 1.1, delay: i * 0.06, ease },
  }),
};

/** Word-by-word masked headline reveal. Use `*word*` for italic emphasis. */
export function SplitHeading({
  text,
  className = '',
  as: Tag = 'h2',
  emClass = 'italic',
  id,
  immediate = false,
  delay = 0,
  play = true,
}: {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  emClass?: string;
  id?: string;
  immediate?: boolean;
  delay?: number;
  play?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      id={id}
      className={className}
      initial={reduce ? 'show' : 'hidden'}
      {...(immediate ? { animate: play ? 'show' : 'hidden' } : { whileInView: 'show' })}
      viewport={{ once: true, margin: '-10% 0px' }}
      aria-label={text.replace(/\*|\| /g, '')}
    >
      {words.map((w, i) => {
        if (w === '|') return <br key={i} className="hidden lg:block" />;
        const em = w.startsWith('*');
        const clean = w.replace(/\*/g, '');
        return (
          <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-top">
            <motion.span
              className={`inline-block ${em ? emClass : ''}`}
              variants={wordVariants}
              custom={i + delay * 16}
            >
              {clean}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        );
      })}
    </MotionTag>
  );
}
