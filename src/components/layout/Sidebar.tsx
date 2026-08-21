import React from 'react';
import { TrendingUp, Flame, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import type { NewsArticle } from '../../types/news';
import { AdBanner } from '../ui/AdBanner';
import { Link } from 'react-router-dom';

interface SidebarProps {
  mostRead: NewsArticle[];
}

function formatViews(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export const Sidebar: React.FC<SidebarProps> = ({ mostRead }) => {
  return (
    <aside className="space-y-6 sm:space-y-8">
      {/* Most Read Widget */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        <div
          className="flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-4 border-b border-neutral-100 dark:border-neutral-800"
          style={{ background: 'var(--brand-purple)' }}
        >
          <Flame className="h-4 w-4" style={{ color: 'var(--brand-yellow)' }} />
          <h3 className="font-black text-sm text-white uppercase tracking-wide">
            Mais Lidas
          </h3>
        </div>
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {mostRead.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Link
                to={`/noticia/${article.slug}`}
                className="flex gap-3 p-3 sm:p-4 group hover:bg-neutral-50 dark:hover:bg-neutral-800/70 transition-colors"
              >
                <span
                  className="text-2xl sm:text-3xl font-black leading-none w-7 sm:w-8 flex-shrink-0 pt-0.5"
                  style={{ color: 'var(--brand-yellow)' }}
                >
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 transition-colors line-clamp-2 leading-snug"
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-purple)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                  >
                    {article.title}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-neutral-400 dark:text-neutral-500">
                    <TrendingUp className="h-3 w-3" />
                    <span>{formatViews(article.views)} visualizações</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ad Banner 300x250 */}
      <div className="flex justify-center">
        <AdBanner format="300x250" />
      </div>

      {/* Newsletter / WhatsApp VIP */}
      <div
        className="rounded-2xl p-4 sm:p-5 text-white"
        style={{
          background: 'linear-gradient(135deg, var(--brand-purple) 0%, var(--brand-purple-mid) 100%)',
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Mail className="h-5 w-5" style={{ color: 'var(--brand-yellow)' }} />
          <h3 className="font-black text-sm uppercase tracking-wide">Canal VIP</h3>
        </div>
        <p className="text-sm text-purple-200 mb-4 leading-relaxed">
          Receba as notícias mais importantes diretamente no seu WhatsApp antes de todo mundo.
        </p>
        <a
          href="https://wa.me"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 font-black text-sm px-4 py-2.5 rounded-xl transition-all w-full"
          style={{
            background: 'var(--brand-yellow)',
            color: 'var(--brand-purple)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--brand-yellow-dark)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--brand-yellow)')}
        >
          Entrar no Grupo VIP
        </a>
      </div>

      {/* Second Ad Banner */}
      <div className="flex justify-center">
        <AdBanner format="300x250" label="Apoie o Jaboatão Ordinário" />
      </div>
    </aside>
  );
};
