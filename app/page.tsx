import Link from 'next/link';
import { BrandCard } from '@/components';
import { getAllBrands, getTopBrands, getStats } from '@/lib/data';
import { CATEGORY_GROUPS } from '@/lib/categories';
import SearchBar from '@/components/SearchBar';
import { UtensilsCrossed, Sparkles, Pill, Armchair, ClipboardCheck, Award, FlaskConical } from 'lucide-react';

// Map category names to Lucide icons
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Food': <UtensilsCrossed className="w-6 h-6" strokeWidth={1.5} />,
  'Beauty': <Sparkles className="w-6 h-6" strokeWidth={1.5} />,
  'Supplements': <Pill className="w-6 h-6" strokeWidth={1.5} />,
  'Living': <Armchair className="w-6 h-6" strokeWidth={1.5} />,
};

export default async function Home() {
  const [topBrands, allBrands, stats] = await Promise.all([
    getTopBrands(4),
    getAllBrands(),
    getStats(),
  ]);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Clean & Minimal */}
      <section className="border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Is Your Brand{' '}
            <span className="text-emerald-600">Actually Safe?</span>
          </h1>
          <p className="text-lg text-slate-500 mb-10 max-w-xl mx-auto">
            We verify transparency, not marketing claims. Search {stats.brandsCount} brands with real lab data.
          </p>

          <SearchBar />

          {/* Quick Links - Subtle */}
          <div className="mt-8 flex items-center justify-center gap-2 flex-wrap text-sm">
            <span className="text-slate-400">Popular:</span>
            <Link href="/brands?category=Baby%20Food" className="px-3 py-1.5 text-slate-600 hover:text-slate-900 transition">
              Baby Food
            </Link>
            <span className="text-slate-200">•</span>
            <Link href="/brands?category=Water%20Filters" className="px-3 py-1.5 text-slate-600 hover:text-slate-900 transition">
              Water Filters
            </Link>
            <span className="text-slate-200">•</span>
            <Link href="/brands?category=Supplements" className="px-3 py-1.5 text-slate-600 hover:text-slate-900 transition">
              Supplements
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Category - Clinical Line Icons */}
      <section className="py-16 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
              Browse by Category
            </h2>
            <p className="text-sm text-slate-500">
              Find verified brands in the categories that matter to you
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORY_GROUPS.map((group) => {
              const count = group.subCategories.reduce((sum, sub) =>
                sum + allBrands.filter(b => b.category === sub).length, 0
              );

              return (
                <Link
                  key={group.name}
                  href={`/brands?category=${encodeURIComponent(group.name)}`}
                  className="group bg-white border border-slate-200/60 rounded-2xl p-6 text-center hover:shadow-lg hover:border-slate-300 transition-all duration-300"
                >
                  {/* Icon Circle - Clinical */}
                  <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-700 group-hover:bg-slate-100 group-hover:text-slate-900 transition-colors">
                    {CATEGORY_ICONS[group.name]}
                  </div>
                  <h3 className="font-semibold text-slate-900 tracking-tight mb-1">{group.name}</h3>
                  <p className="text-xs text-slate-400">
                    {count} brands
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Verified Brands */}
      <section className="py-16 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Top Verified Brands
              </h2>
              <p className="text-sm text-slate-500">
                Brands with the highest transparency ratings
              </p>
            </div>
            <Link
              href="/brands"
              className="text-sm text-slate-500 hover:text-slate-900 font-medium transition"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topBrands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Explainer - Minimal Icons */}
      <section className="py-16 border-t border-slate-100 bg-slate-50/30">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
            Our Transparency Tiers
          </h2>
          <p className="text-sm text-slate-500 mb-10">
            We don't give arbitrary scores. We verify what data brands actually share.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tier 1 */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6">
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
                <ClipboardCheck className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Label Check</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Ingredient list reviewed for known harmful chemicals.
              </p>
            </div>

            {/* Tier 2 */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                <Award className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Certified</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Third-party certifications like USDA Organic, NSF, or EWG.
              </p>
            </div>

            {/* Tier 3 */}
            <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                <FlaskConical className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Data Verified</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                They publish raw lab results (CoAs) you can view yourself.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
