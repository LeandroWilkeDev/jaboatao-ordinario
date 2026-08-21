import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import type { NewsArticle } from '../../types/news';
import { NewsCard } from './NewsCard';

interface RelatedNewsProps {
  articles: NewsArticle[];
  currentId: string;
}

export const RelatedNews: React.FC<RelatedNewsProps> = ({ articles, currentId }) => {
  const related = articles
    .filter((a) => a.id !== currentId)
    .slice(0, 4);

  if (!related.length) return null;

  return (
    <section className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="h-5 w-5 text-red-600" />
        <h2 className="font-serif text-xl font-bold text-neutral-900 dark:text-white">
          Notícias Relacionadas
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {related.map((article, i) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <NewsCard article={article} index={i} variant="vertical" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
