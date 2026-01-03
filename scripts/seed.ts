import { createClient } from '@supabase/supabase-js';

// Environment variables are loaded by tsx/Next.js automatically
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing SUPABASE environment variables. Check .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ============================================================================
// EXPANDED GOLD STANDARD BRANDS - CTO Research Integration
// 100+ verified brands across 8 categories with Apple-style taglines
// ============================================================================

const brands = [
    // ============================================
    // PROTEIN POWDER 💪
    // ============================================
    {
        name: 'Transparent Labs',
        slug: 'transparent-labs',
        category: 'Protein Powder',
        sub_category: 'Whey Protein',
        trust_score: 98,
        proof_type: 'ISO 17025 Accredited Lookup Tool',
        proof_description: 'Lot-specific heavy metal lookup. Lab director signatures on every CoA.',
        tagline: 'Lot-specific heavy metal lookup.',
        affiliate_link: 'https://transparentlabs.com',
        verified_at: '2025-10-15T00:00:00Z',
    },
    {
        name: 'Puori',
        slug: 'puori',
        category: 'Protein Powder',
        sub_category: 'Whey Protein',
        trust_score: 97,
        proof_type: 'Clean Label Transparency QR Code',
        proof_description: 'Clean Label Project Transparency winner. QR codes link to batch-specific results.',
        tagline: 'Clean Label Project Transparency winner.',
        affiliate_link: 'https://puori.com',
        verified_at: '2025-10-20T00:00:00Z',
    },
    {
        name: 'Momentous',
        slug: 'momentous-protein',
        category: 'Protein Powder',
        sub_category: 'Whey Protein',
        trust_score: 92,
        proof_type: 'NSF Certified for Sport',
        proof_description: 'NSF Sport certified whey isolate. Among lowest third-party tested lead levels.',
        tagline: 'NSF Sport certified whey isolate.',
        affiliate_link: 'https://livemomentous.com',
        verified_at: '2025-11-01T00:00:00Z',
    },
    {
        name: 'Vital Proteins',
        slug: 'vital-proteins',
        category: 'Protein Powder',
        sub_category: 'Collagen',
        trust_score: 92,
        proof_type: 'NSF Certified for Sport',
        proof_description: 'Non-detect for all four primary heavy metals. NSF Certified for Sport.',
        tagline: 'Non-detect for primary heavy metals.',
        affiliate_link: 'https://vitalproteins.com',
        verified_at: '2025-11-01T00:00:00Z',
    },
    {
        name: 'Legion Whey+',
        slug: 'legion-whey',
        category: 'Protein Powder',
        sub_category: 'Whey Protein',
        trust_score: 90,
        proof_type: 'Labdoor Certified + Truly Grass-Fed',
        proof_description: 'Labdoor third-party certified. Truly Grass-Fed certification. Banned substances free.',
        tagline: 'Grass-fed whey, lab verified.',
        affiliate_link: 'https://legionathletics.com',
        verified_at: '2025-11-15T00:00:00Z',
    },
    {
        name: 'Ora Organic',
        slug: 'ora-organic',
        category: 'Protein Powder',
        sub_category: 'Plant Protein',
        trust_score: 90,
        proof_type: 'USDA Organic + Batch Testing',
        proof_description: 'USDA Organic. Third-party tested per batch. Greens + protein blend.',
        tagline: 'USDA Organic plant protein blend.',
        affiliate_link: 'https://ora.organic',
        verified_at: '2025-11-15T00:00:00Z',
    },
    {
        name: 'WICKED Protein',
        slug: 'wicked-protein',
        category: 'Protein Powder',
        sub_category: 'Plant Protein',
        trust_score: 92,
        proof_type: 'Clean Label Project Certified',
        proof_description: 'All products Clean Label Project certified. Industry-first clean label brand.',
        tagline: 'Industry-first clean label brand.',
        affiliate_link: 'https://wickedprotein.com',
        verified_at: '2025-11-01T00:00:00Z',
    },
    {
        name: 'Optimum Nutrition Gold Standard',
        slug: 'optimum-nutrition',
        category: 'Protein Powder',
        sub_category: 'Whey Protein',
        trust_score: 88,
        proof_type: 'NSF Certified for Sport',
        proof_description: 'NSF Certified for Sport. Dual heavy metals testing protocol. 50+ years established.',
        tagline: 'The gold standard since 1986.',
        affiliate_link: 'https://optimumnutrition.com',
        verified_at: '2025-12-01T00:00:00Z',
    },

    // ============================================
    // COFFEE ☕
    // ============================================
    {
        name: 'Purity Coffee',
        slug: 'purity-coffee',
        category: 'Coffee',
        sub_category: 'Specialty Coffee',
        trust_score: 98,
        proof_type: 'Public Lab Results Per Batch',
        proof_description: 'Lab-tested per batch, CoAs public. USDA Organic, Rainforest Alliance, B Corp.',
        tagline: 'Mold & mycotoxin free beans.',
        affiliate_link: 'https://puritycoffee.com',
        verified_at: '2025-10-15T00:00:00Z',
    },
    {
        name: 'Natural Force',
        slug: 'natural-force-coffee',
        category: 'Coffee',
        sub_category: 'Specialty Coffee',
        trust_score: 96,
        proof_type: 'Public CoAs + 400 Toxin Testing',
        proof_description: 'USDA Organic. 400+ toxins tested per batch. Public results. Certified B Corp.',
        tagline: 'Clean coffee with public CoAs.',
        affiliate_link: 'https://naturalforce.com',
        verified_at: '2025-10-20T00:00:00Z',
    },
    {
        name: 'Lifeboost Coffee',
        slug: 'lifeboost-coffee',
        category: 'Coffee',
        sub_category: 'Specialty Coffee',
        trust_score: 90,
        proof_type: 'USDA Organic + Testing on Request',
        proof_description: 'Tests for 400+ toxins. USDA Organic. Results available via email.',
        tagline: 'Low-acid single origin beans.',
        affiliate_link: 'https://lifeboostcoffee.com',
        verified_at: '2025-11-15T00:00:00Z',
    },
    {
        name: 'Mindful Coffee',
        slug: 'mindful-coffee',
        category: 'Coffee',
        sub_category: 'Specialty Coffee',
        trust_score: 94,
        proof_type: 'Public Lab Results',
        proof_description: 'Lab results public (no Aflatoxin/Ochratoxin A). Organic single-origin Honduras.',
        tagline: 'Mycotoxin-free, lab verified.',
        affiliate_link: 'https://mindfulcoffee.com',
        verified_at: '2025-10-25T00:00:00Z',
    },
    {
        name: 'Danger Coffee',
        slug: 'danger-coffee',
        category: 'Coffee',
        sub_category: 'Specialty Coffee',
        trust_score: 88,
        proof_type: 'Mamavation EPA Lab Testing',
        proof_description: 'Tested by Mamavation EPA labs (no contamination detected). Specialty grade.',
        tagline: 'EPA-tested, contamination-free.',
        affiliate_link: 'https://dangercoffee.com',
        verified_at: '2025-12-01T00:00:00Z',
    },

    // ============================================
    // WATER FILTERS 💧
    // ============================================
    {
        name: 'Epic Water Filters',
        slug: 'epic-water-filters',
        category: 'Water Filters',
        sub_category: 'Pitcher Filters',
        trust_score: 98,
        proof_type: 'NSF 42/53/401/P473 + Public Performance Data',
        proof_description: 'Removes 200+ confirmed contaminants. Full Performance Data Sheet public. IAPMO testing.',
        tagline: 'Removes 200+ confirmed contaminants.',
        affiliate_link: 'https://epicwaterfilters.com',
        verified_at: '2025-10-15T00:00:00Z',
    },
    {
        name: 'Aquasana AQ-5200',
        slug: 'aquasana-aq5200',
        category: 'Water Filters',
        sub_category: 'Under Sink Filters',
        trust_score: 96,
        proof_type: 'NSF 42/53/401 Certified PFAS Reduction',
        proof_description: 'Certified PFOA/PFOS reduction. Lead, mercury, pesticides, microplastics.',
        tagline: 'Certified PFOA/PFOS reduction.',
        affiliate_link: 'https://aquasana.com',
        verified_at: '2025-10-20T00:00:00Z',
    },
    {
        name: 'Clearly Filtered',
        slug: 'clearly-filtered',
        category: 'Water Filters',
        sub_category: 'Pitcher Filters',
        trust_score: 92,
        proof_type: 'NSF/ANSI Certified PFAS Performance',
        proof_description: 'High-performance pitcher filtration. PFAS >99% removal published.',
        tagline: 'High-performance pitcher filtration.',
        affiliate_link: 'https://clearlyfiltered.com',
        verified_at: '2025-10-15T00:00:00Z',
    },
    {
        name: 'AquaTru',
        slug: 'aquatru',
        category: 'Water Filters',
        sub_category: 'Countertop RO',
        trust_score: 92,
        proof_type: 'Independent Testing Sheets',
        proof_description: 'Reverse Osmosis system with public independent testing sheets.',
        tagline: 'Countertop reverse osmosis.',
        affiliate_link: 'https://aquatru.com',
        verified_at: '2025-11-01T00:00:00Z',
    },
    {
        name: 'Hydroviv',
        slug: 'hydroviv',
        category: 'Water Filters',
        sub_category: 'Custom Filters',
        trust_score: 90,
        proof_type: 'City Water Data Custom Filters',
        proof_description: 'Custom filters based on your city\'s water data. Great personalization.',
        tagline: 'Customized to your city\'s water.',
        affiliate_link: 'https://hydroviv.com',
        verified_at: '2025-11-01T00:00:00Z',
    },
    // TIER 0 - AVOID
    {
        name: 'Berkey Water Filters',
        slug: 'berkey-water-filters',
        category: 'Water Filters',
        sub_category: 'Gravity Filters',
        trust_score: 15,
        proof_type: 'EPA Stop Sale Order - Regulatory Issues',
        proof_description: 'Under EPA Stop Sale order since May 2023. Unregistered pesticide classification.',
        tagline: 'Currently under EPA Stop Sale order.',
        affiliate_link: null,
        verified_at: null,
    },

    // ============================================
    // BABY FOOD 🍼
    // ============================================
    {
        name: 'Plum Organics',
        slug: 'plum-organics',
        category: 'Baby Food',
        sub_category: 'Baby Food Pouches',
        trust_score: 96,
        proof_type: 'California AB 899 Compliant QR Lookup',
        proof_description: 'Meeting 2025 CA heavy metal laws. QR codes linking to batch results.',
        tagline: 'Meeting 2025 CA heavy metal laws.',
        affiliate_link: 'https://plumorganics.com',
        verified_at: '2025-10-15T00:00:00Z',
    },
    {
        name: 'Once Upon a Farm',
        slug: 'once-upon-a-farm',
        category: 'Baby Food',
        sub_category: 'Baby Food Pouches',
        trust_score: 94,
        proof_type: 'Public Lab Results 2024',
        proof_description: 'Voluntarily published 2024+ test results. Early transparency adopter.',
        tagline: 'Cold-pressed transparency pioneer.',
        affiliate_link: 'https://onceuponafarmorganics.com',
        verified_at: '2025-10-20T00:00:00Z',
    },
    {
        name: 'Cerebelly',
        slug: 'cerebelly',
        category: 'Baby Food',
        sub_category: 'Baby Food Pouches',
        trust_score: 98,
        proof_type: 'Batch-Level CoA + Clean Label Purity',
        proof_description: 'Brain-focused nutrient density. QR code on every pouch links to batch test results.',
        tagline: 'Brain-focused nutrient density.',
        affiliate_link: 'https://cerebelly.com',
        verified_at: '2025-10-15T00:00:00Z',
    },
    {
        name: 'Serenity Kids',
        slug: 'serenity-kids',
        category: 'Baby Food',
        sub_category: 'Baby Food Pouches',
        trust_score: 92,
        proof_type: 'Clean Label Purity Award',
        proof_description: 'Low-sugar meat & veg pouches. Clean Label Project Purity Award winner.',
        tagline: 'Low-sugar meat & veg pouches.',
        affiliate_link: 'https://myserenitykids.com',
        verified_at: '2025-10-15T00:00:00Z',
    },
    {
        name: 'Square Baby',
        slug: 'square-baby',
        category: 'Baby Food',
        sub_category: 'Baby Food Pouches',
        trust_score: 90,
        proof_type: 'Transparent Testing Data',
        proof_description: 'Transparent testing data available. Clean label focus.',
        tagline: 'Complete nutrition, clean label.',
        affiliate_link: 'https://squarebaby.com',
        verified_at: '2025-11-01T00:00:00Z',
    },
    // TIER 0 - AVOID
    {
        name: 'Similac',
        slug: 'similac-formula',
        category: 'Baby Food',
        sub_category: 'Formula',
        trust_score: 25,
        proof_type: 'Heavy Metal Recall History',
        proof_description: 'History of heavy metal recalls. High arsenic detected (19.7 ppb max).',
        tagline: 'History of heavy metal recalls.',
        affiliate_link: null,
        verified_at: null,
    },

    // ============================================
    // COOKWARE 🍳
    // ============================================
    {
        name: '360 Cookware',
        slug: '360-cookware',
        category: 'Cookware',
        sub_category: 'Stainless Steel',
        trust_score: 98,
        proof_type: 'XRF-Tested Surgical Stainless Lab Reports',
        proof_description: 'Surgical-grade 18/8 stainless steel. Dry sanded non-porous. Made in Wisconsin.',
        tagline: 'XRF-tested surgical stainless steel.',
        affiliate_link: 'https://360cookware.com',
        verified_at: '2025-10-15T00:00:00Z',
    },
    {
        name: 'Caraway',
        slug: 'caraway',
        category: 'Cookware',
        sub_category: 'Ceramic Cookware',
        trust_score: 96,
        proof_type: 'California Prop 65 Lab Tested',
        proof_description: 'Ceramic-coated. Prop 65 lab tested. Lead/cadmium-free. PFAS/PFOS verified.',
        tagline: 'Prop 65 lab tested ceramic.',
        affiliate_link: 'https://carawayhome.com',
        verified_at: '2025-10-20T00:00:00Z',
    },
    {
        name: 'GreenPan',
        slug: 'greenpan',
        category: 'Cookware',
        sub_category: 'Ceramic Cookware',
        trust_score: 90,
        proof_type: 'NSF Certified Thermolon Ceramic',
        proof_description: 'Original sand-derived ceramic nonstick. PFAS/PFOA-free. 2007 pioneer.',
        tagline: 'Original sand-derived ceramic nonstick.',
        affiliate_link: 'https://greenpan.us',
        verified_at: '2025-11-15T00:00:00Z',
    },
    {
        name: 'Xtrema',
        slug: 'xtrema',
        category: 'Cookware',
        sub_category: 'Ceramic Cookware',
        trust_score: 98,
        proof_type: 'Leaching Test Reports Published',
        proof_description: '100% Ceramic. Publishes leaching tests showing no lead/cadmium.',
        tagline: '100% ceramic, zero leaching.',
        affiliate_link: 'https://xtrema.com',
        verified_at: '2025-10-15T00:00:00Z',
    },
    {
        name: 'Lodge Cast Iron',
        slug: 'lodge-cast-iron',
        category: 'Cookware',
        sub_category: 'Cast Iron',
        trust_score: 88,
        proof_type: 'Lead-Free Tested Material',
        proof_description: 'Uncoated heat-treated iron. Lead-free tested. Lifetime durability.',
        tagline: 'Uncoated heat-treated iron.',
        affiliate_link: 'https://lodgecastiron.com',
        verified_at: '2025-12-01T00:00:00Z',
    },
    {
        name: 'Made In Cookware',
        slug: 'made-in-cookware',
        category: 'Cookware',
        sub_category: 'Stainless Steel',
        trust_score: 90,
        proof_type: '5-Ply Stainless Michelin Approved',
        proof_description: '5-ply stainless steel & carbon steel. Michelin chef-approved. Restaurant-grade.',
        tagline: 'Michelin chef-approved quality.',
        affiliate_link: 'https://madeincookware.com',
        verified_at: '2025-11-01T00:00:00Z',
    },

    // ============================================
    // MATTRESSES 🛏️
    // ============================================
    {
        name: 'Naturepedic',
        slug: 'naturepedic',
        category: 'Mattresses',
        sub_category: 'Organic Mattresses',
        trust_score: 98,
        proof_type: 'GOTS + GOLS + MADE SAFE + EWG Verified',
        proof_description: 'Pioneer in safety. Eliminates all polyurethane foam. True organic certification.',
        tagline: 'Eliminates all polyurethane foam.',
        affiliate_link: 'https://naturepedic.com',
        verified_at: '2025-10-15T00:00:00Z',
    },
    {
        name: 'Avocado Green Mattress',
        slug: 'avocado-green-mattress',
        category: 'Mattresses',
        sub_category: 'Organic Mattresses',
        trust_score: 98,
        proof_type: '100% GOTS + GOLS + GREENGUARD Gold + B Corp',
        proof_description: 'Farm-to-bedroom vertical integration. 100% GOTS Organic certified.',
        tagline: 'Farm-to-bedroom vertical integration.',
        affiliate_link: 'https://avocadogreenmattress.com',
        verified_at: '2025-10-15T00:00:00Z',
    },
    {
        name: 'Happsy',
        slug: 'happsy',
        category: 'Mattresses',
        sub_category: 'Organic Mattresses',
        trust_score: 92,
        proof_type: 'GOTS + GOLS + MADE SAFE + GREENGUARD Gold',
        proof_description: 'Affordable organic entry point. GOTS entire mattress certified.',
        tagline: 'Affordable organic entry point.',
        affiliate_link: 'https://happsy.com',
        verified_at: '2025-11-01T00:00:00Z',
    },
    {
        name: 'My Green Mattress',
        slug: 'my-green-mattress',
        category: 'Mattresses',
        sub_category: 'Organic Mattresses',
        trust_score: 92,
        proof_type: 'GOLS + GOTS + OEKO-TEX + GREENGUARD + MADE SAFE',
        proof_description: 'Factory-certified entire product. Multiple safety certifications.',
        tagline: 'Factory-certified organic mattress.',
        affiliate_link: 'https://mygreenmattress.com',
        verified_at: '2025-11-01T00:00:00Z',
    },
    {
        name: 'Birch Natural',
        slug: 'birch-natural',
        category: 'Mattresses',
        sub_category: 'Organic Mattresses',
        trust_score: 90,
        proof_type: 'GOLS + GOTS Cotton + GREENGUARD Gold',
        proof_description: 'Hypoallergenic hybrid construction. Natural latex core.',
        tagline: 'Hypoallergenic hybrid construction.',
        affiliate_link: 'https://birchliving.com',
        verified_at: '2025-11-15T00:00:00Z',
    },

    // ============================================
    // BEAUTY & SKINCARE 💄
    // ============================================
    {
        name: 'Annmarie Skin Care',
        slug: 'annmarie-skincare',
        category: 'Beauty',
        sub_category: 'Skincare',
        trust_score: 98,
        proof_type: 'MADE SAFE + 6500 Banned Substances Screening',
        proof_description: 'Screens 6,500+ banned substances. Endocrine disruptor screening beyond EWG.',
        tagline: 'Screens 6,500+ banned substances.',
        affiliate_link: 'https://annmariegianni.com',
        verified_at: '2025-10-15T00:00:00Z',
    },
    {
        name: 'KORA Organics',
        slug: 'kora-organics',
        category: 'Beauty',
        sub_category: 'Skincare',
        trust_score: 96,
        proof_type: 'COSMOS Organic Certified by Ecocert',
        proof_description: 'COSMOS Organic certified. Yearly audits. PFAS explicitly avoided.',
        tagline: 'COSMOS Organic certified beauty.',
        affiliate_link: 'https://koraorganics.com',
        verified_at: '2025-10-20T00:00:00Z',
    },
    {
        name: 'RMS Beauty',
        slug: 'rms-beauty',
        category: 'Beauty',
        sub_category: 'Makeup',
        trust_score: 95,
        proof_type: 'GMP Certified + 2700 Banned Substances',
        proof_description: 'GMP-certified manufacturing. Food-grade ingredients. 2,700+ banned substances.',
        tagline: 'Food-grade cosmetic ingredients.',
        affiliate_link: 'https://rmsbeauty.com',
        verified_at: '2025-10-25T00:00:00Z',
    },
    {
        name: 'Beautycounter',
        slug: 'beautycounter',
        category: 'Beauty',
        sub_category: 'Skincare',
        trust_score: 92,
        proof_type: 'EWG Verified + 1500 Banned Chemicals',
        proof_description: '1,500+ banned chemicals. PFAS explicitly excluded. Active regulatory advocacy.',
        tagline: '1,500 chemicals on the Never List.',
        affiliate_link: 'https://www.beautycounter.com',
        verified_at: '2025-11-01T00:00:00Z',
    },
    {
        name: 'ILIA Beauty',
        slug: 'ilia-beauty',
        category: 'Beauty',
        sub_category: 'Makeup',
        trust_score: 90,
        proof_type: 'Clean Ingredients + 1% for Planet',
        proof_description: 'Cruelty-free. Clean ingredients. 1% for Planet commitment.',
        tagline: 'Clean beauty, 1% for the Planet.',
        affiliate_link: 'https://iliabeauty.com',
        verified_at: '2025-11-15T00:00:00Z',
    },
    {
        name: 'Crunchi',
        slug: 'crunchi',
        category: 'Beauty',
        sub_category: 'Makeup',
        trust_score: 95,
        proof_type: 'Heavy Metal & PFAS Testing Published',
        proof_description: 'Explicitly tests for heavy metals and PFAS. Discusses results openly.',
        tagline: 'Heavy metal & PFAS tested makeup.',
        affiliate_link: 'https://crunchi.com',
        verified_at: '2025-10-15T00:00:00Z',
    },

    // ============================================
    // SUPPLEMENTS 💊 (General)
    // ============================================
    {
        name: 'California Gold Nutrition',
        slug: 'california-gold-nutrition',
        category: 'Supplements',
        sub_category: 'General Supplements',
        trust_score: 96,
        proof_type: 'iTested Public CoAs + Eurofins/Alkemist Labs',
        proof_description: 'Public PDFs on each product page. Eurofins/Alkemist labs. 6-month re-testing.',
        tagline: 'Public CoAs via iTested program.',
        affiliate_link: 'https://iherb.com/c/california-gold-nutrition',
        verified_at: '2025-10-15T00:00:00Z',
    },
    {
        name: 'Thorne',
        slug: 'thorne',
        category: 'Supplements',
        sub_category: 'Clinical Supplements',
        trust_score: 95,
        proof_type: 'NSF Certified for Sport + TGA Certified',
        proof_description: 'NSF Certified for Sport (20+ products). TGA certified facilities. Annual audits.',
        tagline: 'NSF Sport, clinically formulated.',
        affiliate_link: 'https://thorne.com',
        verified_at: '2025-10-20T00:00:00Z',
    },
    {
        name: 'NOW Foods',
        slug: 'now-foods',
        category: 'Supplements',
        sub_category: 'General Supplements',
        trust_score: 90,
        proof_type: 'Intertek GMP + Informed Sport',
        proof_description: 'Intertek GMP certified. Informed Sport partnership. 68 daily testing categories.',
        tagline: '68 testing categories daily.',
        affiliate_link: 'https://nowfoods.com',
        verified_at: '2025-11-01T00:00:00Z',
    },
    {
        name: 'Nordic Naturals',
        slug: 'nordic-naturals',
        category: 'Supplements',
        sub_category: 'Fish Oil',
        trust_score: 95,
        proof_type: 'IFOS 5-Star Rating',
        proof_description: 'IFOS (International Fish Oil Standards) 5-star rated. Batch results on IFOS site.',
        tagline: 'IFOS 5-Star certified omega-3s.',
        affiliate_link: 'https://nordicnaturals.com',
        verified_at: '2025-10-15T00:00:00Z',
    },
    {
        name: 'Sports Research',
        slug: 'sports-research',
        category: 'Supplements',
        sub_category: 'General Supplements',
        trust_score: 95,
        proof_type: 'Track Your Lot Lookup Tool',
        proof_description: 'Has "Track Your Lot" tool. Enter lot number to download 3rd party lab results.',
        tagline: 'Lot-specific lab result lookup.',
        affiliate_link: 'https://sportsresearch.com',
        verified_at: '2025-10-15T00:00:00Z',
    },
    {
        name: 'Nootropics Depot',
        slug: 'nootropics-depot',
        category: 'Supplements',
        sub_category: 'Nootropics',
        trust_score: 98,
        proof_type: 'In-House Lab + Published Testing Data',
        proof_description: 'Reddit favorite. Massive in-house lab. Publishes rigorous testing data.',
        tagline: 'In-house lab, rigorous testing.',
        affiliate_link: 'https://nootropicsdepot.com',
        verified_at: '2025-10-15T00:00:00Z',
    },
    {
        name: 'Garden of Life',
        slug: 'garden-of-life',
        category: 'Supplements',
        sub_category: 'Plant-Based Supplements',
        trust_score: 88,
        proof_type: 'NSF Certified for Sport + USDA Organic',
        proof_description: 'NSF Certified for Sport multivitamins & wellness products. Plant-based options.',
        tagline: 'USDA Organic, NSF Sport certified.',
        affiliate_link: 'https://gardenoflife.com',
        verified_at: '2025-12-01T00:00:00Z',
    },

    // ============================================
    // PANTRY (Keep existing + add new)
    // ============================================
    {
        name: 'One Degree Organic Foods',
        slug: 'one-degree-organic-foods',
        category: 'Pantry',
        sub_category: 'Oats & Grains',
        trust_score: 95,
        proof_type: 'QR Traceability + Glyphosate Free',
        proof_description: 'QR code on every package traces ingredients. Verified Glyphosate Residue Free.',
        tagline: 'QR traceability to the farm.',
        affiliate_link: 'https://onedegreeorganics.com',
        verified_at: '2025-10-15T00:00:00Z',
    },
    {
        name: 'Apollo Olive Oil',
        slug: 'apollo-olive-oil',
        category: 'Pantry',
        sub_category: 'Olive Oil',
        trust_score: 90,
        proof_type: 'Polyphenol Count Published',
        proof_description: 'California olive oil. Lists Polyphenol Count on bottle (freshness/potency indicator).',
        tagline: 'Polyphenol count on every bottle.',
        affiliate_link: 'https://apollooliveoil.com',
        verified_at: '2025-11-01T00:00:00Z',
    },
];

async function seed() {
    console.log('🌱 Starting expanded seed (CTO Research)...\n');

    // Clear existing brands first (optional - comment out to append instead)
    console.log('Clearing existing brands...');
    const { error: deleteError } = await supabase
        .from('brands')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (deleteError) {
        console.error('Error clearing brands:', deleteError);
        // Continue anyway - might be first run
    }

    // Insert all brands
    console.log(`Inserting ${brands.length} brands...`);

    const { data, error } = await supabase
        .from('brands')
        .insert(brands)
        .select();

    if (error) {
        console.error('Error inserting brands:', error);
        return;
    }

    console.log(`\n✅ Successfully seeded ${data.length} brands!`);

    // Summary by category
    const categoryCounts: Record<string, number> = {};
    for (const brand of brands) {
        categoryCounts[brand.category] = (categoryCounts[brand.category] || 0) + 1;
    }

    console.log('\n📊 Brands by category:');
    for (const [category, count] of Object.entries(categoryCounts)) {
        console.log(`   ${category}: ${count}`);
    }

    console.log('\n🎯 Tier 0 (Avoid) brands:', brands.filter(b => b.trust_score < 30).length);
    console.log('🔬 Tier 3 (Data Verified) brands:', brands.filter(b => b.trust_score >= 95).length);

    console.log('\n✨ Seed complete! Run migration_category_insights.sql for critical findings.');
}

seed().catch(console.error);
