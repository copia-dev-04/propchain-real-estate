import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://propchain.ae';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/properties`, priority: 0.9, changeFrequency: 'daily' as const },
    { url: `${BASE_URL}/how-it-works`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/about`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/whitepaper`, priority: 0.6, changeFrequency: 'monthly' as const },
  ];

  return staticPages.map((page) => ({
    url: page.url,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
