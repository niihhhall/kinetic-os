
import React, { useState, useRef, useEffect } from 'react';
// Shadow motion to bypass environment-specific type errors with framer-motion props
import { motion as motionBase } from 'framer-motion';
const motion = motionBase as any;
import { Play, Star, Zap, Clock, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

const TIMELINE_SEGMENTS = [
  { time: "0:00", label: "The 9 AM Chaos" },
  { time: "0:08", label: "Dashboard Overview" },
  { time: "0:15", label: "Business HQ" },
  { time: "0:30", label: "CRM & Retrieval" },
  { time: "0:45", label: "Finance HQ" },
  { time: "1:00", label: "Productivity Mode" },
  { time: "1:15", label: "Marketing Attribution" },
];

export const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="pt-24 md:pt-32 pb-16 md:pb-24 relative bg-brand-bg overflow-hidden video-section px-6 md:px-12 lg:px-24"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Gradient Transition to Next Section (White) */}
      <div className="absolute bottom-0 left-0 w-full h-24 md:h-48 bg-gradient-to-b from-brand-bg/0 via-white/80 to-white pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Mobile Tour Header */}
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="md:hidden flex flex-col items-center mb-12"
        >
            <div className="flex items-center gap-3 text-gray-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-3">
                <span className="text-gray-300">↓</span> WATCH 60-SECOND TOUR
            </div>
            <div className="w-16 h-0.5 bg-gray-100 rounded-full" />
        </motion.div>

        {/* Trust Badges */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
        >
            <div className="flex items-center gap-3 bg-white/80 px-6 py-3 rounded-full border border-brand-orange/10 shadow-sm backdrop-blur-sm">
                <div className="flex text-[#ff751f]"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
                <span className="text-brand-text font-medium text-sm">Used by 100+ freelancers</span>
            </div>
            <div className="flex items-center gap-3 bg-white/80 px-6 py-3 rounded-full border border-brand-orange/10 shadow-sm backdrop-blur-sm">
                <Zap className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-brand-text font-medium text-sm">Setup in 30-60 min</span>
            </div>
        </motion.div>

        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="text-4xl md:text-6xl font-medium mb-6 text-brand-text leading-tight"
          >
            See Your Business In <span className="text-[#ff751f]">3 Seconds</span> <br className="hidden md:block" />
            <span className="text-gray-400 text-3xl md:text-5xl">(Not 3 Hours)</span>
          </motion.h2>
        </div>

        {/* Video Container - HEAVY SPRING */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 80, damping: 20, mass: 1.2 }}
          className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-black/5 bg-gray-100 group mb-12 md:mb-16 max-w-[1000px] mx-auto"
        >
          {!isPlaying ? (
            <button 
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-50 cursor-pointer group focus:outline-none focus:ring-4 focus:ring-brand-orange/50"
              onClick={() => setIsPlaying(true)}
              aria-label="Play product tour video"
            >
              <img 
                src="https://placehold.co/1000x562/ff751f/fffff5?text=KineticOS+Product+Tour" 
                alt="KineticOS Dashboard Preview" 
                className="absolute inset-0 w-full h-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-60"
              />
              <div className="relative">
                {/* Ripple Effect */}
                <span className="absolute inset-0 rounded-full bg-[#ff751f] opacity-40 animate-ping" />
                <div className="relative z-10 w-24 h-24 bg-[#ff751f] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,117,31,0.5)] transition-transform duration-300 group-hover:scale-110 group-focus:scale-110">
                  <Play className="w-10 h-10 text-white fill-current ml-1.5" />
                </div>
              </div>
            </button>
          ) : (
            <iframe 
              src="https://player.vimeo.com/video/808643807?autoplay=1" 
              className="absolute inset-0 w-full h-full" 
              allow="autoplay; fullscreen" 
              title="KineticOS Walkthrough"
            ></iframe>
          )}
        </motion.div>

        {/* MOBILE: Vertical Timeline Layout */}
        <div className="md:hidden relative mb-16 px-4">
            {/* 
              Alignment Math:
              Parent padding: px-4 (16px).
              Icon container width: 40px (w-10).
              Icon center: 16px + 20px = 36px.
              Line position: left-[35px] (2px width, centered at 36px) -> 35px.
            */}
            <div className="absolute left-[35px] top-4 bottom-8 w-0.5 bg-gradient-to-b from-gray-200 via-gray-200 to-transparent" />
            <div className="space-y-6">
                {TIMELINE_SEGMENTS.map((segment, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex gap-5 items-center group cursor-pointer relative z-10"
                    >
                        {/* Time Dot */}
                        <div className="relative z-10 flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:border-[#ff751f] group-hover:text-[#ff751f] transition-all duration-300">
                                <Clock className="w-4 h-4 text-gray-400 group-hover:text-[#ff751f]" />
                            </div>
                        </div>
                        
                        {/* Content Card */}
                        <div className="flex-1 p-4 rounded-2xl bg-white border border-black/5 shadow-sm group-hover:shadow-md group-hover:border-[#ff751f]/30 transition-all duration-300 active:scale-[0.98]">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-gray-800 text-sm group-hover:text-[#ff751f] transition-colors">{segment.label}</span>
                                <span className="text-[10px] font-mono text-gray-400 font-bold bg-gray-50 px-2 py-1 rounded-md">{segment.time}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* DESKTOP: Horizontal Timeline Layout */}
        <div className="hidden md:block relative mb-16 md:mb-20">
          <div className="overflow-x-auto pb-6 scrollbar-hide video-section__timeline relative z-10">
            <div className="flex justify-between items-start min-w-[800px] border-t-2 border-gray-200 pt-8 relative mx-4">
              {TIMELINE_SEGMENTS.map((segment, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 + idx * 0.1 }}
                  className="relative group cursor-pointer flex-1 px-2 text-center"
                >
                  <div className="absolute -top-[9px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-300 group-hover:bg-[#ff751f] transition-colors border-4 border-brand-bg" />
                  <div className="flex flex-col items-center pt-4">
                    <span className="text-[11px] text-gray-400 font-mono mb-2 bg-gray-100 px-2 py-0.5 rounded-full">{segment.time}</span>
                    <span className="text-sm text-gray-700 font-medium group-hover:text-[#ff751f] transition-colors leading-tight">{segment.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Gradient Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-bg to-transparent pointer-events-none z-20" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-bg to-transparent pointer-events-none z-20" />
        </div>

        {/* CTA */}
        <div className="flex justify-center relative z-10">
           <Button className="w-full md:w-auto text-xl px-16 py-6" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
             Join the Waitlist
           </Button>
        </div>
      </div>
    </section>
  );
};
