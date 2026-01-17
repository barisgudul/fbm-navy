/**
 * Database types for Supabase integration
 * Strictly typed for FRH Gayrimenkul properties table
 */

// Property status types
export type PropertyStatus = 'aktif' | 'satildi' | 'kiralandi';
export type PropertyType = 'satilik' | 'kiralik';
export type PropertyCategory = 'konut' | 'arsa';

// Zoning status options for Land (Arsa)
export const ZONING_STATUS_OPTIONS = [
  'Konut İmarlı',
  'Ticari İmarlı',
  'Sanayi İmarlı',
  'Tarla (Tarım Arazisi)',
  'Karma İmarlı',
  'İmarsız',
  'Orman Arazisi',
  'Turizm İmarlı',
] as const;

export type ZoningStatus = typeof ZONING_STATUS_OPTIONS[number];

// Database row type - matches Supabase schema exactly
export interface PropertyRow {
  id: number;
  title: string;
  location: string;
  price: string;
  area: number;
  category: PropertyCategory;
  // Residential fields (nullable for Land)
  rooms: number | null;
  living_rooms: number | null;
  bathrooms: number | null;
  floor: number | null;
  // Land-specific fields
  zoning_status: string | null;
  ada: string | null;
  parsel: string | null;
  kaks: number | null;
  taks: number | null;
  gabari: string | null;
  tapu_durumu: string | null;
  kredi_uygunluk: boolean | null;
  // Common fields
  description: string | null;
  image_urls: string[];
  video_urls: string[] | null;
  type: PropertyType;
  status: PropertyStatus;
  created_at: string;
  updated_at: string;
}

// Frontend property type - transformed for UI components
export interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  area: number;
  category?: PropertyCategory;
  rooms: number | null;
  livingRoom: number | null;
  bathrooms: number | null;
  image: string;
  status?: PropertyStatus;
  // Land-specific fields for display
  zoning_status?: string | null;
}

// Property detail type - extended with all fields for detail pages
export interface PropertyDetail extends Property {
  description: string;
  images: string[];
  videos: string[];
  floor: number | null;
  type: PropertyType;
  // Land-specific fields
  ada?: string | null;
  parsel?: string | null;
  kaks?: number | null;
  taks?: number | null;
  gabari?: string | null;
  tapu_durumu?: string | null;
  kredi_uygunluk?: boolean | null;
}

// Database operation types
export interface PropertyInsert {
  title: string;
  location: string;
  price: string;
  area: number;
  category: PropertyCategory;
  // Residential fields (optional for Land)
  rooms?: number | null;
  living_rooms?: number | null;
  bathrooms?: number | null;
  floor?: number | null;
  // Land-specific fields
  zoning_status?: string | null;
  ada?: string | null;
  parsel?: string | null;
  kaks?: number | null;
  taks?: number | null;
  gabari?: string | null;
  tapu_durumu?: string | null;
  kredi_uygunluk?: boolean | null;
  // Common fields
  description?: string | null;
  image_urls: string[];
  video_urls?: string[] | null;
  type: PropertyType;
  status?: PropertyStatus;
}

export type PropertyUpdate = Partial<PropertyInsert>;

// Helper function to transform database row to frontend property
export function transformToProperty(row: PropertyRow): Property {
  return {
    id: row.id,
    title: row.title,
    location: row.location,
    price: row.price,
    area: row.area,
    category: row.category || 'konut',
    rooms: row.rooms,
    livingRoom: row.living_rooms,
    bathrooms: row.bathrooms,
    image: row.image_urls && row.image_urls.length > 0
      ? row.image_urls[0]
      : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    status: row.status,
    zoning_status: row.zoning_status,
  };
}

// Helper function to transform to property detail
export function transformToPropertyDetail(row: PropertyRow): PropertyDetail {
  return {
    ...transformToProperty(row),
    description: row.description || '',
    images: row.image_urls || [],
    videos: row.video_urls || [],
    floor: row.floor,
    type: row.type,
    // Land-specific fields
    ada: row.ada,
    parsel: row.parsel,
    kaks: row.kaks,
    taks: row.taks,
    gabari: row.gabari,
    tapu_durumu: row.tapu_durumu,
    kredi_uygunluk: row.kredi_uygunluk,
  };
}

// Pagination types
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Contact form types
export interface ContactFormData {
  name: string;
  phone: string;
  note: string;
  propertyTitle?: string;
  propertyLocation?: string;
  propertyLink?: string;
}

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}
