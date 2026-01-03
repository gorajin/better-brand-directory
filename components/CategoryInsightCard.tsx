import { CategoryInsight } from '@/types/database';

interface CategoryInsightCardProps {
    insights: CategoryInsight[];
}

/**
 * Displays critical findings/warnings at the top of category pages
 * Style: Amber warning banner with left border accent
 */
export default function CategoryInsightCard({ insights }: CategoryInsightCardProps) {
    if (!insights || insights.length === 0) return null;

    return (
        <div className="mb-6 space-y-3">
            {insights.slice(0, 2).map((insight, index) => (
                <div
                    key={insight.id || index}
                    className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg"
                >
                    <div className="flex items-start gap-3">
                        <span className="text-amber-600 text-lg flex-shrink-0">⚠️</span>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-amber-800 font-medium leading-relaxed">
                                {insight.fact}
                            </p>
                            {insight.source && (
                                <p className="text-xs text-amber-600 mt-1">
                                    Source: {insight.source}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
