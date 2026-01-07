"use client";

import { useRef, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectItem {
  title: string;
  subtitle: string;
  image: string;
  metric: string;
  description: string;
  stack: string[];
  link: string;
}

interface ProjectsProps {
  data: ProjectItem[];
}

export default function Projects({ data }: ProjectsProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  // Use the passed data or empty array if undefined
  const projects = data || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexStr = entry.target.getAttribute('data-index');
            if (indexStr) {
                const index = parseInt(indexStr);
                setVisibleCards(prev => [...new Set([...prev, index])]);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    const cards = containerRef.current?.querySelectorAll('.project-card');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [projects]); // Re-run effect if projects change

  return (
    <section ref={containerRef} id="work" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-transparent relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-8">
            <div>
                <span className="text-slate-500 font-mono text-xs uppercase tracking-widest block mb-4">Engineering Logs</span>
                <h2 className="text-5xl md:text-8xl font-bold text-slate-900 uppercase leading-[0.85] tracking-tighter">
                    Selected <br/> Work<span className="text-accent">.</span>
                </h2>
            </div>
            <p className="text-slate-600 max-w-sm font-medium leading-relaxed text-left md:text-left">
                High-impact engineering challenges solved with precision and performance in mind.
            </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, idx) => (
            <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                key={idx}
                data-index={idx}
                className={cn(
                    "project-card group relative bg-white rounded-[2rem] p-4 border border-slate-200 hover:border-accent/40 hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 flex flex-col",
                    idx % 2 === 0 ? "md:mx-0 mr-8 md:mr-0" : "md:mx-0 ml-8 md:ml-0"
                )}
                style={{
                  opacity: visibleCards.includes(idx) ? 1 : 0,
                  transform: visibleCards.includes(idx) ? 'translateY(0)' : 'translateY(40px)',
                  transition: `opacity 0.8s ease-out ${idx * 0.15}s, transform 0.8s ease-out ${idx * 0.15}s`
                }}
            >
              
              {/* Image Container */}
              <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-6 bg-slate-100">
                <img 
                    src={project.image} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                    alt={project.title} 
                />
                
                {/* Floating Metric Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
                    <span className="text-xs font-bold text-accent">{project.metric}</span>
                </div>

                {/* Overlay Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-xl transform scale-50 group-hover:scale-100 transition-transform duration-300 text-white">
                        <ArrowUpRight size={24} />
                    </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-2 pb-4 flex flex-col flex-grow">
                 <div className="flex justify-between items-start mb-2">
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">{project.subtitle}</span>
                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-accent transition-colors">{project.title}</h3>
                    </div>
                 </div>

                 <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6 line-clamp-2">
                    {project.description}
                 </p>

                 <div className="mt-auto flex flex-wrap gap-2">
                    {project.stack.map((tech, tIdx) => (
                        <span key={tIdx} className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-slate-100 group-hover:border-slate-200 transition-colors">
                            {tech}
                        </span>
                    ))}
                 </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}