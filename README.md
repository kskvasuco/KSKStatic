# KSK VASU & Co Website

This website is configured for Firebase Hosting.

## Project Structure

```
KSK VASU & Co 2.0/
├── public/                 # Deployment folder for Firebase Hosting
│   ├── index.html         # Main homepage (was Home.html)
│   ├── developer.html     # Developer page
│   ├── Styles.css         # Main stylesheet
│   ├── Script.js          # Main JavaScript file
│   └── images/            # Image assets
├── firebase.json          # Firebase Hosting configuration
├── .firebaserc            # Firebase project configuration
└── .gitignore             # Git ignore rules
```

## Firebase Hosting Setup

### Prerequisites
1. Install Node.js and npm
2. Install Firebase CLI: `npm install -g firebase-tools`

### Initial Setup

1. **Login to Firebase**
   ```bash
   firebase login
   ```

2. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Follow the setup wizard
   - Copy your project ID

3. **Update Project Configuration**
   - Open `.firebaserc`
   - Replace `your-firebase-project-id` with your actual Firebase project ID

### Deployment

1. **Test Locally** (Optional)
   ```bash
   firebase serve
   ```
   This will serve your site at `http://localhost:5000`

2. **Deploy to Firebase Hosting**
   ```bash
   firebase deploy
   ```

3. **Your site will be live at:**
   ```
   https://your-firebase-project-id.web.app
   https://your-firebase-project-id.firebaseapp.com
   ```

### Custom Domain (Optional)

1. Go to Firebase Console > Hosting
2. Click "Add custom domain"
3. Follow the instructions to configure your domain

## File Updates

- **Home.html** → Renamed to **index.html** (Firebase hosting standard)
- All files moved to the **public/** folder for deployment

## Quick Deploy Commands

```bash
# Deploy hosting only
firebase deploy --only hosting

# View deployment history
firebase hosting:channel:list

# Rollback to previous version
firebase hosting:rollback
```

## Support

For Firebase Hosting documentation, visit:
https://firebase.google.com/docs/hosting
