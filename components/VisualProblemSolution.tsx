
import React from 'react';
// Shadow motion to bypass environment-specific type errors with framer-motion props
import { motion as motionBase } from 'framer-motion';
const motion = motionBase as any;
import { AlertCircle, Check, ArrowRight, X } from 'lucide-react';

const AsteriskLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <motion.svg 
    viewBox="0 0 100 100" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    animate={{ rotate: 360 }}
    transition={{ 
      duration: 8, 
      repeat: Infinity, 
      ease: "linear" 
    }}
  >
    <rect x="41" y="10" width="18" height="80" rx="4" />
    <rect x="41" y="10" width="18" height="80" rx="4" transform="rotate(60 50 50)" />
    <rect x="41" y="10" width="18" height="80" rx="4" transform="rotate(120 50 50)" />
  </motion.svg>
);

interface VisualProblemSolutionProps {
  openWaitlist: (tier?: string) => void;
}

export const VisualProblemSolution: React.FC<VisualProblemSolutionProps> = ({ openWaitlist }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  const problems = [
    { title: "\"What Did I Forget?\" Anxiety", desc: "Sunday night dread that you're dropping a ball. Every. Single. Week." },
    { title: "Decision Fatigue Hell", desc: "44 micro-decisions before 10 AM: Which tool? Which task? Where's that file?" },
    { title: "12 Open Loops Running", desc: "Unfinished tasks living in your head rent-free. Killing focus and sleep." },
    { title: "Context Reconstruction Tax", desc: "12 minutes rebuilding \"where were we?\" every time you switch clients." },
    { title: "Zero Strategic Thinking Space", desc: "Drowning in operational chaos. No bandwidth for growth or creativity." },
    { title: "Impostor Stress Loop", desc: "Feeling like you \"should be more on top of things\". Guilt about disorganization." }
  ];

  const solutions = [
    { title: "Visibility First Dashboard™", desc: "See everything critical in 10 seconds. No more 2 AM \"Did I forget something?\" panic." },
    { title: "Pre Decided Architecture™", desc: "System makes decisions FOR you. Filtered views auto-surface what's urgent today." },
    { title: "Closed Loop Task Management™", desc: "Tasks live in the system, not your head. Your brain stops running background processes 24/7." },
    { title: "Instant Context Loading™", desc: "Click client profile, see entire history. Zero cognitive effort to remember \"where we are.\"" },
    { title: "Strategic Thinking Space™", desc: "Admin drops from 15 hrs to 3 hrs weekly. Mental bandwidth for growth planning returns." },
    { title: "Guilt Free Confidence™", desc: "System catches what you forget. You're not relying on superhuman memory anymore." }
  ];

  return (
    <section className="py-16 md:py-24 bg-brand-bg px-6 md:px-12 lg:px-24 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-12 relative z-10">
        
        {/* Problem Card - Wide & Centered */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
          className="w-full bg-white rounded-[2.5rem] p-6 md:p-12 border border-gray-100 shadow-xl shadow-gray-200/40 relative overflow-hidden group"
        >
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-50/40 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none opacity-50" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12 border-b border-gray-100 pb-8">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-500 text-xs font-bold uppercase tracking-widest mb-4 border border-red-100/50">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>The Chaos State</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-brand-text tracking-tight mb-4">The Problem</h2>
                    <p className="text-gray-500 text-lg leading-relaxed">
                        Freelance businesses bleed thousands every year because of 6 specific chaos points.
                    </p>
                </div>
                <div className="hidden md:block">
                   <div className="bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100 text-center">
                      <span className="block text-2xl font-bold text-gray-900">$46,800</span>
                      <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Avg. Annual Loss</span>
                   </div>
                </div>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            >
              {problems.map((item, i) => (
                  <motion.div 
                    key={i} 
                    variants={itemVariants} 
                    className="flex gap-4 p-4 md:p-5 rounded-2xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-md hover:border-red-100 transition-all duration-300 group/item"
                  >
                     <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center shrink-0 group-hover/item:bg-red-50 group-hover/item:text-red-500 transition-colors">
                          <X className="w-5 h-5 text-gray-400 group-hover/item:text-red-500 transition-colors" />
                      </div>
                      <div>
                          <h3 className="text-lg font-bold mb-2 text-brand-text">{item.title}</h3>
                          <p className="text-sm text-gray-500 leading-relaxed group-hover/item:text-gray-600 transition-colors">{item.desc}</p>
                      </div>
                  </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Connecting Arrow */}
        <div className="flex justify-center -my-4 relative z-20">
            <div className="bg-white p-3 rounded-full shadow-lg border border-gray-100 text-gray-300">
                <ArrowRight className="w-6 h-6 rotate-90" />
            </div>
        </div>

        {/* Solution Card - Wide & Centered */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.1 }}
          className="w-full bg-[#ff751f] rounded-[2.5rem] p-6 md:p-12 text-white shadow-[0_30px_80px_-20px_rgba(255,117,31,0.4)] relative overflow-hidden group"
        >
          {/* Shine Effect */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine transition-transform duration-1000" />
          </div>

          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12 border-b border-white/10 pb-8">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest mb-4 border border-white/20">
                        <AsteriskLogo className="w-3.5 h-3.5" />
                        <span>The Kinetic State</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">The Solution</h2>
                    <p className="text-white/80 text-lg leading-relaxed">
                        We built <span className="font-bold text-white underline decoration-white/30 underline-offset-4">Kinetic OS</span> to solve just these problems, nothing else.
                    </p>
                </div>
                <div className="hidden md:block">
                   <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20 text-center">
                      <span className="block text-2xl font-bold text-white">15 hrs</span>
                      <span className="text-xs text-white/60 font-bold uppercase tracking-wider">Weekly Saved</span>
                   </div>
                </div>
            </div>

            <motion.div 
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            >
                {solutions.map((item, i) => (
                    <motion.div 
                        key={i} 
                        variants={itemVariants} 
                        className="flex gap-4 p-4 md:p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-lg mt-1">
                            <Check className="w-5 h-5 text-[#ff751f] stroke-[3px]" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
                            <p className="text-sm text-white/70 leading-relaxed">{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/60 font-medium text-sm">
                Recovered over $450K in billable hours for independent professionals.
              </p>
              <button 
                onClick={() => openWaitlist("Pro Freelancer")}
                className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs hover:gap-3 transition-all"
              >
                Get The System <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

      </div>

      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .animate-shine {
          animation: shine 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .group:hover .animate-shine {
          animation: shine 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </section>
  );
};
