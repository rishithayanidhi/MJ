"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Section18Finale() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative w-full h-screen bg-[#FFFDF0] flex flex-col items-center justify-center overflow-hidden py-32">
      
      {/* Background Sunrise Animation */}
      <motion.div 
        className="absolute inset-0 z-0 bg-gradient-to-b from-[#FFFACD] via-[#FFDAB9]/50 to-[#FFFDF0]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 3 }}
        viewport={{ once: true, amount: 0.5 }}
      />
      
      {/* Floating Fireflies */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {mounted && [...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-[#FFFACD] rounded-full shadow-[0_0_10px_#FFFACD]"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              x: [null, Math.random() * 50 - 25],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl px-4">
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-[#5C4033] font-[family-name:var(--font-quicksand)] text-2xl md:text-3xl leading-relaxed font-light mb-12"
        >
          If one day we're both sixty and our memories begin to blur, I hope this little corner of the internet reminds us how deeply we loved, laughed, and grew together.
        </motion.p>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.5 }}
          viewport={{ once: true }}
          className="text-6xl md:text-8xl text-[#B76E79] font-[family-name:var(--font-great-vibes)] mb-8"
        >
          Happy 20th Birthday.
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 4 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl text-[#5C4033] font-[family-name:var(--font-dancing-script)] mb-16"
        >
          My Forever.
        </motion.h3>

        {/* The Final Heart */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 2, delay: 5.5 }}
          viewport={{ once: true }}
          className="relative flex items-center justify-center w-64 h-64"
        >
          {/* Pulsing Aura */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#FFB6C1]/20 rounded-full blur-3xl"
          />
          
          <Heart className="w-32 h-32 text-[#FFB6C1] fill-[#FFB6C1] absolute" />
          
          <span className="relative z-10 text-white font-[family-name:var(--font-poppins)] text-lg font-semibold tracking-widest uppercase">
            U & I
          </span>
        </motion.div>

      </div>

    </section>
  );
}
