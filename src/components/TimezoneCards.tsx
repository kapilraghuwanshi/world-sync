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
      const url = `${window.location.origin}/tz/${timezone}`
      if (navigator.share) {
        await navigator.share({ url, title: `Timezone: ${timezone}` })
      } else {
        await navigator.clipboard.writeText(url)
      }
    } else {
      const { Share } = await import('react-native')
      Share.share({
        message: `Check out ${cityName} timezone: ${time}`,
        url: `worldsync://tz/${timezone}`,
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
    minWidth: 160,
    maxWidth: 220,
    margin: 8,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    width: '100%',
  },
  cardContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  dstBadge: {
    backgroundColor: 'rgba(255, 200, 0, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  dstText: {
    fontSize: 10,
    color: '#ffc800',
    fontWeight: '700',
  },
  time: {
    fontSize: 26,
    fontWeight: '700',
    color: '#da8c05ff',
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  offset: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  shareButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
})