"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const balloonsData = Array.from({ length: 7 }).map((_, i) => ({
  id: i,
  color: ["#FFB6C1", "#FFDAB9", "#E6E6FA", "#FFFACD"][Math.floor(Math.random() * 4)],
  text: "I Love You",
  xOffset: Math.random() * 80 - 40,
}));

export default function Section12Balloons() {
  const [releasedBalloons, setReleasedBalloons] = useState<number[]>([]);

  const handleDragEnd = (id: number, info: any) => {
    // If dragged upwards past a threshold, release it!
    if (info.offset.y < -50) {
      setReleasedBalloons(prev => [...prev, id]);
    }
  };

  return (
    <section className="relative w-full h-screen bg-gradient-to-t from-[#FFFDF0] to-[#FFDAB9]/30 flex flex-col items-center justify-end pb-32 overflow-hidden">
      
      <div className="absolute top-20 w-full text-center z-10 pointer-events-none">
        <h2 className="text-5xl text-[#5C4033] font-[family-name:var(--font-great-vibes)] drop-shadow-sm mb-2">
          Letting Love Fly
        </h2>
        <p className="text-[#B76E79] font-[family-name:var(--font-quicksand)]">
          Drag a balloon upwards and release.
        </p>
      </div>

      <div className="relative w-full max-w-4xl h-[400px] flex justify-center items-end gap-4 md:gap-12">
        {balloonsData.map((balloon) => {
          const isReleased = releasedBalloons.includes(balloon.id);
          
          return (
            <div key={balloon.id} className="relative w-20 md:w-24 h-[300px] flex flex-col items-center justify-end">
              
              <AnimatePresence>
                {!isReleased ? (
                  <motion.div
                    drag="y"
                    dragConstraints={{ top: -100, bottom: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(e, info) => handleDragEnd(balloon.id, info)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95, cursor: "grabbing" }}
                    initial={{ y: 0 }}
                    animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
                    transition={{ duration: Math.random() * 2 + 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-32 flex flex-col items-center cursor-grab origin-bottom z-20"
                    style={{ x: balloon.xOffset }}
                  >
                    {/* The Balloon Body */}
                    <div 
                      className="w-20 h-24 md:w-24 md:h-28 rounded-full shadow-inner flex items-center justify-center text-center p-2 relative overflow-hidden"
                      style={{ 
                        backgroundColor: balloon.color,
                        boxShadow: "inset -5px -5px 15px rgba(0,0,0,0.1), inset 5px 5px 15px rgba(255,255,255,0.8)"
                      }}
                    >
                      <span className="text-[#5C4033]/80 font-[family-name:var(--font-dancing-script)] text-xl font-bold leading-none rotate-[-10deg]">
                        {balloon.text}
                      </span>
                      
                      {/* Shine effect */}
                      <div className="absolute top-2 left-2 w-4 h-8 bg-white/40 rounded-full blur-[2px] rotate-[-20deg]" />
                    </div>
                    
                    {/* Balloon Knot */}
                    <div className="w-2 h-2 border-t-[6px] border-l-4 border-r-4 border-t-transparent border-l-transparent border-r-transparent mt-[-1px]" style={{ borderBottomColor: balloon.color, borderBottomWidth: '6px' }} />
                    
                    {/* The String (only visible when not released) */}
                    <svg className="absolute top-full w-20 h-40 pointer-events-none">
                      <path d="M10,0 Q30,50 10,100 T10,200" fill="none" stroke="rgba(92,64,51,0.2)" strokeWidth="1" />
                    </svg>

                  </motion.div>
                ) : (
                  // Released state: flies upwards forever
                  <motion.div
                    initial={{ y: -50, x: balloon.xOffset }}
                    animate={{ y: -1500, x: balloon.xOffset + (Math.random() * 200 - 100) }}
                    transition={{ duration: 10, ease: "easeIn" }}
                    className="absolute bottom-32 flex flex-col items-center z-10 pointer-events-none"
                  >
                    <div 
                      className="w-20 h-24 md:w-24 md:h-28 rounded-full flex items-center justify-center text-center p-2 relative overflow-hidden"
                      style={{ 
                        backgroundColor: balloon.color,
                        boxShadow: "inset -5px -5px 15px rgba(0,0,0,0.1), inset 5px 5px 15px rgba(255,255,255,0.8)"
                      }}
                    >
                      <span className="text-[#5C4033]/80 font-[family-name:var(--font-dancing-script)] text-xl font-bold leading-none rotate-[-10deg]">
                        {balloon.text}
                      </span>
                    </div>
                    <div className="w-2 h-2 border-t-[6px] border-l-4 border-r-4 border-t-transparent border-l-transparent border-r-transparent mt-[-1px]" style={{ borderBottomColor: balloon.color, borderBottomWidth: '6px' }} />
                    <svg className="absolute top-full w-20 h-40">
                      <path d="M10,0 Q30,50 10,100 T10,200" fill="none" stroke="rgba(92,64,51,0.2)" strokeWidth="1" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          );
        })}
      </div>

    </section>
  );
}
