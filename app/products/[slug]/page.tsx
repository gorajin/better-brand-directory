import { notFound } from 'next/navigation';
import Link from 'next/link';
import { EvidenceCard, IngredientList, TrustScore } from '@/components';
import { mockProducts } from '@/lib/mockData';

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = mockProducts.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    const testResults = product.test_results || [];
    const ingredients = product.ingredients || [];

    return (
        <main className="min-h-screen bg-[var(--color-bg)]">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <nav className="text-sm text-[var(--color-text-muted)] mb-6">
                    <Link href="/brands" className="hover:text-[var(--color-text)]">
                        Brands
                    </Link>
                    {' / '}
                    <Link href={`/brands/${product.brand?.slug}`} className="hover:text-[var(--color-text)]">
                        {product.brand?.name}
                    </Link>
                    {' / '}
                    <span className="text-[var(--color-text)]">{product.name}</span>
                </nav>

                {/* Two-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Product Image & Buy Button (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="sticky-sidebar">
                            {/* Product Image */}
                            <div className="aspect-square bg-[var(--color-surface)] rounded-lg mb-4 flex items-center justify-center border border-[var(--color-border)]">
                                <span className="text-6xl">📦</span>
                            </div>

                            {/* Product Info */}
                            <h1 className="text-2xl font-bold text-[var(--color-text)] mb-2">
                                {product.name}
                            </h1>
                            <p className="text-sm text-[var(--color-text-muted)] mb-4">
                                by {product.brand?.name}
                            </p>

                            {/* Trust Score */}
                            {product.brand && (
                                <div className="mb-4">
                                    <TrustScore score={product.brand.trust_score} size="md" />
                                </div>
                            )}

                            {/* Affiliate Button */}
                            {product.brand?.affiliate_link && (
                                <a
                                    href={product.brand.affiliate_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center py-3 bg-[var(--color-text)] text-[var(--color-bg)] rounded-lg font-medium hover:opacity-90 transition"
                                >
                                    Buy Now
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Testing Grid & Ingredients */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Testing Grid */}
                        <section>
                            <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
                                Test Results
                            </h2>

                            {testResults.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {testResults.map((result) => (
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
                                <div className="text-center py-8 border border-dashed border-[var(--color-border)] rounded-lg">
                                    <p className="text-[var(--color-text-muted)]">
                                        No test results available yet.
                                    </p>
                                </div>
                            )}
                        </section>

                        {/* Ingredients Section */}
                        {ingredients.length > 0 && (
                            <section className="border-t border-[var(--color-border)] pt-8">
                                <IngredientList ingredients={ingredients} />
                            </section>
                        )}

                        {/* Data Table View */}
                        <section className="border-t border-[var(--color-border)] pt-8">
                            <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
                                Detailed Test Data
                            </h2>
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Test Type</th>
                                        <th>Status</th>
                                        <th>Result</th>
                                        <th>Lab</th>
                                        <th>Date</th>
                                        <th>Source</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {testResults.map((result) => (
                                        <tr key={result.id}>
                                            <td className="font-medium">{result.test_type}</td>
                                            <td>
                                                <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${result.status === 'Pass' || result.status === 'NonDetect'
                                                        ? 'bg-[var(--color-safe-bg)] text-[var(--color-safe)]'
                                                        : result.status === 'Fail'
                                                            ? 'bg-[var(--color-danger-bg)] text-[var(--color-danger)]'
                                                            : 'bg-[var(--color-pending-bg)] text-[var(--color-pending)]'
                                                    }`}>
                                                    {result.status}
                                                </span>
                                            </td>
                                            <td>{result.result_value || '—'}</td>
                                            <td>{result.lab_name || '—'}</td>
                                            <td>{result.tested_at ? new Date(result.tested_at).toLocaleDateString() : '—'}</td>
                                            <td>
                                                {result.pdf_url ? (
                                                    <a href={result.pdf_url} target="_blank" rel="noopener noreferrer" className="text-[var(--color-safe)] hover:underline">
                                                        PDF
                                                    </a>
                                                ) : '—'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
