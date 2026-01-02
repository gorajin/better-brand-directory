/**
 * Category hierarchy mapping for the brand directory
 * Groups specific categories under parent buckets for cleaner navigation
 */

export interface CategoryGroup {
    name: string;
    emoji: string;
    icon: string; // Lucide icon name
    subCategories: string[];
}

// Parent categories with their sub-categories
export const CATEGORY_GROUPS: CategoryGroup[] = [
    {
        name: 'Food',
        emoji: '🍽️',
        icon: 'UtensilsCrossed',
        subCategories: ['Baby Food', 'Coffee', 'Pantry'],
    },
    {
        name: 'Beauty',
        emoji: '💄',
        icon: 'Sparkles',
        subCategories: ['Beauty'],
    },
    {
        name: 'Supplements',
        emoji: '💊',
        icon: 'Pill',
        subCategories: ['Supplements', 'Protein Powder'],
    },
    {
        name: 'Living',
        emoji: '🏡',
        icon: 'Armchair',
        subCategories: ['Water Filters', 'Mattresses', 'Cookware'],
    },
];

// Get parent category name from a sub-category
export function getParentCategory(subCategory: string): string | null {
    for (const group of CATEGORY_GROUPS) {
        if (group.subCategories.includes(subCategory)) {
            return group.name;
        }
    }
    return null;
}

// Get all sub-categories for a parent
export function getSubCategories(parentName: string): string[] {
    const group = CATEGORY_GROUPS.find(g => g.name === parentName);
    return group?.subCategories || [];
}

// Get all sub-categories across all parents (flat list)
export function getAllSubCategories(): string[] {
    return CATEGORY_GROUPS.flatMap(g => g.subCategories);
}
