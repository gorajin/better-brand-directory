// Database types for Supabase - matches schema.sql

export type TestType = 'PFAS' | 'HeavyMetals' | 'Glyphosate' | 'Pesticides' | 'Microplastics' | 'Mycotoxins' | 'VOCs' | 'Leaching';
export type TestStatus = 'Pass' | 'Fail' | 'NonDetect' | 'Pending';
export type SafetyLevel = 'Safe' | 'Caution' | 'Avoid';
export type ProofType = 'Static PDF' | 'Lookup Tool' | 'QR Code' | 'Certification';

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  affiliate_link?: string;
  trust_score: number;
  category: string;        // e.g., 'Beauty', 'Baby Food', 'Supplements'
  sub_category?: string;   // e.g., 'Makeup', 'Skincare', 'Fish Oil', 'Protein Powder'
  tagline?: string;        // e.g., 'Lot-specific heavy metal lookup'
  proof_type?: ProofType;  // Dynamic proof type for UI behavior
  proof_url?: string;      // Link to evidence
  proof_description?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  brand_id: string;
  name: string;
  slug: string;
  category?: string;
  image_url?: string;
  created_at: string;
  // Joined data
  brand?: Brand;
  test_results?: TestResult[];
  ingredients?: Ingredient[];
}

export interface TestResult {
  id: string;
  product_id: string;
  test_type: TestType;
  status: TestStatus;
  result_value?: string;
  pdf_url?: string;
  tested_at?: string;
  lab_name?: string;
  created_at: string;
}

export interface Ingredient {
  id: string;
  name: string;
  safety_level: SafetyLevel;
  description?: string;
  sources?: string[];
}

export interface ProductIngredient {
  product_id: string;
  ingredient_id: string;
}

// Helper function to calculate trust score
export function calculateTrustScore(testResults: TestResult[]): number {
  let score = 0;

  const testTypes = new Set(testResults.map(t => t.test_type));
  const hasPublicCoAs = testResults.some(t => t.pdf_url);
  const hasThirdPartyLab = testResults.some(t => t.lab_name);

  // Scoring based on test types
  if (testTypes.has('PFAS')) score += 10;
  if (testTypes.has('HeavyMetals')) score += 20;
  if (testTypes.has('Glyphosate')) score += 10;
  if (testTypes.has('Pesticides')) score += 5;
  if (testTypes.has('Microplastics')) score += 5;

  // Bonus points
  if (hasPublicCoAs) score += 50;
  if (hasThirdPartyLab) score += 10;

  return Math.min(score, 100);
}
