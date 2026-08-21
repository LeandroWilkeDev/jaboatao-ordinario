import React from 'react';

interface SkeletonCardProps {
  variant?: 'hero' | 'feed' | 'compact';
}

const shimmer = `animate-pulse`;

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ variant = 'feed' }) => {
  if (variant === 'hero') {
    return (
      <div className={`${shimmer} rounded-xl overflow-hidden`}>
        <div className="bg-neutral-200 dark:bg-neutral-800 h-72 md:h-96 w-full" />
        <div className="p-5 space-y-3">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-20" />
          <div className="h-7 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
          <div className="h-7 bg-neutral-200 dark:bg-neutral-800 rounded w-4/5" />
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-2/3" />
          <div className="flex gap-3 pt-2">
            <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-24" />
            <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-16" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`${shimmer} flex gap-3`}>
        <div className="bg-neutral-200 dark:bg-neutral-800 rounded h-16 w-24 flex-shrink-0" />
        <div className="flex-1 space-y-2 py-1">
          <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
          <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-5/6" />
          <div className="h-2.5 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3" />
        </div>
      </div>
    );
  }

  return (
    <div className={`${shimmer} flex gap-4`}>
      <div className="bg-neutral-200 dark:bg-neutral-800 rounded-lg h-24 w-36 flex-shrink-0" />
      <div className="flex-1 space-y-2.5 py-1">
        <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-20" />
        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
        <div className="flex gap-3">
          <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-16" />
          <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-12" />
        </div>
      </div>
    </div>
  );
};
