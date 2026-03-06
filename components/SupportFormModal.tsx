
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/Button';

interface SupportFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SupportFormModal: React.FC<SupportFormModalProps> = ({ isOpen, onClose }) => {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('submitting');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setFormState('success');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFormData({ name: '', email: '', message: '' });
        setFormState('idle');
    };

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-md transition-all duration-300"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="w-full max-w-lg bg-[#fffff5] rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-white/50 overflow-hidden pointer-events-auto relative"
                        >
                            {/* Header */}
                            <div className="px-8 pt-8 pb-4 flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold text-brand-text">Support Ticket</h3>
                                    <p className="text-sm text-gray-500 mt-1">We'll get back to you within 24 hours.</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all active:scale-90"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Form Content */}
                            <div className="p-8 pt-2">
                                {formState === 'success' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-12 flex flex-col items-center text-center"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-6">
                                            <CheckCircle2 className="w-10 h-10" />
                                        </div>
                                        <h4 className="text-xl font-bold text-brand-text mb-2">Message Received!</h4>
                                        <p className="text-gray-500 max-w-[280px] leading-relaxed">
                                            Thanks for reaching out. Our team has been notified and will contact you via email soon.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full px-8">
                                            <Button
                                                variant="primary"
                                                onClick={handleReset}
                                                className="flex-1"
                                                withIcon={false}
                                            >
                                                Send Another
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                onClick={onClose}
                                                className="flex-1"
                                                withIcon={false}
                                            >
                                                Close Form
                                            </Button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="space-y-1.5">
                                            <label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-5 py-3.5 rounded-2xl bg-white border border-gray-100 focus:border-[#ff751f] focus:ring-4 focus:ring-[#ff751f]/5 transition-all outline-none text-brand-text font-medium placeholder:text-gray-300"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-5 py-3.5 rounded-2xl bg-white border border-gray-100 focus:border-[#ff751f] focus:ring-4 focus:ring-[#ff751f]/5 transition-all outline-none text-brand-text font-medium placeholder:text-gray-300"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label htmlFor="message" className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">How can we help?</label>
                                            <textarea
                                                required
                                                id="message"
                                                name="message"
                                                rows={4}
                                                placeholder="Tell us what's on your mind..."
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                className="w-full px-5 py-3.5 rounded-2xl bg-white border border-gray-100 focus:border-[#ff751f] focus:ring-4 focus:ring-[#ff751f]/5 transition-all outline-none text-brand-text font-medium placeholder:text-gray-300 resize-none min-h-[120px]"
                                            />
                                        </div>

                                        <div className="pt-4">
                                            <Button
                                                type="submit"
                                                variant="primary"
                                                fullWidth
                                                disabled={formState === 'submitting'}
                                                className="shadow-xl shadow-orange-500/20"
                                            >
                                                {formState === 'submitting' ? (
                                                    <div className="flex items-center gap-2">
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        <span>Sending...</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <span>Send Message</span>
                                                        <Send className="w-4 h-4" />
                                                    </div>
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );

    return mounted ? createPortal(modalContent, document.body) : null;
};
