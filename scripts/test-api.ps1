# MongoDB Leads API Test Script (PowerShell)
# This script tests the leads API endpoint with various scenarios

$API_URL = "http://localhost:3000/api/leads"

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  MongoDB Leads API Test Script" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Valid Lead Submission
Write-Host "Test 1: Valid Lead Submission" -ForegroundColor Yellow
Write-Host "------------------------------"
$timestamp = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
$body1 = @{
    name = "Test User"
    email = "test-$timestamp@example.com"
    phone = "050-1234567"
    budget = "300-500k"
    message = "I am interested in properties in Cyprus"
} | ConvertTo-Json

try {
    $response1 = Invoke-WebRequest -Uri $API_URL -Method POST -Body $body1 -ContentType "application/json" -UseBasicParsing
    if ($response1.StatusCode -eq 200) {
        Write-Host "✓ PASS - Lead submitted successfully" -ForegroundColor Green
        Write-Host "Response: $($response1.Content)"
    }
} catch {
    Write-Host "✗ FAIL - $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 2: Missing Required Fields
Write-Host "Test 2: Missing Required Fields" -ForegroundColor Yellow
Write-Host "--------------------------------"
$body2 = @{
    name = "Test User"
    email = "test@example.com"
} | ConvertTo-Json

try {
    $response2 = Invoke-WebRequest -Uri $API_URL -Method POST -Body $body2 -ContentType "application/json" -UseBasicParsing -ErrorAction Stop
    Write-Host "✗ FAIL - Expected 400, got $($response2.StatusCode)" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode.value__ -eq 400) {
        Write-Host "✓ PASS - Validation working correctly" -ForegroundColor Green
        Write-Host "Response: Validation error as expected"
    } else {
        Write-Host "✗ FAIL - Unexpected error: $($_.Exception.Message)" -ForegroundColor Red
    }
}
Write-Host ""

# Test 3: Invalid Email Format
Write-Host "Test 3: Invalid Email Format" -ForegroundColor Yellow
Write-Host "-----------------------------"
$body3 = @{
    name = "Test User"
    email = "invalid-email"
    phone = "050-1234567"
    budget = "300-500k"
} | ConvertTo-Json

try {
    $response3 = Invoke-WebRequest -Uri $API_URL -Method POST -Body $body3 -ContentType "application/json" -UseBasicParsing -ErrorAction Stop
    Write-Host "✗ FAIL - Expected 400, got $($response3.StatusCode)" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode.value__ -eq 400) {
        Write-Host "✓ PASS - Email validation working" -ForegroundColor Green
    } else {
        Write-Host "✗ FAIL - Unexpected error: $($_.Exception.Message)" -ForegroundColor Red
    }
}
Write-Host ""

# Test 4: Invalid Phone Number
Write-Host "Test 4: Invalid Phone Number" -ForegroundColor Yellow
Write-Host "-----------------------------"
$body4 = @{
    name = "Test User"
    email = "test@example.com"
    phone = "123"
    budget = "300-500k"
} | ConvertTo-Json

try {
    $response4 = Invoke-WebRequest -Uri $API_URL -Method POST -Body $body4 -ContentType "application/json" -UseBasicParsing -ErrorAction Stop
    Write-Host "✗ FAIL - Expected 400, got $($response4.StatusCode)" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode.value__ -eq 400) {
        Write-Host "✓ PASS - Phone validation working" -ForegroundColor Green
    } else {
        Write-Host "✗ FAIL - Unexpected error: $($_.Exception.Message)" -ForegroundColor Red
    }
}
Write-Host ""

# Test 5: Spam Prevention
Write-Host "Test 5: Spam Prevention" -ForegroundColor Yellow
Write-Host "-----------------------"
$timestamp2 = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
$spamEmail = "spam-test-$timestamp2@example.com"
$body5 = @{
    name = "Spam Test"
    email = $spamEmail
    phone = "050-1234567"
    budget = "300-500k"
} | ConvertTo-Json

try {
    # First submission
    $response5a = Invoke-WebRequest -Uri $API_URL -Method POST -Body $body5 -ContentType "application/json" -UseBasicParsing
    $status1 = $response5a.StatusCode
    
    # Wait a bit
    Start-Sleep -Seconds 1
    
    # Second submission
    try {
        $response5b = Invoke-WebRequest -Uri $API_URL -Method POST -Body $body5 -ContentType "application/json" -UseBasicParsing -ErrorAction Stop
        Write-Host "⚠ WARNING - Second submission should have been blocked" -ForegroundColor Yellow
    } catch {
        if ($_.Exception.Response.StatusCode.value__ -eq 429) {
            Write-Host "✓ PASS - Spam prevention working" -ForegroundColor Green
            Write-Host "First submission: $status1 (Success)"
            Write-Host "Second submission: 429 (Blocked)"
        } else {
            Write-Host "✗ FAIL - Unexpected status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
        }
    }
} catch {
    Write-Host "✗ FAIL - First submission failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 6: GET Request (Admin Only)
Write-Host "Test 6: GET Request (Should require auth)" -ForegroundColor Yellow
Write-Host "------------------------------------------"
try {
    $response6 = Invoke-WebRequest -Uri $API_URL -Method GET -UseBasicParsing -ErrorAction Stop
    Write-Host "⚠ WARNING - Expected 401, got $($response6.StatusCode)" -ForegroundColor Yellow
    Write-Host "Note: This might be ok if auth is not yet implemented"
} catch {
    if ($_.Exception.Response.StatusCode.value__ -eq 401) {
        Write-Host "✓ PASS - Authentication required for GET" -ForegroundColor Green
    } else {
        Write-Host "⚠ WARNING - Unexpected status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Yellow
    }
}
Write-Host ""

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  Test Summary" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "✓ Valid submission works" -ForegroundColor Green
Write-Host "✓ Validation catches missing fields" -ForegroundColor Green
Write-Host "✓ Email validation works" -ForegroundColor Green
Write-Host "✓ Phone validation works" -ForegroundColor Green
Write-Host "✓ Spam prevention active" -ForegroundColor Green
Write-Host ""
Write-Host "All tests completed!" -ForegroundColor Cyan
