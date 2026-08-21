import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import type { NewsArticle } from '../../types/news';

interface BreakingTickerProps {
  news: NewsArticle[];
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({ news }) => {
  if (!news.length) return null;

  const tickerItems = [...news, ...news]; // duplicate for seamless loop

  return (
    <div
      className="text-white flex items-stretch overflow-hidden"
      style={{ background: 'var(--brand-purple)' }}
    >
      {/* Label */}
      <div
        className="flex items-center gap-2 px-3 sm:px-4 py-2 flex-shrink-0 z-10"
        style={{ background: 'var(--brand-yellow)', color: 'var(--brand-purple)' }}
      >
        <motion.div
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          <AlertTriangle className="h-3.5 w-3.5" style={{ fill: 'var(--brand-purple)', stroke: 'var(--brand-purple)' }} />
        </motion.div>
        <span className="text-xs font-black uppercase tracking-widest whitespace-nowrap">
          Última Hora
        </span>
      </div>

      {/* Scrolling ticker */}
      <div className="relative flex-1 overflow-hidden">
        <motion.div
          className="flex items-center gap-0 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              duration: 30,
              ease: 'linear',
            },
          }}
        >
          {tickerItems.map((item, i) => (
            <a
              key={`${item.id}-${i}`}
              href={`/noticia/${item.slug}`}
              className="inline-flex items-center gap-4 px-5 py-2.5 text-xs font-medium whitespace-nowrap text-purple-100 hover:text-white transition-colors"
            >
              <span className="font-black" style={{ color: 'var(--brand-yellow)' }}>▶</span>
              {item.title}
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
