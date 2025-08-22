import { Grid, Headphones, Package, Smartphone } from "lucide-react";
import { Product, RepairVideoType, Order, ShopData, OptionPickerCategory, StepItem, CategoryInfo } from "./types";

export const products: Product[] = [
  {
    id: "charger-standard-01",
    name: "Samsung C To C Adapter",
    description: "Reliable and efficient charging for everyday use. Compatible with most Android devices.",
    price: 180.00,
    images: [
      "/products-images/samsung-c.png",
    ],
    category: "chargers",
    subcategory: "standard",
    compatibility: ["Samsung", "Xiaomi", "Oppo"],
    features: ["80 w Output", "Compact Design", "LED Indicator"],
    rating: 4.2,
    reviews: 450,
    inStock: true
  },
  {
    id: "charger-original-01",
    name: "Original Samsung Fast Charger",
    description: "Genuine Samsung charger designed specifically for Samsung devices to provide optimal charging performance.",
    price: 449.99,
    images: [
      "https://images.pexels.com/photos/1229456/pexels-photo-1229456.jpeg",
      "https://images.pexels.com/photos/12642256/pexels-photo-12642256.jpeg"
    ],
    category: "chargers",
    subcategory: "original",
    compatibility: ["Samsung"],
    features: ["25W Super Fast Charging", "Adaptive Fast Charging", "Official Samsung Product", "1-Year Warranty"],
    rating: 4.9,
    reviews: 425,
    inStock: true
  },
  {
    id: "headphones-wired-01",
    name: "Premium Wired Headphones",
    description: "High-fidelity wired headphones with balanced sound profile and comfortable over-ear design.",
    price: 120.01,
    images: [
      "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg",
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg"
    ],
    category: "audio",
    subcategory: "headphones",
    compatibility: ["Universal 3.5mm Jack"],
    features: ["High-Quality Sound", "Noise Isolation", "Comfortable Ear Cushions", "In-line Microphone"],
    rating: 4.5,
    reviews: 215,
    inStock: true
  },
  {
    id: "earphones-wireless-01",
    name: "True Wireless Earbuds",
    description: "Compact true wireless earbuds with premium sound quality and long battery life.",
    price: 599.99,
    discountPrice: 449.99,
    images: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
      "https://images.pexels.com/photos/3394660/pexels-photo-3394660.jpeg"
    ],
    category: "audio",
    subcategory: "wireless",
    compatibility: ["Universal Bluetooth"],
    features: ["Bluetooth 5.0", "Touch Controls", "20H Battery Life", "IPX4 Water Resistance"],
    rating: 4.7,
    reviews: 320,
    inStock: true,
    isNew: true,
    isFeatured: true
  },

  {
    id: "screen-dplus-01",
    name: "D+ Premium Screen Protector",
    description: "Advanced D+ screen protector with anti-blue light and privacy features.",
    price: 149.99,
    images: [
      "https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg",
      "https://images.pexels.com/photos/2643698/pexels-photo-2643698.jpeg"
    ],
    category: "protection",
    subcategory: "screen-protector",
    compatibility: ["iPhone", "Samsung Galaxy", "Google Pixel"],
    features: ["Privacy Filter", "Blue Light Filter", "Anti-Fingerprint", "Ultra-Clear"],
    rating: 4.8,
    reviews: 175,
    inStock: true,
    isNew: true
  },
  {
    id: "accessory-popsocket-01",
    name: "Premium PopSocket Grip",
    description: "Stylish and functional phone grip and stand for secure handling of your device.",
    price: 3999.99,
    images: [
      "https://images.pexels.com/photos/4846436/pexels-photo-4846436.jpeg",
      "https://images.pexels.com/photos/5386198/pexels-photo-5386198.jpeg"
    ],
    category: "accessories",
    subcategory: "grips",
    compatibility: ["Universal"],
    features: ["Collapsible Design", "Strong Adhesive", "Customizable Top", "Washable"],
    rating: 4.4,
    reviews: 230,
    inStock: true
  },
  {
    id: "accessory-holder-01",
    name: "Car Phone Holder",
    description: "Versatile car mount holder for secure placement of your phone while driving.",
    price: 799.99,
    discountPrice: 399.99,
    images: [
      "https://images.pexels.com/photos/3068059/pexels-photo-3068059.jpeg",
      "https://images.pexels.com/photos/6647367/pexels-photo-6647367.jpeg"
    ],
    category: "accessories",
    subcategory: "holders",
    compatibility: ["Universal"],
    features: ["Adjustable Grip", "Suction Cup Base", "360° Rotation", "One-Touch Operation"],
    rating: 4.5,
    reviews: 195,
    inStock: true
  },
  {
    id: "og-red-80w-charger",
    name: "OG Red 80W Charger",
    description: "High-power fast charger with 80W output for rapid device charging.",
    price: 599.99,
    images: [
      "/products-images/80w.png"
    ],
    discountPrice: 399.99,
    category: "chargers",
    subcategory: "high-power",
    compatibility: ["Samsung", "OnePlus", "Xiaomi"],
    features: ["80W Fast Charging", "Overcharge Protection", "Sleek Design"],
    rating: 4.7,
    reviews: 320,
    inStock: true,
    isFeatured: true
  },
  {
    id: "samsung-c-adapter",
    name: "Samsung C Adapter",
    description: "Official Samsung Type-C adapter for reliable and efficient charging.",
    price: 529.99,
    discountPrice: 419.99,
    images: [
      "/products-images/samsung-c.png"
    ],
    category: "adapters",
    subcategory: "type-c",
    compatibility: ["Samsung", "Google Pixel", "OnePlus"],
    features: ["Fast Charge Compatible", "Durable Build", "Compact Size"],
    rating: 4.6,
    reviews: 185,
    inStock: true,
    isFeatured: true
  },
  {
    id: "iphone-pd-adapter",
    name: "iPhone PD Adapter",
    description: "Power Delivery (PD) adapter for iPhone devices. Fast and safe charging.",
    price: 749.99,
    discountPrice: 599.99,
    images: [
      "/products-images/iphone.png"
    ],
    category: "adapters",
    subcategory: "pd",
    compatibility: ["iPhone 8+", "iPhone X", "iPhone 11", "iPhone 12"],
    features: ["20W PD Charging", "Safe Charging Chip", "Lightweight Design"],
    rating: 4.8,
    reviews: 270,
    inStock: true,
    isFeatured: true
  },
  {
    id: "3in1-magnetic-cable",
    name: "3-in-1 Magnetic Charging Cable",
    description: "Universal magnetic charging cable compatible with Type-C, Micro USB, and Lightning devices.",
    price: 399.99,
    discountPrice: 249.99,
    images: [
      "/products-images/magnetic.png"
    ],
    category: "cables",
    subcategory: "multi",
    compatibility: ["iPhone", "Samsung", "Huawei", "Oppo"],
    features: ["Magnetic Connector", "3-in-1 Compatibility", "Durable Nylon Braid"],
    rating: 4.4,
    reviews: 150,
    inStock: true,
    isFeatured: true
  },
  {
    id: "powerbank-2000w",
    name: "Power Bank 2000 Watt",
    description: "Ultra high-capacity power bank capable of powering laptops and high-wattage devices.",
    price: 1349.99,
    discountPrice: 999.99,
    images: [
      "/products-images/powerbank.png"
    ],
    category: "powerbanks",
    subcategory: "high-capacity",
    compatibility: ["Laptops", "Tablets", "Phones", "USB Devices"],
    features: ["2000W Output", "Multiple Ports", "Fast Charge Technology"],
    rating: 4.9,
    reviews: 98,
    inStock: true,
    isFeatured: true
  },
  {
    id: "selfie-stick",
    name: "Selfie Stick",
    description: "Extendable selfie stick with Bluetooth remote for capturing perfect shots.",
    price: 199.99,
    discountPrice: 49.99,
    images: [
      "/products-images/selfie.png"
    ],
    category: "accessories",
    subcategory: "selfie",
    compatibility: ["iPhone", "Samsung", "Android Phones"],
    features: ["Bluetooth Remote", "Adjustable Angle", "Compact Folding"],
    rating: 4.3,
    reviews: 220,
    inStock: true,
    isFeatured: true
  },
  {
    id: "white-border-glass",
    name: "White Border Glass",
    description: "Premium tempered glass with white border design for full-screen protection.",
    price: 150.00,
    discountPrice: 69.99,
    images: [
      "/products-images/white-glass.png"
    ],
    category: "protection",
    subcategory: "tempered-glass",
    compatibility: ["iPhone", "Samsung", "OnePlus"],
    features: ["9H Hardness", "White Border Design", "Anti-Scratch"],
    rating: 4.2,
    reviews: 310,
    inStock: true,
    isFeatured: true
  },
  // latest one
  {
    id: "pubg-fingertips",
    name: "PUBG Fingertips",
    description: "Sweat-proof and sensitive gaming fingertips for precise control in PUBG and other mobile games.",
    price: 40.05,
    images: [
      "/products-images/fingertips.png"
    ],
    category: "gaming",
    subcategory: "accessories",
    compatibility: ["All Smartphones"],
    features: ["Sweat-Proof", "High Sensitivity", "Breathable Fabric"],
    rating: 4.6,
    reviews: 145,
    inStock: true,
    isLatest: true
  },
  {
    id: "3-4a-car-charger",
    name: "3.4A Car Charger",
    description: "Fast charging car charger with dual USB ports delivering up to 3.4A output.",
    price: 279.99,
    images: [
      "/products-images/car-charger.png"
    ],
    category: "chargers",
    subcategory: "car",
    compatibility: ["Samsung", "iPhone", "Xiaomi", "OnePlus"],
    features: ["Dual USB Ports", "3.4A Fast Charging", "LED Indicator"],
    rating: 4.4,
    reviews: 180,
    inStock: true,
    isLatest: true
  },
  {
    id: "car-bluetooth-reader",
    name: "Car Bluetooth Reader",
    description: "Car Bluetooth receiver and audio adapter for wireless music and hands-free calls.",
    price: 150.99,
    images: [
      "/products-images/car-bluetooth.png"
    ],
    category: "accessories",
    subcategory: "bluetooth",
    compatibility: ["All Bluetooth-enabled Devices"],
    features: ["Wireless Audio", "Hands-Free Calls", "Plug & Play"],
    rating: 4.5,
    reviews: 210,
    inStock: true,
    isLatest: true
  },
  {
    id: "samsung-og-earphones",
    name: "Samsung OG Earphones",
    description: "Original Samsung in-ear wired earphones with clear sound and deep bass.",
    price: 180.99,
    images: [
      "/products-images/samsung-og-earphone.png"
    ],
    category: "audio",
    subcategory: "earphones",
    compatibility: ["Samsung", "All 3.5mm Jack Devices"],
    features: ["Original Sound Quality", "In-line Mic", "Comfortable Fit"],
    rating: 4.7,
    reviews: 250,
    inStock: true,
    isLatest: true
  },
  {
    id: "edge-matte-glass",
    name: "Edge Matte Glass",
    description: "Premium matte tempered glass with full edge protection and anti-glare finish.",
    price: 249.99,
    images: [
      "/products-images/edge-glass.png"
    ],
    category: "protection",
    subcategory: "matte",
    compatibility: ["iPhone", "Samsung", "OnePlus"],
    features: ["Matte Finish", "Full Edge Protection", "Anti-Fingerprint"],
    rating: 4.3,
    reviews: 195,
    inStock: true,
    isLatest: true
  },
  {
    id: "c-to-iphone-connector",
    name: "C to iPhone Connector/Cable",
    description: "Type-C to Lightning connector for fast charging and data transfer for iPhone devices.",
    price: 179.99,
    images: [
      "/products-images/iphone-c-cable.png"
    ],
    category: "cables",
    subcategory: "type-c-to-lightning",
    compatibility: ["iPhone", "iPad"],
    features: ["Fast Charge", "Durable Build", "Data Sync"],
    rating: 4.6,
    reviews: 160,
    inStock: true,
    isLatest: true
  },
  {
    id: "boat-og-headphone",
    name: "Boat OG Headphone",
    description: "Original Boat wired headphones with powerful bass and clear sound quality.",
    price: 799.99,
    images: [
      "/products-images/boat-og.png"
    ],
    category: "audio",
    subcategory: "headphones",
    compatibility: ["All 3.5mm Jack Devices"],
    features: ["Powerful Bass", "Comfortable Ear Cushions", "Built-in Mic"],
    rating: 4.5,
    reviews: 230,
    inStock: true,
    isLatest: true
  }
];

export const categories: CategoryInfo[] = [
  {
    name: "Chargers",
    slug: "chargers",
    description: "High-quality chargers from standard to original",
    image: "/category/chargers.png",
    link: "/products?category=chargers"
  },
  {
    name: "Cables",
    slug: "cables",
    description: "Durable cables for all your devices",
    image: "/category/cables.png",
    link: "/products?category=cables"
  },
  {
    name: "Audio",
    slug: "audio",
    description: "Premium headphones and wireless earbuds",
    image: "/category/audio.png",
    link: "/products?category=audio"

  },
  {
    name: "Protection",
    slug: "protection",
    description: "Screen protectors and cases for ultimate device safety",
    image: "/category/protection.png",
    link: "/products?category=protection"

  },
  {
    name: "Accessories",
    slug: "accessories",
    description: "Essential accessories to enhance your mobile experience",
    image: "/category/accessories.png",
    link: "/products"

  },
  {
    name: "Mobile Parts",
    slug: "accessories",
    description: "Original spare parts for phone repairs and replacements",
    image: "/category/repair.png",
    link: "/repair"

  },
  {
    name: "SIM & Recharge Services",
    slug: "sim",
    description: "Buy new SIM cards and recharge your mobile easily",
    image: "/category/sim.png",
    link: "/recharges"

  },
  {
    name: "Used / Exchange Phones",
    slug: "mobile",
    description: "Affordable pre-owned phones and great exchange offers",
    image: "/category/refurbished.png",
    link: "/used-phone?retailers=4588dfg88e55r5"
  },
  {
    name: "Repair & Services",
    slug: "accessories",
    description: "Expert mobile phone repairs and maintenance services",
    image: "/category/repair.png",
    link: "/repair"
  }
];


export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "iPhone User",
    content: "The premium screen protector saved my phone during a nasty drop. Worth every penny!",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Samsung Galaxy Owner",
    content: "These wireless earbuds have amazing sound quality and battery life. Better than the big brands!",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
  },
  {
    id: 3,
    name: "Emma Watson",
    role: "Tech Enthusiast",
    content: "I've tried many chargers, and the premium fast charger is by far the best. My phone charges in minutes!",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
  }
]; 


// Export the array with the type
export const repairVideos: RepairVideoType[] = [
  {
    id: 'battery',
    name: 'Battery Replacement',
    description: 'Step-by-step guide to replacing your smartphone battery',
    videoUrl: 'https://tsvoqnwwdslkzjlpgmkv.supabase.co/storage/v1/object/public/repair-bucket/Untitled%20folder/battery-replacement.mp4',
    thumbnail: '/repair-thumbnails/battery-thumb.jpg',
    difficulty: 'Medium',
    timeEstimate: '20-30 mins',
    toolsRequired: ['Pry tool', 'Screwdriver', 'New battery'],
    note: 'Useful when battery drains quickly or doesn’t charge.',
    price : "800-2000",
    options : ["if user has double couted battery should be price high ","mostly like above OnPlus 6t , and samsung New Series, or etc"],
    reasons: [
      'Battery drains too fast',
      'Device shuts down randomly',
      'Phone doesn’t charge at all',
      'Battery swelling or overheating'
    ],
  },
  {
    id: 'mic',
    name: 'Microphone Repair',
    description: 'Fix microphone not working issues',
    videoUrl: 'https://tsvoqnwwdslkzjlpgmkv.supabase.co/storage/v1/object/public/repair-bucket/Untitled%20folder/mic-repair.mp4',
    thumbnail: '/repair-thumbnails/mic-thumb.jpg',
    difficulty: 'Hard',
    timeEstimate: '30-45 mins',
    toolsRequired: ['Pry tool', 'Tweezers', 'Replacement mic'],
    note: 'Fix if the other person can’t hear you on calls.',
    reasons: [
      'People can’t hear you on calls',
      'Voice recording not working',
      'Mic muffled or low sound',
      'Voice commands not detected'
    ],
    price : "150 - 350",
    options : ["350 Rs For Android ", "Keypad any Phone Should be Done by 150-120"]
  },
  {
    id: 'motherboard',
    name: 'Motherboard Repair',
    description: 'Advanced motherboard troubleshooting and repair',
    videoUrl: 'https://tsvoqnwwdslkzjlpgmkv.supabase.co/storage/v1/object/public/repair-bucket/Untitled%20folder/mother-board-repair.mp4',
    thumbnail: '/repair-thumbnails/motherboard-thumb.jpg',
    difficulty: 'Expert',
    timeEstimate: '1-2 hours',
    toolsRequired: ['Soldering iron', 'Multimeter', 'Microscope'],
    note: 'Only attempt if you’re experienced or have the right equipment.',
    price :" 600-3000",
    options : [
      "if Mobile On there gaining another any issue then it could be done by 600 or lower","if mobile Full dead not any reaction then it might be 800-1200", "if totally need to replace motherboard then should be more that 2000 "
    ],
    reasons: [
      'Phone doesn’t turn on at all',
      'No display or boot loop issue',
      'Overheating even when idle',
      'Frequent app crashes or freezing'
    ]
  },
  {
    id: 'power-button',
    name: 'Power Button Replacement',
    description: 'Replace faulty power/lock button',
    videoUrl: 'https://tsvoqnwwdslkzjlpgmkv.supabase.co/storage/v1/object/public/repair-bucket/Untitled%20folder/power-volume-out-button.mp4',
    thumbnail: '/repair-thumbnails/power-button-thumb.jpg',
    difficulty: 'Medium',
    timeEstimate: '15-25 mins',
    toolsRequired: ['Pry tool', 'Screwdriver', 'Replacement button'],
    note: 'Helpful if your phone doesn’t turn on/off properly.',
    reasons: [
      'Power button unresponsive',
      'Device doesn’t lock/sleep',
      'Button stuck or loose',
      'Inconsistent response on press'
    ],
    price : "150-450",
    options : ["if key pad phones any button will replace by 100","if SmartPhone seperated Fingersensor (inside button available) it might be 150", "if With Sensor should be might 300-450 between","if consigned three at one strip it should done by only 150"],
  },
  {
    id: 'volume-button',
    name: 'Volume Button Replacement',
    description: 'Fix unresponsive volume buttons',
    videoUrl: 'https://tsvoqnwwdslkzjlpgmkv.supabase.co/storage/v1/object/public/repair-bucket/Untitled%20folder/power-volume-out-button.mp4',
    thumbnail: '/repair-thumbnails/volume-button-thumb.jpg',
    difficulty: 'Medium',
    timeEstimate: '15-25 mins',
    toolsRequired: ['Pry tool', 'Screwdriver', 'Replacement buttons'],
    note: 'Use this guide if your volume buttons are stuck or unresponsive.',
    price : "150",
    options : ["if consigned three at one strip it should done by only 150","if Seperated also done by 150"],
    reasons: [
      'Volume button stuck or broken',
      'Can’t increase or decrease volume',
      'Button doesn’t click',
      'Sound stuck on mute or max'
    ]
  },
  {
    id: 'screen',
    name: 'Screen Replacement',
    description: 'Complete display assembly replacement guide',
    videoUrl: 'https://tsvoqnwwdslkzjlpgmkv.supabase.co/storage/v1/object/public/repair-bucket/Untitled%20folder/screen-replacement.mp4',
    thumbnail: '/repair-thumbnails/screen-thumb.jpg',
    difficulty: 'Medium',
    timeEstimate: '30-45 mins',
    toolsRequired: ['Pry tools', 'Screwdriver', 'New screen'],
    note: 'Perfect for broken, cracked, or unresponsive screens.',
    price : "800-2500",
    options : ["if Lcd Screen it might be 800-1200","if there screen Finger Display might be 1200-1800", "If Originated Display but just Few cracks it might be done under 800","50–50 chance to keep your original display if touch glass is removed safely","If not, full display replacement needed"],
    reasons: [
      'Cracked or shattered screen',
      'Touch not working',
      'Display flickering or blacked out',
      'Dead pixels or discoloration'
    ]
  },
  {
    id: 'speaker',
    name: 'Speaker Replacement',
    description: 'Replace faulty earpiece or loudspeaker',
    videoUrl: 'https://tsvoqnwwdslkzjlpgmkv.supabase.co/storage/v1/object/public/repair-bucket/Untitled%20folder/speaker-replacement.mp4',
    thumbnail: '/repair-thumbnails/speaker-thumb.jpg',
    difficulty: 'Medium',
    timeEstimate: '20-30 mins',
    toolsRequired: ['Pry tool', 'Tweezers', 'Replacement speaker'],
    note: 'Fix distorted or no sound from speaker.',
    reasons: [
      'No sound from speaker',
      'Sound is distorted or crackling',
      'Speaker works only with headphones',
      'Low volume even at max setting'
    ],
    price : "150-350",
    options : ["if keyPad Handset Done by 150","if U diding hearing anything might be 200","if hearing but speaker not clear blur it would fully replaced by 350"],
  },
  {
    id: 'water-damage',
    name: 'Water Damage Repair',
    description: 'Emergency water damage treatment guide',
    videoUrl: 'https://tsvoqnwwdslkzjlpgmkv.supabase.co/storage/v1/object/public/repair-bucket/Untitled%20folder/water-damange-repair.mp4',
    thumbnail: '/repair-thumbnails/water-thumb.jpg',
    difficulty: 'Hard',
    timeEstimate: '45-60 mins',
    toolsRequired: ['Isopropyl alcohol', 'Ultrasonic cleaner', 'Brass brush'],
    note: 'Must try immediately after water exposure. Remove battery if possible.',
    price : "200-1500",
    options : ["if mobile once on then after that not any movement it would be done by above 600-800","if normal Issue without damaging or replacing iC it should be 300(as a service charge)", "if normal battery Boost some low level service done by 200", "if any Ic Damage not sure to repair if repaired Might be 600-800", 'if not responfing Mobile Phone it might be Dead.',"it done by Under MotherBoard Repair Conditions"],
    reasons: [
      'Phone dropped in water',
      'Screen not turning on after water',
      'Random restarts or freezing',
      'Corrosion signs or discoloration inside'
    ]
  }
];

export const offersCarousel = [
  {
    image: "https://tsvoqnwwdslkzjlpgmkv.supabase.co/storage/v1/object/public/repair-bucket/offers-page/big-sale-retail-with-presents-card.jpg",
    href: "#",
    alt: "Big sale retail with presents card"
  },
  {
    image: "https://tsvoqnwwdslkzjlpgmkv.supabase.co/storage/v1/object/public/repair-bucket/offers-page/cyber-monday-celebration.jpg",
    href: "#",
    alt: "Cyber Monday celebration"
  },
  {
    image: "https://tsvoqnwwdslkzjlpgmkv.supabase.co/storage/v1/object/public/repair-bucket/offers-page/image%209.png",
    href: "#",
    alt: "Special offer"
  },
  {
    image: "https://tsvoqnwwdslkzjlpgmkv.supabase.co/storage/v1/object/public/repair-bucket/offers-page/maxresdefault.jpg",
    href: "#",
    alt: "Exclusive deal"
  },
  {
    image: "https://tsvoqnwwdslkzjlpgmkv.supabase.co/storage/v1/object/public/repair-bucket/offers-page/offer1.jpg",
    href: "#",
    alt: "Limited time offer"
  },
  {
    image: "https://tsvoqnwwdslkzjlpgmkv.supabase.co/storage/v1/object/public/repair-bucket/offers-page/offer8.jpg",
    href: "#",
    alt: "Discount promotion"
  },
  {
    image: "https://tsvoqnwwdslkzjlpgmkv.supabase.co/storage/v1/object/public/repair-bucket/offers-page/Port-Airtel-to-Jio.jpg",
    href: "#",
    alt: "Port Airtel to Jio offer"
  },
  {
    image: "https://tsvoqnwwdslkzjlpgmkv.supabase.co/storage/v1/object/public/repair-bucket/offers-page/sale-with-special-discount-headphones.jpg",
    href: "#",
    alt: "Headphones sale with special discount"
  },
  {
    image: "https://tsvoqnwwdslkzjlpgmkv.supabase.co/storage/v1/object/public/repair-bucket/offers-page/single-s-day-banner-with-clock.jpg",
    href: "#",
    alt: "Single's day banner with clock"
  }
]

export const itemsOffer = [
  {
    image: "/category/accessories.png",
    href: "#",
    alt: "Mobile accessories collection"
  },
  {
    image: "/category/chargers.png",
    href: "#",
    alt: "Fast chargers and power adapters"
  },
  {
    image: "/category/audio.png",
    href: "#",
    alt: "Premium audio devices and headphones"
  },
  {
    image: "/category/refurbished.png",
    href: "#",
    alt: "Certified refurbished devices"
  },
  {
    image: "/category/sim.png",
    href: "#",
    alt: "SIM cards and mobile plans"
  }
];

export const mockShopsData: ShopData[] = [
  {
    id: "shop-001",
    name: "Mobile Hub Express",
    address: "32, MG Road, Bengaluru, Karnataka 560001",
    rating: 4.4,
    user_ratings_total: 250,
    open_now: true,
    location: { lat: 12.9756, lng: 77.6052 },
    types: ["electronics_store", "mobile_store", "repair_service"],
    photos: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308"
    ],
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/electronics-71.png",
    isSponsered: true,
    maps_url: "https://maps.google.com/?q=12.9756,77.6052"
  },
  {
    id: "shop-002",
    name: "QuickFix Mobile Repairs",
    address: "11, 4th Cross, HSR Layout, Bengaluru 560102",
    rating: 4.8,
    user_ratings_total: 420,
    open_now: false,
    location: { lat: 12.9116, lng: 77.6192 },
    types: ["repair_service", "mobile_store"],
    photos: [
      "https://images.unsplash.com/photo-1464983953574-0892a716854b"
    ],
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/repair-71.png",
    isSponsered: false,
    maps_url: "https://maps.google.com/?q=12.9116,77.6192"
  },
  {
    id: "shop-003",
    name: "iGadget World",
    address: "245, Commercial St, Shivaji Nagar, Bengaluru 560001",
    rating: 4.0,
    user_ratings_total: 87,
    open_now: true,
    location: { lat: 12.9848, lng: 77.6089 },
    types: ["electronics_store", "accessories_store"],
    photos: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    ],
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    isSponsered: false,
    maps_url: "https://maps.google.com/?q=12.9848,77.6089"
  },
  {
    id: "shop-004",
    name: "Sparx Mobiles & Services",
    address: "5, ITPL Main Rd, Whitefield, Bengaluru 560066",
    rating: 4.6,
    user_ratings_total: 114,
    open_now: true,
    location: { lat: 12.9719, lng: 77.7500 },
    types: ["mobile_store", "repair_service"],
    photos: [
      "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1"
    ],
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/mobile-71.png",
    isSponsered: true,
    maps_url: "https://maps.google.com/?q=12.9719,77.7500"
  },
  {
    id: "shop-005",
    name: "City Center Electronics",
    address: "3, Brigade Rd, Ashok Nagar, Bengaluru 560025",
    rating: 3.9,
    user_ratings_total: 67,
    open_now: false,
    location: { lat: 12.9717, lng: 77.6065 },
    types: ["electronics_store"],
    photos: [],
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/electronics-71.png",
    isSponsered: false,
    maps_url: "https://maps.google.com/?q=12.9717,77.6065"
  }
];
import { v4 as uuidv4 } from 'uuid';
export const mockerOrdersData: Order[] = [
    // === REPAIR orders unchanged ===
    {
        id: 'R-10187',
        productName: 'Samsung A12 5G',
        category: 'repair',
        status: 'in-progress',
        orderDate: 'Jul 27, 2025, 02:45 PM',
        issue: 'Back Camera not focusing',
        shopData: mockShopsData[0],
        image: '📱',
        progress: 60,
        color: '#568F87',
        price: 450
    },
    {
        id: 'R-10188',
        productName: 'iPhone 13 Pro',
        category: 'repair',
        status: 'completed',
        orderDate: 'Jul 26, 2025, 11:30 AM',
        issue: 'Screen replacement',
        image: '📱',
        progress: 100,
        color: '#DFF7DD', // Light Mint Green for repair & completed
        price: 1200,
        shopData: mockShopsData[0],

    },

    // === ACCESSORIES orders UPDATED with "items" arrays ===
    {
        id: 'A-10189',
        productName: 'Mobile Accessory',
        category: 'accessories',
        status: 'completed',
        orderDate: 'Jul 25, 2025, 06:25 PM',
        location: 'Koramangala Bengaluru', //shop location if delivery home to the users location
        price: 202, // total after discounts
        quantity: 2,
        image: '🔌',
        shopData: mockShopsData[1],
        progress: 100,
        delivery: "in-shop",
        color: '#FFF3D6', // Soft Light Yellow for accessories & completed
        items: [
            { id: products[0].id + uuidv4(), item: products[0], quantity: 1, totalPrice: products[0].price * 1 },
            { id: products[1].id + uuidv4(), item: products[1], quantity: 1, totalPrice: products[1].price * 1 },
            { id: products[0].id + uuidv4(), item: products[0], quantity: 1, totalPrice: products[0].price * 1 },
            { id: products[0].id + uuidv4(), item: products[0], quantity: 1, totalPrice: products[0].price * 1 },
        ],
    },
    {
        id: 'A-10190',
        productName: 'Mobile Accessory',
        category: 'accessories',
        status: 'in-progress',
        orderDate: 'Jul 24, 2025, 03:15 PM',
        location: 'Electronic City Bengaluru',
        price: 24900, // total after discounts
        quantity: 3,
        image: '🎧',
        progress: 30,
        shopData: mockShopsData[0],
        delivery: "home-delivery",
        color: '#D0F0FF', // Very Light Blue for accessories & in-progress
        items: [
            { id: products[0].id + uuidv4(), item: products[0], quantity: 1, totalPrice: products[0].price * 1 },
            { id: products[1].id + uuidv4(), item: products[1], quantity: 1, totalPrice: products[1].price * 1 },
            { id: products[0].id + uuidv4(), item: products[0], quantity: 1, totalPrice: products[0].price * 1 },
            { id: products[0].id + uuidv4(), item: products[0], quantity: 1, totalPrice: products[0].price * 1 },
        ],
    },

    // === REPAIR orders unchanged ===
    {
        id: 'R-10191',
        productName: 'Samsung Galaxy S23',
        category: 'repair',
        status: 'cancelled',
        orderDate: 'Jul 23, 2025, 09:20 AM',
        issue: 'Battery replacement',

        image: '📱',
        progress: 0,
        price: 700,
        shopData: mockShopsData[0],
        color: '#FDDDDD' // Soft Pink/Light Red for cancelled
    },
    {
        id: 'R-10192',
        productName: 'Samsung Galaxy S23',
        category: 'repair',
        status: 'shipping-soon',
        orderDate: 'Jul 23, 2025, 09:20 AM',
        issue: 'Battery replacement',
        shopData: mockShopsData[0],
        image: '📱',
        progress: 0,
        price: 1200,
        color: '#D9EAF7' // Very Light Blue Gray for shipping soon
    }
];


export  const tabs = [
    { key: "all", label: "All Orders", count: mockerOrdersData.length },
    { key: "in-progress", label: "In-Progress", count: mockerOrdersData.filter(o => o.status === "in-progress").length },
    { key: "completed", label: "Completed", count: mockerOrdersData.filter(o => o.status === "completed").length },
    { key: "cancelled", label: "Cancelled", count: mockerOrdersData.filter(o => o.status === "cancelled").length },
];

export const orderCategory: OptionPickerCategory[] = [
    { id: "all", label: "All", icon: Grid },
    { id: "repair", label: "Repair", icon: Smartphone },
    { id: "accessories", label: "Accessories", icon: Headphones },
];




// Map status to step key for Stepper (should match StepItem keys above)
export const statusToStepKey: Record<string, StepItem['key']> = {
    'in-progress': 'preparing',
    'shipping-soon': 'shipping-soon',
    'out-for-delivery': 'out-for-delivery',
    'completed': 'completed',
    'cancelled': 'cancelled', // For cancelled, will render "Cancelled" label at last visible step
};