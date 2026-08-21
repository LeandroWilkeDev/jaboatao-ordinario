import React from 'react';
import { MessageCircle } from 'lucide-react';
import logoName from '../../assets/JB-logo-name.png';

// Inline SVGs for brand icons removed from lucide-react v1+
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const TwitterXIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-neutral-300 mt-12 sm:mt-16" style={{ background: 'var(--brand-purple)' }}>
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 md:col-span-2">
            {/* Logo */}
            <div className="mb-4">
              <img
                src={logoName}
                alt="Jaboatão Ordinário"
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-purple-200 leading-relaxed max-w-sm">
              O portal de notícias mais ativo de Jaboatão dos Guararapes e Região Metropolitana do Recife. Jornalismo independente, rápido e próximo da sua realidade.
            </p>
            <div className="flex gap-4 mt-4 sm:mt-5">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-purple-300 hover:text-pink-400 transition-colors">
                <InstagramIcon />
              </a>
              <a href="https://wa.me" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-purple-300 hover:text-green-400 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-purple-300 hover:text-red-400 transition-colors">
                <YoutubeIcon />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="text-purple-300 hover:text-sky-400 transition-colors">
                <TwitterXIcon />
              </a>
            </div>
          </div>

          {/* Editorias */}
          <div>
            <h4
              className="font-black text-xs uppercase tracking-wider mb-3 sm:mb-4"
              style={{ color: 'var(--brand-yellow)' }}
            >
              Editorias
            </h4>
            <ul className="space-y-2 text-sm">
              {['Geral', 'Política', 'Polícia & Cidades', 'Esportes', 'Economia', 'Variedades'].map((item) => (
                <li key={item}>
                  <a href="/" className="text-purple-300 hover:text-white transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h4
              className="font-black text-xs uppercase tracking-wider mb-3 sm:mb-4"
              style={{ color: 'var(--brand-yellow)' }}
            >
              Institucional
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                'Sobre o Portal',
                'Expediente Editorial',
                'Anuncie Conosco',
                'Termos de Uso',
                'Política de Privacidade',
                'Fale com a Redação',
              ].map((item) => (
                <li key={item}>
                  <a href="/" className="text-purple-300 hover:text-white transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-purple-800">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 text-xs text-purple-400">
          <p>© {currentYear} Jaboatão Ordinário. Todos os direitos reservados.</p>
          <p className="text-center sm:text-right">CNPJ 00.000.000/0001-00 · Jaboatão dos Guararapes, PE · Brasil</p>
        </div>
      </div>
    </footer>
  );
};
