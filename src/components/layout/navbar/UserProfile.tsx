import React from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { Session } from 'next-auth';
import typePersonMapping from '@/utils/typePersonMapping';

interface UserProfileProps {
    session: Session | null;
    isProfileOpen: boolean;
    setIsProfileOpen: (open: boolean) => void;
    profileRef: React.RefObject<HTMLDivElement | null>;
    handleLogout: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
    session,
    isProfileOpen,
    setIsProfileOpen,
    profileRef,
    handleLogout
}) => {
    const personType = session?.user?.type_persion;
    return (
        <div className="relative" ref={profileRef}>
            <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                </div>
                <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-700">
                        {session?.user?.thainame || ""}
                    </p>
                    <p className="text-xs text-gray-500">
                        {(personType && typePersonMapping[personType]) || "ไม่ระบุ"}
                    </p>
                </div>
                <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                        <LogOut size={16} />
                        <span>ออกจากระบบ</span>
                    </button>
                </div>
            )}
        </div>
    );
};
