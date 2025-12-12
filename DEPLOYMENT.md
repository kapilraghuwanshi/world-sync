# 🚀 World S⚡nc - Deployment Guide

Complete guide to test on mobile devices and deploy to production on all platforms.

---

## 📱 Mobile Testing Setup

### Prerequisites
- Node.js 18+ installed
- Expo Go app installed on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- All dependencies installed: `npm install`

### Option 1: Test on Physical Device (Recommended)

#### Step 1: Start Expo Dev Server
```bash
npm start
```

#### Step 2: Scan QR Code
- **iOS**: Open Camera app → Scan QR code → Tap notification
- **Android**: Open Expo Go app → Scan QR code

#### Step 3: Test the App
The app will load on your device with hot reloading enabled!

### Option 2: Test on Emulator/Simulator

#### iOS Simulator (Mac only)
```bash
# Install Xcode from App Store first
npm run ios
```

#### Android Emulator
```bash
# Install Android Studio & setup emulator first
npm run android
```

---

## 🌐 Web Deployment (Vercel)

### Setup
1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Build web version:
```bash
npm run build:web
```

3. Deploy to Vercel:
```bash
cd dist
vercel --prod
```

---

## 📱 iOS Deployment (App Store)

### Prerequisites
- Apple Developer Account ($99/year)
- Mac with Xcode installed
- EAS CLI: `npm install -g eas-cli`

### Setup EAS Build
```bash
# Login to Expo
eas login

eas init
# Configure project
eas build:configure

npx expo prebuild
```

### Build for iOS
```bash
# Build for TestFlight (internal testing)
eas build --platform ios --profile preview

# Build for App Store
eas build --platform ios --profile production
```

### Submit to App Store
```bash
eas submit --platform ios
```

### Free Alternative: Expo Go
Users can run your app via Expo Go without App Store:
1. Publish your app: `expo publish`
2. Share the expo.dev link with users
3. They open it in Expo Go app

---

## 🤖 Android Deployment (Google Play)

### Prerequisites
- Google Play Developer Account ($25 one-time)
- EAS CLI: `npm install -g eas-cli`

### Build APK (Free Distribution)
```bash
# Build APK for direct download
eas build --platform android --profile preview

# Download and share the APK file
```

### Build AAB (Play Store)
```bash
# Build for Google Play Store
eas build --platform android --profile production
```

### Submit to Play Store
```bash
eas submit --platform android
```

### Free Alternative: Direct APK Distribution
1. Build APK: `eas build --platform android --profile preview`
2. Download the APK from EAS dashboard
3. Share APK file directly (users need to enable "Install from Unknown Sources")

---

## 🆓 Completely Free Deployment Options

### Web (100% Free)
- **Vercel**: Unlimited projects, custom domain, auto-deploy
- **Netlify**: Similar to Vercel
- **GitHub Pages**: Free hosting for static sites

### Mobile (Free Testing)
- **Expo Go**: Users can run app without downloading from stores
- **APK Direct**: Share Android APK files directly
- **TestFlight**: iOS beta testing (needs Apple Developer account)

---

## 🔧 Platform-Specific Fixes (Already Implemented)

### ✅ Web Compatibility
- React Native Web handles native components
- Platform checks for web-specific features (navigator.share, clipboard)
- All Three.js features work on web

### ✅ iOS Compatibility
- Location permissions configured in `app.json`
- Safe area handling with `react-native-safe-area-context`
- No iOS-specific issues

### ✅ Android Compatibility
- Location permissions configured in `app.json`
- Adaptive icon configured
- Gesture handler setup for smooth interactions

---

## 📊 Pre-Deployment Checklist

### Required Updates (Already Done ✓)
- [x] Platform-specific code separated
- [x] Location permissions configured
- [x] App icons and splash screens
- [x] Bundle identifiers set
- [x] No console.logs in production

### Before First Deploy
- [ ] Test on iOS device/simulator
- [ ] Test on Android device/emulator
- [ ] Test web build locally
- [ ] Update app version in `app.json`
- [ ] Create app icons if needed (currently using defaults)

---

## 🎯 Quick Start Commands

```bash
# Test on physical device
npm start

# Test web version
npm run web

# Build for web deployment
npm run build:web

# Build iOS app
npm run build:ios

# Build Android app
npm run build:android
```

---

## 🌍 Deployment URLs (Examples)

After deployment, your app will be available at:
- **Web**: `https://world-sync.vercel.app`
- **iOS**: App Store or TestFlight link
- **Android**: Play Store or APK download link
- **Expo**: `exp://exp.host/@yourusername/world-sync`

---

## 💡 Pro Tips

1. **Start with Web**: Deploy to Vercel first (easiest & free)
2. **Test with Expo Go**: Test mobile versions without app store submission
3. **Use EAS Build**: Build iOS/Android apps without Mac/Android Studio
4. **APK for Beta**: Share Android APKs directly for beta testing
5. **Custom Domain**: Add custom domain to Vercel deployment (free)

---

## 🆘 Common Issues & Solutions

### Issue: Three.js not working on mobile
**Solution**: Already handled - using @react-three/fiber/native

### Issue: Location not working
**Solution**: Permissions already configured in app.json

### Issue: Gestures not smooth
**Solution**: react-native-gesture-handler already installed

### Issue: Web build fails
**Solution**: Run `npm run build:web` and check dist folder

---

## 📞 Support

For deployment help:
- Email: kapilraghuwanshi5@gmail.com
- Check Expo docs: https://docs.expo.dev

---

**Ready to deploy! 🚀**
