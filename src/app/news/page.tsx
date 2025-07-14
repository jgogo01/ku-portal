"use client";
import React from 'react';
import NavBar from '@/components/layout/navbar/Navbar';
import Footer from '@/components/layout/Footer';
import { trpc } from '@/utils/trpc';
import { useState } from 'react';
import NewsListCard from './components/NewsListCard';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/Search';
import Header from '@/components/layout/Header';
import Loading from '@/components/Loading';

const NewsPage: React.FC = () => {
  const {
    data: newsData,
    isLoading,
    error
  } = trpc.public.getNews.useQuery({});

  const [searchTerm, setSearchTerm] = useState('');
  const filteredNews = newsData?.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  }) || [];

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
        <main className="w-full xl:pt-18 pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Header */}
            <Header
              title={"ข่าวสารและประกาศ"}
              subtitle={"ข่าวสารและประกาศทั้งหมดจากมหาวิทยาลัยเกษตรศาสตร์"}
            />

            {/* Search */}
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />

            {/* News List */}
            {isLoading ? (
              <Loading />
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-gray-600">ไม่สามารถโหลดข้อมูลได้</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-sm text-gray-600">
                    {searchTerm ? `พบ ${filteredNews.length} รายการสำหรับ "${searchTerm}"` : `ทั้งหมด ${filteredNews.length} รายการ`}
                  </p>
                </div>

                {/* News Items */}
                <div className="space-y-6">
                  {filteredNews && filteredNews.length > 0 ? (
                    <NewsListCard news={filteredNews} isLoading={isLoading} />
                  ) : (
                    <div className="py-16 text-center">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">
                        {searchTerm ? 'ไม่พบข่าวสาร' : 'ไม่มีข่าวสาร'}
                      </h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        {searchTerm ? 'ลองเปลี่ยนคำค้นหาใหม่หรือค้นหาด้วยคำที่แตกต่างกัน' : 'รอติดตามประกาศข่าวสารเร็ว ๆ นี้'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {filteredNews && filteredNews.length > 0 && (
                  <Pagination
                    currentCount={filteredNews.length}
                    totalCount={filteredNews.length}
                  />
                )}
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default NewsPage;
