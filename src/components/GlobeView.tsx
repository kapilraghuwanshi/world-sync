// src/components/GlobeView.tsx
import React, { useRef, useEffect, useState } from 'react'
import { View, StyleSheet, Platform, Dimensions } from 'react-native'
import { Canvas, useFrame, useLoader, ThreeEvent } from '@react-three/fiber/native'
import * as THREE from 'three'
import { DateTime } from 'luxon'
import { TimezoneTooltip } from './TimezoneTooltip'
import { findTimezoneByCoordinates } from '../lib/timezones'

const { width, height } = Dimensions.get('window')

interface GlobeViewProps {
  initialLat: number
  initialLng: number
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
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const lastRotation = useRef({ x: 0, y: 0 })
  const lastMousePos = useRef({ x: 0, y: 0 })
  const dragStartPos = useRef({ x: 0, y: 0 })
  const hasMoved = useRef(false)

  const handleGlobeClick = (event: ThreeEvent<MouseEvent>) => {
    // Only show tooltip if user didn't drag
    if (hasMoved.current) {
      hasMoved.current = false
      return
    }

    const point = event.point
    const radius = 100
    const lat = 90 - (Math.acos(point.y / radius) * 180 / Math.PI)
    const lng = ((270 + (Math.atan2(point.x, point.z)) * 180 / Math.PI) % 360) - 180

    const location = findTimezoneByCoordinates(lat, lng)

    if (location) {
      const time = DateTime.now().setZone(location.name).toFormat('HH:mm:ss')

      // Position tooltip
      const tooltipX = Platform.OS === 'web'
        ? Math.min(event.nativeEvent.offsetX || event.clientX, width - 170)
        : Math.min(event.clientX || width / 2, width - 170)
      const tooltipY = Platform.OS === 'web'
        ? Math.min(event.nativeEvent.offsetY || event.clientY, height * 0.6 - 150)
        : Math.min(event.clientY || height / 3, height * 0.6 - 150)

      setTooltip({
        city: location.city,
        country: location.country,
        timezone: location.name,
        currentTime: time,
        x: tooltipX,
        y: tooltipY,
      })

      setTimeout(() => setTooltip(null), 4000)
    }
  }

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    setIsDragging(true)
    hasMoved.current = false
    dragStartPos.current = { x: event.clientX, y: event.clientY }
    lastMousePos.current = { x: event.clientX, y: event.clientY }
  }

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!isDragging) return

    const deltaX = event.clientX - lastMousePos.current.x
    const deltaY = event.clientY - lastMousePos.current.y

    // Check if actually moved (more than 5 pixels)
    const totalDist = Math.abs(event.clientX - dragStartPos.current.x) +
      Math.abs(event.clientY - dragStartPos.current.y)
    if (totalDist > 5) {
      hasMoved.current = true
    }

    setRotation(prev => ({
      x: prev.x - deltaY * 0.005,
      y: prev.y + deltaX * 0.005,
    }))

    lastMousePos.current = { x: event.clientX, y: event.clientY }
  }

  const handlePointerUp = () => {
    if (isDragging) {
      lastRotation.current = rotation
      setIsDragging(false)
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
          rotation={rotation}
          isDragging={isDragging}
          onGlobeClick={handleGlobeClick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
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

interface GlobeProps {
  initialLat: number
  initialLng: number
  rotation: { x: number; y: number }
  isDragging: boolean
  onGlobeClick: (event: ThreeEvent<MouseEvent>) => void
  onPointerDown: (event: ThreeEvent<PointerEvent>) => void
  onPointerMove: (event: ThreeEvent<PointerEvent>) => void
  onPointerUp: () => void
}

function Globe({
  initialLat,
  initialLng,
  rotation,
  isDragging,
  onGlobeClick,
  onPointerDown,
  onPointerMove,
  onPointerUp
}: GlobeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const autoRotationRef = useRef(0)

  const earthTexture = useLoader(
    THREE.TextureLoader,
    // High-quality Earth texture with visible countries
    'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg'
  )

  const bumpTexture = useLoader(
    THREE.TextureLoader,
    'https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png'
  )

  // Add specular map for ocean shine
  const specularTexture = useLoader(
    THREE.TextureLoader,
    'https://unpkg.com/three-globe@2.31.0/example/img/earth-water.png'
  )

  useEffect(() => {
    if (meshRef.current) {
      const phi = (90 - initialLat) * (Math.PI / 180)
      const theta = (initialLng + 180) * (Math.PI / 180)

      meshRef.current.rotation.x = phi - Math.PI / 2
      meshRef.current.rotation.y = -theta
      autoRotationRef.current = meshRef.current.rotation.y
    }
  }, [initialLat, initialLng])

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (isDragging) {
        // Apply manual rotation during drag
        meshRef.current.rotation.x = rotation.x
        meshRef.current.rotation.y = rotation.y
        autoRotationRef.current = rotation.y
      } else {
        // Auto-rotate when not dragging
        autoRotationRef.current += delta * 0.1
        meshRef.current.rotation.y = autoRotationRef.current
      }

      // Clamp X rotation to prevent upside-down
      meshRef.current.rotation.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, meshRef.current.rotation.x)
      )
    }
  })

  return (
    <mesh
      ref={meshRef}
      onClick={onGlobeClick}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <sphereGeometry args={[100, 64, 64]} />
      <meshPhongMaterial
         map={earthTexture}
        bumpMap={bumpTexture}
        bumpScale={1.0}
        specularMap={specularTexture}
        specular={new THREE.Color('#666666')}
        shininess={15}
      />
    </mesh>
  )
}

function Stars() {
  const starsRef = useRef<THREE.Points>(null)

  useEffect(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices = []

    for (let i = 0; i < 5000; i++) {
      const x = (Math.random() - 0.5) * 2000
      const y = (Math.random() - 0.5) * 2000
      const z = (Math.random() - 0.5) * 2000
      vertices.push(x, y, z)
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

    if (starsRef.current) {
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
    position: 'relative',
  },
})