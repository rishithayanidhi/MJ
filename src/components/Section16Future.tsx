"use client";

import { motion } from "framer-motion";
import { Lock, Unlock, KeyRound } from "lucide-react";
import { useState } from "react";

const milestones = [
  { age: 25, hint: "A quarter century...", message: "At 25, I hope we are traveling the world, exploring every corner hand in hand. Never lose that beautiful spark." },
  { age: 30, hint: "The big three-oh...", message: "At 30, maybe we have built a tiny sanctuary of our own. A home filled with dogs, warmth, and endless laughter." },
  { age: 40, hint: "Still young at heart...", message: "At 40, I hope we still look at each other exactly the same way we do today. Love only grows deeper." },
  { age: 50, hint: "Half a century...", message: "At 50, let's promise to still hold hands when we walk in the park. True love is timeless." },
];

export default function Section16Future() {
  const [unlocked, setUnlocked] = useState<number[]>([]);

  const handleUnlock = (age: number) => {
    if (!unlocked.includes(age)) {
      setUnlocked(prev => [...prev, age]);
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-[#FFF9EB] to-[#FFFDF0] flex flex-col items-center justify-center py-32 overflow-hidden">
      
      <div className="text-center mb-16 z-10 max-w-2xl px-4">
        <h2 className="text-5xl text-[#B76E79] font-[family-name:var(--font-great-vibes)] mb-4">
          Time Capsule
        </h2>
        <p className="text-[#5C4033] font-[family-name:var(--font-quicksand)] text-lg">
          Letters I've written to your future self. 
          <br/>(Don't cheat, you're only allowed to unlock them when you reach that age!)
        </p>
      </div>

      <div className="w-full max-w-5xl px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {milestones.map((m) => {
          const isUnlocked = unlocked.includes(m.age);
          return (
            <motion.div
              key={m.age}
              whileHover={{ y: -5 }}
              className="relative w-full bg-white rounded-3xl p-8 shadow-xl border border-[#E6E6FA] flex flex-col items-center text-center overflow-hidden"
            >
              {/* Decorative top pattern */}
              <div className="absolute top-0 left-0 w-full h-2 bg-[#B76E79]/20" />
              
              <h3 className="text-4xl font-[family-name:var(--font-poppins)] text-[#5C4033] font-bold mt-4 mb-2">
                Age {m.age}
              </h3>
              
              {!isUnlocked ? (
                <>
                  <p className="text-[#5C4033]/60 font-[family-name:var(--font-dancing-script)] text-xl mb-8 flex-1">
                    {m.hint}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleUnlock(m.age)}
                    className="w-16 h-16 rounded-full bg-[#E6E6FA] flex items-center justify-center text-[#5C4033] shadow-md hover:bg-[#D8D8F6] transition-colors group"
                  >
                    <Lock className="w-6 h-6 group-hover:hidden" />
                    <KeyRound className="w-6 h-6 hidden group-hover:block" />
                  </motion.button>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center"
                >
                  <Unlock className="w-8 h-8 text-[#FFB6C1] mb-4" />
                  <p className="text-[#5C4033] font-[family-name:var(--font-quicksand)] text-sm leading-relaxed italic">
                    "{m.message}"
                  </p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
