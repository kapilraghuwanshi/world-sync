import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'
import Animated, { FadeInDown } from 'react-native-reanimated'

export function Header() {
  return (
    <Animated.View entering={FadeInDown} style={styles.container}>
      <BlurView intensity={7} tint="light" style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>World S</Text>
          <Text style={styles.thunderEmoji}>⚡</Text>
          <Text style={styles.title}>nc</Text>
        </View>
        <Text style={styles.subtitle}>Spin the world, find your timezone in a blink!</Text>
      </BlurView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 25,
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  thunderEmoji: {
    fontSize: 26,
    marginHorizontal: -2,
    transform: [{ translateY: 7 }, { rotate: '180deg' }],
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '400',
    letterSpacing: 0.5,
  },
})