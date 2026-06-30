"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Music } from "lucide-react";
import { siteConfig } from "@/config/data";

const playlist = siteConfig.playlist;

export default function Section9Music() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Playback failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextSong = () => {
    setCurrentSong((prev) => (prev === playlist.length - 1 ? 0 : prev + 1));
    setIsPlaying(true);
  };

  const prevSong = () => {
    setCurrentSong((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  const handleEnded = () => {
    nextSong();
  };

  return (
    <section className="relative w-full min-h-screen bg-[#FFFDF0] flex flex-col lg:flex-row items-center justify-center gap-16 py-32 px-8 overflow-hidden">
      <audio 
        ref={audioRef} 
        src={playlist[currentSong].src} 
        onEnded={handleEnded} 
      />

      {/* Vinyl Player UI */}
      <div className="relative w-80 h-80 md:w-96 md:h-96 bg-[#DCDCB4] rounded-xl shadow-2xl p-4 border-[8px] border-[#C8C8A0] flex items-center justify-center">

        {/* The Vinyl Record */}
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-full h-full rounded-full bg-[#1A1A1A] shadow-inner flex items-center justify-center relative overflow-hidden"
          style={{
            background: "radial-gradient(circle, #2a2a2a 0%, #111 40%, #000 100%)",
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.8), 0 10px 20px rgba(0,0,0,0.5)",
          }}
        >
          {/* Record Grooves */}
          <div className="absolute inset-4 rounded-full border border-white/5" />
          <div className="absolute inset-8 rounded-full border border-white/10" />
          <div className="absolute inset-12 rounded-full border border-white/5" />
          <div className="absolute inset-20 rounded-full border border-white/10" />

          {/* Center Label */}
          <div className="w-24 h-24 rounded-full bg-[#FFB6C1] flex items-center justify-center relative shadow-md overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=100')] bg-cover opacity-50 mix-blend-multiply" />
            <div className="w-4 h-4 bg-[#DCDCB4] rounded-full border border-black/20 z-10 shadow-inner" />
          </div>
        </motion.div>

        {/* The Tonearm (Needle) */}
        <motion.div
          className="absolute top-8 right-8 w-6 h-40 origin-top"
          animate={{ rotate: isPlaying ? 35 : 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          {/* Base */}
          <div className="w-8 h-8 bg-gray-300 rounded-full absolute -top-4 -left-1 shadow-md border-2 border-gray-400" />
          {/* Arm */}
          <div className="w-2 h-32 bg-gray-200 absolute top-2 left-2 rounded-full shadow-sm" />
          {/* Head */}
          <div className="w-4 h-6 bg-gray-400 absolute bottom-0 left-1 rounded-sm shadow-md rotate-12" />
        </motion.div>
      </div>

      {/* Playlist and Controls */}
      <div className="flex flex-col items-center lg:items-start max-w-sm w-full">
        <h2 className="text-5xl text-[#B76E79] font-[family-name:var(--font-great-vibes)] mb-2">
          Our Soundtrack
        </h2>
        <p className="text-[#5C4033] font-[family-name:var(--font-quicksand)] mb-8 text-center lg:text-left">
          Songs that remind me of you.
        </p>

        {/* Controls */}
        <div className="flex items-center gap-6 mb-12">
          <button onClick={prevSong} className="p-4 rounded-full glass hover:bg-white/50 transition-colors text-[#5C4033]">
            <SkipBack className="w-6 h-6 fill-current" />
          </button>

          <button onClick={togglePlay} className="p-6 rounded-full bg-[#B76E79] hover:bg-[#8B0000] text-white shadow-[0_0_20px_rgba(183,110,121,0.5)] transition-all hover:scale-105">
            {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current translate-x-1" />}
          </button>

          <button onClick={nextSong} className="p-4 rounded-full glass hover:bg-white/50 transition-colors text-[#5C4033]">
            <SkipForward className="w-6 h-6 fill-current" />
          </button>
        </div>

        {/* Playlist */}
        <div className="w-full flex flex-col gap-3">
          {playlist.map((song, idx) => (
            <div
              key={song.id}
              className={`w-full p-4 rounded-xl flex items-center gap-4 transition-colors ${idx === currentSong ? 'bg-white/60 shadow-md border border-white' : 'glass opacity-60'}`}
            >
              <Music className={`w-5 h-5 ${idx === currentSong ? 'text-[#B76E79]' : 'text-[#5C4033]/50'}`} />
              <div>
                <p className={`font-[family-name:var(--font-poppins)] font-medium ${idx === currentSong ? 'text-[#5C4033]' : 'text-[#5C4033]/70'}`}>{song.title}</p>
                <p className="text-sm font-[family-name:var(--font-quicksand)] text-[#5C4033]/50">{song.artist}</p>
              </div>
              {idx === currentSong && isPlaying && (
                <div className="ml-auto flex gap-1 h-4 items-end">
                  {[1, 2, 3].map(i => (
                    <motion.div
                      key={i}
                      className="w-1 bg-[#B76E79] rounded-t-sm"
                      animate={{ height: ["20%", "100%", "20%"] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
