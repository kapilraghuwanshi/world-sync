// src/components/GlobeView.tsx
import React, { useRef, useEffect, useState, Component, ReactNode } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import type { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { DateTime } from 'luxon'
import { Canvas, useFrame, useLoader } from './GlobeCanvas'
import { TimezoneTooltip } from './TimezoneTooltip'
import { findTimezoneByCoordinates } from '../lib/timezones'

const { width, height } = Dimensions.get('window')
const isSmallScreen = width < 768
const globeRadius = isSmallScreen ? 80 : 100

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

class CanvasErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any) {
    console.warn('GlobeView Canvas error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.fallbackContainer}>
          <View style={styles.fallbackGlobe}>
            <Text style={styles.fallbackText}>🌍</Text>
          </View>
        </View>
      )
    }
    return this.props.children
  }
}

export function GlobeView({ initialLat, initialLng }: GlobeViewProps) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  
  // Initialize rotation based on user location
  const phi = (90 - initialLat) * (Math.PI / 180)
  const theta = (initialLng + 180) * (Math.PI / 180)
  const initialRotX = phi - Math.PI / 2
  const initialRotY = -theta
  
  const [rotation, setRotation] = useState({ x: initialRotX, y: initialRotY })
  const lastRotation = useRef({ x: initialRotX, y: initialRotY })
  const lastMousePos = useRef({ x: 0, y: 0 })
  const dragStartPos = useRef({ x: 0, y: 0 })
  const hasMoved = useRef(false)
  const pauseTimeout = useRef<NodeJS.Timeout | null>(null)

  // Close tooltip when globe starts rotating (isPaused becomes false)
  useEffect(() => {
    if (!isPaused) {
      setTooltip(null)
    }
  }, [isPaused])

  const handleGlobeClick = (event: ThreeEvent<MouseEvent>, meshRef: React.RefObject<THREE.Group | null>) => {
    if (hasMoved.current) {
      hasMoved.current = false
      return
    }

    if (!meshRef.current) return

    const uv = event.uv
    if (!uv) return
    
    const lng = (uv.x * 360) - 180
    const lat = (uv.y * 180) - 90

    const location = findTimezoneByCoordinates(lat, lng)

    if (location) {
      setIsPaused(true)
      
      const time = DateTime.now().setZone(location.name).toFormat('HH:mm:ss')

      const clickX = ((event.pointer.x + 1) / 2) * width
      const clickY = ((1 - event.pointer.y) / 2) * height
      
      const tooltipX = Math.max(20, Math.min(clickX - 75, width - 170))
      const tooltipY = Math.max(100, Math.min(clickY - 80, height - 200))

      setTooltip({
        city: location.city,
        country: location.country,
        timezone: location.name,
        currentTime: time,
        x: tooltipX,
        y: tooltipY,
      })

      if (pauseTimeout.current) {
        clearTimeout(pauseTimeout.current)
      }

      pauseTimeout.current = setTimeout(() => {
        setIsPaused(false)
        pauseTimeout.current = null
      }, 8000)
    }
  }

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    setIsDragging(true)
    setIsPaused(true)
    hasMoved.current = false
    
    const x = event.pointer.x
    const y = event.pointer.y
    
    dragStartPos.current = { x, y }
    lastMousePos.current = { x, y }
  }

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!isDragging) return

    const x = event.pointer.x
    const y = event.pointer.y
    
    const deltaX = x - lastMousePos.current.x
    const deltaY = y - lastMousePos.current.y

    const totalDist = Math.abs(x - dragStartPos.current.x) +
      Math.abs(y - dragStartPos.current.y)
    if (totalDist > 0.01) {
      hasMoved.current = true
    }

    const newRotation = {
      x: lastRotation.current.x - deltaY * 2,
      y: lastRotation.current.y + deltaX * 2,
    }

    setRotation(newRotation)
    lastRotation.current = newRotation
    lastMousePos.current = { x, y }
  }

  const handlePointerUp = () => {
    if (isDragging) {
      setIsDragging(false)
      
      if (pauseTimeout.current) {
        clearTimeout(pauseTimeout.current)
      }
      
      pauseTimeout.current = setTimeout(() => {
        setIsPaused(false)
        pauseTimeout.current = null
      }, 5000)
    }
  }

  return (
    <View style={styles.container}>
      <CanvasErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 300], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={2.2} />
          <pointLight position={[300, 300, 300]} intensity={2.5} />
          <pointLight position={[-300, -300, -300]} intensity={1.5} />
          <Stars />
          <Globe
            initialLat={initialLat}
            initialLng={initialLng}
            rotation={rotation}
            isDragging={isDragging}
            isPaused={isPaused}
            onGlobeClick={handleGlobeClick}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          />
        </Canvas>
      </CanvasErrorBoundary>

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
  isPaused: boolean
  onGlobeClick: (event: ThreeEvent<MouseEvent>, meshRef: React.RefObject<THREE.Group | null>) => void
  onPointerDown: (event: ThreeEvent<PointerEvent>) => void
  onPointerMove: (event: ThreeEvent<PointerEvent>) => void
  onPointerUp: () => void
}

function Globe({
  initialLat,
  initialLng,
  rotation,
  isDragging,
  isPaused,
  onGlobeClick,
  onPointerDown,
  onPointerMove,
  onPointerUp
}: GlobeProps) {
  const meshRef = useRef<THREE.Group>(null)
  const autoRotationRef = useRef(0)

  const [earthTexture, bumpTexture, specularTexture] = useLoader(
    THREE.TextureLoader,
    [
      'https://cdn.jsdelivr.net/gh/turban/webgl-earth@master/images/2_no_clouds_4k.jpg',
      'https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png',
      'https://unpkg.com/three-globe@2.31.0/example/img/earth-water.png',
    ]
  )

  useEffect(() => {
    if (meshRef.current && autoRotationRef.current === 0) {
      const phi = (90 - initialLat) * (Math.PI / 180)
      const theta = (initialLng + 180) * (Math.PI / 180)

      meshRef.current.rotation.x = phi - Math.PI / 2
      meshRef.current.rotation.y = -theta
      autoRotationRef.current = meshRef.current.rotation.y
    }
  }, [initialLat, initialLng])

  useFrame((state, delta) => {
    if (!meshRef.current) return

    try {
      if (isDragging) {
        const clampedX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.x))
        const normalizedY = rotation.y % (Math.PI * 2)
        
        meshRef.current.rotation.x = clampedX
        meshRef.current.rotation.y = normalizedY
        autoRotationRef.current = normalizedY
      } else if (!isPaused) {
        autoRotationRef.current += delta * 0.12
        meshRef.current.rotation.y = autoRotationRef.current
      }
    } catch (error) {
      // safe fallback
    }
  })

  return (
    <group ref={meshRef}>
      <mesh
        onClick={(e) => onGlobeClick(e, meshRef)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <sphereGeometry args={[globeRadius, 64, 64]} />
        <meshPhongMaterial
          map={earthTexture}
          bumpMap={bumpTexture}
          bumpScale={0.8}
          specularMap={specularTexture}
          specular={new THREE.Color('#4466aa')}
          shininess={25}
          emissive={new THREE.Color('#0a192f')}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Atmosphere Glow */}
      <mesh>
        <sphereGeometry args={[globeRadius * 1.02, 32, 32]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent={true}
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Equator line */}
      <Equator />
      
      {/* Prime Meridian line */}
      <PrimeMeridian />
    </group>
  )
}

function Equator() {
  const points = []
  const radius = 101
  
  for (let i = 0; i <= 360; i += 2) {
    const angle = (i * Math.PI) / 180
    points.push(
      new THREE.Vector3(
        radius * Math.cos(angle),
        0,
        radius * Math.sin(angle)
      )
    )
  }
  
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
  const lineMaterial = new THREE.LineBasicMaterial({ 
    color: '#FFD700', 
    transparent: true, 
    opacity: 0.6,
    linewidth: 2
  })
  const line = new THREE.Line(lineGeometry, lineMaterial)
  
  return <primitive object={line} />
}

function PrimeMeridian() {
  const points = []
  const radius = 101
  
  for (let i = 0; i <= 360; i += 2) {
    const angle = (i * Math.PI) / 180
    points.push(
      new THREE.Vector3(
        radius * Math.sin(angle),
        radius * Math.cos(angle),
        0
      )
    )
  }
  
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
  const lineMaterial = new THREE.LineBasicMaterial({ 
    color: '#FFD700', 
    transparent: true, 
    opacity: 0.6,
    linewidth: 2
  })
  const line = new THREE.Line(lineGeometry, lineMaterial)
  
  return <primitive object={line} />
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
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  fallbackContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackGlobe: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
  },
  fallbackText: {
    fontSize: 80,
  },
})