"use client";
import React, { useState, useMemo } from 'react';
import NavBar from '@/components/layout/navbar/Navbar';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/Search';
import Pagination from '@/components/Pagination'; // เพิ่ม import
import { trpc } from '@/utils/trpc';
import { ViewMode } from './types/link';
import { filterLinks } from './utils/link';
import { useFilters } from './hooks/useFilters';
import FilterCard from './components/FilterCard';
import LinkCard from './components/LinkCard';
import ViewModeToggle from './components/ViewModeToggle';
import Loading from '@/components/Loading';

const LinkPage: React.FC = () => {
    const { data: linkData, isLoading, error } = trpc.protected.getLink.useQuery({ limit: 50 });
    const { filters, handleFilterChange, clearFilters, isSessionLoading } = useFilters();
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<ViewMode>('list');

    const filteredLinks = useMemo(() =>
        filterLinks(linkData || [], searchTerm, filters),
        [linkData, searchTerm, filters]
    );

    // Show loading while session or data is loading
    if (isLoading || isSessionLoading) {
        return (
            <>
                <NavBar />
                <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
                    <div className="flex justify-center items-center h-64">
                        <Loading />
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <NavBar />
                <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
                    <div className="flex justify-center items-center h-64">
                        <div className="text-red-600">เกิดข้อผิดพลาดในการโหลดข้อมูล</div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
                <main className="w-full xl:pt-18 pt-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="mb-8">
                            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="lg:w-1/4">
                                <FilterCard
                                    links={linkData || []}
                                    filters={filters}
                                    searchTerm={searchTerm}
                                    onFilterChange={handleFilterChange}
                                    onClearFilters={clearFilters}
                                />
                            </div>

                            <div className="lg:w-3/4">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">รวมลิงก์</h2>
                                    <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
                                </div>

                                {filteredLinks.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="text-gray-500 text-lg">ไม่พบรายการที่ตรงกับการค้นหา</div>
                                    </div>
                                ) : (
                                    <>
                                        <div className={
                                            viewMode === 'grid'
                                                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                                                : 'space-y-4'
                                        }>
                                            {filteredLinks.map(link => (
                                                <LinkCard key={link.id} link={link} viewMode={viewMode} />
                                            ))}
                                        </div>

                                        {/* เพิ่ม Pagination */}
                                        <Pagination
                                            currentCount={filteredLinks.length}
                                            totalCount={linkData?.length || 0}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default LinkPage;
