"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Feather, Heart } from "lucide-react";
import { siteConfig } from "@/config/data";

const poems = siteConfig.poems;

export default function Section8Poems() {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < poems.length - 1) setCurrentPage(p => p + 1);
  };
  
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(p => p - 1);
  };

  return (
    <section className="relative w-full min-h-screen bg-[#FFFDF0] flex flex-col items-center justify-center py-32 overflow-hidden">
      
      <h2 className="text-5xl text-[#B76E79] font-[family-name:var(--font-great-vibes)] mb-12 drop-shadow-sm">
        Whispers of Love
      </h2>

      <div className="relative w-full max-w-3xl aspect-[3/4] md:aspect-[16/9] perspective-[2000px]">
        {/* The Book Container */}
        <div className="absolute inset-0 bg-[#FAF9F0] rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] flex border border-[#E5E0C8]">
          
          {/* Left Page (Static Decorative) */}
          <div className="hidden md:flex w-1/2 h-full items-center justify-center p-12 relative overflow-hidden bg-gradient-to-br from-[#F5F3E6] to-[#FAF9F0] rounded-l-xl">
            {/* Elegant Border */}
            <div className="absolute inset-6 border border-[#B76E79]/20 rounded-lg p-6 flex flex-col items-center justify-center">
              <Feather className="w-10 h-10 text-[#B76E79]/40 mb-6" strokeWidth={1} />
              <span className="text-[#B76E79] font-[family-name:var(--font-great-vibes)] text-5xl mb-6 drop-shadow-sm">Our Poetry</span>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#B76E79]/40 to-transparent" />
              <p className="mt-8 text-[#5C4033]/60 font-[family-name:var(--font-quicksand)] text-center text-sm italic max-w-[200px]">
                "Words fall short, but still we try, to capture love before it flies."
              </p>
            </div>
            {/* Book spine shadow */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/[0.04] to-transparent pointer-events-none" />
          </div>

          {/* Right Page (Active) */}
          <div className="w-full md:w-1/2 h-full relative bg-[#FAF9F0] rounded-r-xl overflow-hidden">
            {/* Book spine shadow */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/[0.04] to-transparent pointer-events-none z-20 hidden md:block" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ rotateY: 90, opacity: 0, transformOrigin: "left" }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 p-8 md:p-12 flex flex-col items-center justify-center"
              >
                {/* Vintage Texture */}
                <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none" />
                
                <h3 className="text-4xl text-[#B76E79] font-[family-name:var(--font-dancing-script)] mb-10 text-center relative z-10 drop-shadow-sm">
                  {poems[currentPage].title}
                </h3>
                
                <p className="text-[#5C4033] font-[family-name:var(--font-poppins)] text-lg leading-loose whitespace-pre-wrap text-center relative z-10">
                  {poems[currentPage].text}
                </p>

                <div className="absolute bottom-8 left-0 w-full flex justify-center items-center gap-3 text-[#5C4033]/40 font-[family-name:var(--font-quicksand)] text-sm">
                  <Heart className="w-3 h-3 fill-current" />
                  <span>Page {currentPage + 1} of {poems.length}</span>
                  <Heart className="w-3 h-3 fill-current" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Controls */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex gap-8">
          <button 
            onClick={prevPage} 
            disabled={currentPage === 0}
            className="p-3 rounded-full bg-white/50 backdrop-blur-md text-[#5C4033] disabled:opacity-30 hover:bg-white transition-colors shadow-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextPage}
            disabled={currentPage === poems.length - 1}
            className="p-3 rounded-full bg-white/50 backdrop-blur-md text-[#5C4033] disabled:opacity-30 hover:bg-white transition-colors shadow-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

      </div>

    </section>
  );
}
