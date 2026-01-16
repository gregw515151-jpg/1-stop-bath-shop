# 1 Stop Bath Shop - Bathroom Quote System
## Complete User Guide

---

## Table of Contents
1. [Overview](#overview)
2. [Accessing the Application](#accessing-the-application)
3. [Main Quote System](#main-quote-system)
4. [Admin Panel](#admin-panel)
5. [Passwords & Login Information](#passwords--login-information)
6. [Features Guide](#features-guide)
7. [Troubleshooting](#troubleshooting)

---

## Overview

The **1 Stop Bath Shop Bathroom Quote System** is a comprehensive web-based application designed to help contractors create professional bathroom renovation quotes quickly and efficiently. The system includes:

- **Interactive Quote Builder** - Select products, services, and options
- **Customer Information Management** - Capture client details
- **Photo Upload** - Attach up to 15 photos with captions
- **PDF Generation** - Create professional quote documents
- **Email Integration** - Send quotes directly to customers
- **Admin Panel** - Manage product catalog and pricing
- **Password Protection** - Secure access to the application

**Live Website:** https://one-stop-bath-shop.onrender.com

---

## Accessing the Application

### Main Application Access

**URL:** https://one-stop-bath-shop.onrender.com

**Password:** ~~No password required~~ (Public access enabled)

#### Accessing the Site:
1. Navigate to https://one-stop-bath-shop.onrender.com
2. The application will load immediately - no password needed!

> **Note:** The site is now publicly accessible. Anyone with the URL can use the quote system.

#### Changing the Main Password:
To change the site access password, edit line 9 in `src/main.js`:
```javascript
const SITE_PASSWORD = "bath2025"; // Change this to your desired password
```

---

## Admin Panel

### Accessing Admin Mode

The admin panel allows you to add, edit, and delete products from the dropdown menus.

#### Admin Access (Main App):
1. Click the **🔐 Admin** button in the top-right corner
2. Enter admin password when prompted
3. Admin controls will appear under each dropdown

**Default Admin Password:** The system will prompt you to set this up

#### Separate Admin Panel:
**URL:** https://one-stop-bath-shop.onrender.com/admin.html

**Password:** `admin123` (or set via environment variable `VITE_ADMIN_PASSWORD`)

#### Admin Panel Features:
- **Add Items:** Enter item name and price, click "Add"
- **Delete Items:** Click "Delete" next to any item
- **Categories Available:**
  - Bathtubs
  - Showers
  - Trim & Fixtures
  - Toilets
  - Sinks
  - Tiles
  - Labor & Installation

#### Changing Admin Password:
To change the admin panel password, edit line 3 in `src/admin.js`:
```javascript
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
```

Or set the environment variable `VITE_ADMIN_PASSWORD` in your hosting platform.

---

## Passwords & Login Information

### Summary of All Passwords

| Access Point | Default Password | Location to Change |
|-------------|------------------|-------------------|
| **Main Site Access** | `bath2025` | `src/main.js` line 9 |
| **Admin Panel (admin.html)** | `admin123` | `src/admin.js` line 3 or env var |
| **In-App Admin Mode** | Prompted on first use | Browser prompt |

### Important Security Notes:
- ✅ Change default passwords before deploying to production
- ✅ Store passwords securely
- ✅ Don't share passwords in public repositories
- ✅ Use environment variables for sensitive data

---

## Features Guide

### 1. Creating a Quote

#### Step 1: Select Scope of Work
- Choose the primary service from the "Scope of Work" dropdown
- This determines the base project type

#### Step 2: Enter Customer Details
Fill in the customer information:
- **Name:** Customer's full name
- **Phone:** Contact phone number
- **Email:** Customer's email address
- **Address:** Project location address

#### Step 3: Add Notes
- Use the "Notes" section for special instructions, terms, or scope details
- This will appear on the final quote

#### Step 4: Select Products & Services
Navigate through the collapsible sections:
- **Demolition & Removal**
- **Plumbing & Fixtures**
- **Electrical Work**
- **Bathtub Options**
- **Shower Options**
- **Vanity & Countertops**
- **Flooring & Finishing**

Each section contains relevant dropdowns, checkboxes, and input fields.

#### Step 5: Add Photos (Optional)
1. Click **"+ Add Photos"** button
2. Select up to 15 images from your device
3. Add captions to photos (optional)
4. Remove photos by clicking "Remove" button

#### Step 6: Review Summary
- The **Estimate Summary** updates automatically as you make selections
- Review the total cost at the bottom

#### Step 7: Send or Print Quote

**Option A: Email Quote**
1. Enter recipient email in the "Send Quote To" field
2. Click **"Email Quote"** button
3. Your default email app will open with the quote pre-filled
4. Review and send the email

**Option B: Print/Save PDF**
1. Click **"Print / Save PDF"** button
2. A PDF will be generated and downloaded
3. The PDF includes:
   - Company logo
   - Customer information
   - Complete estimate summary
   - All photos with captions
   - Notes and terms

### 2. Using Admin Mode

#### In-App Admin Controls:
1. Click **🔐 Admin** button (top-right)
2. Enter admin password
3. Admin controls appear under each dropdown:
   - **Add Item:** Enter name and price, click "➕ Add"
   - **Delete Item:** Select item, click "🗑️ Delete Selected"
4. Click **Logout** when finished

#### Standalone Admin Panel:
1. Go to https://one-stop-bath-shop.onrender.com/admin.html
2. Enter password: `admin123`
3. Manage all product categories
4. Changes sync automatically via Supabase database

### 3. Resetting the Form

Click **"Clear All"** button to:
- Clear all selections
- Remove customer information
- Clear notes
- Reset the summary
- Keep photos (use "Clear All" in Photos section to remove)

### 4. Admin Data Reset

When logged in as admin:
1. Click **🔄 Reset Data** button
2. Confirm the action
3. All product data resets to default values

---

## Technical Information

### Database Backend
- **Platform:** Supabase (PostgreSQL)
- **Purpose:** Store product catalog and pricing
- **Access:** Configured via environment variables

### Hosting
- **Platform:** Netlify
- **URL:** https://one-stop-bath-shop.onrender.com
- **Auto-Deploy:** Enabled from GitHub repository

### Environment Variables
Required environment variables (set in Netlify):
```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
VITE_ADMIN_PASSWORD=<your-admin-password>
```

### Browser Compatibility
- ✅ Chrome/Edge (recommended)
- ✅ Safari
- ✅ Firefox
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## Troubleshooting

### Common Issues

#### "Access Denied" Error
- **Cause:** Incorrect site password
- **Solution:** Ensure you're entering `bath2025` (case-sensitive)

#### Admin Controls Not Appearing
- **Cause:** Not logged in as admin
- **Solution:** Click 🔐 Admin button and enter admin password

#### Email Button Not Working
- **Cause:** No email address entered
- **Solution:** Enter email in "Send Quote To" field

#### Photos Not Uploading
- **Cause:** Maximum 15 photos reached
- **Solution:** Remove some photos before adding new ones

#### PDF Not Generating
- **Cause:** Browser popup blocker
- **Solution:** Allow popups for this site

#### Changes Not Saving in Admin Panel
- **Cause:** Database connection issue
- **Solution:** Check internet connection and refresh page

### Getting Help

For technical support or questions:
- **Email:** gregw515151@gmail.com
- **GitHub:** https://github.com/gregw515151-jpg/1-stop-bath-shop

---

## Best Practices

### For Daily Use:
1. ✅ Always fill in customer details completely
2. ✅ Add photos for better documentation
3. ✅ Review the summary before sending quotes
4. ✅ Save PDFs for your records
5. ✅ Log out of admin mode when finished

### For Administrators:
1. ✅ Regularly backup your product database
2. ✅ Keep pricing up to date
3. ✅ Test new products before adding to live system
4. ✅ Monitor Netlify deployment status
5. ✅ Change default passwords immediately

### Security Tips:
1. 🔒 Never share passwords publicly
2. 🔒 Use strong, unique passwords
3. 🔒 Log out when using shared computers
4. 🔒 Regularly review admin access logs
5. 🔒 Keep environment variables secure

---

## Quick Reference

### Keyboard Shortcuts
- **Enter:** Submit forms (login, admin inputs)
- **Ctrl/Cmd + P:** Print (when viewing quote)

### File Locations
- Main app: `index.html`
- Admin panel: `admin.html`
- Passwords: `src/main.js` and `src/admin.js`
- Styling: `src/style.css`
- Logic: `src/app.js`

### Important URLs
- **Live Site:** https://one-stop-bath-shop.onrender.com
- **Admin Panel:** https://one-stop-bath-shop.onrender.com/admin.html
- **GitHub Repo:** https://github.com/gregw515151-jpg/1-stop-bath-shop
- **Netlify Dashboard:** https://app.netlify.com/projects/1stopbathshop

---

## Version Information

**Version:** 1.0  
**Last Updated:** January 2026  
**Developer:** Greg W  
**Company:** 1 Stop Bath Shop

---

## License & Usage

This software is proprietary to 1 Stop Bath Shop. Unauthorized copying, distribution, or modification is prohibited. See the Software Purchase Agreement for complete terms and conditions.

---

**End of User Guide**
