import React from 'react';
import { NavBarProps } from '@/types/narbar';
import { useNavbar } from '@/hooks/useNavbar';
import { NavbarLogo } from '@/components/layout/navbar/NavbarLogo';
import { DesktopNavigation } from '@/components/layout/navbar/DesktopNavigation';
import { MobileMenu } from '@/components/layout/navbar/MobileNavigation';
import { UserProfile } from '@/components/layout/navbar/UserProfile';
import { LoginButton } from '@/components/layout/navbar/LoginButton';

export default function NavBar({ isAuth = false }: NavBarProps) {
  const {
    session,
    isProfileOpen,
    setIsProfileOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    profileRef,
    mobileMenuRef,
    isAuthenticated,
    getNavOpacity,
    handleLogout,
    handleNavigation,
    filteredMenuItems
  } = useNavbar(isAuth);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-green-100/50 flex-shrink-0"
      style={{
        backgroundColor: `rgba(255, 255, 255, ${getNavOpacity()})`,
        backdropFilter: getNavOpacity() > 0.1 ? 'blur(12px)' : 'none'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">

          {/* Logo and Title */}
          <NavbarLogo />

          {/* Desktop Navigation Menu */}
          <DesktopNavigation
            filteredMenuItems={filteredMenuItems}
            handleNavigation={handleNavigation}
          />

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">

            {/* Mobile Menu Button */}
            <MobileMenu
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
              mobileMenuRef={mobileMenuRef}
              filteredMenuItems={filteredMenuItems}
              handleNavigation={handleNavigation}
              isAuthenticated={isAuthenticated}
            />

            {/* Profile or Login Section */}
            {isAuthenticated ? (
              <UserProfile
                session={session}
                isProfileOpen={isProfileOpen}
                setIsProfileOpen={setIsProfileOpen}
                profileRef={profileRef}
                handleLogout={handleLogout}
              />
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
