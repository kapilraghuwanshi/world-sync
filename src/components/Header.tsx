import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import { BlurView } from 'expo-blur'
import Animated, { FadeInDown } from 'react-native-reanimated'

const { width } = Dimensions.get('window')
const isSmallScreen = width < 768

export function Header() {
  return (
    <Animated.View entering={FadeInDown} style={styles.container}>
      <BlurView intensity={7} tint="light" style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>🌍 WORLD  S</Text>
            <Text style={styles.thunderEmoji}>⚡</Text>
            <Text style={styles.title}>NC</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Spin the world, find your timezone in a blink!</Text>
      </BlurView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: isSmallScreen ? 15 : 25,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    borderRadius: isSmallScreen ? 12 : 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    padding: isSmallScreen ? 4 : 6,
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: isSmallScreen ? 6 : 8,
  },
  logo: {
    width: isSmallScreen ? 28 : 36,
    height: isSmallScreen ? 28 : 36,
    borderRadius: isSmallScreen ? 14 : 18,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: isSmallScreen ? 16 : 22,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: isSmallScreen ? 0.5 : 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  thunderEmoji: {
    fontSize: isSmallScreen ? 22 : 30,
    marginHorizontal: -2,
    transform: [{ translateY: isSmallScreen ? 5 : 7 }],
  },
  subtitle: {
    fontSize: isSmallScreen ? 10 : 13,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    fontWeight: '400',
    letterSpacing: isSmallScreen ? 0.3 : 0.5,
  },
})