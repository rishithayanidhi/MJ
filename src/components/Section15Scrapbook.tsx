"use client";

import { motion } from "framer-motion";

export default function Section15Scrapbook() {
  return (
    <section className="relative w-full min-h-screen bg-[#F5F5DC] flex flex-col items-center justify-center py-32 overflow-hidden">
      
      <h2 className="text-5xl text-[#8B4513] font-[family-name:var(--font-great-vibes)] mb-16 drop-shadow-sm">
        Our Digital Scrapbook
      </h2>

      {/* Scrapbook Container */}
      <div className="relative w-full max-w-5xl aspect-square md:aspect-video bg-[#FFF9EB] shadow-[0_30px_60px_rgba(0,0,0,0.15)] rounded-sm flex">
        {/* Book Binding/Crease */}
        <div className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/10 to-transparent z-20 pointer-events-none" />
        
        {/* Left Page */}
        <div className="w-1/2 h-full relative p-8 overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
          
          <motion.div 
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="absolute top-10 left-10 w-48 h-48 bg-white p-3 shadow-md rotate-[-5deg]"
          >
            <div className="w-full h-full bg-gray-300 bg-[url('/assets/20.jpeg')] bg-cover bg-center mix-blend-multiply opacity-80" />
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/50 backdrop-blur-sm border border-black/10 shadow-sm" />
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="absolute bottom-20 right-10 w-64 p-4 bg-[#FFDAB9]/40 rounded-sm shadow-sm rotate-[3deg] font-[family-name:var(--font-dancing-script)] text-[#5C4033] text-2xl"
          >
            "Remember that day it rained so hard but we just laughed?"
            <div className="absolute -top-2 right-4 w-4 h-4 bg-red-400 rounded-full shadow-sm" />
          </motion.div>

          {/* Random Doodles */}
          <svg className="absolute bottom-10 left-10 w-32 h-32 opacity-30 text-[#8B0000]">
            <path d="M10,50 Q50,10 90,50 T130,50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
          </svg>
        </div>

        {/* Right Page */}
        <div className="w-1/2 h-full relative p-8 overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
          
          {/* Ticket Stub */}
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="absolute top-20 right-16 w-40 h-20 bg-orange-100 border-2 border-dashed border-orange-300 shadow-md rotate-[12deg] flex items-center justify-center flex-col"
          >
            <span className="font-mono text-xs text-orange-800 uppercase font-bold tracking-widest">Admit One</span>
            <span className="font-serif text-lg text-orange-900 mt-1">First Movie</span>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="absolute bottom-16 left-12 w-56 h-64 bg-white p-4 pb-12 shadow-md rotate-[-2deg]"
          >
            <div className="w-full h-full bg-gray-300 bg-[url('/assets/movie2.jpeg')] bg-cover bg-center mix-blend-multiply opacity-80" />
            <p className="absolute bottom-3 left-0 w-full text-center font-[family-name:var(--font-quicksand)] text-[#5C4033]">
              So perfect.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
