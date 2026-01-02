'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { BrandCard } from '@/components';
import CategoryFilter from '@/components/CategoryFilter';
import { CATEGORY_GROUPS, getSubCategories } from '@/lib/categories';
import type { Brand } from '@/types/database';

export default function BrandsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const searchQuery = searchParams.get('search') || '';
    const categoryParam = searchParams.get('category') || '';

    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

    // Initialize filters from URL params
    const getInitialFilters = () => {
        if (!categoryParam) return { parent: null, subCategory: null };

        // Check if it's a parent category
        const parentMatch = CATEGORY_GROUPS.find(g => g.name === categoryParam);
        if (parentMatch) {
            return { parent: categoryParam, subCategory: null };
        }

        // Check if it's a sub-category
        for (const group of CATEGORY_GROUPS) {
            if (group.subCategories.includes(categoryParam)) {
                return { parent: group.name, subCategory: categoryParam };
            }
        }

        return { parent: null, subCategory: null };
    };

    const [filters, setFilters] = useState<{ parent: string | null; subCategory: string | null }>(getInitialFilters);

    // Fetch brands from API
    useEffect(() => {
        async function fetchBrands() {
            try {
                const response = await fetch('/api/brands');
                const data = await response.json();
                setBrands(data.brands || []);
            } catch (error) {
                console.error('Error fetching brands:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchBrands();
    }, []);

    // Calculate brand counts per sub-category
    const brandCounts = useMemo(() => {
        return brands.reduce((acc, brand) => {
            acc[brand.category] = (acc[brand.category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    }, [brands]);

    // Filter brands based on search, category filters
    const filteredBrands = useMemo(() => {
        let result = brands;

        // Apply search filter first
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(b =>
                b.name.toLowerCase().includes(query) ||
                b.category.toLowerCase().includes(query) ||
                (b.sub_category && b.sub_category.toLowerCase().includes(query)) ||
                (b.proof_type && b.proof_type.toLowerCase().includes(query))
            );
        }

        // Then apply category filters
        if (filters.parent) {
            const subCategories = getSubCategories(filters.parent);

            if (filters.subCategory) {
                result = result.filter(b => b.category === filters.subCategory);
            } else {
                result = result.filter(b => subCategories.includes(b.category));
            }
        }

        return result;
    }, [brands, filters, searchQuery]);

    const handleFilterChange = (newFilters: { parent: string | null; subCategory: string | null }) => {
        setFilters(newFilters);
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg)]">
            {/* Two-Tier Category Filter */}
            <CategoryFilter
                onFilterChange={handleFilterChange}
                brandCounts={brandCounts}
                initialParent={filters.parent}
            />

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Search Bar on Results Page */}
                <div className="mb-6">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (localSearchQuery.trim()) {
                                router.push(`/brands?search=${encodeURIComponent(localSearchQuery.trim())}`);
                            } else {
                                router.push('/brands');
                            }
                        }}
                        className="relative max-w-xl"
                    >
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
                                onClick={() => {
                                    setLocalSearchQuery('');
                                    router.push('/brands');
                                }}
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

                {/* Header with Search Results */}
                <div className="mb-6">
                    <nav className="text-sm text-[var(--color-text-muted)] mb-4">
                        <Link href="/" className="hover:text-[var(--color-text)]">Home</Link>
                        {' / '}
                        <span className="text-[var(--color-text)]">Brands</span>
                        {searchQuery && (
                            <>
                                {' / '}
                                <span className="text-[var(--color-text)]">Search: &quot;{searchQuery}&quot;</span>
                            </>
                        )}
                        {filters.parent && (
                            <>
                                {' / '}
                                <span className="text-[var(--color-text)]">{filters.parent}</span>
                            </>
                        )}
                        {filters.subCategory && (
                            <>
                                {' / '}
                                <span className="text-[var(--color-text)]">{filters.subCategory}</span>
                            </>
                        )}
                    </nav>
                    <h1 className="text-2xl font-bold text-[var(--color-text)] mb-1">
                        {searchQuery
                            ? `Results for "${searchQuery}"`
                            : filters.subCategory
                                ? filters.subCategory
                                : filters.parent
                                    ? `${filters.parent} Brands`
                                    : 'All Brands'}
                    </h1>
                    <p className="text-[var(--color-text-muted)]">
                        {loading
                            ? 'Loading brands...'
                            : `${filteredBrands.length} ${filteredBrands.length === 1 ? 'brand' : 'brands'} ${searchQuery ? 'found' : 'with verified data'}`
                        }
                    </p>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="h-40 bg-[var(--color-surface)] rounded-xl animate-pulse border border-slate-100"
                            />
                        ))}
                    </div>
                ) : (
                    <>
                        {/* Brand Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredBrands.map((brand) => (
                                <BrandCard key={brand.id} brand={brand} />
                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredBrands.length === 0 && (
                            <div className="text-center py-16 border border-dashed border-[var(--color-border)] rounded-xl bg-slate-50">
                                <div className="text-4xl mb-4">🔍</div>
                                <h3 className="font-semibold text-[var(--color-text)] mb-2">
                                    {searchQuery ? `No results for "${searchQuery}"` : 'No brands found'}
                                </h3>
                                <p className="text-[var(--color-text-muted)] mb-4">
                                    {searchQuery
                                        ? 'Try a different search term or browse by category.'
                                        : 'Try selecting a different category.'
                                    }
                                </p>
                                <button
                                    onClick={() => {
                                        setFilters({ parent: null, subCategory: null });
                                        // Clear search if on same page
                                        if (searchQuery) {
                                            window.history.pushState({}, '', '/brands');
                                        }
                                    }}
                                    className="text-emerald-600 hover:underline font-medium"
                                >
                                    View all brands
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
