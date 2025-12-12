import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Platform, Pressable, Linking } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Mail, Linkedin, Twitter, Github } from 'lucide-react-native'
import { GlobeView } from '../components/GlobeView'
import { Header } from '../components/Header'
import { TimezoneCards } from '../components/TimezoneCards'
import { useLocationStore } from '../store/useLocationStore'
import { detectUserLocation } from '../lib/geolocation'
import { getNearbyTimezones } from '../lib/timezones'

const { width, height } = Dimensions.get('window')

export default function HomeScreen() {
  const [nearbyTimezones, setNearbyTimezones] = useState<string[]>([
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
    'Asia/Kolkata',
  ])
  const { setUserLocation, userLocation } = useLocationStore()

  useEffect(() => {
    // Detect user location on mount
    detectUserLocation().then((location) => {
      if (location) {
        setUserLocation(location)
        const nearby = getNearbyTimezones(location.latitude, location.longitude, 4)
        setNearbyTimezones(nearby)
      }
      // If location is null, keep the default timezones
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

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Text style={styles.footerText}>Made with ❤️ in India by Kia Labs</Text>
          <View style={styles.socialButtons}>
            <Pressable 
              style={styles.socialButton}
              onPress={() => Linking.openURL('mailto:kapilraghuwanshi5@gmail.com')}
            >
              <Mail size={14} color="rgba(255, 255, 255, 0.5)" />
            </Pressable>
            <Pressable 
              style={styles.socialButton}
              onPress={() => Linking.openURL('https://linkedin.com/in/kapilraghuwanshi')}
            >
              <Linkedin size={14} color="rgba(255, 255, 255, 0.5)" />
            </Pressable>
            <Pressable 
              style={styles.socialButton}
              onPress={() => Linking.openURL('https://twitter.com/kapilraghuwanshi')}
            >
              <Twitter size={14} color="rgba(255, 255, 255, 0.5)" />
            </Pressable>
            <Pressable 
              style={styles.socialButton}
              onPress={() => Linking.openURL('https://github.com/kapilraghuwanshi')}
            >
              <Github size={14} color="rgba(255, 255, 255, 0.5)" />
            </Pressable>
          </View>
        </View>
      </View>
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
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 5,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    fontSize: 10,
    fontWeight: '300',
    color: "orange"
  },
  emailButton: {
    padding: 4,
    opacity: 0.7,
  },
})