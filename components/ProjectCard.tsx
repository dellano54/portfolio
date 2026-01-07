"use client";

import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  category: string;
  metric: string;
  description: string;
  tags?: string[];
}

export default function ProjectCard({ 
  title, 
  category, 
  metric, 
  description, 
  tags = [] 
}: ProjectCardProps) {
  return (
    <div className="group relative bg-black/80 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 h-full p-4 sm:p-6 md:p-8 flex flex-col hover:shadow-2xl hover:shadow-white/5 hover:-translate-y-1">
        
      {/* Technical Header */}
      <div className="flex justify-between items-start mb-4 sm:mb-6 md:mb-8 border-b border-dashed border-white/20 pb-3 sm:pb-4 md:pb-6">
        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white/50 group-hover:text-white/90 transition-colors">
          REF: {title.substring(0, 3).toUpperCase()}_01
        </span>
        <ArrowUpRight 
          size={16} 
          className="text-white/50 group-hover:text-white/90 transition-colors sm:w-[18px] sm:h-[18px]" 
        />
      </div>

      <div className="mb-2 sm:mb-3">
        <span className="text-white/80 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1 sm:mb-2 block">
          {category}
        </span>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-sans font-bold text-white leading-tight">
          {title}
        </h3>
      </div>

      <div className="my-4 sm:my-5 md:my-6">
        <div className="inline-block px-2 sm:px-3 py-1 bg-white/5 text-white font-mono text-xs sm:text-sm font-medium border border-white/20">
          {metric}
        </div>
      </div>

      <p className="text-white/60 leading-relaxed mb-4 sm:mb-6 md:mb-8 flex-grow font-light text-sm sm:text-base">
        {description}
      </p>

      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto pt-4 sm:pt-5 md:pt-6 border-t border-white/20">
        {tags.map((tag, i) => (
          <span 
            key={i} 
            className="text-[10px] sm:text-xs font-mono text-white/50 uppercase bg-white/5 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
