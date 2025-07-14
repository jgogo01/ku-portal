import {
  Calendar,
  ChevronRight,
  Bell,
  Loader2
} from 'lucide-react';
import { formatThaiDate } from '@/utils/formatThaiDate';
import { useRouter } from 'next/navigation';
import { trpc } from '@/utils/trpc';
import Link from 'next/link';

export function NewsCard() {
  const {
    data: newsData,
    isLoading,
    error
  } = trpc.public.getNews.useQuery({limit: 3});

  if (error) {
    console.error('Error fetching news:', error);
  }

  const router = useRouter();
  return (
    <>
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Bell size={20} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">ข่าวสารและประกาศ</h3>
          </div>
          <button
            onClick={() => router.push('/news')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1 hover:underline">
            <span>ดูทั้งหมด</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <Loader2 className="animate-spin h-10 w-10 text-green-600 mx-auto" />
              <p className="text-gray-600">กำลังโหลด...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-gray-600">ไม่สามารถโหลดข้อมูลได้</p>
            </div>
          ) : (
            newsData?.slice(0, 4).map((newsItem, index) => (
              <Link href={"/news/"+newsItem.id} key={newsItem.id} className="group cursor-pointer">
                <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50/80 transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    <Calendar size={16} className="text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-sm font-medium text-gray-800 group-hover:text-green-600 transition-colors line-clamp-2">
                        {newsItem.title}
                      </h4>
                      {index === 0 && (
                        <span className="ml-2 px-2 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-full flex-shrink-0">
                          ใหม่
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span>{formatThaiDate(newsItem.date_created)}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="px-2 py-1 bg-gray-100 rounded-md">ทั่วไป</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}
