'use client';

import { useEffect } from 'react';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

/**
 * Error Boundary for the entire app
 * Shows a friendly message when Supabase or other services are down
 */
export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="max-w-md mx-auto px-4 text-center">
                {/* Icon */}
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg
                        className="w-8 h-8 text-slate-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                </div>

                {/* Message */}
                <h1 className="text-xl font-bold text-slate-900 mb-2">
                    Temporarily Unavailable
                </h1>
                <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                    Our database is currently undergoing maintenance.
                    Please try again in a few moments.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="px-6 py-2.5 bg-emerald-600 text-white rounded-full text-sm font-medium hover:bg-emerald-700 transition"
                    >
                        Try Again
                    </button>
                    <a
                        href="/"
                        className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-200 transition"
                    >
                        Go Home
                    </a>
                </div>

                {/* Error details for debugging (only in development) */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-8 p-4 bg-red-50 rounded-xl text-left">
                        <p className="text-xs font-medium text-red-700 mb-1">
                            Debug Info:
                        </p>
                        <p className="text-xs text-red-600 font-mono break-all">
                            {error.message}
                        </p>
                        {error.digest && (
                            <p className="text-xs text-red-500 mt-1">
                                Digest: {error.digest}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
