'use client';

import { useState, useEffect } from 'react';
import { CATEGORY_GROUPS, getSubCategories } from '@/lib/categories';
import { UtensilsCrossed, Sparkles, Pill, Armchair } from 'lucide-react';

interface CategoryFilterProps {
    onFilterChange: (filters: { parent: string | null; subCategory: string | null }) => void;
    brandCounts: Record<string, number>;
    initialParent?: string | null;
}

// Map category names to Lucide icons
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    'Food': <UtensilsCrossed className="w-4 h-4" strokeWidth={1.5} />,
    'Beauty': <Sparkles className="w-4 h-4" strokeWidth={1.5} />,
    'Supplements': <Pill className="w-4 h-4" strokeWidth={1.5} />,
    'Living': <Armchair className="w-4 h-4" strokeWidth={1.5} />,
};

export default function CategoryFilter({ onFilterChange, brandCounts, initialParent = null }: CategoryFilterProps) {
    const [activeParent, setActiveParent] = useState<string | null>(initialParent);
    const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);

    useEffect(() => {
        if (initialParent !== activeParent) {
            setActiveParent(initialParent);
            setActiveSubCategory(null);
        }
    }, [initialParent]);

    const visibleSubCategories = activeParent ? getSubCategories(activeParent) : [];
    const totalBrands = Object.values(brandCounts).reduce((sum, count) => sum + count, 0);

    const parentCounts = CATEGORY_GROUPS.reduce((acc, group) => {
        acc[group.name] = group.subCategories.reduce(
            (sum, sub) => sum + (brandCounts[sub] || 0),
            0
        );
        return acc;
    }, {} as Record<string, number>);

    const handleParentClick = (parentName: string | null) => {
        setActiveParent(parentName);
        setActiveSubCategory(null);
        onFilterChange({ parent: parentName, subCategory: null });
    };

    const handleSubCategoryClick = (subCategory: string) => {
        const newSub = activeSubCategory === subCategory ? null : subCategory;
        setActiveSubCategory(newSub);
        onFilterChange({ parent: activeParent, subCategory: newSub });
    };

    return (
        <div className="border-b border-slate-100 bg-white">
            {/* Parent Category Tabs */}
            <div className="max-w-5xl mx-auto px-4">
                <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide -mb-px">
                    {/* All Tab */}
                    <button
                        onClick={() => handleParentClick(null)}
                        className={`flex-shrink-0 px-4 py-3.5 text-sm font-medium transition-colors border-b-2 ${activeParent === null
                            ? 'border-slate-900 text-slate-900'
                            : 'border-transparent text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        All
                        <span className="ml-1.5 text-xs text-slate-400">({totalBrands})</span>
                    </button>

                    {/* Parent Category Tabs with Icons */}
                    {CATEGORY_GROUPS.map((group) => (
                        <button
                            key={group.name}
                            onClick={() => handleParentClick(group.name)}
                            className={`flex-shrink-0 px-4 py-3.5 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${activeParent === group.name
                                ? 'border-slate-900 text-slate-900'
                                : 'border-transparent text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            <span className={activeParent === group.name ? 'text-slate-700' : 'text-slate-400'}>
                                {CATEGORY_ICONS[group.name]}
                            </span>
                            {group.name}
                            <span className="text-xs text-slate-400">({parentCounts[group.name]})</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Sub-category Pills */}
            {activeParent && visibleSubCategories.length > 0 && (
                <div className="bg-slate-50/50 border-t border-slate-100">
                    <div className="max-w-5xl mx-auto px-4 py-3">
                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                            <button
                                onClick={() => handleSubCategoryClick('')}
                                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeSubCategory === null
                                    ? 'bg-slate-900 text-white'
                                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                                    }`}
                            >
                                All {activeParent}
                            </button>

                            {visibleSubCategories.map((subCat) => (
                                <button
                                    key={subCat}
                                    onClick={() => handleSubCategoryClick(subCat)}
                                    className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeSubCategory === subCat
                                        ? 'bg-slate-900 text-white'
                                        : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                                        }`}
                                >
                                    {subCat}
                                    <span className="ml-1 text-slate-400">({brandCounts[subCat] || 0})</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
