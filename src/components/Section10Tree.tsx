"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Leaf } from "lucide-react";

// Generate random leaves for the tree
const leaves = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  x: Math.random() * 80 + 10, // 10% to 90% width
  y: Math.random() * 50 + 10, // 10% to 60% height
  rotation: Math.random() * 360,
  memory: `Memory of our time together... Part ${i + 1}`,
}));

export default function Section10Tree() {
  const [fallenLeaves, setFallenLeaves] = useState<number[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null);

  const handleLeafClick = (id: number, memory: string) => {
    if (fallenLeaves.includes(id)) return; // Already fallen
    
    // Add to fallen leaves to trigger animation
    setFallenLeaves(prev => [...prev, id]);
    
    // Show memory modal after leaf falls
    setTimeout(() => {
      setSelectedMemory(memory);
    }, 1000);
  };

  const handleCloseModal = () => {
    setSelectedMemory(null);
    // Regenerate leaves
    setTimeout(() => setFallenLeaves([]), 500);
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-[#FFFDF0] to-[#E6E6FA]/40 overflow-hidden py-32 flex flex-col items-center justify-end">
      
      <div className="absolute top-20 w-full text-center z-20">
        <h2 className="text-5xl text-[#5C4033] font-[family-name:var(--font-great-vibes)] drop-shadow-sm mb-2">
          The Memory Tree
        </h2>
        <p className="text-[#B76E79] font-[family-name:var(--font-quicksand)]">
          Every leaf holds a story. Tap one.
        </p>
      </div>

      {/* The Tree Structure */}
      <div className="relative w-full max-w-2xl h-[600px] flex justify-center items-end">
        {/* Simple Trunk SVG */}
        <svg viewBox="0 0 200 400" className="w-48 h-[400px] text-[#5C4033] fill-current opacity-80" preserveAspectRatio="none">
          <path d="M90 400 Q80 200 60 100 Q80 150 95 200 Q95 100 120 50 Q105 150 105 200 Q120 200 140 100 Q120 250 110 400 Z" />
        </svg>

        {/* Tree Crown background glow */}
        <div className="absolute top-0 w-[400px] h-[300px] bg-[#FFDAB9]/20 rounded-full blur-[60px]" />

        {/* Leaves */}
        {leaves.map((leaf) => {
          const isFallen = fallenLeaves.includes(leaf.id);
          return (
            <motion.button
              key={leaf.id}
              onClick={() => handleLeafClick(leaf.id, leaf.memory)}
              initial={{ x: `${leaf.x}%`, y: `${leaf.y}%`, rotate: leaf.rotation, opacity: 1 }}
              animate={isFallen ? { 
                y: '500px', 
                x: `calc(${leaf.x}% + ${Math.random() * 100 - 50}px)`, 
                rotate: leaf.rotation + 360,
                opacity: 0
              } : { 
                y: `${leaf.y}%`, 
                opacity: 1 
              }}
              transition={{ duration: isFallen ? 2 : 1, ease: "easeInOut" }}
              whileHover={{ scale: 1.2, filter: "drop-shadow(0 0 10px rgba(255,182,193,0.8))" }}
              className="absolute text-[#FFB6C1] z-10 w-10 h-10 origin-bottom flex items-center justify-center cursor-pointer"
              style={{ left: `${leaf.x}%`, top: `${leaf.y}%` }}
            >
              <Leaf className="w-8 h-8 fill-current drop-shadow-sm" />
            </motion.button>
          );
        })}
      </div>

      {/* Memory Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.5, y: 100, rotate: -5 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              className="bg-[#FFF9EB] p-8 rounded-3xl shadow-2xl max-w-md w-full relative"
            >
              <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 text-[#5C4033] hover:bg-black/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex justify-center mb-6">
                <Leaf className="w-12 h-12 text-[#FFB6C1] fill-[#FFB6C1]" />
              </div>
              
              <p className="text-[#5C4033] font-[family-name:var(--font-dancing-script)] text-3xl text-center leading-relaxed">
                "{selectedMemory}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
