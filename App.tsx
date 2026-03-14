
import React, { useState, useEffect, useRef } from 'react';
// Shadow motion to bypass environment-specific type errors with framer-motion props
import { motion as motionBase, AnimatePresence } from 'framer-motion';
const motion = motionBase as any;
import {
  Menu,
  X,
  Play,
  AlertCircle,
  BarChart3,
  Eye,
  Sparkles,
  Layout,
  Scale,
  Users,
  DollarSign,
  HelpCircle,
  List,
  Star,
  ChevronRight // Added ChevronRight for the menu items
} from 'lucide-react';
import Lenis from 'lenis';

import { Button } from './components/ui/Button';
import { Hero } from './components/Hero';
import { VideoSection } from './components/VideoSection';
import { UserStoriesSection } from './components/UserStoriesSection';
import { SolutionSection } from './components/SolutionSection';
import { Comparison } from './components/Comparison';
import { PricingSection } from './components/PricingSection';
import { PostPurchaseSection } from './components/PostPurchaseSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { StickyCTA } from './components/StickyCTA';
import { ProblemSolutionComparison } from './components/ProblemSolutionComparison';
import { VisualProblemSolution } from './components/VisualProblemSolution';
import { FAQSection } from './components/FAQSection';
import { FeatureTickerSection } from './components/FeatureTickerSection';
import { ClientAchievementSection } from './components/ClientAchievementSection';
import { ComparisonMatrixSection } from './components/ComparisonMatrixSection';
import { ChatWidget } from './components/ChatWidget';

const AsteriskLogo = ({ className = "w-5 h-5" }: { className?: string }) => (
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

const NAV_ITEMS = [
  { id: 'video-tour', label: 'Dashboard Preview', icon: Play },
  { id: 'testimonials', label: 'User Reviews', icon: Star },
  { id: 'problem', label: 'Problems & Solution', icon: AlertCircle },
  { id: 'results', label: 'Impact Matrix', icon: BarChart3 },
  { id: 'problem-awareness', label: 'The Pain Points', icon: Eye },
  { id: 'user-stories', label: 'Transformations', icon: Sparkles },
  { id: 'solution', label: 'Know Your Dashboards', icon: Layout },
  { id: 'comparison-matrix', label: 'Market Comparison', icon: Scale },
  { id: 'tale-of-freelancers', label: 'Tale of Freelancers', icon: Users },
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
  { id: 'faq', label: 'FAQs', icon: HelpCircle },
];

function App() {
  const [showNav, setShowNav] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(32);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Store Lenis instance in a ref to use it for programmatic scrolling
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with "Framer-like" physics settings
    const lenis = new Lenis({
      duration: 1.5, // Increased from 1.2 for more "weight"
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      touchMultiplier: 2.0, // More responsive touch
    });

    lenisRef.current = lenis;

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Clean up to prevent double-loops or errors on unmount
    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Threshold set to roughly the end of the hero section
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Sync side nav visibility with StickyCTA (appears after 600px scroll)
      setShowSideNav(scrollY > 600);

      // Footer Collision Logic
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // If the top of the footer is above the bottom of the viewport
        if (footerRect.top < windowHeight) {
          // Move up
          setBottomOffset(Math.max(32, (windowHeight - footerRect.top) + 32));
        } else {
          setBottomOffset(32);
        }
      }

      if (scrollY > heroHeight * 0.8) {
        setIsPastHero(true);
      } else {
        setIsPastHero(false);
      }

      // Scroll Spy Logic - Enhanced for better accuracy
      // Use a center-screen trigger point for better "active" detection during scroll
      const triggerPoint = window.innerHeight * 0.3;

      let currentSectionId = '';

      // Iterate backwards to find the last section that has passed the trigger point
      // This is often more reliable for stacked sections
      for (const item of NAV_ITEMS) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is above the trigger point (within view or passed)
          // AND the bottom is still in view or below
          if (rect.top <= triggerPoint + 100 && rect.bottom > triggerPoint) {
            currentSectionId = item.id;
          }
        }
      }

      if (currentSectionId) {
        setActiveSection(currentSectionId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to check initial scroll position
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);

    const element = document.getElementById(id);
    if (element) {
      if (lenisRef.current) {
        // Use Lenis scroll if available for consistent momentum
        lenisRef.current.scrollTo(element, {
          offset: 0,
          duration: 1.8 // Slower programmatic scroll for luxury feel
        });
      } else {
        // Fallback
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.8 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text selection:bg-brand-orange/20 selection:text-brand-orange relative">

      {/* Mobile Menu Bottom Sheet - UPDATED UI */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-[4px] transition-all duration-300"
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-[61] bg-[#fffff5] rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-white/50 overflow-hidden flex flex-col max-h-[85vh] w-full max-w-lg mx-auto"
            >
              {/* Drag Handle */}
              <div className="w-full flex justify-center pt-4 pb-2 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="w-12 h-1.5 rounded-full bg-gray-200" />
              </div>

              {/* Header */}
              <div className="px-8 pb-6 flex items-center justify-between border-b border-gray-100">
                <span className="text-xl font-bold text-brand-text flex items-center gap-2">
                  <AsteriskLogo className="w-5 h-5 text-[#ff751f]" />
                  Menu
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable List */}
              <div className="flex-1 overflow-y-auto px-6 py-4 pb-24 scrollbar-hide">
                <div className="grid gap-2.5">
                  {NAV_ITEMS.map((item, idx) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      onClick={() => scrollToSection(item.id)}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-black/5 hover:border-[#ff751f]/30 active:scale-[0.98] transition-all group shadow-sm hover:shadow-md"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-50 group-hover:bg-[#ff751f]/10 flex items-center justify-center text-gray-400 group-hover:text-[#ff751f] transition-colors shrink-0">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="text-base font-medium text-gray-600 group-hover:text-brand-text flex-1 text-left">{item.label}</span>
                      <div className="text-gray-300 group-hover:text-[#ff751f] group-hover:translate-x-1 transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sticky Navbar (Top) - Refined for Mobile Centering */}
      <AnimatePresence>
        {showNav && (
          <div className="fixed top-6 md:top-8 left-0 right-0 z-50 flex justify-center px-4 md:px-8 pointer-events-none">
            <motion.nav
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              // Changed width classes: w-auto on mobile to shrink-wrap the logo
              className={`glass-nav rounded-full flex items-center transition-all duration-500 pointer-events-auto ${isPastHero ? 'px-6 py-3 w-auto md:w-auto' : 'pl-6 pr-2 py-2 md:pl-6 md:pr-1.5 md:py-1.5'}`}
            >
              <div className="flex items-center gap-6 md:gap-0 w-full justify-center md:justify-between">

                {/* Brand Logo Section */}
                <div
                  className="flex items-center gap-2.5 cursor-pointer group shrink-0"
                  onClick={scrollToTop}
                >
                  <AsteriskLogo className="w-5 h-5 text-[#ff751f]" />
                  <span className="text-[#ff751f] text-[17px] font-bold tracking-tight leading-none">KineticOS</span>
                </div>

                {/* Right Side Actions - Hidden completely on mobile to maintain center alignment of logo */}
                <div className="hidden md:flex items-center gap-3">
                  {/* Brand Orange CTA Button - Disappears after Hero on Desktop */}
                  <AnimatePresence>
                    {!isPastHero && (
                      <motion.div
                        initial={{ opacity: 0, width: 0, x: 20, marginLeft: 0 }}
                        animate={{
                          opacity: 1,
                          width: 'auto',
                          x: 0,
                          marginLeft: '2rem', // Equivalent to md:gap-8 (32px)
                          transition: { type: "spring", stiffness: 300, damping: 30 }
                        }}
                        exit={{
                          opacity: 0,
                          width: 0,
                          x: 20,
                          marginLeft: 0, // Collapse spacing completely
                          transition: { duration: 0.3, ease: "easeInOut" }
                        }}
                        className="flex overflow-hidden"
                      >
                        <button
                          onClick={() => scrollToSection('pricing')}
                          className="flex items-center justify-center bg-[#ff751f] text-white px-6 py-2.5 rounded-full hover:bg-[#e6641a] transition-all active:scale-95 shadow-sm whitespace-nowrap"
                        >
                          <span className="text-[13px] font-bold tracking-tight">
                            Get Early Access
                          </span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>

      {/* Floating TOC Trigger & Menu (Desktop) - REFINED INTERACTION */}
      <AnimatePresence>
        {showSideNav && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ bottom: bottomOffset }}
            className="fixed left-6 z-50 hidden md:flex flex-col items-start gap-3"
          >
            {/* Expanded Menu - Compact Aesthetic Design */}
            <AnimatePresence>
              {isSideMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95, height: 0 }}
                  animate={{ opacity: 1, y: 0, scale: 1, height: 'auto' }}
                  exit={{ opacity: 0, y: 10, scale: 0.95, height: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="bg-white/95 backdrop-blur-xl border border-white/40 shadow-[0_10px_40px_rgba(0,0,0,0.15)] rounded-2xl p-1.5 mb-2 flex flex-col min-w-[220px] origin-bottom-left"
                >
                  <div className="flex flex-col gap-0.5 overflow-hidden">
                    {NAV_ITEMS.map((item) => {
                      const isActive = activeSection === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            scrollToSection(item.id);
                          }}
                          className={`
                            flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all duration-200 group relative
                            ${isActive ? 'text-[#ff751f] bg-[#ff751f]/5 font-semibold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/80 font-medium'}
                          `}
                        >
                          <item.icon className={`w-3.5 h-3.5 transition-colors ${isActive ? 'text-[#ff751f]' : 'text-gray-400 group-hover:text-gray-600'}`} />
                          <span className="text-[13px] tracking-tight">{item.label}</span>
                          {isActive && (
                            <motion.div
                              layoutId="activeDot"
                              className="absolute right-3 w-1.5 h-1.5 rounded-full bg-[#ff751f]"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toggle Button */}
            <button
              onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
              className={`
                group h-12 w-12 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/50 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95
                ${isSideMenuOpen ? 'bg-[#ff751f] text-white rotate-90' : 'bg-white/90 text-gray-700 hover:text-[#ff751f]'}
              `}
              aria-label="Toggle Table of Contents"
            >
              {isSideMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <List className="w-5 h-5" />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <Hero onReady={() => setShowNav(true)} />

        <AnimatePresence>
          {showNav && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <FeatureTickerSection />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Tour (Preview) */}
        <div id="video-tour" className="scroll-mt-40">
          <VideoSection />
        </div>

        {/* User Reviews */}
        <div id="testimonials" className="scroll-mt-40">
          <TestimonialsSection />
        </div>

        {/* Visual Problem Solution Card (The Problem Section) */}
        <div id="problem" className="scroll-mt-40">
          <VisualProblemSolution />
        </div>

        {/* Client Achievement Metrics (Impact Matrix) */}
        <div id="results" className="scroll-mt-40">
          <ClientAchievementSection />
        </div>

        {/* Problem Awareness */}
        <div id="problem-awareness" className="scroll-mt-40">
          <ProblemSolutionComparison />
        </div>

        {/* Transformations */}
        <div id="user-stories" className="scroll-mt-40">
          <UserStoriesSection />
        </div>

        {/* Solution Section */}
        <div id="solution" className="scroll-mt-40">
          <SolutionSection />
        </div>

        {/* Market Comparison */}
        <div id="comparison-matrix" className="scroll-mt-40">
          <ComparisonMatrixSection />
        </div>

        {/* Tale of Freelancers */}
        <div id="tale-of-freelancers" className="scroll-mt-40">
          <Comparison />
        </div>

        {/* Pricing */}
        <div id="pricing" className="scroll-mt-40">
          <PricingSection />
        </div>

        {/* Post Purchase Steps */}
        <PostPurchaseSection />

        {/* FAQs */}
        <div id="faq" className="scroll-mt-40">
          <FAQSection />
        </div>

        <Footer />
      </main>

      <StickyCTA onToggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      <ChatWidget />
    </div>
  );
}

export default App;
