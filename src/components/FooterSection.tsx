import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const hours = [
  { day: 'Monday — Tuesday', time: 'Closed' },
  { day: 'Wednesday — Thursday', time: '5:00 PM — 10:00 PM' },
  { day: 'Friday — Saturday', time: '5:00 PM — 11:30 PM' },
  { day: 'Sunday', time: '4:00 PM — 9:00 PM' },
];

const orderPlatforms = [
  {
    name: 'Toast',
    icon: '🍽️',
    description: 'Order directly & earn rewards',
    href: '#',
    recommended: true,
  },
  {
    name: 'UberEats',
    icon: '🛵',
    description: 'Fast delivery to your door',
    href: '#',
  },
  {
    name: 'ChowNow',
    icon: '🥡',
    description: 'Commission-free ordering',
    href: '#',
  },
];

export default function FooterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="contact" ref={ref} className="relative overflow-hidden">
      {/* Top section */}
      <div
        className="relative py-24"
        style={{
          background: 'linear-gradient(to bottom, #030c05, #020a04)',
          borderTop: '1px solid rgba(34,197,94,0.1)',
        }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.06) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="flex items-center gap-4 justify-center mb-6">
              <div className="line-sep" />
              <span className="font-mono-custom text-green-500 text-xs tracking-[0.4em] uppercase">
                05 — Find Us
              </span>
              <div className="line-sep" />
            </div>
            <h2 className="font-display text-6xl lg:text-7xl font-light text-white mb-4">
              Visit & Order
            </h2>
            <p className="text-green-100/40 font-light max-w-md mx-auto">
              Dine with us in person, or bring Verdant to your home.
            </p>
          </motion.div>

          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Online ordering */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <h3 className="font-mono-custom text-xs text-green-500 tracking-[0.4em] uppercase mb-6">
                Order Online
              </h3>
              <div className="space-y-3">
                {orderPlatforms.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.href}
                    className="flex items-center gap-4 p-4 rounded-sm border border-green-900/30 hover:border-green-500/30 transition-all duration-300 group hover:bg-green-900/10 block"
                  >
                    <div
                      className="w-10 h-10 rounded-sm flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: 'rgba(34,197,94,0.1)' }}
                    >
                      {platform.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-base text-white group-hover:text-green-400 transition-colors">
                          {platform.name}
                        </span>
                        {platform.recommended && (
                          <span className="font-mono-custom text-[8px] text-green-500 border border-green-500/30 px-1.5 py-0.5 rounded-full tracking-wider">
                            RECOMMENDED
                          </span>
                        )}
                      </div>
                      <p className="font-mono-custom text-[10px] text-green-100/30 tracking-wider mt-0.5">
                        {platform.description}
                      </p>
                    </div>
                    <span className="text-green-500/40 group-hover:text-green-400 transition-colors">
                      →
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-mono-custom text-xs text-green-500 tracking-[0.4em] uppercase mb-6">
                Hours of Operation
              </h3>
              <div className="space-y-3">
                {hours.map(({ day, time }) => (
                  <div
                    key={day}
                    className="flex items-center justify-between py-3 border-b border-green-900/20 last:border-0"
                  >
                    <span className="font-mono-custom text-xs text-green-100/50 tracking-wider">
                      {day}
                    </span>
                    <span
                      className={`font-mono-custom text-xs tracking-wider ${
                        time === 'Closed' ? 'text-red-500/60' : 'text-green-400'
                      }`}
                    >
                      {time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Current status */}
              <div className="mt-6 flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full bg-green-500 animate-pulse"
                  style={{ boxShadow: '0 0 6px #22c55e' }}
                />
                <span className="font-mono-custom text-xs text-green-400 tracking-wider">
                  Open now · Closes at 10:00 PM
                </span>
              </div>
            </motion.div>

            {/* Contact + Map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-mono-custom text-xs text-green-500 tracking-[0.4em] uppercase mb-6">
                Location & Contact
              </h3>

              {/* Map placeholder */}
              <div
                className="rounded-sm overflow-hidden mb-6"
                style={{
                  border: '1px solid rgba(34,197,94,0.15)',
                  height: '150px',
                  background: 'rgba(5,46,22,0.2)',
                  position: 'relative',
                }}
              >
                {/* Fake map grid */}
                <div
                  className="absolute inset-0 table-grid"
                  style={{ opacity: 0.5 }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="w-6 h-6 rounded-full mx-auto mb-2 flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #15803d, #22c55e)',
                        boxShadow: '0 0 15px rgba(34,197,94,0.6)',
                      }}
                    >
                      <span className="text-white text-xs">📍</span>
                    </div>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono-custom text-xs text-green-400 tracking-wider hover:text-green-300 transition-colors"
                    >
                      Open in Maps →
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    label: 'Address',
                    value: '142 West 42nd Street, New York, NY 10036',
                    href: 'https://maps.google.com',
                    icon: '📍',
                  },
                  {
                    label: 'Phone',
                    value: '+1 (212) 555-0182',
                    href: 'tel:+12125550182',
                    icon: '📞',
                  },
                  {
                    label: 'Email',
                    value: 'hello@verdantnyc.com',
                    href: 'mailto:hello@verdantnyc.com',
                    icon: '✉️',
                  },
                ].map(({ label, value, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-3 group"
                  >
                    <span className="text-base flex-shrink-0 mt-0.5">{icon}</span>
                    <div>
                      <div className="font-mono-custom text-[9px] text-green-500/40 tracking-widest uppercase">
                        {label}
                      </div>
                      <div className="font-light text-sm text-green-100/60 group-hover:text-green-400 transition-colors mt-0.5">
                        {value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="border-t border-green-900/20 pt-12 mb-12"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="font-display text-2xl font-light text-white mb-1">
                  Stay in the Know
                </h3>
                <p className="font-mono-custom text-xs text-green-100/30 tracking-wider">
                  New menu drops, chef's table events, and exclusive tastings.
                </p>
              </div>

              {!subscribed ? (
                <form
                  onSubmit={handleSubscribe}
                  className="flex items-center gap-0 rounded-sm overflow-hidden flex-shrink-0"
                  style={{ border: '1px solid rgba(34,197,94,0.2)' }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="bg-transparent px-5 py-3 text-white placeholder-green-100/20 focus:outline-none font-light text-sm w-64"
                  />
                  <button
                    type="submit"
                    className="btn-primary px-6 py-3 font-mono-custom text-xs tracking-widest text-white uppercase whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 glass px-6 py-3 rounded-sm"
                >
                  <span className="text-green-400">✓</span>
                  <span className="font-mono-custom text-xs text-green-400 tracking-wider">
                    You're on the list!
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="border-t border-green-900/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded-sm flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #15803d, #22c55e)' }}
              >
                <span className="text-white text-xs">V</span>
              </div>
              <span className="font-display text-lg font-light text-white tracking-[0.2em]">
                VERDANT
              </span>
            </div>

            <div className="flex items-center gap-6">
              {['Privacy Policy', 'Terms', 'Accessibility', 'Press'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-mono-custom text-[10px] text-green-100/30 hover:text-green-400 transition-colors tracking-wider"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center gap-4">
              {[
                { label: 'Instagram', icon: 'IG' },
                { label: 'Twitter', icon: 'TW' },
                { label: 'TikTok', icon: 'TK' },
              ].map(({ label, icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-sm flex items-center justify-center border border-green-900/30 hover:border-green-500/40 hover:bg-green-900/20 transition-all duration-300 font-mono-custom text-[10px] text-green-500/50 hover:text-green-400"
                >
                  {icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="text-center font-mono-custom text-[10px] text-green-100/20 tracking-widest mt-6"
          >
            © 2024 VERDANT FINE DINING. ALL RIGHTS RESERVED. · NEW YORK, NY
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
