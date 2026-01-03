'use client';

import { Brand } from '@/types/database';
import { calculateTier, TIER_CONFIG } from '@/lib/tiers';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface BrandCardProps {
    brand: Brand;
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

// Smart killer stat - specific to what makes the brand special
function getKillerStat(brand: Brand): { text: string; icon: string } {
    const proofType = brand.proof_type?.toLowerCase() || '';
    const proofDesc = brand.proof_description?.toLowerCase() || '';
    const combined = `${proofType} ${proofDesc}`;
    const slug = brand.slug?.toLowerCase() || '';

    // Brand-specific stats
    const brandStats: Record<string, { text: string; icon: string }> = {
        // Existing brands
        'purity coffee': { text: 'Mold Free Verified', icon: '🛡️' },
        'purity-coffee': { text: 'Mold Free Verified', icon: '🛡️' },
        'counter culture coffee': { text: 'Mycotoxin Tested', icon: '🧪' },
        'counter-culture-coffee': { text: 'Mycotoxin Tested', icon: '🧪' },
        'nordic naturals': { text: 'IFOS 5-Star', icon: '⭐' },
        'nordic-naturals': { text: 'IFOS 5-Star', icon: '⭐' },
        'cerebelly': { text: 'Heavy Metals: ND', icon: '⚛️' },
        'naturepedic': { text: 'GOTS Certified', icon: '🌿' },
        'xtrema': { text: 'Zero PFAS', icon: '🛡️' },
        'clearly filtered': { text: 'NSF 53/401', icon: '🔬' },
        'clearly-filtered': { text: 'NSF 53/401', icon: '🔬' },
        'aquatru': { text: 'NSF Certified', icon: '🔬' },
        // New Gold Standard brands
        'transparent labs': { text: 'ISO 17025 Verified', icon: '🔬' },
        'transparent-labs': { text: 'ISO 17025 Verified', icon: '🔬' },
        'puori': { text: 'Clean Label Certified', icon: '✅' },
        'california gold nutrition': { text: 'Bacteria & Metal Tested', icon: '🧪' },
        'california-gold-nutrition': { text: 'Bacteria & Metal Tested', icon: '🧪' },
        'the maca team': { text: 'Harvest Tracing', icon: '🌱' },
        'the-maca-team': { text: 'Harvest Tracing', icon: '🌱' },
        '360 cookware': { text: 'Zero Leaching', icon: '🛡️' },
        '360-cookware': { text: 'Zero Leaching', icon: '🛡️' },
        'epic water filters': { text: 'NSF 42/53/401/P473', icon: '💧' },
        'epic-water-filters': { text: 'NSF 42/53/401/P473', icon: '💧' },
        'happsy': { text: 'GOTS & MADE SAFE', icon: '🌿' },
        'plum organics': { text: 'LOD Transparency', icon: '📊' },
        'plum-organics': { text: 'LOD Transparency', icon: '📊' },
        'lifeboost coffee': { text: 'Mold & Acid Tested', icon: '☕' },
        'lifeboost-coffee': { text: 'Mold & Acid Tested', icon: '☕' },
    };

    if (brandStats[slug]) return brandStats[slug];

    // Proof-type based stats
    if (combined.includes('pfas')) return { text: 'PFAS: Non-Detect', icon: '🛡️' };
    if (combined.includes('lead') || combined.includes('heavy metal')) return { text: 'Lead: <5ppb', icon: '⚛️' };
    if (combined.includes('glyphosate')) return { text: 'Glyphosate: ND', icon: '🌾' };
    if (combined.includes('ifos') || combined.includes('5-star')) return { text: '5-Star Purity', icon: '⭐' };
    if (combined.includes('mold') || combined.includes('mycotoxin')) return { text: 'Mold Free', icon: '🛡️' };
    if (combined.includes('nsf')) return { text: 'NSF Certified', icon: '🔬' };
    if (combined.includes('coa') || combined.includes('certificate of analysis')) return { text: 'COA Published', icon: '📋' };
    if (combined.includes('organic') || combined.includes('usda')) return { text: 'Certified Organic', icon: '🌿' };
    if (combined.includes('made safe')) return { text: 'MADE SAFE', icon: '✅' };
    if (combined.includes('ewg')) return { text: 'EWG Verified', icon: '✅' };
    if (combined.includes('gots')) return { text: 'GOTS Certified', icon: '🌿' };
    if (combined.includes('greenguard')) return { text: 'Low VOC', icon: '🌬️' };

    // Category-based fallback stats (more specific than just category name)
    const categoryStats: Record<string, { text: string; icon: string }> = {
        'Beauty': { text: 'Clean Formula', icon: '✨' },
        'Baby Food': { text: 'Lab Tested', icon: '🧪' },
        'Coffee': { text: 'Purity Tested', icon: '☕' },
        'Pantry': { text: 'Residue Screened', icon: '🌾' },
        'Supplements': { text: 'COA Available', icon: '📋' },
        'Water Filters': { text: 'Certified', icon: '💧' },
        'Mattresses': { text: 'Low VOC', icon: '🌬️' },
        'Cookware': { text: 'Non-Toxic', icon: '🍳' },
    };

    return categoryStats[brand.category] || { text: 'Verified', icon: '✓' };
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

// Format verification date from brand data
function formatVerifiedDate(verifiedAt?: string): string | null {
    if (!verifiedAt) return null;
    const date = new Date(verifiedAt);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export default function BrandCard({ brand }: BrandCardProps) {
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [logoError, setLogoError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showTooltip, setShowTooltip] = useState(false);

    const domain = extractDomain(brand.affiliate_link);
    const tier = calculateTier(brand);
    const tierConfig = TIER_CONFIG[tier];
    const killerStat = getKillerStat(brand);
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
        <Link
            href={`/brands/${brand.slug}`}
            className="flex flex-col bg-white border border-slate-200/60 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group h-full"
        >
            {/* Main Content Area */}
            <div className="p-5 flex-1 flex flex-col">
                {/* Header Row: Logo + Status Badge */}
                <div className="flex items-start justify-between mb-3">
                    {/* Logo */}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden ${showFallback
                        ? `bg-gradient-to-br ${gradient}`
                        : 'bg-white border border-slate-100 p-1'
                        }`}>
                        {isLoading ? (
                            <div className="w-5 h-5 rounded bg-gray-200 animate-pulse" />
                        ) : showFallback ? (
                            <span className="text-white font-bold text-base drop-shadow-sm">
                                {brand.name.charAt(0)}
                            </span>
                        ) : (
                            <Image
                                src={logoUrl!}
                                alt={`${brand.name} logo`}
                                width={32}
                                height={32}
                                className="object-contain max-h-8 max-w-8"
                                style={{ mixBlendMode: 'multiply' }}
                                onError={() => setLogoError(true)}
                                unoptimized
                            />
                        )}
                    </div>

                    {/* Status Dot with Tooltip */}
                    <div
                        className="relative"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        <div className="flex items-center gap-1.5 cursor-default">
                            <div className={`w-2 h-2 rounded-full ${tier === 0 ? 'bg-red-500' :
                                tier === 3 ? 'bg-emerald-500 animate-pulse' :
                                    tier === 2 ? 'bg-blue-500' :
                                        'bg-slate-400'
                                }`} />
                            <span className={`text-[10px] font-semibold uppercase tracking-wider ${tier === 0 ? 'text-red-600' :
                                tier === 3 ? 'text-emerald-600' :
                                    tier === 2 ? 'text-blue-600' :
                                        'text-slate-400'
                                }`}>
                                {tierConfig.label}
                            </span>
                        </div>

                        {/* Tooltip */}
                        {showTooltip && (
                            <div className="absolute z-50 top-full right-0 mt-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap">
                                {formatVerifiedDate(brand.verified_at)
                                    ? `Last verified: ${formatVerifiedDate(brand.verified_at)}`
                                    : 'Pending verification'
                                }
                                <div className="absolute -top-1 right-3 w-2 h-2 bg-slate-900 rotate-45" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Block - Tighter Spacing */}
                <div className="mb-3">
                    {/* Brand Name */}
                    <h3 className="text-base font-semibold text-slate-900 tracking-tight leading-tight group-hover:text-emerald-700 transition-colors">
                        {brand.name}
                    </h3>
                    {/* Tagline - Tight coupling with name */}
                    <p className="text-sm text-slate-500 mt-0.5 leading-snug line-clamp-2">
                        {tagline}
                    </p>
                </div>

                {/* Technical Row - Left-aligned stat only */}
                <div className="bg-slate-50 rounded-lg px-3 py-2 mt-auto">
                    <div className="flex items-center gap-2">
                        <span className="text-sm">{killerStat.icon}</span>
                        <span className="text-xs font-bold text-slate-700">
                            {killerStat.text}
                        </span>
                    </div>
                </div>
            </div>

            {/* Footer CTA - Dynamic based on proof_type */}
            <div className="border-t border-slate-100">
                <div className="w-full py-2.5 text-sm font-medium text-emerald-600 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors">
                    {brand.proof_type === 'Lookup Tool' ? (
                        <>
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Batch Lookup
                        </>
                    ) : brand.proof_type === 'QR Code' ? (
                        <>
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                            </svg>
                            Scan Batch
                        </>
                    ) : (
                        <>
                            View Analysis
                            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </>
                    )}
                </div>
            </div>
        </Link>
    );
}
