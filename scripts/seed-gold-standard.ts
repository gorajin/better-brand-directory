/**
 * Add new Gold Standard brands with Dynamic Proof types
 * Run with: npx tsx scripts/seed-gold-standard.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jszdvvdnrflwgtqqstnr.supabase.co';
const supabaseAnonKey = 'sb_publishable_GO0xJ0AtMDEl2FYtuNztBQ_EnnCwFwY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// New Gold Standard Brands with Dynamic Proof Types
const newBrands = [
    // ============================================
    // SUPPLEMENTS - "Radical Transparency" Tier
    // ============================================
    {
        name: 'Transparent Labs',
        slug: 'transparent-labs',
        category: 'Supplements',
        sub_category: 'Protein Powder',
        trust_score: 98,
        proof_type: 'Lookup Tool',
        proof_description: 'ISO 17025 Verified. Enter your lot number to view batch-specific heavy metal results.',
        affiliate_link: 'https://transparentlabs.com',
    },
    {
        name: 'Puori',
        slug: 'puori',
        category: 'Supplements',
        sub_category: 'Fish Oil',
        trust_score: 95,
        proof_type: 'QR Code',
        proof_description: 'Clean Label Certified. Scan QR on package for batch-specific results.',
        affiliate_link: 'https://puori.com',
    },
    {
        name: 'California Gold Nutrition',
        slug: 'california-gold-nutrition',
        category: 'Supplements',
        sub_category: 'General Supplements',
        trust_score: 92,
        proof_type: 'Static PDF',
        proof_description: 'Bacteria & Metal Tested. Each product has downloadable lab reports on iHerb.',
        proof_url: 'https://www.iherb.com',
        affiliate_link: 'https://www.iherb.com/c/california-gold-nutrition',
    },
    {
        name: 'The Maca Team',
        slug: 'the-maca-team',
        category: 'Supplements',
        sub_category: 'Adaptogens',
        trust_score: 90,
        proof_type: 'Static PDF',
        proof_description: 'Harvest Tracing. Single-origin Maca with CoAs for each harvest batch.',
        affiliate_link: 'https://themacateam.com',
    },

    // ============================================
    // LIVING - "XRF Testing" Tier
    // ============================================
    {
        name: '360 Cookware',
        slug: '360-cookware',
        category: 'Cookware',
        sub_category: 'Stainless Steel',
        trust_score: 98,
        proof_type: 'Static PDF',
        proof_description: 'Zero Leaching. XRF (X-ray fluorescence) tested surgical-grade stainless steel.',
        affiliate_link: 'https://360cookware.com',
    },
    {
        name: 'Epic Water Filters',
        slug: 'epic-water-filters',
        category: 'Water Filters',
        sub_category: 'Pitcher Filters',
        trust_score: 95,
        proof_type: 'Static PDF',
        proof_description: 'NSF 42/53/401/P473 certified. Raw performance data sheets for 200+ contaminants.',
        affiliate_link: 'https://epicwaterfilters.com',
    },
    {
        name: 'Happsy',
        slug: 'happsy',
        category: 'Mattresses',
        sub_category: 'Organic Mattresses',
        trust_score: 92,
        proof_type: 'Certification',
        proof_description: 'GOTS & MADE SAFE certified. Full product certification, not just materials.',
        affiliate_link: 'https://happsy.com',
    },

    // ============================================
    // FOOD & BABY - "Public Batch Data" Tier
    // ============================================
    {
        name: 'Plum Organics',
        slug: 'plum-organics',
        category: 'Baby Food',
        sub_category: 'Baby Food Pouches',
        trust_score: 95,
        proof_type: 'Static PDF',
        proof_description: 'LOD Transparency. Public heavy metal data for 2025+ batches with detection limits.',
        affiliate_link: 'https://plumorganics.com',
    },
    {
        name: 'Lifeboost Coffee',
        slug: 'lifeboost-coffee',
        category: 'Coffee',
        sub_category: 'Specialty Coffee',
        trust_score: 90,
        proof_type: 'Certification',
        proof_description: 'Mold & Acid Tested. 400+ toxin-tested single-origin beans.',
        affiliate_link: 'https://lifeboostcoffee.com',
    },
];

async function seed() {
    console.log('🌱 Adding new Gold Standard brands with Dynamic Proof types...\n');

    for (const brand of newBrands) {
        // Check if brand already exists
        const { data: existing } = await supabase
            .from('brands')
            .select('id')
            .eq('slug', brand.slug)
            .single();

        if (existing) {
            // Update existing brand
            const { error } = await supabase
                .from('brands')
                .update(brand)
                .eq('slug', brand.slug);

            if (error) {
                console.log(`❌ Error updating ${brand.name}: ${error.message}`);
            } else {
                console.log(`🔄 Updated: ${brand.name} (${brand.proof_type})`);
            }
        } else {
            // Insert new brand
            const { error } = await supabase
                .from('brands')
                .insert(brand);

            if (error) {
                console.log(`❌ Error inserting ${brand.name}: ${error.message}`);
            } else {
                console.log(`✅ Inserted: ${brand.name} (${brand.proof_type})`);
            }
        }
    }

    console.log('\n📊 Summary by Proof Type:');
    const proofTypes = newBrands.reduce((acc, brand) => {
        acc[brand.proof_type] = (acc[brand.proof_type] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    for (const [type, count] of Object.entries(proofTypes)) {
        const icon = type === 'Lookup Tool' ? '🔍' :
            type === 'QR Code' ? '📱' :
                type === 'Static PDF' ? '📄' : '🏆';
        console.log(`   ${icon} ${type}: ${count} brands`);
    }

    console.log('\n✨ Done! These brands will now show dynamic CTAs:');
    console.log('   • Lookup Tool → "Batch Lookup" button');
    console.log('   • QR Code → "Scan Batch" button');
    console.log('   • Static PDF → "View Analysis" button');
}

seed().catch(console.error);
