import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { GlobeView } from '../components/GlobeView'
import { Header } from '../components/Header'
import { TimezoneCards } from '../components/TimezoneCards'
import { useLocationStore } from '../store/useLocationStore'
import { detectUserLocation } from '../lib/geolocation'
import { getNearbyTimezones } from '../lib/timezones'

const { width, height } = Dimensions.get('window')

export default function HomeScreen() {
  const [nearbyTimezones, setNearbyTimezones] = useState<string[]>([])
  const { setUserLocation, userLocation } = useLocationStore()

  useEffect(() => {
    // Detect user location on mount
    detectUserLocation().then((location) => {
      if (location) {
        setUserLocation(location)
        const nearby = getNearbyTimezones(location.latitude, location.longitude, 4)
        setNearbyTimezones(nearby)
      } else {
        // Default: Show popular timezones
        setNearbyTimezones([
          'America/New_York',
          'Europe/London',
          'Asia/Tokyo',
          'Australia/Sydney',
        ])
      }
    })
  }, [])

  return (
    <View style={styles.container}>
      {/* 3D Globe */}
      <View style={styles.globeContainer}>
        <GlobeView
          initialLat={userLocation?.latitude || 20}
          initialLng={userLocation?.longitude || 0}
        />
      </View>

      {/* Header */}
      <Header />

      {/* Bottom Timezone Cards */}
      <TimezoneCards timezones={nearbyTimezones} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  globeContainer: {
    flex: 1,  // Keep it as flex: 1, not position: absolute
    width: width,
  },
})