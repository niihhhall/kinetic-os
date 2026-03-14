
import React, { useState, useEffect } from 'react';
// Shadow motion to bypass environment-specific type errors with framer-motion props
import { motion as motionBase, AnimatePresence } from 'framer-motion';
const motion = motionBase as any;
import { ArrowRight, Menu } from 'lucide-react';

const AsteriskLogo = ({ className = "w-4 h-4" }: { className?: string }) => (
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

interface StickyCTAProps {
  onToggleMenu?: () => void;
}

export const StickyCTA: React.FC<StickyCTAProps> = ({ onToggleMenu }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(24);

  useEffect(() => {
    const handleScroll = () => {
      // Logic: Mobile users need nav sooner (after hero title), Desktop users need it after content engages
      const isMobile = window.innerWidth < 768;
      const threshold = isMobile ? 150 : 600; 
      
      const scrolled = window.scrollY > threshold;
      setIsVisible(scrolled);

      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // If the top of the footer is above the bottom of the viewport (visible)
        if (footerRect.top < windowHeight) {
          // Move the CTA up by the amount the footer is visible + extra spacing
          setBottomOffset(Math.max(24, (windowHeight - footerRect.top) + 24));
        } else {
          setBottomOffset(24);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          style={{ bottom: bottomOffset }}
          className="fixed left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
        >
          {/* Main Floating Dock Container */}
          <div className="pointer-events-auto bg-white/85 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-full p-1.5 flex items-center gap-2 md:gap-3 transition-all duration-300 ring-1 ring-black/5 max-w-[95vw] md:max-w-auto">
            
            {/* Mobile: Menu Trigger Button (Left Aligned) */}
            <button 
              onClick={onToggleMenu}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-gray-100/50 text-gray-600 hover:bg-gray-100 hover:text-[#ff751f] transition-colors active:scale-95"
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Content Group (Logo + Text) */}
            <div 
              className="flex items-center gap-3 pl-1 md:pl-4 pr-1 md:pr-4 cursor-pointer group"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3">
                <span className="text-sm font-semibold text-brand-text flex items-center gap-2">
                  <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="hidden sm:block"
                  >
                      <AsteriskLogo className="w-3.5 h-3.5 text-[#ff751f]" />
                  </motion.div>
                  {/* Mobile Text: Shortened */}
                  <span className="md:hidden">Get KineticOS</span>
                  {/* Desktop Text: Full */}
                  <span className="hidden md:inline">Scale your business</span>
                </span>
                
                {/* Desktop Separator & Urgency */}
                <div className="hidden sm:block border-l border-gray-200 pl-3">
                  <motion.span 
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    style={{ 
                      backgroundImage: "linear-gradient(90deg, #9ca3af, #ff751f, #9ca3af)",
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}
                    className="text-[10px] font-bold uppercase tracking-wider block"
                  >
                    Reserve Your Slot
                  </motion.span>
                </div>
              </div>
            </div>
            
            {/* Primary CTA Button (Right Aligned) */}
            <button 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#ff751f] hover:bg-[#e6641a] text-white text-xs font-bold px-5 py-3 md:px-4 md:py-2.5 rounded-full transition-colors flex items-center gap-1.5 shadow-lg shadow-brand-orange/20 active:scale-95"
            >
              <span>Join the Waitlist</span>
              <ArrowRight className="w-3.5 h-3.5 md:group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
