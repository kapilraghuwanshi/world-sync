import { DateTime } from 'luxon';

export interface TimezoneLocation {
  name: string
  city: string
  country: string
  lat: number
  lng: number
}

// Top 24 major timezones with coordinates
export const MAJOR_TIMEZONES = [
  { name: 'America/New_York', lat: 40.7128, lng: -74.0060, city: 'New York' },
  { name: 'America/Los_Angeles', lat: 34.0522, lng: -118.2437, city: 'Los Angeles' },
  { name: 'America/Chicago', lat: 41.8781, lng: -87.6298, city: 'Chicago' },
  { name: 'America/Denver', lat: 39.7392, lng: -104.9903, city: 'Denver' },
  { name: 'America/Toronto', lat: 43.6532, lng: -79.3832, city: 'Toronto' },
  { name: 'America/Mexico_City', lat: 19.4326, lng: -99.1332, city: 'Mexico City' },
  { name: 'America/Sao_Paulo', lat: -23.5505, lng: -46.6333, city: 'São Paulo' },
  { name: 'Europe/London', lat: 51.5074, lng: -0.1278, city: 'London' },
  { name: 'Europe/Paris', lat: 48.8566, lng: 2.3522, city: 'Paris' },
  { name: 'Europe/Berlin', lat: 52.5200, lng: 13.4050, city: 'Berlin' },
  { name: 'Europe/Moscow', lat: 55.7558, lng: 37.6173, city: 'Moscow' },
  { name: 'Africa/Cairo', lat: 30.0444, lng: 31.2357, city: 'Cairo' },
  { name: 'Africa/Johannesburg', lat: -26.2041, lng: 28.0473, city: 'Johannesburg' },
  { name: 'Asia/Dubai', lat: 25.2048, lng: 55.2708, city: 'Dubai' },
  { name: 'Asia/Kolkata', lat: 28.7041, lng: 77.1025, city: 'Mumbai' },
  { name: 'Asia/Bangkok', lat: 13.7563, lng: 100.5018, city: 'Bangkok' },
  { name: 'Asia/Singapore', lat: 1.3521, lng: 103.8198, city: 'Singapore' },
  { name: 'Asia/Shanghai', lat: 31.2304, lng: 121.4737, city: 'Shanghai' },
  { name: 'Asia/Tokyo', lat: 35.6762, lng: 139.6503, city: 'Tokyo' },
  { name: 'Asia/Seoul', lat: 37.5665, lng: 126.9780, city: 'Seoul' },
  { name: 'Australia/Sydney', lat: -33.8688, lng: 151.2093, city: 'Sydney' },
  { name: 'Australia/Melbourne', lat: -37.8136, lng: 144.9631, city: 'Melbourne' },
  { name: 'Pacific/Auckland', lat: -36.8485, lng: 174.7633, city: 'Auckland' },
  { name: 'Pacific/Honolulu', lat: 21.3099, lng: -157.8581, city: 'Honolulu' },
]

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

// Get N nearest timezones to user's location
export function getNearbyTimezones(lat: number, lng: number, count: number = 4): string[] {
  const distances = MAJOR_TIMEZONES.map(tz => ({
    ...tz,
    distance: calculateDistance(lat, lng, tz.lat, tz.lng)
  }))

  distances.sort((a, b) => a.distance - b.distance)
  return distances.slice(0, count).map(tz => tz.name)
}

// Check if timezone is currently in DST
export function isDaylightSavingTime(timezone: string): boolean {
  const dt = DateTime.now().setZone(timezone)
  return dt.isInDST
}

// Find nearest timezone to clicked coordinates
export function findTimezoneByCoordinates(lat: number, lng: number): TimezoneLocation | null {
  let nearest = MAJOR_TIMEZONES[0]
  let minDistance = calculateDistance(lat, lng, nearest.lat, nearest.lng)

  for (const location of MAJOR_TIMEZONES) {
    const distance = calculateDistance(lat, lng, location.lat, location.lng)
    if (distance < minDistance) {
      minDistance = distance
      nearest = location
    }
  }
  // Only return if within reasonable distance (1500km)
  return minDistance < 1500 ? nearest : null
}