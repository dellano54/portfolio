"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";

interface MorphIconProps extends LucideProps {
  name: string;
  morphTo?: string; // Name of the icon to morph to (fallback crossfade)
  className?: string;
}

export default function MorphIcon({ name, morphTo, className, ...props }: MorphIconProps) {
  // Dynamic icon resolution
  // @ts-ignore
  const IconComponent = Icons[name.charAt(0).toUpperCase() + name.slice(1)] as React.FC<LucideProps>;
  // @ts-ignore
  const MorphTarget = morphTo ? Icons[morphTo.charAt(0).toUpperCase() + morphTo.slice(1)] as React.FC<LucideProps> : null;

  const [isHovered, setIsHovered] = useState(false);

  if (!IconComponent) return null;

  return (
    <div 
        className={cn("relative inline-flex items-center justify-center", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-magnetic="true"
    >
      <IconComponent 
        className={cn(
            "absolute transition-all duration-500 ease-in-out", 
            isHovered && MorphTarget ? "opacity-0 scale-75 rotate-12" : "opacity-100 scale-100 rotate-0"
        )} 
        {...props} 
      />
      {MorphTarget && (
          <MorphTarget 
            className={cn(
                "absolute transition-all duration-500 ease-in-out", 
                isHovered ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 -rotate-12"
            )} 
            {...props} 
          />
      )}
    </div>
  );
}
