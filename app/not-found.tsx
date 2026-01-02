import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
            <div className="max-w-md mx-auto px-4 text-center">
                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
                    <span className="text-4xl">🔍</span>
                </div>

                {/* Headline */}
                <h1 className="text-2xl font-bold text-[var(--color-text)] mb-3">
                    Page Not Found
                </h1>

                {/* Body */}
                <p className="text-[var(--color-text-muted)] mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or may have been moved.
                    Return to the directory to find verified brands that meet our transparency standards.
                </p>

                {/* CTA */}
                <Link
                    href="/brands"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition shadow-lg shadow-emerald-200"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Directory
                </Link>

                {/* Secondary Links */}
                <div className="mt-6 flex items-center justify-center gap-4 text-sm text-[var(--color-text-muted)]">
                    <Link href="/" className="hover:text-emerald-600 transition">
                        Home
                    </Link>
                    <span>•</span>
                    <a href="mailto:hello@betterbrand.directory" className="text-emerald-600 hover:underline">
                        Contact Us
                    </a>
                </div>
            </div>
        </main>
    );
}

