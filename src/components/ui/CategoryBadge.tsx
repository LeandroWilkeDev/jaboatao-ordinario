import React from 'react';
import type { Category } from '../../types/news';

const categoryConfig: Record<Category, { label: string; bg: string; text: string }> = {
  Geral:      { label: 'Geral',      bg: '#6b7280', text: '#ffffff' },
  Política:   { label: 'Política',   bg: '#7c3aed', text: '#ffffff' },
  Polícia:    { label: 'Polícia',    bg: '#29034A', text: '#FAC61A' },
  Esportes:   { label: 'Esportes',   bg: '#16a34a', text: '#ffffff' },
  Economia:   { label: 'Economia',   bg: '#0891b2', text: '#ffffff' },
  Variedades: { label: 'Variedades', bg: '#FAC61A', text: '#29034A' },
};

interface CategoryBadgeProps {
  category: Category;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  size = 'md',
  className = '',
}) => {
  const config = categoryConfig[category] ?? categoryConfig['Geral'];
  const sizeClasses = {
    sm: 'text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5',
    md: 'text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1',
    lg: 'text-xs sm:text-sm px-2.5 sm:px-3 py-1 sm:py-1.5',
  };

  return (
    <span
      className={`inline-block font-black uppercase tracking-wider rounded-sm ${sizeClasses[size]} ${className}`}
      style={{ background: config.bg, color: config.text }}
    >
      {config.label}
    </span>
  );
};
