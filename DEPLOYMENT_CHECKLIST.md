# Firebase Hosting Deployment Checklist

## ✅ Pre-Deployment Setup Complete

- [x] Created `public/` folder for hosting files
- [x] Moved all website files to `public/` directory
- [x] Renamed `Home.html` to `index.html`
- [x] Created `firebase.json` configuration
- [x] Created `.firebaserc` project config
- [x] Created `.gitignore` for Firebase files

## 📋 Next Steps (To Do)

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Create Firebase Project
- Visit: https://console.firebase.google.com/
- Click "Add project"
- Enter project name (e.g., "ksk-vasu-co")
- Complete project setup
- Copy your project ID

### 4. Update Configuration
- Open `.firebaserc` file
- Replace `"your-firebase-project-id"` with your actual project ID from Firebase Console

### 5. Test Locally (Optional)
```bash
firebase serve
```
- Open browser to http://localhost:5000
- Verify site looks correct

### 6. Deploy to Firebase
```bash
firebase deploy
```

### 7. Access Your Live Site
Your site will be available at:
- `https://YOUR-PROJECT-ID.web.app`
- `https://YOUR-PROJECT-ID.firebaseapp.com`

## 🔧 Useful Commands

```bash
# View deployment status
firebase deploy --only hosting

# View hosting URL
firebase hosting:channel:list

# Rollback deployment
firebase hosting:rollback
```

## 📝 Notes

- All deployment files are in the `public/` folder
- Original files are kept in the root for backup
- You can delete root HTML/CSS/JS files after successful deployment if desired
- Custom domain can be added through Firebase Console

## ⚠️ Important

Before deploying, make sure to:
1. Update `.firebaserc` with your actual Firebase project ID
2. Test locally with `firebase serve`
3. Check all links and images work correctly
