import * as Location from 'expo-location'

export interface UserLocation {
  latitude: number
  longitude: number
  timezone: string
}

export async function detectUserLocation(): Promise<UserLocation | null> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') return null

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    })

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      timezone,
    }
  } catch (error) {
    console.error('Error getting location:', error)
    return null
  }
}