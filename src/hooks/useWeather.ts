import { useState, useEffect } from 'react';

// Coordenadas de Jaboatão dos Guararapes - PE
const LAT = -8.1797;
const LON = -35.0044;

// WMO Weather interpretation codes → descrição pt-BR + emoji
const WMO_CODES: Record<number, { label: string; icon: string }> = {
  0:  { label: 'Céu limpo',       icon: '☀️' },
  1:  { label: 'Predominante limpo', icon: '🌤️' },
  2:  { label: 'Parcialmente nublado', icon: '⛅' },
  3:  { label: 'Nublado',          icon: '☁️' },
  45: { label: 'Neblina',          icon: '🌫️' },
  48: { label: 'Geada',            icon: '🌫️' },
  51: { label: 'Garoa leve',       icon: '🌦️' },
  53: { label: 'Garoa moderada',   icon: '🌦️' },
  55: { label: 'Garoa intensa',    icon: '🌧️' },
  61: { label: 'Chuva leve',       icon: '🌧️' },
  63: { label: 'Chuva moderada',   icon: '🌧️' },
  65: { label: 'Chuva intensa',    icon: '🌧️' },
  71: { label: 'Neve leve',        icon: '❄️' },
  73: { label: 'Neve moderada',    icon: '❄️' },
  75: { label: 'Neve intensa',     icon: '❄️' },
  80: { label: 'Pancadas leves',   icon: '🌦️' },
  81: { label: 'Pancadas moderadas', icon: '⛈️' },
  82: { label: 'Pancadas violentas', icon: '⛈️' },
  95: { label: 'Trovoada',         icon: '⛈️' },
  96: { label: 'Trovoada c/ granizo', icon: '⛈️' },
  99: { label: 'Trovoada c/ granizo', icon: '⛈️' },
};

export interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  windspeed: number;
  icon: string;
  label: string;
  loading: boolean;
  error: boolean;
}

export function useWeather(): WeatherData {
  const [data, setData] = useState<WeatherData>({
    temp: 0,
    feelsLike: 0,
    humidity: 0,
    windspeed: 0,
    icon: '🌤️',
    label: 'Carregando...',
    loading: true,
    error: false,
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const url =
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${LAT}&longitude=${LON}` +
          `&current=temperature_2m,apparent_temperature,relative_humidity_2m,windspeed_10m,weathercode` +
          `&timezone=America%2FFortaleza` +
          `&forecast_days=1`;

        const res = await fetch(url);
        if (!res.ok) throw new Error('Falha na requisição');
        const json = await res.json();

        const current = json.current;
        const code: number = current.weathercode ?? 0;
        const weatherInfo = WMO_CODES[code] ?? { label: 'Tempo variável', icon: '🌡️' };

        setData({
          temp: Math.round(current.temperature_2m),
          feelsLike: Math.round(current.apparent_temperature),
          humidity: Math.round(current.relative_humidity_2m),
          windspeed: Math.round(current.windspeed_10m),
          icon: weatherInfo.icon,
          label: weatherInfo.label,
          loading: false,
          error: false,
        });
      } catch {
        setData((prev) => ({ ...prev, loading: false, error: true, label: 'Indisponível' }));
      }
    };

    fetchWeather();
    // Atualiza a cada 10 minutos
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return data;
}
