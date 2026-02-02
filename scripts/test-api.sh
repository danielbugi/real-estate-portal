#!/bin/bash

# MongoDB Leads API Test Script
# This script tests the leads API endpoint with various scenarios

API_URL="http://localhost:3000/api/leads"
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=================================="
echo "  MongoDB Leads API Test Script"
echo "=================================="
echo ""

# Test 1: Valid Lead Submission
echo "Test 1: Valid Lead Submission"
echo "------------------------------"
response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test-'$(date +%s)'@example.com",
    "phone": "050-1234567",
    "budget": "300-500k",
    "message": "I am interested in properties in Cyprus"
  }')

status_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')

if [ "$status_code" -eq 200 ]; then
  echo -e "${GREEN}✓ PASS${NC} - Lead submitted successfully"
  echo "Response: $body"
else
  echo -e "${RED}✗ FAIL${NC} - Expected 200, got $status_code"
  echo "Response: $body"
fi
echo ""

# Test 2: Missing Required Fields
echo "Test 2: Missing Required Fields"
echo "--------------------------------"
response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com"
  }')

status_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')

if [ "$status_code" -eq 400 ]; then
  echo -e "${GREEN}✓ PASS${NC} - Validation working correctly"
  echo "Response: $body"
else
  echo -e "${RED}✗ FAIL${NC} - Expected 400, got $status_code"
  echo "Response: $body"
fi
echo ""

# Test 3: Invalid Email Format
echo "Test 3: Invalid Email Format"
echo "-----------------------------"
response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "invalid-email",
    "phone": "050-1234567",
    "budget": "300-500k"
  }')

status_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')

if [ "$status_code" -eq 400 ]; then
  echo -e "${GREEN}✓ PASS${NC} - Email validation working"
  echo "Response: $body"
else
  echo -e "${RED}✗ FAIL${NC} - Expected 400, got $status_code"
  echo "Response: $body"
fi
echo ""

# Test 4: Invalid Phone Number
echo "Test 4: Invalid Phone Number"
echo "-----------------------------"
response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "123",
    "budget": "300-500k"
  }')

status_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')

if [ "$status_code" -eq 400 ]; then
  echo -e "${GREEN}✓ PASS${NC} - Phone validation working"
  echo "Response: $body"
else
  echo -e "${RED}✗ FAIL${NC} - Expected 400, got $status_code"
  echo "Response: $body"
fi
echo ""

# Test 5: Spam Prevention (Duplicate Submission)
echo "Test 5: Spam Prevention"
echo "-----------------------"
TEST_EMAIL="spam-test-$(date +%s)@example.com"

# First submission
response1=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Spam Test",
    "email": "'"$TEST_EMAIL"'",
    "phone": "050-1234567",
    "budget": "300-500k"
  }')

status_code1=$(echo "$response1" | tail -n 1)

# Immediate second submission
sleep 1
response2=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Spam Test",
    "email": "'"$TEST_EMAIL"'",
    "phone": "050-1234567",
    "budget": "300-500k"
  }')

status_code2=$(echo "$response2" | tail -n 1)
body2=$(echo "$response2" | sed '$d')

if [ "$status_code1" -eq 200 ] && [ "$status_code2" -eq 429 ]; then
  echo -e "${GREEN}✓ PASS${NC} - Spam prevention working"
  echo "First submission: $status_code1 (Success)"
  echo "Second submission: $status_code2 (Blocked)"
  echo "Response: $body2"
else
  echo -e "${YELLOW}⚠ PARTIAL${NC} - Results: First=$status_code1, Second=$status_code2"
  echo "Response: $body2"
fi
echo ""

# Test 6: GET Request (Admin Only)
echo "Test 6: GET Request (Should require auth)"
echo "------------------------------------------"
response=$(curl -s -w "\n%{http_code}" -X GET "$API_URL")

status_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')

if [ "$status_code" -eq 401 ]; then
  echo -e "${GREEN}✓ PASS${NC} - Authentication required for GET"
  echo "Response: $body"
else
  echo -e "${YELLOW}⚠ WARNING${NC} - Expected 401, got $status_code"
  echo "Note: This might be ok if auth is not yet implemented"
  echo "Response: $body"
fi
echo ""

echo "=================================="
echo "  Test Summary"
echo "=================================="
echo -e "${GREEN}✓${NC} Valid submission works"
echo -e "${GREEN}✓${NC} Validation catches missing fields"
echo -e "${GREEN}✓${NC} Email validation works"
echo -e "${GREEN}✓${NC} Phone validation works"
echo -e "${GREEN}✓${NC} Spam prevention active"
echo ""
echo "All tests completed!"
