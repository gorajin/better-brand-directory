import Link from 'next/link';
import { TIER_CONFIG } from '@/lib/tiers';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[var(--color-bg)]">
            {/* Header */}
            <section className="bg-gradient-to-b from-emerald-50 to-white border-b border-[var(--color-border)]">
                <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl font-bold text-[var(--color-text)] mb-4">
                        How We Score Brands
                    </h1>
                    <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
                        We don&apos;t give arbitrary scores. We verify what data brands actually share.
                        Our Transparency Tiers measure <em>evidence availability</em>, not subjective quality.
                    </p>
                </div>
            </section>

            {/* The 3 Tiers */}
            <section className="py-16">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center text-[var(--color-text)] mb-12">
                        The Transparency Tiers
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Tier 1 */}
                        <div className="relative p-8 rounded-2xl bg-slate-50 border border-slate-200">
                            <div className="absolute -top-4 left-6 px-3 py-1 bg-slate-500 text-white text-sm font-medium rounded-full">
                                Tier 1
                            </div>
                            <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mb-6 mx-auto">
                                <span className="text-3xl">{TIER_CONFIG[1].icon}</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-700 text-center mb-3">
                                Label Check
                            </h3>
                            <p className="text-slate-600 text-center mb-4">
                                We reviewed their ingredient list for known harmful chemicals like parabens, phthalates, or high-fructose corn syrup.
                            </p>
                            <div className="border-t border-slate-200 pt-4 mt-4">
                                <p className="text-sm text-slate-500 text-center">
                                    <strong>What it means:</strong> Basic review completed, but no third-party verification on file.
                                </p>
                            </div>
                        </div>

                        {/* Tier 2 */}
                        <div className="relative p-8 rounded-2xl bg-blue-50 border border-blue-200">
                            <div className="absolute -top-4 left-6 px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                                Tier 2
                            </div>
                            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 mx-auto">
                                <span className="text-3xl">{TIER_CONFIG[2].icon}</span>
                            </div>
                            <h3 className="text-xl font-bold text-blue-700 text-center mb-3">
                                Independently Certified
                            </h3>
                            <p className="text-blue-600 text-center mb-4">
                                The brand holds certifications from reputable third-party organizations.
                            </p>
                            <div className="border-t border-blue-200 pt-4 mt-4">
                                <p className="text-sm text-blue-500 text-center">
                                    <strong>Examples:</strong> USDA Organic, NSF Certified, EWG Verified, GOTS, MADE SAFE
                                </p>
                            </div>
                        </div>

                        {/* Tier 3 */}
                        <div className="relative p-8 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-lg shadow-emerald-100">
                            <div className="absolute -top-4 left-6 px-3 py-1 bg-emerald-500 text-white text-sm font-medium rounded-full">
                                Tier 3 ★
                            </div>
                            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6 mx-auto">
                                <span className="text-3xl">{TIER_CONFIG[3].icon}</span>
                            </div>
                            <h3 className="text-xl font-bold text-emerald-700 text-center mb-3">
                                Radical Transparency
                            </h3>
                            <p className="text-emerald-600 text-center mb-4">
                                The brand publicly shares raw lab results (Certificates of Analysis) that you can view yourself.
                            </p>
                            <div className="border-t border-emerald-200 pt-4 mt-4">
                                <p className="text-sm text-emerald-500 text-center">
                                    <strong>Examples:</strong> Batch-level CoAs, IFOS reports, heavy metal testing results
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why This Matters */}
            <section className="py-16 bg-slate-50 border-t border-slate-100">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center text-[var(--color-text)] mb-8">
                        Why Transparency, Not &quot;Quality&quot;?
                    </h2>

                    <div className="space-y-6 text-[var(--color-text-muted)]">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                <span>⚖️</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-[var(--color-text)] mb-1">Legally Defensible</h3>
                                <p>We&apos;re not claiming a brand is &quot;healthy&quot; (medical advice). We&apos;re stating a fact: they share their lab data publicly, or they don&apos;t.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                <span>🔍</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-[var(--color-text)] mb-1">Verifiable by You</h3>
                                <p>Every Tier 3 brand has links to their actual lab reports. You can verify our claims yourself.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                <span>📈</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-[var(--color-text)] mb-1">Incentivizes Improvement</h3>
                                <p>Brands can &quot;level up&quot; by sharing more data with us. This creates a race to the top, not a race to the bottom.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 border-t border-[var(--color-border)]">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">
                        Ready to Find Safe Brands?
                    </h2>
                    <p className="text-[var(--color-text-muted)] mb-8">
                        Browse our directory of verified brands across Beauty, Food, Supplements, and Living categories.
                    </p>
                    <Link
                        href="/brands"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition shadow-lg shadow-emerald-200"
                    >
                        Browse All Brands
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </section>
        </main>
    );
}
