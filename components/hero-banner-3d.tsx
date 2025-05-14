"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, Box, Torus } from "@react-three/drei"

function FloatingObjects() {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1
    }
  })

  // Generate random positions for objects
  const objects = []
  const shapes = [Sphere, Box, Torus]
  const colors = ["#4CAF50", "#336791", "#FF5722", "#6772E5", "#8BC500", "#E535AB", "#2496ED"]

  for (let i = 0; i < 15; i++) {
    // Create position values individually instead of using Vector3 constructor
    const posX = (Math.random() - 0.5) * 20
    const posY = (Math.random() - 0.5) * 20
    const posZ = (Math.random() - 0.5) * 10 - 5

    const Shape = shapes[Math.floor(Math.random() * shapes.length)]
    const color = colors[Math.floor(Math.random() * colors.length)]
    const scale = Math.random() * 0.5 + 0.2

    objects.push({ Shape, position: [posX, posY, posZ], color, scale, key: i })
  }

  return (
    <group ref={groupRef}>
      {objects.map(({ Shape, position, color, scale, key }) => (
        <Shape
          key={key}
          position={position}
          scale={scale}
          args={Shape === Sphere ? [1, 16, 16] : Shape === Box ? [1, 1, 1] : [1, 0.4, 16]}
        >
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            roughness={0.4}
            metalness={0.8}
          />
        </Shape>
      ))}
    </group>
  )
}

export default function HeroBanner3D() {
  // Add console logs to help debug
  useEffect(() => {
    console.log("HeroBanner3D mounted")
    return () => console.log("HeroBanner3D unmounted")
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        style={{ width: "100%", height: "100%" }}
        onCreated={() => console.log("Canvas created")}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <FloatingObjects />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
