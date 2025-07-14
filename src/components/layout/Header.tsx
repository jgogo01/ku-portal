import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
    title: string;
    subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
    const router = useRouter();

    return (
        <>
            <div className="mb-8">
                <div className="flex items-start space-x-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md group mt-1"
                    >
                        <ChevronLeft className="w-5 h-5 text-green-600 group-hover:text-green-800 transition-colors" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                        <p className="text-gray-600">{subtitle}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
