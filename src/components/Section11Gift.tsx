"use client";

import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Environment, Float } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import * as THREE from "three";

function GiftBox({ isOpen, onOpen }: { isOpen: boolean, onOpen: () => void }) {
  const lidRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (lidRef.current) {
      const targetY = isOpen ? 4 : 0.2;
      const targetX = isOpen ? 2 : 0;
      const targetRotX = isOpen ? -0.5 : 0;
      const targetRotZ = isOpen ? 0.5 : 0;
      
      lidRef.current.position.y = THREE.MathUtils.lerp(lidRef.current.position.y, targetY, 0.05);
      lidRef.current.position.x = THREE.MathUtils.lerp(lidRef.current.position.x, targetX, 0.05);
      lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, targetRotX, 0.05);
      lidRef.current.rotation.z = THREE.MathUtils.lerp(lidRef.current.rotation.z, targetRotZ, 0.05);
    }
  });

  return (
    <group onClick={onOpen}>
      {/* Box Base */}
      <mesh position={[0, -1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 2, 3]} />
        <meshStandardMaterial color="#FFB6C1" roughness={0.2} metalness={0.1} />
      </mesh>
      
      {/* Box Lid */}
      <group ref={lidRef} position={[0, 0.2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.5, 3.2]} />
          <meshStandardMaterial color="#FFDAB9" roughness={0.2} metalness={0.1} />
        </mesh>
        
        {/* Ribbon bow */}
        <mesh position={[0, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.5, 0.1, 16, 100]} />
          <meshStandardMaterial color="#B76E79" roughness={0.1} metalness={0.5} />
        </mesh>
      </group>

      {/* Sparkles when opened */}
      {isOpen && <Sparkles count={200} scale={5} size={6} speed={0.5} color="#FFFACD" />}
    </group>
  );
}

export default function Section11Gift() {
  const [isOpen, setIsOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Delay showing video so sparkles can play first
    setTimeout(() => setShowVideo(true), 1200);
  };

  return (
    <section className="relative w-full h-screen bg-[#FFF9EB] flex flex-col items-center justify-center overflow-hidden">
      
      <div className="absolute top-20 w-full text-center z-10 pointer-events-none">
        <h2 className="text-5xl text-[#5C4033] font-[family-name:var(--font-great-vibes)] drop-shadow-sm mb-2">
          A Special Gift
        </h2>
        <p className="text-[#B76E79] font-[family-name:var(--font-quicksand)]">
          {isOpen ? "A message just for you 💝" : "Click the box to untie the ribbon."}
        </p>
      </div>

      <div className="w-full h-full cursor-pointer">
        <Canvas shadows camera={{ position: [0, 4, 8], fov: 45 }}>
          <ambientLight intensity={1} />
          <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
          <Environment preset="sunset" />
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <GiftBox isOpen={isOpen} onOpen={handleOpen} />
          </Float>
        </Canvas>
      </div>

      {/* Fullscreen centered video modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 60 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(255,182,193,0.6)] border-4 border-white/80"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-3xl shadow-[0_0_60px_rgba(183,110,121,0.8)] pointer-events-none z-10" />

              <video
                src="/assets/gift-video.mp4"
                autoPlay
                controls
                playsInline
                className="w-full h-auto max-h-[80vh] object-contain bg-black"
              />

              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
