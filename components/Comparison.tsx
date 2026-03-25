
import React from 'react';
// Shadow motion to bypass environment-specific type errors with framer-motion props
import { motion as motionBase } from 'framer-motion';
const motion = motionBase as any;
import { X, Check, MousePointer2 } from 'lucide-react';

interface ComparisonProps {
  openWaitlist?: (tierText?: string) => void;
}

export const Comparison: React.FC<ComparisonProps> = ({ openWaitlist }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 20 } 
    }
  };

  const listVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 200, damping: 25 }
    }
  };

  return (
    <section className="py-20 md:py-32 bg-brand-bg relative overflow-hidden px-6 md:px-12 lg:px-24">
      {/* Decorative background elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-gray-200/20 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff751f]/10 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-medium mb-6 text-brand-text tracking-tight">
            The Tale of <span className="text-[#ff751f]">Two Freelancers</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Same skills. Same rates. <br className="hidden md:block" />
            <span className="text-brand-text">Different Operating Systems.</span>
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto items-stretch"
        >
          {/* Left: The "Drowning" Freelancer */}
          <motion.div 
            variants={cardVariants}
            className="flex flex-col h-full bg-white/40 rounded-[2.5rem] border-2 border-dashed border-gray-200 p-8 md:p-10 relative overflow-hidden group hover:border-red-200 transition-colors duration-300"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                <X className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-medium text-gray-500 tracking-tight">The "Drowning" Freelancer</h3>
            </div>

            <div className="mb-12 pl-2 border-l-4 border-gray-200">
              <div className="text-5xl font-bold text-gray-400 group-hover:text-red-400 transition-colors tracking-tighter">$85,000</div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Annual Revenue</div>
            </div>
            
            <ul className="space-y-6 mb-8 flex-1">
              {[
                { text: "Works 65 hours/week", sub: "NIGHTS & WEEKENDS GONE" },
                { text: "8 disconnected tools", sub: "CONTEXT SWITCHING HELL" },
                { text: "Manual admin work", sub: "12+ HOURS LOST WEEKLY" },
                { text: "Scattered client data", sub: "CONSTANT ANXIETY" }
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  variants={listVariants}
                  className="flex items-start gap-4"
                >
                  <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium leading-tight block mb-1.5 text-lg">{item.text}</span>
                    <span className="text-[10px] font-bold text-red-400/80 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded">{item.sub}</span>
                  </div>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto p-6 bg-red-50/50 rounded-2xl border border-red-100/50 text-center">
               <span className="text-xs font-bold text-red-400 uppercase tracking-widest block mb-1">STATUS: BURNOUT IMMINENT</span>
               <span className="text-sm text-gray-500 italic">"I just need more time..."</span>
            </div>
          </motion.div>

          {/* Right: The KineticOS Pro */}
          <motion.div 
            variants={cardVariants}
            className="relative flex flex-col h-full group"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-[2px] bg-gradient-to-b from-[#ff751f] to-[#ff914d] rounded-[2.6rem] opacity-20 group-hover:opacity-40 blur-sm transition-opacity duration-500" />
            
            <div className="relative h-full bg-white rounded-[2.5rem] border border-[#ff751f]/20 p-8 md:p-10 flex flex-col shadow-2xl shadow-orange-500/10 overflow-hidden">
              
              {/* YOU Badge */}
              <div className="absolute top-8 right-8">
                  <motion.div 
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-[#ff751f] text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg shadow-brand-orange/30 tracking-widest uppercase flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    YOU
                  </motion.div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#ff751f]/10 flex items-center justify-center text-[#ff751f] shrink-0">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-brand-text tracking-tight">The KineticOS Pro</h3>
              </div>

              <div className="mb-12 pl-2 border-l-4 border-[#ff751f]">
                <div className="text-5xl font-bold text-brand-text tracking-tighter">$118,000</div>
                <div className="text-sm font-bold text-[#ff751f] uppercase tracking-widest mt-2 flex items-center gap-2">
                    Annual Revenue 
                    <span className="bg-[#ff751f]/10 px-2 py-0.5 rounded text-[10px]">+38% Growth</span>
                </div>
              </div>
              
              <ul className="space-y-6 mb-8 flex-1">
                {[
                  { text: "Works 45 hours/week", sub: "RECLAIMED WEEKENDS" },
                  { text: "One Operating System", sub: "TOTAL CLARITY" },
                  { text: "Automated Workflows", sub: "FOCUS ON BILLABLE WORK" },
                  { text: "Centralized Client HQ", sub: "IMPRESSED CLIENTS" }
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    variants={listVariants}
                    className="flex items-start gap-4 group/item"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform shadow-sm">
                      <Check className="w-3.5 h-3.5 stroke-[3px]" />
                    </div>
                    <div>
                      <span className="text-brand-text font-bold leading-tight block mb-1.5 text-lg">{item.text}</span>
                      <span className="text-[10px] font-bold text-[#ff751f] uppercase tracking-widest bg-[#ff751f]/10 px-2 py-0.5 rounded">{item.sub}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <button 
                onClick={() => openWaitlist ? openWaitlist("Pro System") : document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-4 bg-[#ff751f] hover:bg-[#e6641a] text-white rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-brand-orange/20 transition-all flex items-center justify-center gap-3 group/btn mt-auto"
              >
                Join the Top 1%
                <MousePointer2 className="w-4 h-4 group-hover/btn:-rotate-12 transition-transform" />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Stat */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
          className="mt-20 text-center"
        >
           <div className="inline-flex flex-col items-center bg-white border border-gray-100 rounded-3xl p-8 shadow-xl shadow-gray-100/50">
              <div className="text-gray-400 font-bold uppercase tracking-[0.3em] text-xs mb-4">The Operating System Advantage</div>
              <div className="text-4xl md:text-5xl font-bold text-brand-text mb-4 tracking-tight">+$33,000 / year</div>
              <div className="flex items-center gap-2 text-sm text-[#ff751f] font-bold bg-[#ff751f]/10 px-4 py-2 rounded-full border border-[#ff751f]/20">
                <Check className="w-4 h-4" />
                With 20 fewer hours worked per week
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};
