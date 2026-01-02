/**
 * Data layer for Better Brand Directory
 * Fetches data from Supabase instead of mock data
 */

import { supabase } from './supabase';
import type { Brand, Product, TestResult } from '@/types/database';

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
