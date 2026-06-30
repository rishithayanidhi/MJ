"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const memories = [
  { id: 1, date: "May 15, 2022", location: "The Cozy Cafe", story: "Our first coffee together. I was so nervous, but your smile made everything fade away. We talked for hours until they closed." },
  { id: 2, date: "July 4, 2022", location: "Downtown Park", story: "Watching the fireworks. When you grabbed my hand during the finale, my heart beat faster than the explosions." },
  { id: 3, date: "October 12, 2022", location: "Mountain Cabin", story: "Our first trip together. The autumn leaves were beautiful, but I couldn't stop looking at you." },
  { id: 4, date: "December 25, 2022", location: "Our First Home", story: "Our first Christmas together. The best gift was simply waking up next to you." },
];

export default function Section2Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !timelineRef.current) return;

    // Line drawing animation
    gsap.fromTo(
      timelineRef.current,
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      }
    );

    // Cards revealing animation
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      const isLeft = index % 2 === 0;
      
      gsap.fromTo(
        card,
        { 
          opacity: 0, 
          x: isLeft ? -100 : 100,
          y: 50,
          rotation: isLeft ? -5 : 5 
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%", // trigger when card top hits 80% of viewport
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-[#FFF9EB] py-32 overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#FFDAB9]/30 blur-2xl"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2 className="text-6xl text-center text-[#B76E79] font-[family-name:var(--font-great-vibes)] mb-24 drop-shadow-sm">
          Our Magical Story
        </h2>

        <div className="relative w-full flex flex-col items-center">
          {/* The Timeline Line */}
          <div className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#FFB6C1]/20 via-[#FFDAB9]/50 to-[#FFB6C1]/20 rounded-full">
            <div ref={timelineRef} className="w-full bg-gradient-to-b from-[#B76E79] to-[#FFB6C1] rounded-full shadow-[0_0_10px_rgba(255,182,193,0.8)]" />
          </div>

          {memories.map((memory, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={memory.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={`w-full flex ${isLeft ? "justify-start" : "justify-end"} mb-32 relative`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-4 border-[#FFB6C1] shadow-[0_0_15px_rgba(255,182,193,0.6)] flex items-center justify-center z-20">
                  <motion.div 
                    animate={{ scale: [1, 1.3, 1] }} 
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Heart className="w-4 h-4 text-[#B76E79] fill-[#B76E79]" />
                  </motion.div>
                </div>

                {/* Content Card */}
                <div className={`w-[85%] md:w-[45%] ${isLeft ? "pr-8 md:pr-16" : "pl-8 md:pl-16"}`}>
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="glass-card p-6 md:p-8 rounded-3xl relative group overflow-hidden"
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Placeholder for Photo - will replace with real image later */}
                    <div className="w-full h-48 md:h-64 bg-[#F5F5DC] rounded-2xl mb-6 overflow-hidden relative shadow-inner">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-multiply group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-4 text-[#B76E79] font-[family-name:var(--font-poppins)] text-sm font-medium">
                        <span className="flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full"><Calendar className="w-4 h-4" /> {memory.date}</span>
                        <span className="flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full"><MapPin className="w-4 h-4" /> {memory.location}</span>
                      </div>
                      
                      <p className="text-[#5C4033] font-[family-name:var(--font-quicksand)] text-lg leading-relaxed">
                        {memory.story}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
