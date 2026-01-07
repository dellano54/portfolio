"use client";

export default function Background() {
  return (
    <>
      <div className="fixed inset-0 z-[-2] h-full w-full bg-slate-50">
         {/* Grid Texture - Darker dots for visibility on white */}
         <div 
           className="absolute inset-0 opacity-10"
           style={{
             backgroundImage: `radial-gradient(#000000 1px, transparent 1px)`,
             backgroundSize: '32px 32px'
           }}
         />
      </div>
    </>
  );
}