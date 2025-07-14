import React from 'react';
import MenuItem from '@/types/narbar';

interface DesktopNavigationProps {
  filteredMenuItems: MenuItem[];
  handleNavigation: (href: string) => void;
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  filteredMenuItems,
  handleNavigation
}) => {
  return (
    <nav className="hidden lg:flex items-center space-x-1">
      {filteredMenuItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <button
            key={item.name}
            onClick={() => handleNavigation(item.href)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
          >
            <IconComponent size={16} />
            <span className="text-sm font-medium">{item.name}</span>
          </button>
        );
      })}
    </nav>
  );
};
