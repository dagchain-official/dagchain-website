# Visitor Tracking System Setup

## Overview
Silent visitor tracking system that captures IP addresses and geolocation data for every website visitor.

## Features
- ✅ Automatic IP address capture
- ✅ Geolocation data (City, State, Country, Continent)
- ✅ ISP and timezone information
- ✅ User agent and referrer tracking
- ✅ Visit count tracking (returning visitors)
- ✅ First and last visit timestamps
- ✅ Session-based tracking (once per session)
- ✅ Non-blocking (doesn't slow down page load)

## Database Schema

### Table: `visitor_tracking`

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `ip_address` | TEXT | Visitor's IP address (unique) |
| `city` | TEXT | City name |
| `state` | TEXT | State/Region name |
| `country` | TEXT | Country name |
| `continent` | TEXT | Continent code (e.g., NA, EU, AS) |
| `country_code` | TEXT | ISO country code (e.g., US, IN, GB) |
| `latitude` | DECIMAL | Geographic latitude |
| `longitude` | DECIMAL | Geographic longitude |
| `timezone` | TEXT | Timezone (e.g., America/New_York) |
| `isp` | TEXT | Internet Service Provider |
| `user_agent` | TEXT | Browser user agent string |
| `referrer` | TEXT | Referrer URL |
| `landing_page` | TEXT | First page visited |
| `visit_count` | INTEGER | Number of visits (increments on return) |
| `first_visit_at` | TIMESTAMP | First visit timestamp |
| `last_visit_at` | TIMESTAMP | Most recent visit timestamp |
| `created_at` | TIMESTAMP | Record creation timestamp |

## Setup Instructions

### Step 1: Run Supabase Migration

Go to Supabase SQL Editor:
👉 https://supabase.com/dashboard/project/orvaahvhpyoovgegfvqy/sql/new

Copy and paste the SQL from:
`presale-app/supabase-migrations/create_visitor_tracking_table.sql`

Click **"Run"**

### Step 2: Verify Table Creation

Check in Supabase Dashboard:
👉 https://supabase.com/dashboard/project/orvaahvhpyoovgegfvqy/editor

You should see the `visitor_tracking` table with all columns.

### Step 3: Deploy to Production

The code is already integrated. Just deploy:

```bash
cd e:\projects\dag2
npm run build
vercel --prod
```

## How It Works

### 1. Page Load
When a user visits the website, the `useVisitorTracking` hook is triggered.

### 2. Session Check
The system checks `sessionStorage` to see if the visitor has already been tracked in this session.

### 3. API Call
If not tracked, after 1 second delay (non-blocking), it calls `/api/track-visitor`.

### 4. IP Capture
The API endpoint extracts the visitor's IP from request headers:
- `x-forwarded-for` (Vercel/proxy)
- `x-real-ip` (fallback)

### 5. Geolocation Lookup
The API calls `ipapi.co` (free tier: 1000 requests/day) to get:
- City, State, Country, Continent
- Coordinates (latitude/longitude)
- Timezone, ISP

### 6. Database Storage
Data is stored in Supabase using the `upsert_visitor_tracking` function:
- **New visitor**: Creates new record
- **Returning visitor**: Increments `visit_count`, updates `last_visit_at`

### 7. Session Marking
`sessionStorage` is marked to prevent duplicate tracking in the same session.

## Geolocation API

**Provider**: ipapi.co
**Free Tier**: 1,000 requests/day
**Rate Limit**: 30,000 requests/month

### Alternative Providers (if needed):
1. **ip-api.com** - 45 requests/minute (free)
2. **ipgeolocation.io** - 1,000 requests/day (free)
3. **ipinfo.io** - 50,000 requests/month (free)

To switch providers, update the API endpoint in:
`app/api/track-visitor/route.ts`

## Privacy Considerations

### GDPR Compliance
IP addresses are considered personal data under GDPR. Ensure:
1. Privacy policy mentions visitor tracking
2. Cookie consent includes tracking (if required)
3. Data retention policy is defined

### Data Retention
Consider adding a cleanup policy:

```sql
-- Delete visitor data older than 1 year
DELETE FROM visitor_tracking 
WHERE first_visit_at < NOW() - INTERVAL '1 year';
```

## Viewing Visitor Data

### Supabase Dashboard
Go to: https://supabase.com/dashboard/project/orvaahvhpyoovgegfvqy/editor

Select `visitor_tracking` table to view all visitors.

### Query Examples

**Total unique visitors:**
```sql
SELECT COUNT(*) FROM visitor_tracking;
```

**Visitors by country:**
```sql
SELECT country, COUNT(*) as visitor_count 
FROM visitor_tracking 
GROUP BY country 
ORDER BY visitor_count DESC;
```

**Recent visitors (last 24 hours):**
```sql
SELECT ip_address, city, country, last_visit_at 
FROM visitor_tracking 
WHERE last_visit_at > NOW() - INTERVAL '24 hours'
ORDER BY last_visit_at DESC;
```

**Returning visitors:**
```sql
SELECT ip_address, city, country, visit_count, first_visit_at, last_visit_at
FROM visitor_tracking 
WHERE visit_count > 1
ORDER BY visit_count DESC;
```

**Top cities:**
```sql
SELECT city, country, COUNT(*) as visitor_count 
FROM visitor_tracking 
WHERE city IS NOT NULL
GROUP BY city, country 
ORDER BY visitor_count DESC 
LIMIT 20;
```

## Files Created

1. **Migration**: `presale-app/supabase-migrations/create_visitor_tracking_table.sql`
2. **API Route**: `app/api/track-visitor/route.ts`
3. **Hook**: `lib/useVisitorTracking.ts`
4. **Integration**: `app/page.tsx` (updated)
5. **Documentation**: `VISITOR_TRACKING_SETUP.md`

## Testing

### Local Testing
```bash
npm run dev
```

Open http://localhost:3000

Check browser console for: "Visitor tracked successfully"

### Verify in Supabase
1. Go to visitor_tracking table
2. Look for your IP address
3. Verify location data is populated

### Production Testing
After deployment, visit your production URL and check Supabase.

## Troubleshooting

### Issue: No data in table
- Check Supabase RLS policies are correct
- Verify API route is accessible
- Check browser console for errors

### Issue: Location data is null
- Geolocation API might be rate-limited
- IP might be from VPN/proxy (harder to geolocate)
- Check API response in server logs

### Issue: Duplicate entries
- Should not happen due to unique constraint on IP
- If it does, check the upsert function

### Issue: Development IPs tracked
- Localhost IPs (127.0.0.1, ::1) are automatically skipped
- Add more IP filters in API route if needed

## Performance

- **Page Load Impact**: None (1 second delay, async)
- **API Response Time**: ~200-500ms (depends on geolocation API)
- **Database Impact**: Minimal (indexed queries, upsert function)
- **Storage**: ~1KB per visitor record

## Future Enhancements

1. **Analytics Dashboard**: Build admin panel to visualize visitor data
2. **Real-time Map**: Show visitor locations on a world map
3. **Conversion Tracking**: Link visitors to waitlist submissions
4. **Bot Detection**: Filter out bots and crawlers
5. **Device Detection**: Track mobile vs desktop visitors
6. **Page Views**: Track all page visits, not just landing page

## Security

- ✅ RLS policies enabled
- ✅ Anonymous users can only INSERT
- ✅ Only authenticated users can view data
- ✅ IP addresses are not exposed to client-side
- ✅ API route validates and sanitizes input
- ✅ Rate limiting handled by Vercel (built-in)

## Cost Estimate

**Free Tier Usage:**
- Supabase: Free (up to 500MB database)
- ipapi.co: Free (1,000 requests/day)
- Vercel: Free (included in hosting)

**Estimated Monthly Visitors:**
- 30,000 visitors/month = ~1,000/day
- Fits within free tier limits

**If scaling needed:**
- ipapi.co Pro: $10/month (30,000 requests/month)
- Supabase Pro: $25/month (8GB database)
