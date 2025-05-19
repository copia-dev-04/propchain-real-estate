export type PropertyType = 'Residential' | 'Commercial' | 'Off-Plan';
export type PropertyStatus = 'active' | 'funded' | 'coming-soon';

export interface Property {
  id: string;
  name: string;
  location: string;
  district: string;
  type: PropertyType;
  status: PropertyStatus;
  totalValue: number;
  funded: number; // percentage 0-100
  minInvestment: number;
  annualYield: number;
  rentalIncome: number; // monthly AED
  availableTokens: number;
  totalTokens: number;
  tokenPrice: number;
  bedrooms?: number;
  bathrooms?: number;
  area: number; // sqft
  description: string;
  highlights: string[];
  amenities: string[];
  gradient: string; // tailwind gradient classes for placeholder
  image: string; // 4K high res luxury image

  completionYear?: number;
  developer: string;
}

export const properties: Property[] = [
  {
    id: 'marina-heights-tower',
    name: 'Marina Heights Tower',
    location: 'Dubai Marina',
    district: 'Dubai Marina',
    type: 'Residential',
    status: 'active',
    totalValue: 2800000,
    funded: 73,
    minInvestment: 500,
    annualYield: 8.2,
    rentalIncome: 19133,
    availableTokens: 756,
    totalTokens: 2800,
    tokenPrice: 1000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1450,
    description:
      'A premium 2-bedroom apartment in the heart of Dubai Marina with stunning canal views. Fully furnished and managed by a top-tier property management company, delivering consistent rental income. The tower features world-class amenities and is within walking distance of Dubai Marina Mall and the iconic JBR Beach.',
    highlights: [
      'Canal and sea views',
      'Fully furnished',
      'Professionally managed',
      '5-min walk to JBR Beach',
    ],
    amenities: [
      'Swimming Pool',
      'Gymnasium',
      '24/7 Security',
      'Concierge',
      'Parking',
      'Sauna',
    ],
    gradient: 'from-sky-400 via-blue-600 to-navy-700',
    image: '/assets/property-marina.png',
    developer: 'DAMAC Properties',
  },
  {
    id: 'palm-residence',
    name: 'Palm Residence',
    location: 'Palm Jumeirah',
    district: 'Palm Jumeirah',
    type: 'Residential',
    status: 'active',
    totalValue: 4500000,
    funded: 45,
    minInvestment: 500,
    annualYield: 9.1,
    rentalIncome: 34125,
    availableTokens: 2475,
    totalTokens: 4500,
    tokenPrice: 1000,
    bedrooms: 3,
    bathrooms: 3,
    area: 2800,
    description:
      'An exclusive 3-bedroom villa on the world-famous Palm Jumeirah. This ultra-luxury residence offers private beach access, panoramic sea views, and unparalleled prestige. Managed by a five-star hospitality group, the villa consistently achieves premium rental rates from high-net-worth tenants and short-term luxury guests.',
    highlights: [
      'Private beach access',
      'Panoramic sea views',
      'Five-star managed',
      'Luxury short-term rental',
    ],
    amenities: [
      'Private Pool',
      'Private Beach',
      'Smart Home System',
      'Home Theater',
      'Wine Cellar',
      'Chef\'s Kitchen',
    ],
    gradient: 'from-teal-400 via-cyan-600 to-blue-800',
    image: '/assets/property-palm.png',
    developer: 'Nakheel',
  },
  {
    id: 'downtown-loft',
    name: 'Downtown Loft',
    location: 'Burj Khalifa District',
    district: 'Downtown Dubai',
    type: 'Residential',
    status: 'active',
    totalValue: 1900000,
    funded: 91,
    minInvestment: 500,
    annualYield: 7.8,
    rentalIncome: 12350,
    availableTokens: 171,
    totalTokens: 1900,
    tokenPrice: 1000,
    bedrooms: 1,
    bathrooms: 1,
    area: 980,
    description:
      'A sophisticated 1-bedroom loft apartment steps from the Burj Khalifa and Dubai Fountain. This prestigious address commands premium rental rates year-round due to its unbeatable location. The property benefits from constant demand from business travelers and tourists visiting Downtown Dubai\'s iconic attractions.',
    highlights: [
      'Steps from Burj Khalifa',
      'Dubai Fountain views',
      'High occupancy rate',
      'Prime downtown address',
    ],
    amenities: [
      'Rooftop Pool',
      'Business Center',
      'Valet Parking',
      'Spa',
      'Fine Dining',
      'Concierge',
    ],
    gradient: 'from-gold-600 via-amber-600 to-orange-800',
    image: '/assets/property-downtown.png',
    developer: 'Emaar Properties',
  },
  {
    id: 'jvc-villa',
    name: 'JVC Garden Villa',
    location: 'Jumeirah Village Circle',
    district: 'JVC',
    type: 'Residential',
    status: 'active',
    totalValue: 1200000,
    funded: 28,
    minInvestment: 500,
    annualYield: 8.9,
    rentalIncome: 8900,
    availableTokens: 864,
    totalTokens: 1200,
    tokenPrice: 1000,
    bedrooms: 4,
    bathrooms: 4,
    area: 3200,
    description:
      'A spacious 4-bedroom garden villa in the family-friendly Jumeirah Village Circle community. This investment opportunity offers exceptional value with one of the highest yield-to-price ratios in Dubai. The villa features private garden space and is located near international schools, making it highly attractive to long-term family tenants.',
    highlights: [
      'High rental yield',
      'Family-friendly community',
      'Private garden',
      'Near top schools',
    ],
    amenities: [
      'Private Garden',
      'Community Pool',
      'Children\'s Play Area',
      'BBQ Area',
      'Covered Parking',
      'Storage',
    ],
    gradient: 'from-emerald-400 via-green-600 to-teal-800',
    image: '/assets/property-jvc.png',
    developer: 'Meraas',
  },
  {
    id: 'creek-views',
    name: 'Creek Views Residences',
    location: 'Dubai Creek Harbour',
    district: 'Dubai Creek Harbour',
    type: 'Off-Plan',
    status: 'active',
    totalValue: 3100000,
    funded: 62,
    minInvestment: 500,
    annualYield: 8.5,
    rentalIncome: 21958,
    availableTokens: 1178,
    totalTokens: 3100,
    tokenPrice: 1000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1680,
    description:
      'A stunning off-plan 2-bedroom apartment in the rapidly developing Dubai Creek Harbour, with breathtaking views of the Dubai Creek Tower. This early-stage investment offers significant capital appreciation potential in one of Dubai\'s most anticipated new districts, alongside strong projected rental yields upon completion.',
    highlights: [
      'Capital appreciation potential',
      'Creek Tower views',
      'Emerging prime district',
      'Developer payment plan',
    ],
    amenities: [
      'Infinity Pool',
      'Waterfront Promenade',
      'Retail Podium',
      'Community Park',
      'Metro Access',
      'Marina',
    ],
    gradient: 'from-purple-400 via-violet-600 to-indigo-800',
    image: '/assets/property-creek.png',
    completionYear: 2026,
    developer: 'Emaar Properties',
  },
  {
    id: 'difc-penthouse',
    name: 'DIFC Sky Penthouse',
    location: 'Dubai International Financial Centre',
    district: 'DIFC',
    type: 'Residential',
    status: 'active',
    totalValue: 6800000,
    funded: 15,
    minInvestment: 500,
    annualYield: 10.2,
    rentalIncome: 57800,
    availableTokens: 5780,
    totalTokens: 6800,
    tokenPrice: 1000,
    bedrooms: 4,
    bathrooms: 5,
    area: 5200,
    description:
      'An ultra-premium full-floor penthouse in the DIFC, Dubai\'s premier financial hub. This trophy asset features 360-degree city views, a private rooftop terrace, and bespoke finishes throughout. Catering to C-suite executives and ultra-high-net-worth individuals, this property commands the highest per-night rental rates in the city.',
    highlights: [
      '360° city views',
      'Private rooftop terrace',
      'Ultra-luxury specification',
      'UHNWI demand',
    ],
    amenities: [
      'Private Rooftop',
      'Smart Home AI',
      'Wine Room',
      'Home Cinema',
      'Staff Quarters',
      'Private Elevator',
    ],
    gradient: 'from-rose-400 via-pink-600 to-navy-800',
    image: '/assets/property-difc.png',
    developer: 'DIFC Authority',
  },
  {
    id: 'syl-residences',
    name: 'SYL Residences',
    location: 'Tukkuguda, Hyderabad',
    district: '4th City Corridor',
    type: 'Off-Plan',
    status: 'coming-soon',
    totalValue: 15000000,
    funded: 0,
    minInvestment: 4499,
    annualYield: 12.5,
    rentalIncome: 0,
    availableTokens: 3334,
    totalTokens: 3334,
    tokenPrice: 4499,
    area: 1000,
    description:
      'SYL Residences represents a premier "Gold Fish" investment opportunity in Hyderabad\'s rapidly growing 4th City corridor. Currently in the exclusive Pre-Investor Phase, it offers the lowest possible entry rate before public launch. This project follows the massive success of Agartha, which saw a +37% appreciation in just 18 months.',
    highlights: [
      'Lowest Pre-Investor rate',
      'First pick of premium units',
      'High appreciation potential',
      '4th City growth corridor',
    ],
    amenities: [
      'Clubhouse',
      'Landscaped Gardens',
      '24/7 Security',
      'Smart Home Ready',
      'Infinity Pool',
      'Jogging Track',
    ],
    gradient: 'from-gold-400 via-amber-500 to-yellow-600',
    image: '/assets/property-syl.png',
    completionYear: 2027,
    developer: 'The Gold Team',
  },
];

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

export function getRelatedProperties(id: string, limit = 3): Property[] {
  return properties.filter((p) => p.id !== id).slice(0, limit);
}

export function formatAED(value: number): string {
  if (value >= 1000000) {
    return `AED ${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `AED ${(value / 1000).toFixed(0)}K`;
  }
  return `AED ${value.toLocaleString('en-AE')}`;
}
