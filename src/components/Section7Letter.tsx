"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Section7Letter() {
  const [isOpen, setIsOpen] = useState(false);
  
  const letterText = `My Dearest Love,

If you are reading this, it means another beautiful year has passed, and you are now twenty. 

I wanted to make something special for you, something that wouldn't just be read, but felt. Every word here is written with the ink of my heart. 

You are the morning sun that wakes me up, and the gentle moonlight that sings me to sleep. Here's to us, to our memories, and to the countless tomorrows we will share.

Forever yours.`;

  return (
    <section className="relative w-full min-h-screen bg-[#FFF9EB] flex items-center justify-center py-32 overflow-hidden perspective-1000">
      
      <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer relative w-80 h-56 bg-[#F5F5DC] shadow-2xl rounded-sm flex items-center justify-center"
            style={{ boxShadow: "0 20px 40px rgba(92, 64, 51, 0.15)" }}
          >
            {/* Envelope flap lines (using borders) */}
            <div className="absolute inset-0 border-[3px] border-[#E8E8D0] rounded-sm pointer-events-none" />
            
            {/* Wax Seal */}
            <motion.div 
              className="w-16 h-16 bg-[#8B0000] rounded-full flex items-center justify-center shadow-lg relative z-10"
              whileHover={{ scale: 1.1 }}
            >
              <div className="absolute inset-1 border-2 border-red-950/30 rounded-full" />
              <span className="text-[#F5F5DC] font-[family-name:var(--font-great-vibes)] text-2xl">L</span>
            </motion.div>
            
            <p className="absolute bottom-4 text-[#5C4033]/60 font-[family-name:var(--font-dancing-script)] text-xl">
              Tap to break the seal
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
            className="relative max-w-2xl w-[90%] bg-[#FFFDF0] p-8 md:p-16 shadow-2xl rounded-sm origin-bottom"
            style={{ boxShadow: "0 30px 60px rgba(92, 64, 51, 0.1)" }}
          >
            <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none" />
            
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.05 } },
              }}
              className="text-[#5C4033] font-[family-name:var(--font-dancing-script)] text-2xl md:text-4xl leading-relaxed whitespace-pre-wrap relative z-10"
            >
              {letterText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
