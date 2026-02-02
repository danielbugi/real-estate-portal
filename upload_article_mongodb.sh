#!/bin/bash

# 🚀 Upload Article to MongoDB Script
# Usage: ./upload_article_mongodb.sh

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}📤 Upload Article to MongoDB${NC}"
echo -e "${BLUE}======================================${NC}"
echo ""

# Step 1: Check if article-sample.json exists
echo -e "${YELLOW}[1/5]${NC} Checking for article-sample.json..."
if [ ! -f "article-sample.json" ]; then
    echo -e "${RED}❌ Error: article-sample.json not found!${NC}"
    echo -e "${YELLOW}💡 Make sure article-sample.json is in the current directory${NC}"
    exit 1
fi
echo -e "${GREEN}✅ article-sample.json found${NC}"
echo ""

# Step 2: Check if .env.local exists
echo -e "${YELLOW}[2/5]${NC} Checking for .env.local..."
if [ ! -f ".env.local" ]; then
    echo -e "${RED}❌ Error: .env.local not found!${NC}"
    echo -e "${YELLOW}💡 Make sure you're in the project root directory${NC}"
    exit 1
fi
echo -e "${GREEN}✅ .env.local found${NC}"
echo ""

# Step 3: Extract WEBHOOK_SECRET
echo -e "${YELLOW}[3/5]${NC} Extracting WEBHOOK_SECRET..."
WEBHOOK_SECRET=$(cat .env.local | grep -E "^WEBHOOK_SECRET=" | cut -d '=' -f2 | tr -d '"' | tr -d "'")

if [ -z "$WEBHOOK_SECRET" ]; then
    echo -e "${YELLOW}⚠️  No WEBHOOK_SECRET found in .env.local${NC}"
    echo -e "${YELLOW}🔓 Attempting without authentication...${NC}"
    USE_AUTH=false
else
    echo -e "${GREEN}✅ WEBHOOK_SECRET extracted: ${WEBHOOK_SECRET:0:10}...${NC}"
    USE_AUTH=true
fi
echo ""

# Step 4: Check if server is running
echo -e "${YELLOW}[4/5]${NC} Checking if server is running..."
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Server is running on localhost:3000${NC}"
else
    echo -e "${RED}❌ Server is not running!${NC}"
    echo -e "${YELLOW}💡 Please run: npm run dev${NC}"
    exit 1
fi
echo ""

# Step 5: Upload article
echo -e "${YELLOW}[5/5]${NC} Uploading article..."
echo ""

if [ "$USE_AUTH" = true ]; then
    # With authentication
    RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/api/content \
      -H "Content-Type: application/json" \
      -H "x-webhook-secret: $WEBHOOK_SECRET" \
      -d @article-sample.json)
else
    # Without authentication
    RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/api/content \
      -H "Content-Type: application/json" \
      -d @article-sample.json)
fi

# Split response and status code
HTTP_BODY=$(echo "$RESPONSE" | head -n -1)
HTTP_STATUS=$(echo "$RESPONSE" | tail -n 1)

# Check if successful
if [ "$HTTP_STATUS" -eq 200 ] || [ "$HTTP_STATUS" -eq 201 ]; then
    echo -e "${GREEN}✅ Success! Article uploaded${NC}"
    echo -e "${GREEN}📊 HTTP Status: $HTTP_STATUS${NC}"
    echo ""
    echo -e "${BLUE}Response:${NC}"
    echo "$HTTP_BODY" | python3 -m json.tool 2>/dev/null || echo "$HTTP_BODY"
    echo ""
    
    # Extract article ID and slug
    ARTICLE_ID=$(echo "$HTTP_BODY" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
    ARTICLE_SLUG=$(echo "$HTTP_BODY" | grep -o '"slug":"[^"]*"' | head -1 | cut -d'"' -f4)
    
    if [ ! -z "$ARTICLE_ID" ]; then
        echo -e "${GREEN}📄 Article ID: $ARTICLE_ID${NC}"
    fi
    
    if [ ! -z "$ARTICLE_SLUG" ]; then
        echo -e "${GREEN}🔗 Article Slug: $ARTICLE_SLUG${NC}"
        echo ""
        echo -e "${BLUE}Next steps:${NC}"
        echo -e "  1. Check admin panel: ${YELLOW}http://localhost:3000/admin/dashboard${NC}"
        echo -e "  2. Approve the article"
        echo -e "  3. View it at: ${YELLOW}http://localhost:3000/articles/$ARTICLE_SLUG${NC}"
    fi
    
    echo ""
    echo -e "${GREEN}🎉 Done!${NC}"
    exit 0
else
    echo -e "${RED}❌ Failed! HTTP Status: $HTTP_STATUS${NC}"
    echo ""
    echo -e "${RED}Error Response:${NC}"
    echo "$HTTP_BODY" | python3 -m json.tool 2>/dev/null || echo "$HTTP_BODY"
    echo ""
    
    if [ "$HTTP_STATUS" -eq 401 ]; then
        echo -e "${YELLOW}💡 Authentication failed. Try:${NC}"
        echo -e "   1. Check WEBHOOK_SECRET in .env.local"
        echo -e "   2. Or disable auth in development mode"
    elif [ "$HTTP_STATUS" -eq 400 ]; then
        echo -e "${YELLOW}💡 Bad request. Check article-sample.json format${NC}"
    elif [ "$HTTP_STATUS" -eq 500 ]; then
        echo -e "${YELLOW}💡 Server error. Check MongoDB connection${NC}"
    fi
    
    exit 1
fi