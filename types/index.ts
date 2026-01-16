/**
 * Database types for Supabase integration
 * Strictly typed for FRH Gayrimenkul properties table
 */

// Property status types
export type PropertyStatus = 'aktif' | 'satildi' | 'kiralandi';
export type PropertyType = 'satilik' | 'kiralik';

// Database row type - matches Supabase schema exactly
export interface PropertyRow {
  id: number;
  title: string;
  location: string;
  price: string;
  area: number;
  rooms: number;
  living_rooms: number;
  bathrooms: number;
  description: string | null;
  image_urls: string[];
  video_urls: string[] | null;
  type: PropertyType;
  status: PropertyStatus;
  floor: number | null;
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
  rooms: number;
  livingRoom: number;
  bathrooms: number;
  image: string;
  status?: PropertyStatus;
}

// Property detail type - extended with all fields for detail pages
export interface PropertyDetail extends Property {
  description: string;
  images: string[];
  videos: string[];
  floor: number | null;
  type: PropertyType;
}

// Database operation types
export interface PropertyInsert {
  title: string;
  location: string;
  price: string;
  area: number;
  rooms: number;
  living_rooms: number;
  bathrooms: number;
  description?: string | null;
  image_urls: string[];
  video_urls?: string[] | null;
  type: PropertyType;
  status?: PropertyStatus;
  floor?: number | null;
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
    rooms: row.rooms,
    livingRoom: row.living_rooms,
    bathrooms: row.bathrooms,
    image: row.image_urls && row.image_urls.length > 0
      ? row.image_urls[0]
      : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    status: row.status,
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
