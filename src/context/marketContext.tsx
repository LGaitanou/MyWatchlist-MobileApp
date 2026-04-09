import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FinancialInstrument } from '../types/financialInstrument';
import { INITIAL_INSTRUMENTS } from '../constants/mockData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeType, Colors } from '../constants/theme';

interface MarketContextType {
  instruments: FinancialInstrument[];
  watchlistIds: string[];
  favoriteIds: string[];
  theme: ThemeType;
  colors: typeof Colors.light;
  isLoggedIn: boolean;
  toggleWatchlist: (id: string) => void;
  toggleFavorite: (id: string) => void;
  toggleTheme: () => void;
  setIsLoggedIn: (value: boolean) => void;
  isInWatchlist: (id: string) => boolean;
  isFavorite: (id: string) => boolean;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

const WATCHLIST_STORAGE_KEY = '@mywatchlist_watchlist';
const FAVORITES_STORAGE_KEY = '@mywatchlist_favorites';
const THEME_STORAGE_KEY = '@mywatchlist_theme';
const AUTH_STORAGE_KEY = '@mywatchlist_isLoggedIn';

const generateInitialHistory = (basePrice: number): number[] => {
  const history = [];
  let current = basePrice;
  for (let i = 0; i < 20; i++) {
    current = current * (1 + (Math.random() * 0.04 - 0.02));
    history.push(current);
  }
  return history;
};

const INITIAL_WITH_HISTORY = INITIAL_INSTRUMENTS.map(item => ({
  ...item,
  history: generateInitialHistory(item.price)
}));

export const MarketProvider = ({ children }: { children: ReactNode }) => {
  const [instruments, setInstruments] = useState<FinancialInstrument[]>(INITIAL_WITH_HISTORY);
  const [watchlistIds, setWatchlistIds] = useState<string[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [theme, setTheme] = useState<ThemeType>('light');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadPersistedData = async () => {
      try {
        const storedWatchlist = await AsyncStorage.getItem(WATCHLIST_STORAGE_KEY);
        const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
        const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        const storedAuth = await AsyncStorage.getItem(AUTH_STORAGE_KEY);

        if (storedWatchlist) setWatchlistIds(JSON.parse(storedWatchlist));
        if (storedFavorites) setFavoriteIds(JSON.parse(storedFavorites));
        if (storedTheme) setTheme(storedTheme as ThemeType);
        if (storedAuth) setIsLoggedIn(JSON.parse(storedAuth));
      } catch (e) {
        console.error('Failed to load persisted data', e);
      } finally {
        setIsLoaded(true);
      }
    };

    loadPersistedData();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(watchlistIds));
    }
  }, [watchlistIds, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
    }
  }, [favoriteIds, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }, [theme, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(isLoggedIn));
    }
  }, [isLoggedIn, isLoaded]);

  useEffect(() => {
    const interval = setInterval(() => {
      setInstruments((currentInstruments) =>
        currentInstruments.map((item) => {
          const fluctuation = (Math.random() * 0.01 - 0.005);
          const newPrice = item.price * (1 + fluctuation);
          const newHistory = [...item.history.slice(1), newPrice];

          return {
            ...item,
            price: newPrice,
            change: item.change + (Math.random() * 0.1 - 0.05),
            history: newHistory
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleWatchlist = (id: string) => {
    setWatchlistIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const isInWatchlist = (id: string) => watchlistIds.includes(id);
  const isFavorite = (id: string) => favoriteIds.includes(id);

  const colors = Colors[theme];

  return (
    <MarketContext.Provider
      value={{
        instruments,
        watchlistIds,
        favoriteIds,
        theme,
        colors,
        isLoggedIn,
        toggleWatchlist,
        toggleFavorite,
        toggleTheme,
        setIsLoggedIn,
        isInWatchlist,
        isFavorite
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (!context) throw new Error('useMarket must be used within MarketProvider');
  return context;
};
