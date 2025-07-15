import React, { useState, useEffect } from 'react';
import { Heart, ExternalLink } from 'lucide-react';
import { LinkInterface } from '@/interfaces/Link';
import { getFavorites } from '@/app/link/utils/favorites';
import { isPublicLink } from '@/app/link/utils/link';
import { useFavoriteActions } from '@/app/link/hooks/useFavoriteActions';
// import LinkInfo from '@/app/link/components/LinkInfo';
import Link from 'next/link';

interface FavoriteLinksCardProps {
    links: LinkInterface[];
}

const FavoriteLinksCard: React.FC<FavoriteLinksCardProps> = ({ links }) => {
    const [displayLinks, setDisplayLinks] = useState<LinkInterface[]>([]);
    const [isShowingFavorites, setIsShowingFavorites] = useState(false);
    const { toggleFavorite, isFavorite } = useFavoriteActions();

    useEffect(() => {
        const favorites = getFavorites();

        if (favorites.length > 0) {
            const favoriteLinks = links
                .filter(link => favorites.includes(link.id))
                .slice(0, 3);
            setDisplayLinks(favoriteLinks);
            setIsShowingFavorites(true);
        } else {
            const publicLinks = links
                .filter(isPublicLink)
                .sort((a, b) => {
                    if (a.date_created && b.date_created) {
                        return new Date(b.date_created).getTime() - new Date(a.date_created).getTime();
                    }
                    return 0;
                })
                .slice(0, 3);
            setDisplayLinks(publicLinks);
            setIsShowingFavorites(false);
        }
    }, [links]);

    const handleFavoriteClick = (e: React.MouseEvent, linkId: string) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(linkId);
    };

    const handleLinkClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleCardClick = (url: string) => {
        handleLinkClick(url);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden w-full max-w-md">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="text-2xl">
                        {isShowingFavorites ? '❤️' : '🔗'}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            {isShowingFavorites ? 'ลิงก์โปรด' : 'ลิงก์สาธารณะ'}
                        </h3>
                        <p className="text-sm text-gray-600">
                            {isShowingFavorites ? 'รายการที่คุณชื่นชอบ' : 'ลิงก์ที่เพิ่มล่าสุด'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {displayLinks.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="text-4xl mb-3">📝</div>
                        <p className="text-gray-500 text-sm">
                            {isShowingFavorites ? 'ยังไม่มีลิงก์โปรด' : 'ยังไม่มีลิงก์สาธารณะ'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {displayLinks.map((link, index) => (
                            <div
                                key={link.id}
                                onClick={() => handleCardClick(link.url)}
                                className="group bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer hover:scale-[1.02]"
                            >
                                {/* Link Header */}
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm font-medium text-green-600 group-hover:bg-green-200 transition-colors">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-gray-900 truncate group-hover:text-green-700 transition-colors">
                                                    {link.name}
                                                </h4>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <button
                                                onClick={(e) => handleFavoriteClick(e, link.id)}
                                                className="p-1 rounded-full hover:bg-gray-100 transition-colors z-10 relative"
                                                title={isFavorite(link.id) ? "ลบออกจากรายการโปรด" : "เพิ่มในรายการโปรด"}
                                            >
                                                <Heart
                                                    className={`w-4 h-4 ${isFavorite(link.id)
                                                        ? 'fill-red-500 text-red-500'
                                                        : 'text-gray-400 hover:text-red-500'
                                                        } transition-colors`}
                                                />
                                            </button>
                                            <div className="p-1 rounded-full hover:bg-green-100 transition-colors">
                                                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Link URL */}
                                    {/* <div className="mb-3">
                                        <div className="text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1 text-sm break-all transition-colors">
                                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                                            <span className="truncate">{link.url}</span>
                                        </div>
                                    </div> */}

                                    {/* Link Info - ใช้ component เดิม */}
                                    {/* <LinkInfo link={link} /> */}
                                </div>
                            </div>
                        ))}

                        {/* View All Button */}
                        <div className="pt-4 border-t border-gray-200">
                            <Link href="/link">
                                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2">
                                    <span>ดูลิงก์ทั้งหมด</span>
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoriteLinksCard;
