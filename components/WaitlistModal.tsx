
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ArrowRight, Loader2, Linkedin, Twitter, CheckCircle2, Copy, Share2, Star, User } from 'lucide-react';
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
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-xl bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20"
          >
            {/* Header branding */}
            <div className="bg-[#ff751f] p-6 md:p-8 text-white relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 overflow-hidden">
                  <img src="https://kineticos.store/favicon.png" alt="" className="w-6 h-6 object-contain" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight">KineticOS Waitlist</h2>
              </div>
              
              {!success ? (
                <>
                  <p className="text-white/80 text-xs md:text-sm leading-relaxed max-w-sm">
                    Join the exclusive list of operators scaling their business without the chaos. You're joining for the <span className="text-white font-bold">{tier}</span> tier.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-white/80 text-xs md:text-sm leading-relaxed max-w-sm">
                    You're in! Welcome to the future of high-velocity operations.
                  </p>
                </>
              )}
            </div>

            <div className="p-6 md:p-10 bg-white">
              {!success ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#ff751f] transition-all outline-none font-medium text-gray-900"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Work Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        required
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#ff751f] transition-all outline-none font-medium text-gray-900"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    disabled={loading}
                    className="py-4 text-lg shadow-lg shadow-orange-500/20"
                  >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : (
                      <span className="flex items-center justify-center gap-2">
                        Reserve My Spot <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </Button>

                  <div className="pt-4 border-t border-gray-50 flex flex-col items-center gap-4">
                    <p className="text-xs text-gray-400 font-medium">Follow the development</p>
                    <div className="flex gap-4">
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
                <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center border border-green-100">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">Waitlist Position: #{waitlistData?.position}</h3>
                    <div className="p-4 rounded-xl bg-brand-bg border border-brand-orange/10 text-left relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2 opacity-10">
                         <Star className="w-8 h-8 text-brand-orange" />
                      </div>
                      <p className="text-sm font-bold text-brand-text mb-1">A message from Nikhil:</p>
                      <p className="text-xs text-gray-500 leading-relaxed italic">
                        "Welcome to KineticOS! I built this system to help operators like you scale without the chaos. You're now on the list to get early access and exclusive pre-launch bonuses. I'll reach out personally when your spot opens up."
                      </p>
                    </div>
                    <p className="text-gray-500 text-xs md:text-sm max-w-xs mx-auto">
                      Want to skip the line? Refer 2 friends and move up the list instantly.
                    </p>
                  </div>

                  <div className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between gap-4">
                    <code className="text-xs font-mono text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                      {window.location.origin}?ref={waitlistData?.referralCode}
                    </code>
                    <button 
                      onClick={copyReferral}
                      className="shrink-0 p-2.5 rounded-xl bg-white border border-gray-200 text-[#ff751f] hover:bg-[#ff751f] hover:text-white transition-all shadow-sm"
                    >
                      {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>

                  <div className="w-full flex gap-3">
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => window.open(`https://twitter.com/intent/tweet?text=I%20just%20joined%20the%20waitlist%20for%20KineticOS!%20Check%20it%20out:%20${window.location.origin}?ref=${waitlistData?.referralCode}`, '_blank')}
                      className="py-3 border-gray-200 hover:bg-black hover:text-white transition-all"
                    >
                      <Twitter className="w-4 h-4 mr-2" /> Share
                    </Button>
                    <Button
                      variant="primary"
                      fullWidth
                      onClick={onClose}
                      className="py-3"
                    >
                      Done
                    </Button>
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
