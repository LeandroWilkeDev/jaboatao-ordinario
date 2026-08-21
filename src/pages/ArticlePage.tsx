import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Eye, Calendar } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ShareBar } from '../components/ui/ShareBar';
import { CategoryBadge } from '../components/ui/CategoryBadge';
import { RelatedNews } from '../components/news/RelatedNews';
import { AdBanner } from '../components/ui/AdBanner';
import { mockNews } from '../data/mockNews';

export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = mockNews.find((n) => n.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
        <div className="text-center">
          <p className="text-6xl mb-4">📰</p>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Notícia não encontrada
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 mb-6">
            Esta página pode ter sido removida ou o endereço está incorreto.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors"
            style={{ background: 'var(--brand-purple)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--brand-purple-mid)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--brand-purple)')}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar à Home
          </Link>
        </div>
      </div>
    );
  }

  const publishedDate = new Date(article.publishedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header
        activeCategory="Todas"
        onCategoryChange={() => {}}
        onSearch={() => navigate('/')}
      />

      <main className="max-w-4xl mx-auto px-3 sm:px-4 py-5 sm:py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 transition-colors font-medium"
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-purple)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '')}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Category + Breaking */}
          <div className="flex items-center gap-3 mb-4">
            <CategoryBadge category={article.category} size="lg" />
            {article.isBreaking && (
              <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1" style={{ color: 'var(--brand-purple)' }}>
                <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--brand-yellow)' }} />
                Urgente
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-serif text-xl sm:text-2xl md:text-4xl font-black text-neutral-900 dark:text-white leading-tight mb-3 sm:mb-4">
            {article.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed mb-5 sm:mb-6 border-l-4 pl-4 font-medium italic" style={{ borderColor: 'var(--brand-yellow)' }}>
            {article.subtitle}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 py-4 border-y border-neutral-200 dark:border-neutral-800 mb-6">
            <div className="flex items-center gap-2.5">
              <img
                src={article.author.avatarUrl}
                alt={article.author.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-neutral-200 dark:border-neutral-700"
              />
              <div>
                <p className="text-sm font-bold text-neutral-900 dark:text-white leading-none">
                  {article.author.name}
                </p>
                <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
                  {article.author.role}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {publishedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {article.readTime} de leitura
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {article.views.toLocaleString('pt-BR')} visualizações
              </span>
            </div>
          </div>

          {/* Share Bar (inline, above image) */}
          <ShareBar title={article.title} />

          {/* Hero Image */}
          <figure className="rounded-2xl overflow-hidden mb-8 shadow-lg">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full aspect-video object-cover"
            />
            <figcaption className="text-xs text-neutral-400 dark:text-neutral-500 px-3 py-2 bg-neutral-100 dark:bg-neutral-800/50 text-center">
              Foto: Divulgação / Arquivo
            </figcaption>
          </figure>

          {/* Article Body */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {article.content.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className={`text-sm sm:text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 mb-4 sm:mb-5 ${
                  i === 0
                    ? 'drop-cap'
                    : ''
                }`}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mr-1">
                Tags:
              </span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors cursor-pointer"
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--brand-purple-faint)'; (e.currentTarget as HTMLElement).style.color = 'var(--brand-purple)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = ''; }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Share Bar (inline, below article) */}
          <ShareBar title={article.title} />

          {/* Mid-article Ad */}
          <div className="my-8 flex justify-center">
            <AdBanner format="320x100" label="Publicidade" />
          </div>
        </motion.article>

        {/* Related News */}
        <RelatedNews articles={mockNews} currentId={article.id} />
      </main>

      {/* Floating Share Bar (mobile) */}
      <ShareBar title={article.title} floating />

      <Footer />
    </div>
  );
};
