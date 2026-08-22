import React from 'react';

export default function SeoContent({ theme }) {
  const isLight = theme === 'light';

  const keywordCategories = [
    {
      category: "Brand & Direct Search",
      keywords: ["Ion Recon", "Ion Recon Ghaziabad", "Ion Recon Industries", "Ion Recon Mineral Water Plant", "ionrecon.info"]
    },
    {
      category: "Mineral Water Plants & Turnkey Projects",
      keywords: [
        "automatic mineral water bottling plant price",
        "turnkey packaged drinking water project",
        "commercial RO plant manufacturer",
        "40 BPM Mineral Water Plant",
        "30 BPM Mineral Water Plant",
        "60 BPM Mineral Water Plant",
        "90 BPM Bottling Line",
        "120 BPM Automatic Water Plant",
        "2,400 Bottles Per Hour Plant"
      ]
    },
    {
      category: "Carbonated Soft Drink (CSD) Plants",
      keywords: [
        "automatic CSD filling machine manufacturer",
        "carbonated beverage processing plant",
        "high-capacity CSD bottling line",
        "Turnkey CSD Carbonated Soft Drink Plant",
        "Soda Bottling Plant Manufacturer",
        "Isobaric Counter-Pressure Monoblock PET Bottle Filler"
      ]
    },
    {
      category: "Sewage & Effluent Treatment Plants (STP & ETP)",
      keywords: [
        "industrial STP plant setup cost",
        "effluent and sewage treatment plant manufacturer",
        "MBBR STP plant design",
        "MBR Sewage Treatment Plant",
        "Zero Liquid Discharge ETP Plant",
        "Industrial Waste Water Purification Unit"
      ]
    },
    {
      category: "Fruit Juice & Dairy Processing Plants",
      keywords: [
        "fruit pulp processing machinery",
        "turnkey juice bottling plant",
        "pasteurizer manufacturer for juice",
        "RTS Fruit Juice Line & Dairy Plant",
        "Hot Fill Juice Bottling Line",
        "PHE Pasteurizer for Juice Bottling"
      ]
    },
    {
      category: "Bottling & Packaging Machinery",
      keywords: [
        "RFC Monoblock Bottle Filling Machine",
        "3 in 1 Automatic Bottle Filling Machine",
        "Rinser Filler Capper Monoblock",
        "20 Litre Jar Filling Machine",
        "Automatic 20L Jar Washer Filler Capper",
        "PET Bottle Making Machine",
        "PET Stretch Blow Molding Machine",
        "BOPP Hot Melt Bottle Labeling Machine",
        "Automatic Web Sealer Shrink Wrapping Machine"
      ]
    },
    {
      category: "Location & Coverage",
      keywords: [
        "Mineral Water Plant Manufacturer in Ghaziabad",
        "Bottling Machine Supplier Sahibabad Industrial Area",
        "Mineral Water Plant Manufacturer Delhi NCR",
        "Water Plant Machinery Supplier Uttar Pradesh (UP)",
        "Packaged Drinking Water Plant Manufacturer Haryana / Punjab",
        "Mineral Water Plant Setup Rajasthan / Jaipur",
        "Industrial RO Plant Supplier Bihar / MP / PAN India"
      ]
    }
  ];

  return (
    <section className="sr-only">
      <div>
        <h2>Leading Turnkey Plant & Bottling Machine Manufacturer in Ghaziabad, Delhi NCR & PAN India</h2>
        <p>
          Welcome to <strong>Ion Recon Industries</strong>, your premier <strong>commercial RO plant manufacturer</strong>, <strong>automatic CSD filling machine manufacturer</strong>, <strong>effluent and sewage treatment plant manufacturer</strong>, and <strong>pasteurizer manufacturer for juice</strong>. Located in Sahibabad Industrial Area Site 4, Ghaziabad, we provide complete engineering solutions for <strong>turnkey packaged drinking water project</strong> setups, <strong>carbonated beverage processing plant</strong> installations, <strong>MBBR STP plant design</strong>, and <strong>fruit pulp processing machinery</strong>.
        </p>
        <p>
          Whether you are looking for an <strong>automatic mineral water bottling plant price</strong> breakdown, <strong>high-capacity CSD bottling line</strong> details, <strong>industrial STP plant setup cost</strong> reports, or a <strong>turnkey juice bottling plant</strong> blueprint with BIS (ISI IS 14543) certification guidance, Ion Recon delivers top-tier food-grade SS 304/316 stainless steel machinery with doorstep PAN India commissioning.
        </p>

        <div>
          <h3>Target Search Index Keywords Matrix</h3>
          <div>
            {keywordCategories.map((cat, idx) => (
              <div key={idx}>
                <h4>{cat.category}</h4>
                <div>
                  {cat.keywords.map((kw, kIdx) => (
                    <span key={kIdx}>{kw}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
