
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ArrowRight, Loader2, Linkedin, Twitter, Instagram, CheckCircle2, Copy, Share2, Star, User, Clock } from 'lucide-react';
import { usePostHog } from '@posthog/react';
import { Button } from './ui/Button';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier?: string;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose, tier = 'Pro System' }) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [waitlistData, setWaitlistData] = useState<{ position: number; referralCode: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [referredBy, setReferredBy] = useState<string | null>(null);
  const posthog = usePostHog();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) setReferredBy(ref);
  }, []);

  // Prevent background elements from showing when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-active');
    } else {
      document.body.classList.remove('modal-active');
    }
    return () => document.body.classList.remove('modal-active');
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/join-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, fullName, tier, referredBy }),
      });
      
      const data = await response.json();
      if (data.success) {
        setWaitlistData({ position: data.position, referralCode: data.referralCode });
        setSuccess(true);
        posthog?.capture('waitlist_joined', {
          email,
          tier,
          position: data.position
        });
      } else {
        alert(data.error || 'Failed to join waitlist');
      }
    } catch (error) {
      console.error('Waitlist error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyReferral = () => {
    if (!waitlistData) return;
    const link = `${window.location.origin}?ref=${waitlistData.referralCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 0.75, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative w-full ${success ? 'max-w-sm' : 'max-w-md'} bg-white rounded-[1.75rem] md:rounded-[2rem] overflow-hidden shadow-2xl border border-white/20 transition-all duration-300`}
          >
            {/* Header branding */}
            <div className="bg-brand-bg p-6 md:p-8 text-brand-text relative border-b border-gray-100">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex flex-col items-center text-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center border border-brand-orange/20 shadow-sm relative group">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <svg 
                      viewBox="0 0 100 100" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="w-8 h-8 text-[#ff751f]"
                    >
                      <rect x="41" y="10" width="18" height="80" rx="4" fill="currentColor" />
                      <rect x="41" y="10" width="18" height="80" rx="4" fill="currentColor" transform="rotate(60 50 50)" />
                      <rect x="41" y="10" width="18" height="80" rx="4" fill="currentColor" transform="rotate(120 50 50)" />
                    </svg>
                  </motion.div>
                </div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">KineticOS Waitlist</h2>
              </div>
              
              {!success ? (
                <div className="flex justify-center">
                  <p className="text-gray-500 text-[13px] md:text-sm leading-relaxed max-w-sm text-center font-medium">
                    Join the exclusive list of operators scaling their business without the chaos. You're joining for the <span className="text-[#ff751f] font-bold">{tier}</span> tier.
                  </p>
                </div>
              ) : (
                <div className="flex justify-center text-center">
                  <p className="text-[#ff751f] font-bold text-[12px] md:text-[13px] tracking-tight leading-relaxed">
                    You're in!<br />
                    Welcome to the future of high-velocity operations.
                  </p>
                </div>
              )  }
            </div>

            <div className="p-6 md:p-10 bg-white relative">
              {!success ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-end px-1">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Full Name</label>
                    </div>
                    <div className="relative group/input">
                      <div className="absolute inset-y-4 left-4 flex items-center pr-4 border-r border-gray-100 group-focus-within/input:border-[#ff751f]/30 transition-colors">
                        <User className="w-5 h-5 text-gray-400 group-focus-within/input:text-[#ff751f] transition-colors" />
                      </div>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-16 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50/30 focus:bg-white focus:border-[#ff751f] focus:ring-8 focus:ring-[#ff751f]/5 transition-all outline-none font-semibold text-gray-900 placeholder:text-gray-300 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-end px-1">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Work Email</label>
                    </div>
                    <div className="relative group/input">
                      <div className="absolute inset-y-4 left-4 flex items-center pr-4 border-r border-gray-100 group-focus-within/input:border-[#ff751f]/30 transition-colors">
                        <Mail className="w-5 h-5 text-gray-400 group-focus-within/input:text-[#ff751f] transition-colors" />
                      </div>
                      <input
                        required
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-16 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50/30 focus:bg-white focus:border-[#ff751f] focus:ring-8 focus:ring-[#ff751f]/5 transition-all outline-none font-semibold text-gray-900 placeholder:text-gray-300 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      fullWidth
                      disabled={loading}
                      className="py-4 text-base shadow-xl shadow-[#ff751f]/25 rounded-2xl font-bold uppercase tracking-widest"
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Reserve My Spot"}
                    </Button>
                  </div>

                  <div className="pt-4 border-t border-gray-50 flex flex-col items-center gap-4">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Follow the Journey</p>
                    <div className="flex gap-4">
                      <a href="https://www.instagram.com/unik.build/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white transition-all border border-pink-100">
                        <Instagram className="w-5 h-5" />
                      </a>
                      <a href="https://www.linkedin.com/in/nikhil-mishra047/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all border border-blue-100">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href="https://x.com/unik_47" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-gray-50 text-gray-900 hover:bg-black hover:text-white transition-all border border-gray-200">
                        <Twitter className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col items-center text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-sm mx-auto">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center border border-green-100">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">Hey {fullName}! 👋</h3>
                        <p className="text-gray-500 text-[13px] font-medium leading-relaxed">
                          Thank you for joining our journey.<br />
                          We're excited to have you onboard!
                        </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-brand-bg border border-brand-orange/10 text-center relative overflow-hidden shadow-sm">
                      <div className="absolute top-0 right-0 p-2 opacity-5">
                         <Star className="w-7 h-7 text-brand-orange" />
                      </div>
                      <p className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.2em] mb-2">A message from Founder</p>
                      <p className="text-[12px] text-gray-700 leading-relaxed font-heading">
                        "Welcome to KineticOS! I built this system to help operators like you scale without the chaos. You're now on the list to get early access and exclusive pre-launch bonuses within the next 24-48 hours. I'll reach out personally when your spot opens up."
                      </p>
                    </div>
                    
                    <div className="pt-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            <Clock className="w-3 h-3" />
                            Next Update: Coming Soon
                        </div>
                    </div>
                  </div>

                  <div className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between gap-4">
                    <code className="text-[10px] font-mono text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                      {window.location.origin}?ref={waitlistData?.referralCode}
                    </code>
                    <button 
                      onClick={copyReferral}
                      className="shrink-0 p-2 rounded-xl bg-white border border-gray-200 text-[#ff751f] hover:bg-[#ff751f] hover:text-white transition-all shadow-sm"
                    >
                      {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="w-full flex gap-3">
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => window.open(`https://twitter.com/intent/tweet?text=I%20just%20joined%20the%20waitlist%20for%20KineticOS!%20Check%20it%20out:%20${window.location.origin}?ref=${waitlistData?.referralCode}`, '_blank')}
                      className="py-2.5 text-xs border-gray-200 hover:bg-black hover:text-white transition-all"
                    >
                      <Twitter className="w-3.5 h-3.5 mr-2" /> Share
                    </Button>
                    <Button
                      variant="primary"
                      fullWidth
                      onClick={onClose}
                      className="py-2.5 text-xs"
                    >
                      Done
                    </Button>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-50 w-full flex flex-col items-center gap-3">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Follow the Journey</p>
                    <div className="flex gap-3">
                      <a href="https://www.instagram.com/unik.build/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white transition-all border border-pink-100">
                        <Instagram className="w-4 h-4" />
                      </a>
                      <a href="https://www.linkedin.com/in/nikhil-mishra047/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all border border-blue-100">
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a href="https://x.com/unik_47" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-50 text-gray-900 hover:bg-black hover:text-white transition-all border border-gray-200">
                        <Twitter className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    You'll receive a personal invite when your spot opens.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
