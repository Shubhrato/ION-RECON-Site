import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { PLANT_DATA } from '../src/data/plantData.js';
import { BLOG_POSTS } from '../src/data/blogData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const llmsPath = path.join(rootDir, 'public', 'llms.txt');

const DOMAIN = 'https://ionrecon.online';

console.log('Generating fresh llms.txt for Ion Recon (with trailing slashes)...');

let content = `# Ion Recon Industries - Turnkey Mineral Water & Bottling Plant Manufacturer

> Ion Recon (${PLANT_DATA.company.locationCity}) is a premier manufacturer, supplier, and exporter of turnkey packaged drinking water bottling plants, 3-in-1 RFC Monoblock filling machines, SS 304 Reverse Osmosis (RO) water treatment plants, PET stretch blow molding machines, BOPP labeling machinery, and industrial Effluent/Sewage Treatment Plants (ETP/STP) in India.

## Core Turnkey Bottling Lines & Machinery

`;

if (PLANT_DATA && Array.isArray(PLANT_DATA.products)) {
  PLANT_DATA.products.forEach(prod => {
    content += `- [${prod.title}](${DOMAIN}/${prod.id}/): ${prod.shortDesc}\n`;
  });
}

content += `
## Interactive Tools & Calculators

- [Capacity & Profit ROI Calculator](${DOMAIN}/roi-calculator/): Compare production capacities (30 BPM to 200 BPM), power consumption, floor space, and monthly profit margins.
- [PAN India Installation Directory](${DOMAIN}/locations/): Turnkey setup support across 15+ Indian states and union territories.
- [Frequently Asked Questions (FAQs)](${DOMAIN}/faqs/): Licensing, BIS ISI compliance, borewell NOC, and machinery warranties.

## Technical Knowledge Hub & Guides

`;

if (Array.isArray(BLOG_POSTS)) {
  BLOG_POSTS.slice(0, 15).forEach(post => {
    const slug = post.slug || post.id;
    content += `- [${post.title}](${DOMAIN}/blog/${slug}/): ${post.summary}\n`;
  });
}

content += `
## Regulatory & Legal Compliance (India)

- **BIS Certification**: Mandatory IS 14543:2024 packaged drinking water standards & in-house lab mandates.
- **FSSAI License**: State & Central Food Safety Authority manufacturing registration.
- **Pollution Control Board NOC**: State Pollution Control Board (SPCB) Consent to Establish (CTE) & Consent to Operate (CTO).
- **CGWA Clearance**: Central Ground Water Authority borewell abstraction & telemetric flow meter rules.

## Factory Location & Contact Information

- **Company**: ${PLANT_DATA.company.fullName}
- **GST Number**: ${PLANT_DATA.company.gstNo}
- **Address**: ${PLANT_DATA.company.address}
- **Primary Phone**: ${PLANT_DATA.company.phonePrimary}
- **Secondary Phone**: ${PLANT_DATA.company.phoneSecondary}
- **WhatsApp**: ${PLANT_DATA.company.whatsapp}
- **Official Website**: ${DOMAIN}/
`;

fs.writeFileSync(llmsPath, content, 'utf8');
console.log('llms.txt regenerated successfully!');
