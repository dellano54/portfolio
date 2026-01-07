"use client";

import { useRef, ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { magneticTilt } from "@/lib/gsap";

interface NeuroCardProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}

export default function NeuroCard({ children, className, tilt = true }: NeuroCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!tilt || !cardRef.current) return;

    const card = cardRef.current;
    
    const onMouseMove = (e: MouseEvent) => {
      const { rotateX, rotateY } = magneticTilt(card, e, 15); // Strength 15

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.6,
        ease: "power2.out",
        transformPerspective: 1000,
        overwrite: "auto"
      });
      
      // Pass CSS vars if needed for other effects
      // card.style.setProperty("--tilt-x", `${rotateX}deg`);
      // card.style.setProperty("--tilt-y", `${rotateY}deg`);
    };

    const onMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
        overwrite: "auto"
      });
    };

    card.addEventListener("mousemove", onMouseMove);
    card.addEventListener("mouseleave", onMouseLeave);

    return () => {
        card.removeEventListener("mousemove", onMouseMove);
        card.removeEventListener("mouseleave", onMouseLeave);
    };
  }, { scope: cardRef });

  return (
    <div 
      ref={cardRef} 
      className={cn("neuro-card relative transform-style-preserve-3d", className)}
      data-tilt={tilt ? "true" : undefined}
    >
        {children}
    </div>
  );
}