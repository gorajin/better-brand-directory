/**
 * Data layer for Better Brand Directory
 * Fetches data from Supabase instead of mock data
 */

import { supabase } from './supabase';
import type { Brand, Product, TestResult, CategoryInsight } from '@/types/database';

// ============================================
// BRAND QUERIES
// ============================================

export async function getAllBrands(): Promise<Brand[]> {
    const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('trust_score', { ascending: false });

    if (error) {
        console.error('Error fetching brands:', error);
        return [];
    }

    return data || [];
}

/**
 * Fetch brands with optional server-side filtering
 * This is the primary function for the brands page - filters are applied at the database level
 */
export async function getBrands(options?: {
    search?: string;
    category?: string;
    parentCategory?: string;
    subCategories?: string[];
}): Promise<Brand[]> {
    let query = supabase
        .from('brands')
        .select('*')
        .order('trust_score', { ascending: false });

    // Apply search filter (name, category, sub_category, proof_type)
    if (options?.search) {
        const searchTerm = `%${options.search}%`;
        query = query.or(
            `name.ilike.${searchTerm},category.ilike.${searchTerm},sub_category.ilike.${searchTerm},proof_type.ilike.${searchTerm}`
        );
    }

    // Apply category filter - exact match for sub-category
    if (options?.category) {
        query = query.eq('category', options.category);
    }

    // Apply parent category filter - match any sub-category within the parent
    if (options?.subCategories && options.subCategories.length > 0) {
        query = query.in('category', options.subCategories);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching brands:', error);
        return [];
    }

    return data || [];
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
    const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching brand:', error);
        return null;
    }

    return data;
}

export async function getBrandsByCategory(category: string): Promise<Brand[]> {
    const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('category', category)
        .order('trust_score', { ascending: false });

    if (error) {
        console.error('Error fetching brands by category:', error);
        return [];
    }

    return data || [];
}

export async function getTopBrands(limit: number = 4): Promise<Brand[]> {
    const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('trust_score', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching top brands:', error);
        return [];
    }

    return data || [];
}

// ============================================
// PRODUCT QUERIES
// ============================================

export async function getProductsByBrandId(brandId: string): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            test_results (*)
        `)
        .eq('brand_id', brandId);

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }

    return data || [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            brand:brands (*),
            test_results (*)
        `)
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
}

// ============================================
// STATS QUERIES
// ============================================

export async function getStats(): Promise<{
    brandsCount: number;
    productsCount: number;
    testResultsCount: number;
    categories: string[];
}> {
    const [brandsResult, productsResult, testResultsResult] = await Promise.all([
        supabase.from('brands').select('id', { count: 'exact', head: true }),
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('test_results').select('id', { count: 'exact', head: true }),
    ]);

    // Get unique categories
    const { data: categoryData } = await supabase
        .from('brands')
        .select('category');

    const categories = [...new Set((categoryData || []).map(b => b.category))];

    return {
        brandsCount: brandsResult.count || 0,
        productsCount: productsResult.count || 0,
        testResultsCount: testResultsResult.count || 0,
        categories,
    };
}

// ============================================
// FILTER HELPERS
// ============================================

export async function getBrandsByTestType(testType: string): Promise<Brand[]> {
    // This would require a join through products and test_results
    // For now, we'll return all brands that have products with the specified test type
    const { data, error } = await supabase
        .from('brands')
        .select(`
            *,
            products!inner (
                test_results!inner (
                    test_type
                )
            )
        `)
        .eq('products.test_results.test_type', testType);

    if (error) {
        console.error('Error fetching brands by test type:', error);
        return [];
    }

    return data || [];
}

// ============================================
// CATEGORY INSIGHTS
// ============================================

export async function getCategoryInsights(category: string): Promise<CategoryInsight[]> {
    const { data, error } = await supabase
        .from('category_insights')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching category insights:', error);
        return [];
    }

    return data || [];
}

