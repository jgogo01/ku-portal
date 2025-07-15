"use client";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/navbar/Navbar";
import LoginCard from "@/components/LoginCard";

export default function Login() {
    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
                <main className="w-full xl:pt-8 pt-24">
                    <div className="flex justify-center items-center h-screen">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            <h1 className="text-3xl font-bold text-center mb-2">
                                เข้าสู่ระบบ KU Portal
                            </h1>
                            <p className="text-center text-gray-600 mb-10">
                                เข้าสู่ระบบเพื่อเข้าถึงบริการต่างๆ ของมหาวิทยาลัยเกษตรศาสตร์
                            </p>
                            <LoginCard />
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
