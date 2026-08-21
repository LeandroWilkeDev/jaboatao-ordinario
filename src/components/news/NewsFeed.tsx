import React from 'react';
import { motion } from 'framer-motion';
import type { NewsArticle } from '../../types/news';
import { NewsCard } from './NewsCard';
import { SkeletonCard } from '../ui/SkeletonCard';

interface NewsFeedProps {
  articles: NewsArticle[];
  loading?: boolean;
  emptyMessage?: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

export const NewsFeed: React.FC<NewsFeedProps> = ({
  articles,
  loading = false,
  emptyMessage = 'Nenhuma notícia encontrada.',
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-neutral-200 dark:border-neutral-800">
            <SkeletonCard variant="feed" />
          </div>
        ))}
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-4xl mb-4">🔍</div>
        <p className="text-neutral-500 dark:text-neutral-400 font-medium">{emptyMessage}</p>
        <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-1">
          Tente buscar por outro termo ou categoria.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {articles.map((article, i) => (
        <NewsCard key={article.id} article={article} index={i} variant="horizontal" />
      ))}
    </motion.div>
  );
};
