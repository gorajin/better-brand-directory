import Link from 'next/link';
import { CATEGORY_GROUPS } from '@/lib/categories';
import { UtensilsCrossed, Sparkles, Pill, Armchair } from 'lucide-react';

// Map category names to Lucide icons
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    'Food': <UtensilsCrossed className="w-4 h-4" strokeWidth={1.5} />,
    'Beauty': <Sparkles className="w-4 h-4" strokeWidth={1.5} />,
    'Supplements': <Pill className="w-4 h-4" strokeWidth={1.5} />,
    'Living': <Armchair className="w-4 h-4" strokeWidth={1.5} />,
};

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-400">
            {/* Main Footer */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="text-white font-semibold text-base mb-3 block tracking-tight">
                            Better Brand
                        </Link>
                        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                            Verified transparency data for health-conscious consumers.
                        </p>
                        <a
                            href="mailto:hello@betterbrand.directory"
                            className="text-xs text-slate-400 hover:text-white transition"
                        >
                            hello@betterbrand.directory
                        </a>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">Categories</h4>
                        <ul className="space-y-2.5">
                            {CATEGORY_GROUPS.map((group) => (
                                <li key={group.name}>
                                    <Link
                                        href={`/brands?category=${encodeURIComponent(group.name)}`}
                                        className="text-xs hover:text-white transition flex items-center gap-2"
                                    >
                                        <span className="text-slate-500">{CATEGORY_ICONS[group.name]}</span>
                                        {group.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">Resources</h4>
                        <ul className="space-y-2.5 text-xs">
                            <li>
                                <Link href="/about" className="hover:text-white transition">
                                    How We Score
                                </Link>
                            </li>
                            <li>
                                <Link href="/brands" className="hover:text-white transition">
                                    All Brands
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="mailto:hello@betterbrand.directory?subject=Submit%20a%20Brand"
                                    className="hover:text-white transition"
                                >
                                    Submit a Brand
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">Legal</h4>
                        <ul className="space-y-2.5 text-xs">
                            <li>
                                <Link href="/privacy" className="hover:text-white transition">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-white transition">
                                    Terms of Use
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Disclaimer + Copyright */}
            <div className="border-t border-slate-800">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <p className="text-[10px] text-slate-400 mb-4 leading-relaxed">
                        <strong className="text-slate-300">Medical Disclaimer:</strong> The information on this site is for informational purposes only and is not intended as medical advice. Always consult with a healthcare professional before making health-related decisions.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] text-slate-500">
                        <p>© {currentYear} Better Brand Directory. All rights reserved.</p>
                        <p>
                            Transparency scores based on publicly available data.{' '}
                            <Link href="/about" className="text-slate-400 hover:text-white transition">
                                Learn more →
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
