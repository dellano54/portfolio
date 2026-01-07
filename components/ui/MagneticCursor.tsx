"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Filter out nulls safely
    const trails = trailsRef.current.filter((t): t is HTMLDivElement => t !== null);

    const onMouseMove = (e: MouseEvent) => {
      // Main cursor
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto"
      });

      // Trails
      trails.forEach((trail, i) => {
        gsap.to(trail, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.4,
          delay: i * 0.1,
          ease: "power2.out",
          overwrite: "auto"
        });
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Magnetic interaction setup for generic icons/buttons
    // We delegate this to the components themselves usually, 
    // but global listener can handle data-magnetic attribute
    const handleMagneticEnter = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('[data-magnetic]')) {
             gsap.to(cursor, { scale: 1.5, duration: 0.3 });
        }
    };
    
    const handleMagneticLeave = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('[data-magnetic]')) {
             gsap.to(cursor, { scale: 0.6, duration: 0.3 });
        }
    };

    window.addEventListener("mouseover", handleMagneticEnter);
    window.addEventListener("mouseout", handleMagneticLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMagneticEnter);
      window.removeEventListener("mouseout", handleMagneticLeave);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="magnetic-cursor" />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={(el) => { trailsRef.current[i] = el; }}
          className="cursor-trail"
        />
      ))}
    </>
  );
}