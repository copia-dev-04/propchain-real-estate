'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Navbar } from '@/components/layouts/Navbar';
import { Footer } from '@/components/layouts/Footer';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { properties, type PropertyType } from '@/lib/data/properties';
import { cn } from '@/lib/utils/cn';

type SortOption = 'yield-desc' | 'funded-desc' | 'funded-asc' | 'value-asc' | 'value-desc';
type FilterType = PropertyType | 'All';

const typeFilters: FilterType[] = ['All', 'Residential', 'Commercial', 'Off-Plan'];
const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'yield-desc', label: 'Highest Yield' },
  { value: 'funded-desc', label: 'Most Funded' },
  { value: 'funded-asc', label: 'Least Funded' },
  { value: 'value-asc', label: 'Lowest Value' },
  { value: 'value-desc', label: 'Highest Value' },
];

export default function PropertiesPage() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<FilterType>('All');
  const [sortBy, setSortBy] = useState<SortOption>('yield-desc');
  const [minYield, setMinYield] = useState(0);
  const [visibleCount, setVisibleCount] = useState(6);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...properties];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.district.toLowerCase().includes(q)
      );
    }

    // Type filter
    if (selectedType !== 'All') {
      result = result.filter((p) => p.type === selectedType);
    }

    // Yield filter
    if (minYield > 0) {
      result = result.filter((p) => p.annualYield >= minYield);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'yield-desc':
          return b.annualYield - a.annualYield;
        case 'funded-desc':
          return b.funded - a.funded;
        case 'funded-asc':
          return a.funded - b.funded;
        case 'value-asc':
          return a.totalValue - b.totalValue;
        case 'value-desc':
          return b.totalValue - a.totalValue;
        default:
          return 0;
      }
    });

    return result;
  }, [search, selectedType, sortBy, minYield]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        {/* Hero */}
        <section className="bg-gradient-hero pt-32 pb-16" aria-labelledby="marketplace-heading">
          <div className="container-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/30 rounded-full px-4 py-1.5 text-gold-400 text-sm font-semibold mb-4">
                Live Marketplace
              </span>
              <h1
                id="marketplace-heading"
                className="font-display text-5xl md:text-6xl text-white font-semibold mb-4"
              >
                Dubai&apos;s Premium{' '}
                <span className="text-gold-500">Property Marketplace</span>
              </h1>
              <p className="font-body text-white/70 text-lg">
                Invest in tokenized real estate from AED 500. Vetted properties, transparent
                financials, VARA-licensed.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters + Grid */}
        <section className="py-12 bg-[#F8F7F4]">
          <div className="container-xl">
            {/* Filter bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              {/* Search */}
              <div className="relative flex-1">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search properties, locations..."
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                  aria-label="Search properties"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>

              {/* Type filters */}
              <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by property type">
                {typeFilters.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    aria-pressed={selectedType === type}
                    className={cn(
                      'px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all',
                      selectedType === type
                        ? 'bg-navy-700 text-gold-500 border-2 border-gold-500'
                        : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-gold-500/50'
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Sort + Filter toggle */}
              <div className="flex gap-3">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="appearance-none pl-4 pr-9 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-gold-500 cursor-pointer"
                    aria-label="Sort properties"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                    aria-hidden="true"
                  />
                </div>

                <button
                  onClick={() => setShowFilters((v) => !v)}
                  aria-expanded={showFilters}
                  aria-label="Toggle advanced filters"
                  className={cn(
                    'flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-all',
                    showFilters
                      ? 'bg-navy-700 text-gold-500 border-gold-500'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gold-500/50'
                  )}
                >
                  <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
                  Filters
                </button>
              </div>
            </div>

            {/* Advanced filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-2xl border border-gray-200 p-6 mb-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Yield range */}
                  <div>
                    <label
                      htmlFor="min-yield"
                      className="block text-sm font-semibold text-navy-700 mb-3"
                    >
                      Minimum Yield: {minYield}%
                    </label>
                    <input
                      id="min-yield"
                      type="range"
                      min={0}
                      max={10}
                      step={0.5}
                      value={minYield}
                      onChange={(e) => setMinYield(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>0%</span>
                      <span>10%</span>
                    </div>
                  </div>

                  {/* Min investment */}
                  <div>
                    <p className="text-sm font-semibold text-navy-700 mb-3">Min. Investment</p>
                    <div className="grid grid-cols-3 gap-2">
                      {['AED 500', 'AED 5K', 'AED 25K'].map((opt) => (
                        <button
                          key={opt}
                          className="px-3 py-2 text-xs bg-gray-50 hover:bg-gold-500/10 border border-gray-200 hover:border-gold-500/40 rounded-lg text-gray-600 hover:text-gold-600 transition-colors"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <p className="text-sm font-semibold text-navy-700 mb-3">Location</p>
                    <div className="grid grid-cols-2 gap-2">
                      {['Marina', 'Palm', 'Downtown', 'DIFC'].map((loc) => (
                        <button
                          key={loc}
                          className="px-3 py-2 text-xs bg-gray-50 hover:bg-gold-500/10 border border-gray-200 hover:border-gold-500/40 rounded-lg text-gray-600 hover:text-gold-600 transition-colors"
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Results count */}
            <p className="text-sm text-gray-500 mb-6 font-body">
              Showing <span className="font-semibold text-navy-700">{visible.length}</span> of{' '}
              <span className="font-semibold text-navy-700">{filtered.length}</span> properties
            </p>

            {/* Property grid */}
            {visible.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {visible.map((property, i) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-display text-2xl text-navy-700 mb-2">No properties found</p>
                <p className="text-gray-500 font-body">Try adjusting your filters or search term.</p>
                <button
                  onClick={() => {
                    setSearch('');
                    setSelectedType('All');
                    setMinYield(0);
                  }}
                  className="mt-4 text-gold-600 font-semibold hover:text-gold-500 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Load more */}
            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setVisibleCount((c) => c + 3)}
                  className="inline-flex items-center gap-2 bg-navy-700 hover:bg-navy-600 text-gold-500 font-semibold px-8 py-4 rounded-xl transition-colors"
                >
                  Load More Properties
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
