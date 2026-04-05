import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MarketContextType {
  watchlistIds: string[];
  favoriteIds: string[];
  toggleWatchlist: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isInWatchlist: (id: string) => boolean;
  isFavorite: (id: string) => boolean;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MarketProvider = ({ children }: { children: ReactNode }) => {
  const [watchlistIds, setWatchlistIds] = useState<string[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

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

  const isInWatchlist = (id: string) => watchlistIds.includes(id);
  const isFavorite = (id: string) => favoriteIds.includes(id);

  return (
    <MarketContext.Provider
      value={{
        watchlistIds,
        favoriteIds,
        toggleWatchlist,
        toggleFavorite,
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
