
import React, { useState, useEffect, useRef } from 'react';
// Shadow motion to bypass environment-specific type errors with framer-motion props
import { motion as motionBase, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
const motion = motionBase as any;
import { Monitor, Globe, Share2, Star, MoreHorizontal, ExternalLink, Lock, MousePointer2, ShieldCheck, Play, Check, Zap, X } from 'lucide-react';
import { Button } from './ui/Button';
import { CountdownTimer } from './CountdownTimer';
import { WaitlistModal } from './WaitlistModal';

interface HeroProps {
  onReady?: () => void;
}

const AsteriskLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <motion.svg
    viewBox="0 0 100 100"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    animate={{ rotate: [0, 360, 360, 0, 0] }}
    transition={{
      duration: 5,
      repeat: Infinity,
      times: [0, 0.1, 0.5, 0.6, 1],
      ease: "easeInOut"
    }}
  >
    <rect x="41" y="10" width="18" height="80" rx="4" />
    <rect x="41" y="10" width="18" height="80" rx="4" transform="rotate(60 50 50)" />
    <rect x="41" y="10" width="18" height="80" rx="4" transform="rotate(120 50 50)" />
  </motion.svg>
);

// Improved MaskedText with Cinematic Editorial Physics
const MaskedText: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className, delay = 0 }) => {
  return (
    <div className={`overflow-hidden relative flex flex-col justify-center items-center ${className}`}>
      <motion.div
        initial={{ y: "110%", opacity: 0, filter: "blur(12px)", rotateX: 5 }}
        animate={{ y: "0%", opacity: 1, filter: "blur(0px)", rotateX: 0 }}
        exit={{ y: "-110%", opacity: 0, filter: "blur(12px)", rotateX: -5 }}
        transition={{
          duration: 1.0,
          ease: [0.16, 1, 0.3, 1], // "Expo Out" for clean, sharp entry
          delay
        }}
        className="origin-bottom-left block will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};

export const Hero: React.FC<HeroProps> = ({ onReady }) => {
  const isPreLaunch = true; // Toggle this for launch day
  const [stage, setStage] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse movement with a bit more stiffness for that "snappy" feel
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Disable parallax on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const previewLink = "https://global-stool-d8d.notion.site/ebd/2910abb5164680f79407fb3eb6bdf22f?theme=light";

  // Refined Animation Sequence Logic - Narrative Flow
  useEffect(() => {
    if (stage >= 4) return;

    // Narrative Rhythm:
    // 1. Hook: "You can't..." (1400ms)
    // 2. Build: "what you don't..." (1400ms)
    // 3. Conflict: "Neither can you scale it." (1800ms)
    // 4. Resolution Bridge: "Presents..." (1100ms)
    const sequenceTimings = [1400, 1400, 1800, 1100];
    const timer = setTimeout(() => {
      setStage((prev) => prev + 1);
    }, sequenceTimings[stage] || 1000);

    return () => clearTimeout(timer);
  }, [stage]);

  // Completion Handler
  useEffect(() => {
    if (showCTA && onReady) {
      onReady();
    }
  }, [showCTA, onReady]);

  const scrollToPricing = () => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToTour = () => document.getElementById('video-tour')?.scrollIntoView({ behavior: 'smooth' });

  const headlines = [
    { text: "You can't ", highlight: "improve" },
    { text: "what you don't ", highlight: "measure." },
    { text: "Neither can you ", highlight: "scale it." }
  ];

  // UPDATED: Premium Word Reveal Variants
  const sentenceVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 1.0, // Start slightly earlier after the logo slam
        staggerChildren: 0.08, // Rhythmic word stagger
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.2, 0.65, 0.3, 0.9], // Dramatic smooth ease
      },
    },
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-brand-bg px-6 md:px-12 lg:px-24 pt-24 pb-16 perspective-1000"
    >


      {/* Central Content Container */}
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center relative z-10">

        {/* Intro Animation Wrapper - Enforce min-height to prevent layout jumps */}
        <div className={`relative flex flex-col items-center justify-center transition-all duration-700 w-full ${stage >= 4 ? 'mb-8 min-h-[auto]' : 'min-h-[50vh]'}`}>

          <AnimatePresence mode="wait">
            {stage < 3 && (
              <div className="absolute inset-0 flex items-center justify-center px-0">
                <MaskedText key={stage} className="text-center w-full">
                  <h1
                    className="font-heading font-medium text-gray-900 text-center whitespace-nowrap w-full px-0 tracking-[-0.04em] leading-[0.9]"
                    style={{ fontSize: 'clamp(20px, 6vw, 90px)' }}
                  >
                    <span className="opacity-90">{headlines[stage].text}</span>
                    <span className="text-[#ff751f] font-bold inline-block relative ml-1.5 sm:ml-2">
                      {headlines[stage].highlight}
                      {/* Refined underline decoration */}
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
                        className="absolute bottom-1 md:bottom-2 left-0 right-0 h-[3px] md:h-[6px] bg-[#ff751f]/20 rounded-full origin-left"
                      />
                    </span>
                  </h1>
                </MaskedText>
              </div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {stage >= 3 && (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center z-20"
              >
                {/* "Unik Builds Presents" - Cinematic Curtain Raiser */}
                {/* Improved typography: Smaller size, wider tracking for 'movie trailer' feel */}
                <motion.div
                  initial={{ opacity: 0, y: 10, letterSpacing: '0em', filter: 'blur(4px)' }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    letterSpacing: '0.4em', // Very wide tracking
                    filter: 'blur(0px)'
                  }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  className="font-bold text-gray-400 text-[9px] md:text-[11px] uppercase mb-8 flex items-center justify-center gap-4 text-center"
                >
                  <span className="w-8 h-px bg-gradient-to-r from-transparent to-gray-300"></span>
                  <span>Hence, <span className="text-[#ff751f]">UNIK BUILDS</span> presents</span>
                  <span className="w-8 h-px bg-gradient-to-l from-transparent to-gray-300"></span>
                </motion.div>

                {stage === 4 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 2, filter: 'blur(20px)', y: 40 }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                    transition={{
                      duration: 1.0,
                      ease: [0.19, 1, 0.22, 1], // Heavy Slam Effect
                    }}
                    className="mt-0"
                  >
                    <div className="flex items-center justify-center gap-2 md:gap-6 flex-nowrap">
                      <motion.div
                        initial={{ rotate: -180, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ duration: 1.2, type: "spring", stiffness: 120, damping: 20 }}
                        className="relative z-10 shrink-0"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                          <AsteriskLogo className="w-10 h-10 md:w-20 md:h-20 text-[#ff751f]" />
                        </motion.div>
                      </motion.div>

                      <div className="relative shrink-0">
                        <span className="font-heading text-5xl md:text-8xl lg:text-9xl font-semibold text-[#292929] tracking-tighter leading-none block whitespace-nowrap">
                          Kinetic<span className="text-[#ff751f]">OS</span>
                        </span>

                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6, duration: 0.8 }}
                          className="absolute -top-3 -right-6 md:-top-4 md:-right-12"
                        >
                          <span className="px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-gray-900 text-white text-[9px] md:text-xs font-bold uppercase tracking-widest border border-gray-700 shadow-xl">
                            v1.0
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {stage >= 4 && (
          <div className="flex flex-col items-center w-full relative z-30">
            <div className="mb-12 px-4 mt-8 min-h-[80px] flex items-center justify-center">
              <motion.div
                className="font-heading font-normal text-[22px] sm:text-2xl md:text-3xl text-gray-500 leading-[1.3] md:leading-relaxed max-w-3xl mx-auto text-center flex flex-wrap justify-center gap-x-1.5 md:gap-x-2.5"
                variants={sentenceVariants}
                initial="hidden"
                animate="visible"
                onAnimationComplete={() => setShowCTA(true)}
              >
                <>
                  {/* Part 1 */}
                  {"Velocity is not about working".split(" ").map((word, index) => (
                    <motion.span key={`p1-${index}`} variants={wordVariants} className="inline-block">{word}</motion.span>
                  ))}

                  {/* Grouped: faster & longer, */}
                  <motion.span variants={wordVariants} className="inline-block whitespace-nowrap">
                    faster & longer,
                  </motion.span>

                  {/* Break for desktop to control flow, natural wrap on mobile */}
                  <div className="hidden md:block basis-full h-0" />

                  {/* Part 2 */}
                  {"rather it's about".split(" ").map((word, index) => (
                    <motion.span key={`p2-${index}`} variants={wordVariants} className="inline-block">{word}</motion.span>
                  ))}

                  {/* Part 3 - Highlight Grouped */}
                  <motion.span
                    variants={wordVariants}
                    className="inline-flex gap-x-1.5 md:gap-x-2.5 whitespace-nowrap"
                  >
                    <span className="font-semibold text-[#ff751f] border-b-[2px] border-[#ff751f]/20">
                      Tracking
                    </span>
                    <span className="font-semibold text-[#ff751f] border-b-[2px] border-[#ff751f]/20">
                      &
                    </span>
                    <span className="font-semibold text-[#ff751f] border-b-[2px] border-[#ff751f]/20">
                      Iteration.
                    </span>
                  </motion.span>
                </>
              </motion.div>
            </div>

            <AnimatePresence>
              {showCTA && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex flex-col items-center gap-10 mb-20 w-full max-w-4xl px-4"
                >
                  {/* Revised Floating Dock CTA */}
                  <div className="relative w-full max-w-3xl">
                    {/* Ambient Glow */}
                    <div className="absolute inset-0 bg-brand-orange/20 blur-[60px] rounded-full opacity-40 pointer-events-none"></div>

                    {/* Glass Container */}
                    <div className="relative bg-white/60 backdrop-blur-2xl border border-white/60 p-2 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col md:flex-row gap-2">

                      {/* Action Zone (Left) */}
                      <div className="bg-white/50 rounded-[1.5rem] p-6 md:p-8 flex-1 flex flex-col justify-center items-center border border-black/[0.03] shadow-inner relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-50 pointer-events-none" />
                        <Button
                          onClick={scrollToPricing}
                          className="w-full text-lg px-8 py-4 shadow-[0_8px_30px_-5px_rgba(255,117,31,0.4)] hover:shadow-[0_12px_40_px_-5px_rgba(255,117,31,0.6)]"
                        >
                          {isPreLaunch ? "Join the Waitlist" : "Get Pro Edition — $247"}
                        </Button>
                        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                          <div className="flex items-center gap-1.5">
                            <Lock className="w-3 h-3 text-gray-300" />
                            <span>Secure</span>
                          </div>
                          <div className="w-1 h-1 rounded-full bg-gray-300" />
                          <div className="flex items-center gap-1.5 text-[#ff751f]">
                            <Zap className="w-3 h-3 fill-current" />
                            <span>Reserve Your Slot</span>
                          </div>
                        </div>
                      </div>

                        {/* Urgency Zone (Right) */}
                        <div className="bg-gray-100/50 rounded-[1.5rem] p-6 md:px-10 flex flex-col justify-center items-center border border-black/[0.03] min-w-[260px]">
                          <div className="pt-2">
                            <CountdownTimer compact />
                          </div>
                          <div className="mt-4 text-[9px] text-gray-300 font-bold uppercase tracking-[0.2em]">Don't Miss Out</div>
                        </div>
                    </div>
                  </div>

                  {/* Secondary Action */}
                  <button
                    onClick={scrollToTour}
                    className="flex items-center gap-3 pl-2 pr-6 py-2 rounded-full bg-white border border-black/5 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-5px_rgba(255,117,31,0.15)] hover:border-[#ff751f]/20 hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#ff751f]/10 flex items-center justify-center group-hover:bg-[#ff751f] transition-colors duration-300">
                      <Play className="w-3.5 h-3.5 text-[#ff751f] fill-current ml-0.5 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-[#ff751f] transition-colors">Watch 60s Tour</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Embedded Notion Preview Window with 3D Parallax - REFINED */}
            <AnimatePresence>
              {showCTA && (
                <motion.div
                  initial={{ opacity: 0, y: 80, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                  transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.2 }}
                  className="relative w-full max-w-[1100px] mx-auto mb-20 px-2 sm:px-4 md:px-0 perspective-1000"
                >
                  {/* Ambient Glow */}
                  <div className="absolute -inset-4 bg-brand-orange/20 blur-[60px] rounded-[3rem] opacity-40 pointer-events-none" />

                  <div className="relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-white/80 bg-white/90 ring-1 ring-black/5">

                    {/* Browser Chrome */}
                    <div className="h-11 bg-white border-b border-gray-100 flex items-center justify-between px-5 z-20 relative">
                      <div className="flex items-center gap-2 group/lights">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] flex items-center justify-center">
                          <X className="w-1.5 h-1.5 text-black/50 opacity-0 group-hover/lights:opacity-100 transition-opacity" />
                        </div>
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                        <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]" />
                      </div>

                      <div className="flex-1 max-w-lg hidden md:flex justify-center absolute left-1/2 -translate-x-1/2">
                        <div className="bg-gray-50 hover:bg-gray-100 transition-colors px-3 py-1.5 rounded-lg border border-gray-200 flex items-center justify-center gap-2 w-full max-w-[400px] text-gray-500 shadow-inner">
                          <Lock className="w-3 h-3 text-gray-400" />
                          <span className="text-[11px] font-medium tracking-tight opacity-70">kineticos.notion.site/dashboard</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg hover:bg-gray-50 flex items-center justify-center transition-colors cursor-pointer">
                          <Share2 className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="w-8 h-8 rounded-lg hover:bg-gray-50 flex items-center justify-center transition-colors cursor-pointer">
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="relative aspect-[16/10] md:aspect-[16/9] bg-gray-50 w-full group/frame overflow-hidden">
                      {/* Static Placeholder Image */}
                      <img
                        src="https://i.ibb.co/B2x6LrLz/PREVIEW.png"
                        onError={(e) => {
                          // Fallback if the user's link is not a direct image
                          e.currentTarget.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop";
                        }}
                        alt="Dashboard Context"
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isInteracting ? 'opacity-0 scale-110' : 'opacity-100 scale-100 blur-[0.5px]'}`}
                      />

                      {/* Iframe */}
                      <div className={`absolute inset-0 transition-opacity duration-700 bg-white ${isInteracting ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        {isInteracting && (
                          <iframe
                            src={previewLink}
                            style={{
                              width: '150%',
                              height: '150%',
                              border: 'none',
                              transform: 'scale(0.666)',
                              transformOrigin: '0 0',
                            }}
                            className="absolute inset-0"
                            title="KineticOS Live Preview"
                            allowFullScreen
                          />
                        )}
                      </div>

                      {/* Overlay Button */}
                      {!isInteracting && (
                        <div className="absolute inset-0 z-20 bg-white/10 backdrop-blur-[2px] flex items-center justify-center">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsInteracting(true)}
                            className="group relative"
                          >
                            <div className="absolute inset-0 bg-brand-orange rounded-full blur-xl opacity-20 group-hover:opacity-40 animate-pulse transition-opacity duration-500" />
                            <div className="bg-white pl-2 pr-6 py-2 rounded-full shadow-2xl border border-white/60 flex items-center gap-4 relative z-10">
                              <div className="w-12 h-12 rounded-full bg-[#ff751f] flex items-center justify-center shadow-lg shadow-orange-500/20 text-white group-hover:scale-110 transition-transform duration-300">
                                <MousePointer2 className="w-5 h-5 fill-current ml-0.5" />
                              </div>
                              <div className="flex flex-col text-left">
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Interactive Demo</span>
                                <span className="text-sm font-bold text-gray-900 group-hover:text-[#ff751f] transition-colors">Click to Explore</span>
                              </div>
                            </div>
                          </motion.button>
                        </div>
                      )}

                      {/* Helper Badge */}
                      {!isInteracting && (
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="absolute bottom-6 right-6 hidden md:flex items-center gap-3 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/50 shadow-lg max-w-[260px]"
                        >
                          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 border border-blue-100">
                            <Monitor className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-gray-900 uppercase tracking-wide mb-0.5 flex items-center gap-2">
                              Live Workspace
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                              </span>
                            </h4>
                            <p className="text-[10px] text-gray-500 leading-snug">
                              Interact with the actual template.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    {["6 Integrated Hubs", "Financial Tracking", "Client Portal", "Mobile Optimized"].map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + (i * 0.1) }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-gray-200 shadow-sm backdrop-blur-sm text-[11px] font-bold text-gray-600 uppercase tracking-wider hover:bg-white hover:border-[#ff751f]/20 hover:text-[#ff751f] transition-all cursor-default"
                      >
                        <Check className="w-3.5 h-3.5" />
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
      <style>{`
        .perspective-1000 { perspective: 1000px; }
      `}</style>
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} tier="Pro System" />
    </section>
  );
};
