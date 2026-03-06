
import React, { useState } from 'react';
// Shadow motion to bypass environment-specific type errors with framer-motion props
import { motion as motionBase, AnimatePresence } from 'framer-motion';
const motion = motionBase as any;
import { ChevronDown, HelpCircle, ArrowRight, Clock, Check, X, MessageSquare } from 'lucide-react';
import { SupportFormModal } from './SupportFormModal';

const FAQS = [
  {
    question: "What is KineticOS?",
    answer: "KineticOS is a complete Notion-based operating system for freelance businesses. It replaces 8+ disconnected tools (Trello, QuickBooks, Google Sheets, Calendly) with one integrated dashboard that shows what needs to be done today, where every client project stands, and how much money you're making all in 3 seconds."
  },
  {
    question: "Who is KineticOS built for?",
    answer: (
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 text-green-600 stroke-[3px]" />
            </div>
            <div>
              <span className="font-bold text-gray-900 block mb-1">Established Freelancers & Small Agencies</span>
              <span className="text-sm text-gray-500">2-6 people teams managing 5-12 active clients and earning $50K-$150K annually.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 text-green-600 stroke-[3px]" />
            </div>
            <div>
              <span className="font-bold text-gray-900 block mb-1">System Seekers</span>
              <span className="text-sm text-gray-500">Those losing 10-15 hours weekly to admin chaos and ready to commit to ONE integrated system.</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-gray-50 border border-gray-100 flex gap-4">
          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mt-0.5">
            <X className="w-3.5 h-3.5 text-gray-500 stroke-[3px]" />
          </div>
          <div>
            <span className="font-bold text-gray-900 block mb-1 text-xs uppercase tracking-wider">Not Designed For</span>
            <p className="text-sm text-gray-500 leading-relaxed">
              Brand new freelancers (0-2 clients) or large agencies (10+ people) needing enterprise ERP solutions.
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    question: "Do I need Notion experience?",
    answer: "Basic Notion knowledge helps, but it's not required. If you can use Google Sheets or Trello, you can use KineticOS. Our 40-page setup guide walks you through everything step-by-step. Most users are fully operational in 30-60 minutes."
  },
  {
    question: "How long does setup take?",
    answer: (
      <div className="flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100"
        >
          <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-[#ff751f] shadow-sm shrink-0">
            <span className="font-bold text-xl">42m</span>
          </div>
          <div>
            <div className="font-bold text-gray-900 text-sm">Average Setup Time</div>
            <div className="text-xs text-gray-500 leading-snug">From purchase to fully operational. If you're not live in 60m, we extend support for free.</div>
          </div>
        </motion.div>

        <div className="relative pl-2">
          {/* Connecting Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute left-[5px] top-3 bottom-8 w-0.5 bg-gray-100 origin-top"
          />

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-3 h-3 rounded-full bg-gray-300 border-2 border-white absolute left-0 top-1.5 z-10"
              />
              <div className="pl-8">
                <div className="font-bold text-gray-900 text-sm leading-none">Duplicate Dashboard</div>
                <div className="text-xs text-gray-500 mt-1">Instant copy to your workspace</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="w-3 h-3 rounded-full bg-gray-300 border-2 border-white absolute left-0 top-1.5 z-10"
              />
              <div className="pl-8">
                <div className="font-bold text-gray-900 text-sm leading-none">Watch Walkthrough</div>
                <div className="text-xs text-gray-500 mt-1">Guided video setup (10-15 min)</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="relative"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="w-3 h-3 rounded-full bg-gray-300 border-2 border-white absolute left-0 top-1.5 z-10"
              />
              <div className="pl-8">
                <div className="font-bold text-gray-900 text-sm leading-none">Input Data</div>
                <div className="text-xs text-gray-500 mt-1">Add clients & active projects</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="relative"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.1, type: "spring" }}
                className="w-4 h-4 rounded-full bg-[#ff751f] border-2 border-white absolute left-[-2px] top-1 z-10 shadow-md shadow-brand-orange/30"
              />
              <div className="pl-8">
                <div className="font-bold text-[#ff751f] text-sm leading-none">System Live</div>
                <div className="text-xs text-gray-500 mt-1">Customize & scale</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  },
  {
    question: "What results can I expect?",
    answer: (
      <div className="flex flex-col gap-6">
        <div>
          <p className="font-medium text-gray-600 mb-4 leading-relaxed">Based on 100 active users:</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50/50 border border-green-100 p-4 rounded-2xl">
              <div className="text-2xl font-bold text-green-600 mb-1">15h+</div>
              <div className="text-xs font-bold text-green-800 uppercase tracking-wide">Weekly Time Saved</div>
            </div>
            <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl">
              <div className="text-2xl font-bold text-blue-600 mb-1">+$33k</div>
              <div className="text-xs font-bold text-blue-800 uppercase tracking-wide">Yearly Revenue</div>
            </div>
          </div>
        </div>

        <div>
          <p className="font-bold text-gray-900 mb-3 text-xs uppercase tracking-widest">Adoption Timeline</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 p-4 bg-gray-50 rounded-2xl border border-gray-100 min-w-0">
              <div className="text-[#ff751f] font-bold text-xs uppercase mb-1">Week 1</div>
              <div className="font-bold text-gray-900 text-sm leading-tight">Recover 2-5 Hours</div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-300 shrink-0" />
            <div className="flex-1 p-4 bg-gray-900 rounded-2xl border border-gray-800 min-w-0 shadow-lg shadow-gray-200">
              <div className="text-[#ff751f] font-bold text-xs uppercase mb-1">Week 3</div>
              <div className="font-bold text-white text-sm leading-tight">Full 10-15 Hours</div>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-3 text-center italic">* Results based on consistent system usage.</p>
        </div>
      </div>
    )
  },
  {
    question: "KineticOS vs Other PM Tools",
    answer: (
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm md:text-base mb-6 min-w-[500px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="pb-3 font-bold text-gray-900 w-[30%]">Feature</th>
              <th className="pb-3 font-bold text-[#ff751f] w-[35%]">KineticOS</th>
              <th className="pb-3 font-bold text-gray-400 w-[35%]">Asana / ClickUp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-3 font-medium text-gray-900">Primary Scope</td>
              <td className="py-3 text-gray-700 font-medium">Entire Business OS</td>
              <td className="py-3 text-gray-500">Tasks Only</td>
            </tr>
            <tr>
              <td className="py-3 font-medium text-gray-900">Capabilities</td>
              <td className="py-3 text-gray-700">CRM + Finance + Ops</td>
              <td className="py-3 text-gray-500">Task Management</td>
            </tr>
            <tr>
              <td className="py-3 font-medium text-gray-900">3-Year Cost</td>
              <td className="py-3 font-bold text-green-600">$247 (One-time)</td>
              <td className="py-3 text-red-400">$1,080+ (Monthly Fees)</td>
            </tr>
            <tr>
              <td className="py-3 font-medium text-gray-900">Tool Switching</td>
              <td className="py-3 text-gray-700">Zero (All-in-one)</td>
              <td className="py-3 text-gray-500">High (Need ext. apps)</td>
            </tr>
          </tbody>
        </table>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          Traditional PM tools only manage tasks. KineticOS manages your entire business—CRM, financial tracking, content calendars, marketing ROI, client relationships, and strategic operations. Plus, you save 12 hours/week by eliminating constant tool-switching.
        </p>
      </div>
    )
  },
  {
    question: "Starter ($97) vs Pro ($247)?",
    answer: (
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <span className="font-bold text-gray-900 shrink-0 min-w-[60px]">Starter:</span>
          <span>If you manage 3-5 clients and only need core CRM + tasks + finances.</span>
        </div>
        <div className="flex gap-3">
          <span className="font-bold text-[#ff751f] shrink-0 min-w-[60px]">Pro:</span>
          <span>If you manage 6+ clients and need content planning, marketing tracking, and the complete system. 73% choose Pro because it includes all 6 headquarters, video tutorials, priority support, and pays for itself in recovered time within 2 weeks.</span>
        </div>
      </div>
    )
  }
];

interface FAQItemProps {
  question: string;
  answer: string | React.ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, toggle }) => {
  return (
    <div className={`mb-4 transition-all duration-500 ${isOpen ? 'scale-[1.01]' : 'scale-100'}`}>
      <button
        onClick={toggle}
        className={`w-full text-left p-6 md:p-8 rounded-[1.5rem] transition-all duration-300 flex items-center justify-between gap-4 border ${isOpen
          ? 'bg-white border-[#ff751f] shadow-xl shadow-brand-orange/5'
          : 'bg-white/60 border-black/5 hover:border-black/10 hover:bg-white'
          }`}
      >
        <div className="flex items-center gap-4">
          <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isOpen ? 'bg-[#ff751f] text-white' : 'bg-gray-100 text-gray-400'}`}>
            <HelpCircle className="w-4 h-4" />
          </div>
          <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-brand-text' : 'text-gray-700'}`}>
            {question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={isOpen ? 'text-[#ff751f]' : 'text-gray-300'}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="p-8 md:p-10 pt-2 text-gray-600 leading-relaxed text-base border-x border-b border-[#ff751f]/10 bg-white/30 rounded-b-[1.5rem] -mt-4 mx-4">
              <div className="pt-6 border-t border-black/5">
                {answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  return (
    <section className="pt-16 md:pt-24 pb-16 md:pb-40 relative overflow-hidden px-6 md:px-12 lg:px-24 bg-brand-bg">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 translate-y-1/2" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="text-[#ff751f] font-bold uppercase tracking-[0.2em] text-xs mb-4 block"
          >
            Common Questions
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="text-4xl md:text-5xl font-medium text-brand-text tracking-tight"
          >
            Don't Guess. <br />
            <span className="inline-block mt-2 px-4 py-1 bg-[#ff751f]/10 text-[#ff751f] rounded-lg">
              Get Answers in 60 Seconds.
            </span>
          </motion.h2>
        </div>

        <div className="space-y-2">
          {FAQS.map((faq, idx) => (
            <FAQItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              toggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center p-8 glass-panel rounded-3xl border-dashed border-gray-200"
        >
          <p className="text-gray-500 font-medium mb-4">Still have questions? <br /> We're here to help.</p>
          <button
            onClick={() => setIsSupportModalOpen(true)}
            className="inline-flex items-center gap-2 text-[#ff751f] font-bold hover:gap-3 transition-all underline underline-offset-4"
          >
            <MessageSquare className="w-5 h-5" />
            Chat with our support team
          </button>
        </motion.div>

        <SupportFormModal
          isOpen={isSupportModalOpen}
          onClose={() => setIsSupportModalOpen(false)}
        />
      </div>
    </section>
  );
};
