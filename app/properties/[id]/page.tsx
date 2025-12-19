'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import {
  MapPin,
  TrendingUp,
  Users,
  ArrowLeft,
  Shield,
  Star,
  Home,
  Maximize2,
  BedDouble,
  Bath,
  Calculator,
} from 'lucide-react';
import { Navbar } from '@/components/layouts/Navbar';
import { Footer } from '@/components/layouts/Footer';
import { Badge } from '@/components/ui/Badge';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { getPropertyById, getRelatedProperties, formatAED } from '@/lib/data/properties';
import { cn } from '@/lib/utils/cn';

const tabList = ['Overview', 'Financials', 'Documents', 'Updates'] as const;
type Tab = (typeof tabList)[number];

function FundingRingLarge({ funded }: { funded: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (funded / 100) * circumference;

  return (
    <svg width="100" height="100" viewBox="0 0 100 100" aria-label={`${funded}% funded`} role="img">
      <circle cx="50" cy="50" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="6" />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="#D4AF37"
        strokeWidth="6"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
        style={{ transition: 'stroke-dashoffset 1.5s ease' }}
      />
      <text x="50" y="54" textAnchor="middle" fontSize="18" fill="#D4AF37" fontWeight="700">
        {funded}%
      </text>
      <text x="50" y="68" textAnchor="middle" fontSize="10" fill="#9CA3AF">
        Funded
      </text>
    </svg>
  );
}

export default function PropertyDetailPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';
  const property = getPropertyById(id);
  const related = getRelatedProperties(id);

  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const [investAmount, setInvestAmount] = useState(500);

  if (!property) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#F8F7F4] flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-4xl text-navy-700 mb-4">Property Not Found</h1>
            <a href="/properties" className="text-gold-600 hover:text-gold-500 font-semibold">
              ← Back to Properties
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const tokenCount = Math.floor(investAmount / property.tokenPrice);
  const projectedAnnual = ((investAmount * property.annualYield) / 100).toFixed(0);
  const projectedMonthly = ((investAmount * property.annualYield) / 100 / 12).toFixed(0);

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        {/* Hero */}
        <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-br',
              property.gradient
            )}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-800 via-navy-800/40 to-transparent" aria-hidden="true" />

          <div className="absolute inset-0 flex flex-col justify-end pb-10">
            <div className="container-xl">
              {/* Back link */}
              <a
                href="/properties"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 font-body text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back to Properties
              </a>

              {/* Property header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant={property.type === 'Residential' ? 'teal' : property.type === 'Commercial' ? 'navy' : 'gold'}>
                      {property.type}
                    </Badge>
                    {property.completionYear && (
                      <Badge variant="warning">Off-Plan · {property.completionYear}</Badge>
                    )}
                    <Badge variant="success">Active</Badge>
                  </div>
                  <h1 className="font-display text-4xl md:text-5xl text-white font-semibold">
                    {property.name}
                  </h1>
                  <p className="flex items-center gap-2 text-white/70 mt-2 font-body">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                    {property.location}
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3">
                    <p className="text-gold-500 font-bold text-2xl">{property.annualYield}%</p>
                    <p className="text-white/60 text-xs">Annual Yield</p>
                  </div>
                  <FundingRingLarge funded={property.funded} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="bg-[#F8F7F4] py-12">
          <div className="container-xl">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Quick stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Value', value: formatAED(property.totalValue) },
                    { label: 'Funded', value: `${property.funded}%` },
                    { label: 'Min Investment', value: `AED ${property.minInvestment}` },
                    { label: 'Token Price', value: `AED ${property.tokenPrice}` },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-card">
                      <p className="text-xs text-gray-500 font-body mb-1">{stat.label}</p>
                      <p className="font-display text-xl font-semibold text-navy-700">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="bg-white rounded-2xl p-6 shadow-card">
                  <div className="flex justify-between items-center mb-3">
                    <p className="font-semibold text-navy-700">Funding Progress</p>
                    <p className="text-gold-600 font-bold">{property.funded}% Funded</p>
                  </div>
                  <div
                    className="h-4 bg-gray-100 rounded-full overflow-hidden"
                    role="progressbar"
                    aria-valuenow={property.funded}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <motion.div
                      className="h-full bg-gold-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${property.funded}%` }}
                      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <div className="flex justify-between mt-3 text-sm text-gray-500 font-body">
                    <span>{property.funded}% raised</span>
                    <span>{100 - property.funded}% remaining</span>
                  </div>
                </div>

                {/* Tabs */}
                <div>
                  <div
                    className="flex gap-1 bg-gray-100 p-1 rounded-xl overflow-x-auto"
                    role="tablist"
                    aria-label="Property information tabs"
                  >
                    {tabList.map((tab) => (
                      <button
                        key={tab}
                        role="tab"
                        aria-selected={activeTab === tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          'flex-1 py-2.5 px-4 text-sm font-semibold rounded-lg transition-all whitespace-nowrap',
                          activeTab === tab
                            ? 'bg-white text-navy-700 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        )}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Tab content */}
                  <div className="mt-6" role="tabpanel" aria-label={`${activeTab} tab`}>
                    {activeTab === 'Overview' && (
                      <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-card">
                          <h2 className="font-display text-xl text-navy-700 font-semibold mb-4">
                            About This Property
                          </h2>
                          <p className="text-gray-600 font-body leading-relaxed">
                            {property.description}
                          </p>
                        </div>

                        {/* Property details */}
                        <div className="bg-white rounded-2xl p-6 shadow-card">
                          <h3 className="font-display text-xl text-navy-700 font-semibold mb-4">
                            Property Details
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {property.bedrooms && (
                              <div className="flex items-center gap-3">
                                <BedDouble className="w-5 h-5 text-gold-500" aria-hidden="true" />
                                <div>
                                  <p className="text-xs text-gray-500">Bedrooms</p>
                                  <p className="font-semibold text-navy-700">{property.bedrooms}</p>
                                </div>
                              </div>
                            )}
                            {property.bathrooms && (
                              <div className="flex items-center gap-3">
                                <Bath className="w-5 h-5 text-gold-500" aria-hidden="true" />
                                <div>
                                  <p className="text-xs text-gray-500">Bathrooms</p>
                                  <p className="font-semibold text-navy-700">{property.bathrooms}</p>
                                </div>
                              </div>
                            )}
                            <div className="flex items-center gap-3">
                              <Maximize2 className="w-5 h-5 text-gold-500" aria-hidden="true" />
                              <div>
                                <p className="text-xs text-gray-500">Area</p>
                                <p className="font-semibold text-navy-700">{property.area.toLocaleString()} sqft</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Home className="w-5 h-5 text-gold-500" aria-hidden="true" />
                              <div>
                                <p className="text-xs text-gray-500">Developer</p>
                                <p className="font-semibold text-navy-700">{property.developer}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Highlights */}
                        <div className="bg-white rounded-2xl p-6 shadow-card">
                          <h3 className="font-display text-xl text-navy-700 font-semibold mb-4">
                            Property Highlights
                          </h3>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {property.highlights.map((h) => (
                              <li key={h} className="flex items-center gap-3 text-gray-600 font-body text-sm">
                                <Star className="w-4 h-4 text-gold-500 shrink-0" aria-hidden="true" />
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Amenities */}
                        <div className="bg-white rounded-2xl p-6 shadow-card">
                          <h3 className="font-display text-xl text-navy-700 font-semibold mb-4">
                            Amenities
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {property.amenities.map((amenity) => (
                              <span
                                key={amenity}
                                className="px-3 py-1.5 bg-gold-500/10 text-gold-700 border border-gold-500/20 rounded-lg text-sm font-medium"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Location map placeholder */}
                        <div className="bg-white rounded-2xl p-6 shadow-card">
                          <h3 className="font-display text-xl text-navy-700 font-semibold mb-4">
                            Location
                          </h3>
                          <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center">
                            <div className="text-center">
                              <MapPin className="w-8 h-8 text-gold-500 mx-auto mb-2" aria-hidden="true" />
                              <p className="text-gray-500 text-sm font-body">{property.location}</p>
                              <p className="text-gray-400 text-xs mt-1">{property.district}, Dubai, UAE</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'Financials' && (
                      <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-card">
                          <h2 className="font-display text-xl text-navy-700 font-semibold mb-6">
                            Financial Projections
                          </h2>

                          <div className="grid grid-cols-2 gap-4 mb-6">
                            {[
                              { label: 'Annual Yield', value: `${property.annualYield}%` },
                              { label: 'Monthly Rental Income', value: formatAED(property.rentalIncome) },
                              { label: 'Total Tokens', value: property.totalTokens.toLocaleString() },
                              { label: 'Available Tokens', value: property.availableTokens.toLocaleString() },
                            ].map((item) => (
                              <div key={item.label} className="bg-gray-50 rounded-xl p-4">
                                <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                                <p className="font-display text-xl font-semibold text-gold-600">{item.value}</p>
                              </div>
                            ))}
                          </div>

                          {/* Chart placeholder */}
                          <div className="bg-navy-700 rounded-xl p-6 h-48 flex items-end gap-2" aria-label="Financial projection chart placeholder">
                            {[40, 55, 45, 70, 60, 80, 65, 90, 75, 95, 85, 100].map((h, i) => (
                              <div
                                key={i}
                                className="flex-1 bg-gold-500/40 rounded-t-sm hover:bg-gold-500 transition-colors"
                                style={{ height: `${h}%` }}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                          <p className="text-xs text-gray-400 mt-2 text-center">Monthly dividend distribution (AED)</p>
                        </div>

                        {/* Risk disclosure */}
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                          <div className="flex gap-3">
                            <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                            <div>
                              <h3 className="font-semibold text-amber-800 mb-2">Risk Disclosure</h3>
                              <p className="text-amber-700 text-sm font-body leading-relaxed">
                                Real estate investments involve risk, including potential loss of capital. Past
                                performance does not guarantee future results. Projected yields are estimates based
                                on current market conditions and may vary. Please read the full risk disclosure
                                document before investing. This investment is not suitable for all investors.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'Documents' && (
                      <div className="space-y-4">
                        <div className="bg-white rounded-2xl p-6 shadow-card">
                          <h2 className="font-display text-xl text-navy-700 font-semibold mb-4">
                            Legal Documents
                          </h2>
                          <ul className="space-y-3">
                            {[
                              { name: 'Title Deed', type: 'PDF', size: '2.4 MB' },
                              { name: 'Investment Prospectus', type: 'PDF', size: '8.1 MB' },
                              { name: 'Valuation Report', type: 'PDF', size: '5.6 MB' },
                              { name: 'Due Diligence Report', type: 'PDF', size: '12.3 MB' },
                              { name: 'Smart Contract Audit', type: 'PDF', size: '3.8 MB' },
                            ].map((doc) => (
                              <li
                                key={doc.name}
                                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 bg-gold-500/10 rounded-lg flex items-center justify-center">
                                    <Shield className="w-4 h-4 text-gold-600" aria-hidden="true" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold text-navy-700">{doc.name}</p>
                                    <p className="text-xs text-gray-400">{doc.type} · {doc.size}</p>
                                  </div>
                                </div>
                                <button className="text-gold-600 hover:text-gold-500 text-sm font-semibold transition-colors">
                                  Download
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {activeTab === 'Updates' && (
                      <div className="space-y-4">
                        <div className="bg-white rounded-2xl p-6 shadow-card">
                          <h2 className="font-display text-xl text-navy-700 font-semibold mb-6">
                            Property Updates
                          </h2>
                          <div className="space-y-6">
                            {[
                              {
                                date: 'March 2026',
                                title: 'Q1 2026 Dividend Distributed',
                                content: `AED ${(property.rentalIncome * 3).toLocaleString()} in quarterly rental income has been distributed to all token holders as of March 31, 2026.`,
                              },
                              {
                                date: 'January 2026',
                                title: 'Property Valuation Updated',
                                content: 'Independent valuation confirms 4.2% capital appreciation since initial listing. Property management contract renewed for 2 years.',
                              },
                              {
                                date: 'December 2025',
                                title: 'Q4 2025 Dividend Distributed',
                                content: `Quarterly rental income of AED ${(property.rentalIncome * 3).toLocaleString()} successfully distributed. 98% occupancy maintained throughout Q4.`,
                              },
                            ].map((update) => (
                              <div key={update.date} className="flex gap-4">
                                <div className="w-2 h-2 rounded-full bg-gold-500 mt-2 shrink-0" aria-hidden="true" />
                                <div>
                                  <p className="text-xs text-gray-400 mb-1">{update.date}</p>
                                  <h3 className="font-semibold text-navy-700 mb-1">{update.title}</h3>
                                  <p className="text-gray-600 text-sm font-body leading-relaxed">{update.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Related properties */}
                <div>
                  <h2 className="font-display text-2xl text-navy-700 font-semibold mb-6">
                    Similar Properties
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {related.map((p) => (
                      <PropertyCard key={p.id} property={p} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sticky sidebar: Investment widget */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-4">
                  <div className="bg-white rounded-3xl p-6 shadow-card border border-gray-100">
                    <div className="flex items-center justify-between mb-1">
                      <h2 className="font-display text-xl text-navy-700 font-semibold">
                        Invest Now
                      </h2>
                      <Badge variant="success">Live</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-6 font-body">
                      Start investing from AED {property.minInvestment}
                    </p>

                    {/* Amount input */}
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="invest-amount"
                          className="block text-sm font-semibold text-navy-700 mb-2"
                        >
                          Investment Amount (AED)
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">AED</span>
                          <input
                            id="invest-amount"
                            type="number"
                            min={property.minInvestment}
                            step={property.tokenPrice}
                            value={investAmount}
                            onChange={(e) => setInvestAmount(Number(e.target.value))}
                            className="w-full pl-14 pr-4 py-3 border-2 border-gray-200 focus:border-gold-500 rounded-xl text-navy-700 font-semibold focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Quick amounts */}
                      <div className="grid grid-cols-4 gap-2">
                        {[500, 1000, 5000, 10000].map((amt) => (
                          <button
                            key={amt}
                            onClick={() => setInvestAmount(amt)}
                            className={cn(
                              'py-2 text-xs font-semibold rounded-lg border-2 transition-all',
                              investAmount === amt
                                ? 'bg-gold-500 border-gold-500 text-navy-700'
                                : 'bg-white border-gray-200 text-gray-600 hover:border-gold-500/50'
                            )}
                          >
                            {amt >= 1000 ? `${amt / 1000}K` : amt}
                          </button>
                        ))}
                      </div>

                      {/* Token count */}
                      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Token count</span>
                          <span className="font-semibold text-navy-700">{tokenCount} tokens</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Annual return</span>
                          <span className="font-semibold text-emerald-600">AED {projectedAnnual}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Monthly income</span>
                          <span className="font-semibold text-emerald-600">AED {projectedMonthly}</span>
                        </div>
                      </div>

                      <button
                        className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-navy-700 font-bold rounded-xl shadow-glow-sm hover:shadow-glow transition-all flex items-center justify-center gap-2 text-lg"
                        aria-label={`Invest AED ${investAmount.toLocaleString()} in ${property.name}`}
                      >
                        <Calculator className="w-5 h-5" aria-hidden="true" />
                        Invest AED {investAmount.toLocaleString()}
                      </button>

                      <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                        <Shield className="w-3.5 h-3.5" aria-hidden="true" />
                        VARA Licensed · Secure & Regulated
                      </div>
                    </div>
                  </div>

                  {/* Key metrics */}
                  <div className="bg-navy-700 rounded-3xl p-6 space-y-4">
                    <h3 className="font-display text-lg text-white font-semibold">Key Metrics</h3>
                    {[
                      { label: 'Annual Yield', value: `${property.annualYield}%`, color: 'text-gold-500' },
                      { label: 'Funding Progress', value: `${property.funded}%`, color: 'text-teal-400' },
                      {
                        label: 'Monthly Income (total)',
                        value: formatAED(property.rentalIncome),
                        color: 'text-emerald-400',
                      },
                      { label: 'Available Tokens', value: property.availableTokens.toLocaleString(), color: 'text-white' },
                    ].map((metric) => (
                      <div key={metric.label} className="flex justify-between items-center">
                        <span className="text-white/60 text-sm">{metric.label}</span>
                        <span className={cn('font-bold text-sm', metric.color)}>{metric.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Investor count */}
                  <div className="bg-white rounded-2xl p-4 shadow-card border border-gray-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-teal-600" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy-700 text-sm">
                        {Math.floor(property.funded * 4 + 12)} investors
                      </p>
                      <p className="text-gray-400 text-xs">already invested in this property</p>
                    </div>
                    <TrendingUp className="w-4 h-4 text-emerald-500 ml-auto" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
