import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register standard plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

// Custom "Liquid" Ease (simulated cubic-bezier)
// Corresponds to: M0,0 C0.12,0.4 0.4,0.12 0.5,0.5 0.6,0.88 0.88,0.6 1,1
// We use a close CSS cubic-bezier approximation for standard tweens or CustomEase if available.
// Since CustomEase is separate, we'll export a string for CSS usage and a custom ease function for GSAP.
export const liquidEase = "cubic-bezier(0.12, 0.4, 0.4, 1.0)"; // Simplified for CSS/GSAP compat

// Magnetic Tilt Utility
export const magneticTilt = (
  element: HTMLElement, 
  e: React.MouseEvent | MouseEvent, 
  strength: number = 20
) => {
  const rect = element.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = ((y - centerY) / centerY) * -strength;
  const rotateY = ((x - centerX) / centerX) * strength;
  
  return { rotateX, rotateY };
};

export { gsap, ScrollTrigger, useGSAP };