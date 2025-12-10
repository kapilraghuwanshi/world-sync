import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Platform } from 'react-native'

export function SEOHead() {
  if (Platform.OS !== 'web') return null

  return (
    <Helmet>
      <title>World Sync - Interactive 3D World Clock</title>
      <meta name="description" content="Spin the world, find your time. Beautiful 3D globe timezone explorer. Explore world timezones on a beautiful 3D globe." />
      <meta name="keywords" content="timezone, world clock, 3D globe, interactive, time converter, daylight savings" />
      
      {/* Open Graph */}
      <meta property="og:title" content="World Sync - Interactive 3D World Clock" />
      <meta property="og:description" content="Spin the world, find your time. Beautiful 3D globe timezone explorer." />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/og-image.png" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="World Sync" />
      <meta name="twitter:description" content="Spin the world, find your time. Beautiful 3D globe timezone explorer." />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "World Sync",
          "description": "Interactive 3D globe for exploring world timezones",
          "url": "",
          "applicationCategory": "Utility",
          "operatingSystem": "Web, iOS, Android",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        })}
      </script>
    </Helmet>
  )
}