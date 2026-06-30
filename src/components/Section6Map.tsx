"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, Heart, Plane } from "lucide-react";
import { siteConfig } from "@/config/data";

const pins = siteConfig.mapPins;

export default function Section6Map() {
  const [selectedPin, setSelectedPin] = useState<typeof pins[0] | null>(null);

  return (
    <section className="relative w-full min-h-screen bg-[#FFFDF0] flex flex-col items-center justify-center overflow-hidden py-20">
      
      <h2 className="text-5xl text-[#5C4033] font-[family-name:var(--font-great-vibes)] drop-shadow-sm mb-8 z-10">
        Map of Our Love
      </h2>

      <div className="relative w-[90vw] max-w-[500px] mx-auto">
        
        {/* The real India SVG map with states */}
        <img 
          src="/assets/india-map.svg" 
          alt="Map of India" 
          className="w-full h-auto opacity-30"
          style={{ filter: 'sepia(0.4) hue-rotate(-10deg) saturate(0.6)' }}
        />
        
        {/* Pins overlaid on the map */}
        {pins.map((pin) => (
          <div
            key={pin.id}
            className="absolute group z-20"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            <motion.button
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedPin(pin)}
              className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
            >
              {/* Pulse effect */}
              <motion.div
                animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className="absolute w-6 h-6 bg-[#B76E79] rounded-full"
              />
              <MapPin className="w-7 h-7 text-[#B76E79] fill-[#B76E79]/30 relative z-10 drop-shadow-md" />
            </motion.button>
            
            {/* Label Tooltip */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full whitespace-nowrap text-[#5C4033] font-[family-name:var(--font-quicksand)] text-xs shadow-md pointer-events-none border border-[#B76E79]/20">
              {pin.label}
            </div>
          </div>
        ))}

        {/* Dashed line connecting Chennai -> Agra -> Delhi */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path 
            d="M40,83 L33,33 L31,29.5" 
            fill="none" 
            stroke="#B76E79" 
            strokeWidth="0.4" 
            strokeDasharray="1.5,1.5" 
            opacity="0.7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        {/* Animated Airplane */}
        <motion.div
          animate={{
            left: ["40%", "33%", "31%"],
            top: ["83%", "33%", "29.5%"],
            opacity: [0, 1, 1, 0] // fade in at start, fade out at end
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.8, 1, 1] // timing aligns with distance
          }}
          className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{
            // The Lucide Plane icon points top-right (45deg). 
            // Chennai to Delhi is North-North-West, so we rotate roughly -60deg to point the plane correctly.
            transform: "translate(-50%, -50%) rotate(-60deg)"
          }}
        >
          <Plane className="w-6 h-6 text-[#B76E79] fill-[#B76E79] drop-shadow-md" />
        </motion.div>
      </div>

      {/* Pin Detail Modal */}
      <AnimatePresence>
        {selectedPin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4"
            onClick={() => setSelectedPin(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#FFF9EB] p-3 rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden border border-[#DCDCB4]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedPin(null)}
                className="absolute top-4 right-4 z-30 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-full h-72 bg-gray-200 rounded-xl mb-4 relative overflow-hidden flex items-center justify-center">
                {/* Blurred backdrop to fill empty space */}
                <div 
                  className="absolute inset-0 bg-cover bg-center blur-xl scale-110 opacity-60" 
                  style={{ backgroundImage: `url(${selectedPin.img})` }}
                />
                {/* Actual image, fully fitted */}
                <img 
                  src={selectedPin.img} 
                  alt={selectedPin.label}
                  className="relative z-10 max-h-full max-w-full rounded-lg shadow-lg object-contain"
                />
              </div>
              
              <div className="px-4 pb-6 text-center">
                <div className="flex justify-center mb-3">
                  <Heart className="w-6 h-6 text-[#B76E79] fill-[#B76E79]" />
                </div>
                <h3 className="text-3xl text-[#5C4033] font-[family-name:var(--font-dancing-script)] mb-3">
                  {selectedPin.label}
                </h3>
                <p className="text-base text-[#5C4033]/80 font-[family-name:var(--font-quicksand)] leading-relaxed">
                  {selectedPin.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
