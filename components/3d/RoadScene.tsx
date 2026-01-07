"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll, ScrollControls, Scroll, PerspectiveCamera, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";

function Bus({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Create a wavy curve for the bus to follow
  const curve = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 10; i++) {
      points.push(new THREE.Vector3(
        Math.sin(i * 1.5) * 4, // Wavy X
        -i * 10,              // Downward Y
        Math.cos(i * 1.5) * 2  // Slight Z depth
      ));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    
    // Get position on curve
    const p = Math.max(0, Math.min(0.99, progress));
    const pos = curve.getPointAt(p);
    const tangent = curve.getTangentAt(p);
    
    meshRef.current.position.copy(pos);
    
    // Look ahead
    const lookAtPos = curve.getPointAt(Math.min(p + 0.01, 1));
    meshRef.current.lookAt(lookAtPos);
    meshRef.current.rotateY(Math.PI); // Correct orientation
  });

  return (
    <group ref={meshRef}>
      {/* 3D Stylized Bus Body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 1, 2]} />
        <meshStandardMaterial color="#facc15" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Windows */}
      <mesh position={[0, 0.7, 0.5]}>
        <boxGeometry args={[0.9, 0.4, 0.8]} />
        <meshStandardMaterial color="#38bdf8" />
      </mesh>
      {/* Wheels */}
      <mesh position={[0.5, 0.1, 0.6]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[-0.5, 0.1, 0.6]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[0.5, 0.1, -0.6]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[-0.5, 0.1, -0.6]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <pointLight position={[0, 1, 1]} intensity={5} color="#white" />
    </group>
  );
}

function Road() {
    const curve = useMemo(() => {
        const points = [];
        for (let i = 0; i <= 10; i++) {
          points.push(new THREE.Vector3(
            Math.sin(i * 1.5) * 4,
            -i * 10,
            Math.cos(i * 1.5) * 2
          ));
        }
        return new THREE.CatmullRomCurve3(points);
      }, []);

    const tubeGeometry = useMemo(() => new THREE.TubeGeometry(curve, 100, 0.8, 8, false), [curve]);

    return (
        <mesh geometry={tubeGeometry}>
            <meshStandardMaterial color="#1e293b" roughness={0.8} />
            {/* Dashed line effect can be done with a texture, but for now just solid road */}
        </mesh>
    )
}

function SceneContent() {
    const scroll = useScroll();
    const [progress, setProgress] = useState(0);

    useFrame(() => {
        setProgress(scroll.offset);
    });

    return (
        <>
            <ambientLight intensity={1} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
            <Road />
            <Bus progress={progress} />
            {/* Camera follow logic */}
            <PerspectiveCamera makeDefault position={[0, 5 - progress * 100, 15]} />
        </>
    )
}

export default function RoadScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <Canvas>
        <ScrollControls pages={5} damping={0.2}>
            <SceneContent />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
