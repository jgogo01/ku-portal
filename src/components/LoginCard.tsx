import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginCard() {
    return (
        <>
            {/* Main Login Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/30"></div>
                <div className="relative z-10">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="mx-auto w-24 h-24 flex items-center justify-center mb-6">
                            <Image
                                src="/assets/KU_SubLogo.png"
                                alt="KU Logo"
                                width={128}
                                height={128}
                                className="object-contain"
                            />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-3">
                            เข้าสู่ระบบ
                        </h3>
                        <p className="text-gray-600 font-light leading-relaxed">
                            เพื่อเข้าสู้ระบบสารสนเทศ
                        </p>
                    </div>

                    {/* Login Form */}
                    <div className="space-y-6">
                        {/* KU All Login Button */}
                        <button
                            onClick={() => { signIn("kualllogin", {callbackUrl: "/link"}); }}
                            type="button"
                            className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600 text-white font-semibold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:hover:scale-100 disabled:hover:shadow-lg flex items-center justify-center space-x-3 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                <>
                                    <span>เข้าสู่ระบบด้วย KU All Login</span>
                                    <ArrowRight size={18} />
                                </>
                        </button>

                        {/* Terms */}
                        <div className="text-center pt-4">
                            <p className="text-xs text-gray-500 leading-relaxed font-light">
                                การเข้าสู่ระบบ ถือว่าคุณยอมรับ
                                <a href="https://ocs.ku.ac.th/2019/pdpa/" target="_blank" className="text-green-600 hover:text-green-700 hover:underline ml-1 font-medium">
                                    นโยบายความเป็นส่วนตัว
                                </a>
                                <span> เรียบร้อยแล้ว</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}