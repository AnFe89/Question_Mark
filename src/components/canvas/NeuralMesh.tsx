import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { createNoise3D } from 'simplex-noise'

const noise3D = createNoise3D()

function Particles({ count = 200 }) {
  const points = useRef<THREE.Points>(null!)
  const linesGeometry = useRef<THREE.BufferGeometry>(null!)
  
  // Create arrays in useMemo (stable reference)
  const [positions, velocities, linesPos] = useMemo(() => {
    return [
      new Float32Array(count * 3),
      new Float32Array(count * 3),
      new Float32Array(count * count * 3)
    ]
  }, [count])

  // Initialize data in useEffect (side effect)
  useEffect(() => {
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.01
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01
      velocities[i * 3 + 2] = 0
    }
    // Trigger update
    if (points.current) points.current.geometry.attributes.position.needsUpdate = true
  }, [count, positions, velocities])
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Update points
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      positions[i3] += velocities[i3] + noise3D(positions[i3] * 0.5, positions[i3 + 1] * 0.5, time * 0.1) * 0.005
      positions[i3 + 1] += velocities[i3 + 1] + noise3D(positions[i3] * 0.5 + 100, positions[i3 + 1] * 0.5, time * 0.1) * 0.005
      
      // Boundary check
      if (positions[i3] > 10) positions[i3] = -10
      if (positions[i3] < -10) positions[i3] = 10
      if (positions[i3 + 1] > 10) positions[i3 + 1] = -10
      if (positions[i3 + 1] < -10) positions[i3 + 1] = 10
    }
    
    if (points.current) {
        points.current.geometry.attributes.position.needsUpdate = true
    }

    // Update lines
    let lineIndex = 0
    const connectDistance = 2.5
    
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < connectDistance) {
          linesPos[lineIndex * 3] = positions[i * 3]
          linesPos[lineIndex * 3 + 1] = positions[i * 3 + 1]
          linesPos[lineIndex * 3 + 2] = positions[i * 3 + 2]
          
          linesPos[(lineIndex + 1) * 3] = positions[j * 3]
          linesPos[(lineIndex + 1) * 3 + 1] = positions[j * 3 + 1]
          linesPos[(lineIndex + 1) * 3 + 2] = positions[j * 3 + 2]
          
          lineIndex += 2
        }
      }
    }
    
    if (linesGeometry.current) {
        linesGeometry.current.setDrawRange(0, lineIndex)
        linesGeometry.current.attributes.position.needsUpdate = true
    }
  })

  return (
    <group>
      <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
      <lineSegments>
        <bufferGeometry ref={linesGeometry}>
          <bufferAttribute
            attach="attributes-position"
            count={linesPos.length / 3}
            array={linesPos}
            itemSize={3}
            args={[linesPos, 3]} 
          />
        </bufferGeometry>
        <lineBasicMaterial color="#cfff05" transparent opacity={0.15} depthWrite={false} />
      </lineSegments>
    </group>
  )
}

export function NeuralMesh() {
  return (
    <div className="absolute inset-0 z-0 opacity-60">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Particles />
      </Canvas>
    </div>
  )
}
