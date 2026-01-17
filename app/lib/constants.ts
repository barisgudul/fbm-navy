/* app/lib/constants.ts */
/**
 * Design Categories - Single Source of Truth
 * Used by admin panel for input and frontend for filtering
 */

export const DESIGN_CATEGORIES = [
    'Konut İç Mekan',
    'Ticari İç Mekan',
    'Villa Projesi',
    'Havuz Tasarımı',
    'Peyzaj & Bahçe',
    'Cephe Tasarımı',
    'Ofis Tasarımı',
    'Otel Konsepti',
] as const;

export type DesignCategory = typeof DESIGN_CATEGORIES[number];

// Frontend filter options (includes "Tümü" as first option)
export const DESIGN_FILTER_OPTIONS = ['Tümü', ...DESIGN_CATEGORIES] as const;
export type DesignFilterOption = typeof DESIGN_FILTER_OPTIONS[number];

// Legacy category mapping for data migration
export const LEGACY_CATEGORY_MAP: Record<string, DesignCategory> = {
    'İç Tasarım': 'Konut İç Mekan',
    'Dış Tasarım': 'Cephe Tasarımı',
    'Peyzaj': 'Peyzaj & Bahçe',
    'Havuz & Peyzaj': 'Peyzaj & Bahçe',
    'Ofis Tasarımı': 'Ofis Tasarımı',
    'Konut Tasarımı': 'Konut İç Mekan',
    'Ticari Mekan': 'Ticari İç Mekan',
};

// ============================================================
// POLYMORPHIC SPECS - Discriminated Union Types
// ============================================================

/** Pool system types */
export const POOL_SYSTEM_TYPES = ['Taşmalı', 'Skimmer'] as const;
export type PoolSystemType = typeof POOL_SYSTEM_TYPES[number];

/** Budget segment types for interior projects */
export const BUDGET_SEGMENTS = ['Standart', 'Premium', 'Lüks'] as const;
export type BudgetSegment = typeof BUDGET_SEGMENTS[number];

/** Pool-specific specifications */
export interface PoolSpecs {
    category: 'Havuz Tasarımı';
    depth: number;           // cm
    volume_m3: number;       // m³
    systemType: PoolSystemType;
    coatingMaterial: string;
}

/** Landscape-specific specifications */
export interface LandscapeSpecs {
    category: 'Peyzaj & Bahçe';
    hardscapeArea_m2: number;    // m²
    softscapeArea_m2: number;    // m²
    plantVarietyCount: number;
    irrigationSystem: boolean;
}

/** Interior-specific specifications (applies to multiple categories) */
export interface InteriorSpecs {
    category: 'Konut İç Mekan' | 'Ticari İç Mekan' | 'Ofis Tasarımı' | 'Otel Konsepti' | 'Villa Projesi';
    roomCount: number;
    style: string;
    budgetSegment: BudgetSegment;
}

/** Facade-specific specifications */
export interface FacadeSpecs {
    category: 'Cephe Tasarımı';
    material: string;
    insulationType: string;
    buildingHeight_m: number;  // m
}

/** Discriminated union for all spec types */
export type DesignSpecs = PoolSpecs | LandscapeSpecs | InteriorSpecs | FacadeSpecs;

/** Categories that support specs */
export const CATEGORIES_WITH_SPECS: readonly DesignCategory[] = [
    'Havuz Tasarımı',
    'Peyzaj & Bahçe',
    'Konut İç Mekan',
    'Ticari İç Mekan',
    'Ofis Tasarımı',
    'Otel Konsepti',
    'Villa Projesi',
    'Cephe Tasarımı',
];

// ============================================================
// LABEL MAPPINGS - Turkish Display with Units
// ============================================================

export interface SpecLabelConfig {
    label: string;
    unit?: string;
    formatBoolean?: { true: string; false: string };
}

export const SPEC_LABEL_MAP: Record<string, SpecLabelConfig> = {
    // Pool specs
    depth: { label: 'Derinlik', unit: 'cm' },
    volume_m3: { label: 'Su Hacmi', unit: 'm³' },
    systemType: { label: 'Sistem Tipi' },
    coatingMaterial: { label: 'Kaplama Malzemesi' },

    // Landscape specs
    hardscapeArea_m2: { label: 'Sert Zemin Alanı', unit: 'm²' },
    softscapeArea_m2: { label: 'Yeşil Alan', unit: 'm²' },
    plantVarietyCount: { label: 'Bitki Çeşidi Sayısı' },
    irrigationSystem: {
        label: 'Sulama Sistemi',
        formatBoolean: { true: 'Mevcut', false: 'Yok' }
    },

    // Interior specs
    roomCount: { label: 'Oda Sayısı' },
    style: { label: 'Tasarım Stili' },
    budgetSegment: { label: 'Bütçe Segmenti' },

    // Facade specs
    material: { label: 'Cephe Malzemesi' },
    insulationType: { label: 'Yalıtım Tipi' },
    buildingHeight_m: { label: 'Bina Yüksekliği', unit: 'm' },
};

/**
 * Format a spec value for display with label and unit
 */
export function formatSpecValue(key: string, value: unknown): string | null {
    if (value === undefined || value === null || value === '') return null;

    const config = SPEC_LABEL_MAP[key];
    if (!config) return null;

    if (typeof value === 'boolean') {
        return config.formatBoolean
            ? config.formatBoolean[value ? 'true' : 'false']
            : (value ? 'Evet' : 'Hayır');
    }

    if (config.unit) {
        return `${value} ${config.unit}`;
    }

    return String(value);
}
