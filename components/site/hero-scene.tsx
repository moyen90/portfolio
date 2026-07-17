"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei"
import type { Mesh } from "three"

const LIME = "#D4F53C"
const FOREST = "#0D2B22"

function CoreShape() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.x = t * 0.12
    meshRef.current.rotation.y = t * 0.18
  })

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={1.35}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color={FOREST} wireframe emissive={LIME} emissiveIntensity={0.35} />
      </mesh>
      <mesh scale={0.72}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color={FOREST}
          emissive={LIME}
          emissiveIntensity={0.15}
          roughness={0.35}
          metalness={0.6}
          distort={0.22}
          speed={1.5}
        />
      </mesh>
    </Float>
  )
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 4]} intensity={1.1} color="#F2FFEE" />
      <pointLight position={[-3, -2, 2]} intensity={0.8} color={LIME} />
    </>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      className="absolute inset-0 touch-none"
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <SceneLights />
      <CoreShape />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />
    </Canvas>
  )
}
