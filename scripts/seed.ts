/**
 * Seed script to populate Supabase with Gold Standard brands
 * Run with: npx tsx scripts/seed.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jszdvvdnrflwgtqqstnr.supabase.co';
const supabaseAnonKey = 'sb_publishable_GO0xJ0AtMDEl2FYtuNztBQ_EnnCwFwY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Gold Standard Brands Data
const brands = [
    // ============================================
    // BEAUTY 💄 (PFAS & Heavy Metal Testing)
    // ============================================
    {
        name: 'Crunchi',
        slug: 'crunchi',
        category: 'Beauty',
        sub_category: 'Makeup',
        trust_score: 95,
        proof_type: 'Heavy Metal & PFAS Testing',
        proof_description: 'Explicitly tests for heavy metals and PFAS. Discusses results openly.',
        affiliate_link: 'https://crunchi.com',
    },
    {
        name: '100% Pure',
        slug: '100-pure',
        category: 'Beauty',
        sub_category: 'Skincare',
        trust_score: 92,
        proof_type: 'Independent PFAS Testing',
        proof_description: 'Consistently passes Mamavation independent PFAS testing with "Non-Detect" results.',
        affiliate_link: 'https://www.100percentpure.com',
    },
    {
        name: 'Henné Organics',
        slug: 'henne-organics',
        category: 'Beauty',
        sub_category: 'Lip Care',
        trust_score: 90,
        proof_type: 'Organic Fluorine Testing',
        proof_description: 'Has passed independent organic fluorine (PFAS) testing.',
        affiliate_link: 'https://henneorganics.com',
    },
    {
        name: 'Beautycounter',
        slug: 'beautycounter',
        category: 'Beauty',
        sub_category: 'Skincare',
        trust_score: 88,
        proof_type: 'Heavy Metal Transparency',
        proof_description: 'Historically the leader in heavy metal transparency. (Currently restructuring)',
        affiliate_link: 'https://www.beautycounter.com',
    },
    {
        name: 'Primally Pure',
        slug: 'primally-pure',
        category: 'Beauty',
        sub_category: 'Skincare',
        trust_score: 85,
        proof_type: 'Sourcing Transparency',
        proof_description: 'High sourcing transparency. Popular with non-toxic influencer community.',
        affiliate_link: 'https://primallypure.com',
    },

    // ============================================
    // BABY FOOD 🍼 (Purity Award Winners)
    // ============================================
    {
        name: 'Serenity Kids',
        slug: 'serenity-kids',
        category: 'Baby Food',
        sub_category: 'Baby Food Pouches',
        trust_score: 95,
        proof_type: 'Clean Label Purity Award',
        proof_description: 'Winner of "Purity Award" from Clean Label Project. Publishes purity standards.',
        affiliate_link: 'https://myserenitykids.com',
    },
    {
        name: 'Cerebelly',
        slug: 'cerebelly',
        category: 'Baby Food',
        sub_category: 'Baby Food Pouches',
        trust_score: 98,
        proof_type: 'Batch-Level CoA',
        proof_description: 'Gold standard: QR code on every pouch links to that batch\'s heavy metal test results.',
        affiliate_link: 'https://cerebelly.com',
    },
    {
        name: 'Once Upon a Farm',
        slug: 'once-upon-a-farm',
        category: 'Baby Food',
        sub_category: 'Baby Food Pouches',
        trust_score: 92,
        proof_type: 'Clean Label Purity Award',
        proof_description: '"Purity Award" winner. Cold-pressed for nutrient retention.',
        affiliate_link: 'https://onceuponafarmorganics.com',
    },

    // ============================================
    // COFFEE ☕ (Mycotoxin-Free Testing)
    // ============================================
    {
        name: 'Purity Coffee',
        slug: 'purity-coffee',
        category: 'Coffee',
        sub_category: 'Specialty Coffee',
        trust_score: 95,
        proof_type: 'Public Lab Results',
        proof_description: 'Entire brand built on "Mold & Mycotoxin Free." Publishes lab results on site.',
        affiliate_link: 'https://puritycoffee.com',
    },
    {
        name: 'Lifeboost',
        slug: 'lifeboost',
        category: 'Coffee',
        sub_category: 'Specialty Coffee',
        trust_score: 88,
        proof_type: 'Third-Party Mycotoxin Testing',
        proof_description: 'Claims third-party testing for mycotoxins. Single-origin, shade-grown.',
        affiliate_link: 'https://lifeboostcoffee.com',
    },

    // ============================================
    // PANTRY 🥫 (Glyphosate Residue Free)
    // ============================================
    {
        name: 'One Degree Organic Foods',
        slug: 'one-degree-organic-foods',
        category: 'Pantry',
        sub_category: 'Oats & Grains',
        trust_score: 95,
        proof_type: 'QR Traceability + Glyphosate Free',
        proof_description: 'QR code on every package traces ingredients. Verified Glyphosate Residue Free.',
        affiliate_link: 'https://onedegreeorganics.com',
    },
    {
        name: 'Oatly',
        slug: 'oatly',
        category: 'Pantry',
        sub_category: 'Plant-Based Milk',
        trust_score: 85,
        proof_type: 'Glyphosate Residue Free Certification',
        proof_description: 'Certified Glyphosate Residue Free by The Detox Project.',
        affiliate_link: 'https://oatly.com',
    },
    {
        name: 'Chobani',
        slug: 'chobani',
        category: 'Pantry',
        sub_category: 'Plant-Based Milk',
        trust_score: 82,
        proof_type: 'Glyphosate Residue Free Certification',
        proof_description: 'Certified Glyphosate Residue Free by The Detox Project.',
        affiliate_link: 'https://chobani.com',
    },
    {
        name: 'Apollo Olive Oil',
        slug: 'apollo-olive-oil',
        category: 'Pantry',
        sub_category: 'Olive Oil',
        trust_score: 90,
        proof_type: 'Polyphenol Count Published',
        proof_description: 'California olive oil. Lists Polyphenol Count on bottle (freshness/potency indicator).',
        affiliate_link: 'https://apollooliveoil.com',
    },

    // ============================================
    // SUPPLEMENTS 💊 (Public CoA Standard)
    // ============================================
    {
        name: 'Sports Research',
        slug: 'sports-research',
        category: 'Supplements',
        sub_category: 'General Supplements',
        trust_score: 95,
        proof_type: 'Track Your Lot Tool',
        proof_description: 'Has "Track Your Lot" tool. Enter lot number to download 3rd party lab results.',
        affiliate_link: 'https://sportsresearch.com',
    },
    {
        name: 'Nootropics Depot',
        slug: 'nootropics-depot',
        category: 'Supplements',
        sub_category: 'Nootropics',
        trust_score: 98,
        proof_type: 'In-House Lab + Published Data',
        proof_description: 'Reddit favorite. Massive in-house lab. Publishes rigorous testing data.',
        affiliate_link: 'https://nootropicsdepot.com',
    },
    {
        name: 'Nordic Naturals',
        slug: 'nordic-naturals',
        category: 'Supplements',
        sub_category: 'Fish Oil',
        trust_score: 95,
        proof_type: 'IFOS 5-Star Rating',
        proof_description: 'IFOS (International Fish Oil Standards) 5-star rated. Batch results on IFOS site.',
        affiliate_link: 'https://nordicnaturals.com',
    },
    {
        name: 'Thorne',
        slug: 'thorne',
        category: 'Supplements',
        sub_category: 'Clinical Supplements',
        trust_score: 92,
        proof_type: 'NSF Certified for Sport',
        proof_description: 'NSF Certified for Sport (highest standard, required for pro athletes).',
        affiliate_link: 'https://thorne.com',
    },

    // ============================================
    // WATER FILTERS 💧 (Performance Data Sheets)
    // ============================================
    {
        name: 'Clearly Filtered',
        slug: 'clearly-filtered',
        category: 'Water Filters',
        sub_category: 'Pitcher Filters',
        trust_score: 95,
        proof_type: 'Performance Data Sheet',
        proof_description: 'Publishes "Performance Data Sheet" proving removal of fluoride and PFAS.',
        affiliate_link: 'https://clearlyfiltered.com',
    },
    {
        name: 'AquaTru',
        slug: 'aquatru',
        category: 'Water Filters',
        sub_category: 'Countertop RO',
        trust_score: 92,
        proof_type: 'Independent Testing Sheets',
        proof_description: 'Reverse Osmosis system with public independent testing sheets.',
        affiliate_link: 'https://aquatru.com',
    },
    {
        name: 'Hydroviv',
        slug: 'hydroviv',
        category: 'Water Filters',
        sub_category: 'Custom Filters',
        trust_score: 90,
        proof_type: 'City Water Data Custom Filters',
        proof_description: 'Custom filters based on your city\'s water data. Great personalization hook.',
        affiliate_link: 'https://hydroviv.com',
    },

    // ============================================
    // MATTRESSES 🛏️ (GOTS / Greenguard)
    // ============================================
    {
        name: 'Naturepedic',
        slug: 'naturepedic',
        category: 'Mattresses',
        sub_category: 'Organic Mattresses',
        trust_score: 98,
        proof_type: 'GOTS + MADE SAFE Certified',
        proof_description: 'GOTS (Global Organic Textile Standard) + MADE SAFE certified.',
        affiliate_link: 'https://naturepedic.com',
    },
    {
        name: 'Avocado Green Mattress',
        slug: 'avocado-green-mattress',
        category: 'Mattresses',
        sub_category: 'Organic Mattresses',
        trust_score: 95,
        proof_type: 'GOTS + Greenguard Gold',
        proof_description: 'GOTS + Greenguard Gold certified (low VOCs).',
        affiliate_link: 'https://avocadogreenmattress.com',
    },

    // ============================================
    // COOKWARE 🍳 (Leaching Test Reports)
    // ============================================
    {
        name: 'Xtrema',
        slug: 'xtrema',
        category: 'Cookware',
        sub_category: 'Ceramic Cookware',
        trust_score: 98,
        proof_type: 'Leaching Test Reports',
        proof_description: '100% Ceramic. Publishes leaching tests showing no lead/cadmium.',
        affiliate_link: 'https://xtrema.com',
    },
    {
        name: 'Caraway',
        slug: 'caraway',
        category: 'Cookware',
        sub_category: 'Non-Stick Cookware',
        trust_score: 90,
        proof_type: 'No PTFE/PFOA Test Reports',
        proof_description: 'Publishes test reports showing no PTFE/PFOA. Trendy aesthetic.',
        affiliate_link: 'https://carawayhome.com',
    },
];

async function seed() {
    console.log('🌱 Starting seed...\n');

    // Clear existing data
    console.log('🗑️  Clearing existing brands...');
    const { error: deleteError } = await supabase.from('brands').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (deleteError) {
        console.error('Error clearing brands:', deleteError.message);
    }

    // Insert brands
    console.log('📦 Inserting Gold Standard brands...\n');

    const { data, error } = await supabase
        .from('brands')
        .insert(brands)
        .select();

    if (error) {
        console.error('❌ Error inserting brands:', error.message);
        console.error('   Details:', error.details);
        console.error('   Hint:', error.hint);
        return;
    }

    console.log(`✅ Successfully inserted ${data.length} brands!\n`);

    // Group by category for summary
    const categories = brands.reduce((acc, brand) => {
        acc[brand.category] = (acc[brand.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    console.log('📊 Summary by category:');
    for (const [category, count] of Object.entries(categories)) {
        console.log(`   ${category}: ${count} brands`);
    }
}

seed().catch(console.error);
