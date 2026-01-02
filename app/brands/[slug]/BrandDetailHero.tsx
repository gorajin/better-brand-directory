'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Brand } from '@/types/database';
import { TransparencyTier } from '@/lib/tiers';

interface BrandDetailHeroProps {
    brand: Brand;
    tier: TransparencyTier;
    tierConfig: {
        label: string;
        description: string;
        icon: string;
        color: string;
        bgColor: string;
        borderColor: string;
        barColor: string;
    };
}

// Smart taglines with specific value propositions
function getTagline(brand: Brand): string {
    if (brand.tagline) return brand.tagline;

    const taglines: Record<string, string> = {
        // Existing brands
        'cerebelly': 'Brain-focused organic baby pouches',
        'naturepedic': 'GOTS-certified organic mattresses',
        'nootropics depot': 'COA-verified cognitive supplements',
        'nootropics-depot': 'COA-verified cognitive supplements',
        'xtrema': '100% ceramic, zero PFAS cookware',
        'nordic naturals': 'IFOS 5-star purity rated',
        'clearly filtered': 'NSF 53 & 401 certified filters',
        'crunchi': 'EWG Verified clean cosmetics',
        'ilia beauty': 'Clean at Sephora certified',
        'vapour beauty': 'USDA Organic certified makeup',
        'one degree organic foods': 'Glyphosate-free organic oats',
        'one-degree-organic-foods': 'Glyphosate-free organic oats',
        'serenity kids': 'Heavy metal tested baby food',
        'once upon a farm': 'Cold-pressed organic pouches',
        'counter culture coffee': 'Mold & mycotoxin tested beans',
        'purity coffee': 'Mold & mycotoxin free verified',
        'thorne': 'NSF Certified for Sport',
        'pure encapsulations': 'Hypoallergenic, GMP verified',
        'life extension': 'COA published formulas',
        'avocado green': 'GOTS & GOLS certified organic',
        'birch living': 'GREENGUARD Gold certified',
        'caraway': 'PTFE & PFAS free ceramic',
        'our place': 'Non-toxic ceramic coating',
        'berkey': 'NSF/ANSI standard tested',
        'aquatru': 'NSF 53, 58, 401 certified',
        // New Gold Standard brands
        'transparent labs': 'Lot-specific heavy metal lookup',
        'transparent-labs': 'Lot-specific heavy metal lookup',
        'puori': 'QR code batch results on every pack',
        'california gold nutrition': 'Verified lab reports for every product',
        'california-gold-nutrition': 'Verified lab reports for every product',
        'the maca team': 'Harvest-specific single-origin CoAs',
        'the-maca-team': 'Harvest-specific single-origin CoAs',
        '360 cookware': 'XRF-tested surgical grade stainless',
        '360-cookware': 'XRF-tested surgical grade stainless',
        'epic water filters': 'Raw data for 200+ contaminants',
        'epic-water-filters': 'Raw data for 200+ contaminants',
        'happsy': 'Fully GOTS certified organic mattress',
        'plum organics': 'Public heavy metal batch data',
        'plum-organics': 'Public heavy metal batch data',
        'lifeboost coffee': '400+ toxin tested single-origin',
        'lifeboost-coffee': '400+ toxin tested single-origin',
    };

    const key = brand.slug?.toLowerCase() || brand.name.toLowerCase();
    if (taglines[key]) return taglines[key];

    // Generic fallback based on category
    const categoryTaglines: Record<string, string> = {
        'Beauty': 'Transparent ingredient disclosure',
        'Baby Food': 'Heavy metal tested formula',
        'Coffee': 'Mold & mycotoxin screened',
        'Pantry': 'Pesticide residue tested',
        'Supplements': 'Third-party COA verified',
        'Water Filters': 'Contaminant removal certified',
        'Mattresses': 'Low-VOC emission certified',
        'Cookware': 'Non-toxic coating verified',
    };

    return categoryTaglines[brand.category] || 'Transparency verified';
}

// Extract domain from affiliate link
function extractDomain(url: string | undefined): string | null {
    if (!url) return null;
    try {
        const parsed = new URL(url);
        return parsed.hostname.replace('www.', '');
    } catch {
        return null;
    }
}

// Category gradient for logo fallback
function getCategoryGradient(category: string): string {
    const gradients: Record<string, string> = {
        'Beauty': 'from-pink-500 to-rose-400',
        'Baby Food': 'from-amber-400 to-orange-300',
        'Coffee': 'from-amber-700 to-amber-500',
        'Pantry': 'from-green-500 to-emerald-400',
        'Supplements': 'from-blue-500 to-cyan-400',
        'Water Filters': 'from-sky-500 to-blue-400',
        'Mattresses': 'from-indigo-500 to-purple-400',
        'Cookware': 'from-slate-600 to-slate-400',
    };
    return gradients[category] || 'from-gray-500 to-gray-400';
}

export default function BrandDetailHero({ brand, tier, tierConfig }: BrandDetailHeroProps) {
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [logoError, setLogoError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const domain = extractDomain(brand.affiliate_link);
    const tagline = getTagline(brand);
    const gradient = getCategoryGradient(brand.category);

    useEffect(() => {
        if (!domain) {
            setIsLoading(false);
            return;
        }

        const fetchLogo = async () => {
            try {
                const response = await fetch(`/api/logo?domain=${encodeURIComponent(domain)}`);
                const data = await response.json();

                if (data.logoUrl) {
                    setLogoUrl(data.logoUrl);
                } else {
                    setLogoError(true);
                }
            } catch (error) {
                console.error('Error fetching logo:', error);
                setLogoError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLogo();
    }, [domain]);

    const showFallback = !logoUrl || logoError;

    return (
        <section className="border-b border-slate-100">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Breadcrumb - Subtle */}
                <nav className="text-xs text-slate-400 mb-10 tracking-wide text-center">
                    <Link href="/" className="hover:text-slate-600 transition">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/brands" className="hover:text-slate-600 transition">Brands</Link>
                    {brand.category && (
                        <>
                            <span className="mx-2">/</span>
                            <Link href={`/brands?category=${encodeURIComponent(brand.category)}`} className="hover:text-slate-600 transition">
                                {brand.category}
                            </Link>
                        </>
                    )}
                </nav>

                {/* Brand Header - Hierarchy: Logo > Name > Tagline > Status */}
                <div className="text-center">
                    {/* Logo - Prominent */}
                    <div className="flex justify-center mb-6">
                        <div className={`w-[200px] h-[200px] rounded-3xl flex items-center justify-center overflow-hidden ${showFallback
                            ? `bg-gradient-to-br ${gradient}`
                            : 'bg-white p-6'
                            }`}>
                            {isLoading ? (
                                <div className="w-20 h-20 rounded bg-gray-200 animate-pulse" />
                            ) : showFallback ? (
                                <span className="text-white font-bold text-7xl drop-shadow-sm">
                                    {brand.name.charAt(0)}
                                </span>
                            ) : (
                                <Image
                                    src={logoUrl!}
                                    alt={`${brand.name} logo`}
                                    width={160}
                                    height={160}
                                    className="object-contain max-h-40 max-w-40"
                                    style={{ mixBlendMode: 'multiply' }}
                                    onError={() => setLogoError(true)}
                                    unoptimized
                                />
                            )}
                        </div>
                    </div>

                    {/* Status Dot - Minimal */}
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <div className={`w-2 h-2 rounded-full ${tier === 3 ? 'bg-emerald-500 animate-pulse' :
                            tier === 2 ? 'bg-blue-500' :
                                'bg-slate-400'
                            }`} />
                        <span className={`text-[11px] font-semibold uppercase tracking-widest ${tier === 3 ? 'text-emerald-600' :
                            tier === 2 ? 'text-blue-600' :
                                'text-slate-500'
                            }`}>
                            {tierConfig.label}
                        </span>
                    </div>

                    {/* Brand Name - The King */}
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-2">
                        {brand.name}
                    </h1>

                    {/* Tagline - The Queen */}
                    <p className="text-base text-slate-500 font-medium mb-8">
                        {tagline}
                    </p>

                    {/* CTA - Clean Pill */}
                    {brand.affiliate_link && (
                        <a
                            href={brand.affiliate_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-colors"
                        >
                            Visit Official Site
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}
