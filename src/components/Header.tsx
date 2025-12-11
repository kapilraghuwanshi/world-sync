import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'
import Animated, { FadeInDown } from 'react-native-reanimated'

export function Header() {
  return (
    <Animated.View entering={FadeInDown} style={styles.container}>
      <BlurView intensity={20} tint="light" style={styles.header}>
        <Text style={styles.title}>🌍 World Sync</Text>
        <Text style={styles.subtitle}>Spin the world, find your timezone in a blink!</Text>
      </BlurView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 2,
    textAlign: 'center',
  },
})