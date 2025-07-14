import React from 'react';
import { Grid, List } from 'lucide-react';
import { ViewMode } from '../types/link';

interface ViewModeToggleProps {
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
    viewMode,
    onViewModeChange
}) => {
    return (
        <div className="flex bg-white rounded-lg shadow-sm border border-gray-200">
            <button
                onClick={() => onViewModeChange('grid')}
                className={`p-2 rounded-l-lg ${viewMode === 'grid'
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
            >
                <Grid className="w-5 h-5" />
            </button>
            <button
                onClick={() => onViewModeChange('list')}
                className={`p-2 rounded-r-lg ${viewMode === 'list'
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
            >
                <List className="w-5 h-5" />
            </button>
        </div>
    );
};

export default ViewModeToggle;
