# World Sync

> Spin the world, find your timezone in a blink!

World Sync is an interactive 3D globe for exploring locations and comparing live time across the world. The web app is published at **[world-syncc.vercel.app](https://world-syncc.vercel.app/)**.

Get the Android app on [Google Play](https://play.google.com/store/apps/details?id=com.kialabs.worldsync).

<p align="center">
  <img width="720" alt="World Sync interactive globe" src="https://github.com/user-attachments/assets/d4361379-02d9-4b6c-b506-b37a0bed216b" />
</p>

## Features

- Drag and spin a textured 3D globe with an automatic rotation.
- Select a location on the globe to see its city and time zone when available.
- Compare live clocks for four time zones; optionally use browser location to center the globe and find nearby time zones.
- Use the privacy and support pages at [`/privacy`](https://world-syncc.vercel.app/privacy) and [`/support`](https://world-syncc.vercel.app/support).
- Responsive dark interface with timezone cards and a star field.

## Privacy

Location access is optional. If granted, the app uses the browser's location while open to center the globe and select nearby time zones. Coordinates remain on the device and are not sent to World Sync servers. The app does not use IP-based geolocation, accounts, advertising SDKs, or analytics.

The globe loads Earth imagery from jsdelivr.net and supporting textures from unpkg.com. As described in the [privacy policy](https://world-syncc.vercel.app/privacy), these providers may receive your IP address and standard request information.

## Tech Stack

- Expo SDK 54 and React Native Web
- React 19 and TypeScript
- Three.js and React Three Fiber
- Luxon for timezone and date handling
- React Navigation for in-app routes

## Run Locally

```bash
npm install
npm run web
```

The Expo development server will provide a local web URL.

To create a production web export:

```bash
npm run build:web
```

The static website is generated in `dist/`.

## Deploy to Vercel

The project is configured in [`vercel.json`](./vercel.json) to build the web export from the repository root and publish `dist/`. Sign in with the Vercel CLI, link this repository to the existing Vercel project if needed, then deploy:

```bash
npx vercel login
npx vercel link
npx vercel --prod
```

The deployed site is [world-syncc.vercel.app](https://world-syncc.vercel.app/).

## Secrets

The current web app does not require API keys. Never commit access tokens, credentials, signing keys, or local `.env` files. Keep any future local secrets in ignored environment files and document required variable names with empty placeholders in `.env.example`.

## Contributing

Issues and pull requests are welcome. Please keep changes focused and do not include credentials or other private information in contributions.
