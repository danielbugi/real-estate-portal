# 🎯 SETUP INSTRUCTIONS - READ THIS FIRST!

## What You Got

✅ Complete Next.js 14 website
✅ Hebrew RTL luxury design with parallax
✅ Ocean blue, gold, and brown color palette
✅ Real Cyprus property data (6 sample properties)
✅ MongoDB integration
✅ n8n automation webhook
✅ Contact form with lead capture
✅ Fully responsive and mobile-optimized

---

## 📋 Prerequisites

You need:
1. **Node.js 18+** - Download from https://nodejs.org
2. **MongoDB Atlas account** (FREE) - https://www.mongodb.com/atlas
3. **n8n** (optional for automation) - https://n8n.io

---

## 🚀 Installation Steps

### 1️⃣ Install Node.js Dependencies

Open terminal in the `cyprus-invest` folder:

```bash
npm install
```

This installs Next.js, React, MongoDB driver, Framer Motion, etc.

### 2️⃣ Set Up MongoDB Atlas (100% FREE)

1. Go to **https://www.mongodb.com/atlas**
2. Click "Try Free" and sign up
3. Create a new **FREE** cluster:
   - Select AWS/Azure/Google Cloud
   - Choose **M0 Sandbox** (512MB - FREE forever)
   - Select region closest to you
   - Click "Create Cluster"

4. Create Database User:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Set username and password (remember these!)
   - Give "Read and write to any database" permission

5. Allow Network Access:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access From Anywhere" (0.0.0.0/0)
   - Or add your specific IP

6. Get Connection String:
   - Go back to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:<password>@cluster.mongodb.net/...`

### 3️⃣ Create Environment Variables

Create a file named **`.env.local`** in the `cyprus-invest` folder:

```env
# Replace with YOUR MongoDB connection string
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/cyprus_invest?retryWrites=true&w=majority

# Create any random secret (for n8n webhook security)
N8N_WEBHOOK_SECRET=my-super-secret-key-12345-change-this
```

**IMPORTANT:**
- Replace `YOUR_USERNAME` with your MongoDB username
- Replace `YOUR_PASSWORD` with your MongoDB password
- Change the webhook secret to something random

### 4️⃣ Run the Website Locally

```bash
npm run dev
```

Open your browser to: **http://localhost:3000**

You should see your beautiful Cyprus real estate website! 🎉

---

## 🌐 Deploy to Vercel (FREE Hosting!)

### Create GitHub Repository

1. Create account on **https://github.com** (if you don't have one)

2. Create new repository (click the + icon)

3. In your terminal, inside `cyprus-invest` folder:

```bash
git init
git add .
git commit -m "Initial commit - Cyprus real estate website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Deploy to Vercel

1. Go to **https://vercel.com**
2. Sign up with GitHub
3. Click "Add New Project"
4. Select your repository
5. Add environment variables:
   - Click "Environment Variables"
   - Add `MONGODB_URI` with your MongoDB connection string
   - Add `N8N_WEBHOOK_SECRET` with your secret
6. Click "Deploy"

⏱️ Wait 2-3 minutes...

🎉 Your website is LIVE at: `your-project.vercel.app`

---

## 🤖 Connect n8n Automation

### Option 1: n8n Cloud (Easiest)

1. Sign up at **https://n8n.io** (has free tier)
2. Create new workflow
3. Import the `n8n-workflow-sample.json` file
4. Update these fields:
   - **Website URL**: Change to your Vercel URL
   - **Webhook Secret**: Use the same one from .env.local
   - **Telegram** (optional): Add your bot credentials
5. Click "Execute Workflow" to test
6. Activate the workflow

### Option 2: Self-Host n8n (100% Free)

If you have Docker installed:

```bash
docker run -d --name n8n -p 5678:5678 n8nio/n8n
```

Access at: **http://localhost:5678**

Then follow the same import steps as Option 1.

---

## 📝 Test the Automation

### Quick Test with curl

Replace `YOUR-VERCEL-URL` and `YOUR-SECRET`:

```bash
curl -X POST https://YOUR-VERCEL-URL/api/content \
  -H "x-webhook-secret: YOUR-SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "property",
    "content": {
      "title": "Test Villa Limassol",
      "titleHe": "וילת מבחן לימסול",
      "price": 450000,
      "priceILS": 1687500,
      "location": {
        "city": "Limassol",
        "cityHe": "לימסול",
        "area": "Marina",
        "areaHe": "מרינה",
        "coordinates": [34.707817, 33.022469]
      },
      "features": {
        "bedrooms": 3,
        "bathrooms": 2,
        "sqm": 180,
        "pool": true,
        "seaview": true
      },
      "description": "Beautiful test villa",
      "descriptionHe": "וילת מבחן מהממת",
      "images": ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750"],
      "roi": {
        "rentalYield": 6.2,
        "appreciation": 8.5
      },
      "propertyType": "villa",
      "propertyTypeHe": "וילה",
      "slug": "test-villa-limassol-123"
    }
  }'
```

Refresh your website - the new property appears! ✨

---

## 🎨 Customization

### Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  ocean: { 500: '#0087AF' },  // Change this
  gold: { 500: '#D4AF37' },   // Change this
  brown: { 500: '#8B7355' },  // Change this
}
```

### Update Hebrew Texts

All text has Hebrew versions with `"He"` suffix:
- Search for `titleHe`, `descriptionHe`, etc.
- Edit in components and mock data

### Add More Sample Data

Edit `lib/mock-data.ts` to add more properties and articles.

---

## 📂 Project Structure

```
cyprus-invest/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
├── lib/                   # Utilities
├── types/                 # TypeScript types
└── README.md             # Full documentation
```

---

## ⚠️ Common Issues

### "Cannot connect to MongoDB"
- Double-check connection string in `.env.local`
- Make sure you whitelisted your IP in MongoDB Atlas
- Check username/password are correct

### "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Port 3000 already in use"
```bash
# Kill the process
npx kill-port 3000
# Or use different port
npm run dev -- -p 3001
```

---

## 📞 Support

- **MongoDB Help**: https://docs.atlas.mongodb.com/
- **Next.js Help**: https://nextjs.org/docs
- **Vercel Help**: https://vercel.com/docs
- **n8n Help**: https://docs.n8n.io/

---

## 🎯 What's Next?

1. ✅ Get website running locally
2. ✅ Deploy to Vercel
3. ✅ Set up n8n automation
4. 🚀 Add real Cyprus property data
5. 🚀 Connect to real estate APIs
6. 🚀 Add email notifications
7. 🚀 Integrate with CRM
8. 🚀 Add analytics

---

## 💰 Total Cost Breakdown

- Next.js: **FREE** ✅
- MongoDB Atlas (512MB): **FREE** ✅
- Vercel Hosting: **FREE** ✅
- n8n (basic): **FREE** ✅
- Custom Domain (optional): ~$10/year 💵

**Total: $0/month** (or $10/year with custom domain)

---

**You're all set! Happy building! 🚀🏖️**

Your Cyprus real estate investment platform is ready to showcase properties to Israeli investors!
