import * as Location from 'expo-location'
import { Platform } from 'react-native'

export interface UserLocation {
  latitude: number
  longitude: number
  timezone: string
}

export async function detectUserLocation(): Promise<UserLocation | null> {
  try {
    // Request permission
    const { status } = await Location.requestForegroundPermissionsAsync()
    
    if (status !== 'granted') {
      console.log('Location permission denied, using IP fallback')
      return await getLocationFromIP()
    }

    // Get current position
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    })

    // Use Intl API to get timezone instead of Location.getTimezoneAsync
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      timezone,
    }
  } catch (error) {
    console.error('Error getting location:', error)
    return await getLocationFromIP()
  }
}

async function getLocationFromIP(): Promise<UserLocation | null> {
  try {
    // Fallback: Use IP geolocation (web only)
    if (Platform.OS === 'web') {
      const response = await fetch('https://get.geojs.io/v1/ip/geo.json')
      const data = await response.json()
      
      return {
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        timezone: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      }
    }
    
    // For mobile without permission, use default timezone
    return {
      latitude: 0,
      longitude: 0,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }
  } catch (error) {
    console.error('IP geolocation failed:', error)
    return {
      latitude: 0,
      longitude: 0,
      timezone: 'UTC',
    }
  }
}