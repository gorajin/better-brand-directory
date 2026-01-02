'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CATEGORY_GROUPS } from '@/lib/categories';

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden">
            {/* Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                aria-label="Toggle menu"
            >
                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg">
                    <nav className="max-w-7xl mx-auto px-4 py-4">
                        {/* Main Links */}
                        <div className="space-y-1 mb-4">
                            <Link
                                href="/brands"
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-2 rounded-lg hover:bg-slate-50 font-medium text-[var(--color-text)]"
                            >
                                All Brands
                            </Link>
                            <Link
                                href="/about"
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-2 rounded-lg hover:bg-slate-50 font-medium text-[var(--color-text)]"
                            >
                                How We Score
                            </Link>
                        </div>

                        {/* Category Links */}
                        <div className="border-t border-slate-100 pt-4">
                            <p className="px-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                                Categories
                            </p>
                            <div className="grid grid-cols-2 gap-1">
                                {CATEGORY_GROUPS.map((group) => (
                                    <Link
                                        key={group.name}
                                        href="/brands"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-sm"
                                    >
                                        <span>{group.emoji}</span>
                                        {group.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </nav>
                </div>
            )}
        </div>
    );
}
