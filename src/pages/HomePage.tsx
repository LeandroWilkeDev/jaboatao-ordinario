import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BreakingTicker } from '../components/news/BreakingTicker';
import { HeroGrid } from '../components/news/HeroGrid';
import { NewsFeed } from '../components/news/NewsFeed';
import { Sidebar } from '../components/layout/Sidebar';
import { AdBanner } from '../components/ui/AdBanner';
import { mockNews, breakingNews, mostRead } from '../data/mockNews';
import type { Category } from '../types/news';

export const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category | 'Todas'>('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  const featured = mockNews.find((n) => n.isFeatured) ?? mockNews[0];
  const secondary = mockNews.filter((n) => n.id !== featured.id).slice(0, 3);

  const filteredNews = useMemo(() => {
    let articles = mockNews.filter((n) => n.id !== featured.id);

    if (activeCategory !== 'Todas') {
      articles = articles.filter((n) => n.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      articles = articles.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.subtitle.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q)
      );
    }

    return articles;
  }, [activeCategory, searchQuery, featured.id]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onSearch={setSearchQuery}
      />

      {/* Breaking Ticker */}
      {breakingNews.length > 0 && <BreakingTicker news={breakingNews} />}

      {/* Hero Grid */}
      {!searchQuery && activeCategory === 'Todas' && (
        <HeroGrid featured={featured} secondary={secondary} />
      )}

      {/* Search/Filter Header */}
      {(searchQuery || activeCategory !== 'Todas') && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-7xl mx-auto px-4 pt-6 pb-2"
        >
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {searchQuery ? (
              <>
                Resultados para{' '}
                <span className="font-semibold text-neutral-900 dark:text-white">
                  "{searchQuery}"
                </span>{' '}
                — {filteredNews.length} notícia{filteredNews.length !== 1 ? 's' : ''} encontrada
                {filteredNews.length !== 1 ? 's' : ''}
              </>
            ) : (
              <>
                Editoria:{' '}
                <span className="font-semibold text-neutral-900 dark:text-white">
                  {activeCategory}
                </span>{' '}
                — {filteredNews.length} notícia{filteredNews.length !== 1 ? 's' : ''}
              </>
            )}
          </p>
        </motion.div>
      )}

      {/* Leaderboard Ad */}
      <div className="max-w-7xl mx-auto px-4 pt-4 hidden md:flex justify-center">
        <AdBanner format="728x90" />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feed */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif font-bold text-lg text-neutral-900 dark:text-white">
                {searchQuery
                  ? 'Resultados da Busca'
                  : activeCategory !== 'Todas'
                  ? activeCategory
                  : 'Últimas Notícias'}
              </h2>
              {!searchQuery && activeCategory === 'Todas' && (
                <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
                  {filteredNews.length} notícias
                </span>
              )}
            </div>
            <NewsFeed
              articles={filteredNews}
              emptyMessage={
                searchQuery
                  ? `Nenhuma notícia encontrada para "${searchQuery}"`
                  : `Sem notícias em ${activeCategory} no momento.`
              }
            />
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <Sidebar mostRead={mostRead} />
          </div>
        </div>

        {/* Mobile: Most Read below feed */}
        <div className="lg:hidden mt-8">
          <Sidebar mostRead={mostRead} />
        </div>
      </main>

      <Footer />
    </div>
  );
};
