import React from 'react';
import { ArrowRight } from 'lucide-react';
import MenuItem from '@/types/narbar';
import Link from 'next/link';

interface MobileMenuProps {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (open: boolean) => void;
    mobileMenuRef: React.RefObject<HTMLDivElement | null>;
    filteredMenuItems: MenuItem[];
    handleNavigation: (href: string) => void;
    isAuthenticated: boolean;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    mobileMenuRef,
    filteredMenuItems,
    handleNavigation,
    isAuthenticated
}) => {
    return (
        <div className="lg:hidden relative" ref={mobileMenuRef}>
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                    <div className={`w-full h-0.5 bg-green-500 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                    <div className={`w-full h-0.5 bg-green-500 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                    <div className={`w-full h-0.5 bg-green-500 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                </div>
            </button>

            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {filteredMenuItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <button
                                key={item.name}
                                onClick={() => handleNavigation(item.href)}
                                className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                            >
                                <IconComponent size={16} />
                                <span>{item.name}</span>
                            </button>
                        );
                    })}

                    {/* Login button in mobile menu when not authenticated */}
                    {!isAuthenticated && (
                        <div className="border-t border-gray-100 mt-2 pt-2">
                            <Link href="/login" className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-green-600 hover:bg-green-50 transition-colors duration-200">
                                <ArrowRight size={16} />
                                <span>เข้าสู่ระบบ</span>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
