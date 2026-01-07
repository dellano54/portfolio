"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import { GitCommit, Code2, Terminal, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

const ScrambleText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let frame = 0;
    let queue: Array<{ from: string, to: string, start: number, end: number, char?: string }> = [];
    let frameRequest: number;
    const length = text.length;
    
    for (let i = 0; i < length; i++) {
      const start = Math.floor(Math.random() * 40) + (delay * 60);
      const end = start + Math.floor(Math.random() * 40);
      queue.push({ from: text[i], to: text[i], start, end });
    }

    const update = () => {
      let output = '';
      let complete = 0;
      
      for (let i = 0; i < queue.length; i++) {
        let { to, start, end, char } = queue[i];
        
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = CHARS[Math.floor(Math.random() * CHARS.length)];
            queue[i].char = char;
          }
          output += `<span class="text-accent">${char}</span>`;
        } else {
          output += `<span class="opacity-0">${to}</span>`;
        }
      }
      
      setDisplayText(output);

      if (complete < queue.length) {
        frameRequest = requestAnimationFrame(update);
        frame++;
      }
    };

    setIsReady(true);
    update();

    return () => cancelAnimationFrame(frameRequest);
  }, [text, delay]);

  if (!isReady) {
    return <span className={cn(className, "opacity-0")}>{text}</span>;
  }

  return <span className={className} dangerouslySetInnerHTML={{ __html: displayText }} />;
};

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.reveal', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.5
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const [gitCommits, setGitCommits] = useState<number | null>(null);
  const [leetCode, setLeetCode] = useState<number | null>(null);

  useEffect(() => {
    const getCommits = async () => {
        const data = await fetch("/api/git");
        const res = await data.json();
        console.log(res);

        setGitCommits(res.gitCommits);
        setLeetCode(res.leetcode);
    }

    getCommits();
  }, []);

  return (
    <section ref={containerRef} id="home" className="min-h-screen flex flex-col justify-center relative pt-20 overflow-hidden bg-transparent">
        
        <div className="max-w-7xl mx-auto px-6 md:px-24 w-full relative z-10">
            
            {/* NAME (DECODER EFFECT) */}
            <div className="mb-12 md:mb-20">
                <h1 className="font-display font-bold leading-[0.85] tracking-tighter">
                    <ScrambleText text="DELLANO" className="block text-[15vw] md:text-[9rem] text-metal" delay={0} />
                </h1>
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-4 md:mt-4">
                    <ScrambleText text="SAMUEL" className="font-display font-bold text-[8vw] md:text-[3.5rem] text-slate-800 leading-none tracking-tight" delay={0.5} />
                    <ScrambleText text="FERNANDEZ" className="font-display font-bold text-[8vw] md:text-[3.5rem] text-slate-400 leading-none tracking-tight" delay={1} />
                </div>
            </div>

            {/* INTRO */}
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 border-t border-slate-200 pt-8 md:pt-12 reveal opacity-0 translate-y-[30px]">
                <div className="md:col-span-8">
                    <h2 className="text-lg md:text-xl text-primary mb-4 md:mb-6 font-medium tracking-wide">Architecting Performance.</h2>
                    <div className="space-y-4 md:space-y-6 text-slate-600 font-light text-base md:text-lg leading-relaxed max-w-2xl">
                        <p>
                            I am a <strong className="text-accent font-normal">B.Tech IT Undergraduate</strong> and Systems Researcher. I specialize in the intersection of High-Performance Computing and Modern Web Architecture.
                        </p>
                        <p>
                            While others rely on abstractions, I engineer the infrastructure. From <strong className="text-primary">Full Stack Web Development</strong> to optimizing <strong className="text-primary">AI Kernels</strong>, my work is defined by precision and scale.
                        </p>
                    </div>
                </div>
                
                {/* Stats / Telemetry */}
                <div className="md:col-span-4 flex items-end justify-center md:justify-end z-10 w-full">
                    <div className="w-full md:max-w-sm bg-white/90 border border-slate-200 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-2xl backdrop-blur-2xl transition-all hover:scale-[1.02] duration-500 relative overflow-hidden group">
                        
                        {/* Technical Background Detail */}
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Activity size={100} className="text-slate-900" />
                        </div>

                        {/* Main Grid Metrics */}
                        <div className="space-y-10 relative z-10">
                            
                            {/* GitHub Velocity */}
                            <div className="relative">
                                <div className="flex items-center gap-2 mb-4">
                                    <GitCommit size={14} className="text-blue-600" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">GitHub</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3.5 bg-slate-50 rounded-2xl text-slate-900 group-hover:text-blue-600 transition-all duration-500 border border-slate-100 group-hover:border-blue-100">
                                            <GitCommit size={24} />
                                        </div>
                                        <div>
                                            <div className="flex items-baseline gap-1">
                                                <span className="block font-display text-5xl font-bold text-slate-900 leading-none tracking-tighter">{gitCommits ?? "—"}</span>
                                                <span className="text-blue-600 font-mono text-[10px] font-bold animate-pulse">▲</span>
                                            </div>
                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1 block">Commits / Wk</span>
                                        </div>
                                    </div>
                                    {/* Velocity Sparkline */}
                                    <div className="flex gap-1.5 items-end h-10">
                                        {[30, 50, 40, 80, 60, 95, 70].map((h, i) => (
                                            <motion.div 
                                                key={i} 
                                                className="w-2 bg-blue-500 rounded-t-sm" 
                                                style={{ opacity: 0.2 + (i * 0.1) }}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${h}%` }}
                                                transition={{ delay: 1 + (i * 0.1), duration: 0.8, ease: "easeOut" }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Competitive Programming Block */}
                            <div className="pt-8 border-t border-slate-100">
                                {/* LeetCode */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Code2 size={14} className="text-blue-600" />
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">LeetCode</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-4xl font-bold text-slate-900 font-display leading-none">{leetCode ?? "—"}</span>
                                            <span className="text-sm text-slate-400 font-mono tracking-tighter">/500</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                            <motion.div 
                                                className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-[0_0_12px_rgba(37,99,235,0.4)] relative" 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${leetCode ? (leetCode / 500) * 100 : 0}%` }}
                                                transition={{ delay: 1.5, duration: 1.5, ease: "circOut" }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" 
                                                     style={{ 
                                                         animation: 'shimmer 2s infinite',
                                                         animationTimingFunction: 'ease-in-out'
                                                     }} 
                                                />
                                            </motion.div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] text-slate-400 font-mono">
                                                {leetCode ? Math.round((leetCode / 500) * 100) : 0}% Complete
                                            </span>
                                            <span className="text-[10px] text-blue-600 font-bold">
                                                {leetCode ? 500 - leetCode : 500} Left
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        {/* Shimmer Animation Style */}
        <style jsx>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
    </section>
  );
}