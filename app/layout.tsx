import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Better Brand Directory | Verified Health Data",
  description: "A transparent directory of health-conscious brands with verified test results for PFAS, heavy metals, pesticides, and more. No marketing fluff — just data.",
  keywords: ["health products", "PFAS free", "heavy metal testing", "clean brands", "product transparency"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased flex flex-col min-h-screen`} suppressHydrationWarning>
        {/* Navigation Header */}
        <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-white/95 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-[var(--color-text)]">
                Better Brand
              </span>
              <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-medium">
                Directory
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/brands" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition">
                All Brands
              </Link>
              <Link href="/about" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition">
                How We Score
              </Link>
            </nav>

            {/* Mobile Nav */}
            <MobileNav />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
