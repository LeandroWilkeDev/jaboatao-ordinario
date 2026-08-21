import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { Category } from '../../types/news';

const categories: Category[] = ['Geral', 'Política', 'Polícia', 'Esportes', 'Economia', 'Variedades'];

interface CategoryBarProps {
  active: Category | 'Todas';
  onChange: (cat: Category | 'Todas') => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({ active, onChange }) => {
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const all = ['Todas', ...categories] as const;

  return (
    <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-1 sm:px-4">
        <div
          ref={scrollRef}
          className="flex items-center gap-0 overflow-x-auto scrollbar-none py-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {all.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => onChange(cat as Category | 'Todas')}
                onMouseEnter={() => setHoveredCat(cat)}
                onMouseLeave={() => setHoveredCat(null)}
                className={`relative flex-shrink-0 px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold transition-colors duration-150 whitespace-nowrap min-h-[44px] ${
                  isActive
                    ? ''
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                }`}
                style={isActive ? { color: 'var(--brand-purple)' } : {}}
              >
                {cat}
                {isActive && (
                  <motion.div
                    layoutId="activeCatIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: 'var(--brand-yellow)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {!isActive && hoveredCat === cat && (
                  <motion.div
                    layoutId="hoverCatIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-300 dark:bg-neutral-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
