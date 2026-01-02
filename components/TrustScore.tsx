'use client';

interface TrustScoreProps {
    score: number;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
}

const sizeConfig = {
    sm: { diameter: 48, strokeWidth: 4, fontSize: 'text-sm' },
    md: { diameter: 64, strokeWidth: 6, fontSize: 'text-lg' },
    lg: { diameter: 96, strokeWidth: 8, fontSize: 'text-2xl' },
};

export default function TrustScore({ score, size = 'md', showLabel = true }: TrustScoreProps) {
    const config = sizeConfig[size];
    const radius = (config.diameter - config.strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    // Color based on score
    const getColor = () => {
        if (score >= 80) return 'var(--color-safe)';
        if (score >= 50) return 'var(--color-caution)';
        return 'var(--color-danger)';
    };

    return (
        <div className="flex items-center gap-2">
            <div className="relative" style={{ width: config.diameter, height: config.diameter }}>
                <svg
                    className="trust-score-ring"
                    width={config.diameter}
                    height={config.diameter}
                    viewBox={`0 0 ${config.diameter} ${config.diameter}`}
                >
                    {/* Background circle */}
                    <circle
                        className="bg"
                        cx={config.diameter / 2}
                        cy={config.diameter / 2}
                        r={radius}
                        strokeWidth={config.strokeWidth}
                    />
                    {/* Progress circle */}
                    <circle
                        className="progress"
                        cx={config.diameter / 2}
                        cy={config.diameter / 2}
                        r={radius}
                        strokeWidth={config.strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        style={{ stroke: getColor() }}
                    />
                </svg>
                {/* Score text */}
                <div
                    className={`absolute inset-0 flex items-center justify-center font-bold ${config.fontSize}`}
                    style={{ color: getColor() }}
                >
                    {score}
                </div>
            </div>
            {showLabel && (
                <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
                    Trust<br />Score
                </div>
            )}
        </div>
    );
}
