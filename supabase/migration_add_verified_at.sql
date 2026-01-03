-- Migration: Add verified_at column and brand_documents table
-- Run this in Supabase SQL Editor: https://jszdvvdnrflwgtqqstnr.supabase.co
-- Date: January 2026

-- ===========================================
-- 1. Add verified_at column to brands table
-- ===========================================
ALTER TABLE brands ADD COLUMN IF NOT EXISTS verified_at TIMESTAMPTZ;

-- Add index for queries filtering by verification date
CREATE INDEX IF NOT EXISTS idx_brands_verified_at ON brands(verified_at);

-- ===========================================
-- 2. Create brand_documents table (1-to-many)
-- ===========================================
-- Allows multiple CoAs, certifications, and test reports per brand

CREATE TABLE IF NOT EXISTS brand_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT CHECK (type IN ('CoA', 'Certification', 'Test Report', 'Other')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS and add public read policy
ALTER TABLE brand_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON brand_documents FOR SELECT USING (true);

-- Add index for efficient brand lookups
CREATE INDEX IF NOT EXISTS idx_brand_documents_brand_id ON brand_documents(brand_id);

-- ===========================================
-- 3. Backfill verified_at for existing Tier 3 brands
-- ===========================================
-- Set verification dates for high-trust brands (trust_score >= 95)

UPDATE brands SET verified_at = '2025-10-15T00:00:00Z' WHERE trust_score >= 95 AND verified_at IS NULL;
UPDATE brands SET verified_at = '2025-11-01T00:00:00Z' WHERE trust_score >= 90 AND trust_score < 95 AND verified_at IS NULL;
UPDATE brands SET verified_at = '2025-12-01T00:00:00Z' WHERE trust_score >= 85 AND trust_score < 90 AND verified_at IS NULL;
