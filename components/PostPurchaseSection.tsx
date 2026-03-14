
import React from 'react';
// Shadow motion to bypass environment-specific type errors with framer-motion props
import { motion as motionBase } from 'framer-motion';
const motion = motionBase as any;
import { Mail, Copy, PlayCircle, Timer } from 'lucide-react';

const STEPS = [
  {
    id: 1,
    title: "Spot Confirmation",
    description: "Instant email confirming your position",
    icon: Mail
  },
  {
    id: 2,
    title: "Exclusive Updates",
    description: "Get personal invites as spots open",
    icon: Copy
  },
  {
    id: 3,
    title: "Direct Access",
    description: "One-click onboarding when invited",
    icon: PlayCircle
  },
  {
    id: 4,
    title: "Scale Instantly",
    description: "Start recovering time immediately",
    icon: Timer
  }
];

export const PostPurchaseSection: React.FC = () => {
  return (
    <section className="py-20 bg-brand-bg border-b border-black/5 relative overflow-hidden px-6 md:px-12 lg:px-24">
       {/* Background Decoration */}
       <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-transparent via-white/40 to-transparent blur-3xl" />
       </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-medium text-brand-text">
            What happens after joining:
          </h3>
        </motion.div>

        {/* Desktop View (Horizontal) */}
        <div className="hidden md:block relative">
          {/* Connecting Line Container */}
          <div className="absolute top-[28px] left-0 w-full h-0.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: "100%" }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
               className="h-full bg-[#ff751f]"
            />
          </div>

          <div className="grid grid-cols-4 gap-4 relative">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (index * 0.2) }}
                className="flex flex-col items-center text-center group"
              >
                {/* Number Circle */}
                <div className="relative mb-6">
                    <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.3 + (index * 0.2) }}
                        className="w-14 h-14 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-lg font-bold text-gray-400 shadow-sm z-10 relative group-hover:border-[#ff751f] group-hover:text-[#ff751f] transition-colors duration-300"
                    >
                        {step.id}
                    </motion.div>
                    {/* Pulsing halo behind active step */}
                    <div className="absolute inset-0 bg-[#ff751f]/20 rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
                </div>

                <h4 className="text-lg font-bold text-brand-text mb-2 px-2">{step.description}</h4>
                <div className="text-[#ff751f] opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                   <step.icon className="w-5 h-5 mx-auto" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile View (Vertical) */}
        <div className="md:hidden relative pl-2 space-y-10">
            {/* 
               Alignment Math:
               Container padding-left: pl-2 (8px).
               Icon container width: 24px (w-6).
               Icon center: 8px + 12px = 20px.
               Line width: 0.5 (2px).
               Line left position: 20px center - 1px half-width = 19px.
               Class: left-[19px].
            */}
            <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gray-200">
                <motion.div 
                   initial={{ height: 0 }}
                   whileInView={{ height: "100%" }}
                   viewport={{ once: true }}
                   transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                   className="w-full bg-[#ff751f]"
                />
            </div>

            {STEPS.map((step, index) => (
                <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (index * 0.15) }}
                    className="flex items-start gap-5 relative"
                >
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-[#ff751f] flex items-center justify-center text-xs font-bold text-[#ff751f] shadow-sm z-10 shrink-0 mt-0.5">
                        {step.id}
                    </div>
                    <div>
                        <p className="text-lg font-medium text-brand-text leading-tight pt-0.5">{step.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>

      </div>
    </section>
  );
};
