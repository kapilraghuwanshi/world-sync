// src/components/TimezoneTooltip.tsx
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

interface TimezoneTooltipProps {
  city: string
  country: string
  timezone: string
  currentTime: string
  x: number
  y: number
}

export function TimezoneTooltip({ 
  city, 
  country, 
  timezone, 
  currentTime, 
  x, 
  y 
}: TimezoneTooltipProps) {
  return (
    <Animated.View 
      entering={FadeIn.duration(200)} 
      exiting={FadeOut.duration(200)}
      style={[styles.container, { left: x, top: y }]}
    >
      <View style={styles.tooltip}>
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.country}>{country}</Text>
        <Text style={styles.time}>{currentTime}</Text>
        <Text style={styles.timezone}>{timezone}</Text>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 100,
    pointerEvents: 'none',
  },
  tooltip: {
    borderRadius: 12,
    padding: 12,
    minWidth: 150,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  city: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  country: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
  },
  time: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4ade80',
    marginBottom: 4,
  },
  timezone: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.5)',
  },
})