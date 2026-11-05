# Google Play listing draft

## App details

- **App name:** World Sync
- **Package name:** `com.kialabs.worldsync`
- **App version:** `1.0.0` (from `app.json`)
- **Initial Android version code:** `1` (from `android/app/build.gradle`)
- **Category:** Travel & Local (suggested)
- **Audience:** General audience; not specifically directed to children
- **Developer name:** Tech monk-Kapil
- **Support email:** kapil.raghuwanshi5@gmail.com
- **Privacy policy:** `https://<your-public-site>/privacy` — replace this after the Vercel site is deployed and verify the link in a private browser window.
- **Support page:** `https://<your-public-site>/support`

Google Play listing text limits are 30 characters for the app name, 80 for
the short description, and 4,000 for the full description.

## Short description

Spin a 3D globe to explore time zones and find the local time worldwide.

## Full description

Find the time anywhere in a more visual way.

World Sync turns the globe into a live world clock. Spin Earth, tap a place to
explore its time zone, and keep nearby clocks in view as local times update.

• Explore an interactive 3D globe  
• Tap the globe to discover a place and its time zone  
• Follow live local times across nearby time zones  
• Optionally use device location to center the globe  
• Keep exploring if you choose not to share your location

World Sync does not require an account. Location access is optional and is used
while the app is open to center the globe and find nearby time zones. Read the
privacy policy for details about location and third-party image providers.

## Listing artwork

- **App icon:** `assets/store/play-icon-512.png` (512 × 512 PNG)
- **Feature graphic:** `assets/store/feature-graphic.png` (1024 × 500 PNG)
- **Editable feature graphic:** `assets/store/feature-graphic.svg`
- **Phone screenshots:** Capture genuine screenshots from a release build on
  an Android phone or emulator. Suggested set: the globe, a tapped location
  with its time-zone details, and the live timezone clocks. Do not use mock
  device frames or claim features that are not in the app.

The app icon and feature graphic are prepared. Add the real phone screenshots
in Play Console after testing the signed build.

## Data safety notes

The app requests location only after the user sees the in-app explanation and
chooses **Use my location**. The app uses that location in the current session
and does not send coordinates to World Sync servers. The web IP-geolocation
fallback has been removed.

The globe loads texture images from `raw.githubusercontent.com` and `unpkg.com`.
Those hosts may receive standard request information, including the user's IP
address. The website host and app stores may also receive ordinary technical
request information. Disclose these providers in the privacy policy and
answer Play Console's Data safety questions based on the final release and
every included SDK/service. In particular, review whether the automatic
third-party image requests require declaring device or other identifiers as
shared with service providers. Do not claim “no data collected or shared”
without validating that against Google's definitions and the final binaries.

## Release checklist

- Deploy the website and verify `/privacy` and `/support` load publicly over
  HTTPS. Put the exact privacy URL in Play Console.
- Upload the signed Android App Bundle (`.aab`) to the Internal testing track.
- Complete the Data safety form, content rating, app access, and target
  audience declarations.
- Confirm the store screenshots show the actual release build and the app's
  optional-location behavior.
- Keep the upload keystore and passwords private and make a secure backup.
- Increase `versionCode` in Android Studio for each subsequent manual release;
  update `version` in `app.json` when the user-facing release version changes.

See Google's [User Data policy](https://support.google.com/googleplay/android-developer/answer/10144311)
and [app setup and store listing guide](https://support.google.com/googleplay/android-developer/answer/9859152)
before submitting.
