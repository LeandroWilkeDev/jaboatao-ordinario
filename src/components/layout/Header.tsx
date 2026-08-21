import React from 'react';
import { Topbar } from './Topbar';
import { MainBar } from './MainBar';
import { CategoryBar } from './CategoryBar';
import { useDarkMode } from '../../hooks/useDarkMode';
import type { Category } from '../../types/news';

interface HeaderProps {
  activeCategory: Category | 'Todas';
  onCategoryChange: (cat: Category | 'Todas') => void;
  onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onCategoryChange,
  onSearch,
}) => {
  const { isDark, toggle } = useDarkMode();

  return (
    <header className="w-full">
      <Topbar isDark={isDark} toggleDark={toggle} />
      <MainBar onSearch={onSearch} />
      <CategoryBar active={activeCategory} onChange={onCategoryChange} />
    </header>
  );
};
