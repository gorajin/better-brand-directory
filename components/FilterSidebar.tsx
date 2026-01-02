'use client';

import { TestType } from '@/types/database';

interface FilterState {
    testTypes: TestType[];
    category: string;
    pregnancySafe: boolean;
}

interface FilterSidebarProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    categories: string[];
}

const testTypeOptions: { value: TestType; label: string }[] = [
    { value: 'PFAS', label: 'PFAS Free' },
    { value: 'HeavyMetals', label: 'Heavy Metal Safe' },
    { value: 'Glyphosate', label: 'Glyphosate Free' },
    { value: 'Pesticides', label: 'Pesticide Free' },
    { value: 'Microplastics', label: 'Microplastic Free' },
];

export default function FilterSidebar({ filters, onFilterChange, categories }: FilterSidebarProps) {
    const toggleTestType = (testType: TestType) => {
        const newTestTypes = filters.testTypes.includes(testType)
            ? filters.testTypes.filter(t => t !== testType)
            : [...filters.testTypes, testType];
        onFilterChange({ ...filters, testTypes: newTestTypes });
    };

    const setCategory = (category: string) => {
        onFilterChange({ ...filters, category });
    };

    const togglePregnancySafe = () => {
        onFilterChange({ ...filters, pregnancySafe: !filters.pregnancySafe });
    };

    const clearFilters = () => {
        onFilterChange({ testTypes: [], category: '', pregnancySafe: false });
    };

    const hasActiveFilters = filters.testTypes.length > 0 || filters.category || filters.pregnancySafe;

    return (
        <div className="w-64 border-r border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-[var(--color-text)]">Filters</h2>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] underline"
                    >
                        Clear all
                    </button>
                )}
            </div>

            {/* Test Type Filters */}
            <div className="mb-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
                    Safety Tests
                </h3>
                <div className="space-y-2">
                    {testTypeOptions.map(({ value, label }) => (
                        <label key={value} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={filters.testTypes.includes(value)}
                                onChange={() => toggleTestType(value)}
                                className="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-safe)] focus:ring-[var(--color-safe)]"
                            />
                            <span className="text-sm text-[var(--color-text)] group-hover:text-[var(--color-safe)]">
                                {label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Pregnancy Safe Filter */}
            <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={filters.pregnancySafe}
                        onChange={togglePregnancySafe}
                        className="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-safe)] focus:ring-[var(--color-safe)]"
                    />
                    <span className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-safe)]">
                        🤰 Pregnancy Safe
                    </span>
                </label>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
                    Category
                </h3>
                <select
                    value={filters.category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-[var(--color-border)] rounded bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-safe)]"
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters && (
                <div className="pt-4 border-t border-[var(--color-border)]">
                    <div className="text-xs text-[var(--color-text-muted)] mb-2">Active filters:</div>
                    <div className="flex flex-wrap gap-1">
                        {filters.testTypes.map((type) => (
                            <span
                                key={type}
                                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-[var(--color-safe-bg)] text-[var(--color-safe)] rounded-full"
                            >
                                {type}
                                <button
                                    onClick={() => toggleTestType(type)}
                                    className="hover:text-[var(--color-text)]"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                        {filters.pregnancySafe && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-[var(--color-safe-bg)] text-[var(--color-safe)] rounded-full">
                                Pregnancy Safe
                                <button onClick={togglePregnancySafe} className="hover:text-[var(--color-text)]">
                                    ×
                                </button>
                            </span>
                        )}
                        {filters.category && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-[var(--color-surface)] text-[var(--color-text-muted)] rounded-full border border-[var(--color-border)]">
                                {filters.category}
                                <button onClick={() => setCategory('')} className="hover:text-[var(--color-text)]">
                                    ×
                                </button>
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export type { FilterState };
