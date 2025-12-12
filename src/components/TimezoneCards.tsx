import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable, Platform, Dimensions } from 'react-native'
import { DateTime } from 'luxon'
import { BlurView } from 'expo-blur'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { Share2 } from 'lucide-react-native'

const { width } = Dimensions.get('window')

interface TimezoneCardsProps {
  timezones: string[]
}

export function TimezoneCards({ timezones }: TimezoneCardsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {timezones.map((tz, index) => (
          <Animated.View
            key={tz}
            entering={FadeInDown.delay(index * 100)}
            style={styles.cardWrapper}
          >
            <TimezoneCard timezone={tz} />
          </Animated.View>
        ))}
      </View>
    </View>
  )
}

function TimezoneCard({ timezone }: { timezone: string }) {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [offset, setOffset] = useState('')
  const [isDST, setIsDST] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const dt = DateTime.now().setZone(timezone)
      setTime(dt.toFormat('HH:mm:ss'))
      setDate(dt.toFormat('EEE, MMM d'))
      setOffset(dt.toFormat('ZZZ'))
      setIsDST(dt.isInDST)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [timezone])

  const cityName = timezone.split('/')[1]?.replace(/_/g, ' ') || timezone

  const handleShare = async () => {
    if (Platform.OS === 'web') {
      const shareText = `Check out ${cityName} timezone: ${time} (${offset})\n${window.location.origin} World Sync by Tech Monk Kapil`
      if (navigator.share) {
        await navigator.share({ 
          text: shareText,
          title: `${cityName} Time - World Sync`,
          url: window.location.origin
        })
      } else {
        await navigator.clipboard.writeText(shareText)
        // Could add a toast notification here
      }
    } else {
      const { Share } = await import('react-native')
      Share.share({
        message: `Check out ${cityName} timezone: ${time} (${offset})\n\nWorld Sync App`,
      })
    }
  }

  return (
    <Pressable onPress={handleShare}>
      <BlurView intensity={30} tint="dark" style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.header}>
            <Text style={styles.cityName}>{cityName}</Text>
            {isDST && (
              <View style={styles.dstBadge}>
                <Text style={styles.dstText}>DST</Text>
              </View>
            )}
          </View>

          <Text style={styles.time}>{time}</Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.offset}>{offset}</Text>

          <View style={styles.shareButton}>
            <Share2 size={16} color="#ffffff80" />
          </View>
        </View>
      </BlurView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    zIndex: 10,  // Add this
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    maxWidth: 900,
    width: '100%',
  },
  cardWrapper: {
    width: width > 768 ? '22%' : '45%',
    minWidth: Platform.OS === 'web' ? 160 : 80,
    maxWidth: Platform.OS === 'web' ? 220 : 140,
    margin: Platform.OS === 'web' ? 8 : 4,
  },
  card: {
    borderRadius: Platform.OS === 'web' ? 20 : 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    width: '100%',
  },
  cardContent: {
    padding: Platform.OS === 'web' ? 20 : 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Platform.OS === 'web' ? 12 : 6,
  },
  cityName: {
    fontSize: Platform.OS === 'web' ? 16 : 10,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  dstBadge: {
    backgroundColor: 'rgba(255, 200, 0, 0.3)',
    paddingHorizontal: Platform.OS === 'web' ? 8 : 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  dstText: {
    fontSize: Platform.OS === 'web' ? 10 : 6,
    color: '#ffc800',
    fontWeight: '700',
  },
  time: {
    fontSize: Platform.OS === 'web' ? 26 : 18,
    fontWeight: '700',
    color: 'lightgreen',
    marginBottom: 4,
  },
  date: {
    fontSize: Platform.OS === 'web' ? 16 : 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  offset: {
    fontSize: Platform.OS === 'web' ? 12 : 10,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  shareButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
})