import React from 'react';

interface AdBannerProps {
  format: '300x250' | '728x90' | '320x100';
  label?: string;
  className?: string;
}

const formatDimensions: Record<AdBannerProps['format'], { w: string; h: string; aspect: string }> = {
  '300x250': { w: 'w-full max-w-[300px]', h: 'h-[250px]', aspect: '' },
  '728x90': { w: 'w-full max-w-[728px]', h: 'h-[90px]', aspect: '' },
  '320x100': { w: 'w-full max-w-[320px]', h: 'h-[100px]', aspect: '' },
};

export const AdBanner: React.FC<AdBannerProps> = ({
  format,
  label = 'Publicidade',
  className = '',
}) => {
  const dims = formatDimensions[format];

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <span className="text-[10px] text-neutral-400 dark:text-neutral-600 uppercase tracking-widest font-medium">
        {label}
      </span>
      <div
        className={`${dims.w} ${dims.h} bg-neutral-100 dark:bg-neutral-800/60 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700/60 transition-colors group`}
      >
        <div className="text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mx-auto mb-1 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
            />
          </svg>
          <p className="text-xs font-semibold">Anuncie aqui</p>
          <p className="text-[10px] opacity-70">{format} px</p>
        </div>
      </div>
    </div>
  );
};
