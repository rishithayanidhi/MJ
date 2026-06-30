"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Cloud, Sky, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function CloudScene({ zoomIn }: { zoomIn: boolean }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame((state, delta) => {
    if (zoomIn) {
      // Cinematic zoom forward
      state.camera.position.z -= delta * 15;
      // Slight tilt
      state.camera.rotation.x = THREE.MathUtils.lerp(state.camera.rotation.x, 0.2, 0.05);
    } else {
      // Gentle floating camera
      state.camera.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <>
      <Sky sunPosition={[100, 20, 100]} turbidity={0.1} rayleigh={0.5} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#FFF9EB" />
      
      {/* Background clouds */}
      <Cloud position={[-10, 5, -20]} speed={0.2} opacity={0.6} segments={20} color="#FFFDF0" />
      <Cloud position={[10, 8, -15]} speed={0.2} opacity={0.6} segments={20} color="#FFDAB9" />
      <Cloud position={[0, -5, -10]} speed={0.2} opacity={0.5} segments={20} color="#FFF9EB" />
      
      {/* Golden particles */}
      <Sparkles count={500} scale={30} size={2} speed={0.4} color="#FFFACD" />
    </>
  );
}

export default function Section1Sky({ onEnter }: { onEnter: () => void }) {
  const [clicked, setClicked] = useState(false);

  const handleOpen = () => {
    setClicked(true);
    // Play transition sound (placeholder for now)
    // Wait for zoom animation, then trigger next section
    setTimeout(() => {
      onEnter();
    }, 2500);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#FFF9EB]">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <CloudScene zoomIn={clicked} />
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className={`relative z-10 flex flex-col items-center justify-center h-full transition-opacity duration-1000 ${clicked ? 'opacity-0' : 'opacity-100'}`}>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          className="text-6xl md:text-8xl text-center text-[#5C4033] font-[family-name:var(--font-great-vibes)] mb-4 drop-shadow-[0_0_15px_rgba(255,253,240,0.8)]"
        >
          Happy 20th Birthday
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2, ease: "easeOut" }}
          className="text-4xl md:text-5xl text-center text-[#B76E79] font-[family-name:var(--font-dancing-script)] mb-12 drop-shadow-md"
        >
          My Love ❤️
        </motion.h2>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 3, ease: "backOut" }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 182, 193, 0.8)" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpen}
          className="px-8 py-4 bg-white/30 backdrop-blur-md border border-white/50 rounded-full text-[#5C4033] font-[family-name:var(--font-poppins)] text-lg uppercase tracking-widest glass-card glow-soft flex items-center gap-2 group transition-all"
        >
          Open My Heart
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ✨
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}
