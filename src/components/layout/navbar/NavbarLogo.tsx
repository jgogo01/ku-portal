import React from 'react';
import Image from 'next/image';

export const NavbarLogo: React.FC = () => {
  return (
    <div className="flex items-center space-x-3 sm:space-x-4">
      <div className="relative">
        <Image
          src="/assets/KU_SubLogo.png"
          alt="KU Logo"
          width={40}
          height={40}
          className="object-contain sm:w-12 sm:h-12"
        />
      </div>
      <div>
        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          KU Portal
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-light hidden sm:block">
          ศูนย์กลางระบบสารสนเทศ
        </p>
      </div>
    </div>
  );
};
