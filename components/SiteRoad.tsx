"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useSpring, useMotionValueEvent, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SiteRoad() {
    const [docHeight, setDocHeight] = useState(0);
    const [winWidth, setWinWidth] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [finishAngle, setFinishAngle] = useState(0);

    useEffect(() => {
        setMounted(true);
        const resize = () => {
            setDocHeight(document.documentElement.scrollHeight);
            setWinWidth(window.innerWidth);
        };
        
        resize();
        const timer = setTimeout(resize, 500);
        window.addEventListener('resize', resize);
        const observer = new ResizeObserver(resize);
        observer.observe(document.body);

        return () => {
            window.removeEventListener('resize', resize);
            observer.disconnect();
            clearTimeout(timer);
        };
    }, []);

    // Configuration values derived from state
    // Default to 360 (Mobile) to prevent "zoomed out" desktop view on mobile initial render
    const effectiveWidth = winWidth || 360; 
    const effectiveHeight = docHeight || 5000;
    const w = effectiveWidth;
    const h = effectiveHeight;
    const isMobile = effectiveWidth < 768;
    const startY = isMobile ? 350 : 550; 
    const footerY = effectiveHeight - (isMobile ? 600 : 400);

    // High-Complexity Path: More curves, smoother transitions
    const pathD = isMobile
        ? `M ${w * 0.5} ${startY} 
           C ${w * 0.5} ${h * 0.05}, ${w * 0.8} ${h * 0.08}, ${w * 0.8} ${h * 0.12}
           C ${w * 0.8} ${h * 0.15}, ${w * 0.2} ${h * 0.18}, ${w * 0.2} ${h * 0.22}
           C ${w * 0.2} ${h * 0.25}, ${w * 0.8} ${h * 0.28}, ${w * 0.8} ${h * 0.32}
           C ${w * 0.8} ${h * 0.35}, ${w * 0.2} ${h * 0.38}, ${w * 0.2} ${h * 0.42}
           C ${w * 0.2} ${h * 0.45}, ${w * 0.5} ${h * 0.5}, ${w * 0.5} ${footerY}`
        : `M ${w * 0.25} ${startY} 
           C ${w * 0.25} ${h * 0.1}, ${w * 0.75} ${h * 0.15}, ${w * 0.75} ${h * 0.2}
           C ${w * 0.75} ${h * 0.25}, ${w * 0.25} ${h * 0.3}, ${w * 0.25} ${h * 0.35}
           C ${w * 0.25} ${h * 0.4}, ${w * 0.75} ${h * 0.45}, ${w * 0.75} ${h * 0.5}
           C ${w * 0.75} ${h * 0.55}, ${w * 0.25} ${h * 0.6}, ${w * 0.25} ${h * 0.65}
           C ${w * 0.25} ${h * 0.7}, ${w * 0.75} ${h * 0.75}, ${w * 0.75} ${h * 0.8}
           C ${w * 0.75} ${h * 0.85}, ${w * 0.5} ${h * 0.9}, ${w * 0.5} ${footerY}`;

    useEffect(() => {
        if (!mounted || !docHeight) return;
        try {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", pathD);
            const len = path.getTotalLength();
            if (len > 0) {
                const p1 = path.getPointAtLength(len - 1);
                const p2 = path.getPointAtLength(len);
                const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
                setFinishAngle(angle);
            }
        } catch (e) {}
    }, [pathD, mounted, docHeight]);

    if (!mounted) return null;

    const startLineX = isMobile ? w * 0.5 : w * 0.25;
    const roadWidth = isMobile ? 60 : 180;

    return (
        <div className="absolute top-0 left-0 w-full z-0 pointer-events-none overflow-hidden" style={{ height: docHeight || '100%' }}>
            {/* Layer 1: Road Lines (Background, z-0) */}
            <div className="absolute top-0 left-0 w-full h-full z-0">
                <svg className="w-full h-full overflow-visible">
                    <defs>
                        <pattern id="finish-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <rect width="10" height="10" fill="#000" />
                            <rect x="10" y="10" width="10" height="10" fill="#000" />
                            <rect x="10" width="10" height="10" fill="#fff" />
                            <rect y="10" width="10" height="10" fill="#fff" />
                        </pattern>
                    </defs>

                    {/* Starting Grid Box */}
                    <rect 
                        x={startLineX - roadWidth/2} 
                        y={startY - 60} 
                        width={roadWidth} 
                        height="60" 
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="2"
                        strokeDasharray="8 4"
                        className="opacity-30"
                    />
                    <text x={startLineX} y={startY - 25} textAnchor="middle" fill="#cbd5e1" fontSize="24" className="font-mono font-bold opacity-40 select-none">01</text>

                    {/* Main Road - Professional Light Asphalt */}
                    <path 
                        d={pathD} 
                        fill="none" 
                        stroke="#cbd5e1" 
                        strokeWidth={roadWidth} 
                        strokeOpacity={0.25}
                        strokeLinecap="butt"
                        strokeLinejoin="round"
                    />
                    <path 
                        d={pathD} 
                        fill="none" 
                        stroke="#94a3b8" 
                        strokeWidth={roadWidth - (isMobile ? 10 : 20)} 
                        strokeOpacity={0.1}
                        strokeLinecap="butt"
                        strokeLinejoin="round"
                    />
                    <path 
                        id="road-path"
                        d={pathD} 
                        fill="none" 
                        stroke="#ffffff" 
                        strokeWidth={isMobile ? 2 : 4} 
                        strokeDasharray="40 40"
                        strokeOpacity={0.8}
                        strokeLinecap="butt"
                    />

                    {/* Slanted Checkered Finish Line */}
                    <g style={{ transform: `translate(${w * 0.5}px, ${footerY}px) rotate(${finishAngle - 90}deg)` }}>
                        <rect x={-roadWidth/2} y={0} width={roadWidth} height="24" fill="url(#finish-pattern)" className="opacity-80" />
                    </g>
                </svg>
            </div>

            {/* Layer 2: Car (Foreground, z-50) - Hoisted above all content */}
            <div className="absolute top-0 left-0 w-full h-full z-50 pointer-events-none">
                 <F1Car pathId="#road-path" startY={startY} endY={footerY} isMobile={isMobile} />
            </div>
        </div>
    );
}

function F1Car({ pathId, startY, endY, isMobile }: { pathId: string, startY: number, endY: number, isMobile: boolean }) {

    const { scrollY } = useScroll();

    // High performance spring: very stiff and low mass for near-instant reaction (no lag)

    const smoothScrollY = useSpring(scrollY, { stiffness: 400, damping: 40, mass: 0.5, restDelta: 0.1 });

    

    const carRef = useRef<HTMLDivElement>(null);
    const [pathEl, setPathEl] = useState<SVGPathElement | null>(null);
    const [speed, setSpeed] = useState(0);
    const lastY = useRef(0);

    const updateCar = useCallback((currentScrollY: number) => {
        if (!pathEl || !carRef.current) return;
        try {
            const len = pathEl.getTotalLength();
            const winH = window.innerHeight;
            setSpeed(Math.abs(currentScrollY - lastY.current));
            lastY.current = currentScrollY;
            
            let targetDocY = currentScrollY + winH * 0.45;
            const progressRatio = Math.max(0, Math.min(1, (targetDocY - startY) / (endY - startY)));
            const point = pathEl.getPointAtLength(progressRatio * len);
            
            const lookAhead = 20;
            const p1 = pathEl.getPointAtLength(Math.max(0, progressRatio * len - lookAhead));
            const p2 = pathEl.getPointAtLength(Math.min(len, progressRatio * len + lookAhead));
            const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
            
            const offsetX = isMobile ? 17.5 : 25;
            const offsetY = isMobile ? 28 : 40;
            
            carRef.current.style.transform = `translate(${point.x - offsetX}px, ${point.y - offsetY}px) rotate(${angle + 90}deg)`;
        } catch (e) {}
    }, [pathEl, startY, endY, isMobile]);

    useEffect(() => {
        const el = document.querySelector(pathId) as SVGPathElement;
        if (el) setPathEl(el);
    }, [pathId]);

    useEffect(() => { if (pathEl) updateCar(scrollY.get()); }, [pathEl, scrollY, updateCar]);
    useMotionValueEvent(smoothScrollY, "change", updateCar);

    return (
        <div ref={carRef} className={cn("absolute top-0 left-0 z-10 will-change-transform", isMobile ? "w-[35px] h-[56px]" : "w-[50px] h-[80px]")}>
             <Smoke speed={speed} />
             <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-xl filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                <g>
                    <rect x="10" y="170" width="80" height="15" rx="2" fill="#ef4444" />
                    <path d="M40 170 L40 60 L35 40 L45 10 L55 10 L65 40 L60 60 L60 170 Z" fill="#1e293b" />
                    <path d="M20 110 L40 100 L40 150 L20 140 Z" fill="#ef4444" />
                    <path d="M80 110 L60 100 L60 150 L80 140 Z" fill="#ef4444" />
                    <path d="M5 20 L95 20 L85 10 L15 10 Z" fill="#ef4444" />
                    <circle cx="50" cy="80" r="8" fill="#333" />
                    <circle cx="50" cy="80" r="4" fill="#fbbf24" />
                    <rect x="0" y="30" width="18" height="35" rx="4" fill="#0f172a" />
                    <rect x="82" y="30" width="18" height="35" rx="4" fill="#0f172a" />
                    <rect x="0" y="130" width="20" height="40" rx="4" fill="#0f172a" />
                    <rect x="80" y="130" width="20" height="40" rx="4" fill="#0f172a" />
                </g>
             </svg>
        </div>
    );
}

function Smoke({ speed }: { speed: number }) {
    if (speed < 1) return null;
    return (
        <div className="absolute top-[90%] left-1/2 -translate-x-1/2 w-10 h-20 pointer-events-none flex justify-center">
            {[0, 1].map(i => (
                <motion.div key={i} className="absolute w-4 h-4 bg-slate-400/30 rounded-full blur-sm" initial={{ opacity: 0, scale: 0.5, y: 0 }}
                    animate={{ y: [0, 40], scale: [0.5, 1.5], opacity: [0.4, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.25, ease: "easeOut" }}
                />
            ))}
        </div>
    );
}