'use client';

import { useState } from 'react';
import { TIER_CONFIG, TransparencyTier } from '@/lib/tiers';

interface TierBadgeProps {
    tier: TransparencyTier;
    size?: 'sm' | 'md' | 'lg';
    showTooltip?: boolean;
    showGlow?: boolean;
    proofType?: string;
}

export default function TierBadge({ tier, size = 'md', showTooltip = true, showGlow = true, proofType }: TierBadgeProps) {
    const [isHovered, setIsHovered] = useState(false);
    const config = TIER_CONFIG[tier];

    // Size classes
    const sizeClasses = {
        sm: {
            container: 'px-2 py-1',
            bar: 'w-2 h-3',
            text: 'text-xs',
            gap: 'gap-0.5',
        },
        md: {
            container: 'px-3 py-1.5',
            bar: 'w-2.5 h-4',
            text: 'text-sm',
            gap: 'gap-1',
        },
        lg: {
            container: 'px-4 py-2',
            bar: 'w-3 h-5',
            text: 'text-base',
            gap: 'gap-1.5',
        },
    };

    const s = sizeClasses[size];
    const isTier3 = tier === 3;

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Glow effect for Tier 3 */}
            {isTier3 && showGlow && (
                <div className="absolute inset-0 bg-emerald-400 blur-xl opacity-40 rounded-full scale-150" />
            )}

            {/* Badge */}
            <div
                className={`
                    relative inline-flex items-center ${s.gap} ${s.container}
                    rounded-full border ${config.borderColor} ${config.bgColor}
                    ${isTier3 && showGlow ? 'shadow-lg shadow-emerald-200' : ''}
                    transition-all duration-200
                `}
            >
                {/* Signal Bars */}
                <div className={`flex items-end ${s.gap}`}>
                    {[1, 2, 3].map((barTier) => (
                        <div
                            key={barTier}
                            className={`
                                ${s.bar} rounded-sm transition-colors
                                ${barTier <= tier ? config.barColor : 'bg-slate-200'}
                            `}
                            style={{
                                height: barTier === 1 ? '40%' : barTier === 2 ? '70%' : '100%',
                            }}
                        />
                    ))}
                </div>

                {/* Label */}
                <span className={`font-medium ${s.text} ${config.color}`}>
                    {config.label}
                </span>
            </div>

            {/* Tooltip */}
            {showTooltip && isHovered && (
                <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64">
                    <div className="bg-slate-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg">
                        <div className="font-semibold mb-1">{config.label}</div>
                        <div className="text-slate-300">
                            {proofType
                                ? `This brand has: ${proofType}`
                                : config.description
                            }
                        </div>
                        {/* Tooltip arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                    </div>
                </div>
            )}
        </div>
    );
}
