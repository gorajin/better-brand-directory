-- Extended Schema for Better Brand Directory
-- Run this in Supabase SQL Editor (https://jszdvvdnrflwgtqqstnr.supabase.co)

-- Drop existing tables if needed (for fresh start)
DROP TABLE IF EXISTS product_ingredients CASCADE;
DROP TABLE IF EXISTS test_results CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS ingredients CASCADE;
DROP TABLE IF EXISTS brands CASCADE;

-- Brands table with category support
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  affiliate_link TEXT,
  trust_score INTEGER DEFAULT 0,
  category TEXT NOT NULL, -- e.g., 'Beauty', 'Baby Food', 'Supplements'
  sub_category TEXT, -- e.g., 'Makeup', 'Skincare', 'Fish Oil'
  proof_type TEXT, -- e.g., 'CoA', 'Purity Award', 'IFOS 5-Star', 'Certification'
  proof_url TEXT, -- Link to evidence
  proof_description TEXT, -- Human-readable description of the proof
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  category TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(brand_id, slug)
);

-- Test Results table
CREATE TABLE test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  test_type TEXT NOT NULL CHECK (test_type IN ('PFAS', 'HeavyMetals', 'Glyphosate', 'Pesticides', 'Microplastics', 'Mycotoxins', 'VOCs', 'Leaching')),
  status TEXT NOT NULL CHECK (status IN ('Pass', 'Fail', 'NonDetect', 'Pending')),
  result_value TEXT,
  pdf_url TEXT,
  tested_at DATE,
  lab_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ingredients table
CREATE TABLE ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  safety_level TEXT NOT NULL CHECK (safety_level IN ('Safe', 'Caution', 'Avoid')),
  description TEXT,
  sources TEXT[]
);

-- Junction table for products and ingredients
CREATE TABLE product_ingredients (
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  ingredient_id UUID REFERENCES ingredients(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, ingredient_id)
);

-- Enable Row Level Security (RLS) for public read access
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_ingredients ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access" ON brands FOR SELECT USING (true);
CREATE POLICY "Public read access" ON products FOR SELECT USING (true);
CREATE POLICY "Public read access" ON test_results FOR SELECT USING (true);
CREATE POLICY "Public read access" ON ingredients FOR SELECT USING (true);
CREATE POLICY "Public read access" ON product_ingredients FOR SELECT USING (true);

-- Create indexes for common queries
CREATE INDEX idx_brands_category ON brands(category);
CREATE INDEX idx_brands_slug ON brands(slug);
CREATE INDEX idx_products_brand_id ON products(brand_id);
CREATE INDEX idx_test_results_product_id ON test_results(product_id);
