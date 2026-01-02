/**
 * Tier calculation logic - can be used in both server and client components
 */

export type TransparencyTier = 1 | 2 | 3;

export interface TierInfo {
    tier: TransparencyTier;
    label: string;
    description: string;
}

// Tier configuration
export const TIER_CONFIG = {
    1: {
        label: 'Label Check',
        description: 'Ingredients vetted for harmful chemicals',
        color: 'text-slate-500',
        bgColor: 'bg-slate-100',
        barColor: 'bg-slate-400',
        borderColor: 'border-slate-300',
        icon: '🔍',
    },
    2: {
        label: 'Certified',
        description: 'Independently certified (USDA, GOTS, NSF, EWG, etc.)',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        barColor: 'bg-blue-500',
        borderColor: 'border-blue-200',
        icon: '🏆',
    },
    3: {
        label: 'Data Verified',
        description: 'Publishes raw lab results (CoAs)',
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        barColor: 'bg-emerald-500',
        borderColor: 'border-emerald-200',
        icon: '🔬',
    },
};

// Helper to determine tier from brand data
export function calculateTier(brand: {
    proof_type?: string;
    proof_url?: string;
    trust_score?: number;
}): TransparencyTier {
    // Tier 3: Has public lab documents (CoA, Performance Data Sheet, etc.)
    const radicalTransparencyKeywords = [
        'CoA', 'Certificate of Analysis', 'Lab Results', 'Performance Data Sheet',
        'Track Your Lot', 'In-House Lab', 'IFOS', 'Public Lab', 'Batch-Level'
    ];

    if (brand.proof_type && radicalTransparencyKeywords.some(k =>
        brand.proof_type!.toLowerCase().includes(k.toLowerCase())
    )) {
        return 3;
    }

    // Tier 2: Has certifications
    const certificationKeywords = [
        'Certified', 'USDA', 'Organic', 'GOTS', 'NSF', 'EWG', 'MADE SAFE',
        'Greenguard', 'Glyphosate Residue Free', 'Purity Award', 'Clean Label'
    ];

    if (brand.proof_type && certificationKeywords.some(k =>
        brand.proof_type!.toLowerCase().includes(k.toLowerCase())
    )) {
        return 2;
    }

    // Tier 1: Default (Ingredients Vetted)
    return 1;
}
