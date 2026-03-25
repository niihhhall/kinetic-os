
import React, { useState } from 'react';
// Shadow motion to bypass environment-specific type errors with framer-motion props
import { motion as motionBase } from 'framer-motion';
const motion = motionBase as any;
import { Quote, Zap, TrendingUp, CheckCircle2, Brain, Heart, FileWarning, Wallet, MessageSquareDashed } from 'lucide-react';

const STORIES = [
  {
    frontIcon: <Brain className="w-5 h-5" strokeWidth={1.5} />,
    title: "Laptop Closes, Brain Doesn't",
    content: "I shut my laptop at 6 PM but my mind keeps running. What's due tomorrow? Did I update that spreadsheet? My family complains I'm never fully present.",
    author: "Lost Money → Financial Visibility",
    footerText: "9.4/10",
    resultIcon: <Heart className="w-12 h-12 text-[#ff751f]" strokeWidth={1.5} />,
    result: "Actually Present With My Kids",
    metric: "WORK STAYS AT WORK",
    cta: "GET THIS FREEDOM TODAY →"
  },
  {
    frontIcon: <FileWarning className="w-5 h-5" strokeWidth={1.5} />,
    title: "I Forgot to Invoice December",
    content: "Realized in February I never invoiced 2 clients from December. $8,400 work. Too awkward to ask for it now. Just... gone.",
    author: "Sunday Night Dread → Weekend Freedom",
    footerText: "9.3/10",
    resultIcon: <Wallet className="w-12 h-12 text-[#ff751f]" strokeWidth={1.5} />,
    result: "$12,000 Recovered in 3 Months",
    metric: "AUTO-INVOICE REMINDERS",
    cta: "GET THIS MONEY TODAY →"
  },
  {
    frontIcon: <MessageSquareDashed className="w-5 h-5" strokeWidth={1.5} />,
    title: "\"What Did We Discuss Last Month?\"",
    content: "Client references something from 3 weeks ago. I have no idea. It's somewhere in Slack or email. I pretend I remember. They notice. Trust damaged.",
    author: "\"Where Is It?\" Crisis → Instant Recall",
    footerText: "9.2/10",
    resultIcon: <Zap className="w-12 h-12 text-[#ff751f]" strokeWidth={1.5} />,
    result: "Complete Client History in 5 Seconds",
    metric: "LOOK IMPOSSIBLY PREPARED",
    cta: "GET THIS EDGE TODAY →"
  }
];

const FlipCard = ({ story, index, openWaitlist }: { story: any, index: number, openWaitlist: (tier?: string) => void }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative h-[480px] w-full perspective-1000 group cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          mass: 1
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 backface-hidden p-10 rounded-[2.5rem] bg-white border border-black/5 flex flex-col h-full shadow-[0_20px_50px_rgba(0,0,0,0.02)] transition-shadow duration-300 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="mb-6">
            {/* Changed from Orange to Red to signify 'Problem/Pain' state */}
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 mb-8 border border-red-100/50 shadow-sm">
              {story.frontIcon ? story.frontIcon : <Quote className="w-5 h-5 fill-current" />}
            </div>
            <h3 className="text-2xl font-bold text-brand-text mb-4 leading-tight tracking-tight">{story.title}</h3>
            <p className="text-gray-500 text-base leading-relaxed mb-6 font-medium">{story.content}</p>
          </div>
          <div className="mt-auto pt-6 border-t border-black/5">
            <span className="text-[11px] font-bold text-[#ff751f] uppercase tracking-widest leading-tight block mb-1">{story.author}</span>
            <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{story.footerText || "Hover to see result"}</div>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 backface-hidden p-10 rounded-[2.5rem] bg-white flex flex-col items-center justify-center h-full shadow-2xl border-2 border-brand-orange/20"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isFlipped ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-6 p-6 rounded-full bg-brand-orange/5 border border-brand-orange/10 shadow-inner">
              {story.resultIcon}
            </div>
            <h4 className="text-2xl font-bold text-brand-text mb-2 tracking-tight">{story.result}</h4>
            <div className="bg-[#ff751f] text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-10 shadow-md shadow-brand-orange/20">
              {story.metric}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openWaitlist("Pro Freelancer");
              }}
              className="text-[#ff751f] font-bold text-xs uppercase tracking-[0.2em] border-b border-brand-orange/20 hover:border-brand-orange transition-all pb-1 hover:gap-2"
            >
              {story.cta || "Get this system today →"}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface UserStoriesSectionProps {
  openWaitlist: (tier?: string) => void;
}

export const UserStoriesSection: React.FC<UserStoriesSectionProps> = ({ openWaitlist }) => {
  return (
    <section className="pt-16 md:pt-24 pb-16 md:pb-24 bg-brand-bg relative overflow-hidden px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="text-[#ff751f] font-bold uppercase tracking-[0.3em] text-xs mb-6 block"
          >
            Workflow Transformations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="text-4xl md:text-6xl font-medium mb-8 text-brand-text leading-tight tracking-tight"
          >
            See how freelancers are ditching <br className="hidden lg:block" />
            the chaos for <span className="text-[#ff751f]">Kinetic clarity.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Real people. Real systems. Real results. Hover over any story to see the kinetic impact.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {STORIES.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 70, damping: 20 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <FlipCard story={story} index={i} openWaitlist={openWaitlist} />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
};
