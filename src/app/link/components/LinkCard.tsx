import React from 'react';
import { Globe, Heart } from 'lucide-react';
import { ViewMode } from '../types/link';
import { LinkInterface } from '@/interfaces/Link';
import { isPublicLink } from '../utils/link';
import { useFavorites } from '../hooks/useFavorites';
import { useFavoriteActions } from '../hooks/useFavoriteActions';
//import LinkInfo from './LinkInfo';

interface LinkCardProps {
    link: LinkInterface;
    viewMode: ViewMode;
}

const LinkCard: React.FC<LinkCardProps> = ({ link, viewMode }) => {
    const { isLoaded } = useFavorites();
    const { toggleFavorite, isFavorite } = useFavoriteActions();

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(link.id);
    };

    const handleCardClick = () => {
        window.open(link.url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div
            onClick={handleCardClick}
            className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group ${viewMode === 'grid' ? 'p-6' : 'p-4'
                } ${isPublicLink(link) ? 'border-l-4 border-l-blue-500' : ''} hover:scale-[1.02] hover:border-green-300`}
        >
            <div className={viewMode === 'list' ? 'flex items-center justify-between' : ''}>
                <div className={viewMode === 'list' ? 'flex-1' : ''}>
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 flex-1 group-hover:text-green-700 transition-colors">
                            {link.name}
                        </h3>
                        <div className="flex items-center gap-2">
                            {isPublicLink(link) && (
                                <>
                                    <Globe className="w-4 h-4 text-blue-500" />
                                    <span className="text-sm text-gray-500">สาธารณะ</span>
                                </>
                            )}
                            {isLoaded && (
                                <button
                                    onClick={handleFavoriteClick}
                                    className="p-1 rounded-full hover:bg-gray-100 transition-colors z-10 relative"
                                    title={isFavorite(link.id) ? "ลบออกจากรายการโปรด" : "เพิ่มในรายการโปรด"}
                                >
                                    <Heart
                                        className={`w-5 h-5 ${isFavorite(link.id)
                                            ? 'fill-red-500 text-red-500'
                                            : 'text-gray-400 hover:text-red-500'
                                            } transition-colors`}
                                    />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* <div className="text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1 mb-3 break-all transition-colors">
                        <ExternalLink className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{link.url}</span>
                    </div> */}

                    {/* <LinkInfo link={link} /> */}
                </div>
            </div>
        </div>
    );
};

export default LinkCard;
