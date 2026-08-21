import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Send,
  Link,
  Check,
  Share2,
} from 'lucide-react';

// Twitter/X brand icon (removed from lucide-react v1+)
const TwitterXIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
  </svg>
);

interface ShareBarProps {
  title: string;
  url?: string;
  floating?: boolean;
}

export const ShareBar: React.FC<ShareBarProps> = ({
  title,
  url,
  floating = false,
}) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const buttons = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: <MessageCircle className="h-4 w-4" />,
      bg: '#25D366',
      color: '#fff',
    },
    {
      id: 'telegram',
      label: 'Telegram',
      icon: <Send className="h-4 w-4" />,
      bg: '#229ED9',
      color: '#fff',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      id: 'twitter',
      label: 'X',
      icon: <TwitterXIcon />,
      bg: '#000',
      color: '#fff',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
  ];

  const content = (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400 shrink-0">
        <Share2 className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Compartilhar</span>
      </span>
      <div className="flex gap-1.5 flex-wrap">
        {/* WhatsApp */}
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp"
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200"
          style={{ background: '#25D366', color: '#fff' }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
        {/* Telegram */}
        <a
          href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Telegram"
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200"
          style={{ background: '#229ED9', color: '#fff' }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          <Send className="h-4 w-4" />
          <span className="hidden sm:inline">Telegram</span>
        </a>
        {/* Twitter */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          title="X / Twitter"
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200"
          style={{ background: '#000', color: '#fff' }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          <TwitterXIcon />
          <span className="hidden sm:inline">X</span>
        </a>
        {/* Copy */}
        <button
          onClick={handleCopy}
          title="Copiar link"
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-200"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="flex items-center gap-1.5"
                style={{ color: 'var(--brand-purple)' }}
              >
                <Check className="h-4 w-4" />
                <span className="hidden sm:inline">Copiado!</span>
              </motion.span>
            ) : (
              <motion.span
                key="link"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="flex items-center gap-1.5"
              >
                <Link className="h-4 w-4" />
                <span className="hidden sm:inline">Copiar</span>
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );

  if (floating) {
    return (
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 100 }}
        className="fixed bottom-0 left-0 right-0 z-50 px-3 py-2.5 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 shadow-lg md:hidden safe-bottom"
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div className="py-4 border-y border-neutral-200 dark:border-neutral-800 my-5 sm:my-6">
      {content}
    </div>
  );
};
