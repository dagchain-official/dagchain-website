# 🎨 Watermarked Media Sharing System - Implementation Plan

## 🎯 Overview

A powerful feature that allows admins to upload images/videos in the Tasks section, which users can then share on social media with their **personalized referral code** and **QR code** automatically watermarked on the media.

---

## 📋 Implementation Status

### ✅ **Phase 1: Backend & Database** (READY)
- [x] SQL migration to add media columns to tasks table
- [x] `media_type` column (none, image, video)
- [x] `media_url` column (URL to image/video)
- [x] `thumbnail_url` column (for video thumbnails)

### ✅ **Phase 2: Admin Panel** (READY)
- [x] Updated Tasks form with media upload section
- [x] Radio buttons: No Media / Image / Video
- [x] Image URL input field
- [x] Video URL + Thumbnail URL input fields
- [x] Form validation and state management

### ✅ **Phase 3: Watermarking Service** (READY)
- [x] Created `mediaWatermarkService.js`
- [x] QR code generation (using qrcode library)
- [x] Image watermarking with Canvas API
- [x] Referral code overlay (bottom left)
- [x] QR code overlay (bottom right)
- [x] Download functionality
- [x] Social media sharing functions

### 🔄 **Phase 4: User Dashboard** (IN PROGRESS)
- [ ] Update DagArmy Tasks tab to show media
- [ ] Display watermarked preview
- [ ] Add "Share" button with social media options
- [ ] Implement download watermarked media
- [ ] Add copy to clipboard functionality

---

## 🏗️ Architecture

### **Flow:**

```
Admin Panel                    Supabase                    User Dashboard
    |                             |                              |
    |-- Upload Image/Video ------>|                              |
    |   (URL)                     |                              |
    |                             |                              |
    |                             |<---- Load Tasks -------------|
    |                             |                              |
    |                             |                              |
    |                             |---- Return Task with Media ->|
    |                             |                              |
    |                             |                              |<-- User clicks "Share"
    |                             |                              |
    |                             |                              |-- Generate QR Code
    |                             |                              |-- Watermark Image
    |                             |                              |   (Referral Code + QR)
    |                             |                              |
    |                             |                              |-- Show Preview
    |                             |                              |-- Download/Share
```

---

## 🎨 Watermarking Details

### **Image Watermarking:**

**Bottom Left:**
- Referral code text (e.g., "REF-ABC123")
- Semi-transparent black background
- White bold text
- Font size: 2.5% of image width (min 16px)

**Bottom Right:**
- QR code (links to referral URL)
- Semi-transparent white background
- QR code size: 15% of image width (max 150px)
- 20px padding from edges

### **Video Watermarking:**

**For Now (Client-Side):**
- Watermark the thumbnail image
- Provide download with overlay instructions
- User downloads video + watermarked thumbnail

**Future (Server-Side with FFmpeg):**
- Process video with FFmpeg
- Burn-in watermark overlay
- Generate watermarked video file

---

## 📦 Dependencies Required

### **User Dashboard (presale-app):**

```bash
npm install qrcode
```

**Package:** `qrcode` - For generating QR codes

---

## 🔧 Setup Instructions

### **Step 1: Run SQL Migration**

```sql
-- Run this in Supabase SQL Editor
-- File: admin-panel/supabase-migrations/update_tasks_for_media.sql

ALTER TABLE tasks ADD COLUMN IF NOT EXISTS media_type VARCHAR(20) DEFAULT 'none';
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS media_url TEXT;
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;
```

### **Step 2: Install Dependencies**

```bash
# Navigate to presale-app
cd e:\projects\dag2\presale-app

# Install qrcode library
npm install qrcode
```

### **Step 3: Test Admin Panel**

1. Go to Tasks section
2. Click "Create Task"
3. Scroll to "📸 Shareable Media" section
4. Select "Image" or "Video"
5. Enter media URL
6. Create task

### **Step 4: Implement User Dashboard** (Next Step)

Update `DagArmy.jsx` to:
- Display media preview
- Add "Share" button
- Generate watermarked version
- Provide download/share options

---

## 🎯 User Experience

### **Admin Creates Task:**

1. Admin goes to Tasks section
2. Fills in task details
3. Selects "Image" media type
4. Enters image URL: `https://example.com/promo.jpg`
5. Adds content to share and hashtags
6. Clicks "Create Task"

### **User Sees Task:**

1. User goes to DAG ARMY → Tasks tab
2. Sees task with image preview
3. Clicks "Share on Social Media"
4. System generates watermarked version:
   - Bottom left: "REF-ABC123" (user's code)
   - Bottom right: QR code to referral link
5. User sees preview of watermarked image
6. Options appear:
   - Download Image
   - Share on Twitter
   - Share on Facebook
   - Share on Instagram
   - Share on LinkedIn
   - Share on Telegram
   - Share on WhatsApp
   - Copy to Clipboard

### **User Shares:**

1. Clicks "Share on Twitter"
2. Watermarked image downloads automatically
3. Twitter opens with pre-filled text + hashtags
4. User attaches the downloaded watermarked image
5. Posts to Twitter
6. Their followers see the post with referral code!

---

## 🔐 Security Considerations

1. **CORS:** Ensure image URLs support CORS for canvas watermarking
2. **URL Validation:** Validate URLs are from trusted sources
3. **File Size:** Limit image dimensions for performance
4. **Rate Limiting:** Prevent abuse of watermarking service

---

## 🚀 Social Media Integration

### **Platforms Supported:**

1. **Twitter** - Opens tweet composer + downloads image
2. **Facebook** - Opens share dialog + downloads image
3. **Instagram** - Downloads image (mobile app required)
4. **LinkedIn** - Opens share dialog + downloads image
5. **Telegram** - Opens share dialog + downloads image
6. **WhatsApp** - Opens share dialog + downloads image
7. **Download** - Direct download of watermarked image
8. **Clipboard** - Copy image to clipboard for easy pasting

---

## 📊 Example Task with Media

```javascript
{
  id: "task-123",
  title: "Share DAGChain Presale Announcement",
  description: "Share our presale announcement on your social media!",
  task_type: "social_share",
  category: "content_share",
  reward_points: 500,
  content_to_share: "🚀 Just joined the DAGChain presale! Early access to the future of blockchain. Don't miss out!",
  hashtags: "#DAGChain #Crypto #Presale #Blockchain",
  media_type: "image",
  media_url: "https://example.com/DAGChain-promo.jpg",
  status: "active"
}
```

**When user shares:**
- Image: `DAGChain-promo.jpg`
- Watermark bottom left: `REF-USER123`
- Watermark bottom right: QR code → `https://DAGChain.com?ref=USER123`

---

## 🎨 Design Mockup

```
┌─────────────────────────────────────────┐
│                                         │
│         DAGChain PRESALE IMAGE          │
│                                         │
│                                         │
│                                         │
│  ┌──────────┐                  ┌─────┐ │
│  │REF-ABC123│                  │ QR  │ │
│  └──────────┘                  │CODE │ │
│                                └─────┘ │
└─────────────────────────────────────────┘
```

---

## 📝 Next Steps

1. **Install qrcode package** in presale-app
2. **Run SQL migration** in Supabase
3. **Update DagArmy.jsx** to show media and share buttons
4. **Test watermarking** with sample images
5. **Deploy to Vercel**

---

## 🎉 Benefits

- ✅ **Viral Marketing:** Users share branded content with their referral code
- ✅ **Automated:** No manual watermarking needed
- ✅ **Trackable:** QR codes link directly to user's referral
- ✅ **Professional:** Consistent branding across all shares
- ✅ **Easy:** One-click sharing to multiple platforms
- ✅ **Rewarding:** Users earn points for sharing

---

## 🔮 Future Enhancements

1. **Server-Side Video Watermarking** with FFmpeg
2. **Analytics** - Track shares and conversions
3. **Templates** - Pre-designed share templates
4. **A/B Testing** - Test different media variations
5. **Leaderboard** - Top sharers get bonus rewards
6. **Auto-Post** - Direct posting to social media (with OAuth)

---

**This feature will turn your users into a powerful marketing army!** 🚀
