# 1 STOP BATH SHOP - QUICK REFERENCE CARD

---

## 🔑 PASSWORDS & ACCESS

| **What** | **Password** | **Where to Change** |
|----------|-------------|---------------------|
| **Main Site** | ~~None (Public)~~ | `src/main.js` line 9 (disabled) |
| **Admin Panel** | `admin123` | `src/admin.js` line 3 |

---

## 🌐 IMPORTANT URLS

- **Live Site:** https://one-stop-bath-shop.onrender.com
- **Admin Panel:** https://one-stop-bath-shop.onrender.com/admin.html
- **GitHub:** https://github.com/gregw515151-jpg/1-stop-bath-shop
- **Netlify Dashboard:** https://app.netlify.com/projects/1stopbathshop

---

## 📧 CONTACT INFO

- **Email:** gregw515151@gmail.com
- **Company:** 1 Stop Bath Shop

---

## ⚡ QUICK START

### For Users:
1. Go to https://one-stop-bath-shop.onrender.com
2. ~~No password needed - site is public!~~
3. Fill in customer details
4. Select products and services
5. Add photos (optional)
6. Click "Share PDF" or "Print / Save PDF"

### For Admins:
1. Click 🔐 Admin button (or go to /admin.html)
2. Enter password: `admin123`
3. Add/delete products as needed
4. Click Logout when done

---

## 🛠️ COMMON TASKS

### Re-enable Site Password (if needed):
Edit `src/main.js` line 9-40:
Uncomment the password protection code

### Change Admin Password:
Edit `src/admin.js` line 3:
```javascript
const ADMIN_PASSWORD = 'YOUR_NEW_PASSWORD';
```

### Deploy Changes:
```bash
git add .
git commit -m "Your message"
git push
```
(Netlify auto-deploys)

---

## 📱 FEATURES

✅ Public access (no password)  
✅ Customer information capture  
✅ Product selection dropdowns  
✅ Photo upload (up to 15)  
✅ PDF generation  
✅ Share PDF links  
✅ Admin product management  
✅ Mobile-friendly  
✅ Auto-calculating totals  

---

## 🆘 TROUBLESHOOTING

**Can't access site?**  
→ Site is public now - just go to the URL!

**Admin controls not showing?**  
→ Click 🔐 Admin and enter password

**PDF Link not opening?**  
→ Check internet connection/popup blocker

**Changes not saving?**  
→ Check internet connection, refresh page

---

## 📄 DOCUMENTS

- **USER_GUIDE.md** - Complete instructions
- **SOFTWARE_PURCHASE_AGREEMENT.md** - Sales contract
- **README.md** - Technical documentation

---

## 💾 BACKUP REMINDER

✅ Backup Supabase database monthly  
✅ Keep copy of source code  
✅ Save environment variables  
✅ Export product catalog regularly  

---

**Print this card and keep it handy!**
