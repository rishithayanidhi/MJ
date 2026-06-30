"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { siteConfig } from "@/config/data";

const reasons = siteConfig.reasons;

export default function Section14Reasons() {
  const [currentReason, setCurrentReason] = useState<string | null>(null);
  const [explosions, setExplosions] = useState<{ id: number; x: number; y: number }[]>([]);

  const drawCard = (e: React.MouseEvent) => {
    const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
    setCurrentReason(randomReason);
    
    // Trigger explosion
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setExplosions(prev => [...prev, { id: Date.now(), x, y }]);
    
    setTimeout(() => {
      setExplosions(prev => prev.slice(1));
    }, 2000);
  };

  return (
    <section className="relative w-full min-h-screen bg-[#FFF9EB] flex flex-col items-center justify-center py-32 overflow-hidden">
      
      <div className="text-center mb-16 z-10">
        <h2 className="text-5xl text-[#B76E79] font-[family-name:var(--font-great-vibes)] mb-2">
          365 Reasons Why
        </h2>
        <p className="text-[#5C4033] font-[family-name:var(--font-quicksand)]">
          Click the deck to draw a reason.
        </p>
      </div>

      <div className="relative w-full max-w-lg flex flex-col items-center">
        
        {/* The Deck */}
        <div className="relative w-64 h-80 cursor-pointer group" onClick={drawCard}>
          {/* Faked stack behind */}
          {[1, 2, 3].map(i => (
            <div 
              key={i} 
              className="absolute inset-0 bg-[#F5F5DC] rounded-xl border border-white shadow-md transition-transform group-hover:-translate-y-2"
              style={{ transform: `rotate(${i * -3}deg) translate(${i * -2}px, ${i * 2}px)`, zIndex: -i }}
            />
          ))}
          
          {/* Top Card */}
          <motion.div 
            whileHover={{ y: -10, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="absolute inset-0 bg-[#FFFDF0] rounded-xl shadow-xl border border-white/50 flex flex-col items-center justify-center p-6 text-center z-10 overflow-hidden glass-card"
          >
            {/* Animated card background pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#B76E79_2px,_transparent_2px)] bg-[size:20px_20px]" />
            
            <Heart className="w-12 h-12 text-[#FFB6C1] fill-[#FFB6C1] mb-6 drop-shadow-sm" />
            <h3 className="text-2xl text-[#5C4033] font-[family-name:var(--font-dancing-script)]">
              Draw a Card
            </h3>
            
            {/* Heart Explosions */}
            <AnimatePresence>
              {explosions.map(exp => (
                <motion.div
                  key={exp.id}
                  className="absolute pointer-events-none"
                  style={{ left: exp.x, top: exp.y }}
                >
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
                      animate={{ 
                        scale: Math.random() * 1.5 + 0.5,
                        opacity: 0,
                        x: (Math.random() - 0.5) * 200,
                        y: (Math.random() - 0.5) * 200 - 100,
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="absolute"
                    >
                      <Heart className="w-6 h-6 text-[#FFB6C1] fill-[#FFB6C1]" />
                    </motion.div>
                  ))}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Drawn Card Result */}
        <AnimatePresence mode="wait">
          {currentReason && (
            <motion.div
              key={currentReason}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-16 bg-white p-8 rounded-2xl shadow-lg max-w-sm text-center relative border border-[#FFDAB9]/50"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#FFB6C1] rounded-full shadow-md flex items-center justify-center text-white font-bold font-serif text-sm">
                #
              </div>
              <p className="text-[#5C4033] font-[family-name:var(--font-quicksand)] text-xl font-medium leading-relaxed">
                "{currentReason}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
