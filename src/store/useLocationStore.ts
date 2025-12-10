import { create } from 'zustand'
import { UserLocation } from '../lib/geolocation'

interface LocationStore {
  userLocation: UserLocation | null
  setUserLocation: (location: UserLocation) => void
}

export const useLocationStore = create<LocationStore>((set) => ({
  userLocation: null,
  setUserLocation: (location) => set({ userLocation: location }),
}))