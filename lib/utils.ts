import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import throttle from "lodash.throttle";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { throttle };

// Fibonacci spacing tokens for JS usage if needed
export const fib = {
  1: "0.25rem",  // 4px
  2: "0.5rem",   // 8px
  3: "1rem",     // 16px
  5: "1.5rem",   // 24px
  8: "2rem",     // 32px
  13: "3.25rem", // 52px
  21: "5.25rem", // 84px
};