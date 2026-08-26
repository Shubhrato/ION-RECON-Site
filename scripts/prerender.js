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

  // Product routes - Front-loaded non-branded target keywords + Brand Name
  if (cleanPath === 'bopp-labeling-machine') {
    return {
      title: 'BOPP Hot-Melt Bottle Labeling Machine Manufacturer & Price | Roll-Fed PET Bottle Labeler - Ion Recon',
      description: 'Automatic BOPP hot-melt bottle labeling machine manufacturer in Ghaziabad. High speed roll-fed PET bottle wraparound labelers (50 BPM to 250 BPM) with hot melt glue tank & optical eye sensor. Request free price quote.',
      canonical,
      productName: 'BOPP Hot-Melt Bottle Labeling Machine',
      category: 'Packaging Machinery'
    };
  }
  if (cleanPath === '40-bpm-mineral-water-plant') {
    return {
      title: '40 BPM Mineral Water Bottling Plant Manufacturer & Setup Cost | 2400 BPH Packaged Drinking Water Line - Ion Recon',
      description: 'Custom 40 BPM (2,400 BPH) turnkey mineral water plant manufacturer in Ghaziabad. Complete automatic bottling line setup cost, 2000 LPH SS RO plant & BIS IS 14543 lab setup. Request free price quote.',
      canonical,
      productName: '40 BPM Packaged Drinking Water Plant',
      category: 'Mineral Water Plants'
    };
  }
  if (cleanPath === '60-bpm-mineral-water-plant') {
    return {
      title: '60 BPM Mineral Water Bottling Plant Manufacturer & Setup Cost | 3600 BPH High Speed Water Line - Ion Recon',
      description: 'High-speed 60 BPM (3,600 BPH) automatic mineral water bottling plant manufacturer. Servo-driven 12-12-5 monoblock filling line, 2000 LPH RO plant & PET blow molding line. Request free price quote.',
      canonical,
      productName: '60 BPM Mineral Water Bottling Plant',
      category: 'Mineral Water Plants'
    };
  }
  if (cleanPath === 'bottle-filling-machine') {
    return {
      title: 'RFC Monoblock Bottle Filling Machine Manufacturer & Price | 3 in 1 Automatic PET Bottle Filler - Ion Recon',
      description: '3-in-1 RFC Monoblock Bottle Filling Machine manufacturer. Precision zero-drip PET bottle rinser filler capper lines from 30 BPM to 240 BPM (1,800 to 14,400 BPH). Get technical datasheet & factory price quote.',
      canonical,
      productName: 'RFC Monoblock Bottle Filling Machine',
      category: 'Filling Machinery'
    };
  }
  if (cleanPath === 'ss-ro-plant') {
    return {
      title: 'Industrial SS RO Water Treatment Plant Manufacturer & Price | Commercial Reverse Osmosis Plant - Ion Recon',
      description: 'Commercial & Industrial SS 304/316 RO water treatment plant manufacturer. High capacity reverse osmosis purification from 500 LPH to 50,000 LPH with Grundfos pumps & ozonator. Request free price quote.',
      canonical,
      productName: 'Industrial SS RO Water Treatment Plant',
      category: 'Water Treatment Plants'
    };
  }
  if (cleanPath === 'shrink-wrapping-machine') {
    return {
      title: 'Automatic Web Sealer Shrink Wrapping Machine Manufacturer & Price | Bottle Bundling Heating Tunnel - Ion Recon',
      description: 'Automatic web sealer shrink wrapping machine & heating tunnel manufacturer. Heavy-duty trayless matrix bottle pack bundling line (10-25 packs/min) with PID digital thermal control. Request free price quote.',
      canonical,
      productName: 'Automatic Shrink Wrapping Heating Tunnel',
      category: 'Packaging Machinery'
    };
  }
  if (cleanPath === 'water-pouch-packing-machine') {
    return {
      title: 'Automatic Water Pouch Packing Machine Manufacturer & Price | Vertical FFS Liquid Pouch Packager - Ion Recon',
      description: 'Automatic liquid water pouch packing machine manufacturer. Vertical Form-Fill-Seal (FFS) pouch packaging line (2,000-2,500 pouches/hr) with UV sterilization lamp & SS 304 contact parts. Request free price quote.',
      canonical,
      productName: 'Automatic Water Pouch Packing Machine',
      category: 'Packaging Machinery'
    };
  }
  if (cleanPath === 'csd-project') {
    return {
      title: 'Turnkey CSD Carbonated Soft Drink Plant Manufacturer & Cost | Beverage Bottling Line - Ion Recon',
      description: 'Automatic CSD filling machine manufacturer for carbonated beverage processing plant setup & high-capacity soda bottling line from 30 BPM to 120 BPM with SS 316 beverage lines. Request project cost estimate.',
      canonical,
      productName: 'Carbonated Soft Drink (CSD) Plant',
      category: 'Beverage Plants'
    };
  }
  if (cleanPath === 'rts-juice-dairy-plant') {
    return {
      title: 'RTS Fruit Juice Line & Pasteurizer Manufacturer | Turnkey Juice Bottling Plant Setup - Ion Recon',
      description: 'Turnkey fruit pulp processing machinery & juice bottling plant manufacturer. Plate heat exchanger pasteurizer and 85°C hot filling monoblock lines. Request direct factory quote.',
      canonical,
      productName: 'RTS Fruit Juice Line & Dairy Plant',
      category: 'Beverage Plants'
    };
  }
  if (cleanPath === 'pet-blowing-machine') {
    return {
      title: 'PET Bottle Stretch Blow Molding Machine Manufacturer & Price | Automatic Bottle Maker - Ion Recon',
      description: 'Automatic & semi-automatic PET bottle stretch blow molding machine manufacturer. Production capacity from 1,200 BPH to 9,000 BPH with energy-saving infrared oven. Request free price quote.',
      canonical,
      productName: 'PET Bottle Stretch Blow Molding Machine',
      category: 'Blowing Machinery'
    };
  }
  if (cleanPath === 'jar-filling-machine') {
    return {
      title: 'Automatic 20 Litre Water Jar Filling Machine Manufacturer & Price | 20L Jar Plant Setup - Ion Recon',
      description: 'Automatic 20 Litre water jar decapper, washer, filler, and capper monoblock machine manufacturer. High output from 100 to 600 jars per hour with SS 304 food grade construction. Request free price quote.',
      canonical,
      productName: 'Automatic 20 Litre Jar Filling Machine',
      category: 'Filling Machinery'
    };
  }
  if (cleanPath === 'sticker-labeling-machine') {
    return {
      title: 'Automatic Sticker Labeling Machine Manufacturer & Price | PET Bottle Sticker Labeler - Ion Recon',
      description: 'Automatic self-adhesive sticker labeling machine manufacturer. High-speed bottle sticker labeler for round & flat PET bottles (50 BPM to 200 BPM) with stepper/servo drive. Request price quote.',
      canonical,
      productName: 'Automatic Sticker Labeling Machine',
      category: 'Packaging Machinery'
    };
  }
  if (cleanPath === 'semi-auto-shrink-wrapping-machine') {
    return {
      title: 'Semi Automatic Shrink Wrapping Machine Manufacturer & Price | L-Sealer Heating Tunnel - Ion Recon',
      description: 'Semi-automatic shrink wrapping machine manufacturer in Ghaziabad. Pneumatic pusher L-sealer with shrink heating tunnel (5 to 12 packs/min) for PET bottle pack bundling. Request free price quote.',
      canonical,
      productName: 'Semi-Automatic Shrink Wrapping Machine',
      category: 'Packaging Machinery'
    };
  }
  if (cleanPath === 'fully-auto-shrink-wrapping-machine') {
    return {
      title: 'Fully Automatic Shrink Wrapping Machine Manufacturer & Price | Web Sealer Tunnel - Ion Recon',
      description: 'Fully automatic web sealer shrink wrapping machine & heating tunnel manufacturer. High-speed trayless matrix bottle bundling line (15 to 28 packs/min) with PID digital heating. Request factory price quote.',
      canonical,
      productName: 'Fully Automatic Shrink Wrapping Machine',
      category: 'Packaging Machinery'
    };
  }
  if (cleanPath === 'water-testing-lab-equipment') {
    return {
      title: 'Water Testing Lab Equipment & Glassware Manufacturer | BIS IS 14543 Setup Cost - Ion Recon',
      description: 'Complete packaged drinking water testing lab equipment setup manufacturer for BIS IS 14543 & FSSAI compliance. Includes chemical instruments, autoclave, laminar air flow & borosilicate glassware. Request quote.',
      canonical,
      productName: 'Water Testing Lab Equipment & Glassware Setup',
      category: 'Testing Laboratory'
    };
  }
  if (cleanPath === 'tij-batch-coding-machine') {
    return {
      title: 'TIJ Batch Coding Machine Manufacturer & Price | Thermal Inkjet Bottle Printer - Ion Recon',
      description: 'High-speed TIJ thermal inkjet batch coding machine manufacturer. Online MRP date printer for PET bottles, caps & pouches (600 DPI, zero maintenance) with fast-dry solvent ink. Request price quote.',
      canonical,
      productName: 'TIJ Batch Coding Machine (Thermal Inkjet)',
      category: 'Coding Printers'
    };
  }
  if (cleanPath === 'cij-batch-coding-machine-neelkamal') {
    return {
      title: 'Neelkamal CIJ Batch Coding Machine Price & Supplier | Continuous Inkjet Printer - Ion Recon',
      description: 'Industrial Neelkamal CIJ continuous inkjet batch coding machine supplier. High-speed 5-line non-contact MRP date printer for PET bottle lines up to 500 bottles/min. Request price quote.',
      canonical,
      productName: 'CIJ Batch Coding Machine (Neelkamal)',
      category: 'Coding Printers'
    };
  }
  if (cleanPath === 'pet-blowing-machine-handfeed-2-cavity') {
    return {
      title: 'PET Blow Molding Machine Handfeed 2 Cavity Price ₹15 Lakhs | 2300 BPH Bottle Maker - Ion Recon',
      description: 'Semi-automatic handfeed 2 cavity PET bottle stretch blow molding machine manufacturer. Output 2,300 BPH with 18 kW power oven at factory price ₹15 Lakhs. Request direct quote.',
      canonical,
      productName: 'PET Blow Molding Machine Handfeed 2 Cavity',
      category: 'Blowing Machinery'
    };
  }
  if (cleanPath === 'pet-blowing-machine-handfeed-4-cavity') {
    return {
      title: 'PET Blow Molding Machine Handfeed 4 Cavity Manufacturer & Price | 3600-5600 BPH - Ion Recon',
      description: 'Semi-automatic 4 cavity PET bottle stretch blow molding machine manufacturer. Output 3,600 to 5,600 BPH with 32 kW power infrared oven. Request price quotation.',
      canonical,
      productName: 'PET Blow Molding Machine Handfeed 4 Cavity',
      category: 'Blowing Machinery'
    };
  }
  if (cleanPath === 'pet-blowing-machine-fully-auto-4-cavity') {
    return {
      title: 'Fully Automatic 4 Cavity PET Blow Molding Machine Manufacturer & Price | 5600 BPH - Ion Recon',
      description: '100% Fully automatic 4 cavity PET bottle stretch blow molding machine manufacturer. Output 5,600 BPH with auto preform elevator & 48 kW servo drive. Request quote.',
      canonical,
      productName: 'PET Blow Molding Machine Fully Automatic 4 Cavity',
      category: 'Blowing Machinery'
    };
  }
  if (cleanPath === 'pet-blowing-machine-fully-auto-6-cavity') {
    return {
      title: 'Fully Automatic 6 Cavity PET Blow Molding Machine Manufacturer & Price | 6200 BPH - Ion Recon',
      description: 'Ultra high speed fully automatic 6 cavity PET bottle blow molding machine manufacturer. Output 6,200 to 7,200 BPH with full servo drive & 68 kW power oven. Request price quote.',
      canonical,
      productName: 'PET Blow Molding Machine Fully Automatic 6 Cavity',
      category: 'Blowing Machinery'
    };
  }

  if (cleanPath === 'locations') {
    return {
      title: 'Mineral Water Plant Setup & Machinery Supplier Directory | Ion Recon PAN India',
      description: 'Find turnkey mineral water plant setup, commercial RO plant manufacturers & bottling line suppliers in Uttar Pradesh, Delhi NCR, Rajasthan, Bihar, MP & PAN India.',
      canonical
    };
  }
  if (cleanPath === 'roi-calculator') {
    return {
      title: 'Mineral Water Plant Setup Cost & ROI Profit Calculator | Bottling Project Estimation - Ion Recon',
      description: 'Calculate mineral water plant setup cost, daily profit margins, payback period & power requirements for 30 BPM, 40 BPM, 60 BPM & 90 BPM bottling lines.',
      canonical
    };
  }
  if (cleanPath === 'faqs') {
    return {
      title: 'Mineral Water Plant Setup FAQs | BIS ISI IS 14543 License & Machinery Guide - Ion Recon',
      description: 'Frequently Asked Questions on packaged drinking water plant setup cost, BIS ISI certification, FSSAI licensing, floor area plan, power requirements & RO purification.',
      canonical
    };
  }

  if (cleanPath.includes('stp') || cleanPath.includes('effluent') || cleanPath.includes('sewage')) {
    return {
      title: 'Industrial STP Plant Setup Cost & Effluent Treatment Manufacturer | MBBR Sewage Treatment - Ion Recon',
      description: 'Check industrial STP plant setup cost & MBBR STP plant design. Leading effluent and sewage treatment plant manufacturer for zero liquid discharge. Request a free quote.',
      canonical
    };
  }

  // Location routes
  if (cleanPath.startsWith('mineral-water-plant-manufacturer-in-')) {
    const rawSlug = cleanPath.replace('mineral-water-plant-manufacturer-in-', '');
    
    // Guard: If rawSlug matches a machine slug or product ID, map it to the proper product route!
    const productRoutes = [
      '40-bpm-mineral-water-plant', '60-bpm-mineral-water-plant',
      'bottle-filling-machine', 'pet-blowing-machine', 'ss-ro-plant',
      'jar-filling-machine', 'bopp-labeling-machine', 'shrink-wrapping-machine',
      'csd-project', 'rts-juice-dairy-plant', 'water-pouch-packing-machine',
      'sticker-labeling-machine', 'semi-auto-shrink-wrapping-machine', 'fully-auto-shrink-wrapping-machine',
      'water-testing-lab-equipment', 'tij-batch-coding-machine', 'cij-batch-coding-machine-neelkamal',
      'pet-blowing-machine-handfeed-2-cavity', 'pet-blowing-machine-handfeed-4-cavity',
      'pet-blowing-machine-fully-auto-4-cavity', 'pet-blowing-machine-fully-auto-6-cavity'
    ];

    if (productRoutes.includes(rawSlug)) {
      return getPageMeta(`https://ionrecon.info/${rawSlug}`);
    }

    const locName = rawSlug
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    
    return {
      title: `Turnkey Mineral Water Plant Manufacturer in ${locName} | Packaged Water Setup - Ion Recon`,
      description: `Ion Recon: Turnkey packaged drinking water project & commercial RO plant manufacturer in ${locName}. Automatic bottling line setup & direct factory price quote.`,
      canonical: `https://ionrecon.info/mineral-water-plant-manufacturer-in-${rawSlug}`
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
    title: `${humanized} Manufacturer & Supplier | Ion Recon Ghaziabad`,
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

  // Inject Product Schema JSON-LD if productName is present
  if (meta.productName) {
    const productSchema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": meta.productName,
      "image": "https://ionrecon.info/images/bopp_labeling_machine.png",
      "description": meta.description,
      "brand": {
        "@type": "Brand",
        "name": "Ion Recon"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "Ion Recon Industries"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "150000",
        "highPrice": "2500000",
        "offerCount": "10",
        "availability": "https://schema.org/InStock"
      }
    };

    const schemaScript = `\n  <script type="application/ld+json">\n  ${JSON.stringify(productSchema, null, 2)}\n  </script>`;
    pageHtml = pageHtml.replace('</head>', `${schemaScript}\n  </head>`);
  }

  // Create directory structure in dist/<cleanPath>/index.html
  const targetDir = path.join(distDir, cleanPath);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), pageHtml, 'utf8');

  count++;
});

console.log(`✅ Pre-rendered static HTML entrypoints generated for ${count} URLs in dist/!`);
