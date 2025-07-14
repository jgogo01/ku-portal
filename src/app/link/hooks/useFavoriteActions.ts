import { toggleFavorite as toggleFavoriteUtil } from '../utils/favorites';
import { useFavorites } from './useFavorites';

export const useFavoriteActions = () => {
  const { favorites, refreshFavorites } = useFavorites();

  const toggleFavorite = (linkId: string) => {
    const result = toggleFavoriteUtil(linkId);
    refreshFavorites(); // Refresh state immediately
    return result;
  };

  const isFavorite = (linkId: string): boolean => {
    return favorites.includes(linkId);
  };

  return {
    toggleFavorite,
    isFavorite
  };
};