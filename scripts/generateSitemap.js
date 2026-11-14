import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { PLANT_DATA } from '../src/data/plantData.js';
import { BLOG_POSTS } from '../src/data/blogData.js';
import { LOCATION_STATES } from '../src/data/locationData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');

const DOMAIN = 'https://ionrecon.online';
const TODAY = new Date().toISOString().split('T')[0];

console.log('Generating fresh, standardized sitemap.xml for Ion Recon (with trailing slashes)...');

const urls = [];

// 1. Core / Main Static Pages
const staticPages = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: 'about-us', priority: '0.9', changefreq: 'monthly' },
  { path: 'contact-us', priority: '0.9', changefreq: 'monthly' },
  { path: 'privacy-policy', priority: '0.5', changefreq: 'yearly' },
  { path: 'terms-and-conditions', priority: '0.5', changefreq: 'yearly' },
  { path: 'roi-calculator', priority: '0.9', changefreq: 'weekly' },
  { path: 'faqs', priority: '0.8', changefreq: 'weekly' },
  { path: 'locations', priority: '0.9', changefreq: 'weekly' },
  { path: 'blog', priority: '0.9', changefreq: 'daily' }
];

staticPages.forEach(page => {
  const loc = page.path ? `${DOMAIN}/${page.path}/` : `${DOMAIN}/`;
  urls.push({ loc, lastmod: TODAY, changefreq: page.changefreq, priority: page.priority });
});

// 2. Product Pages from plantData.js
if (PLANT_DATA && Array.isArray(PLANT_DATA.products)) {
  PLANT_DATA.products.forEach(prod => {
    if (prod.id) {
      urls.push({
        loc: `${DOMAIN}/${prod.id}/`,
        lastmod: TODAY,
        changefreq: 'weekly',
        priority: '0.9'
      });
    }
  });
}

// 3. Blog Articles from blogData.js
if (Array.isArray(BLOG_POSTS)) {
  BLOG_POSTS.forEach(post => {
    const slug = post.slug || post.id;
    if (slug) {
      urls.push({
        loc: `${DOMAIN}/blog/${slug}/`,
        lastmod: TODAY,
        changefreq: 'weekly',
        priority: '0.85'
      });
    }
  });
}

// 4. Curated High-Value Regional & State Hubs (Consolidating thin doorway pages)
// As recommended by SEO Audit to eliminate Doorway Page risks:
const PRIORITY_METRO_CITIES = new Set([
  'delhi', 'new-delhi', 'noida', 'greater-noida', 'gurugram', 'faridabad', 'ghaziabad',
  'lucknow', 'kanpur', 'agra', 'varanasi', 'prayagraj', 'meerut',
  'jaipur', 'jodhpur', 'kota',
  'patna', 'gaya', 'muzaffarpur',
  'bhopal', 'indore', 'gwalior',
  'ahmedabad', 'surat', 'vadodara', 'rajkot',
  'mumbai', 'pune', 'nagpur', 'nashik',
  'kolkata', 'howrah', 'siliguri',
  'bhubaneswar', 'cuttack',
  'raipur', 'bhilai',
  'ludhiana', 'amritsar', 'jalandhar',
  'dehradun', 'haridwar',
  'guwahati'
]);

if (Array.isArray(LOCATION_STATES)) {
  // A. Add All 16 State / Regional Hub Pages (High Value Hubs)
  LOCATION_STATES.forEach(st => {
    if (st.id) {
      urls.push({
        loc: `${DOMAIN}/mineral-water-plant-manufacturer-in-${st.id}/`,
        lastmod: TODAY,
        changefreq: 'weekly',
        priority: '0.9'
      });
    }
  });

  // B. Add High-Intent Metro & Tier-1 Industrial Cities Only
  const addedCities = new Set();
  LOCATION_STATES.forEach(st => {
    if (Array.isArray(st.cities)) {
      st.cities.forEach(city => {
        const slug = city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        if (PRIORITY_METRO_CITIES.has(slug) && !addedCities.has(slug)) {
          addedCities.add(slug);
          urls.push({
            loc: `${DOMAIN}/mineral-water-plant-manufacturer-in-${slug}/`,
            lastmod: TODAY,
            changefreq: 'weekly',
            priority: '0.85'
          });
        }
      });
    }
  });
}

// Construct XML Output
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

urls.forEach(item => {
  xml += `  <url>\n`;
  xml += `    <loc>${item.loc}</loc>\n`;
  xml += `    <lastmod>${item.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
  xml += `    <priority>${item.priority}</priority>\n`;
  xml += `  </url>\n`;
});

xml += `</urlset>\n`;

// Delete old sitemap if exists and write fresh
if (fs.existsSync(sitemapPath)) {
  fs.unlinkSync(sitemapPath);
}

fs.writeFileSync(sitemapPath, xml, 'utf8');
console.log(`Fresh sitemap.xml generated with ${urls.length} high-authority URLs (all trailing slashes)!`);
