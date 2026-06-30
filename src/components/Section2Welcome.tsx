"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

const FlyingBird = ({ size = 48, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M 2 12 C 6 6, 10 6, 12 12 C 14 6, 18 6, 22 12" />
  </svg>
);

export default function Section2Welcome() {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative w-full py-24 bg-[#FFF9EB] flex flex-col items-center justify-start overflow-hidden pt-32">
      {/* Floating Hearts Background */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-red-400 opacity-20 pointer-events-none"
          initial={{ 
            x: Math.random() * dimensions.width, 
            y: dimensions.height 
          }}
          animate={{ 
            y: -100,
            x: `+=${Math.random() * 100 - 50}` 
          }}
          transition={{ 
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
        >
          <Heart fill="currentColor" size={Math.random() * 30 + 15} />
        </motion.div>
      ))}

      {/* Moving Birds */}
      <motion.div
        className="absolute top-[15%] left-[-100px] opacity-40 text-[#5C4033]"
        animate={{ x: dimensions.width + 200, y: [-30, 30, -30] }}
        transition={{ x: { duration: 25, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
      >
        <FlyingBird size={48} />
      </motion.div>
      
      <motion.div
        className="absolute top-[30%] left-[-150px] opacity-30 text-[#5C4033]"
        animate={{ x: dimensions.width + 300, y: [20, -20, 20] }}
        transition={{ x: { duration: 35, repeat: Infinity, ease: "linear", delay: 5 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
      >
        <FlyingBird size={36} />
      </motion.div>

      <motion.div
        className="absolute top-[10%] left-[-200px] opacity-20 text-[#5C4033]"
        animate={{ x: dimensions.width + 300, y: [10, -30, 10] }}
        transition={{ x: { duration: 20, repeat: Infinity, ease: "linear", delay: 12 }, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
      >
        <FlyingBird size={64} />
      </motion.div>

      <motion.div
        className="absolute top-[40%] left-[-100px] opacity-25 text-[#5C4033]"
        animate={{ x: dimensions.width + 300, y: [-15, 15, -15] }}
        transition={{ x: { duration: 28, repeat: Infinity, ease: "linear", delay: 8 }, y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } }}
      >
        <FlyingBird size={42} />
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="z-10 text-center px-6"
      >
        <h2 className="text-6xl md:text-8xl text-[#B76E79] font-[family-name:var(--font-dancing-script)] mb-8 drop-shadow-md">
          Hi Koranguu! ❤️
        </h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="text-3xl md:text-4xl text-[#5C4033] font-[family-name:var(--font-great-vibes)] max-w-3xl mx-auto leading-relaxed drop-shadow-sm"
        >
          "I didn't plan on falling in love with you, and I doubt if you planned on falling in love with me. But once we met, it was clear that neither of us could control what was happening to us."
        </motion.p>
      </motion.div>
    </section>
  );
}
