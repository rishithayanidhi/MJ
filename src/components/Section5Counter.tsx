"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { siteConfig } from "@/config/data";

export default function Section5Counter() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Set to love anniversary
    const startDate = new Date(siteConfig.anniversaryDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = now - startDate;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-[#FFF9EB] to-[#FFDAB9]/30 flex flex-col items-center justify-center overflow-hidden py-32">
      
      {/* Floating Background Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {mounted && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#FFB6C1]/40"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0
            }}
            animate={{
              y: -100,
              opacity: [0, 1, 0],
              x: `+=${Math.random() * 100 - 50}`,
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          >
            <Heart className="w-12 h-12 fill-current" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl text-[#5C4033] font-[family-name:var(--font-quicksand)] mb-4 uppercase tracking-widest font-light">
          From Best Friends to Lovers...
        </h2>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 my-16">
          <CounterBlock value={timeLeft.days} label="Days" />
          <CounterBlock value={timeLeft.hours} label="Hours" />
          <CounterBlock value={timeLeft.minutes} label="Minutes" />
          <CounterBlock value={timeLeft.seconds} label="Seconds" />
        </div>

        <p className="text-2xl text-[#B76E79] font-[family-name:var(--font-dancing-script)] mt-8">
          And I've loved you for every single one of them.
        </p>
      </div>

    </section>
  );
}

function CounterBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-32 md:w-32 md:h-40 glass-card rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden group hover:scale-105 transition-transform">
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
        <span className="text-5xl md:text-7xl font-[family-name:var(--font-poppins)] text-[#5C4033] font-medium z-10 tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-4 text-[#5C4033] font-[family-name:var(--font-quicksand)] uppercase tracking-widest text-sm font-semibold">
        {label}
      </span>
    </div>
  );
}
