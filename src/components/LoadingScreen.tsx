import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  duration: 3 + Math.random() * 4,
  delay: Math.random() * 3,
  size: Math.random() > 0.7 ? 3 : 2,
}));

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'reveal'>('loading');

  useEffect(() => {
    const steps = [
      { target: 15, duration: 300 },
      { target: 35, duration: 400 },
      { target: 60, duration: 500 },
      { target: 80, duration: 400 },
      { target: 95, duration: 300 },
      { target: 100, duration: 200 },
    ];

    let current = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const runStep = (index: number) => {
      if (index >= steps.length) {
        timeout = setTimeout(() => setPhase('reveal'), 500);
        timeout = setTimeout(onComplete, 1800);
        return;
      }
      const step = steps[index];
      const increment = step.target - current;
      const intervalTime = step.duration / increment;
      let count = 0;

      const interval = setInterval(() => {
        count++;
        current++;
        setProgress(current);
        if (count >= increment) {
          clearInterval(interval);
          runStep(index + 1);
        }
      }, intervalTime);
    };

    timeout = setTimeout(() => runStep(0), 400);
    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {true && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#030c05' }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                left: p.left,
                bottom: '-10px',
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(rgba(34,197,94,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.15) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* Center glow */}
          <div
            className="absolute w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16 text-center"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-px bg-green-500 opacity-60" />
              <span className="font-mono-custom text-green-500 text-xs tracking-[0.4em] uppercase opacity-80">
                Est. 2024
              </span>
              <div className="w-8 h-px bg-green-500 opacity-60" />
            </div>
            <h1 className="font-display text-7xl font-light text-white tracking-widest glow-text">
              VERDANT
            </h1>
            <p className="font-mono-custom text-green-400 text-xs tracking-[0.6em] uppercase mt-2 opacity-60">
              Fine Dining Experience
            </p>
          </motion.div>

          {/* Dish image with orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: phase === 'reveal' ? 0 : 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mb-16"
          >
            {/* Outer orbit ring */}
            <motion.div
              className="absolute inset-[-40px] rounded-full border border-green-500/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div
                className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-green-500"
                style={{ transform: 'translate(-50%, -50%)', boxShadow: '0 0 8px #22c55e' }}
              />
            </motion.div>

            {/* Inner orbit ring */}
            <motion.div
              className="absolute inset-[-20px] rounded-full border border-green-500/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            >
              <div
                className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-green-400"
                style={{ transform: 'translate(50%, 50%)', boxShadow: '0 0 6px #4ade80' }}
              />
            </motion.div>

            {/* Dish */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-36 h-36 rounded-full overflow-hidden border border-green-500/20"
              style={{ boxShadow: '0 0 40px rgba(34,197,94,0.2), 0 0 80px rgba(34,197,94,0.1)' }}
            >
              <img
                src="/images/hero-dish.png"
                alt="Signature Dish"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="w-64 space-y-3"
          >
            <div className="flex justify-between items-center">
              <span className="font-mono-custom text-green-500/60 text-xs tracking-widest">
                Loading Experience
              </span>
              <span className="font-mono-custom text-green-400 text-sm font-bold">
                {progress}%
              </span>
            </div>

            {/* Track */}
            <div className="h-px w-full bg-green-900/50 relative overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-green-700 via-green-400 to-green-300 rounded-full progress-glow"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Steps */}
            <div className="flex justify-between">
              {['Init', 'Assets', 'Scene', 'Ready'].map((label, i) => (
                <span
                  key={label}
                  className="font-mono-custom text-[10px] tracking-wider transition-colors duration-500"
                  style={{
                    color: progress >= (i + 1) * 25 ? '#22c55e' : 'rgba(34,197,94,0.25)',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
