import { Property, Article } from '@/types';

// Real Cyprus property data based on market research
export const mockProperties: Omit<Property, '_id'>[] = [
  {
    title: "Luxury Beachfront Villa in Limassol",
    titleHe: "וילת יוקרה על חוף הים בלימסול",
    price: 850000,
    priceILS: 3187500,
    location: {
      city: "Limassol",
      cityHe: "לימסול",
      area: "Tourist Area",
      areaHe: "אזור תיירות",
      coordinates: [34.707817, 33.022469]
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      sqm: 280,
      pool: true,
      garden: true,
      parking: true,
      seaview: true
    },
    description: "Stunning beachfront villa with panoramic sea views. Features modern architecture, private pool, and direct beach access. Perfect for Israeli investors seeking luxury Mediterranean lifestyle.",
    descriptionHe: "וילת חוף מהממת עם נוף פנורמי לים. כוללת ארכיטקטורה מודרנית, בריכה פרטית וגישה ישירה לחוף. מושלם למשקיעים ישראלים המחפשים אורח חיים ים תיכוני יוקרתי.",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
    ],
    roi: {
      rentalYield: 5.2,
      appreciation: 8.3
    },
    propertyType: "villa",
    propertyTypeHe: "וילה",
    slug: "luxury-beachfront-villa-limassol",
    createdAt: new Date(),
    published: true,
    source: "n8n-automation"
  },
  {
    title: "Modern Penthouse in Paphos Marina",
    titleHe: "פנטהאוז מודרני במרינה של פאפוס",
    price: 550000,
    priceILS: 2062500,
    location: {
      city: "Paphos",
      cityHe: "פאפוס",
      area: "Paphos Marina",
      areaHe: "מרינה פאפוס",
      coordinates: [34.755291, 32.408562]
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      sqm: 180,
      pool: true,
      parking: true,
      seaview: true
    },
    description: "Contemporary penthouse overlooking the prestigious Paphos Marina. High-end finishes, roof terrace, and access to marina facilities. Excellent rental potential for Israeli tourists.",
    descriptionHe: "פנטהאוז עכשווי המשקיף על מרינה היוקרתית של פאפוס. גימורים יוקרתיים, מרפסת גג וגישה למתקני המרינה. פוטנציאל השכרה מצוין לתיירים ישראלים.",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
    ],
    roi: {
      rentalYield: 6.1,
      appreciation: 6.8
    },
    propertyType: "penthouse",
    propertyTypeHe: "פנטהאוז",
    slug: "modern-penthouse-paphos-marina",
    createdAt: new Date(),
    published: true,
    source: "n8n-automation"
  },
  {
    title: "Investment Apartment in Larnaca Center",
    titleHe: "דירת השקעה במרכז לרנקה",
    price: 185000,
    priceILS: 693750,
    location: {
      city: "Larnaca",
      cityHe: "לרנקה",
      area: "City Center",
      areaHe: "מרכז העיר",
      coordinates: [34.916641, 33.629456]
    },
    features: {
      bedrooms: 2,
      bathrooms: 1,
      sqm: 85,
      parking: true
    },
    description: "Prime location apartment near Larnaca's famous Finikoudes Beach. Walking distance to shops, restaurants, and the airport. Perfect starter investment with strong rental demand.",
    descriptionHe: "דירה במיקום מעולה ליד חוף פיניקודס המפורסם של לרנקה. במרחק הליכה מחנויות, מסעדות ושדה התעופה. השקעה מושלמת לתחילת דרך עם ביקוש חזק להשכרה.",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7"
    ],
    roi: {
      rentalYield: 7.2,
      appreciation: 11.0
    },
    propertyType: "apartment",
    propertyTypeHe: "דירה",
    slug: "investment-apartment-larnaca-center",
    createdAt: new Date(),
    published: true,
    source: "n8n-automation"
  },
  {
    title: "Traditional Stone Villa in Troodos Mountains",
    titleHe: "וילת אבן מסורתית בהרי טרודוס",
    price: 320000,
    priceILS: 1200000,
    location: {
      city: "Troodos",
      cityHe: "טרודוס",
      area: "Mountain Village",
      areaHe: "כפר הררי",
      coordinates: [34.923889, 32.877778]
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      sqm: 150,
      garden: true,
      parking: true
    },
    description: "Charming restored stone villa in the picturesque Troodos Mountains. Cool summer retreat with authentic Cypriot character. Ideal for vacation rentals and personal getaways.",
    descriptionHe: "וילת אבן מקסימה משוחזרת בהרי טרודוס הציוריים. מפלט קיץ קריר עם אופי קפריסאי אותנטי. אידיאלי להשכרת נופש ובריחות אישיות.",
    images: [
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde"
    ],
    roi: {
      rentalYield: 4.8,
      appreciation: 5.5
    },
    propertyType: "villa",
    propertyTypeHe: "וילה",
    slug: "traditional-stone-villa-troodos",
    createdAt: new Date(),
    published: true,
    source: "n8n-automation"
  },
  {
    title: "New Development in Nicosia Business District",
    titleHe: "פרויקט חדש ברובע העסקים של ניקוסיה",
    price: 280000,
    priceILS: 1050000,
    location: {
      city: "Nicosia",
      cityHe: "ניקוסיה",
      area: "Business District",
      areaHe: "רובע עסקים",
      coordinates: [35.185566, 33.382869]
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      sqm: 110,
      pool: true,
      parking: true
    },
    description: "Brand new apartment in Cyprus's capital. Modern amenities, energy-efficient design, and close to international companies. Perfect for corporate rentals and long-term appreciation.",
    descriptionHe: "דירה חדשה לגמרי בבירת קפריסין. שירותים מודרניים, עיצוב חסכוני באנרגיה וקרוב לחברות בינלאומיות. מושלם להשכרה תאגידית והערכת שווי לטווח ארוך.",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0"
    ],
    roi: {
      rentalYield: 5.8,
      appreciation: 4.6
    },
    propertyType: "apartment",
    propertyTypeHe: "דירה",
    slug: "new-development-nicosia-business",
    createdAt: new Date(),
    published: true,
    source: "n8n-automation"
  },
  {
    title: "Golf Course Villa in Secret Valley",
    titleHe: "וילה במגרש גולף בעמק הסודי",
    price: 675000,
    priceILS: 2531250,
    location: {
      city: "Paphos",
      cityHe: "פאפוס",
      area: "Secret Valley Golf",
      areaHe: "עמק הסודי גולף",
      coordinates: [34.723889, 32.514444]
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      sqm: 240,
      pool: true,
      garden: true,
      parking: true
    },
    description: "Exclusive villa overlooking championship golf course. Quiet gated community with 24/7 security. Premium location attracting affluent international buyers and renters.",
    descriptionHe: "וילה אксקלוסיבית המשקיפה על מגרש גולף אליפות. קהילה שקטה מגודרת עם אבטחה 24/7. מיקום פרימיום המושך קונים ושוכרים בינלאומיים אמידים.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea"
    ],
    roi: {
      rentalYield: 4.5,
      appreciation: 7.2
    },
    propertyType: "villa",
    propertyTypeHe: "וילה",
    slug: "golf-course-villa-secret-valley",
    createdAt: new Date(),
    published: true,
    source: "n8n-automation"
  }
];

export const mockArticles: Omit<Article, '_id'>[] = [
  {
    title: "Why Israeli Investors Choose Cyprus Real Estate in 2025",
    titleHe: "למה משקיעים ישראלים בוחרים בנדל\"ן בקפריסין ב-2025",
    content: `Cyprus has become a top destination for Israeli real estate investors, and for good reason. The proximity to Israel (just 45 minutes by flight), favorable tax regime, and strong rental yields make it an attractive option.

Key advantages include:
- 12.5% corporate tax rate (one of the lowest in EU)
- No inheritance tax
- Strong rental market with yields of 5-7%
- Path to EU citizenship through investment
- Similar climate and Mediterranean lifestyle
- Large Israeli expat community

The Cyprus property market showed 8.3% annual growth in 2024, with particularly strong performance in Limassol (11% for apartments) and Larnaca. The government's relocation policy for international companies has created sustained demand.`,
    contentHe: `קפריסין הפכה ליעד מוביל למשקיעי נדל"ן ישראלים, ולא בכדי. הקרבה לישראל (45 דקות טיסה בלבד), משטר המס המשתלם ותשואות ההשכרה החזקות הופכים אותה לאופציה אטרקטיבית.

יתרונות מרכזיים כוללים:
- שיעור מס חברות של 12.5% (אחד הנמוכים באיחוד האירופי)
- ללא מס ירושה
- שוק השכרה חזק עם תשואות של 5-7%
- מסלול לאזרחות אירופית באמצעות השקעה
- אקלים דומה ואורח חיים ים תיכוני
- קהילת ישראלים גדולה

שוק הנדל"ן בקפריסין הראה צמיחה שנתית של 8.3% ב-2024, עם ביצועים חזקים במיוחד בלימסול (11% לדירות) ובלרנקה. מדיניות הממשלה להעברת חברות בינלאומיות יצרה ביקוש מתמשך.`,
    category: "investment-guide",
    categoryHe: "מדריך השקעה",
    slug: "why-israeli-investors-choose-cyprus-2025",
    excerpt: "Discover why Cyprus is becoming the #1 choice for Israeli real estate investors with strong returns and tax benefits.",
    excerptHe: "גלה למה קפריסין הופכת לבחירה מספר 1 למשקיעי נדל\"ן ישראלים עם תשואות חזקות והטבות מס.",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    createdAt: new Date(),
    published: true
  },
  {
    title: "Cyprus Property Tax Guide for Israeli Buyers 2025",
    titleHe: "מדריך מיסוי נכסים בקפריסין לקונים ישראלים 2025",
    content: `Understanding Cyprus property taxes is crucial for Israeli investors. Here's a comprehensive breakdown:

**Purchase Taxes:**
- Transfer Tax: 3-8% depending on property value (under €85k: 3%, €85-170k: 5%, over €170k: 8%)
- Stamp Duty: 0.15-0.2% of property value
- VAT: 19% on new properties (reduced to 5% for first home under €475k)

**Ongoing Costs:**
- No annual property tax (abolished in 2017)
- Capital gains tax: 20% on profit when selling
- Rental income tax: 0-35% progressive rate

**Tax Planning Tips:**
Israeli residents must report Cyprus property income to Israeli tax authorities but can claim foreign tax credits to avoid double taxation. Consider structuring purchase through Cyprus company for additional tax benefits.

Compared to Israel's high property taxes (arnona + purchase tax), Cyprus offers significant savings for investors.`,
    contentHe: `הבנת מיסוי נכסים בקפריסין היא חיונית למשקיעים ישראלים. הנה פירוט מקיף:

**מיסי רכישה:**
- מס העברה: 3-8% בהתאם לשווי הנכס (מתחת ל-85 אלף €: 3%, 85-170 אלף €: 5%, מעל 170 אלף €: 8%)
- מס בולים: 0.15-0.2% משווי הנכס
- מע"מ: 19% על נכסים חדשים (מופחת ל-5% לדירה ראשונה מתחת ל-475 אלף €)

**עלויות שוטפות:**
- אין מס רכוש שנתי (בוטל ב-2017)
- מס רווח הון: 20% על רווח במכירה
- מס הכנסה מהשכרה: 0-35% שיעור פרוגרסיבי

**טיפים לתכנון מס:**
תושבי ישראל חייבים לדווח על הכנסה מנכסים בקפריסין לרשויות המס בישראל אך יכולים לתבוע זיכוי מס זר כדי למנוע כפל מס. שקלו לבנות את הרכישה דרך חברה קפריסאית להטבות מס נוספות.

בהשוואה למסי הרכוש הגבוהים של ישראל (ארנונה + מס רכישה), קפריסין מציעה חיסכון משמעותי למשקיעים.`,
    category: "legal",
    categoryHe: "משפטי",
    slug: "cyprus-property-tax-guide-israeli-buyers",
    excerpt: "Complete tax guide for Israeli investors buying Cyprus property - understand all costs and save money.",
    excerptHe: "מדריך מס מלא למשקיעים ישראלים הרוכשים נכסים בקפריסין - הבינו את כל העלויות וחסכו כסף.",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c",
    createdAt: new Date(),
    published: true
  }
];
