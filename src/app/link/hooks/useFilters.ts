import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FilterState } from "../types/link";
import { useFavorites } from "./useFavorites";

export const useFilters = () => {
  const { data: session, status } = useSession();
  const { favorites, isLoaded: favoritesLoaded, hasFavorites } = useFavorites();

  const getInitialFilters = (): FilterState => ({
    campus: session?.user?.campus ? [session.user.campus] : [],
    typePerson: session?.user?.type_persion ? [session.user.type_persion] : [],
    showPublic: false,
    showFavoritesOnly: hasFavorites, // Auto-tick ถ้ามี favorites
  });

  const [filters, setFilters] = useState<FilterState>(getInitialFilters());

  // Update filters when session changes
  useEffect(() => {
    if (status === "authenticated" && session && favoritesLoaded) {
      setFilters({
        campus: session.user?.campus ? [session.user.campus] : [],
        typePerson: session.user?.type_persion
          ? [session.user.type_persion]
          : [],
        showPublic: false,
        showFavoritesOnly: false,
      });
    }
  }, [session, status, hasFavorites, favoritesLoaded]);

  // Auto-untick when no favorites
  useEffect(() => {
    if (favoritesLoaded && !hasFavorites && filters.showFavoritesOnly) {
      setFilters((prev) => ({ ...prev, showFavoritesOnly: false }));
    }
  }, [hasFavorites, favoritesLoaded, filters.showFavoritesOnly]);

  const handleFilterChange = (
    filterType: keyof FilterState,
    value: string[] | boolean
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      campus: session?.user?.campus ? [session.user.campus] : [],
      typePerson: session?.user?.type_persion
        ? [session.user.type_persion]
        : [],
      showPublic: false,
      showFavoritesOnly: hasFavorites, // Keep if has favorites
    });
  };

  return {
    filters,
    setFilters,
    handleFilterChange,
    clearFilters,
    isSessionLoading: status === "loading",
    favorites, // Export favorites for use in components
  };
};
