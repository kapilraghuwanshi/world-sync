// src/lib/timezones.ts
import { DateTime } from 'luxon';

export interface TimezoneLocation {
  name: string
  city: string
  country: string
  lat: number
  lng: number
}

// Extended timezone data with country info (50+ major cities for better coverage)
export const MAJOR_TIMEZONES: TimezoneLocation[] = [
  // Americas
  { name: 'America/New_York', city: 'New York', country: 'United States', lat: 40.7128, lng: -74.0060 },
  { name: 'America/Los_Angeles', city: 'Los Angeles', country: 'United States', lat: 34.0522, lng: -118.2437 },
  { name: 'America/Chicago', city: 'Chicago', country: 'United States', lat: 41.8781, lng: -87.6298 },
  { name: 'America/Denver', city: 'Denver', country: 'United States', lat: 39.7392, lng: -104.9903 },
  { name: 'America/Toronto', city: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832 },
  { name: 'America/Vancouver', city: 'Vancouver', country: 'Canada', lat: 49.2827, lng: -123.1207 },
  { name: 'America/Mexico_City', city: 'Mexico City', country: 'Mexico', lat: 19.4326, lng: -99.1332 },
  { name: 'America/Bogota', city: 'Bogotá', country: 'Colombia', lat: 4.7110, lng: -74.0721 },
  { name: 'America/Lima', city: 'Lima', country: 'Peru', lat: -12.0464, lng: -77.0428 },
  { name: 'America/Sao_Paulo', city: 'São Paulo', country: 'Brazil', lat: -23.5505, lng: -46.6333 },
  { name: 'America/Buenos_Aires', city: 'Buenos Aires', country: 'Argentina', lat: -34.6037, lng: -58.3816 },
  { name: 'America/Santiago', city: 'Santiago', country: 'Chile', lat: -33.4489, lng: -70.6693 },
  
  // Europe
  { name: 'Europe/London', city: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278 },
  { name: 'Europe/Paris', city: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522 },
  { name: 'Europe/Berlin', city: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050 },
  { name: 'Europe/Rome', city: 'Rome', country: 'Italy', lat: 41.9028, lng: 12.4964 },
  { name: 'Europe/Madrid', city: 'Madrid', country: 'Spain', lat: 40.4168, lng: -3.7038 },
  { name: 'Europe/Moscow', city: 'Moscow', country: 'Russia', lat: 55.7558, lng: 37.6173 },
  { name: 'Europe/Istanbul', city: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784 },
  { name: 'Europe/Athens', city: 'Athens', country: 'Greece', lat: 37.9838, lng: 23.7275 },
  
  // Africa
  { name: 'Africa/Cairo', city: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357 },
  { name: 'Africa/Lagos', city: 'Lagos', country: 'Nigeria', lat: 6.5244, lng: 3.3792 },
  { name: 'Africa/Johannesburg', city: 'Johannesburg', country: 'South Africa', lat: -26.2041, lng: 28.0473 },
  { name: 'Africa/Nairobi', city: 'Nairobi', country: 'Kenya', lat: -1.2864, lng: 36.8172 },
  { name: 'Africa/Casablanca', city: 'Casablanca', country: 'Morocco', lat: 33.5731, lng: -7.5898 },
  { name: 'Africa/Addis_Ababa', city: 'Addis Ababa', country: 'Ethiopia', lat: 9.0320, lng: 38.7469 },
  { name: 'Africa/Dakar', city: 'Dakar', country: 'Senegal', lat: 14.6928, lng: -17.4467 },
  { name: 'Africa/Accra', city: 'Accra', country: 'Ghana', lat: 5.6037, lng: -0.1870 },
  
  // Asia
  { name: 'Asia/Dubai', city: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708 },
  { name: 'Asia/Kolkata', city: 'Mumbai', country: 'India', lat: 19.0760, lng: 72.8777 },
  { name: 'Asia/Kolkata', city: 'Delhi', country: 'India', lat: 28.6139, lng: 77.2090 },
  { name: 'Asia/Kolkata', city: 'Bangalore', country: 'India', lat: 12.9716, lng: 77.5946 },
  { name: 'Asia/Kolkata', city: 'Chennai', country: 'India', lat: 13.0827, lng: 80.2707 },
  { name: 'Asia/Bangkok', city: 'Bangkok', country: 'Thailand', lat: 13.7563, lng: 100.5018 },
  { name: 'Asia/Singapore', city: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { name: 'Asia/Shanghai', city: 'Shanghai', country: 'China', lat: 31.2304, lng: 121.4737 },
  { name: 'Asia/Shanghai', city: 'Beijing', country: 'China', lat: 39.9042, lng: 116.4074 },
  { name: 'Asia/Urumqi', city: 'Urumqi', country: 'China', lat: 43.8256, lng: 87.6168 },
  { name: 'Asia/Tokyo', city: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503 },
  { name: 'Asia/Seoul', city: 'Seoul', country: 'South Korea', lat: 37.5665, lng: 126.9780 },
  { name: 'Asia/Hong_Kong', city: 'Hong Kong', country: 'Hong Kong', lat: 22.3193, lng: 114.1694 },
  { name: 'Asia/Jakarta', city: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456 },
  { name: 'Asia/Manila', city: 'Manila', country: 'Philippines', lat: 14.5995, lng: 120.9842 },
  { name: 'Asia/Tehran', city: 'Tehran', country: 'Iran', lat: 35.6892, lng: 51.3890 },
  { name: 'Asia/Riyadh', city: 'Riyadh', country: 'Saudi Arabia', lat: 24.7136, lng: 46.6753 },
  { name: 'Asia/Baghdad', city: 'Baghdad', country: 'Iraq', lat: 33.3152, lng: 44.3661 },
  { name: 'Asia/Yekaterinburg', city: 'Yekaterinburg', country: 'Russia', lat: 56.8389, lng: 60.6057 },
  { name: 'Asia/Novosibirsk', city: 'Novosibirsk', country: 'Russia', lat: 55.0084, lng: 82.9357 },
  { name: 'Asia/Vladivostok', city: 'Vladivostok', country: 'Russia', lat: 43.1150, lng: 131.8855 },
  
  // More Americas
  { name: 'America/Phoenix', city: 'Phoenix', country: 'United States', lat: 33.4484, lng: -112.0740 },
  { name: 'America/Anchorage', city: 'Anchorage', country: 'United States', lat: 61.2181, lng: -149.9003 },
  { name: 'America/Havana', city: 'Havana', country: 'Cuba', lat: 23.1136, lng: -82.3666 },
  { name: 'America/Caracas', city: 'Caracas', country: 'Venezuela', lat: 10.4806, lng: -66.9036 },
  { name: 'America/Rio_Branco', city: 'Rio Branco', country: 'Brazil', lat: -9.9753, lng: -67.8249 },
  
  // More Europe
  { name: 'Europe/Amsterdam', city: 'Amsterdam', country: 'Netherlands', lat: 52.3676, lng: 4.9041 },
  { name: 'Europe/Vienna', city: 'Vienna', country: 'Austria', lat: 48.2082, lng: 16.3738 },
  { name: 'Europe/Stockholm', city: 'Stockholm', country: 'Sweden', lat: 59.3293, lng: 18.0686 },
  { name: 'Europe/Warsaw', city: 'Warsaw', country: 'Poland', lat: 52.2297, lng: 21.0122 },
  { name: 'Europe/Bucharest', city: 'Bucharest', country: 'Romania', lat: 44.4268, lng: 26.1025 },
  
  // Oceania
  { name: 'Australia/Sydney', city: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093 },
  { name: 'Australia/Melbourne', city: 'Melbourne', country: 'Australia', lat: -37.8136, lng: 144.9631 },
  { name: 'Australia/Perth', city: 'Perth', country: 'Australia', lat: -31.9505, lng: 115.8605 },
  { name: 'Australia/Brisbane', city: 'Brisbane', country: 'Australia', lat: -27.4698, lng: 153.0251 },
  { name: 'Pacific/Auckland', city: 'Auckland', country: 'New Zealand', lat: -36.8485, lng: 174.7633 },
  { name: 'Pacific/Honolulu', city: 'Honolulu', country: 'United States', lat: 21.3099, lng: -157.8581 },
  { name: 'Pacific/Fiji', city: 'Suva', country: 'Fiji', lat: -18.1416, lng: 178.4419 },
  
  // Oceans (approximate center points for each ocean)
  { name: 'Etc/GMT+5', city: 'Atlantic Ocean', country: '🌊 Ocean', lat: 0, lng: -30 },
  { name: 'Etc/GMT+12', city: 'Pacific Ocean', country: '🌊 Ocean', lat: 0, lng: -170 },
  { name: 'Etc/GMT-5', city: 'Indian Ocean', country: '🌊 Ocean', lat: -20, lng: 80 },
  { name: 'Etc/GMT', city: 'Arctic Ocean', country: '🌊 Ocean', lat: 85, lng: 0 },
  { name: 'Etc/GMT+12', city: 'Southern Ocean', country: '🌊 Ocean', lat: -65, lng: 0 },
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
  
  // Return nearest city within 3000km (covers most land areas)
  return minDistance < 3000 ? { ...nearest } : null
}