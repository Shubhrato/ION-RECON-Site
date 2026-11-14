import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { PLANT_DATA } from '../src/data/plantData.js';
import { BLOG_POSTS } from '../src/data/blogData.js';
import { LOCATION_STATES } from '../src/data/locationData.js';

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
const locRegex = /<loc>(https:\/\/[^<]+)<\/loc>/g;
const urls = [];
let match;
while ((match = locRegex.exec(sitemapContent)) !== null) {
  urls.push(match[1]);
}

console.log(`Found ${urls.length} URLs in sitemap.xml for static pre-rendering.`);

// Build fast lookup maps
const productMap = new Map();
if (PLANT_DATA && Array.isArray(PLANT_DATA.products)) {
  PLANT_DATA.products.forEach(p => productMap.set(p.id, p));
}

const blogMap = new Map();
if (Array.isArray(BLOG_POSTS)) {
  BLOG_POSTS.forEach(b => {
    const slug = b.slug || b.id;
    blogMap.set(slug, b);
  });
}

const stateMap = new Map();
if (Array.isArray(LOCATION_STATES)) {
  LOCATION_STATES.forEach(s => stateMap.set(s.id, s));
}

// Helper to determine meta & semantic content for any route
function getPageMeta(urlStr) {
  const url = new URL(urlStr);
  const cleanPath = url.pathname.replace(/^\/|\/$/g, '');

  if (!cleanPath) {
    return {
      title: 'Mineral Water Bottling Plant Manufacturer - Ion Recon',
      description: 'Ion Recon: Premier turnkey mineral water plant & bottling machine manufacturer in Ghaziabad. Custom automatic filling lines, commercial RO & CSD plants.',
      canonical: 'https://ionrecon.online/'
    };
  }

  // Canonical ALWAYS has trailing slash for directory index
  const canonical = `https://ionrecon.online/${cleanPath}/`;

  // 1. Explicit Core Pages
  if (cleanPath === 'blog') {
    return {
      title: 'Mineral Water Bottling Plant Knowledge Hub & Setup Blog | Ion Recon',
      description: 'Comprehensive engineering blueprints, packaged drinking water plant setup guides, BIS IS 14543 licensing requirements, and machinery cost guides by Ion Recon.',
      canonical,
      type: 'blog-index'
    };
  }

  if (cleanPath === 'about-us' || cleanPath === 'about') {
    return {
      title: 'About Ion Recon Industries | Mineral Water Plant Manufacturer Ghaziabad',
      description: 'Learn about Ion Recon Industries: Premier turnkey mineral water plant manufacturer & bottling machinery supplier in Sahibabad Industrial Area Site 4, Ghaziabad. 15+ years experience & 500+ projects installed.',
      canonical,
      type: 'about'
    };
  }

  if (cleanPath === 'contact-us' || cleanPath === 'contact') {
    return {
      title: 'Contact Ion Recon Industries | Factory Address & Sales Phone Ghaziabad',
      description: 'Contact Ion Recon Industries in Sahibabad Industrial Area Site 4, Ghaziabad. Phone: +91 98109 20792. Get free quotation, machinery catalog & factory location map directions.',
      canonical,
      type: 'contact'
    };
  }

  if (cleanPath === 'roi-calculator') {
    return {
      title: 'Mineral Water Plant Setup Cost & ROI Profit Calculator | Bottling Project Estimation - Ion Recon',
      description: 'Calculate mineral water plant setup cost, daily profit margins, payback period & power requirements for 30 BPM, 40 BPM, 60 BPM & 90 BPM bottling lines.',
      canonical,
      type: 'roi-calculator'
    };
  }

  if (cleanPath === 'faqs') {
    return {
      title: 'Mineral Water Plant Setup FAQs | BIS ISI IS 14543 License & Machinery Guide - Ion Recon',
      description: 'Frequently Asked Questions on packaged drinking water plant setup cost, BIS ISI certification, FSSAI licensing, floor area plan, power requirements & RO purification.',
      canonical,
      type: 'faqs'
    };
  }

  if (cleanPath === 'locations') {
    return {
      title: 'Mineral Water Plant Setup & Machinery Supplier Directory | Ion Recon PAN India',
      description: 'Find turnkey mineral water plant setup, commercial RO plant manufacturers & bottling line suppliers in Uttar Pradesh, Delhi NCR, Rajasthan, Bihar, MP & PAN India.',
      canonical,
      type: 'locations-index'
    };
  }

  if (cleanPath === 'privacy-policy') {
    return {
      title: 'Privacy Policy | Ion Recon Industries Ghaziabad',
      description: 'Official Privacy Policy of Ion Recon Industries. Learn how we handle lead information, quotation requests, cookies, and data security.',
      canonical,
      type: 'privacy'
    };
  }

  if (cleanPath === 'terms-and-conditions' || cleanPath === 'terms') {
    return {
      title: 'Terms & Conditions | Ion Recon Industries Ghaziabad',
      description: 'Official Terms & Conditions for machinery supply, installation, 12-month warranty, and sales policies by Ion Recon Industries.',
      canonical,
      type: 'terms'
    };
  }

  // 2. Product Routes
  const prod = productMap.get(cleanPath);
  if (prod) {
    return {
      title: prod.metaTitle || `${prod.title} Manufacturer & Price | Ion Recon Ghaziabad`,
      description: prod.seoContent || prod.shortDesc,
      canonical,
      productName: prod.title,
      product: prod,
      image: prod.image?.startsWith('http') ? prod.image : `https://ionrecon.online${prod.image || '/images/mineral_water_plant_40bpm.png'}`,
      type: 'product'
    };
  }

  // 3. Blog Article Routes
  if (cleanPath.startsWith('blog/')) {
    const slug = cleanPath.replace('blog/', '');
    const post = blogMap.get(slug);
    if (post) {
      return {
        title: `${post.title} | Ion Recon Knowledge Hub`,
        description: post.summary,
        canonical,
        blogPost: post,
        image: post.image?.startsWith('http') ? post.image : `https://ionrecon.online${post.image || '/images/mineral_water_plant_40bpm.png'}`,
        type: 'blog-post'
      };
    }
  }

  // 4. Location Routes (State Hubs or Metro Cities)
  if (cleanPath.startsWith('mineral-water-plant-manufacturer-in-')) {
    const rawSlug = cleanPath.replace('mineral-water-plant-manufacturer-in-', '');
    const stateObj = stateMap.get(rawSlug);

    const locName = stateObj
      ? stateObj.name
      : rawSlug
          .split('-')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');

    return {
      title: `Turnkey Mineral Water Plant Manufacturer in ${locName} | Packaged Water Setup - Ion Recon`,
      description: `Ion Recon: Turnkey packaged drinking water project & commercial RO plant manufacturer in ${locName}. Automatic bottling line setup & direct factory price quote.`,
      canonical,
      locName,
      stateObj,
      type: 'location'
    };
  }

  // Default fallback
  const humanized = cleanPath
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${humanized} | Ion Recon Industries Ghaziabad`,
    description: `Ion Recon Ghaziabad - Manufacturer of ${humanized}, Mineral Water Plants & Bottling Machinery. Get free consultation and direct factory price quote.`,
    canonical,
    type: 'default'
  };
}

// Generate tailored semantic HTML body for <noscript>
function generateNoscriptBody(meta, cleanPath) {
  const navHtml = `      <header>
        <nav aria-label="Main Navigation">
          <a href="/">Ion Recon Home</a> | 
          <a href="/40-bpm-mineral-water-plant/">40 BPM Mineral Water Plant</a> | 
          <a href="/bottle-filling-machine/">RFC Monoblock Filling Machine</a> | 
          <a href="/ss-ro-plant/">Industrial SS RO Plant</a> | 
          <a href="/jar-filling-machine/">20L Jar Plant</a> | 
          <a href="/pet-blowing-machine/">PET Blow Molding Machine</a> | 
          <a href="/locations/">PAN India Setup Locations</a> | 
          <a href="/blog/">Water Plant Setup Blog</a> | 
          <a href="/roi-calculator/">Capacity &amp; Profit ROI Calculator</a>
        </nav>
      </header>`;

  const footerHtml = `      <footer>
        <nav aria-label="Trust and Legal Navigation">
          <p>
            <a href="/about-us/">About Ion Recon</a> | 
            <a href="/contact-us/">Contact Us</a> | 
            <a href="/privacy-policy/">Privacy Policy</a> | 
            <a href="/terms-and-conditions/">Terms &amp; Conditions</a> | 
            <a href="/faqs/">Frequently Asked Questions</a>
          </p>
          <p>&copy; 2026 Ion Recon Industries. All rights reserved. GST: 09AFSPV0532M1ZQ. Factory: Sahibabad Site 4, Ghaziabad.</p>
        </nav>
      </footer>`;

  let mainHtml = '';

  if (meta.type === 'product' && meta.product) {
    const p = meta.product;
    mainHtml = `      <main>
        <article>
          <nav aria-label="Breadcrumb">
            <p><a href="/">Home</a> &raquo; <a href="/#products">Machinery Lines</a> &raquo; <strong>${p.title}</strong></p>
          </nav>
          <h1>${p.title} Manufacturer &amp; Setup Cost - Ion Recon</h1>
          <p>
            ${p.seoContent || p.shortDesc}
          </p>

          <figure>
            <img src="${meta.image}" alt="${p.title} Turnkey Mineral Water Bottling Machinery" width="800" height="450" loading="lazy" />
            <figcaption>${p.title} - Food Grade SS 304/316 Manufacturing by Ion Recon Industries, Ghaziabad</figcaption>
          </figure>

          <h2>Technical Specifications &amp; Operational Parameters</h2>
          <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; max-width: 750px; margin: 16px 0;">
            <tbody>
              <tr><th align="left">Rated Production Capacity</th><td>${p.capacityRange || 'Custom Capacity'}</td></tr>
              <tr><th align="left">Automation Grade</th><td>${p.automation || 'Fully Automatic PLC Controlled'}</td></tr>
              <tr><th align="left">Material of Construction</th><td>${p.material || 'SS 304 Food Grade (SS 316 Contact Parts)'}</td></tr>
              <tr><th align="left">Power Requirement</th><td>${p.powerConsumption || '415V 3-Phase 50Hz'}</td></tr>
              ${p.techSpecsTable?.fillingAccuracy ? `<tr><th align="left">Filling Accuracy</th><td>${p.techSpecsTable.fillingAccuracy}</td></tr>` : ''}
              ${p.techSpecsTable?.bottleSizes ? `<tr><th align="left">Supported Bottle Sizes</th><td>${p.techSpecsTable.bottleSizes}</td></tr>` : ''}
              ${p.techSpecsTable?.warranty ? `<tr><th align="left">Standard Warranty</th><td>${p.techSpecsTable.warranty}</td></tr>` : ''}
            </tbody>
          </table>

          <h2>Key Engineering Features &amp; Machinery Highlights</h2>
          <ul>
            ${Array.isArray(p.keyFeatures) ? p.keyFeatures.map(f => `<li><strong>${f}</strong></li>`).join('\n            ') : `<li>Heavy-duty SS 304 stainless steel base and framework.</li><li>Advanced PLC with intuitive touch-screen HMI control.</li><li>BIS IS 14543 and FSSAI compliant design for packaged drinking water.</li>`}
          </ul>

          <h2>Factory Direct Supply &amp; Turnkey Commissioning</h2>
          <p>
            Ion Recon manufactures, tests, and commissions all machinery at our Sahibabad Industrial Area Site 4 facility in Ghaziabad. We provide complete factory floor layout planning, piping schematics, on-site installation, and operator training across India.
          </p>

          <h2>Direct Quotation &amp; Technical Consultation</h2>
          <p>
            For factory pricing, engineering drawings, and customized machinery quotes:<br />
            <strong>Phone / WhatsApp:</strong> <a href="tel:+919810920792">+91 98109 20792</a> / <a href="tel:+918447509269">+91 84475 09269</a><br />
            <strong>Email:</strong> <a href="mailto:info@ionrecon.online">info@ionrecon.online</a><br />
            <strong>Factory Address:</strong> 57/1/9, Sahibabad Industrial Area Site 4, Ghaziabad 201010, Uttar Pradesh, India.
          </p>
        </article>
      </main>`;
  } else if (meta.type === 'blog-post' && meta.blogPost) {
    const post = meta.blogPost;
    mainHtml = `      <main>
        <article>
          <nav aria-label="Breadcrumb">
            <p><a href="/">Home</a> &raquo; <a href="/blog/">Knowledge Hub</a> &raquo; <strong>${post.title}</strong></p>
          </nav>
          <h1>${post.title}</h1>
          <p><em>Published: ${post.date || 'September 2026'} | By: ${post.author || 'Ion Recon Engineering Team'} | ${post.readTime || '8 min read'}</em></p>
          <p><strong>Summary:</strong> ${post.summary}</p>

          <figure>
            <img src="${meta.image}" alt="${post.title}" width="800" height="420" loading="lazy" />
            <figcaption>${post.title} - Technical Guide by Ion Recon Industries</figcaption>
          </figure>

          ${Array.isArray(post.sections) ? post.sections.map(s => `
          <h2>${s.heading}</h2>
          <p>${s.content}</p>`).join('\n') : ''}

          <h2>Consult Our Engineering Specialists</h2>
          <p>
            Planning a new mineral water plant or upgrading existing bottling capacity? Contact Ion Recon Industries for expert consultation, BIS layout design, and turnkey machinery pricing.<br />
            <strong>Phone:</strong> <a href="tel:+919810920792">+91 98109 20792</a> | <strong>Email:</strong> <a href="mailto:info@ionrecon.online">info@ionrecon.online</a>
          </p>
        </article>
      </main>`;
  } else if (meta.type === 'location') {
    const locName = meta.locName;
    mainHtml = `      <main>
        <article>
          <nav aria-label="Breadcrumb">
            <p><a href="/">Home</a> &raquo; <a href="/locations/">PAN India Setup</a> &raquo; <strong>${locName}</strong></p>
          </nav>
          <h1>Turnkey Mineral Water Bottling Plant Manufacturer in ${locName}</h1>
          <p>
            Looking to establish a profitable packaged drinking water business in <strong>${locName}</strong>? Ion Recon Industries delivers complete turnkey mineral water plants, automatic 3-in-1 RFC monoblock bottle filling machines, commercial SS RO water treatment systems, and PET blow molders with doorstep installation in ${locName}.
          </p>

          <figure>
            <img src="/images/mineral_water_plant_40bpm.png" alt="Turnkey Mineral Water Plant Machinery in ${locName}" width="800" height="420" loading="lazy" />
            <figcaption>Ion Recon Turnkey 40 BPM Bottling Plant Commissioning in ${locName}</figcaption>
          </figure>

          <h2>Complete Machinery &amp; Turnkey Solutions for ${locName}</h2>
          <p>
            Ground water chemistry across ${locName} varies with different Total Dissolved Solids (TDS), hardness, and mineral content. Ion Recon engineers custom multi-stage RO purification plants tailored specifically to local raw water sources, ensuring full compliance with BIS IS 14543 standards.
          </p>

          <h3>Available Production Lines &amp; Capacities:</h3>
          <ul>
            <li><a href="/40-bpm-mineral-water-plant/"><strong>40 BPM Turnkey Plant (2,400 Bottles/Hr):</strong></a> India's most popular commercial water bottling line.</li>
            <li><a href="/60-bpm-mineral-water-plant/"><strong>60 BPM High-Speed Line (3,600 Bottles/Hr):</strong></a> Designed for growing commercial distribution networks.</li>
            <li><a href="/bottle-filling-machine/"><strong>3-in-1 RFC Monoblock Machine:</strong></a> Automatic rinsing, filling, and capping for PET bottles.</li>
            <li><a href="/ss-ro-plant/"><strong>Commercial Stainless Steel RO Plants:</strong></a> High recovery filtration from 1,000 LPH to 20,000 LPH.</li>
            <li><a href="/jar-filling-machine/"><strong>20 Litre Water Jar Lines:</strong></a> Automatic washing, filling, and capping for commercial jar supply.</li>
          </ul>

          <h2>BIS IS 14543 Licensing &amp; Laboratory Assistance in ${locName}</h2>
          <p>
            Starting a packaged drinking water plant requires mandatory Bureau of Indian Standards (BIS ISI) certification and FSSAI approval. Ion Recon provides turnkey project consultancy in ${locName}, including factory floor drawings, cleanroom partitions, stainless steel piping, and in-house chemical &amp; microbiological testing laboratory equipment.
          </p>

          <h2>Request Free Project Estimation &amp; Quotation</h2>
          <p>
            Connect directly with Ion Recon factory engineers for site inspection, capacity sizing, and factory-direct pricing for your project in ${locName}:<br />
            <strong>Direct Sales:</strong> <a href="tel:+919810920792">+91 98109 20792</a> / <a href="tel:+918447509269">+91 84475 09269</a><br />
            <strong>Email:</strong> <a href="mailto:info@ionrecon.online">info@ionrecon.online</a><br />
            <strong>Headquarters &amp; Factory:</strong> 57/1/9, Sahibabad Industrial Area Site 4, Ghaziabad 201010, Uttar Pradesh.
          </p>
        </article>
      </main>`;
  } else if (meta.type === 'blog-index') {
    mainHtml = `      <main>
        <article>
          <nav aria-label="Breadcrumb">
            <p><a href="/">Home</a> &raquo; <strong>Water Plant Setup Knowledge Hub &amp; Blog</strong></p>
          </nav>
          <h1>Mineral Water Bottling Plant Knowledge Hub &amp; Setup Blog - Ion Recon</h1>
          <p>
            Welcome to the Ion Recon technical knowledge center. Explore in-depth engineering blueprints, capital cost estimations, civil floor plan designs, BIS IS 14543 regulatory compliance guides, and machinery maintenance tutorials authored by our experienced plant engineers.
          </p>

          <h2>Featured Technical Blueprints &amp; Project Guides</h2>
          <ul>
            ${Array.isArray(BLOG_POSTS) ? BLOG_POSTS.slice(0, 15).map(b => `
            <li>
              <a href="/blog/${b.slug || b.id}/"><strong>${b.title}</strong></a>
              <p>${b.summary}</p>
            </li>`).join('') : ''}
          </ul>

          <h2>Have Specific Engineering Questions?</h2>
          <p>
            Our project engineering division in Sahibabad, Ghaziabad is ready to help you plan your packaged drinking water venture.<br />
            <strong>Contact:</strong> <a href="tel:+919810920792">+91 98109 20792</a> | <a href="mailto:info@ionrecon.online">info@ionrecon.online</a>
          </p>
        </article>
      </main>`;
  } else {
    // Other pages: keep clean, semantic fallback
    mainHtml = `      <main>
        <article>
          <nav aria-label="Breadcrumb">
            <p><a href="/">Home</a> &raquo; <strong>${meta.title.split('|')[0].trim()}</strong></p>
          </nav>
          <h1>${meta.title.split('|')[0].trim()}</h1>
          <p>${meta.description}</p>
          
          <h2>Turnkey Packaged Drinking Water Solutions by Ion Recon</h2>
          <p>
            Ion Recon Industries is a premier manufacturer and supplier of mineral water bottling machinery, commercial reverse osmosis systems, and automatic packaging lines based in Sahibabad Industrial Area Site 4, Ghaziabad, Uttar Pradesh.
          </p>

          <h2>Factory Contact Information</h2>
          <p>
            <strong>Factory Address:</strong> 57/1/9, Sahibabad Industrial Area Site 4, Ghaziabad 201010, Uttar Pradesh, India.<br />
            <strong>Phone:</strong> <a href="tel:+919810920792">+91 98109 20792</a> | <strong>Email:</strong> <a href="mailto:info@ionrecon.online">info@ionrecon.online</a>
          </p>
        </article>
      </main>`;
  }

  return `    <noscript>
      <!-- Pre-rendered Static HTML Fallback for SEO Crawlers & Non-JS Bots -->
${navHtml}
${mainHtml}
${footerHtml}
    </noscript>`;
}

let count = 0;

urls.forEach((fullUrl) => {
  const url = new URL(fullUrl);
  const cleanPath = url.pathname.replace(/^\/|\/$/g, '');

  if (!cleanPath) return; // Skip homepage, dist/index.html is already homepage

  const meta = getPageMeta(fullUrl);

  // Start with template
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

  // OG Title & OG Description & OG URL & OG Image replacement
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
  if (meta.image) {
    pageHtml = pageHtml.replace(
      /<meta property="og:image" content=".*?" \/>/s,
      `<meta property="og:image" content="${meta.image}" />`
    );
  }

  // Twitter Card Meta Replacement
  pageHtml = pageHtml.replace(
    /<meta property="twitter:title" content=".*?" \/>/s,
    `<meta property="twitter:title" content="${meta.title}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta property="twitter:description" content=".*?" \/>/s,
    `<meta property="twitter:description" content="${meta.description}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta property="twitter:url" content=".*?" \/>/s,
    `<meta property="twitter:url" content="${meta.canonical}" />`
  );
  if (meta.image) {
    pageHtml = pageHtml.replace(
      /<meta property="twitter:image" content=".*?" \/>/s,
      `<meta property="twitter:image" content="${meta.image}" />`
    );
  }

  // Canonical link tag replacement
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

  // Build BreadcrumbList Schema JSON-LD
  let breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://ionrecon.online/"
    }
  ];

  if (meta.type === 'product' && meta.product) {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Machinery Lines",
      "item": "https://ionrecon.online/#products"
    });
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 3,
      "name": meta.product.title,
      "item": meta.canonical
    });
  } else if (meta.type === 'blog-post' && meta.blogPost) {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Knowledge Hub",
      "item": "https://ionrecon.online/blog/"
    });
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 3,
      "name": meta.blogPost.title,
      "item": meta.canonical
    });
  } else if (meta.type === 'location') {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Locations Directory",
      "item": "https://ionrecon.online/locations/"
    });
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 3,
      "name": meta.locName,
      "item": meta.canonical
    });
  } else {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 2,
      "name": meta.title.split('|')[0].trim(),
      "item": meta.canonical
    });
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  };

  const breadcrumbScript = `\n  <script type="application/ld+json">\n  ${JSON.stringify(breadcrumbSchema, null, 2)}\n  </script>`;
  pageHtml = pageHtml.replace('</head>', `${breadcrumbScript}\n  </head>`);

  // Inject Product Schema JSON-LD if product is present
  if (meta.type === 'product' && meta.product) {
    const prod = meta.product;
    const productSchema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": prod.title,
      "image": meta.image || "https://ionrecon.online/images/mineral_water_plant_40bpm.png",
      "description": meta.description,
      "sku": `ION-${cleanPath.toUpperCase()}`,
      "mpn": `ION-${cleanPath.toUpperCase()}-2026`,
      "brand": {
        "@type": "Brand",
        "name": "Ion Recon"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "Ion Recon Industries",
        "url": "https://ionrecon.online/"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "180",
        "bestRating": "5",
        "worstRating": "1"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": cleanPath === '40-bpm-mineral-water-plant' ? "3200000.00" :
               cleanPath === '60-bpm-mineral-water-plant' ? "5800000.00" :
               cleanPath === 'bottle-filling-machine' ? "1250000.00" :
               cleanPath === 'ss-ro-plant' ? "450000.00" :
               cleanPath === 'jar-filling-machine' ? "650000.00" :
               cleanPath === 'bopp-labeling-machine' ? "850000.00" :
               cleanPath === 'csd-project' ? "4200000.00" : "2500000.00",
        "priceValidUntil": "2027-12-31",
        "url": meta.canonical,
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Ion Recon Industries"
        },
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "applicableCountry": "IN",
          "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted"
        },
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "0.00",
            "currency": "INR"
          },
          "shippingDestination": {
            "@type": "DefinedRegion",
            "addressCountry": "IN"
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": 3,
              "maxValue": 7,
              "unitCode": "DAY"
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "minValue": 5,
              "maxValue": 15,
              "unitCode": "DAY"
            }
          }
        }
      }
    };

    const schemaScript = `\n  <script type="application/ld+json">\n  ${JSON.stringify(productSchema, null, 2)}\n  </script>`;
    pageHtml = pageHtml.replace('</head>', `${schemaScript}\n  </head>`);
  }

  // Replace <noscript> with tailored semantic HTML body (Fixes 0 <img> and 100% duplicate raw HTML!)
  const customNoscript = generateNoscriptBody(meta, cleanPath);
  pageHtml = pageHtml.replace(/<noscript>[\s\S]*?<\/noscript>/, customNoscript);

  // Write to dist/<cleanPath>/index.html
  const targetDir = path.join(distDir, cleanPath);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), pageHtml, 'utf8');

  count++;
});

console.log(`Pre-rendered static HTML with native <img> & unique content generated for ${count} URLs in dist/!`);
