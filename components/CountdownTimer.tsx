
import React, { useState, useEffect, useRef } from 'react';

interface CountdownTimerProps {
  compact?: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ compact = false }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 72, minutes: 0, seconds: 0 });
  const requestRef = useRef<number>(0);
  const endTimeRef = useRef<number>(0);

  useEffect(() => {
    // Fixed target date: March 18, 2026
    const targetDate = new Date('2026-03-18T00:00:00Z').getTime();
    endTimeRef.current = targetDate;

    const animate = () => {
      const now = Date.now();
      const difference = endTimeRef.current - now;

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor((difference / (1000 * 60 * 60)));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(prev => {
        if (prev.seconds !== seconds) {
          return { hours, minutes, seconds };
        }
        return prev;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  if (compact) {
    return (
      <div 
        role="timer" 
        aria-live="polite" 
        aria-atomic="true"
        aria-label={`Time remaining: ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`}
        className="flex items-center gap-2 font-mono text-brand-text text-xl md:text-2xl font-bold"
      >
        <span className="bg-white px-3 py-2 rounded-xl border border-black/5 shadow-sm min-w-[3.2rem] text-center" aria-hidden="true">
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span className="text-gray-300 text-sm mb-1 font-sans" aria-hidden="true">:</span>
        <span className="bg-white px-3 py-2 rounded-xl border border-black/5 shadow-sm min-w-[3.2rem] text-center" aria-hidden="true">
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className="text-gray-300 text-sm mb-1 font-sans" aria-hidden="true">:</span>
        <span className="bg-white text-[#ff751f] px-3 py-2 rounded-xl border border-[#ff751f]/10 shadow-sm min-w-[3.2rem] text-center" aria-hidden="true">
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>
    );
  }

  return (
    <div 
      role="timer" 
      aria-live="polite" 
      aria-atomic="true"
      aria-label={`Offer expires in ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, and ${timeLeft.seconds} seconds`}
      className="flex items-center justify-center gap-4 text-brand-text font-mono"
    >
      <div className="flex flex-col items-center">
        <span className="text-2xl md:text-4xl font-bold bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm backdrop-blur-sm">
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-[0.2em]">Hours</span>
      </div>
      <span className="text-2xl font-bold -mt-8 text-gray-300" aria-hidden="true">:</span>
      <div className="flex flex-col items-center">
        <span className="text-2xl md:text-4xl font-bold bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm backdrop-blur-sm">
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-[0.2em]">Mins</span>
      </div>
      <span className="text-2xl font-bold -mt-8 text-gray-300" aria-hidden="true">:</span>
      <div className="flex flex-col items-center">
        <span className="text-2xl md:text-4xl font-bold bg-[#ff751f]/5 px-4 py-3 rounded-xl border border-[#ff751f]/20 backdrop-blur-sm text-[#ff751f]">
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <span className="text-[10px] text-[#ff751f] mt-2 font-bold uppercase tracking-[0.2em]">Secs</span>
      </div>
    </div>
  );
};
