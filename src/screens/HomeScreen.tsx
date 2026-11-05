import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Pressable, Modal, Share, Linking } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Mail, Linkedin, Twitter, Github, Globe, ShieldCheck, LifeBuoy, Share2 } from 'lucide-react-native'
import { GlobeView } from '../components/GlobeView'
import { Header } from '../components/Header'
import { TimezoneCards } from '../components/TimezoneCards'
import { useLocationStore } from '../store/useLocationStore'
import { detectUserLocation } from '../lib/geolocation'
import { getNearbyTimezones } from '../lib/timezones'
import { RootStackParamList } from '../navigation/types'

const { width } = Dimensions.get('window')
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.kialabs.worldsync'

export default function HomeScreen({ navigation }: { navigation: NativeStackNavigationProp<RootStackParamList, 'Home'> }) {
  const [nearbyTimezones, setNearbyTimezones] = useState<string[]>([
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
    'Asia/Kolkata',
  ])
  const [showLocationDisclosure, setShowLocationDisclosure] = useState(true)
  const { setUserLocation, userLocation } = useLocationStore()

  const handleUseLocation = async () => {
    setShowLocationDisclosure(false)
    const location = await detectUserLocation()
    if (!location) return

    setUserLocation(location)
    setNearbyTimezones(getNearbyTimezones(location.latitude, location.longitude, 4))
  }

  const shareApp = () => {
    Share.share({
      title: 'World Sync',
      message: `Spin the world, find your timezone in a blink! ${PLAY_STORE_URL}`,
      url: PLAY_STORE_URL,
    })
  }

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

      <Modal
        visible={showLocationDisclosure}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLocationDisclosure(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.locationDialog} accessibilityViewIsModal>
            <View style={styles.locationIcon}>
              <Globe size={22} color="#f4b52b" />
            </View>
            <Text style={styles.locationTitle}>Center your view?</Text>
            <Text style={styles.locationCopy}>
              If you choose to continue, World Sync uses your location while the app is open to center the globe and find nearby time zones. Your coordinates stay on your device and are not sent to World Sync servers. Your device or browser will ask permission next.
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={handleUseLocation}
              style={styles.locationPrimary}
            >
              <Text style={styles.locationPrimaryText}>Use my location</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={() => setShowLocationDisclosure(false)}
              style={styles.locationSecondary}
            >
              <Text style={styles.locationSecondaryText}>Continue without location</Text>
            </Pressable>
            <Pressable
              accessibilityRole="link"
              onPress={() => {
                setShowLocationDisclosure(false)
                navigation.navigate('Privacy')
              }}
              style={styles.locationPrivacy}
            >
              <Text style={styles.locationPrivacyText}>Read the privacy policy</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Text style={styles.footerText}>Made with ❤️ in India by Tech Monk-Kapil</Text>
          <View style={styles.socialButtons}>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel="Email Tech Monk-Kapil"
              style={styles.socialButton}
              onPress={() => Linking.openURL('mailto:kapilraghuwanshi5@gmail.com')}
            >
              <Mail size={14} color="rgba(255, 255, 255, 0.6)" />
            </Pressable>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel="LinkedIn"
              style={styles.socialButton}
              onPress={() => Linking.openURL('https://linkedin.com/in/kapilraghuwanshi')}
            >
              <Linkedin size={14} color="rgba(255, 255, 255, 0.6)" />
            </Pressable>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel="X"
              style={styles.socialButton}
              onPress={() => Linking.openURL('https://x.com/techygeeeky')}
            >
              <Twitter size={14} color="rgba(255, 255, 255, 0.6)" />
            </Pressable>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel="GitHub"
              style={styles.socialButton}
              onPress={() => Linking.openURL('https://github.com/kapilraghuwanshi')}
            >
              <Github size={14} color="rgba(255, 255, 255, 0.6)" />
            </Pressable>
          </View>
        </View>
        <View style={styles.footerLinks}>
          <Pressable
            accessibilityRole="link"
            onPress={() => navigation.navigate('Privacy')}
            style={styles.footerLink}
          >
            <ShieldCheck size={13} color="#b9d8e7" />
            <Text style={styles.footerLinkText}>Privacy</Text>
          </Pressable>
          <Pressable
            accessibilityRole="link"
            onPress={() => navigation.navigate('Support')}
            style={styles.footerLink}
          >
            <LifeBuoy size={13} color="#b9d8e7" />
            <Text style={styles.footerLinkText}>Support</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={shareApp}
            style={styles.footerLink}
          >
            <Share2 size={13} color="#b9d8e7" />
            <Text style={styles.footerLinkText}>Share app</Text>
          </Pressable>
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
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 5,
    paddingTop: 6,
    paddingBottom: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    flexWrap: 'wrap',
    minHeight: 22,
  },
  footerText: {
    fontSize: 9,
    fontWeight: '300',
    color: '#e5b748',
  },
  socialButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  socialButton: {
    padding: 4,
    opacity: 0.8,
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: width < 420 ? 16 : 24,
    marginTop: 1,
  },
  footerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
  },
  footerLinkText: {
    color: '#b9d8e7',
    fontSize: 10,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 22,
    backgroundColor: 'rgba(2, 8, 20, 0.84)',
  },
  locationDialog: {
    width: '100%',
    maxWidth: 430,
    padding: 24,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(172, 202, 228, 0.24)',
    backgroundColor: '#0c182b',
  },
  locationIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(244, 181, 43, 0.12)',
  },
  locationTitle: {
    color: '#f4f7fb',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 18,
    marginBottom: 10,
  },
  locationCopy: {
    color: '#c4d0df',
    fontSize: 14,
    lineHeight: 21,
  },
  locationPrimary: {
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 13,
    marginTop: 22,
    backgroundColor: '#f4b52b',
  },
  locationPrimaryText: {
    color: '#101a29',
    fontSize: 14,
    fontWeight: '700',
  },
  locationSecondary: {
    alignItems: 'center',
    paddingVertical: 13,
  },
  locationSecondaryText: {
    color: '#e5edf5',
    fontSize: 14,
    fontWeight: '600',
  },
  locationPrivacy: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  locationPrivacyText: {
    color: '#a8c9dd',
    fontSize: 12,
  },
})