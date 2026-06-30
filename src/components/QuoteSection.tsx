"use client";

import { motion } from "framer-motion";

export default function QuoteSection({ text, icon }: { text: string, icon?: string }) {
  return (
    <section className="w-full min-h-[70vh] bg-[#FFF9EB] flex flex-col items-center justify-center py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        className="max-w-5xl text-center flex flex-col items-center"
      >
        <p className="text-4xl md:text-6xl text-[#B76E79] font-[family-name:var(--font-dancing-script)] leading-relaxed md:leading-relaxed">
          "{text}"
        </p>
        {icon && (
          <span className="text-3xl mt-12 tracking-[0.5em] opacity-80">{icon}</span>
        )}
      </motion.div>
    </section>
  );
}
