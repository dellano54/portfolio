"use client";

import { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { ProceduralF1Car } from "@/components/3d/ProceduralF1Car";

const COLORS = {
    red: "#dc2626",
    white: "#ffffff",
    black: "#020617",
    blue: "#3b82f6"
};

export default function RocketLoader() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const counter = { val: 0 };
        gsap.to(counter, {
            val: 100, duration: 4.5, ease: "power2.inOut",
            onUpdate: () => setProgress(Math.floor(counter.val)),
            onComplete: () => {
                setTimeout(() => {
                    gsap.to(containerRef.current, { opacity: 0, duration: 0.8, onComplete: () => setLoading(false) });
                }, 500);
            }
        });
    }, []);

    if (!loading) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] bg-white flex items-center justify-center overflow-hidden font-sans">
            
            <div className="absolute inset-0 w-full h-full">
                <Canvas shadows>
                    {/* Adjusted Camera for better mobile framing */}
                    <PerspectiveCamera makeDefault position={[3, 1.5, 14]} fov={35} />
                    <ambientLight intensity={1.2} />
                    <pointLight position={[10, 10, 10]} intensity={150} color={COLORS.red} />
                    <spotLight position={[-10, 15, 10]} angle={0.3} penumbra={1} intensity={300} color={COLORS.blue} castShadow />
                    
                    <group position={[0, 0.2, 0]}>
                        <ProceduralF1Car progress={progress} />
                    </group>
                    
                    <gridHelper args={[100, 50, "#e2e8f0", "#f1f5f9"]} position={[0, -1.5, 0]} />
                    <ContactShadows position={[0, -1.5, 0]} opacity={0.25} scale={30} blur={2.5} far={10} />
                    <Environment preset="studio" />
                </Canvas>
            </div>

            {/* Cinematic Overlay UI */}
            <div className="absolute inset-0 pointer-events-none p-6 md:p-12 flex flex-col justify-between">
                <div className="flex justify-between items-start font-mono text-[10px] text-slate-400 uppercase tracking-[0.4em]">
                    <div className="space-y-2">
                        <p className="text-red-600 font-black text-xs md:text-sm tracking-tighter italic">DELLANO_LEGACY_PROJECT</p>
                        <p className="opacity-50 hidden md:block">UNIT: MP4_PROC_v3.0</p>
                    </div>
                    <div className="text-right space-y-1 opacity-50 hidden md:block">
                        <p>COORD: 13.0827° N, 80.2707° E</p>
                        <p>STATUS: OPTIMIZING_GEOMETRY</p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-6 md:gap-8 self-center mb-12 md:mb-12">
                    <div className="flex flex-col items-center">
                        <div className="flex items-baseline gap-2">
                            <span className="text-7xl md:text-9xl font-display font-black text-slate-900 leading-none italic tracking-tighter">
                                {progress}
                            </span>
                            <span className="text-lg md:text-2xl font-display font-bold text-red-600 italic uppercase">km/h</span>
                        </div>
                        <div className="w-60 md:w-80 h-[2px] bg-slate-100 mt-4 md:mt-6 rounded-full overflow-hidden relative">
                            <motion.div 
                                className="h-full bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.6)]" 
                                animate={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                    
                    <div className="flex gap-3 md:gap-4">
                        {[...Array(5)].map((_, i) => (
                            <motion.div 
                                key={i}
                                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${progress > (i+1)*20 ? 'bg-red-600' : 'bg-slate-100'}`}
                                animate={progress > (i+1)*20 ? { scale: [1, 1.5, 1] } : {}}
                            />
                        ))}
                    </div>
                </div>

                <div className="w-full flex justify-between items-end font-mono text-[8px] md:text-[9px] text-slate-300 uppercase tracking-[0.3em] md:tracking-[0.5em]">
                    <p>Building high-performance systems</p>
                    <p className="animate-pulse hidden md:block">Loading Procedural Asset: F1_DETAIL_v3.ts</p>
                </div>
            </div>

            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(255,255,255,0.4)]" />
        </div>
    );
}