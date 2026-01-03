import { Suspense } from 'react';
import { getBrands, getAllBrands } from '@/lib/data';
import { CATEGORY_GROUPS, getSubCategories } from '@/lib/categories';
import BrandsClientWrapper from '@/components/BrandsClientWrapper';

interface BrandsPageProps {
    searchParams: Promise<{ search?: string; category?: string }>;
}

/**
 * Brands Directory Page - Server Component
 * 
 * Key architectural change: Filtering now happens on the server (database level)
 * instead of fetching all brands and filtering on the client.
 * 
 * This provides:
 * - Better scalability (database handles filtering)
 * - Faster initial page load (less data transferred)
 * - URL-synced filters (refresh/share preserves state)
 */
export default async function BrandsPage({ searchParams }: BrandsPageProps) {
    const params = await searchParams;
    const searchQuery = params.search || '';
    const categoryParam = params.category || '';

    // Determine if category is a parent or sub-category
    let parentCategory: string | null = null;
    let subCategory: string | null = null;
    let subCategories: string[] = [];

    if (categoryParam) {
        // Check if it's a parent category
        const parentMatch = CATEGORY_GROUPS.find(g => g.name === categoryParam);
        if (parentMatch) {
            parentCategory = categoryParam;
            subCategories = parentMatch.subCategories;
        } else {
            // Check if it's a sub-category
            for (const group of CATEGORY_GROUPS) {
                if (group.subCategories.includes(categoryParam)) {
                    parentCategory = group.name;
                    subCategory = categoryParam;
                    break;
                }
            }
        }
    }

    // Fetch brands with server-side filtering
    const brands = await getBrands({
        search: searchQuery || undefined,
        category: subCategory || undefined,
        subCategories: subCategory ? undefined : (subCategories.length > 0 ? subCategories : undefined),
    });

    // Get all brands for category counts (could be optimized with a separate count query)
    const allBrands = await getAllBrands();
    const brandCounts = allBrands.reduce((acc, brand) => {
        acc[brand.category] = (acc[brand.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <Suspense fallback={<BrandsLoadingSkeleton />}>
            <BrandsClientWrapper
                brands={brands}
                brandCounts={brandCounts}
                initialSearch={searchQuery}
                initialCategory={subCategory}
                initialParent={parentCategory}
            />
        </Suspense>
    );
}

// Loading skeleton for suspense fallback
function BrandsLoadingSkeleton() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)]">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-6">
                    <div className="h-12 bg-slate-100 rounded-full max-w-xl animate-pulse" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="h-40 bg-[var(--color-surface)] rounded-xl animate-pulse border border-slate-100"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
