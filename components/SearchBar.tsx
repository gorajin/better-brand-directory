'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/brands?search=${encodeURIComponent(query.trim())}`);
        } else {
            // Navigate to all brands if empty search
            router.push('/brands');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="relative">
                {/* Search Icon */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                {/* Input */}
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search brands (e.g., Cerebelly, Naturepedic, Nordic...)"
                    className="w-full pl-12 pr-4 py-4 text-lg rounded-full border border-slate-200 bg-white shadow-lg shadow-slate-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition placeholder:text-slate-400"
                />

                {/* Search Button (appears when typing) */}
                {query && (
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition"
                    >
                        Search
                    </button>
                )}
            </div>
        </form>
    );
}
