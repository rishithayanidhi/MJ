"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X } from "lucide-react";

// Generate random stars
const starsData = Array.from({ length: 40 }).map((_, i) => ({
  id: i,
  x: Math.random() * 90 + 5,
  y: Math.random() * 90 + 5,
  size: Math.random() * 1.5 + 0.5,
  delay: Math.random() * 5,
  memory: `Starry Memory #${i + 1}: The time we just sat in silence and it was enough.`
}));

export default function Section13Stars() {
  const [selectedStar, setSelectedStar] = useState<string | null>(null);

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-[#2a1b38] to-[#1a0b2e] overflow-hidden flex flex-col items-center justify-center py-32 transition-colors duration-1000">
      
      <div className="absolute top-20 w-full text-center z-10 pointer-events-none">
        <h2 className="text-5xl text-[#E6E6FA] font-[family-name:var(--font-great-vibes)] drop-shadow-[0_0_15px_rgba(230,230,250,0.8)] mb-2">
          Written in the Stars
        </h2>
        <p className="text-[#E6E6FA]/70 font-[family-name:var(--font-quicksand)]">
          Click a star to reveal a hidden memory.
        </p>
      </div>

      {/* The Constellation */}
      <div className="absolute inset-0 z-0">
        {starsData.map((star) => (
          <motion.div
            key={star.id}
            className="absolute cursor-pointer p-2 -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
            onClick={() => setSelectedStar(star.memory)}
          >
            <motion.div
              animate={{ 
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.2, 1] 
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: star.delay,
              }}
            >
              <Star 
                className="text-[#FFFACD] fill-[#FFFACD] transition-transform group-hover:scale-150" 
                style={{ width: `${star.size}rem`, height: `${star.size}rem` }} 
              />
            </motion.div>
            
            {/* Glowing aura on hover */}
            <div className="absolute inset-0 bg-[#FFFACD]/30 blur-md rounded-full scale-0 group-hover:scale-150 transition-transform" />
          </motion.div>
        ))}
      </div>

      {/* Memory Modal */}
      <AnimatePresence>
        {selectedStar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-[#1a0b2e]/80 border border-[#E6E6FA]/20 p-8 rounded-3xl shadow-[0_0_50px_rgba(230,230,250,0.2)] max-w-sm w-full relative backdrop-blur-xl"
            >
              <button 
                onClick={() => setSelectedStar(null)}
                className="absolute top-4 right-4 p-2 text-[#E6E6FA] hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex justify-center mb-6">
                <Star className="w-10 h-10 text-[#FFFACD] fill-[#FFFACD] drop-shadow-[0_0_10px_rgba(255,250,205,0.8)]" />
              </div>
              
              <p className="text-[#E6E6FA] font-[family-name:var(--font-quicksand)] text-xl text-center leading-relaxed font-light">
                "{selectedStar}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
