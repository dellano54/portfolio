"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useStore } from "@/store/useStore";

export default function CustomCursor() {
  const { mouse } = useStore();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hoverState, setHoverState] = useState<'default' | 'pointer' | 'text'>('default');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      
      // Basic hover detection
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setHoverState('pointer');
      } else if (target.tagName === 'P' || target.tagName === 'SPAN' || target.tagName === 'H1') {
        setHoverState('text');
      } else {
        setHoverState('default');
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-neon rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: hoverState === 'pointer' ? 1.5 : hoverState === 'text' ? 0.8 : 1,
          borderColor: hoverState === 'pointer' ? 'var(--neon-burn)' : 'var(--neon)',
          borderRadius: hoverState === 'pointer' ? '20%' : '50%'
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-1 h-1 bg-neon rounded-full" />
      </motion.div>
    </>
  );
}
