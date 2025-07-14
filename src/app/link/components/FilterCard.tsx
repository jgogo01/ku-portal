import React, { useMemo } from 'react';
import { Filter, MapPin, Users, Globe, Heart } from 'lucide-react';
import { FilterState } from '../types/link';
import { getFilterOptions, filterLinks } from '../utils/link';
import FilterSection from './Filter';
import CheckboxFilter from './CheckBoxFilter';
import { LinkInterface } from '@/interfaces/Link';
import { useFavorites } from '../hooks/useFavorites';

interface FilterCardProps {
    links: LinkInterface[];
    filters: FilterState;
    searchTerm: string;
    onFilterChange: (filterType: keyof FilterState, value: string[] | boolean) => void;
    onClearFilters: () => void;
}

const FilterCard: React.FC<FilterCardProps> = ({
    links,
    filters,
    searchTerm,
    onFilterChange,
    onClearFilters
}) => {
    const filterOptions = useMemo(() => getFilterOptions(links), [links]);
    const filteredCount = useMemo(() =>
        filterLinks(links, searchTerm, filters).length,
        [links, searchTerm, filters]
    );
    const { favorites, isLoaded } = useFavorites();

    return (
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    ตัวกรอง
                </h3>
                <button
                    onClick={onClearFilters}
                    className="text-sm text-emerald-600 hover:text-emerald-700"
                >
                    ล้างตัวกรอง
                </button>
            </div>

            {/* Public Links Filter */}
            <div className="mb-6">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={filters.showPublic}
                        onChange={(e) => onFilterChange('showPublic', e.target.checked)}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        แสดงลิงก์สาธารณะ
                    </span>
                </label>
            </div>

            {/* Campus Filter */}
            <FilterSection title="วิทยาเขต" icon={<MapPin className="w-4 h-4" />}>
                {filterOptions.campuses.map(campus => (
                    <CheckboxFilter
                        key={campus.id}
                        name={campus.name}
                        checked={filters.campus.includes(campus.id)}
                        onChange={(checked) => {
                            const newCampus = checked
                                ? [...filters.campus, campus.id]
                                : filters.campus.filter(c => c !== campus.id);
                            onFilterChange('campus', newCampus);
                        }}
                    />
                ))}
            </FilterSection>

            {/* Type Person Filter */}
            <FilterSection title="ประเภทผู้ใช้" icon={<Users className="w-4 h-4" />}>
                {filterOptions.typePersons.map(type => (
                    <CheckboxFilter
                        key={type.id}
                        name={type.name}
                        checked={filters.typePerson.includes(type.id)}
                        onChange={(checked) => {
                            const newTypePerson = checked
                                ? [...filters.typePerson, type.id]
                                : filters.typePerson.filter(t => t !== type.id);
                            onFilterChange('typePerson', newTypePerson);
                        }}
                    />
                ))}
            </FilterSection>

            {/* ฟิลเตอร์รายการโปรด */}
            {isLoaded && favorites.length > 0 && (
                <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                        รายการโปรด ({favorites.length})
                    </h4>
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={filters.showFavoritesOnly || false}
                            onChange={(e) => onFilterChange('showFavoritesOnly', e.target.checked)}
                            className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">แสดงเฉพาะรายการโปรด</span>
                    </label>
                </div>
            )}

            {/* Results Count */}
            <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                    พบ {filteredCount} รายการ
                </p>
            </div>
        </div>
    );
};

export default FilterCard;
