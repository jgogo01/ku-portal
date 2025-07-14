export type ViewMode = "grid" | "list";

export interface FilterOptions {
  campuses: Array<{ id: string; name: string }>;
  typePersons: Array<{ id: string; name: string }>;
}


export interface FilterState {
  campus: string[];
  typePerson: string[];
  showPublic: boolean;
  showFavoritesOnly?: boolean; 
}
