"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const links = [
    { name: "Bio", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "projects", href: "#work" },
  ];

  return (
    <>
      <nav className={cn(
          "fixed top-0 w-full z-50 px-6 md:px-8 py-4 md:py-6 flex justify-between items-center transition-all duration-500",
          scrolled ? "bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm" : "bg-transparent border-b border-transparent"
      )}>
        <Link href="/" className="font-display font-bold text-xl tracking-tighter text-slate-900 hover:text-accent transition-colors z-50 relative">
          DSF.
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12 font-mono">
          {links.map((link) => (
              <Link 
                  key={link.name} 
                  href={link.href} 
                  className="relative text-slate-600 hover:text-slate-900 transition-colors text-xs uppercase tracking-widest nav-link group"
              >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
          ))}
        </div>

        <div className="hidden md:block">
            <Link 
                href="#contact" 
                className="px-5 py-2 border border-slate-200 rounded-sm font-mono text-[10px] uppercase tracking-widest hover:bg-accent hover:text-white hover:border-accent transition-all cursor-pointer text-slate-600 hover:shadow-lg"
            >
                contact
            </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden z-50 p-2 -mr-2 text-slate-900 hover:text-accent transition-colors"
        >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
            >
                <div className="flex flex-col items-center gap-8">
                    {links.map((link, i) => (
                        <motion.div
                            key={link.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + (i * 0.1) }}
                        >
                            <Link 
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="font-display font-bold text-4xl text-slate-900 hover:text-accent transition-colors"
                            >
                                {link.name}
                            </Link>
                        </motion.div>
                    ))}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8"
                    >
                         <Link 
                            href="#contact"
                            onClick={() => setIsOpen(false)} 
                            className="px-8 py-3 border border-slate-900 rounded-full font-mono text-sm uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all"
                        >
                            Contact
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
