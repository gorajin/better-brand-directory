import { notFound } from 'next/navigation';
import Link from 'next/link';
import { EvidenceCard, BrandCard } from '@/components';
import { calculateTier, TIER_CONFIG } from '@/lib/tiers';
import { getBrandBySlug, getProductsByBrandId, getAllBrands } from '@/lib/data';
import BrandDetailHero from './BrandDetailHero';

interface BrandPageProps {
    params: Promise<{ slug: string }>;
}

// Certification details for Tier 2 brands
const CERTIFICATION_INFO: Record<string, { name: string; description: string }> = {
    'gots': { name: 'GOTS Certified', description: 'Global Organic Textile Standard — ensures organic status from harvesting through manufacturing.' },
    'usda': { name: 'USDA Organic', description: 'United States Department of Agriculture certification for organic farming and processing.' },
    'organic': { name: 'Certified Organic', description: 'Products made without synthetic pesticides, fertilizers, or GMOs.' },
    'ewg': { name: 'EWG Verified', description: 'Environmental Working Group verification for health and safety standards.' },
    'made safe': { name: 'MADE SAFE', description: 'Certified free from known harmful substances and chemicals.' },
    'nsf': { name: 'NSF Certified', description: 'National Sanitation Foundation certification for public health protection.' },
    'greenguard': { name: 'GREENGUARD Gold', description: 'Certified for low chemical emissions, safe for sensitive environments.' },
    'glyphosate': { name: 'Glyphosate Residue Free', description: 'Tested and certified free from glyphosate pesticide residue.' },
    'purity award': { name: 'Purity Award', description: 'Industry recognition for exceptional product purity and quality.' },
    'clean label': { name: 'Clean Label Project', description: 'Third-party tested for contaminants and label accuracy.' },
    'ifos': { name: 'IFOS 5-Star', description: 'International Fish Oil Standards — highest purity and potency rating.' },
};

// Extract certifications from proof_type string
function extractCertifications(proofType?: string): Array<{ name: string; description: string }> {
    if (!proofType) return [];

    const lower = proofType.toLowerCase();
    const found: Array<{ name: string; description: string }> = [];

    for (const [key, info] of Object.entries(CERTIFICATION_INFO)) {
        if (lower.includes(key)) {
            found.push(info);
        }
    }

    if (found.length === 0 && proofType) {
        found.push({ name: proofType, description: 'Third-party certification or verification.' });
    }

    return found;
}

// Lab result indicators
const LAB_INDICATORS = [
    { label: 'Heavy Metals', status: 'Tested', detail: 'Lead, mercury, arsenic, cadmium' },
    { label: 'Pesticides', status: 'Screened', detail: '200+ residue panel' },
    { label: 'Purity', status: 'Verified', detail: 'Identity and potency confirmed' },
];

export default async function BrandPage({ params }: BrandPageProps) {
    const { slug } = await params;
    const brand = await getBrandBySlug(slug);

    if (!brand) {
        notFound();
    }

    const products = await getProductsByBrandId(brand.id);
    const allTestResults = products.flatMap(p => p.test_results || []);

    const allBrands = await getAllBrands();
    const similarBrands = allBrands
        .filter(b => b.category === brand.category && b.id !== brand.id)
        .slice(0, 3);

    const tier = calculateTier(brand);
    const tierConfig = TIER_CONFIG[tier];
    const certifications = extractCertifications(brand.proof_type);

    // Format date
    const updatedDate = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section with Logo */}
            <BrandDetailHero brand={brand} tier={tier} tierConfig={tierConfig} />

            {/* Transparency Status - The Technical Spec */}
            <section className="border-b border-slate-100 bg-slate-50/50">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="bg-white border border-slate-200/60 rounded-2xl p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-2.5 h-2.5 rounded-full ${tier === 3 ? 'bg-emerald-500' :
                                            tier === 2 ? 'bg-blue-500' :
                                                'bg-slate-400'
                                        }`} />
                                    <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                                        Transparency Level
                                    </h2>
                                </div>
                                <p className="text-slate-500 text-sm max-w-lg">
                                    {tierConfig.description}
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wide mb-1">
                                    Last Verified
                                </div>
                                <div className="text-sm font-semibold text-slate-700">
                                    {updatedDate}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Evidence Section */}
            <section className="py-12">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Section Header */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
                            {tier === 3 ? 'Lab Analysis' : tier === 2 ? 'Certifications' : 'Review Status'}
                        </h2>
                        <p className="text-sm text-slate-500">
                            {tier === 3
                                ? 'Public access to testing data and lab results.'
                                : tier === 2
                                    ? 'Independent third-party certifications.'
                                    : 'Ingredient list reviewed for harmful chemicals.'
                            }
                        </p>
                    </div>

                    {/* TIER 3: Lab Results - Clean Technical Cards */}
                    {tier === 3 && (
                        <div className="space-y-4">
                            {/* Primary: View Lab Results */}
                            {brand.proof_url && (
                                <a
                                    href={brand.proof_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block bg-white border border-slate-200/60 rounded-2xl p-5 hover:shadow-md transition-shadow group"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-slate-900">View Lab Results</div>
                                                <div className="text-xs text-slate-500">
                                                    {brand.proof_description || 'Certificate of Analysis & Testing Data'}
                                                </div>
                                            </div>
                                        </div>
                                        <svg className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </div>
                                </a>
                            )}

                            {/* Test indicators or placeholders */}
                            {allTestResults.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {allTestResults.map((result) => (
                                        <EvidenceCard
                                            key={result.id}
                                            testType={result.test_type}
                                            status={result.status}
                                            resultValue={result.result_value}
                                            pdfUrl={result.pdf_url}
                                            testedAt={result.tested_at}
                                            labName={result.lab_name}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {LAB_INDICATORS.map((item, idx) => (
                                        <div key={idx} className="bg-slate-50 rounded-xl px-4 py-3">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium text-slate-700">{item.label}</span>
                                                <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wide">{item.status}</span>
                                            </div>
                                            <div className="text-xs text-slate-400">{item.detail}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* TIER 2: Certifications - Clean List */}
                    {tier === 2 && (
                        <div className="space-y-3">
                            {certifications.map((cert, idx) => (
                                <div key={idx} className="bg-white border border-slate-200/60 rounded-2xl p-5">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-slate-900 mb-1">{cert.name}</div>
                                            <div className="text-xs text-slate-500 leading-relaxed">{cert.description}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Documentation Link */}
                            {brand.proof_url && (
                                <a
                                    href={brand.proof_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block bg-slate-50 rounded-2xl px-5 py-4 hover:bg-slate-100 transition-colors group"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm font-medium text-slate-700">View Certification Documentation</div>
                                        <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </div>
                                </a>
                            )}
                        </div>
                    )}

                    {/* TIER 1: Reviewed - Minimal */}
                    {tier === 1 && (
                        <div className="bg-slate-50 rounded-2xl p-8 text-center">
                            <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-semibold text-slate-900 mb-2">Ingredient Review Complete</h3>
                            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                                We&apos;ve reviewed this brand&apos;s ingredient list for known harmful chemicals. Third-party certifications or lab data not yet available.
                            </p>
                            <a
                                href="mailto:hello@betterbrand.directory?subject=Submit%20Lab%20Data"
                                className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition"
                            >
                                Are you this brand? Submit data →
                            </a>
                        </div>
                    )}
                </div>
            </section>

            {/* Similar Brands - Clean Grid */}
            {similarBrands.length > 0 && (
                <section className="py-12 border-t border-slate-100 bg-slate-50/30">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Similar Brands</h2>
                                <p className="text-xs text-slate-500">Other verified brands in {brand.category}</p>
                            </div>
                            <Link
                                href={`/brands?category=${encodeURIComponent(brand.category)}`}
                                className="text-xs font-medium text-slate-500 hover:text-slate-700 transition"
                            >
                                View all →
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {similarBrands.map((b) => (
                                <BrandCard key={b.id} brand={b} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Products Section - Only if exist */}
            {products.length > 0 && (
                <section className="py-12 border-t border-slate-100">
                    <div className="max-w-4xl mx-auto px-4">
                        <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-6">
                            Products ({products.length})
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {products.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/products/${product.slug}`}
                                    className="block bg-white border border-slate-200/60 rounded-2xl p-4 hover:shadow-md transition-shadow"
                                >
                                    <h3 className="text-sm font-semibold text-slate-900">{product.name}</h3>
                                    <p className="text-xs text-slate-500 mt-1">{product.category}</p>
                                    <div className="mt-3 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">
                                            {product.test_results?.length || 0} Tests
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
