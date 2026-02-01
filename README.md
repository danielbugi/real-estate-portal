# 🏖️ Cyprus Real Estate Investment Platform
## נדל"ן יוקרתי בקפריסין - פלטפורמת השקעות

A luxury real estate investment website for Israeli investors looking to invest in Cyprus properties. Built with Next.js 14, MongoDB, and automated content generation via n8n.

## ✨ Features

### 🎨 Design
- **Luxury Color Palette**: Ocean blue, gold, and brown
- **Hebrew RTL Support**: Full right-to-left layout
- **Parallax Effects**: Smooth scrolling animations
- **Glass Morphism**: Modern glassmorphic UI elements
- **Responsive Design**: Mobile-first approach

### 🏠 Property Showcase
- Property cards with images, specs, and ROI data
- Real Cyprus market data integration
- Filter by city, price, bedrooms, property type
- Automatic currency conversion (EUR ↔ ILS)

### 📚 Content Management
- Investment guides and market analysis articles
- Automated content creation via n8n
- Real-time data from Cyprus property market

### 🔗 n8n Integration
- Webhook endpoint for automated content posting
- Supports both properties and articles
- Secure authentication with webhook secrets

### 📊 Lead Generation
- Contact form with MongoDB storage
- Budget selection and interest tracking
- Ready for email/CRM integration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free tier)
- n8n instance (optional, for automation)

### Installation

1. **Clone or download the project**
```bash
cd cyprus-invest
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create `.env.local` file:
```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/cyprus_invest?retryWrites=true&w=majority

# n8n Webhook Security
N8N_WEBHOOK_SECRET=your-super-secret-key-here
```

4. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:3000` 🎉

## 📦 MongoDB Setup

### 1. Create Free MongoDB Atlas Account
- Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
- Sign up for free (512MB free tier)
- Create a new cluster

### 2. Get Connection String
- Click "Connect" → "Connect your application"
- Copy the connection string
- Replace `<username>` and `<password>` with your credentials

### 3. Database Structure

The app automatically creates these collections:

**properties**
```javascript
{
  title: "Luxury Villa",
  titleHe: "וילת יוקרה",
  price: 500000,
  priceILS: 1875000,
  location: { city, cityHe, area, areaHe, coordinates },
  features: { bedrooms, bathrooms, sqm, pool, seaview },
  description: "...",
  descriptionHe: "...",
  images: ["url1", "url2"],
  roi: { rentalYield: 5.5, appreciation: 7.0 },
  propertyType: "villa",
  slug: "luxury-villa-limassol",
  createdAt: Date,
  published: true
}
```

**articles**
```javascript
{
  title: "Investment Guide",
  titleHe: "מדריך השקעה",
  content: "...",
  contentHe: "...",
  category: "investment-guide",
  slug: "investment-guide",
  excerpt: "...",
  readTime: 5,
  createdAt: Date,
  published: true
}
```

**leads**
```javascript
{
  name: "...",
  email: "...",
  phone: "...",
  budget: "300-500k",
  message: "...",
  createdAt: Date
}
```

## 🤖 n8n Automation Setup

### n8n Workflow Example

1. **Create n8n workflow** with these nodes:

```
[Schedule Trigger] (Every 6 hours)
    ↓
[HTTP Request] (Fetch Cyprus property data)
    ↓
[Function] (Process & translate data)
    ↓
[HTTP Request] POST to your-domain.vercel.app/api/content
    Headers: {
      "x-webhook-secret": "your-secret",
      "Content-Type": "application/json"
    }
    Body: {
      "type": "property",
      "content": { ...property data }
    }
    ↓
[Telegram] (Success notification)
```

### Webhook Request Format

**Create Property:**
```bash
curl -X POST https://your-domain.vercel.app/api/content \
  -H "x-webhook-secret: your-secret" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "property",
    "content": {
      "title": "Modern Villa in Limassol",
      "titleHe": "וילה מודרנית בלימסול",
      "price": 450000,
      "priceILS": 1687500,
      "location": {
        "city": "Limassol",
        "cityHe": "לימסול",
        "area": "Tourist Area",
        "areaHe": "אזור תיירות",
        "coordinates": [34.707817, 33.022469]
      },
      "features": {
        "bedrooms": 3,
        "bathrooms": 2,
        "sqm": 180,
        "pool": true,
        "seaview": true
      },
      "description": "Beautiful modern villa...",
      "descriptionHe": "וילה מודרנית מהממת...",
      "images": [
        "https://images.unsplash.com/photo-1..."
      ],
      "roi": {
        "rentalYield": 6.2,
        "appreciation": 8.5
      },
      "propertyType": "villa",
      "propertyTypeHe": "וילה",
      "slug": "modern-villa-limassol"
    }
  }'
```

**Create Article:**
```bash
curl -X POST https://your-domain.vercel.app/api/content \
  -H "x-webhook-secret: your-secret" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "article",
    "content": {
      "title": "Cyprus Tax Benefits 2025",
      "titleHe": "הטבות מס בקפריסין 2025",
      "content": "Full article content here...",
      "contentHe": "תוכן מאמר מלא כאן...",
      "category": "legal",
      "categoryHe": "משפטי",
      "slug": "cyprus-tax-benefits-2025",
      "excerpt": "Learn about tax benefits...",
      "excerptHe": "למדו על הטבות מס...",
      "readTime": 7,
      "image": "https://images.unsplash.com/..."
    }
  }'
```

## 🌐 Deployment

### Deploy to Vercel (Free)

1. **Push code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your-repo-url
git push -u origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Add environment variables (MONGODB_URI, N8N_WEBHOOK_SECRET)
- Deploy!

3. **Your site will be live at**: `your-project.vercel.app`

### Custom Domain (Optional)
- Buy domain (~$10/year)
- Add to Vercel project settings
- Update DNS records

## 📁 Project Structure

```
cyprus-invest/
├── app/
│   ├── api/
│   │   ├── properties/route.ts    # Get properties
│   │   ├── articles/route.ts      # Get articles
│   │   ├── content/route.ts       # n8n webhook
│   │   └── leads/route.ts         # Contact form
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Homepage
├── components/
│   ├── PropertyCard.tsx           # Property display
│   ├── ArticleCard.tsx            # Article display
│   ├── StatsSection.tsx           # Animated stats
│   └── ContactForm.tsx            # Lead capture
├── lib/
│   ├── mongodb.ts                 # DB connection
│   └── mock-data.ts               # Sample data
├── types/
│   └── index.ts                   # TypeScript types
├── tailwind.config.js             # Tailwind + colors
└── package.json
```

## 🎨 Color Palette

```css
Ocean Blue: #0087AF (rgb(0, 135, 175))
Gold:       #D4AF37 (rgb(212, 175, 55))
Brown:      #8B7355 (rgb(139, 115, 85))
```

## 🔧 Customization

### Change Colors
Edit `tailwind.config.js` → `theme.extend.colors`

### Add More Properties
Either:
1. Use n8n automation to POST to `/api/content`
2. Add directly to MongoDB
3. Update `lib/mock-data.ts` for development

### Modify Texts
All Hebrew texts are in components - search for `"He"` suffix

## 📊 Analytics & Monitoring

Add Vercel Analytics (free):
```bash
npm install @vercel/analytics
```

In `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## 🚀 Performance

- Next.js 14 App Router with RSC
- Automatic image optimization
- Static generation where possible
- MongoDB indexes on `published` and `createdAt`

## 📝 License

MIT License - Free to use and modify

## 🤝 Support

For questions or support:
- Email: info@cyprus-invest.com
- Create an issue on GitHub

---

**Built with ❤️ for Israeli investors in Cyprus real estate**

Made with Next.js • MongoDB • Tailwind CSS • n8n Automation
