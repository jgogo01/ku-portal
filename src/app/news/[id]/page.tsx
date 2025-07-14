"use client";
import React from 'react';
import NavBar from '@/components/layout/navbar/Navbar';
import Footer from '@/components/layout/Footer';
import { trpc } from '@/utils/trpc';
import { use } from 'react';
import Header from '@/components/layout/Header';
import Loading from '@/components/Loading';

interface newsDetailProps {
    params: Promise<{
        id: string;
    }>;
}

const NewsDetail: React.FC<newsDetailProps> = (
    { params }: newsDetailProps
) => {
    const resolvedParams = use(params);
    const {
        data: newsData,
        isLoading,
        error
    } = trpc.public.getNews.useQuery({ id: resolvedParams.id });

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
                <main className="w-full xl:pt-18 pt-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <Header
                            title={"รายละเอียดข่าวสาร"}
                            subtitle={"รายละเอียดข่าวสารของมหาวิทยาลัยเกษตรศาสตร์"}
                        />
                        {isLoading ? (
                            <Loading />
                        ) : error ? (
                            <div className="text-center py-8">
                                <p className="text-gray-600">ไม่สามารถโหลดข้อมูลได้</p>
                            </div>
                        ) : newsData && newsData.length > 0 ? (
                            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-lg">
                                <div className="mb-4">
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                        {newsData[0].title}
                                    </h1>
                                    {newsData[0].date_created && (
                                        <p className="text-sm text-gray-500 mb-4">
                                            {new Date(newsData[0].date_created).toLocaleDateString('th-TH', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    )}
                                </div>
                                <div
                                    className="prose prose-lg max-w-none text-gray-700"
                                    dangerouslySetInnerHTML={{ __html: newsData[0].content }}
                                />
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-600">ไม่พบข่าวสารที่ต้องการ</p>
                            </div>
                        )}
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default NewsDetail;
