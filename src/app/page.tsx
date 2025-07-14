"use client";
import React from 'react';
import {
  CheckCircle,
} from 'lucide-react';
import { NewsCard } from '@/components/NewsCard';
import NavBar from '@/components/layout/navbar/Navbar';
import Footer from '@/components/layout/Footer';
import LoginCard from '@/components/LoginCard';
import { useSession } from "next-auth/react";
import FavoriteLinksCard from '@/components/LinkFavoriteCard';
import { trpc } from '@/utils/trpc';

const HomePage: React.FC = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && !!session?.user;

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
        <main className="flex-1">
          <div className="pt-14 min-h-[calc(100vh-120px)] flex flex-col">
            <div className="container mx-auto px-6 py-16 flex-1">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-start min-h-full">
                {/* Left Side - Welcome Content */}
                <div className="space-y-12 flex flex-col justify-center min-h-[500px]">
                  {/* Hero Section */}
                  <div className="space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                      ยินดีต้อนรับสู่
                      <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        KU Portal
                      </span>
                    </h2>
                    <p className="text-xl text-gray-600 font-light leading-relaxed">
                      ศูนย์กลางระบบสารสนเทศของมหาวิทยาลัยเกษตรศาสตร์
                      ที่รวบรวมบริการดิจิทัลทั้งหมดไว้ในที่เดียว
                      เพื่อความสะดวกในการเรียน การสอน และการบริหารงาน
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle size={20} />
                        <span className="font-medium">ปลอดภัยและเชื่อถือได้</span>
                      </div>
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle size={20} />
                        <span className="font-medium">ใช้งานง่าย รวดเร็ว</span>
                      </div>
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle size={20} />
                        <span className="font-medium">เข้าถึงได้ทุกที่ทุกเวลา</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <NewsCard />
                  </div>
                </div>

                {/* Right Side - Login Form or Links */}
                <div className="flex justify-center lg:justify-end items-start min-h-[500px]">
                  <div className="w-full max-w-md sticky top-20">
                    {!isAuthenticated ? (
                      <LoginCard />
                    ) : (
                      <AuthenticatedContent />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

// แยก component สำหรับ authenticated user
const AuthenticatedContent: React.FC = () => {
  const { data: linkData } = trpc.protected.getLink.useQuery({ limit: 50 });

  return (
    <FavoriteLinksCard
      links={linkData || []}
    />
  );
};

export default HomePage;