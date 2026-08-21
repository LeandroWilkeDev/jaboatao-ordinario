import React, { useState } from 'react';
import { Search, X, Zap, Wind, Droplets } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logoName from '../../assets/JB-logo-name.png';
import { useWeather } from '../../hooks/useWeather';

interface MainBarProps {
  onSearch: (query: string) => void;
}

export const MainBar: React.FC<MainBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [showWeatherDetail, setShowWeatherDetail] = useState(false);
  const navigate = useNavigate();
  const weather = useWeather();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      navigate('/');
    }
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div style={{ background: 'var(--brand-purple)' }}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 flex items-center gap-3">

        {/* Logo */}
        <a
          href="/"
          className="flex-shrink-0 group"
          onClick={(e) => { e.preventDefault(); navigate('/'); onSearch(''); }}
        >
          <img
            src={logoName}
            alt="Jaboatão Ordinário"
            className="h-10 sm:h-12 w-auto object-contain group-hover:opacity-85 transition-opacity duration-200"
          />
        </a>

        {/* Desktop Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-lg hidden sm:flex">
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2 w-full transition-all duration-200"
            style={focused ? {
              background: 'rgba(255,255,255,0.18)',
              boxShadow: '0 0 0 2px var(--brand-yellow)',
            } : {
              background: 'rgba(255,255,255,0.12)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.15)',
            }}
          >
            <Search className="h-4 w-4 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.6)' }} />
            <input
              type="text"
              placeholder="Buscar notícias..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); onSearch(e.target.value); }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="flex-1 bg-transparent text-sm outline-none min-w-0 placeholder-white/50"
              style={{ color: 'white' }}
            />
            <AnimatePresence>
              {query && (
                <motion.button
                  type="button"
                  onClick={clearSearch}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="transition-colors"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                >
                  <X className="h-4 w-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </form>

        {/* ── Weather Widget (desktop) ── */}
        {!weather.loading && !weather.error && (
          <div
            className="relative hidden md:flex flex-shrink-0"
            onMouseEnter={() => setShowWeatherDetail(true)}
            onMouseLeave={() => setShowWeatherDetail(false)}
          >
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl cursor-default select-none transition-all"
              style={{ background: 'rgba(255,255,255,0.1)', boxShadow: '0 0 0 1px rgba(255,255,255,0.12)' }}
            >
              <span className="text-xl leading-none">{weather.icon}</span>
              <div className="flex flex-col leading-none">
                <span className="text-white font-black text-base leading-tight">
                  {weather.temp}°C
                </span>
                <span className="text-purple-200 text-[10px] font-medium whitespace-nowrap leading-tight">
                  {weather.label}
                </span>
              </div>
            </div>

            {/* Tooltip detalhado */}
            <AnimatePresence>
              {showWeatherDetail && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 z-50 rounded-2xl p-4 min-w-[200px] shadow-2xl"
                  style={{ background: 'var(--brand-purple)', border: '1px solid rgba(250,198,26,0.3)' }}
                >
                  {/* Arrow */}
                  <div
                    className="absolute -top-1.5 right-5 w-3 h-3 rotate-45"
                    style={{ background: 'var(--brand-purple)', border: '1px solid rgba(250,198,26,0.3)', borderBottom: 'none', borderRight: 'none' }}
                  />
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2">
                    Jaboatão dos Guararapes
                  </p>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{weather.icon}</span>
                    <div>
                      <p className="text-white font-black text-2xl leading-none">{weather.temp}°C</p>
                      <p className="text-purple-200 text-xs mt-0.5">{weather.label}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="text-center">
                      <p className="text-white/50 text-[9px] uppercase tracking-wide">Sente como</p>
                      <p className="text-white font-bold text-sm">{weather.feelsLike}°C</p>
                    </div>
                    <div className="text-center" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                      <div className="flex items-center justify-center gap-0.5 text-white/50 mb-0.5">
                        <Droplets className="h-2.5 w-2.5" />
                        <p className="text-[9px] uppercase tracking-wide">Umidade</p>
                      </div>
                      <p className="text-white font-bold text-sm">{weather.humidity}%</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-0.5 text-white/50 mb-0.5">
                        <Wind className="h-2.5 w-2.5" />
                        <p className="text-[9px] uppercase tracking-wide">Vento</p>
                      </div>
                      <p className="text-white font-bold text-sm">{weather.windspeed} km/h</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Weather error state (desktop) */}
        {weather.error && (
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl flex-shrink-0" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <span className="text-lg">🌡️</span>
            <span className="text-white/50 text-xs">Clima indisponível</span>
          </div>
        )}

        {/* Mobile: Search toggle + Breaking */}
        <div className="flex items-center gap-2 ml-auto sm:ml-0">
          {/* Mobile search toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileSearch(!mobileSearch)}
            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
            style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
          >
            {mobileSearch ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          </motion.button>

          {/* Breaking News Button */}
          <a
            href="/"
            className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-3 py-2 rounded-lg transition-all flex-shrink-0"
            style={{ background: 'var(--brand-yellow)', color: 'var(--brand-purple)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--brand-yellow-dark)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--brand-yellow)')}
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            >
              <Zap
                className="h-3.5 w-3.5"
                style={{ fill: 'var(--brand-purple)', stroke: 'var(--brand-purple)' }}
              />
            </motion.div>
            <span className="hidden sm:inline">Última Hora</span>
            <span className="sm:hidden">Flash</span>
          </a>
        </div>
      </div>

      {/* Mobile expandable search */}
      <AnimatePresence>
        {mobileSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden sm:hidden"
          >
            <form onSubmit={handleSearch} className="px-3 pb-3">
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  boxShadow: '0 0 0 2px var(--brand-yellow)',
                }}
              >
                <Search className="h-4 w-4 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.6)' }} />
                <input
                  type="text"
                  placeholder="Buscar notícias..."
                  value={query}
                  autoFocus
                  onChange={(e) => { setQuery(e.target.value); onSearch(e.target.value); }}
                  className="flex-1 bg-transparent text-sm outline-none min-w-0 placeholder-white/50"
                  style={{ color: 'white' }}
                />
                {query && (
                  <button type="button" onClick={clearSearch} style={{ color: 'rgba(255,255,255,0.6)' }}>
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
