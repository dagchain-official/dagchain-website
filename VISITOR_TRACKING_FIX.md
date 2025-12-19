# Visitor Tracking Fix - Environment Variable Setup

## Issue
The visitor tracking wasn't working because the API route needs the `SUPABASE_SERVICE_ROLE_KEY` to write to the database.

## Solution

### Step 1: Add Environment Variable to Vercel

Go to Vercel Environment Variables:
👉 https://vercel.com/vinod-kumars-projects-3f7e82a5/DAGChain/settings/environment-variables

Add this variable:

**Name:** `SUPABASE_SERVICE_ROLE_KEY`

**Value:** 
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ydmFhaHZocHlvb3ZnZWdmdnF5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDMzODc5MiwiZXhwIjoyMDc1OTE0NzkyfQ.f9lc_DJmZkq_zNusTmUG2Cg9b5kqTLQBuzM1ebnGslM
```

**Environments:** Select all three:
- ✅ Production
- ✅ Preview
- ✅ Development

Click **"Save"**

### Step 2: Redeploy

After adding the environment variable, redeploy:

```bash
cd e:\projects\dag2
vercel --prod
```

### Step 3: Test

Visit your website: https://DAGChain.network

Open browser console (F12) and look for:
- "Visitor tracked successfully" message
- Check Network tab for `/api/track-visitor` request

### Step 4: Verify in Supabase

Go to: https://supabase.com/dashboard/project/orvaahvhpyoovgegfvqy/editor

Select `visitor_tracking` table - you should now see visitor data!

## What Changed

### 1. API Route Updated
- Now uses `SUPABASE_SERVICE_ROLE_KEY` for server-side operations
- Direct insert/update instead of RPC function
- Added detailed logging for debugging
- Better error handling

### 2. Environment Variables
- Added `SUPABASE_SERVICE_ROLE_KEY` to `.env.local.example`
- This key has full database access (server-side only)
- Never expose this key to client-side code

## Troubleshooting

### Check Vercel Logs
Go to: https://vercel.com/vinod-kumars-projects-3f7e82a5/DAGChain

Click on latest deployment → "Functions" tab → Click on `/api/track-visitor`

You'll see console.log output showing:
- IP addresses being tracked
- Geolocation data
- Success/error messages

### Common Issues

**Issue: Still no data after deployment**
- Wait 1-2 minutes after deployment
- Clear browser cache and sessionStorage
- Visit site in incognito mode
- Check Vercel function logs

**Issue: Geolocation data is null**
- This is normal for some IPs (VPN, proxy, etc.)
- The visitor will still be tracked with IP only
- ipapi.co has rate limits (1000/day free tier)

**Issue: "Development IP skipped" message**
- This means you're testing from localhost
- Deploy to production and test from real IP

## Security Note

The `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security (RLS) policies. This is necessary for server-side operations but should NEVER be exposed to client-side code. It's safe to use in API routes because they run on the server.

## Next Steps

Once working, you can:
1. Build analytics dashboard to visualize visitor data
2. Create reports by country, city, etc.
3. Track conversion rates (visitors → waitlist submissions)
4. Set up alerts for traffic spikes
