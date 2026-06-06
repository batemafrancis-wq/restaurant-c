import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Menu', href: '#menu' },
  { label: 'Space', href: '#space' },
  { label: 'Story', href: '#story' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'nav-blur py-3' : 'py-5'
        }`}
        style={{
          background: scrolled
            ? 'rgba(3,12,5,0.85)'
            : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(34,197,94,0.1)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div
                className="w-8 h-8 rounded-sm flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #15803d, #22c55e)',
                  boxShadow: '0 0 15px rgba(34,197,94,0.4)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path
                    d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 12H8v-1c0-2.7 2.7-4 4-4s4 1.3 4 4v1z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            <div>
              <span className="font-display text-xl font-light text-white tracking-[0.2em] group-hover:text-green-400 transition-colors">
                VERDANT
              </span>
              <div className="h-px w-0 group-hover:w-full bg-green-500 transition-all duration-500" />
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="font-mono-custom text-xs tracking-[0.2em] text-green-100/60 hover:text-green-400 transition-colors duration-300 uppercase relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="btn-primary px-5 py-2 rounded-sm font-mono-custom text-xs tracking-widest text-white uppercase cursor-pointer"
            >
              Book a Table
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              className="w-6 h-px bg-green-400"
            />
            <motion.div animate={{ opacity: menuOpen ? 0 : 1 }} className="w-6 h-px bg-green-400" />
            <motion.div
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              className="w-6 h-px bg-green-400"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 glass-dark flex flex-col items-center justify-center gap-10"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="font-display text-5xl font-light text-white hover:text-green-400 transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="btn-primary px-8 py-3 rounded-sm font-mono-custom text-sm tracking-widest text-white uppercase mt-4"
            >
              Book a Table
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
