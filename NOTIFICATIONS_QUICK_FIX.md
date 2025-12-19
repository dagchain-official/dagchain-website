# 🔔 Notifications System - Quick Fix

## ⚠️ Error Fixed

The original migration had a foreign key reference to `admin_users` table which doesn't exist yet.

## ✅ Solution

Use the **v2 migration** which doesn't require the admin_users table.

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Run This SQL in Supabase

Copy and paste this file into Supabase SQL Editor:

```
admin-panel/supabase-migrations/create_notifications_table_v2.sql
```

**OR** copy this SQL directly:

```sql
-- Create notifications table for admin-to-user announcements
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(50) NOT NULL DEFAULT 'announcement',
  priority VARCHAR(20) NOT NULL DEFAULT 'normal',
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by_name VARCHAR(100),
  expires_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes
CREATE INDEX idx_notifications_status ON notifications(status);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX idx_notifications_type ON notifications(type);

-- Disable RLS
ALTER TABLE notifications DISABLE ROW LEVEL SECURITY;

-- Insert welcome notification
INSERT INTO notifications (title, description, type, priority, status, created_by_name) VALUES
(
  'Welcome to DAGChain Presale!',
  'Thank you for joining the DAGChain presale. Secure your tokens early and be part of the future of blockchain technology.',
  'announcement',
  'high',
  'active',
  'System'
);

-- Verify
SELECT * FROM notifications ORDER BY created_at DESC;
```

### Step 2: Verify Table Created

You should see:
- ✅ Table created successfully
- ✅ One welcome notification in the results

### Step 3: Test It!

**Admin Panel:**
1. Go to Events section
2. Click "Create Event"
3. Fill in details
4. Click Create
5. Should work! ✅

**User Dashboard:**
1. Click "Notifications" in sidebar
2. See the welcome notification
3. See any notifications you created from admin panel

---

## 📝 What Changed

### Old Version (v1):
```sql
created_by UUID REFERENCES admin_users(id)  -- ❌ Requires admin_users table
```

### New Version (v2):
```sql
created_by_name VARCHAR(100)  -- ✅ Just stores the admin username as text
```

---

## ✅ Ready to Use!

The notifications system now works without requiring the admin_users table to exist first.

**Start creating notifications!** 🎉
