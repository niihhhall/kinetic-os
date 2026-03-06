
import React, { useState } from 'react';
// Shadow motion to bypass environment-specific type errors with framer-motion props
import { motion as motionBase } from 'framer-motion';
const motion = motionBase as any;
import { Check, Zap, RefreshCw, Lock, Database, Loader2, Star, ShieldCheck } from 'lucide-react';
import { Button } from './ui/Button';
import { CountdownTimer } from './CountdownTimer';
import { PRICING_TIERS } from '../constants';

const TransformationItem = ({ icon, text }: { icon: string, text: string }) => (
  <div className="flex items-start gap-3 text-sm text-gray-600">
    <span className="shrink-0 mt-0.5 text-base">{icon}</span>
    <span className="font-medium leading-tight">{text}</span>
  </div>
);

const FeatureItem: React.FC<{ text: string; subtext?: string; highlight?: boolean }> = ({ text, subtext, highlight }) => (
  <div className="flex items-start gap-3 text-sm">
    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${highlight ? 'bg-[#ff751f]/10 text-[#ff751f]' : 'bg-gray-100 text-gray-400'}`}>
      <Check className={`w-3 h-3 stroke-[3px]`} />
    </div>
    <div>
      <span className={highlight ? 'text-gray-900 font-bold' : 'text-gray-600 font-medium'}>{text}</span>
      {subtext && <div className="text-gray-400 text-xs mt-0.5 leading-snug font-medium">{subtext}</div>}
    </div>
  </div>
);

export const PricingSection: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    setLoading(priceId);
    try {
      // Simulate API call for demo purposes if backend not running
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert("This would open Stripe Checkout in production.");
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(null);
    }
  };

  const starterTier = PRICING_TIERS[0];
  const proTier = PRICING_TIERS[1];
  const vipTier = PRICING_TIERS[2];

  return (
    <section id="pricing" className="pt-20 md:pt-32 pb-20 md:pb-32 bg-brand-bg relative overflow-hidden px-6 md:px-12 lg:px-24">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-[11px] font-bold uppercase tracking-widest mb-6"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Launch Offer Ends Soon</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-medium mb-8 text-brand-text leading-tight tracking-tight"
          >
            Choose Your Operating <br className="hidden md:block" /> System Upgrade
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <div className="bg-white px-6 py-3 rounded-2xl border border-black/5 shadow-sm flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" style={{ backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})`, backgroundSize: 'cover' }} />
                ))}
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Join 127 Freelancers</div>
                <div className="text-sm font-bold text-brand-text">27 Spots Left at Launch Price</div>
              </div>
            </div>

            <div className="w-px h-10 bg-black/5 hidden md:block" />

            <div className="scale-90 origin-center">
              <CountdownTimer compact />
            </div>
          </motion.div>
        </div>

        {/* Pricing Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-center max-w-7xl mx-auto mb-24">

          {/* LEFT CARD: Solo Freelancer */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-[2rem] border border-gray-200 p-8 xl:p-10 flex flex-col h-full relative group hover:border-gray-300 transition-colors"
          >
            {/* Header Zone */}
            <div className="mb-8 min-h-[180px]">
              <h3 className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs mb-4">Solo Freelancer</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-bold text-brand-text tracking-tighter">${starterTier.price}</span>
                <span className="text-xl text-gray-400 line-through font-medium opacity-60">${starterTier.originalPrice}</span>
              </div>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                Perfect for organizing your first 3-5 clients and getting paid faster.
              </p>
            </div>

            {/* Features Zone */}
            <div className="space-y-4 mb-8 flex-1">
              <div className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">What you get:</div>
              <FeatureItem text="Main Dashboard" />
              <FeatureItem text="3 Core Headquarters" subtext="Business, Productivity, Finance" />
              <FeatureItem text="8 Essential Databases" />
              <FeatureItem text="Setup Guide (PDF)" />
              <FeatureItem text="Email Support" />
            </div>

            {/* Outcome Zone */}
            <div className="bg-gray-50 rounded-xl p-5 mb-8 border border-gray-100">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" /> ROI Outcome
              </div>
              <TransformationItem icon="⏱️" text="Recover 5 hrs/week" />
              <TransformationItem icon="💰" text="Replace $408/yr in tools" />
            </div>

            {/* CTA Zone */}
            <div className="mt-auto">
              <Button
                variant="outline"
                fullWidth
                onClick={() => handleCheckout(starterTier.stripePriceId)}
                disabled={!!loading}
                className="hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300"
              >
                {loading === starterTier.stripePriceId ? <Loader2 className="w-5 h-5 animate-spin" /> : `Get Starter — $${starterTier.price}`}
              </Button>
            </div>
          </motion.div>

          {/* CENTER CARD: Power Freelancer (HERO) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[2.5rem] border-2 border-[#ff751f] p-8 xl:p-12 flex flex-col h-full relative shadow-2xl shadow-orange-500/15 lg:-my-8 lg:py-16 z-10"
          >
            {/* Most Popular Badge */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#ff751f] text-white px-6 py-2 rounded-full shadow-lg shadow-orange-500/30 flex items-center gap-2">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-bold uppercase tracking-widest">Most Popular</span>
            </div>

            {/* Header Zone */}
            <div className="mb-8 min-h-[180px] text-center lg:text-left">
              <h3 className="text-[#ff751f] font-bold uppercase tracking-[0.2em] text-xs mb-4">Power Freelancer</h3>
              <div className="flex items-baseline gap-3 mb-4 justify-center lg:justify-start">
                <span className="text-6xl lg:text-7xl font-bold text-brand-text tracking-tighter">${proTier.price}</span>
                <span className="text-2xl text-gray-300 line-through font-medium">${proTier.originalPrice}</span>
              </div>
              <div className="inline-block bg-[#ff751f]/10 text-[#ff751f] text-[11px] font-bold px-3 py-1.5 rounded-lg border border-[#ff751f]/20 uppercase tracking-widest mb-4">
                Save ${proTier.originalPrice - proTier.price} — Limited Time
              </div>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                The complete system to scale to $10k+ months without burnout.
              </p>
            </div>

            {/* Features Zone */}
            <div className="space-y-5 mb-10 flex-1">
              <div className="text-xs font-bold text-brand-text uppercase tracking-widest mb-2 flex items-center gap-2">
                Everything in Starter, plus:
              </div>
              <FeatureItem text="3 Growth Headquarters" subtext="Marketing, Social, Clients" highlight />
              <FeatureItem text="Master Calendar View" highlight />
              <FeatureItem text="7 Advanced Data Views" highlight />
              <FeatureItem text="Video Course (12 Modules)" highlight />
              <FeatureItem text="Priority 24h Support" highlight />
            </div>

            {/* Outcome Zone */}
            <div className="bg-orange-50 rounded-2xl p-6 mb-10 border border-orange-100">
              <div className="text-[10px] font-bold text-[#ff751f] uppercase tracking-widest mb-3 flex items-center gap-2">
                <Zap className="w-3 h-3 fill-current" /> ROI Outcome
              </div>
              <div className="space-y-3">
                <TransformationItem icon="🚀" text="Recover 15 hrs/week" />
                <TransformationItem icon="📈" text="Avg User Growth: +$33k/yr" />
                <TransformationItem icon="🧘" text="Work 4 days, earn for 5" />
              </div>
            </div>

            {/* CTA Zone */}
            <div className="mt-auto">
              <Button
                variant="primary"
                fullWidth
                onClick={() => handleCheckout(proTier.stripePriceId)}
                disabled={!!loading}
                className="py-5 text-lg shadow-xl shadow-orange-500/20"
              >
                {loading === proTier.stripePriceId ? <Loader2 className="w-6 h-6 animate-spin" /> : `Get Complete System — $${proTier.price}`}
              </Button>
              <div className="text-center mt-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">30-Day Money Back Guarantee</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT CARD: Agency */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-[2rem] border border-gray-200 p-8 xl:p-10 flex flex-col h-full relative group hover:border-purple-200 transition-colors"
          >
            {/* Header Zone */}
            <div className="mb-8 min-h-[180px]">
              <h3 className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs mb-4">Agency / VIP</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-bold text-brand-text tracking-tighter">${vipTier.price}</span>
                <span className="text-xl text-gray-400 line-through font-medium opacity-60">${vipTier.originalPrice}</span>
              </div>
              <div className="inline-block bg-purple-50 text-purple-600 text-[11px] font-bold px-3 py-1.5 rounded-lg border border-purple-100 uppercase tracking-widest mb-4">
                Done-For-You Setup
              </div>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                For teams needing white-glove onboarding and custom workflows.
              </p>
            </div>

            {/* Features Zone */}
            <div className="space-y-4 mb-8 flex-1">
              <div className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">Everything in Pro, plus:</div>
              <FeatureItem text="90-Min Setup Call" />
              <FeatureItem text="Custom Workflow Audit" />
              <FeatureItem text="Team Training Docs" />
              <FeatureItem text="Founder 1:1 Support" />
              <FeatureItem text="30-Day Check-in" />
            </div>

            {/* Outcome Zone */}
            <div className="bg-purple-50 rounded-xl p-5 mb-8 border border-purple-100">
              <div className="text-[10px] font-bold text-purple-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Star className="w-3 h-3 fill-current" /> ROI Outcome
              </div>
              <TransformationItem icon="⚡" text="Live in 5 days (not 4 weeks)" />
              <TransformationItem icon="👥" text="Save $8k in onboarding costs" />
            </div>

            {/* CTA Zone */}
            <div className="mt-auto">
              <Button
                variant="outline"
                fullWidth
                onClick={() => handleCheckout(vipTier.stripePriceId)}
                disabled={!!loading}
                className="hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50"
              >
                {loading === vipTier.stripePriceId ? <Loader2 className="w-5 h-5 animate-spin" /> : `Get VIP Setup — $${vipTier.price}`}
              </Button>
            </div>
          </motion.div>

        </div>

        {/* Footer Guarantee */}
        <div className="max-w-3xl mx-auto text-center border-t border-black/5 pt-12">
          <h3 className="text-lg font-bold text-brand-text mb-8">Included with every purchase:</h3>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#ff751f]/10 flex items-center justify-center text-[#ff751f]">
                <RefreshCw className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-gray-600">Lifetime Updates</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#ff751f]/10 flex items-center justify-center text-[#ff751f]">
                <Lock className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-gray-600">Secure Payment</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#ff751f]/10 flex items-center justify-center text-[#ff751f]">
                <Database className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-gray-600">Notion Free Plan Ready</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
