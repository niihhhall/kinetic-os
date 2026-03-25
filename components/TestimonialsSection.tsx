import React from 'react';
// Shadow motion to bypass environment-specific type errors with framer-motion props
import { motion as motionBase } from 'framer-motion';
const motion = motionBase as any;
import { AnimatedNumber } from './ClientAchievementSection';

const TESTIMONIALS = [
  {
    quote: "The instant setup was a game-changer for our team. We were analyzing data within minutes, not days.",
    author: "David Kim",
    role: "Head of Business Intelligence",
    avatar: "https://i.pravatar.cc/150?u=david"
  },
  {
    quote: "Integrating our existing tools was seamless. We didn't need IT support, which saved us valuable resources.",
    author: "Rachel Adams",
    role: "Product Manager",
    avatar: "https://i.pravatar.cc/150?u=rachel"
  },
  {
    quote: "Switching to this analytics platform was the best decision we made this year. It's intuitive, secure, and delivers real results.",
    author: "Carlos Rivera",
    role: "CEO",
    avatar: "https://i.pravatar.cc/150?u=carlos"
  },
  {
    quote: "Reporting is now effortless. Our team shares clear, concise reports in seconds—no more confusion or wasted time.",
    author: "Priya Patel",
    role: "Marketing Director",
    avatar: "https://i.pravatar.cc/150?u=priya"
  },
  {
    quote: "Customer support is outstanding. Any question we had was answered quickly and thoroughly.",
    author: "Liam O'Connor",
    role: "Customer Success Manager",
    avatar: "https://i.pravatar.cc/150?u=liam"
  },
  {
    quote: "The platform's transparency has removed all doubts. We always know exactly where our data stands and what to do next.",
    author: "Sofia Martinez",
    role: "Analytics Lead",
    avatar: "https://i.pravatar.cc/150?u=sofia"
  },
  {
    quote: "The predictive analytics feature has helped us spot trends early and make proactive business decisions.",
    author: "Emily Zhang",
    role: "Strategy Director",
    avatar: "https://i.pravatar.cc/150?u=emily"
  },
  {
    quote: "Finally a tool that understands the workflow of modern teams. Minimal friction, maximum output.",
    author: "Michael Chen",
    role: "IT Security Lead",
    avatar: "https://i.pravatar.cc/150?u=michael"
  },
  {
    quote: "KineticOS didn't just organize our data, it transformed how we think about our growth strategy.",
    author: "Jessica Lee",
    role: "Operations Manager",
    avatar: "https://i.pravatar.cc/150?u=jessica"
  }
];

// Added className to props to fix type error at usage site
const TickerColumn = ({
  items,
  reverse = false,
  duration = 30,
  className = ""
}: {
  items: typeof TESTIMONIALS,
  reverse?: boolean,
  duration?: number,
  className?: string
}) => {
  // Triple items to ensure seamless loop
  const tripledItems = [...items, ...items, ...items];

  return (
    <div className={`flex flex-col gap-6 relative overflow-hidden h-[600px] ${className}`}>
      <motion.div
        animate={{
          y: reverse ? ["-66.66%", "0%"] : ["0%", "-66.66%"]
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear"
        }}
        className="flex flex-col gap-6"
      >
        {tripledItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#ff751f] text-white p-8 rounded-3xl shadow-xl border border-white/10 w-full relative overflow-hidden group"
          >
            {/* Subtle internal gradient for depth */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

            <p className="text-lg font-medium leading-relaxed mb-8 relative z-10">
              "{item.quote}"
            </p>
            <div className="flex items-center gap-4 relative z-10">
              <img
                src={item.avatar}
                alt={item.author}
                className="w-12 h-12 rounded-full border-2 border-white/20 object-cover"
              />
              <div>
                <h4 className="font-bold text-white leading-none mb-1">{item.author}</h4>
                <p className="text-white/70 text-xs font-medium uppercase tracking-wider">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const MobileTestimonials = ({ items }: { items: typeof TESTIMONIALS }) => {
  // Triple items to ensure seamless loop
  const tickerItems = [...items, ...items, ...items];

  return (
    <div className="lg:hidden relative w-full overflow-hidden py-4">
      {/* Left Gradient Mask */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />

      {/* Right Gradient Mask */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

      <motion.div
        className="flex gap-6 px-6 w-max"
        animate={{
          x: ["0%", "-33.333%"]
        }}
        transition={{
          duration: 35, // Balanced speed for mobile and tablet
          ease: "linear",
          repeat: Infinity
        }}
      >
        {tickerItems.map((item, idx) => (
          <div
            key={`${idx}-${item.author}`}
            className="w-[85vw] sm:w-[500px] shrink-0 bg-[#ff751f] text-white p-8 rounded-3xl shadow-xl border border-white/10 flex flex-col justify-between relative overflow-hidden group h-[380px]"
          >
            {/* Aesthetic background blobs - Preserved from original */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full blur-xl -ml-12 -mb-12 pointer-events-none" />

            <p className="text-lg font-medium leading-relaxed mb-8 relative z-10">
              "{item.quote}"
            </p>
            <div className="flex items-center gap-4 mt-auto relative z-10">
              <img
                src={item.avatar}
                alt={item.author}
                className="w-12 h-12 rounded-full border-2 border-white/20 object-cover"
              />
              <div>
                <h4 className="font-bold text-white leading-none mb-1">{item.author}</h4>
                <p className="text-white/70 text-xs font-medium uppercase tracking-wider">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

interface TestimonialsSectionProps {
  openWaitlist: (tier?: string) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ openWaitlist }) => {
  const handleWaitlistOpen = () => {
    openWaitlist("Pro Freelancer"); // Default to most popular tier
  };

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden px-6 md:px-12 lg:px-24">
      {/* Gradient Transition to Next Section (White -> Brand BG) */}
      <div className="absolute bottom-0 left-0 w-full h-24 md:h-48 bg-gradient-to-b from-white/0 via-brand-bg/60 to-brand-bg pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Section */}
        <div className="mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="text-[#ff751f] font-bold uppercase tracking-[0.2em] text-sm mb-4 block"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-brand-text max-w-3xl leading-tight"
          >
            Real stories from real users who transformed their analytics.
          </motion.h2>
        </div>

        {/* Mobile View: Horizontal Auto-Scrolling Ticker */}
        <MobileTestimonials items={TESTIMONIALS} />

        {/* Desktop View: Vertical Ticker Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 relative">

          {/* Vertical Columns */}
          <TickerColumn items={TESTIMONIALS.slice(0, 3)} duration={40} />
          <TickerColumn items={TESTIMONIALS.slice(3, 6)} reverse duration={35} />
          <TickerColumn items={TESTIMONIALS.slice(6, 9)} duration={45} className="hidden lg:block" />

          {/* Gradient Masks for Fade Out */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
        </div>

        {/* Bottom Bar Metrics */}
        <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-black/5 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-8 relative">
          <div className="flex flex-wrap gap-x-10 gap-y-6 md:gap-12">
            <div>
              <div className="text-3xl font-bold text-brand-text flex items-baseline">
                <AnimatedNumber value="100" />
                <span>+</span>
              </div>
              <div className="text-sm text-gray-500 font-medium">Verified Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-text flex items-baseline">
                <AnimatedNumber value="24" />
                <span>/7</span>
              </div>
              <div className="text-sm text-gray-500 font-medium">Customer Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-text flex items-baseline">
                <AnimatedNumber value="99" />
                <span>%</span>
              </div>
              <div className="text-sm text-gray-500 font-medium">Client Satisfaction</div>
            </div>
          </div>

          <button
            onClick={handleWaitlistOpen}
            className="bg-[#ff751f] text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-[#ff751f]/20"
          >
            Start Your Own Story
          </button>
        </div>
      </div>
    </section>
  );
};
