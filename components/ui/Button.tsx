
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  withIcon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  withIcon = true,
  className = '',
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-4 text-base font-medium tracking-wide transition-all duration-300 rounded-lg group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange overflow-hidden";
  
  const variants = {
    // Primary: Brand Orange background (#ff751f), White text.
    primary: "bg-[#ff751f] text-white shadow-[0_4px_15px_-5px_rgba(255,117,31,0.4)] hover:bg-[#e6641a] hover:shadow-[0_8px_20px_-5px_rgba(255,117,31,0.5)]",
    
    // Secondary: Light Yellow background (#fffff5), Dark Text
    secondary: "bg-[#fffff5] text-[#292929] hover:bg-white border border-black/5 shadow-sm hover:shadow-md",
    
    // Outline: Orange Border, Orange Text
    outline: "bg-transparent border-2 border-[#ff751f] text-[#ff751f] hover:bg-[#ff751f] hover:text-white"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <motion.button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props as any}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {withIcon && <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />}
      </span>
    </motion.button>
  );
};
