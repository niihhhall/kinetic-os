
import React, { useState, useEffect, useRef } from 'react';
// Shadow motion to bypass environment-specific type errors with framer-motion props
import { motion as motionBase, useInView, animate } from 'framer-motion';
const motion = motionBase as any;
import { Zap, Clock, Search, TrendingUp, Wallet, ArrowRight, CheckCircle2 } from 'lucide-react';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const BentoCard: React.FC<BentoCardProps> = ({ children, className = "", delay = 0 }) => {
  // Check if a background color is provided in className to avoid conflict with default bg-white
  const hasCustomBg = className.includes('bg-');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, type: "spring", stiffness: 70, damping: 20 }}
      whileHover={{ y: -5, transition: { type: "spring", stiffness: 300, damping: 25 } }}
      className={`${hasCustomBg ? '' : 'bg-white'} rounded-[2rem] border border-black/5 p-6 md:p-12 shadow-sm hover:shadow-2xl hover:shadow-brand-orange/5 transition-shadow duration-300 relative overflow-hidden group flex flex-col justify-between ${className}`}
    >
      {/* Hover Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff751f]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};

export const AnimatedNumber: React.FC<{ value: string; className?: string }> = ({ value, className }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-10% 0px -10% 0px" });
  
  // Determine properties upfront to set initial state correctly
  const isRange = value.includes('-');
  const isCurrency = value.includes('$');
  const initialText = isCurrency ? '$0' : (isRange ? '0-0' : '0');

  useEffect(() => {
    if (!isInView || !nodeRef.current) return;
    const node = nodeRef.current;

    // Handle "12-15" range format
    if (isRange) {
        const parts = value.split('-').map(s => parseFloat(s.replace(/[^0-9.]/g, '')));
        const startTarget = parts[0] || 0;
        const endTarget = parts[1] || 0;
        
        const controls = animate(0, 1, {
            duration: 2.2,
            ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for premium feel
            onUpdate: (progress) => {
                const currentStart = Math.floor(progress * startTarget);
                const currentEnd = Math.floor(progress * endTarget);
                node.textContent = `${currentStart}-${currentEnd}`;
            }
        });
        return () => controls.stop();
    } 
    // Handle Standard Numbers & Currency
    else {
        const cleanVal = value.replace(/[^0-9.]/g, '');
        const target = parseFloat(cleanVal);
        
        // Dynamic duration: Small numbers (like 3) should animate faster to feel snappy,
        // Large numbers (like 97 or 247) should take longer to feel substantial.
        const duration = target <= 10 ? 1.5 : 2.5; 

        const controls = animate(0, target, {
            duration: duration,
            ease: [0.25, 0.1, 0.25, 1],
            onUpdate: (latest) => {
                const val = Math.floor(latest);
                node.textContent = isCurrency ? `$${val.toLocaleString()}` : val.toLocaleString();
            }
        });
        return () => controls.stop();
    }
  }, [isInView, value, isRange, isCurrency]);

  return <span ref={nodeRef} className={className}>{initialText}</span>;
};

export const ClientAchievementSection: React.FC<{ openWaitlist: () => void }> = ({ openWaitlist }) => {
  return (
    <section className="bg-brand-bg pt-16 md:pt-24 pb-16 md:pb-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff751f]/10 text-[#ff751f] text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Proven Impact</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="text-3xl md:text-6xl font-medium text-brand-text tracking-tight leading-tight max-w-4xl"
          >
            Metrics that matter to your <br className="hidden md:block"/>
            <span className="text-[#ff751f]">bottom line.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
          
          {/* Left Column: 2x2 Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            
            {/* Metric 1: Friction Reduction */}
            <BentoCard delay={0.1}>
                <div className="flex justify-between items-start mb-6 md:mb-8">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                        <Zap className="w-5 h-5 fill-current" />
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Efficiency</span>
                </div>
                <div>
                    <div className="flex items-baseline gap-1 text-4xl md:text-5xl font-bold text-brand-text tracking-tighter mb-3">
                        <AnimatedNumber value="97" />
                        <span className="text-3xl text-[#ff751f]">%</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Reduction in Friction</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        From 60-minute morning chaos to 3-second dashboard clarity daily.
                    </p>
                </div>
            </BentoCard>

            {/* Metric 2: Time Saved */}
            <BentoCard delay={0.2}>
                <div className="flex justify-between items-start mb-6 md:mb-8">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                        <Clock className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Time</span>
                </div>
                <div>
                    <div className="flex items-baseline gap-1 text-4xl md:text-5xl font-bold text-brand-text tracking-tighter mb-3">
                        <AnimatedNumber value="12-15" />
                        <span className="text-2xl text-gray-400 font-medium ml-1">hrs</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Weekly Hours Saved</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Administrative time eliminated completely. Recovered for billable work.
                    </p>
                </div>
            </BentoCard>

            {/* Metric 3: Retrieval Speed */}
            <BentoCard delay={0.3}>
                <div className="flex justify-between items-start mb-6 md:mb-8">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500">
                        <Search className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Speed</span>
                </div>
                <div>
                    <div className="flex items-baseline gap-1 text-4xl md:text-5xl font-bold text-brand-text tracking-tighter mb-3">
                        <AnimatedNumber value="89" />
                        <span className="text-3xl text-[#ff751f]">%</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Faster Retrieval</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Finding client files drops from 7-minute searches to 10-second precision retrieval.
                    </p>
                </div>
            </BentoCard>

            {/* Metric 4: Capacity Growth */}
            <BentoCard delay={0.4}>
                <div className="flex justify-between items-start mb-6 md:mb-8">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-500">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Scale</span>
                </div>
                <div>
                    <div className="flex items-baseline gap-1 text-4xl md:text-5xl font-bold text-brand-text tracking-tighter mb-3">
                        <AnimatedNumber value="3" />
                        <span className="text-3xl text-[#ff751f]">x</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Delivery Capacity</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Business delivery capacity unlocked within 6 months while working 20% fewer hours.
                    </p>
                </div>
            </BentoCard>

          </div>

          {/* Right Column: Tall Financial Card */}
          <div className="lg:col-span-1">
             <BentoCard delay={0.5} className="h-full bg-[#ff751f] border-transparent text-white ring-4 ring-[#ff751f]/20">
                <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-8 md:mb-10">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                            <Wallet className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-white/60 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">ROI</span>
                    </div>
                    
                    <div className="mb-8 md:mb-10">
                        <h3 className="text-white/80 font-medium mb-1">One-time Investment</h3>
                        <div className="flex items-baseline gap-2">
                           <span className="text-5xl md:text-6xl font-bold tracking-tighter blur-[20px] select-none">$247</span>
                        </div>
                        {/* Hidden $125/month Forever text */}
                    </div>

                    <div className="mt-auto space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                            <span className="text-sm font-medium text-white/80">Year 1 Savings</span>
                            <span className="font-bold text-white">$1,253</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                            <span className="text-sm font-medium text-white/80">3-Year Savings</span>
                            <span className="font-bold text-white">$4,253</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-white bg-opacity-95 backdrop-blur-sm text-[#ff751f] shadow-lg">
                            <span className="text-sm font-bold flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" />
                                5-Year Savings
                            </span>
                            <span className="font-bold text-xl">$7,253</span>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => openWaitlist()}
                        className="mt-8 w-full py-4 bg-black/20 hover:bg-black/30 text-white rounded-xl font-bold text-sm uppercase tracking-widest transition-colors flex items-center justify-center gap-2 group/btn"
                    >
                        Start Saving
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
             </BentoCard>
          </div>

        </div>
      </div>
    </section>
  );
};
