"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const photos = [
  { id: 0, src: "/assets/p11.jpeg", desc: "A beautiful day we will never forget 🌟" },
  { id: 1, src: "/assets/p17.jpeg", desc: "Side by side, always — that's all I need 💛" },
  { id: 2, src: "/assets/p2.jpeg",  desc: "You make every ordinary moment extraordinary 🌸" },
  { id: 3, src: "/assets/p6.jpeg",  desc: "Delhi streets, Delhi memories, Delhi love 🏙️" },
  { id: 4, src: "/assets/delhi.jpeg", desc: "Bharat Mandapam — where magic happened 💫" },
  { id: 5, src: "/assets/p9.jpeg",  desc: "Every laugh shared with you is a treasure 😊" },
];

const CARD_WIDTH = 220;
const CARD_HEIGHT = 280;
const GAP = 120;

export default function Section3HangingPhotos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const domRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Composites = Matter.Composites,
      Common = Matter.Common,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Composite = Matter.Composite,
      Bodies = Matter.Bodies,
      Constraint = Matter.Constraint;

    const engine = Engine.create();
    engineRef.current = engine;
    
    // Low gravity for a dreamy floaty feel
    engine.world.gravity.y = 0.5;

    // Use window dimensions to avoid initial clientWidth being 0
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const height = typeof window !== 'undefined' ? window.innerHeight : 800;

    const render = Render.create({
      element: containerRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
        hasBounds: true
      }
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Create the "ceiling" rod that photos hang from
    const ceiling = Bodies.rectangle(width / 2, -50, width * 2, 100, { isStatic: true });
    Composite.add(engine.world, ceiling);
    
    bodiesRef.current = [];

    // Create hanging photos
    photos.forEach((photo, i) => {
      // Calculate position so they spread across the width
      const xOffset = (width / 2) - ((photos.length * (CARD_WIDTH + GAP)) / 2) + (i * (CARD_WIDTH + GAP)) + (Math.random() * 20 - 10) + CARD_WIDTH/2;
      
      const photoBody = Bodies.rectangle(xOffset, 150 + (i % 2 === 0 ? 0 : 80) + Math.random() * 40, CARD_WIDTH, CARD_HEIGHT, {
        restitution: 0.5,
        frictionAir: 0.05,
        render: {
          visible: false // hide canvas rendering of the body, we use DOM overlay
        },
        plugin: { id: photo.id }
      });
      
      bodiesRef.current.push(photoBody);

      // Create ropes (constraints)
      const rope1 = Constraint.create({
        bodyA: ceiling,
        pointA: { x: xOffset - 40 - width/2, y: 50 },
        bodyB: photoBody,
        pointB: { x: -40, y: -CARD_HEIGHT/2 },
        stiffness: 0.01,
        damping: 0.05,
        render: { strokeStyle: '#FFB6C1', lineWidth: 1 }
      });

      const rope2 = Constraint.create({
        bodyA: ceiling,
        pointA: { x: xOffset + 40 - width/2, y: 50 },
        bodyB: photoBody,
        pointB: { x: 40, y: -CARD_HEIGHT/2 },
        stiffness: 0.01,
        damping: 0.05,
        render: { strokeStyle: '#FFB6C1', lineWidth: 1 }
      });

      Composite.add(engine.world, [photoBody, rope1, rope2]);
    });

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Handle clicks to expand photo
    Matter.Events.on(mouseConstraint, "mousedown", (event) => {
      const body = mouseConstraint.body;
      if (body) {
        const index = bodiesRef.current.indexOf(body);
        if (index !== -1) {
          setTimeout(() => {
            if (mouseConstraint.mouse.button === -1) {
              setSelectedPhoto(photos[index]);
            }
          }, 150);
        }
      }
    });

    // Sync DOM elements to Matter.js bodies
    let animationFrame: number;
    const updateDOM = () => {
      bodiesRef.current.forEach((body, i) => {
        const dom = domRefs.current[i];
        if (dom && body) {
          dom.style.transform = `translate(${body.position.x - CARD_WIDTH/2}px, ${body.position.y - CARD_HEIGHT/2}px) rotate(${body.angle}rad)`;
        }
      });
      animationFrame = requestAnimationFrame(updateDOM);
    };
    updateDOM();

    // Fit canvas to window on resize
    const handleResize = () => {
      render.canvas.width = containerRef.current?.clientWidth || width;
      render.canvas.height = containerRef.current?.clientHeight || height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null as any;
      render.context = null as any;
      render.textures = {};
    };
  }, []);

  return (
    <section className="relative w-full h-screen bg-[#FFFDF0] overflow-hidden flex flex-col items-center justify-center pt-20">
      
      <div className="absolute top-10 w-full text-center z-10 pointer-events-none">
        <h2 className="text-4xl text-[#5C4033] font-[family-name:var(--font-great-vibes)]">
          Hanging Memories
        </h2>
        <p className="text-[#B76E79] font-[family-name:var(--font-quicksand)] mt-2">
          (Drag the photos to play with them)
        </p>
      </div>

      {/* Physics Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing w-full overflow-hidden" />

      {/* DOM overlay for photos */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {photos.map((photo, i) => (
          <div
            key={photo.id}
            ref={el => { domRefs.current[i] = el; }}
            className="absolute top-0 left-0 bg-white rounded-lg shadow-[0_15px_30px_rgba(0,0,0,0.3)] border-[8px] border-white overflow-hidden pointer-events-none origin-center"
            style={{ width: CARD_WIDTH, height: CARD_HEIGHT, willChange: 'transform' }}
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${photo.src})` }}
            />
          </div>
        ))}
      </div>

      {/* Fullscreen Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              className="bg-white p-6 rounded-3xl shadow-2xl max-w-2xl w-full relative"
            >
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-[#5C4033]" />
              </button>
              
              <div className="w-full h-96 bg-gray-200 rounded-xl mb-6 overflow-hidden">
                <div 
                  className="w-full h-full bg-contain bg-no-repeat bg-center" 
                  style={{ backgroundImage: `url(${selectedPhoto.src})` }}
                />
              </div>
              
              <h3 className="text-3xl text-[#B76E79] font-[family-name:var(--font-dancing-script)] mb-2">
                A Beautiful Day
              </h3>
              <p className="text-[#5C4033] font-[family-name:var(--font-quicksand)] leading-relaxed">
                {selectedPhoto.desc} Every second spent with you feels like a lifetime of happiness packed into a fleeting moment.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
