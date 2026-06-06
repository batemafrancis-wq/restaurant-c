import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const philosophyPoints = [
  {
    number: '01',
    title: 'Farm to Plate',
    text: 'We source exclusively from local biodynamic farms within 50 miles. Every ingredient arrives within 24 hours of harvest, preserving maximum flavor and nutritional integrity.',
  },
  {
    number: '02',
    title: 'Craft & Precision',
    text: 'Our kitchen operates with Swiss-watch precision. Each component is prepared independently, assembled to order, ensuring every plate arrives at its exact ideal moment.',
  },
  {
    number: '03',
    title: 'Memory & Emotion',
    text: 'We believe food is memory made tangible. Our menu changes with the seasons, drawing inspiration from the chef\'s childhood, travels, and the culture of our community.',
  },
];

export default function StorySection() {
  const ref = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section id="story" ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 60%, rgba(5,46,22,0.5) 0%, #030c05 60%)',
        }}
      />

      {/* Decorative line */}
      <div
        className="absolute left-0 top-1/2 w-full h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.05), transparent)',
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
              04 — Chef's Corner
            </span>
            <div className="line-sep" />
          </div>
          <h2 className="font-display text-6xl lg:text-7xl font-light text-white mb-4">
            The Story
          </h2>
          <p className="text-green-100/40 font-light max-w-md mx-auto">
            Behind every great dish is a chef obsessed with the craft.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Chef image */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 relative"
          >
            <motion.div style={{ y: imageY }} className="relative">
              {/* Image frame */}
              <div
                className="relative overflow-hidden rounded-sm"
                style={{
                  boxShadow: '0 0 80px rgba(34,197,94,0.15), 0 40px 80px rgba(0,0,0,0.6)',
                  border: '1px solid rgba(34,197,94,0.15)',
                }}
              >
                <img
                  src="/images/chef-portrait.jpg"
                  alt="Head Chef"
                  className="w-full object-cover"
                  style={{ height: '600px', objectPosition: 'center top' }}
                />

                {/* Cinema overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent 50%, rgba(3,12,5,0.8) 100%)',
                  }}
                />

                {/* Scanline */}
                <div
                  className="absolute left-0 right-0 h-px"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.3), transparent)',
                    animation: 'scanline 5s linear infinite',
                  }}
                />

                {/* Bottom info */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="font-display text-2xl text-white font-light">
                        Chef Marcus Aurelio
                      </h3>
                      <p className="font-mono-custom text-xs text-green-400 tracking-widest mt-1">
                        Executive Chef & Founder · 15 years
                      </p>
                    </div>
                    <div className="glass px-3 py-2 rounded-sm">
                      <span className="font-mono-custom text-[10px] text-green-400 tracking-widest">
                        ★ Michelin
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Corner brackets */}
              <div className="absolute -top-3 -left-3 w-8 h-8">
                <div className="w-full h-full border-t-2 border-l-2 border-green-500/40" />
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8">
                <div className="w-full h-full border-t-2 border-r-2 border-green-500/40" />
              </div>
              <div className="absolute -bottom-3 -left-3 w-8 h-8">
                <div className="w-full h-full border-b-2 border-l-2 border-green-500/40" />
              </div>
              <div className="absolute -bottom-3 -right-3 w-8 h-8">
                <div className="w-full h-full border-b-2 border-r-2 border-green-500/40" />
              </div>
            </motion.div>

            {/* Floating award */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="absolute -right-8 top-1/3 glass p-4 rounded-sm"
              style={{ border: '1px solid rgba(34,197,94,0.2)' }}
            >
              <div className="font-display text-3xl text-green-400 text-center">★★</div>
              <div className="font-mono-custom text-[9px] text-green-500/60 tracking-widest text-center mt-1">
                MICHELIN<br />STARRED
              </div>
            </motion.div>
          </motion.div>

          {/* Right — story content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex-1 space-y-10"
          >
            {/* Quote */}
            <div className="relative">
              <div
                className="absolute -top-2 -left-4 font-display text-8xl text-green-500/10 leading-none select-none"
              >
                "
              </div>
              <blockquote className="font-display text-2xl lg:text-3xl font-light text-white/80 leading-relaxed italic pl-4">
                Cooking is not just nourishment — it is a conversation between the earth and the 
                soul. Every plate I send out carries a piece of my heart.
              </blockquote>
              <div className="mt-4 flex items-center gap-3 pl-4">
                <div className="w-8 h-px bg-green-500" />
                <span className="font-mono-custom text-xs text-green-400 tracking-widest">
                  Chef Marcus Aurelio
                </span>
              </div>
            </div>

            {/* Philosophy */}
            <div className="space-y-6">
              {philosophyPoints.map((point, i) => (
                <motion.div
                  key={point.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  className="flex gap-5 group"
                >
                  <div className="flex-shrink-0">
                    <div
                      className="w-10 h-10 rounded-sm flex items-center justify-center font-mono-custom text-xs text-green-400 transition-all duration-300 group-hover:bg-green-900/30"
                      style={{ border: '1px solid rgba(34,197,94,0.2)' }}
                    >
                      {point.number}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-display text-xl font-light text-white mb-2 group-hover:text-green-400 transition-colors">
                      {point.title}
                    </h4>
                    <p className="text-green-100/40 text-sm leading-relaxed">{point.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-4"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary px-8 py-3.5 rounded-sm font-mono-custom text-xs tracking-[0.2em] text-white uppercase"
              >
                Meet the Chef
              </a>
              <div className="flex items-center gap-3 text-green-500/40">
                <div className="w-8 h-px bg-green-500/20" />
                <span className="font-mono-custom text-[10px] tracking-widest">or scroll to explore</span>
              </div>
            </motion.div>

            {/* Awards row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-4 pt-4 border-t border-green-900/30"
            >
              {[
                { icon: '★', label: 'Michelin 2024' },
                { icon: '🏆', label: "James Beard Award" },
                { icon: '✦', label: 'Best New Restaurant' },
                { icon: '🌿', label: 'Sustainability Leader' },
              ].map((award) => (
                <div key={award.label} className="flex items-center gap-2">
                  <span className="text-green-400 text-sm">{award.icon}</span>
                  <span className="font-mono-custom text-[10px] text-green-100/30 tracking-wider">
                    {award.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
