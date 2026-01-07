"use client";

import { 
  Terminal, Cpu, Globe, Laptop, 
  Mic, Workflow, Zap, Activity,
  Brain, Shield, Database, Cloud, 
  Server, Code, Layers, Box,
  Settings, Wrench, Lock, Key
} from "lucide-react";

const iconMap: Record<string, any> = {
  Terminal, Cpu, Globe, Laptop, 
  Mic, Workflow, Zap, Activity,
  Brain, Shield, Database, Cloud,
  Server, Code, Layers, Box,
  Settings, Wrench, Lock, Key
};

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

export default function IconRenderer({ name, className, size = 24 }: IconRendererProps) {
  const Icon = iconMap[name];
  
  if (!Icon) {
    console.warn(`Icon "${name}" not found in IconRenderer map.`);
    return null;
  }

  return <Icon className={className} size={size} />;
}
