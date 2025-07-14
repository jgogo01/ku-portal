import React from 'react';

interface FilterSectionProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, icon, children }) => {
    return (
        <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                {icon}
                {title}
            </h4>
            <div className="space-y-2">
                {children}
            </div>
        </div>
    );
};

export default FilterSection;
