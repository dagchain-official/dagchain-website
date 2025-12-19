# DAG ARMY Waitlist Setup Instructions

## 1. Run Supabase Migration

Execute the SQL migration to create the waitlist table:

```bash
# Navigate to the presale-app directory
cd presale-app

# Run the migration in Supabase Dashboard
# Go to: https://supabase.com/dashboard/project/orvaahvhpyoovgegfvqy/sql/new
# Copy and paste the contents of: supabase-migrations/create_waitlist_table.sql
# Click "Run"
```

Or run directly in Supabase SQL Editor:

1. Go to: https://supabase.com/dashboard/project/orvaahvhpyoovgegfvqy/sql/new
2. Copy the SQL from `presale-app/supabase-migrations/create_waitlist_table.sql`
3. Click "Run"

## 2. Set Vercel Environment Variables

Add these environment variables to your Vercel project:

1. Go to: https://vercel.com/vinod-kumars-projects-3f7e82a5/DAGChain/settings/environment-variables
2. Add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://orvaahvhpyoovgegfvqy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ydmFhaHZocHlvb3ZnZWdmdnF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzMzg3OTIsImV4cCI6MjA3NTkxNDc5Mn0.h-iTnTThJtM5S3MRRxVHdVVLNKxpNJ092YtBUmmqPxA
```

3. Make sure to select "Production", "Preview", and "Development" for each variable
4. Click "Save"

## 3. Redeploy

After setting the environment variables, redeploy:

```bash
vercel --prod
```

## Features Implemented

### Waitlist Modal
- ✅ Auto-opens 2 seconds after landing page loads (first visit only)
- ✅ Close button (X) in top-right corner
- ✅ Beautiful gradient design matching the provided mockup
- ✅ Form fields:
  - First Name (required)
  - Last Name (required)
  - Email (required)
  - Country Code + Phone (required)
  - Designation (optional)
  - City (optional)
  - Short Note (optional)
  - Terms & Conditions checkbox (required)
- ✅ Stores submissions in Supabase `waitlist` table
- ✅ Success animation after submission
- ✅ LocalStorage tracking to prevent showing modal again

### Database Schema

Table: `waitlist`

Columns:
- `id` (UUID, Primary Key)
- `first_name` (TEXT, Required)
- `last_name` (TEXT, Required)
- `email` (TEXT, Required)
- `country_code` (TEXT, Default: '+91')
- `phone` (TEXT, Required)
- `designation` (TEXT, Optional)
- `city` (TEXT, Optional)
- `note` (TEXT, Optional)
- `terms_accepted` (BOOLEAN, Required)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Viewing Waitlist Submissions

Go to Supabase Dashboard:
https://supabase.com/dashboard/project/orvaahvhpyoovgegfvqy/editor

Select the `waitlist` table to view all submissions.

## Testing Locally

1. Make sure `.env.local` exists (copy from `.env.local.example`)
2. Run development server:
```bash
npm run dev
```
3. Open http://localhost:3000
4. Wait 2 seconds for the modal to appear
5. Fill out the form and submit
6. Check Supabase to verify the submission

## Resetting the Modal

To test the modal appearing again, clear localStorage:

1. Open browser DevTools (F12)
2. Go to Application/Storage → Local Storage
3. Delete the `hasSeenWaitlist` key
4. Refresh the page
