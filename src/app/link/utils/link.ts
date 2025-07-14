import { FilterState } from "../types/link";
import { LinkInterface } from "@/interfaces/Link";
import { getFavorites } from "./favorites";

export const isPublicLink = (link: LinkInterface): boolean => {
  return (
    (!link.campus || link.campus.length === 0) &&
    (!link.type_person || link.type_person.length === 0)
  );
};

export const getFilterOptions = (links: LinkInterface[]) => {
  if (!links || links.length === 0) return { campuses: [], typePersons: [] };

  //Get All Unique Campuses
  const campusesSet = new Map();
  links.forEach((link) => {
    if (link.campus && Array.isArray(link.campus)) {
      link.campus.forEach((c) => {
        if (c && c.id && c.name) {
          campusesSet.set(c.id, { id: c.id, name: c.name });
        }
      });
    }
  });

  //Get All Unique Type Persons
  const typePersonsSet = new Map();
  links.forEach((link) => {
    if (link.type_person && Array.isArray(link.type_person)) {
      link.type_person.forEach((t) => {
        if (t && t.id && t.name) {
          typePersonsSet.set(t.id, { id: t.id, name: t.name });
        }
      });
    }
  });

  return {
    campuses: Array.from(campusesSet.values()),
    typePersons: Array.from(typePersonsSet.values()),
  };
};

export const filterLinks = (
  links: LinkInterface[],
  searchTerm: string,
  filters: FilterState
): LinkInterface[] => {
  const favorites = getFavorites();

  const filtered = links.filter((link) => {
    // Search filter
    const matchesSearch = link.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Campus filter
    const matchesCampus =
      filters.campus.length === 0
        ? true
        : !link.campus || link.campus.length === 0
        ? filters.showPublic
        : link.campus.some(
            (campus) => campus && filters.campus.includes(campus.id)
          );

    // Type person filter
    const matchesTypePerson =
      filters.typePerson.length === 0
        ? true
        : !link.type_person || link.type_person.length === 0
        ? filters.showPublic
        : link.type_person.some(
            (type) => type && filters.typePerson.includes(type.id)
          );

    // Favorites filter
    const matchesFavorites =
      !filters.showFavoritesOnly || favorites.includes(link.id);

    return (
      matchesSearch && matchesCampus && matchesTypePerson && matchesFavorites
    );
  });

  // เรียงลำดับให้รายการโปรดขึ้นก่อน
  return filtered.sort((a, b) => {
    const aIsFavorite = favorites.includes(a.id);
    const bIsFavorite = favorites.includes(b.id);

    // ถ้า a เป็นรายการโปรดแต่ b ไม่ใช่ ให้ a ขึ้นก่อน
    if (aIsFavorite && !bIsFavorite) return -1;
    // ถ้า b เป็นรายการโปรดแต่ a ไม่ใช่ ให้ b ขึ้นก่อน
    if (!aIsFavorite && bIsFavorite) return 1;
    // ถ้าทั้งคู่เป็นรายการโปรดหรือไม่เป็น ให้เรียงตามชื่อ
    return a.name.localeCompare(b.name);
  });
};
