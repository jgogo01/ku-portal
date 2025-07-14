import Link from 'next/link';
import { NewsInterface } from '@/interfaces/News';
import { formatThaiDate } from '@/utils/formatThaiDate';
import { ChevronRight } from 'lucide-react';
import { stripHtml } from '@/utils/stripHtml';

const NewsListCard: React.FC<{
    news: NewsInterface[];
    isLoading: boolean;
}> = ({
    news,
    isLoading
}) => {
        if (isLoading) {
            return (
                <div className="py-16 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">กำลังโหลดข่าวสาร...</p>
                </div>
            );
        }

        if (!news || news.length === 0) {
            return (
                <div className="py-16 text-center">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m0 0l3-3m-3 3l-3-3m6-6a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-600">ไม่มีข่าวสารที่จะแสดง</p>
                </div>
            );
        }

        // เพิ่ม return ตรงนี้!
        return (
            <div className="space-y-6">
                {news.map((newsItem, index) => {
                    const plainTextContent = stripHtml(newsItem.content || '');
                    return (
                        <article key={newsItem.id} className="group">
                            <Link href={`/news/${newsItem.id}`}>
                                <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl hover:bg-white/80 hover:shadow-md transition-all duration-300 cursor-pointer border border-white/20">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-3">
                                                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                                                    {newsItem.title}
                                                </h2>
                                                {index === 0 && (
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                                        ใหม่
                                                    </span>
                                                )}
                                            </div>

                                            {/* Content Preview - Now shows plain text */}
                                            {plainTextContent && (
                                                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                                                    {plainTextContent.length > 300
                                                        ? `${plainTextContent.substring(0, 300)}...`
                                                        : plainTextContent
                                                    }
                                                </p>
                                            )}

                                            {/* Meta Information */}
                                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                                                <span className="flex items-center">
                                                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                                    ทั่วไป
                                                </span>
                                                <span className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {newsItem.date_created ? formatThaiDate(newsItem.date_created) : ""}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Read More Arrow - Using Lucide React */}
                                        <div className="ml-6 flex-shrink-0">
                                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                                                <ChevronRight className="w-5 h-5 text-green-600 group-hover:translate-x-0.5 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </article>
                    );
                })}
            </div>
        );
    }

export default NewsListCard;
