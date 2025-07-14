import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function LoginButton() {
    return (
        <Link href="/login">
            <button
                type="button"
                className="hidden sm:flex bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg items-center space-x-2 relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative z-10">เข้าสู่ระบบ</span>
                <ArrowRight size={16} className="relative z-10" />
            </button>
        </Link>
    );
}
