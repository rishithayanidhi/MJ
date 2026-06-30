"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, StickyNote } from "lucide-react";
import { siteConfig } from "@/config/data";

const polaroids = siteConfig.polaroids.map((p, i) => {
  const rotations = [12, -15, 8, -20, 18, -10, 5, -12];
  const xs = [20, -30, 15, -25, 30, -15, 10, -20];
  const ys = [-20, 15, -30, 25, -10, 20, -15, 30];
  return { 
    ...p, 
    rotation: rotations[i % rotations.length], 
    x: xs[i % xs.length], 
    y: ys[i % ys.length] 
  };
});

export default function Section4Polaroids() {
  const [selected, setSelected] = useState<typeof polaroids[0] | null>(null);

  return (
    <section className="relative w-full min-h-screen bg-[#FFFACD]/30 py-32 overflow-hidden flex flex-col items-center">
      
      <div className="z-10 mb-20 text-center">
        <h2 className="text-6xl text-[#B76E79] font-[family-name:var(--font-great-vibes)] mb-4">
          Our Memory Wall
        </h2>
        <p className="text-[#5C4033] font-[family-name:var(--font-quicksand)] text-lg">
          (Drag the photos around)
        </p>
      </div>

      <div className="relative w-full max-w-6xl h-[600px] mx-auto flex flex-wrap justify-center items-center gap-8 px-4">
        {polaroids.map((item) => (
          <motion.div
            key={item.id}
            drag
            dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
            whileDrag={{ scale: 1.1, zIndex: 50, cursor: "grabbing" }}
            whileHover={{ scale: 1.05, zIndex: 40, rotate: 0 }}
            initial={{ rotate: item.rotation, x: item.x, y: item.y }}
            className="cursor-grab relative bg-white p-4 pb-12 rounded-sm shadow-xl hover:shadow-2xl transition-shadow w-48 md:w-64"
            onClick={() => setSelected(item)}
          >
            {/* Fake Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-sm border border-white/20 rotate-[-3deg] shadow-sm z-10" />
            
            <div className="w-full aspect-square bg-gray-200 overflow-hidden relative">
              <div 
                className="absolute inset-0 bg-cover bg-top" 
                style={{ backgroundImage: `url(${item.src})` }}
              />
              {/* Vintage overlay */}
              <div className="absolute inset-0 bg-[#FFDAB9]/10 mix-blend-multiply" />
            </div>
            
            <p className="absolute bottom-4 left-0 w-full text-center text-[#5C4033] font-[family-name:var(--font-dancing-script)] text-xl">
              {item.caption}
            </p>

            {/* Random Sticky Note */}
            {item.id % 3 === 0 && (
              <div className="absolute -bottom-6 -right-6 bg-yellow-200 p-3 shadow-md rotate-12 w-24 h-24 flex items-center justify-center pointer-events-none">
                <p className="text-xs text-red-500 font-[family-name:var(--font-great-vibes)] text-center text-xl">
                  Love this! ❤️
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Polaroid Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-xl p-4"
          >
            <motion.div
              layoutId={`polaroid-${selected.id}`}
              initial={{ scale: 0.8, y: 50, rotate: -5 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.8, y: 50, opacity: 0, rotate: 5 }}
              className="bg-white p-6 pb-20 rounded-md shadow-2xl max-w-lg w-full relative"
            >
              <button 
                onClick={() => setSelected(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-[#FFDAB9] transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              
              <div className="w-full aspect-square bg-gray-200 mb-6 relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-top" 
                  style={{ backgroundImage: `url(${selected.src})` }}
                />
              </div>
              
              <div className="text-center">
                <h3 className="text-4xl text-[#5C4033] font-[family-name:var(--font-dancing-script)] mb-4">
                  {selected.caption}
                </h3>
                <p className="text-[#5C4033] font-[family-name:var(--font-quicksand)] text-lg leading-relaxed">
                  {selected.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
