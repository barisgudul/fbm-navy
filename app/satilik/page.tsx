/* app/satilik/page.tsx */

import { FilterPanel } from '@/app/components/FilterPanel';
import { PropertyGrid } from '@/app/components/PropertyGrid';
import { Pagination } from '@/app/components/Pagination';
import { supabase } from '@/app/lib/supabaseClient';
import { transformToProperty } from '@/types';
import type { Property, PropertyRow, PaginationInfo } from '@/types';

interface SearchParams {
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  rooms?: string;
  page?: string;
}

const ITEMS_PER_PAGE = 12;

export default async function SatilikPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  // Await search params (Next.js 15 requirement)
  const params = await searchParams;

  // Pagination setup
  const currentPage = Math.max(1, parseInt(params.page || '1'));
  const from = (currentPage - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  // Build base query for count (without pagination)
  let countQuery = supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .eq('type', 'satilik')
    .eq('status', 'aktif');

  // Apply ALL filter conditions to count query
  if (params.location) {
    countQuery = countQuery.ilike('location', `%${params.location}%`);
  }
  if (params.rooms) {
    countQuery = countQuery.eq('rooms', Number(params.rooms));
  }
  // Server-side price filtering (price column is now integer in DB)
  if (params.minPrice) {
    const minPrice = parseInt(params.minPrice);
    if (!isNaN(minPrice)) {
      countQuery = countQuery.gte('price', minPrice);
    }
  }
  if (params.maxPrice) {
    const maxPrice = parseInt(params.maxPrice);
    if (!isNaN(maxPrice)) {
      countQuery = countQuery.lte('price', maxPrice);
    }
  }

  const { count: totalCount } = await countQuery;

  // Build paginated data query with ALL filters applied BEFORE pagination
  let query = supabase
    .from('properties')
    .select('*')
    .eq('type', 'satilik')
    .eq('status', 'aktif');

  // Apply ALL filter conditions BEFORE .range()
  if (params.location) {
    query = query.ilike('location', `%${params.location}%`);
  }
  if (params.rooms) {
    query = query.eq('rooms', Number(params.rooms));
  }
  // Server-side price filtering (price column is now integer in DB)
  if (params.minPrice) {
    const minPrice = parseInt(params.minPrice);
    if (!isNaN(minPrice)) {
      query = query.gte('price', minPrice);
    }
  }
  if (params.maxPrice) {
    const maxPrice = parseInt(params.maxPrice);
    if (!isNaN(maxPrice)) {
      query = query.lte('price', maxPrice);
    }
  }

  // Apply ordering and pagination AFTER all filters
  query = query.order('created_at', { ascending: false }).range(from, to);

  // Execute query
  const { data, error } = await query;

  let properties: Property[] = [];

  if (error) {
    console.error('Veri çekme hatası:', error);
  } else if (data) {
    // Transform database rows to frontend properties using typed helper
    // NO client-side filtering needed - all filtering done in Supabase
    properties = (data as PropertyRow[]).map(transformToProperty);
  }

  // Calculate pagination info
  const totalPages = Math.ceil((totalCount || 0) / ITEMS_PER_PAGE);
  const paginationInfo: PaginationInfo = {
    currentPage,
    totalPages,
    totalCount: totalCount || 0,
    itemsPerPage: ITEMS_PER_PAGE,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };

  return (
    <main className="min-h-screen pt-36 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h1 className="font-serif text-5xl md:text-7xl text-fbm-gold-400 mb-4">
            Satılık Konutlar
          </h1>
          <p className="font-sans text-lg text-white/80 max-w-2xl mx-auto">
            Hayalinizdeki evi bulun. Seçkin lokasyonlarda, kaliteli yapılar.
          </p>
        </div>

        {/* Filter Panel - Client Component */}
        <FilterPanel />

        {/* Property Grid - Server Component */}
        <PropertyGrid properties={properties} />

        {/* Pagination - Client Component */}
        <Pagination {...paginationInfo} baseUrl="/satilik" />
      </div>
    </main>
  );
}