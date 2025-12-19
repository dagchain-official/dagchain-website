# 📤 File Upload System - Setup Guide

## ✅ What's Been Implemented

### **Admin Panel - Actual File Upload**
- ✅ Drag & drop file upload UI
- ✅ Image upload (JPG, PNG, GIF, WebP - Max 5MB)
- ✅ Video upload (MP4, WebM, OGG, MOV - Max 50MB)
- ✅ Auto-thumbnail generation for videos
- ✅ Upload progress indicators
- ✅ File preview after upload
- ✅ Supabase Storage integration

### **Services Created:**
- ✅ `fileUploadService.js` - Handles all file operations
- ✅ Image validation and upload
- ✅ Video validation and upload
- ✅ Automatic thumbnail generation from video
- ✅ File size formatting
- ✅ Delete file functionality

---

## 🚀 Setup Instructions

### **Step 1: Create Supabase Storage Bucket**

Run this in **Supabase SQL Editor**:

```sql
-- File: admin-panel/supabase-migrations/create_storage_bucket.sql

INSERT INTO storage.buckets (id, name, public)
VALUES ('task-media', 'task-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'task-media' );

CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'task-media' );

CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'task-media' );
```

### **Step 2: Update Tasks Table**

Run this in **Supabase SQL Editor**:

```sql
-- File: admin-panel/supabase-migrations/update_tasks_for_media.sql

ALTER TABLE tasks ADD COLUMN IF NOT EXISTS media_type VARCHAR(20) DEFAULT 'none';
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS media_url TEXT;
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;
```

### **Step 3: Verify Storage Bucket**

1. Go to **Supabase Dashboard** → **Storage**
2. You should see `task-media` bucket
3. Click on it to verify it's public

---

## 🎯 How to Use

### **Admin Creates Task with Media:**

1. **Go to Tasks section** in admin panel
2. **Click "Create Task"**
3. **Fill in task details**
4. **Scroll to "📸 Shareable Media" section**
5. **Select media type:**
   - **No Media** - Text-only task
   - **Image** - Upload an image
   - **Video** - Upload a video

#### **For Image:**
1. Click "Image" radio button
2. Click the upload area
3. Select image file (JPG, PNG, GIF, WebP)
4. Wait for upload (shows progress)
5. See preview of uploaded image
6. Continue filling form
7. Click "Create Task"

#### **For Video:**
1. Click "Video" radio button
2. Click the upload area
3. Select video file (MP4, WebM, OGG, MOV)
4. Wait for upload (shows progress)
5. System auto-generates thumbnail
6. See video player and thumbnail preview
7. Continue filling form
8. Click "Create Task"

---

## 📁 File Structure

### **Upload Folders:**
```
task-media/
├── images/
│   ├── 1234567890-abc123.jpg
│   ├── 1234567891-def456.png
│   └── ...
└── videos/
    ├── 1234567892-ghi789.mp4
    ├── 1234567893-jkl012.webm
    └── ...
```

### **File Naming:**
- Format: `{timestamp}-{random}.{extension}`
- Example: `1729320000-x7k9m2.jpg`
- Ensures unique filenames
- Prevents overwrites

---

## 🔒 File Validation

### **Images:**
- **Allowed types:** JPG, JPEG, PNG, GIF, WebP
- **Max size:** 5MB
- **Validation:** Client-side before upload

### **Videos:**
- **Allowed types:** MP4, WebM, OGG, MOV
- **Max size:** 50MB
- **Validation:** Client-side before upload
- **Auto-thumbnail:** Generated at 1 second or 10% of duration

---

## 🎨 UI Features

### **Upload Area:**
- Dashed border (drag & drop style)
- Hover effect
- Click to upload
- Shows upload progress
- Shows file name and size after upload
- Green checkmark on success
- Preview of uploaded media

### **States:**
1. **Empty** - Upload icon + instructions
2. **Uploading** - Spinner + progress text
3. **Uploaded** - File icon + name + size + checkmark
4. **Preview** - Image/video preview below

---

## 🔧 Technical Details

### **Upload Process:**

**Image Upload:**
```javascript
1. User selects file
2. Validate file type and size
3. Upload to Supabase Storage (task-media/images/)
4. Get public URL
5. Store URL in form state
6. Show preview
```

**Video Upload:**
```javascript
1. User selects file
2. Validate file type and size
3. Upload video to Supabase Storage (task-media/videos/)
4. Generate thumbnail from video (Canvas API)
5. Upload thumbnail to Supabase Storage (task-media/images/)
6. Store both URLs in form state
7. Show video player and thumbnail preview
```

### **Thumbnail Generation:**
```javascript
- Load video in hidden <video> element
- Seek to 1 second or 10% of duration
- Capture frame to canvas
- Convert canvas to blob
- Upload as image
```

---

## 📊 Example Task with Uploaded Media

```javascript
{
  id: "task-123",
  title: "Share DAGChain Promo",
  description: "Share our promotional video!",
  task_type: "social_share",
  category: "content_share",
  reward_points: 500,
  media_type: "video",
  media_url: "https://orvaahvhpyoovgegfvqy.supabase.co/storage/v1/object/public/task-media/videos/1729320000-x7k9m2.mp4",
  thumbnail_url: "https://orvaahvhpyoovgegfvqy.supabase.co/storage/v1/object/public/task-media/images/1729320001-y8l0n3.jpg",
  status: "active"
}
```

---

## 🎯 Next Steps

After setup:
1. ✅ Storage bucket created
2. ✅ Tasks table updated
3. ✅ Admin can upload files
4. 🔄 **Next:** Update user dashboard to show and watermark media

---

## 🐛 Troubleshooting

### **Upload fails:**
- Check Supabase Storage bucket exists
- Verify bucket is public
- Check file size limits
- Verify file type is allowed

### **Thumbnail not generating:**
- Video might be corrupted
- Browser might not support video format
- Try different video file

### **Preview not showing:**
- Check CORS settings in Supabase
- Verify public URL is accessible
- Check browser console for errors

---

## 🎉 Benefits

- ✅ **No external hosting needed** - All files in Supabase
- ✅ **Automatic thumbnails** - No manual work
- ✅ **File validation** - Prevents bad uploads
- ✅ **Beautiful UI** - Professional upload experience
- ✅ **Progress feedback** - Users know what's happening
- ✅ **Previews** - See media before creating task

---

**Ready to upload! Run the SQL migrations and start creating tasks with media!** 🚀
