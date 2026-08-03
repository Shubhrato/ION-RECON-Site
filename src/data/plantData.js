export const PLANT_DATA = {
  company: {
    name: "ION RECON",
    fullName: "Ion Recon Industries",
    tagline: "Trader, Manufacturer & Retailer of Mineral Water Plant, Filling Machines & Water Treatment Plants",
    locationCity: "Ghaziabad, Uttar Pradesh, India",
    address: "57/1/9, Sahibabad Industrial Area Site 4, Ghaziabad 201010, Uttar Pradesh, India",
    phonePrimary: "+91 98109 20792",
    phoneSecondary: "+91 98114 47271",
    whatsapp: "+919810920792",
    email: "info@ionrecon.co.in",
    secondaryEmail: "sales@ionrecon.co.in",
    gstNo: "09AFSPV0532M1ZQ",
    gstRegDate: "09-07-2021",
    legalStatus: "Proprietorship Manufacturer & Retailer",
    turnover: "₹1.5 - ₹5 Crore",
    experienceYears: 15,
    projectsCompleted: "500+",
    googleAdsQualityScore: "9.8/10",
    ratings: "4.9/5",
    totalReviews: 480
  },

  hero: {
    titleAboveFold: "Build Your Own Packaged Drinking Water Business",
    subtitle: "Complete Mineral Water Plant Manufacturer & Bottling Machine Supplier by Ion Recon, Ghaziabad",
    usps: [
      "Turnkey Installation & Site Commissioning",
      "PAN India Doorstep Support & Operator Training",
      "Food Grade SS 304/316 Stainless Steel Machinery",
      "Free Project Consultation & BIS License Guidance"
    ]
  },

  products: [
    {
      id: "40-bpm-mineral-water-plant",
      title: "40 BPM Package Drinking Water Plant",
      category: "plant",
      shortDesc: "Ion Recon signature 40 BPM (2,400 Bottles/Hr) complete turnkey mineral water setup from raw water filtration to final shrink bundled bottles.",
      capacityRange: "2,400 Bottles/Hr (40 BPM)",
      automation: "Fully Automatic PLC Line",
      material: "SS 304 Food Grade Steel",
      powerConsumption: "20 HP (~15 kW)",
      keyFeatures: [
        "Multistage RO Plant with Ozone Generator & UV Sterilizer",
        "40 BPM 12-12-4 Rinser-Filler-Capper Monoblock",
        "SS Sand Filter & Activated Carbon Vessel",
        "BIS (ISI) & FSSAI Compliant Chemical Lab Layout"
      ],
      image: "/images/mineral_water_plant_40bpm.png",
      badge: "Ion Recon Best Seller"
    },
    {
      id: "60-bpm-mineral-water-plant",
      title: "60 BPM Mineral Water Plant",
      category: "plant",
      shortDesc: "High speed 3,600 Bottles/Hr turnkey packaging plant designed for expanding commercial regional water brands.",
      capacityRange: "3,600 Bottles/Hr (60 BPM)",
      automation: "Fully Automatic Servo Line",
      material: "Full SS 304 / SS 316 Contact Parts",
      powerConsumption: "35 HP (~26 kW)",
      keyFeatures: [
        "2,000 LPH RO System with Dow/Hydranautics Membranes",
        "18-18-6 Monoblock Filling Machine",
        "Automatic PET Bottle Blowing Machine (4 Cavity)",
        "BOPP Hot Melt Glue Labeler & Web Sealer Shrink Tunnel"
      ],
      image: "/images/mineral_water_plant_40bpm.png",
      badge: "High Efficiency"
    },
    {
      id: "bottle-filling-machine",
      title: "RFC Monoblock Bottle Filling Machine",
      category: "filling",
      shortDesc: "3-in-1 automatic Rinser-Filler-Capper monoblock machine for 200ml, 500ml, 1 Litre & 2 Litre PET bottles.",
      capacityRange: "30 BPM to 240 BPM (1,800 to 14,400 BPH)",
      automation: "100% Fully Automatic PLC Controlled",
      material: "Heavy Duty Stainless Steel 304",
      powerConsumption: "5 HP to 15 HP",
      keyFeatures: [
        "No Bottle - No Rinse / No Fill Precision Sensors",
        "Gravity & Isobaric Zero-Drip Filling Valves",
        "Automatic Cap Elevator & Orienting Sorter",
        "Touchscreen HMI Control Panel"
      ],
      image: "/images/rfc_monoblock_filling_machine.png",
      badge: "High Precision"
    },
    {
      id: "pet-blowing-machine",
      title: "PET Bottle Making / Blow Molding Machine",
      category: "blowing",
      shortDesc: "Automatic & Semi-automatic stretch PET bottle blowing machine for crystal clear, lightweight PET bottles.",
      capacityRange: "1,200 BPH to 9,000 BPH",
      automation: "Semi-Auto / Fully Automatic",
      material: "Alloy Steel Frame & Hardened Molds",
      powerConsumption: "20 HP to 60 HP",
      keyFeatures: [
        "Infrared Preform Heating Oven with Temp Controllers",
        "Air Recovery Energy Saver Pneumatic System",
        "Festo / SMC Pneumatic Cylinders",
        "Fast Mold Changeover System (200ml - 2L)"
      ],
      image: "/images/pet_blow_molding_machine.png",
      badge: "Low Power"
    },
    {
      id: "ss-ro-plant",
      title: "Industrial SS RO Water Treatment Plant",
      category: "plant",
      shortDesc: "Commercial Reverse Osmosis water treatment plant with SS skid, high pressure pumps and mineral dosing.",
      capacityRange: "500 LPH to 50,000 LPH",
      automation: "PLC Controlled Auto Flush",
      material: "Stainless Steel 304 Skid & Pressure Vessels",
      powerConsumption: "5 HP to 35 HP",
      keyFeatures: [
        "Grundfos / CNP SS High Pressure Pump",
        "Online TDS, pH & Flow Rate Digital Monitors",
        "Ozonator & UV Disinfection System",
        "Pressure Sand Filter & Activated Carbon Filter"
      ],
      image: "/images/industrial_ss_ro_plant.png",
      badge: "Pure Water Standard"
    },
    {
      id: "jar-filling-machine",
      title: "Automatic 20 Litre Jar Filling Machine",
      category: "filling",
      shortDesc: "Linear automatic 20L water jar decapper, internal/external washer, filler, and capper monoblock unit.",
      capacityRange: "100 to 600 Jars / Hour (20 Litre)",
      automation: "Fully Automatic Pneumatic",
      material: "SS 304 Construction",
      powerConsumption: "5 HP to 10 HP",
      keyFeatures: [
        "4-Stage Internal Jar Washing with Recirculation Pump",
        "Pneumatic Jar Lifter & Zero-Spill Filling Nozzles",
        "Automatic Cap Washing & Press Capper",
        "Compact Footprint suitable for medium units"
      ],
      image: "/images/jar_filling_machine_20l.png",
      badge: "20L Jar Specialist"
    },
    {
      id: "bopp-labeling-machine",
      title: "BOPP Hot-Melt Bottle Labeling Machine",
      category: "packaging",
      shortDesc: "Automatic rotary / linear BOPP roll-fed sticker labeling machine for PET water bottles.",
      capacityRange: "50 BPM to 250 BPM",
      automation: "Servo Driven Automatic",
      material: "Full Stainless Steel 304 Frame",
      powerConsumption: "5 HP to 12 HP",
      keyFeatures: [
        "Hot Melt Glue Tank with Electronic Temp Controller",
        "Optical Eye Sensor for precise label cutting",
        "Wraparound labeling for 200ml to 2,000ml bottles",
        "Zero bubble smooth label application"
      ],
      image: "/images/bopp_labeling_machine.png",
      badge: "High Speed Labeling"
    },
    {
      id: "shrink-wrapping-machine",
      title: "Automatic Shrink Wrapping Heating Tunnel",
      category: "packaging",
      shortDesc: "Web sealer automatic shrink packaging machine for trayless matrix bundling (6, 12, 24 bottle packs).",
      capacityRange: "10 to 25 Packs / Minute",
      automation: "Fully Automatic Inline",
      material: "Powder Coated Heavy Duty Steel",
      powerConsumption: "15 HP to 30 HP",
      keyFeatures: [
        "PID Digital Controller for uniform tunnel heating",
        "Dual Blower Air Circulation Fans",
        "Auto bottle lane collating and pusher system",
        "Heavy-duty Teflon coated sealing knife"
      ],
      image: "/images/shrink_wrapping_machine.png",
      badge: "Durable Bundling"
    },
    {
      id: "csd-project",
      title: "Carbonated Soft Drink (CSD) Plant",
      category: "plant",
      shortDesc: "Complete turn-key CSD carbonated beverage filling plant for soda, cola, lemon & flavored soft drinks in PET bottles.",
      capacityRange: "30 BPM to 120 BPM",
      automation: "Isobaric Counter-Pressure Filling",
      material: "SS 316 Food Grade Beverage Line",
      powerConsumption: "25 HP to 65 HP",
      keyFeatures: [
        "Carbonator & Sugar Melting Vessel",
        "Chiller Plant for CO2 Saturation @ 4°C",
        "Isobaric Counter-Pressure Monoblock PET Bottle Filler",
        "Crown / Screw Capping System"
      ],
      image: "/images/csd_bottle_plant.png",
      badge: "Beverage Line"
    },
    {
      id: "rts-juice-dairy-plant",
      title: "RTS Fruit Juice Line & Dairy Plant",
      category: "plant",
      shortDesc: "Hot fill RTS fruit juice processing plant and dairy milk packaging line for PET bottles.",
      capacityRange: "1,000 LPH to 10,000 LPH",
      automation: "PLC Controlled Pasteurizer",
      material: "SS 316 Sanitary Steel",
      powerConsumption: "30 HP to 75 HP",
      keyFeatures: [
        "Pulping & Mixing Homogenizer",
        "Plate Heat Exchanger (PHE) Pasteurizer",
        "Hot Filling Monoblock Machine (85°C) for PET bottles",
        "Sterile Cooling Tunnel & Sleeve Labeler"
      ],
      image: "/images/fruit_juice_bottle_line.png",
      badge: "Food & Dairy"
    },
    {
      id: "water-pouch-packing-machine",
      title: "Automatic Water Pouch Packing Machine",
      shortDesc: "Vertical Form-Fill-Seal (FFS) automatic liquid water pouch packing machine for 200ml to 500ml water pouches.",
      category: "packaging",
      capacityRange: "2,000 to 2,500 Pouches / Hour",
      automation: "Fully Automatic FFS",
      material: "SS 304 Contact Parts",
      powerConsumption: "2 HP (~1.5 kW)",
      keyFeatures: [
        "UV Film Sterilization Lamp",
        "Impulse Heat Sealing with Date Coder",
        "Low power requirement ideal for rural distribution",
        "Pouch counter & automatic roll feeding"
      ],
      image: "/images/water_pouch_packing_machine.png",
      badge: "Economical"
    }
  ],

  capacities: [
    {
      bpm: "30 BPM",
      bottlesPerHour: "1,800 Bottles/Hr",
      suitableFor: "Startup & Small Enterprise",
      estimatedPrice: "₹29 Lakhs - ₹32 Lakhs",
      powerReq: "15 HP (~11 kW)",
      areaReq: "1,500 - 2,000 Sq. Ft.",
      dailyOutput: "14,400 Bottles (8 Hr Shift)",
      estimatedDailyProfit: "₹18,000 - ₹25,000",
      roiMonths: "8 - 10 Months",
      machinesIncluded: [
        "1,000 LPH Commercial RO Water Plant",
        "30 BPM 3-in-1 RFC Monoblock Machine",
        "Semi-Auto PET Blow Molder (2 Cavity)",
        "Batch Coding & Shrink Tunnel",
        "SS Storage Tanks (2,000L x 2)"
      ]
    },
    {
      bpm: "40 BPM",
      bottlesPerHour: "2,400 Bottles/Hr",
      suitableFor: "Ion Recon Signature Bestseller",
      estimatedPrice: "₹34 Lakhs - ₹37 Lakhs",
      powerReq: "20 HP (~15 kW)",
      areaReq: "2,000 - 2,800 Sq. Ft.",
      dailyOutput: "19,200 Bottles (8 Hr Shift)",
      estimatedDailyProfit: "₹26,000 - ₹34,000",
      roiMonths: "7 - 9 Months",
      machinesIncluded: [
        "1,500 LPH SS RO Plant + Ozone Unit",
        "40 BPM 12-12-4 Monoblock Filling Line",
        "Auto PET Blow Molding Machine (2 Cavity)",
        "BOPP Labeling & Inkjet Coder",
        "Automatic Web Sealer Shrink Tunnel"
      ]
    },
    {
      bpm: "60 BPM",
      bottlesPerHour: "3,600 Bottles/Hr",
      suitableFor: "Commercial Brand Bottling Line",
      estimatedPrice: "₹50 Lakhs - ₹84 Lakhs",
      powerReq: "35 HP (~26 kW)",
      areaReq: "2,500 - 3,500 Sq. Ft.",
      dailyOutput: "28,800 Bottles (8 Hr Shift)",
      estimatedDailyProfit: "₹38,000 - ₹50,000",
      roiMonths: "6 - 8 Months",
      machinesIncluded: [
        "2,000 LPH RO Water Plant + Ozone Unit",
        "60 BPM 18-18-6 Automatic RFC Monoblock",
        "Auto PET Blowing Machine (4 Cavity)",
        "Rotary BOPP Hot Melt Labeling Machine",
        "Automatic Web Sealer Shrink Wrapping Machine"
      ]
    },
    {
      bpm: "90 BPM",
      bottlesPerHour: "5,400 Bottles/Hr",
      suitableFor: "Regional Distribution Plant",
      estimatedPrice: "₹1.0 Crore - ₹1.2 Crore",
      powerReq: "55 HP (~41 kW)",
      areaReq: "4,000 - 5,500 Sq. Ft.",
      dailyOutput: "43,200 Bottles (8 Hr Shift)",
      estimatedDailyProfit: "₹65,000 - ₹85,000",
      roiMonths: "5 - 7 Months",
      machinesIncluded: [
        "4,000 LPH Double Pass RO System",
        "90 BPM Rotary Monoblock Bottling Line",
        "Automatic High-Speed PET Blow Molder",
        "Linear BOPP Labeling & Inkjet Coding",
        "High Capacity Shrink Wrapper + Conveyor System"
      ]
    },
    {
      bpm: "120 BPM",
      bottlesPerHour: "7,200 Bottles/Hr",
      suitableFor: "State-Wide Large Scale Producer",
      estimatedPrice: "₹1.6 Crore - ₹1.8 Crore",
      powerReq: "80 HP (~60 kW)",
      areaReq: "6,000 - 8,000 Sq. Ft.",
      dailyOutput: "57,600 Bottles (8 Hr Shift)",
      estimatedDailyProfit: "₹90,000 - ₹1,20,000",
      roiMonths: "4 - 6 Months",
      machinesIncluded: [
        "6,000 LPH Fully Automated Water Plant",
        "120 BPM Servo Rotary RFC Filler",
        "Auto Blow Molding Unit with Air Recovery",
        "Automatic Sleeve / BOPP Labeler",
        "Automatic Palletizer Ready Packing Line"
      ]
    },
    {
      bpm: "200 BPM",
      bottlesPerHour: "12,000 Bottles/Hr",
      suitableFor: "Mega Industrial Beverage Manufacturer",
      estimatedPrice: "₹2.5 Crore - ₹3.0 Crore",
      powerReq: "125 HP (~93 kW)",
      areaReq: "10,000+ Sq. Ft.",
      dailyOutput: "96,000 Bottles (8 Hr Shift)",
      estimatedDailyProfit: "₹1,60,000 - ₹2,20,000",
      roiMonths: "4 - 5 Months",
      machinesIncluded: [
        "10,000 LPH Stainless Steel RO Plant",
        "200 BPM High Speed Isobaric Bottling Line",
        "8 Cavity Servo Blow Molding System",
        "Dual Lane BOPP Labeler & Automatic Shrink System",
        "Full SCADA PLC Remote Monitoring & Inspection"
      ]
    }
  ],

  whyChooseUs: [
    {
      title: "Ion Recon Direct Factory Supply",
      description: "Direct manufacturer & retailer from Ghaziabad (UP) with GST Registration 09AFSPV0532M1ZQ.",
      icon: "ShieldCheck"
    },
    {
      title: "40 BPM & Custom Capacities",
      description: "Specialized in 40 BPM (2,400 BPH) signature plants and custom speed bottling lines from 30 BPM to 240 BPM.",
      icon: "Cpu"
    },
    {
      title: "Installation & Commissioning",
      description: "Ion Recon expert engineers deployed directly to your factory site across UP, NCR, Bihar, MP, Rajasthan & PAN India.",
      icon: "Wrench"
    },
    {
      title: "Workforce Training & Manuals",
      description: "Hands-on operational and maintenance training for local plant operators along with detailed technical documentation.",
      icon: "GraduationCap"
    },
    {
      title: "24/7 After Sales Service & AMC",
      description: "Prompt spare parts availability, annual maintenance contracts (AMC), and direct engineer phone support.",
      icon: "Headphones"
    },
    {
      title: "Food Grade SS 304/316 Steel",
      description: "Constructed with food-grade SS 304/316 contact parts ensuring BIS / ISI & FSSAI license compliance.",
      icon: "Zap"
    }
  ],

  businessBenefits: [
    {
      title: "Start Your Own Water Brand",
      desc: "Tap into the 20%+ annual growth Indian packaged drinking water market."
    },
    {
      title: "Low Operating Cost",
      desc: "Optimized power consumption and automated labor reduction for high margin yields."
    },
    {
      title: "Fast Return on Investment (ROI)",
      desc: "Recover total capital investment in as early as 6 to 9 months of full production."
    },
    {
      title: "High Production Efficiency",
      desc: "Zero-spill filling valves and 99.5% machine uptime guarantee maximum daily output."
    },
    {
      title: "Food Grade SS Construction",
      desc: "Constructed with SS 304/316 contact parts ensuring BIS / ISI certification compliance."
    },
    {
      title: "Easy Maintenance & Spares",
      desc: "Standardized parts readily available with minimal routine maintenance downtime."
    }
  ],

  processTimeline: [
    { step: 1, title: "Consultation", desc: "Analyzing water source test report, capacity, space & budget." },
    { step: 2, title: "Planning & CAD", desc: "Factory layout drawing, BIS lab specifications & quote finalization." },
    { step: 3, title: "Manufacturing", desc: "Ion Recon Ghaziabad factory precision fabrication using SS 304/316." },
    { step: 4, title: "Installation", desc: "On-site machine positioning, piping, electrical wiring & commissioning." },
    { step: 5, title: "Trial Run", desc: "Water purification calibration, bottle filling speed alignment & test batch." },
    { step: 6, title: "Workforce Training", desc: "Hands-on operational and maintenance training for plant operators." },
    { step: 7, title: "Production Starts", desc: "Factory goes live for commercial commercial bottling & distribution." }
  ],

  faqs: [
    {
      q: "How much investment is required to start a Mineral Water Plant?",
      a: "Initial investment for a 30 BPM (1,800 BPH) plant is ₹29 Lakhs - ₹32 Lakhs. A 40 BPM (2,400 BPH Ion Recon signature plant) costs ₹34 Lakhs - ₹37 Lakhs. Higher capacity lines range from ₹50 Lakhs (60 BPM) to ₹3.0 Cr+ (200 BPM Turnkey)."
    },
    {
      q: "How many bottles can be produced per hour?",
      a: "Capacities range from 1,800 BPH (30 BPM), 2,400 BPH (40 BPM), 3,600 BPH (60 BPM) up to 12,000+ bottles per hour (200 BPM) for 200ml, 500ml, 1 Litre, and 2 Litre PET bottles."
    },
    {
      q: "What is the typical installation & commissioning time?",
      a: "Machine manufacturing takes approx 15–20 days at our Ghaziabad facility. Once delivered to your factory, Ion Recon engineers complete installation, piping, testing, and operator training within 5 to 7 days."
    },
    {
      q: "Do you provide operators and technical staff training?",
      a: "Yes! As part of our turnkey service, Ion Recon senior technicians stay at your plant during commissioning to train your local staff on operation, cleaning, routine maintenance, and quality control."
    },
    {
      q: "What warranty and after-sales support do you provide?",
      a: "We offer a 1-Year Comprehensive Warranty on all machinery along with lifelong technical support. We maintain a full inventory of original spare parts dispatched within 24 hours across India."
    },
    {
      q: "Do you assist with BIS (ISI Mark) and FSSAI License setup?",
      a: "Yes, we provide full guidance for civil layout designs required by BIS inspectors, chemical/microbiological testing lab equipment setup, and document support for ISI mark certification."
    }
  ],

  testimonials: [
    {
      name: "Rajesh Kumar Sharma",
      company: "Ion Pure Waters, Ghaziabad UP",
      review: "We installed Ion Recon's 40 BPM Package Drinking Water Plant. Their Ghaziabad team handled everything from civil CAD layout to BIS lab setup. Machine quality and SS finish are top notch!",
      capacity: "40 BPM Turnkey Plant",
      rating: 5,
      location: "Uttar Pradesh"
    },
    {
      name: "Venkatesh Rao",
      company: "Sri Krishna Mineral Water, Vijayawada",
      review: "Purchased a 60 BPM RFC Filling machine and BOPP labeler from Ion Recon. Extremely reliable filling accuracy and zero bottle leakage. Their service team visited promptly whenever requested.",
      capacity: "60 BPM Bottling Line",
      rating: 5,
      location: "Andhra Pradesh"
    },
    {
      name: "Harminder Singh",
      company: "ClearDrop Waters, Ludhiana",
      review: "Started our brand with a 30 BPM compact line. Their project report helped us secure bank loan approval easily. Highly recommended for new entrants in packaged drinking water business!",
      capacity: "30 BPM Startup Plant",
      rating: 5,
      location: "Punjab"
    }
  ],

  gallery: [
    { title: "40 BPM Ion Recon Monoblock Line", category: "Machinery", image: "/images/mineral_water_plant_40bpm.png" },
    { title: "Commercial SS RO Water Plant", category: "RO Plant", image: "/images/industrial_ss_ro_plant.png" },
    { title: "Automatic RFC Bottling Line", category: "Machinery", image: "/images/rfc_monoblock_filling_machine.png" },
    { title: "Automatic 20L Jar Plant", category: "Jar Plant", image: "/images/jar_filling_machine_20l.png" },
    { title: "BOPP Hot-Melt Labeling Line", category: "Machinery", image: "/images/bopp_labeling_machine.png" },
    { title: "Automatic Web Sealer Shrink Tunnel", category: "Machinery", image: "/images/shrink_wrapping_machine.png" }
  ]
};
