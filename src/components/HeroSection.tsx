import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const floatingIngredients = [
  { emoji: '🌿', top: '15%', left: '8%', delay: 0, duration: 7 },
  { emoji: '🍋', top: '70%', left: '5%', delay: 1.5, duration: 9 },
  { emoji: '🌶️', top: '25%', right: '6%', delay: 0.5, duration: 8 },
  { emoji: '🫐', top: '75%', right: '8%', delay: 2, duration: 6 },
  { emoji: '✦', top: '40%', left: '15%', delay: 1, duration: 10 },
  { emoji: '✦', top: '55%', right: '15%', delay: 0.8, duration: 8 },
];

export default function HeroSection() {
  const dishRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let mouseX = 0, mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const animateDish = () => {
      if (dishRef.current) {
        const rotateX = mouseY * -8;
        const rotateY = mouseX * 8;
        dishRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
      rafId = requestAnimationFrame(animateDish);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(animateDish);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToMenu = () => {
    const el = document.querySelector('#menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, #052e16 0%, #030c05 60%)',
        }}
      />

      {/* Background image overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('/images/hero-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px)',
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34,197,94,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Large glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Floating ingredient elements */}
      {floatingIngredients.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none select-none"
          style={{
            top: item.top,
            left: 'left' in item ? item.left : undefined,
            right: 'right' in item ? item.right : undefined,
          }}
          animate={{
            y: [0, -25, 5, -15, 0],
            rotate: [0, 8, -4, 6, 0],
            opacity: [0.4, 0.8, 0.6, 0.9, 0.4],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 pt-24">
        {/* Left text */}
        <div className="flex-1 text-center lg:text-left">
          {/* Pre-title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-3 mb-6 justify-center lg:justify-start"
          >
            <div className="w-8 h-px bg-green-500" />
            <span className="font-mono-custom text-green-500 text-xs tracking-[0.4em] uppercase">
              A New Era of Fine Dining
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-display font-light leading-none mb-6"
          >
            <span className="block text-white text-7xl lg:text-8xl xl:text-9xl tracking-tight">
              Dining,
            </span>
            <span className="block text-7xl lg:text-8xl xl:text-9xl tracking-tight shimmer-text">
              Reimagined.
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-green-100/50 text-lg max-w-md mb-10 font-light leading-relaxed"
          >
            Where gastronomy meets artistry. Every plate is a canvas, every bite — a revelation.
            Experience cuisine that transcends the ordinary.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap items-center gap-4 justify-center lg:justify-start"
          >
            <button
              onClick={() => {
                const el = document.querySelector('#contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary px-8 py-3.5 rounded-sm font-mono-custom text-xs tracking-[0.2em] text-white uppercase"
            >
              Reserve Your Table
            </button>
            <button
              onClick={() => {
                const el = document.querySelector('#menu');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-outline px-8 py-3.5 rounded-sm font-mono-custom text-xs tracking-[0.2em] uppercase"
            >
              Explore Menu
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="flex gap-8 mt-14 justify-center lg:justify-start"
          >
            {[
              { value: '12+', label: 'Signature Dishes' },
              { value: '4★', label: 'Michelin Starred' },
              { value: '500+', label: 'Happy Guests' },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div className="font-display text-3xl font-light text-green-400">{stat.value}</div>
                <div className="font-mono-custom text-xs text-green-100/40 tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Dish 3D */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex-1 flex justify-center items-center"
        >
          {/* Plinth / pedestal */}
          <div className="relative">
            {/* Outer ring glow */}
            <div
              className="absolute inset-[-60px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)',
                animation: 'orbitGlow 3s ease-in-out infinite',
              }}
            />

            {/* Rotating ring */}
            <motion.div
              className="absolute inset-[-30px] rounded-full border border-green-500/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            >
              {[0, 90, 180, 270].map((angle) => (
                <div
                  key={angle}
                  className="absolute w-1.5 h-1.5 rounded-full bg-green-500/60"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${angle}deg) translateX(calc(50% + 30px)) translate(-50%, -50%)`,
                    boxShadow: '0 0 6px #22c55e',
                  }}
                />
              ))}
            </motion.div>

            {/* Inner ring */}
            <motion.div
              className="absolute inset-[-15px] rounded-full border border-green-500/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />

            {/* Dish image */}
            <div
              ref={dishRef}
              className="relative w-72 h-72 lg:w-96 lg:h-96 transition-transform duration-75"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className="w-full h-full rounded-full overflow-hidden border-glow"
                style={{
                  background: 'rgba(5, 46, 22, 0.3)',
                  boxShadow: '0 0 60px rgba(34,197,94,0.25), 0 0 120px rgba(34,197,94,0.1)',
                }}
              >
                <img
                  src="/images/hero-dish.png"
                  alt="Signature Dish"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Label */}
              <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 glass px-4 py-1.5 rounded-sm whitespace-nowrap"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="font-mono-custom text-xs text-green-400 tracking-widest">
                  ✦ SIGNATURE DISH
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer"
        onClick={scrollToMenu}
      >
        <span className="font-mono-custom text-[10px] tracking-[0.4em] text-green-500/60 uppercase">
          Scroll to Enter
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-green-500/60 to-transparent scroll-bounce" />
      </motion.div>
    </section>
  );
}
