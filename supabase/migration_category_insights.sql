-- Migration: Add category_insights table for "Critical Findings"
-- Run this in Supabase SQL Editor after migration_add_verified_at.sql
-- Date: January 2026

-- ===========================================
-- 1. Create category_insights table
-- ===========================================
-- Stores "Did you know?" warnings for category pages

CREATE TABLE IF NOT EXISTS category_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  fact TEXT NOT NULL,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS and public read
ALTER TABLE category_insights ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON category_insights FOR SELECT USING (true);

-- Add index for category lookups
CREATE INDEX IF NOT EXISTS idx_category_insights_category ON category_insights(category);

-- ===========================================
-- 2. Seed category insights (Critical Findings)
-- ===========================================

INSERT INTO category_insights (category, fact, source) VALUES
-- Protein Powder
('Protein Powder', 'Plant-based proteins average 9× more lead than whey-based products.', 'Consumer Reports 2025'),
('Protein Powder', 'Chocolate flavoring correlates with higher lead levels in protein powders.', 'Consumer Reports 2025'),
('Protein Powder', 'Over 66% of 23 tested products exceeded safe daily lead consumption limits.', 'Consumer Reports 2025'),

-- Coffee
('Coffee', 'African coffees have lowest heavy metals; Hawaii origin has highest contamination.', 'Mamavation EPA Testing 2024'),
('Coffee', '100% of organic coffees tested contained AMPA (glyphosate breakdown product).', 'Third-party Lab Studies'),
('Coffee', 'Specialty-grade coffees have the lowest contamination risk compared to mass-market brands.', 'Industry Testing Data'),

-- Water Filters
('Water Filters', 'Berkey filters are under EPA Stop Sale order since May 2023 for unregistered pesticide claims.', 'EPA 2023'),
('Water Filters', 'NSF/ANSI 53 certification covers lead, mercury, and cysts, but NOT all PFAS compounds.', 'NSF International'),
('Water Filters', 'Only NSF P473 certification guarantees 95%+ reduction of PFOS/PFOA specifically.', 'NSF International'),

-- Baby Food
('Baby Food', '94% of all baby foods tested had detectable heavy metals.', 'Congressional Investigation 2021'),
('Baby Food', 'Government testing found levels up to 177× FDA safe limits for lead in some products.', 'House Subcommittee Report'),
('Baby Food', 'Rice-based baby foods have the highest contamination rates.', 'FDA Testing 2024'),
('Baby Food', 'California AB 899 (effective Jan 1, 2025) now requires transparency on heavy metals.', 'California Legislature'),

-- Cookware
('Cookware', 'New stainless steel leaches more nickel/chromium; stabilizes after 6+ uses.', 'Material Safety Studies'),
('Cookware', 'Ceramic nonstick coatings degrade in 2-3 years, requiring replacement.', 'Industry Testing'),
('Cookware', 'Uncoated cast iron and carbon steel offer multi-generational durability with zero coating degradation.', 'Comparative Studies'),

-- Beauty/Skincare
('Beauty', 'No brand tested was entirely PFAS-free (median: 30 ppm when detectable).', 'FDA 2025'),
('Beauty', 'FDA found 51 PFAS compounds in 1,744 cosmetic formulations.', 'FDA December 2025'),
('Beauty', 'Highest PFAS contamination: eyeshadow, face products, eyeliners, powders.', 'FDA Cosmetics Testing'),

-- Mattresses
('Mattresses', 'GOTS certification covers entire textile supply chain, not just final product.', 'Global Organic Textile Standard'),
('Mattresses', 'GREENGUARD Gold limits 360+ VOCs with emissions under 0.5 mg/m³.', 'UL Certification Standards'),

-- Supplements (General)
('Supplements', 'NSF Certified for Sport is the highest verification standard, required for professional athletes.', 'NSF International'),
('Supplements', 'ISO/IEC 17025 accredited labs provide legally defensible batch testing.', 'International Standards Organization');
