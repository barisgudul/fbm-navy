/* app/satilik/page.tsx */
/**
 * Satılık Properties - Premium Collection Page
 */

import { FilterPanel } from '@/app/components/FilterPanel';
import { PropertyGrid } from '@/app/components/PropertyGrid';
import { Pagination } from '@/app/components/Pagination';
import { PageHeader } from '@/app/components/layout/PageHeader';
import { supabase } from '@/app/lib/supabaseClient';
import { transformToProperty } from '@/types';
import type { Property, PropertyRow, PaginationInfo, PropertyCategory } from '@/types';

// Optimize data fetching with revalidation
export const revalidate = 60; // Cache for 60 seconds

interface SearchParams {
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  rooms?: string;
  category?: PropertyCategory;
  page?: string;
}

const ITEMS_PER_PAGE = 12;

export default async function SatilikPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || '1'));
  const from = (currentPage - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  // Count query
  let countQuery = supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .eq('type', 'satilik')
    .eq('status', 'aktif');

  // Apply category filter
  if (params.category) countQuery = countQuery.eq('category', params.category);
  if (params.location) countQuery = countQuery.ilike('location', `%${params.location}%`);
  // Only apply rooms filter if not filtering by 'arsa' category
  if (params.rooms && params.category !== 'arsa') countQuery = countQuery.eq('rooms', Number(params.rooms));
  if (params.minPrice) {
    const minPrice = parseInt(params.minPrice);
    if (!isNaN(minPrice)) countQuery = countQuery.gte('price', minPrice);
  }
  if (params.maxPrice) {
    const maxPrice = parseInt(params.maxPrice);
    if (!isNaN(maxPrice)) countQuery = countQuery.lte('price', maxPrice);
  }

  const { count: totalCount } = await countQuery;

  // Data query
  let query = supabase
    .from('properties')
    .select('*')
    .eq('type', 'satilik')
    .eq('status', 'aktif');

  // Apply category filter
  if (params.category) query = query.eq('category', params.category);
  if (params.location) query = query.ilike('location', `%${params.location}%`);
  // Only apply rooms filter if not filtering by 'arsa' category
  if (params.rooms && params.category !== 'arsa') query = query.eq('rooms', Number(params.rooms));
  if (params.minPrice) {
    const minPrice = parseInt(params.minPrice);
    if (!isNaN(minPrice)) query = query.gte('price', minPrice);
  }
  if (params.maxPrice) {
    const maxPrice = parseInt(params.maxPrice);
    if (!isNaN(maxPrice)) query = query.lte('price', maxPrice);
  }

  query = query.order('created_at', { ascending: false }).range(from, to);

  const { data, error } = await query;

  let properties: Property[] = [];
  if (!error && data) {
    properties = (data as PropertyRow[]).map(transformToProperty);
  }

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
    <main className="min-h-screen bg-[#12161f]">
      {/* Cinematic Header */}
      <PageHeader
        title="Satılık Portföyü"
        subtitle="Eşsiz Yaşam Alanları"
        bgImage="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
      />

      {/* Content */}
      <section className="py-20 md:py-24 px-6 md:px-12">
        <div className="container mx-auto max-w-7xl">
          {/* Filter */}
          <div className="mb-16">
            <FilterPanel />
          </div>

          {/* Grid */}
          <PropertyGrid properties={properties} />

          {/* Pagination */}
          <div className="mt-20">
            <Pagination {...paginationInfo} baseUrl="/satilik" />
          </div>
        </div>
      </section>
    </main>
  );
}