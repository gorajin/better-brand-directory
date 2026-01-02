'use client';

import { useState } from 'react';
import { TestResult, TestStatus, TestType } from '@/types/database';

interface EvidenceCardProps {
    testType: TestType;
    status: TestStatus;
    resultValue?: string;
    pdfUrl?: string;
    testedAt?: string;
    labName?: string;
}

const testTypeLabels: Record<TestType, string> = {
    PFAS: 'PFAS',
    HeavyMetals: 'Heavy Metals',
    Glyphosate: 'Glyphosate',
    Pesticides: 'Pesticides',
    Microplastics: 'Microplastics',
};

const statusLabels: Record<TestStatus, string> = {
    Pass: 'Passed',
    Fail: 'Failed',
    NonDetect: 'Non-Detect',
    Pending: 'Pending',
};

const StatusIcon = ({ status }: { status: TestStatus }) => {
    switch (status) {
        case 'Pass':
        case 'NonDetect':
            return (
                <svg className="w-6 h-6 text-[var(--color-safe)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            );
        case 'Fail':
            return (
                <svg className="w-6 h-6 text-[var(--color-danger)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            );
        case 'Pending':
            return (
                <svg className="w-6 h-6 text-[var(--color-pending)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
    }
};

export default function EvidenceCard({
    testType,
    status,
    resultValue,
    pdfUrl,
    testedAt,
    labName,
}: EvidenceCardProps) {
    const [showModal, setShowModal] = useState(false);

    const statusClass =
        status === 'Pass' || status === 'NonDetect'
            ? 'evidence-card--pass'
            : status === 'Fail'
                ? 'evidence-card--fail'
                : 'evidence-card--pending';

    return (
        <>
            <div className={`evidence-card ${statusClass}`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                        {testTypeLabels[testType]}
                    </span>
                    <StatusIcon status={status} />
                </div>

                {/* Result */}
                <div className="mb-3">
                    <span className={`text-lg font-bold ${status === 'Fail' ? 'text-[var(--color-danger)]' :
                            status === 'Pass' || status === 'NonDetect' ? 'text-[var(--color-safe)]' :
                                'text-[var(--color-pending)]'
                        }`}>
                        {resultValue || statusLabels[status]}
                    </span>
                </div>

                {/* Metadata */}
                <div className="text-xs text-[var(--color-text-muted)] space-y-1">
                    {labName && <div>Lab: {labName}</div>}
                    {testedAt && <div>Tested: {new Date(testedAt).toLocaleDateString()}</div>}
                </div>

                {/* PDF Link */}
                {pdfUrl && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="mt-3 flex items-center gap-1 text-sm font-medium text-[var(--color-text)] hover:underline"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        View Source PDF
                    </button>
                )}
            </div>

            {/* PDF Modal */}
            {showModal && pdfUrl && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content p-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Certificate of Analysis</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-1 hover:bg-[var(--color-surface)] rounded"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <iframe
                            src={pdfUrl}
                            className="w-[80vw] h-[70vh] border border-[var(--color-border)] rounded"
                            title="Certificate of Analysis"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
