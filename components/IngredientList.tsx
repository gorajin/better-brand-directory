'use client';

import { useState } from 'react';
import { Ingredient, SafetyLevel } from '@/types/database';

interface IngredientListProps {
    ingredients: Ingredient[];
}

interface TooltipProps {
    ingredient: Ingredient;
    position: { x: number; y: number };
}

const Tooltip = ({ ingredient, position }: TooltipProps) => {
    const bgColor =
        ingredient.safety_level === 'Safe' ? 'bg-[var(--color-safe-bg)] border-[var(--color-safe)]' :
            ingredient.safety_level === 'Avoid' ? 'bg-[var(--color-danger-bg)] border-[var(--color-danger)]' :
                'bg-[var(--color-caution-bg)] border-[var(--color-caution)]';

    const headerColor =
        ingredient.safety_level === 'Safe' ? 'text-[var(--color-safe)]' :
            ingredient.safety_level === 'Avoid' ? 'text-[var(--color-danger)]' :
                'text-[var(--color-caution)]';

    return (
        <div
            className={`absolute z-50 p-3 rounded-lg border-2 shadow-lg max-w-xs ${bgColor}`}
            style={{
                left: position.x,
                top: position.y + 10,
                transform: 'translateX(-50%)'
            }}
        >
            <div className={`font-semibold mb-1 ${headerColor}`}>
                {ingredient.safety_level === 'Safe' && '✓ '}
                {ingredient.safety_level === 'Avoid' && '⚠ '}
                {ingredient.safety_level === 'Caution' && '! '}
                {ingredient.name}
            </div>
            {ingredient.description && (
                <p className="text-sm text-[var(--color-text)]">{ingredient.description}</p>
            )}
            {ingredient.sources && ingredient.sources.length > 0 && (
                <div className="mt-2 text-xs text-[var(--color-text-muted)]">
                    Sources: {ingredient.sources.length}
                </div>
            )}
        </div>
    );
};

export default function IngredientList({ ingredients }: IngredientListProps) {
    const [hoveredIngredient, setHoveredIngredient] = useState<Ingredient | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const handleMouseEnter = (ingredient: Ingredient, event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setTooltipPosition({
            x: rect.left + rect.width / 2,
            y: rect.bottom,
        });
        setHoveredIngredient(ingredient);
    };

    const handleMouseLeave = () => {
        setHoveredIngredient(null);
    };

    // Sort ingredients: Avoid first, then Caution, then Safe
    const sortedIngredients = [...ingredients].sort((a, b) => {
        const order: Record<SafetyLevel, number> = { Avoid: 0, Caution: 1, Safe: 2 };
        return order[a.safety_level] - order[b.safety_level];
    });

    return (
        <div className="relative">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
                Ingredients
            </h3>
            <div className="flex flex-wrap gap-2">
                {sortedIngredients.map((ingredient) => {
                    const pillClass =
                        ingredient.safety_level === 'Safe' ? 'ingredient-pill--safe' :
                            ingredient.safety_level === 'Avoid' ? 'ingredient-pill--avoid' :
                                'ingredient-pill--caution';

                    return (
                        <span
                            key={ingredient.id}
                            className={`ingredient-pill ${pillClass}`}
                            onMouseEnter={(e) => handleMouseEnter(ingredient, e)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {ingredient.safety_level === 'Avoid' && (
                                <span className="mr-1 text-[var(--color-danger)]">⚠</span>
                            )}
                            {ingredient.safety_level === 'Safe' && (
                                <span className="mr-1 text-[var(--color-safe)]">✓</span>
                            )}
                            {ingredient.name}
                        </span>
                    );
                })}
            </div>

            {/* Tooltip */}
            {hoveredIngredient && (
                <Tooltip ingredient={hoveredIngredient} position={tooltipPosition} />
            )}
        </div>
    );
}
