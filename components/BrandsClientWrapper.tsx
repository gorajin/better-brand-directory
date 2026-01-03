'use client';

import { useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { BrandCard } from '@/components';
import CategoryFilter from '@/components/CategoryFilter';
import type { Brand } from '@/types/database';

interface BrandsClientWrapperProps {
    brands: Brand[];
    brandCounts: Record<string, number>;
    initialSearch: string;
    initialCategory: string | null;
    initialParent: string | null;
}

export default function BrandsClientWrapper({
    brands,
    brandCounts,
    initialSearch,
    initialCategory,
    initialParent,
}: BrandsClientWrapperProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Local state for controlled input (synced with URL)
    const [localSearchQuery, setLocalSearchQuery] = useState(initialSearch);

    // Handle search form submission
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());

        if (localSearchQuery.trim()) {
            params.set('search', localSearchQuery.trim());
        } else {
            params.delete('search');
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    // Clear search
    const handleClearSearch = () => {
        setLocalSearchQuery('');
        const params = new URLSearchParams(searchParams.toString());
        params.delete('search');
        router.push(`${pathname}?${params.toString()}`);
    };

    // Handle filter changes from CategoryFilter
    const handleFilterChange = (newFilters: { parent: string | null; subCategory: string | null }) => {
        const params = new URLSearchParams();

        // Preserve search if present
        const currentSearch = searchParams.get('search');
        if (currentSearch) {
            params.set('search', currentSearch);
        }

        // Set category param
        if (newFilters.subCategory) {
            params.set('category', newFilters.subCategory);
        } else if (newFilters.parent) {
            params.set('category', newFilters.parent);
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    // Build display title
    const getTitle = () => {
        if (initialSearch) return `Results for "${initialSearch}"`;
        if (initialCategory) return initialCategory;
        if (initialParent) return `${initialParent} Brands`;
        return 'All Brands';
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg)]">
            {/* Two-Tier Category Filter */}
            <CategoryFilter
                onFilterChange={handleFilterChange}
                brandCounts={brandCounts}
                initialParent={initialParent}
            />

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Search Bar */}
                <div className="mb-6">
                    <form onSubmit={handleSearch} className="relative max-w-xl">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={localSearchQuery}
                            onChange={(e) => setLocalSearchQuery(e.target.value)}
                            placeholder="Search brands by name, category, or certification..."
                            className="w-full pl-12 pr-24 py-3 rounded-full border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition placeholder:text-slate-400"
                        />
                        {localSearchQuery && (
                            <button
                                type="button"
                                onClick={handleClearSearch}
                                className="absolute right-20 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-emerald-600 text-white rounded-full text-sm font-medium hover:bg-emerald-700 transition"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* Header with Results */}
                <div className="mb-6">
                    <nav className="text-sm text-[var(--color-text-muted)] mb-4">
                        <Link href="/" className="hover:text-[var(--color-text)]">Home</Link>
                        {' / '}
                        <span className="text-[var(--color-text)]">Brands</span>
                        {initialSearch && (
                            <>
                                {' / '}
                                <span className="text-[var(--color-text)]">Search: &quot;{initialSearch}&quot;</span>
                            </>
                        )}
                        {initialParent && (
                            <>
                                {' / '}
                                <span className="text-[var(--color-text)]">{initialParent}</span>
                            </>
                        )}
                        {initialCategory && initialCategory !== initialParent && (
                            <>
                                {' / '}
                                <span className="text-[var(--color-text)]">{initialCategory}</span>
                            </>
                        )}
                    </nav>
                    <h1 className="text-2xl font-bold text-[var(--color-text)] mb-1">
                        {getTitle()}
                    </h1>
                    <p className="text-[var(--color-text-muted)]">
                        {brands.length} {brands.length === 1 ? 'brand' : 'brands'} {initialSearch ? 'found' : 'with verified data'}
                    </p>
                </div>

                {/* Brand Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {brands.map((brand) => (
                        <BrandCard key={brand.id} brand={brand} />
                    ))}
                </div>

                {/* Empty State */}
                {brands.length === 0 && (
                    <div className="text-center py-16 border border-dashed border-[var(--color-border)] rounded-xl bg-slate-50">
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="font-semibold text-[var(--color-text)] mb-2">
                            {initialSearch ? `No results for "${initialSearch}"` : 'No brands found'}
                        </h3>
                        <p className="text-[var(--color-text-muted)] mb-4">
                            {initialSearch
                                ? 'Try a different search term or browse by category.'
                                : 'Try selecting a different category.'
                            }
                        </p>
                        <Link
                            href="/brands"
                            className="text-emerald-600 hover:underline font-medium"
                        >
                            View all brands
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
