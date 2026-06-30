"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

const messages = [
  "Collecting memories...",
  "Finding beautiful moments...",
  "Wrapping love...",
  "Preparing surprises...",
  "Almost there...",
];

export default function LoadingScreen({ onLoaded }: { onLoaded: () => void }) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simulate loading
    const totalDuration = 6000; // 6 seconds minimum loading
    const intervalTime = 50;
    const steps = totalDuration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setProgress(currentProgress);
      
      // Update message based on progress
      if (currentProgress < 20) setMessageIndex(0);
      else if (currentProgress < 40) setMessageIndex(1);
      else if (currentProgress < 60) setMessageIndex(2);
      else if (currentProgress < 80) setMessageIndex(3);
      else setMessageIndex(4);

      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onLoaded, 1000); // Give time for fade out
        }, 500);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#FFFDF0] to-[#FFF9EB]"
        >
          {/* Background particles placeholder */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {mounted && [...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-[#FFDAB9]/40 glow-soft"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                  opacity: Math.random() * 0.5 + 0.3,
                }}
                animate={{
                  y: [null, Math.random() * -100 - 50],
                  x: [null, Math.random() * 50 - 25],
                  opacity: [null, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                filter: ["drop-shadow(0 0 10px rgba(255,182,193,0.5))", "drop-shadow(0 0 25px rgba(255,182,193,0.8))", "drop-shadow(0 0 10px rgba(255,182,193,0.5))"]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-16 h-16 text-[#FFB6C1] fill-[#FFB6C1]" />
            </motion.div>

            <motion.div className="mt-8 text-center" layout>
              <motion.p
                key={messageIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-[#5C4033] font-[family-name:var(--font-quicksand)] text-lg mb-2"
              >
                {messages[messageIndex]}
              </motion.p>
              
              <div className="w-48 h-1 bg-black/5 rounded-full overflow-hidden mt-4">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#FFDAB9] to-[#FFB6C1]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
              <p className="text-sm mt-2 text-[#5C4033]/60 font-[family-name:var(--font-quicksand)]">{progress}%</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
