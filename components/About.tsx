"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Globe } from "lucide-react";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Animate Lines
    const lines = document.querySelectorAll(".spec-line");
    
    gsap.from(lines, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%"
        }
    });
    
    // Animate Text
    gsap.fromTo(".reveal-content", 
        { y: 50, autoAlpha: 0 },
        {
            y: 0,
            autoAlpha: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%"
            }
        }
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="about" className="py-40 bg-transparent relative min-h-[60vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full relative z-10">
        <div className="flex flex-col lg:flex-row gap-32 w-full">
        
        {/* Left Column: Narrative */}
        {/* Mobile: Align Right to let road pass on Left */}
        <div className="lg:w-1/2 flex flex-col justify-center items-start lg:items-start text-left">
            <div className="flex items-center gap-3 mb-8 md:mb-12 reveal-content flex-row">
                <div className="w-12 h-[1px] bg-blue-600" />
                <span className="text-slate-600 font-mono text-xs uppercase tracking-[0.3em] font-bold">Profile Summary</span>
            </div>
            
            <div className="space-y-6 md:space-y-10 max-w-lg reveal-content p-4 md:p-0 rounded-2xl bg-white/60 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none border border-slate-100 md:border-transparent">
                <p className="text-2xl md:text-4xl text-black font-display font-bold leading-[1.1] tracking-tight">
                    Architecting systems at the edge of <span className="text-blue-600">performance</span>.
                </p>
                <p className="text-lg md:text-xl text-slate-800 leading-relaxed font-medium">
                    I optimize neural kernels and engineer distributed cloud infrastructure, focused on maximum efficiency and massive scale.
                </p>
            </div>
        </div>

        {/* Right Column: Spec Sheet */}
        {/* Mobile: Align Left to let road pass on Right */}
        <div className="lg:w-1/2 flex flex-col justify-center space-y-2 items-start w-full">
            
            {/* Spec Item: Education */}
            <div className="group w-full">
                <div className="w-full h-[1px] bg-slate-200 spec-line mb-2" />
                <div className="reveal-content flex flex-col md:flex-row justify-between items-start gap-4 md:gap-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:border-blue-600/30 hover:shadow-md">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest w-20 shrink-0 mt-1">Education</span>
                    <div className="flex-1 w-full">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">SRM Easwari Engineering</h3>
                                <p className="text-slate-700 font-bold text-sm">B.Tech IT • 2023 - Present</p>
                                <p className="text-slate-500 text-xs font-medium mt-1">Ramapuram, Chennai</p>
                            </div>
                            <div className="text-left md:text-right">
                                <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 font-mono text-[10px] font-bold rounded uppercase tracking-tight">CGPA: 8.5/10</span>
                                <p className="text-[9px] text-slate-400 font-medium mt-1">First 2 Semesters</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Spec Item: Internship */}
            <div className="group w-full">
                <div className="w-full h-[1px] bg-slate-200 spec-line mb-2" />
                <div className="reveal-content flex flex-col md:flex-row justify-between items-start gap-4 md:gap-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:border-blue-600/30 hover:shadow-md">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest w-20 shrink-0 mt-1">Internship</span>
                    <div className="flex-1 w-full">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">Nokia</h3>
                                <p className="text-slate-700 font-bold text-sm">Oragadam, Chengalpattu</p>
                            </div>
                            <span className="inline-block px-2 py-1 bg-blue-50 text-blue-600 border border-blue-100 font-mono text-[10px] font-bold rounded uppercase tracking-tight">
                                Nov 2025 – Jan 2026
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Spec Item: Base */}
             <div className="group w-full">
                <div className="w-full h-[1px] bg-slate-200 spec-line mb-2" />
                <div className="reveal-content flex flex-col md:flex-row justify-between items-start gap-4 md:gap-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:border-blue-600/30 hover:shadow-md">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest w-20 shrink-0 mt-1">Location</span>
                    <div className="flex-1 flex items-center justify-between w-full">
                        <h3 className="text-lg md:text-xl font-bold text-slate-900">Chennai, India</h3>
                        <Globe className="text-blue-600/40 group-hover:text-blue-600 transition-colors" size={32} strokeWidth={1.5} />
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  </section>
  );
}
