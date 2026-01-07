"use client";

import Link from "next/link";
import { Github, Linkedin, MoveUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="py-16 md:py-24 px-6 md:px-12 lg:px-24 border-t border-neutral-900 relative overflow-hidden text-white">
      {/* Opaque Background Layer - Moved to z-[-1] to show road above it but behind content */}
      <div className="absolute inset-0 bg-neutral-950 z-[-1]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">
            <div className="max-w-3xl w-full">
                <h2 className="text-title text-5xl md:text-8xl lg:text-9xl text-white mb-8 md:mb-16 uppercase">Let&apos;s <br/> Engineer.</h2>
                <a 
                    href="mailto:dellanosamuelfernandez@gmail.com" 
                    className="group inline-flex items-center gap-4 md:gap-6 text-xl md:text-4xl font-bold text-white hover:text-neutral-400 transition-all duration-300 break-all md:break-normal"
                >
                    dellanosamuelfernandez@gmail.com
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-white group-hover:border-neutral-400 flex items-center justify-center transition-all group-hover:rotate-45 shrink-0">
                        <MoveUpRight className="w-4 h-4 md:w-6 md:h-6" />
                    </div>
                </a>
            </div>

            <div className="flex flex-col gap-16 lg:text-right w-full lg:w-auto">
                <div className="flex gap-8 lg:justify-end">
                    <Link href="https://github.com/dellano54" target="_blank" className="p-6 border border-neutral-800 rounded-full text-neutral-400 hover:text-white hover:border-white transition-all transform hover:-translate-y-1">
                        <Github className="w-8 h-8" />
                    </Link>
                    <Link href="https://linkedin.com/in/dellano-fernandez" target="_blank" className="p-6 border border-neutral-800 rounded-full text-neutral-400 hover:text-white hover:border-white transition-all transform hover:-translate-y-1">
                        <Linkedin className="w-8 h-8" />
                    </Link>
                </div>
                
                <div className="space-y-4">
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.4em]">Corporate Identity</p>
                    <p className="text-xl font-bold text-white uppercase">Dellano Samuel Fernandez</p>
                    <p className="text-xs font-medium text-neutral-600">© 2025 ALL RIGHTS RESERVED</p>
                </div>
            </div>
        </div>
      </div>
    </footer >
  );
}
