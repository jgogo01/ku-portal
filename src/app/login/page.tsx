"use client";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/navbar/Navbar";
import LoginCard from "@/components/LoginCard";

export default function Login() {
    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 overflow-hidden">
            <NavBar />
            <main className="flex-1 flex items-center justify-center px-6 overflow-y-auto">
                <div className="w-full max-w-md mt-12">
                    <h1 className="text-3xl font-bold text-center mb-2">
                        เข้าสู่ระบบ KU Portal
                    </h1>
                    <p className="text-center text-gray-600 mb-12">
                        เข้าสู่ระบบเพื่อเข้าถึงบริการต่างๆ ของมหาวิทยาลัยเกษตรศาสตร์
                    </p>
                    <LoginCard />
                </div>
            </main>
            <Footer />
        </div>
    );
}
