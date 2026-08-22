import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const distDir = path.join(rootDir, 'dist');
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('Error: dist/index.html does not exist. Run vite build first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

// Extract all <loc> URLs from sitemap.xml
const locRegex = /<loc>(https:\/\/ionrecon\.info\/[^<]*)<\/loc>/g;
const urls = [];
let match;
while ((match = locRegex.exec(sitemapContent)) !== null) {
  urls.push(match[1]);
}

console.log(`Found ${urls.length} URLs in sitemap.xml for static pre-rendering.`);

// Helper to generate dynamic title & description based on route
function getPageMeta(urlStr) {
  const url = new URL(urlStr);
  const cleanPath = url.pathname.replace(/^\/|\/$/g, '');

  if (!cleanPath) {
    return {
      title: 'Ion Recon | No.1 Mineral Water Plant Manufacturer & Turnkey Solutions',
      description: 'Ion Recon Ghaziabad: Leading Turnkey Mineral Water Plant Manufacturer in India. Setup 40 BPM 30 BPM 60 BPM packaged drinking water plant & SS RO machinery at best price.',
      canonical: 'https://ionrecon.info/'
    };
  }

  const canonical = `https://ionrecon.info/${cleanPath}`;

  // Product routes
  if (cleanPath.includes('40-bpm') || cleanPath.includes('60-bpm')) {
    return {
      title: 'Mineral Water Bottling Plant Manufacturer - Ion Recon',
      description: 'Custom turnkey mineral water plant manufacturer in Ghaziabad. High-efficiency automatic bottling lines from 2,000 BPH to 20,000 BPH. Request a free project cost estimation & factory quote.',
      canonical
    };
  }
  if (cleanPath.includes('bottle-filling')) {
    return {
      title: 'RFC Monoblock Bottle Filling Machine Manufacturer - Ion Recon',
      description: '3-in-1 RFC Monoblock Bottle Filling Machine manufacturer. Precision zero-drip PET bottle filling lines from 30 BPM to 240 BPM (1,800 to 14,400 BPH). Request technical datasheet & free price quote.',
      canonical
    };
  }
  if (cleanPath.includes('ss-ro-plant')) {
    return {
      title: 'Industrial SS RO Water Treatment Plant Manufacturer - Ion Recon',
      description: 'Commercial & Industrial SS 304/316 RO water treatment plant manufacturer. High capacity reverse osmosis purification from 500 LPH to 50,000 LPH with Grundfos pumps. Request price quote.',
      canonical
    };
  }
  if (cleanPath.includes('csd')) {
    return {
      title: 'Turnkey CSD Carbonated Soft Drink Plant Manufacturer - Ion Recon',
      description: 'Automatic CSD filling machine manufacturer for carbonated beverage processing plant setup & high-capacity CSD bottling line from 30 BPM to 120 BPM. Request project cost estimate.',
      canonical
    };
  }
  if (cleanPath.includes('stp') || cleanPath.includes('effluent') || cleanPath.includes('sewage')) {
    return {
      title: 'Industrial STP Plant Setup Cost & Effluent Treatment Manufacturer - Ion Recon',
      description: 'Check industrial STP plant setup cost & MBBR STP plant design. Leading effluent and sewage treatment plant manufacturer for zero liquid discharge. Request a free quote.',
      canonical
    };
  }
  if (cleanPath.includes('juice') || cleanPath.includes('fruit')) {
    return {
      title: 'RTS Fruit Juice Line & Pasteurizer Manufacturer - Ion Recon',
      description: 'Turnkey fruit pulp processing machinery & juice bottling plant manufacturer. Plate heat exchanger pasteurizer and 85°C hot filling monoblock lines. Request price quote.',
      canonical
    };
  }
  if (cleanPath.includes('pet-blowing')) {
    return {
      title: 'PET Bottle Stretch Blow Molding Machine Manufacturer - Ion Recon',
      description: 'Automatic & semi-automatic PET bottle stretch blow molding machine manufacturer. Production capacity from 1,200 BPH to 9,000 BPH with energy-saving infrared oven. Request a quote.',
      canonical
    };
  }
  if (cleanPath.includes('jar-filling')) {
    return {
      title: 'Automatic 20 Litre Water Jar Filling Machine Manufacturer - Ion Recon',
      description: 'Automatic 20 Litre water jar decapper, washer, filler, and capper monoblock machine manufacturer. High output from 100 to 600 jars per hour. Request free price quote.',
      canonical
    };
  }

  // Location routes
  if (cleanPath.startsWith('mineral-water-plant-manufacturer-in-')) {
    const locName = cleanPath
      .replace('mineral-water-plant-manufacturer-in-', '')
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    
    return {
      title: `Turnkey Mineral Water Plant Manufacturer in ${locName} | Ion Recon`,
      description: `Ion Recon: Turnkey packaged drinking water project & commercial RO plant manufacturer in ${locName}. Automatic bottling line setup & direct factory price quote.`,
      canonical
    };
  }

  // Blog routes
  if (cleanPath.startsWith('blog/')) {
    const blogTitle = cleanPath
      .replace('blog/', '')
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    if (cleanPath.includes('csd')) {
      return {
        title: 'Carbonated Beverage Processing Plant & CSD Bottling Line Guide | Ion Recon',
        description: 'Learn automatic CSD filling machine manufacturer specs, high-capacity CSD bottling line setup cost & carbonated beverage processing plant layout.',
        canonical
      };
    }
    if (cleanPath.includes('stp')) {
      return {
        title: 'Industrial STP Plant Setup Cost & MBBR STP Plant Design Guide | Ion Recon',
        description: 'Complete guide on industrial STP plant setup cost, effluent and sewage treatment plant manufacturer comparison & MBBR STP plant design calculations.',
        canonical
      };
    }

    return {
      title: `${blogTitle} | Ion Recon Setup Guide`,
      description: `Detailed guide and engineering blueprint on ${blogTitle}. Learn machinery selection, BIS ISI licensing, floor plan layout & profit calculations.`,
      canonical
    };
  }

  // Default fallback
  const humanized = cleanPath
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${humanized} | Ion Recon Mineral Water Plant Manufacturer`,
    description: `Ion Recon Ghaziabad - Manufacturer of ${humanized}, Mineral Water Plants & Bottling Machinery. Get free consultation and direct factory price quote.`,
    canonical
  };
}

let count = 0;

urls.forEach((fullUrl) => {
  const url = new URL(fullUrl);
  const cleanPath = url.pathname.replace(/^\/|\/$/g, '');

  if (!cleanPath) return; // Skip homepage, dist/index.html is already homepage

  const meta = getPageMeta(fullUrl);

  // Replace Title & Description & Canonical Tags in HTML Template
  let pageHtml = template;

  // Title tag replacement
  pageHtml = pageHtml.replace(
    /<title>.*?<\/title>/s,
    `<title>${meta.title}</title>`
  );

  // Meta title tag replacement
  pageHtml = pageHtml.replace(
    /<meta name="title" content=".*?" \/>/s,
    `<meta name="title" content="${meta.title}" />`
  );

  // Meta description tag replacement
  pageHtml = pageHtml.replace(
    /<meta name="description" content=".*?" \/>/s,
    `<meta name="description" content="${meta.description}" />`
  );

  // OG Title & OG URL replacement
  pageHtml = pageHtml.replace(
    /<meta property="og:title" content=".*?" \/>/s,
    `<meta property="og:title" content="${meta.title}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta property="og:description" content=".*?" \/>/s,
    `<meta property="og:description" content="${meta.description}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta property="og:url" content=".*?" \/>/s,
    `<meta property="og:url" content="${meta.canonical}" />`
  );

  // Inject or replace canonical link tag before </head>
  if (pageHtml.includes('<link rel="canonical"')) {
    pageHtml = pageHtml.replace(
      /<link rel="canonical" href=".*?" \/>/s,
      `<link rel="canonical" href="${meta.canonical}" />`
    );
  } else {
    pageHtml = pageHtml.replace(
      '</head>',
      `  <link rel="canonical" href="${meta.canonical}" />\n  </head>`
    );
  }

  // Create directory structure in dist/<cleanPath>/index.html
  const targetDir = path.join(distDir, cleanPath);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), pageHtml, 'utf8');

  count++;
});

console.log(`✅ Pre-rendered static HTML entrypoints generated for ${count} URLs in dist/!`);
