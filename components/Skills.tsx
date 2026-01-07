"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { 
  Terminal, Cpu, Brain, Globe, Shield, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import IconRenderer from "@/components/ui/IconRenderer";

interface TechItem {
  name: string;
  type: "font" | "lucide";
  value: string;
  color?: string;
}

interface SkillCategory {
  category: string;
  desc: string;
  icon: string;
  techs: TechItem[];
}

interface SkillsProps {
  data: SkillCategory[];
}

const marqueeItems = [
    { text: "SYSTEMS", icon: <Terminal size={40} />, color: "text-blue-400" },
    { text: "KERNELS", icon: <Cpu size={40} />, color: "text-emerald-400" },
    { text: "INTELLIGENCE", icon: <Brain size={40} />, color: "text-purple-400" },
    { text: "SCALE", icon: <Globe size={40} />, color: "text-cyan-400" },
    { text: "SECURITY", icon: <Shield size={40} />, color: "text-rose-400" },
    { text: "AUTOMATION", icon: <Zap size={40} />, color: "text-amber-400" },
];

export default function Skills({ data }: SkillsProps) {
  const containerRef = useRef<HTMLElement>(null);
  const darkSectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);

  // If no data provided, don't crash (render nothing or placeholder)
  const detailedStack = data || [];

  useGSAP(() => {
    if (detailedStack.length === 0) return;

    gsap.to(".marquee-track", {
        xPercent: -50,
        repeat: -1,
        duration: 50,
        ease: "linear"
    });

    const mm = gsap.matchMedia();

    // Desktop: Pinning and Scroll-linked Animation
    mm.add("(min-width: 769px)", () => {
        if (trackRef.current && darkSectionRef.current) {
            const getScrollDist = () => {
                const trackHeight = trackRef.current?.scrollHeight || 0;
                const windowHeight = window.innerHeight;
                return Math.max(trackHeight - windowHeight + 400, windowHeight); 
            };

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: darkSectionRef.current,
                    start: "top top", 
                    end: () => `+=${getScrollDist()}`,
                    pin: true,
                    pinSpacing: true,
                    scrub: 0.1, 
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const index = Math.min(
                            Math.floor(progress * detailedStack.length),
                            detailedStack.length - 1
                        );
                        
                        setActiveCategory(prev => {
                            if (prev !== index) return index;
                            return prev;
                        });
                    }
                }
            });

            gsap.set(trackRef.current, { y: 0 });
            
            tl.to(trackRef.current, {
                y: () => -(getScrollDist() - window.innerHeight * 0.1), 
                ease: "none"
            });
        }
    });

    // Mobile: Simple scroll observation for active category
    mm.add("(max-width: 768px)", () => {
        if (trackRef.current && darkSectionRef.current) {
             ScrollTrigger.create({
                trigger: darkSectionRef.current,
                start: "top center",
                end: "bottom center",
                onUpdate: (self) => {
                    // Simple progress tracking without pinning
                    const progress = self.progress;
                    const index = Math.min(
                        Math.floor(progress * detailedStack.length),
                        detailedStack.length - 1
                    );
                    setActiveCategory(prev => (prev !== index ? index : prev));
                }
            });
        }
    });

  }, { scope: containerRef, dependencies: [detailedStack] });

  if (detailedStack.length === 0) return null;

  return (
    <section ref={containerRef} id="skills" className="relative">
      
      {/* Tech Marquee (Light Theme) */}
      <div className="w-full shrink-0 py-12 md:py-16 relative z-10 bg-white border-y border-slate-100 mb-12 md:mb-20">
        <div className="marquee-track flex w-fit gap-8 md:gap-16 whitespace-nowrap px-4 md:px-8">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
                <div key={i} className={`flex items-center gap-2 md:gap-4 ${item.color}`}>
                    <span className="drop-shadow-sm scale-75 md:scale-100">{item.icon}</span>
                    <span className="text-3xl md:text-6xl font-display font-black uppercase tracking-tighter select-none">
                        {item.text}
                    </span>
                </div>
            ))}
        </div>
      </div>

      {/* Dark Tech Stack Section */}
      <div ref={darkSectionRef} className="w-full min-h-screen relative z-10 flex items-center overflow-hidden bg-black">
          
          <div className="absolute inset-0 bg-black z-[10]" />

          <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 flex flex-col lg:flex-row gap-8 lg:gap-20 items-center w-full relative z-[20] py-12 lg:py-0">
                
                {/* Left Side: Category Info */}
                <div className="w-full lg:w-1/3 flex flex-col justify-center shrink-0 pt-0 lg:pt-safe">
                    <div className="flex items-center gap-3 mb-4 lg:mb-6">
                        <div className="w-8 lg:w-10 h-[1px] bg-neon" />
                        <span className="text-neon font-mono text-[10px] lg:text-xs uppercase tracking-widest">System Skills</span>
                    </div>
                    
                    <div className="flex flex-col justify-center">
                        {activeCategory === 0 && (
                            <div className="mb-2 lg:mb-4">
                                <span className="inline-block px-2 lg:px-3 py-0.5 lg:py-1 bg-black text-neon border border-neon text-[9px] lg:text-[10px] font-bold uppercase tracking-widest rounded-full animate-pulse">
                                    Primary Focus
                                </span>
                            </div>
                        )}
                        <h2 className="text-3xl md:text-6xl font-display font-bold text-white leading-[0.9] tracking-tighter mb-3 lg:mb-8">
                            {detailedStack[activeCategory].category}
                        </h2>
                        
                        <div className="min-h-[4.5em] lg:min-h-0">
                            <p className="text-gray-300 font-medium leading-relaxed max-w-full lg:max-w-xs border-l-2 border-gray-700 pl-4 lg:pl-6 text-sm md:text-lg">
                                {detailedStack[activeCategory].desc}
                            </p>
                        </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="mt-4 lg:mt-10 flex gap-1.5 lg:gap-2">
                        {detailedStack.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={cn(
                                    "h-1 rounded-full transition-all duration-500",
                                    idx === activeCategory ? "w-8 lg:w-12 bg-neon" : "w-2 bg-gray-700"
                                )}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Side: Scrolling Cards */}
                <div className="w-full lg:w-2/3 relative flex-1 lg:h-[85vh] overflow-hidden flex items-start [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
                    <div ref={trackRef} className="cards-track w-full flex flex-col gap-4 lg:gap-12 pt-4 lg:pt-[35vh] pb-[20vh] lg:pb-[50vh] will-change-transform">
                        {detailedStack.map((group, idx) => (
                            <div key={idx} className={cn(
                                "skill-card group bg-black border rounded-2xl lg:rounded-[2rem] p-4 lg:p-10 transition-all duration-500 relative overflow-hidden",
                                idx === activeCategory ? "border-neon shadow-none" : "border-white/5"
                            )}>
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-4 lg:mb-10 pb-3 lg:pb-6 border-b border-white/5">
                                        <div className="flex items-center gap-3 lg:gap-5">
                                            <div className={cn(
                                                "w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl flex items-center justify-center border transition-transform duration-500 group-hover:scale-110",
                                                idx === activeCategory ? "bg-black border-neon text-neon" : "bg-black border-white/10 text-white"
                                            )}>
                                                <IconRenderer name={group.icon} size={24} className="text-inherit" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg lg:text-2xl font-bold text-white leading-tight">{group.category}</h3>
                                                <p className="text-gray-400 font-mono text-[9px] lg:text-xs uppercase tracking-wider mt-0.5 lg:mt-1">
                                                    {idx === 0 ? "Core Specialization" : "Key Technologies"}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="hidden md:block font-display text-4xl font-bold text-white/10 group-hover:text-white/20 transition-colors">0{idx + 1}</span>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 lg:gap-4">
                                        {group.techs.map((tech, tIdx) => (
                                            <div key={tIdx} className="flex items-center gap-2 lg:gap-3 cursor-default group/chip px-2 lg:px-4 py-2 lg:py-3 bg-black border border-white/5 rounded md:rounded-lg transition-all duration-200 hover:border-white/20">
                                                <div className="w-5 h-5 lg:w-8 lg:h-8 flex items-center justify-center shrink-0 transition-all duration-300">
                                                    {tech.type === 'font' ? (
                                                        <i className={`${tech.value} text-lg lg:text-2xl`} />
                                                    ) : (
                                                        <div className={cn("text-gray-400 group-hover/chip:text-white transition-colors scale-75 lg:scale-100", tech.color)}>
                                                            <IconRenderer name={tech.value} size={28} />
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="font-bold text-[10px] lg:text-sm text-gray-400 group-hover/chip:text-white transition-colors truncate">{tech.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
          </div>
      </div>
    </section>
  );
}
