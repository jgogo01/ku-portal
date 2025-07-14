// utils/favorites.ts
export const getFavorites = (): string[] => {
  if (typeof window === "undefined") return [];

  try {
    const favorites = document.cookie
      .split("; ")
      .find((row) => row.startsWith("favorites="))
      ?.split("=")[1];

    return favorites ? JSON.parse(decodeURIComponent(favorites)) : [];
  } catch (error) {
    console.error("Error parsing favorites cookie:", error);
    return [];
  }
};

export const saveFavorites = (favorites: string[]): void => {
  if (typeof window === "undefined") return;

  try {
    const cookieValue = encodeURIComponent(JSON.stringify(favorites));
    // เก็บไว้ 365 วัน
    const expires = new Date();
    expires.setDate(expires.getDate() + 365);

    document.cookie = `favorites=${cookieValue}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  } catch (error) {
    console.error("Error saving favorites cookie:", error);
  }
};

export const addToFavorites = (linkId: string): string[] => {
  const currentFavorites = getFavorites();
  if (!currentFavorites.includes(linkId)) {
    const newFavorites = [...currentFavorites, linkId];
    saveFavorites(newFavorites);
    return newFavorites;
  }
  return currentFavorites;
};

export const removeFromFavorites = (linkId: string): string[] => {
  const currentFavorites = getFavorites();
  const newFavorites = currentFavorites.filter((id) => id !== linkId);
  saveFavorites(newFavorites);
  return newFavorites;
};

export const toggleFavorite = (
  linkId: string
): { isFavorite: boolean; favorites: string[] } => {
  const currentFavorites = getFavorites();
  const isFavorite = currentFavorites.includes(linkId);

  let newFavorites: string[];
  if (isFavorite) {
    newFavorites = removeFromFavorites(linkId);
  } else {
    newFavorites = addToFavorites(linkId);
  }

  return {
    isFavorite: !isFavorite,
    favorites: newFavorites,
  };
};
