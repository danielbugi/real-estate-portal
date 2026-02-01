# 🚀 Quick Start Guide - Cyprus Real Estate Website

## Get Your Website Running in 5 Minutes!

### Step 1: Install Dependencies
```bash
cd cyprus-invest
npm install
```

### Step 2: Set Up MongoDB (Free!)

1. Go to **https://www.mongodb.com/atlas**
2. Sign up (free, no credit card needed)
3. Create a **FREE** cluster (M0 - 512MB)
4. Click "Connect" → "Connect your application"
5. Copy the connection string

### Step 3: Create .env.local

Create a file named `.env.local` in the project root:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cyprus_invest?retryWrites=true&w=majority

N8N_WEBHOOK_SECRET=my-super-secret-key-12345
```

**Replace:**
- `username:password` with your MongoDB credentials
- The secret with any random string you want

### Step 4: Run the Website!

```bash
npm run dev
```

Open **http://localhost:3000** in your browser! 🎉

---

## What You'll See

✅ Beautiful Hebrew RTL website with parallax effects
✅ 6 sample Cyprus properties with real market data
✅ Investment articles and guides
✅ Working contact form
✅ Luxury design with ocean blue, gold, and brown colors

---

## Next Steps

### Deploy to Vercel (FREE!)

1. Create GitHub account if you don't have one
2. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO
git push -u origin main
```

3. Go to **https://vercel.com**
4. Sign up with GitHub
5. Click "Import Project"
6. Select your repository
7. Add environment variables:
   - `MONGODB_URI`: (your MongoDB connection string)
   - `N8N_WEBHOOK_SECRET`: (your secret key)
8. Click **Deploy**!

Your site will be live at: `your-project.vercel.app` 🌍

---

## Connect n8n Automation

### Option 1: Use n8n Cloud (Easiest)
1. Sign up at **https://n8n.io**
2. Import `n8n-workflow-sample.json`
3. Update:
   - Website URL to your Vercel URL
   - Webhook secret
   - Telegram credentials (optional)
4. Activate workflow!

### Option 2: Self-Host n8n (Free)
```bash
docker run -d --name n8n -p 5678:5678 n8nio/n8n
```

Then access at **http://localhost:5678**

---

## Test the Automation

### Manual Test with curl:

```bash
curl -X POST https://your-domain.vercel.app/api/content \
  -H "x-webhook-secret: your-secret" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "property",
    "content": {
      "title": "Test Villa",
      "titleHe": "וילת מבחן",
      "price": 400000,
      "priceILS": 1500000,
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
        "sqm": 150,
        "pool": true
      },
      "description": "Test property",
      "descriptionHe": "נכס מבחן",
      "images": ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750"],
      "roi": { "rentalYield": 5.5, "appreciation": 7.0 },
      "propertyType": "villa",
      "propertyTypeHe": "וילה",
      "slug": "test-villa-123"
    }
  }'
```

Refresh your website - the new property appears! ✨

---

## Customization

### Change Colors
Edit `tailwind.config.js` → Look for `colors` section

### Update Texts
Search for Hebrew text in components (look for `"He"` suffix)

### Add More Sample Data
Edit `lib/mock-data.ts`

---

## Troubleshooting

**Problem:** "Cannot connect to MongoDB"
- Check your connection string in `.env.local`
- Make sure to whitelist your IP in MongoDB Atlas (Network Access)
- Or allow access from anywhere (0.0.0.0/0) for testing

**Problem:** "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

**Problem:** Website looks broken
- Make sure all files are in the correct folders
- Check browser console for errors (F12)

---

## Get Help

- Check `README.md` for detailed documentation
- MongoDB Atlas docs: https://docs.atlas.mongodb.com/
- Next.js docs: https://nextjs.org/docs
- n8n docs: https://docs.n8n.io/

---

**Happy Building! 🚀**

Your Cyprus real estate website is ready to showcase properties and capture leads!
