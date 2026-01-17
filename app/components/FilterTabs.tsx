/* app/components/FilterTabs.tsx */
'use client';

interface FilterTabsProps {
    categories: readonly string[];
    activeCategory: string;
    onSelect: (category: string) => void;
}

export function FilterTabs({ categories, activeCategory, onSelect }: FilterTabsProps) {
    return (
        <div className="w-full mb-12">
            {/* Mobile: Horizontal scroll, Desktop: Flex wrap */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 md:flex-wrap md:justify-center scrollbar-hide">
                {categories.map((category) => {
                    const isActive = category === activeCategory;

                    return (
                        <button
                            key={category}
                            onClick={() => onSelect(category)}
                            className={`
                flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium
                border-2 transition-all duration-300 ease-out
                ${isActive
                                    ? 'text-fbm-gold-400 border-fbm-gold-400 bg-fbm-gold-400/10'
                                    : 'text-gray-400 border-white/10 hover:text-fbm-gold-400/70 hover:border-fbm-gold-400/30'
                                }
              `}
                        >
                            {category}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
