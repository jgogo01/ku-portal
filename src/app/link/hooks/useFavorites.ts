import { useState, useEffect } from 'react';
import { getFavorites } from '../utils/favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initial load
    const loadFavorites = () => {
      const currentFavorites = getFavorites();
      setFavorites(currentFavorites);
      setIsLoaded(true);
    };

    loadFavorites();

    // Poll for changes every 2 seconds
    const interval = setInterval(() => {
      const currentFavorites = getFavorites();
      setFavorites(prev => {
        // Only update if actually changed
        if (JSON.stringify(prev) !== JSON.stringify(currentFavorites)) {
          return currentFavorites;
        }
        return prev;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return {
    favorites,
    isLoaded,
    hasFavorites: favorites.length > 0,
    refreshFavorites: () => setFavorites(getFavorites())
  };
};