import React from 'react';

interface CheckboxFilterProps {
    name: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({
    name,
    checked,
    onChange
}) => {
    return (
        <label className="flex items-center">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className="ml-2 text-sm text-gray-600">{name}</span>
        </label>
    );
};

export default CheckboxFilter;
