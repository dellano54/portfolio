"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";

const COLORS = {
    red: "#dc2626",
    white: "#ffffff",
    black: "#020617",
    accent: "#0ea5e9",
    tire: "#111111",
    carbon: "#1a1a1a"
};

function AssemblyPart({ children, targetPos, targetRot, progress }: any) {
    const groupRef = useRef<THREE.Group>(null);
    
    useEffect(() => {
        if (!groupRef.current) return;
        const scatter = 40;
        gsap.set(groupRef.current.position, { 
            x: (Math.random() - 0.5) * scatter, 
            y: (Math.random() - 0.5) * scatter, 
            z: (Math.random() - 0.5) * scatter 
        });
        gsap.set(groupRef.current.rotation, { 
            x: Math.random() * Math.PI, 
            y: Math.random() * Math.PI 
        });
    }, []);

    useFrame(() => {
        if (!groupRef.current) return;
        const p = progress / 100;
        const factor = 0.05 + (p * 0.05);
        
        groupRef.current.position.lerp(new THREE.Vector3(...targetPos), factor);
        const targetQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(...targetRot));
        groupRef.current.quaternion.slerp(targetQuat, factor);
    });

    return <group ref={groupRef}>{children}</group>;
}

export function ProceduralF1Car({ progress }: { progress: number }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.getElapsedTime();
        if (progress >= 98) {
            groupRef.current.position.y = Math.sin(time * 50) * 0.01;
        }
        if (progress >= 100) {
            groupRef.current.position.z += 0.5;
        }
    });

    return (
        <group ref={groupRef} rotation={[0.2, -Math.PI / 4, 0]}>
            
            {/* --- IMPROVED CHASSIS --- */}
            <AssemblyPart targetPos={[0, 0.2, 0]} targetRot={[0, 0, 0]} progress={progress}>
                {/* Nose Cone - Tapered */}
                <mesh position={[0, 0.12, 1.8]} rotation={[-0.1, 0, 0]}>
                    <boxGeometry args={[0.4, 0.12, 1.4]} />
                    <meshPhysicalMaterial color={COLORS.white} metalness={0.7} roughness={0.1} clearcoat={1} />
                </mesh>
                
                {/* Main Body Tub - More defined shape */}
                <mesh position={[0, 0.25, 0.2]}>
                    <boxGeometry args={[0.9, 0.4, 2.2]} />
                    <meshPhysicalMaterial color={COLORS.white} metalness={0.7} roughness={0.1} clearcoat={1} />
                </mesh>

                {/* Cockpit / Airbox Section */}
                <mesh position={[0, 0.5, -0.2]} rotation={[-0.3, 0, 0]}>
                    <boxGeometry args={[0.6, 0.4, 0.8]} />
                    <meshPhysicalMaterial color={COLORS.red} metalness={0.9} roughness={0.1} clearcoat={1} />
                </mesh>

                {/* Engine Cover Fin */}
                <mesh position={[0, 0.7, -0.8]}>
                    <boxGeometry args={[0.02, 0.5, 1.2]} />
                    <meshPhysicalMaterial color={COLORS.red} clearcoat={1} />
                </mesh>
            </AssemblyPart>

            {/* --- AERODYNAMICS --- */}
            <AssemblyPart targetPos={[0, 0.15, -0.4]} targetRot={[0, 0, 0]} progress={progress}>
                {/* Left Sidepod */}
                <mesh position={[0.75, 0.1, 0]} rotation={[0.1, -0.15, 0.1]}>
                    <boxGeometry args={[0.6, 0.4, 1.8]} />
                    <meshPhysicalMaterial color={COLORS.white} clearcoat={1} />
                </mesh>
                {/* Right Sidepod */}
                <mesh position={[-0.75, 0.1, 0]} rotation={[0.1, 0.15, -0.1]}>
                    <boxGeometry args={[0.6, 0.4, 1.8]} />
                    <meshPhysicalMaterial color={COLORS.white} clearcoat={1} />
                </mesh>
            </AssemblyPart>

            {/* Front Wing - Multi-element look */}
            <AssemblyPart targetPos={[0, 0.1, 2.5]} targetRot={[0, 0, 0]} progress={progress}>
                <mesh position={[0, 0, 0]}><boxGeometry args={[3.2, 0.03, 0.5]} /><meshStandardMaterial color={COLORS.white} /></mesh>
                <mesh position={[0, 0.05, -0.1]}><boxGeometry args={[3.2, 0.03, 0.3]} /><meshStandardMaterial color={COLORS.carbon} /></mesh>
                <mesh position={[1.58, 0.15, 0]}><boxGeometry args={[0.03, 0.4, 0.6]} /><meshStandardMaterial color={COLORS.red} /></mesh>
                <mesh position={[-1.58, 0.15, 0]}><boxGeometry args={[0.03, 0.4, 0.6]} /><meshStandardMaterial color={COLORS.red} /></mesh>
            </AssemblyPart>

            {/* Rear Wing - High Detail */}
            <AssemblyPart targetPos={[0, 0.8, -1.9]} targetRot={[0, 0, 0]} progress={progress}>
                {/* Main Plane */}
                <mesh position={[0, 0.4, 0]}><boxGeometry args={[2.4, 0.03, 0.8]} /><meshStandardMaterial color={COLORS.white} /></mesh>
                {/* DRS Flap */}
                <mesh position={[0, 0.55, -0.1]} rotation={[0.1, 0, 0]}><boxGeometry args={[2.4, 0.03, 0.4]} /><meshStandardMaterial color={COLORS.red} /></mesh>
                {/* Endplates */}
                <mesh position={[1.18, 0.1, 0]}><boxGeometry args={[0.03, 0.9, 1.0]} /><meshStandardMaterial color={COLORS.red} /></mesh>
                <mesh position={[-1.18, 0.1, 0]}><boxGeometry args={[0.03, 0.9, 1.0]} /><meshStandardMaterial color={COLORS.red} /></mesh>
            </AssemblyPart>

            {/* --- WHEELS & SUSPENSION --- */}
            {[ 
                { p: [1.2, 0.35, 1.4], s: 0.9, w: 0.6 },  // FR
                { p: [-1.2, 0.35, 1.4], s: 0.9, w: 0.6 }, // FL
                { p: [1.3, 0.45, -1.4], s: 1.1, w: 0.8 }, // RR
                { p: [-1.3, 0.45, -1.4], s: 1.1, w: 0.8 } // RL
            ].map((wheel, i) => (
                <AssemblyPart key={i} targetPos={wheel.p} targetRot={[0, 0, Math.PI / 2]} progress={progress}>
                    {/* Tire */}
                    <mesh castShadow>
                        <cylinderGeometry args={[wheel.s * 0.5, wheel.s * 0.5, wheel.w, 32]} />
                        <meshStandardMaterial color={COLORS.tire} roughness={0.8} />
                    </mesh>
                    {/* Rim */}
                    <mesh position={[0, i % 2 === 0 ? wheel.w/2 + 0.01 : -wheel.w/2 - 0.01, 0]}>
                        <cylinderGeometry args={[wheel.s * 0.3, wheel.s * 0.3, 0.05, 16]} />
                        <meshStandardMaterial color="#222" metalness={1} />
                    </mesh>
                    {/* Center Lock - Red/Blue */}
                    <mesh position={[0, i % 2 === 0 ? wheel.w/2 + 0.03 : -wheel.w/2 - 0.03, 0]}>
                        <sphereGeometry args={[0.06, 8, 8]} />
                        <meshStandardMaterial color={i % 2 === 0 ? "#cc0000" : "#0000cc"} />
                    </mesh>
                </AssemblyPart>
            ))}

            {/* Suspension Arms */}
            {[1, -1].map((s) => (
                <group key={s}>
                    {/* Front Suspension */}
                    <AssemblyPart targetPos={[s * 0.6, 0.2, 1.4]} targetRot={[0, 0, Math.PI / 6 * s]} progress={progress}>
                         <mesh><boxGeometry args={[1.2, 0.03, 0.03]} /><meshStandardMaterial color={COLORS.carbon} /></mesh>
                    </AssemblyPart>
                    {/* Rear Suspension */}
                    <AssemblyPart targetPos={[s * 0.7, 0.3, -1.4]} targetRot={[0, 0, -Math.PI / 8 * s]} progress={progress}>
                         <mesh><boxGeometry args={[1.2, 0.04, 0.04]} /><meshStandardMaterial color={COLORS.carbon} /></mesh>
                    </AssemblyPart>
                </group>
            ))}
        </group>
    );
}
