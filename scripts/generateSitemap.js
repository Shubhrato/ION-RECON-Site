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

const DOMAIN = 'https://ionrecon.info';
const TODAY = new Date().toISOString().split('T')[0];

console.log('Generating fresh sitemap.xml for Ion Recon...');

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
  const loc = page.path ? `${DOMAIN}/${page.path}` : `${DOMAIN}/`;
  urls.push({ loc, lastmod: TODAY, changefreq: page.changefreq, priority: page.priority });
});

// 2. Product Pages from plantData.js
if (PLANT_DATA && Array.isArray(PLANT_DATA.products)) {
  PLANT_DATA.products.forEach(prod => {
    if (prod.id) {
      urls.push({
        loc: `${DOMAIN}/${prod.id}`,
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
        loc: `${DOMAIN}/blog/${slug}`,
        lastmod: TODAY,
        changefreq: 'weekly',
        priority: '0.85'
      });
    }
  });
}

// 4. Programmatic Location Pages from locationData.js
if (Array.isArray(LOCATION_STATES)) {
  const citySet = new Set();
  LOCATION_STATES.forEach(st => {
    if (Array.isArray(st.cities)) {
      st.cities.forEach(city => {
        const slug = city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        if (slug && !citySet.has(slug)) {
          citySet.add(slug);
          urls.push({
            loc: `${DOMAIN}/mineral-water-plant-manufacturer-in-${slug}`,
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
  console.log('Old sitemap.xml deleted.');
}

fs.writeFileSync(sitemapPath, xml, 'utf8');
console.log(`✅ Fresh sitemap.xml generated with ${urls.length} URLs!`);
