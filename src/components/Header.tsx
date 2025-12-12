import React from 'react'
import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import { BlurView } from 'expo-blur'
import Animated, { FadeInDown } from 'react-native-reanimated'

export function Header() {
  return (
    <Animated.View entering={FadeInDown} style={styles.container}>
      <BlurView intensity={7} tint="light" style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>🌍 World S</Text>
            <Text style={styles.thunderEmoji}>⚡</Text>
            <Text style={styles.title}>nc</Text>
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
    top: Platform.OS === 'web' ? 25 : 15,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    borderRadius: Platform.OS === 'web' ? 15 : 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    padding: Platform.OS === 'web' ? 10 : 8,
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Platform.OS === 'web' ? 8 : 6,
  },
  logo: {
    width: Platform.OS === 'web' ? 36 : 28,
    height: Platform.OS === 'web' ? 36 : 28,
    borderRadius: Platform.OS === 'web' ? 18 : 14,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: Platform.OS === 'web' ? 28 : 20,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: Platform.OS === 'web' ? 1 : 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  thunderEmoji: {
    fontSize: Platform.OS === 'web' ? 30 : 22,
    marginHorizontal: -2,
    transform: [{ translateY: Platform.OS === 'web' ? 7 : 5 }, { rotate: '180deg' }],
  },
  subtitle: {
    fontSize: Platform.OS === 'web' ? 13 : 10,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    fontWeight: '400',
    letterSpacing: Platform.OS === 'web' ? 0.5 : 0.3,
  },
})