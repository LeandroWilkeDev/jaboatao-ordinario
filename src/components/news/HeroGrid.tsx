import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Eye, AlertCircle } from 'lucide-react';
import type { NewsArticle } from '../../types/news';
import { CategoryBadge } from '../ui/CategoryBadge';
import { formatDistanceToNow } from '../../utils/date';

interface HeroGridProps {
  featured: NewsArticle;
  secondary: NewsArticle[];
}

export const HeroGrid: React.FC<HeroGridProps> = ({ featured, secondary }) => {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {/* Super Manchete */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Link
            to={`/noticia/${featured.slug}`}
            className="group relative flex flex-col rounded-2xl overflow-hidden bg-neutral-900 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full min-h-[280px] sm:min-h-[340px] md:min-h-[420px]"
          >
            {/* Background Image */}
            <img
              src={featured.imageUrl}
              alt={featured.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

            {/* Breaking Badge */}
            {featured.isBreaking && (
              <div
                className="absolute top-3 left-3 flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg"
                style={{ background: 'var(--brand-yellow)', color: 'var(--brand-purple)' }}
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <AlertCircle className="h-3 w-3" />
                </motion.div>
                Urgente
              </div>
            )}

            {/* Content */}
            <div className="relative mt-auto p-4 sm:p-5 md:p-7 space-y-2 sm:space-y-3">
              <CategoryBadge category={featured.category} size="lg" />
              <h1
                className="font-serif text-lg sm:text-2xl md:text-3xl font-black text-white leading-tight transition-colors"
                style={{ '--hover-color': 'var(--brand-yellow)' } as React.CSSProperties}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-yellow)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '')}
              >
                {featured.title}
              </h1>
              <p className="text-sm md:text-base text-neutral-300 line-clamp-2 leading-relaxed hidden sm:block">
                {featured.subtitle}
              </p>
              <div className="flex items-center gap-3 text-xs text-neutral-400 pt-1 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <img
                    src={featured.author.avatarUrl}
                    alt={featured.author.name}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border border-neutral-600"
                  />
                  <span className="font-medium text-neutral-300 text-[11px] sm:text-xs">{featured.author.name}</span>
                </div>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(new Date(featured.publishedAt))}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {(featured.views / 1000).toFixed(1)}k
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Secondary Cards - mobile: horizontal scroll; sm: grid; lg: vertical stack */}
        <div className="flex gap-3 overflow-x-auto scrollbar-none sm:grid sm:grid-cols-3 sm:overflow-visible lg:flex lg:flex-col lg:gap-4 pb-2 sm:pb-0">
          {secondary.slice(0, 3).map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
              className="flex-shrink-0 w-64 sm:w-auto lg:w-auto"
            >
              <Link
                to={`/noticia/${article.slug}`}
                className="group flex gap-3 bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md transition-all duration-300 h-full"
              >
                <div className="overflow-hidden w-24 sm:hidden lg:block lg:w-24 flex-shrink-0">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                {/* sm: vertical image */}
                <div className="hidden sm:block lg:hidden overflow-hidden w-full aspect-video">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 flex flex-col justify-between min-w-0 flex-1 sm:hidden lg:flex">
                  <div className="space-y-1.5">
                    <CategoryBadge category={article.category} size="sm" />
                    <h3
                      className="font-bold text-sm text-neutral-900 dark:text-neutral-100 transition-colors leading-snug line-clamp-2"
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-purple)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                    >
                      {article.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-neutral-400 flex items-center gap-1 mt-2">
                    <Clock className="h-3 w-3 flex-shrink-0" />
                    {formatDistanceToNow(new Date(article.publishedAt))}
                  </p>
                </div>
                {/* sm-only text below image */}
                <div className="hidden sm:flex lg:hidden p-2 flex-col justify-between flex-1">
                  <CategoryBadge category={article.category} size="sm" />
                  <h3 className="font-bold text-xs text-neutral-900 dark:text-neutral-100 line-clamp-3 leading-snug mt-1">
                    {article.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
