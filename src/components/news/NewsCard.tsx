import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Eye, User } from 'lucide-react';
import type { NewsArticle } from '../../types/news';
import { CategoryBadge } from '../ui/CategoryBadge';
import { formatDistanceToNow } from '../../utils/date';

interface NewsCardProps {
  article: NewsArticle;
  index?: number;
  variant?: 'horizontal' | 'vertical';
}

export const NewsCard: React.FC<NewsCardProps> = ({
  article,
  index = 0,
  variant = 'horizontal',
}) => {
  const relativeDate = formatDistanceToNow(new Date(article.publishedAt));

  if (variant === 'vertical') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <Link
          to={`/noticia/${article.slug}`}
          className="group flex flex-col bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md dark:hover:shadow-neutral-950 transition-all duration-300"
        >
          <div className="overflow-hidden aspect-video">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1">
            <CategoryBadge category={article.category} size="sm" />
            <h3
              className="font-bold text-neutral-900 dark:text-neutral-100 transition-colors leading-snug line-clamp-2 text-sm"
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-purple)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '')}
            >
              {article.title}
            </h3>
            <div className="flex items-center gap-3 text-[11px] text-neutral-400 dark:text-neutral-500 mt-auto pt-2">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {relativeDate}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {(article.views / 1000).toFixed(1)}k
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 120 }}
    >
      <Link
        to={`/noticia/${article.slug}`}
        className="group flex gap-3 sm:gap-4 bg-white dark:bg-neutral-900 rounded-xl p-3 sm:p-4 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md dark:hover:shadow-neutral-950 transition-all duration-300"
      >
        {/* Image */}
        <div className="flex-shrink-0 overflow-hidden rounded-lg w-24 h-18 sm:w-28 sm:h-20 md:w-36 md:h-24">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between min-w-0 flex-1">
          <div className="space-y-1 sm:space-y-1.5">
            <CategoryBadge category={article.category} size="sm" />
            <h3
              className="font-bold text-neutral-900 dark:text-neutral-100 transition-colors leading-snug line-clamp-2 text-sm"
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-purple)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '')}
            >
              {article.title}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 hidden md:block">
              {article.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-neutral-400 dark:text-neutral-500 mt-1.5 sm:mt-2 flex-wrap">
            <span className="flex items-center gap-1 truncate">
              <User className="h-3 w-3 flex-shrink-0" />
              <span className="truncate max-w-[80px] sm:max-w-none">{article.author.name}</span>
            </span>
            <span className="flex items-center gap-1 flex-shrink-0">
              <Clock className="h-3 w-3" />
              {relativeDate}
            </span>
            <span className="flex items-center gap-1 flex-shrink-0">
              <Eye className="h-3 w-3" />
              {article.views >= 1000 ? `${(article.views / 1000).toFixed(1)}k` : article.views}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
