import React, { useRef, useEffect, useState } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { Canvas, useFrame, useLoader, ThreeEvent } from '@react-three/fiber/native'
import * as THREE from 'three'
import { DateTime } from 'luxon'
import { TimezoneTooltip } from './TimezoneTooltip'
import { findTimezoneByCoordinates, MAJOR_TIMEZONES } from '../lib/timezones'


interface GlobeViewProps {
  initialLat: number
  initialLng: number
  onGlobeClick: (event: ThreeEvent<MouseEvent>) => void
}

interface TooltipData {
  city: string
  country: string
  timezone: string
  currentTime: string
  x: number
  y: number
}

export function GlobeView({ initialLat, initialLng }: GlobeViewProps) {

  const [tooltip, setTooltip] = useState<TooltipData | null>(null)

  const handleGlobeClick = (event: ThreeEvent<MouseEvent>) => {
    // Get intersection point
    const point = event.point
    
    // Convert 3D point to lat/lng
    const radius = 100 // Globe radius
    const lat = 90 - (Math.acos(point.y / radius) * 180 / Math.PI)
    const lng = ((270 + (Math.atan2(point.x, point.z)) * 180 / Math.PI) % 360) - 180

    // Find nearest timezone
    const location = findTimezoneByCoordinates(lat, lng)
    
    if (location) {
      const time = DateTime.now().setZone(location.name).toFormat('HH:mm:ss')
      
      setTooltip({
        city: location.city,
        country: location.country,
        timezone: location.name,
        currentTime: time,
        x: event.nativeEvent.offsetX || event.clientX,
        y: event.nativeEvent.offsetY || event.clientY,
      })

      // Auto-hide after 3 seconds
      setTimeout(() => setTooltip(null), 3000)
    }
  }
  
  return (
   <View style={styles.container}>
      <Canvas
        camera={{ position: [0, 0, 300], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[300, 300, 300]} intensity={1} />
        <pointLight position={[-300, -300, -300]} intensity={0.3} />
        <Stars />
        <Globe 
          initialLat={initialLat} 
          initialLng={initialLng}
          onGlobeClick={handleGlobeClick}
        />
      </Canvas>
      
      {tooltip && (
        <TimezoneTooltip
          city={tooltip.city}
          country={tooltip.country}
          timezone={tooltip.timezone}
          currentTime={tooltip.currentTime}
          x={tooltip.x}
          y={tooltip.y}
        />
      )}
    </View>
  )
}

function Globe({ initialLat, initialLng, onGlobeClick }: GlobeViewProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const lastRotation = useRef({ x: 0, y: 0 })

  // Load Earth texture
  const earthTexture = useLoader(
    THREE.TextureLoader,
    Platform.select({
      // Lower res for mobile, higher for web
      web: 'https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg',
      default: 'https://unpkg.com/three-globe@2.31.0/example/img/earth-day.jpg',
    })!
  )

  // Load bump/normal map for depth
  const bumpTexture = useLoader(
    THREE.TextureLoader,
    'https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png'
  )

  useEffect(() => {
    // Position globe to show user's location
    if (meshRef.current) {
      const phi = (90 - initialLat) * (Math.PI / 180)
      const theta = (initialLng + 180) * (Math.PI / 180)

      meshRef.current.rotation.x = phi - Math.PI / 2
      meshRef.current.rotation.y = -theta
    }
  }, [initialLat, initialLng])

  // Auto-rotate when idle
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05
    }
  })

  const handlePointerDown = () => {
    setIsDragging(true)
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (isDragging && meshRef.current) {
      const deltaX = event.movementX || 0
      const deltaY = event.movementY || 0

      meshRef.current.rotation.y += deltaX * 0.01
      meshRef.current.rotation.x += deltaY * 0.01

      // Clamp X rotation to prevent flipping
      meshRef.current.rotation.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, meshRef.current.rotation.x)
      )

      lastRotation.current = {
        x: meshRef.current.rotation.x,
        y: meshRef.current.rotation.y
      }
    }
  }

  return (
    <mesh ref={meshRef}
      onClick={onGlobeClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <sphereGeometry args={[100, 64, 64]} />
      <meshPhongMaterial
        map={earthTexture}
        bumpMap={bumpTexture}
        bumpScale={0.5}
        specularMap={earthTexture}
        specular={new THREE.Color('#333333')}
        shininess={5}
      />
    </mesh>
  )
}

function Stars() {
  const starsRef = useRef<THREE.Points>(null)

  useEffect(() => {
    if (starsRef.current) {
      const geometry = new THREE.BufferGeometry()
      const vertices = []

      for (let i = 0; i < 5000; i++) {
        const x = (Math.random() - 0.5) * 2000
        const y = (Math.random() - 0.5) * 2000
        const z = (Math.random() - 0.5) * 2000
        vertices.push(x, y, z)
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
      starsRef.current.geometry = geometry
    }
  }, [])

  return (
    <points ref={starsRef}>
      <pointsMaterial color="#ffffff" size={2} sizeAttenuation={true} />
    </points>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})