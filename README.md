# World S⚡nc

> Spin the world, find your timezone in a blink!

Interactive 3D globe to explore world timezones in real-time. Built with Expo for web, iOS, and Android.

## 📦 Tech Stack
- **Expo** ~54.0.27 - Universal app framework
- **React Native** 0.76.5 + **TypeScript**
- **Three.js** + **React Three Fiber** - 3D graphics
- **Luxon** - Timezone & datetime handling
- **Zustand** - Lightweight state management
- **Expo Location** - Geolocation
- **React Navigation** - Routing & deep linking

## ✨ Features

### 🌍 Interactive Globe
- Realistic 3D Earth with NASA Blue Marble texture
- Smooth drag rotation (horizontal & vertical)
- Auto-rotation with smart pause system
- Visible country borders & topography
- 5000 animated background stars

### 📍 Location Detection
- Click anywhere on globe to detect timezone
- UV-based coordinate mapping for accuracy
- 50+ major cities worldwide coverage
- Smart pause: 10s after click, 5s after drag
- Tooltip auto-closes when rotation resumes

### 🧭 Reference Lines
- Prime Meridian (0° longitude) - Greenwich to South Pole
- Equator (0° latitude) - across Africa, South America, Asia
- Golden semi-transparent styling

### 🕐 Live Timezone Display
- 4 nearby timezone cards with live clocks
- Real-time updates every second
- City, country, and timezone info
- Glassmorphism UI with blur effects

### 🎨 Design
- Elegant "World S⚡nc" header with rotated thunder emoji
- Dark theme with gradient backgrounds
- Responsive layout for all screen sizes
- Smooth animations with React Native Reanimated

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server (scan QR with Expo Go app)
npm start

# Start for web
npm run web

# Start on iOS simulator (Mac only)
npm run ios

# Start on Android emulator
npm run android
```

## 📱 Testing on Mobile Devices

### Easy Way (Recommended)
1. Install Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
2. Run `npm start` in terminal
3. Scan QR code with your phone
4. App loads instantly with hot reload! 🎉

### Build Standalone Apps
See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide

## 🌐 Deployment

### Web (Vercel - Free)
```bash
npm run build:web
cd dist
vercel --prod
```

### iOS & Android
```bash
# Install EAS CLI
npm install -g eas-cli

# Build for iOS
eas build --platform ios

# Build for Android  
eas build --platform android
```

**Full deployment guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🎯 Geo Location
https://get.geojs.io/v1/ip/geo.json is a free IP geolocation API that returns information about the user's location based on their IP address.

## 🎯 Roadmap
 3D globe with auto-rotation
 Location detection
 4 nearby timezones
 DST support
 Shareable links
 Click country → show timezone
 Search timezones
 Compare multiple times
 Google Ads integration

##  🤝 Contributing
Fork the repo
Create your feature branch
Commit your changes
Push to the branch
Open a Pull Request