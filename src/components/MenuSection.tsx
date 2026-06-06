import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const menuItems = [
  {
    id: 1,
    category: 'Starters',
    name: 'Truffle Arancini',
    description:
      'Crispy arborio risotto balls infused with black truffle, served with a saffron aioli and micro-herb salad.',
    price: 28,
    image: '/images/menu-dish1.jpg',
    tags: ['Vegetarian', 'Chef\'s Pick'],
    ingredients: ['🍄', '🧀', '🌿', '🧄'],
    prepTime: '12 min',
    calories: 340,
  },
  {
    id: 2,
    category: 'Entrées',
    name: 'Pan-Seared Scallops',
    description:
      'Hand-dived Scottish scallops on cauliflower velouté, truffle foam, caviar pearls and chive oil.',
    price: 52,
    image: '/images/menu-dish2.jpg',
    tags: ['Seafood', 'Signature'],
    ingredients: ['🦪', '🫧', '🌊', '🍋'],
    prepTime: '18 min',
    calories: 280,
  },
  {
    id: 3,
    category: 'Mains',
    name: 'Seared Duck Breast',
    description:
      'Magret duck breast, cherry & red wine reduction, pomme purée royale, wilted spinach and toasted hazelnuts.',
    price: 65,
    image: '/images/menu-dish1.jpg',
    tags: ['Chef\'s Pick', 'Award Winning'],
    ingredients: ['🦆', '🍒', '🥂', '🌰'],
    prepTime: '25 min',
    calories: 510,
  },
  {
    id: 4,
    category: 'Desserts',
    name: 'Chocolate Noir Sphere',
    description:
      'Valrhona 72% dark chocolate molten sphere, Madagascan vanilla ice cream, raspberry coulis and 24k gold leaf.',
    price: 22,
    image: '/images/menu-dish3.jpg',
    tags: ['Signature', 'Gluten Free'],
    ingredients: ['🍫', '🍓', '🫐', '✨'],
    prepTime: '8 min',
    calories: 450,
  },
];

const floatingParticles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${10 + Math.random() * 80}%`,
  top: `${10 + Math.random() * 80}%`,
  duration: 4 + Math.random() * 4,
  delay: Math.random() * 3,
  size: Math.random() > 0.5 ? 3 : 2,
}));

export default function MenuSection() {
  const [activeItem, setActiveItem] = useState(menuItems[0]);
  const [cart, setCart] = useState<number[]>([]);
  const [addedId, setAddedId] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleAdd = (id: number) => {
    setCart((prev) => [...prev, id]);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <section id="menu" ref={ref} className="relative py-32 overflow-hidden">
      {/* Dark moody bg */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(5,46,22,0.8) 0%, #030c05 60%)',
        }}
      />

      {/* Floating particles */}
      {floatingParticles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: '#22c55e',
            boxShadow: '0 0 6px rgba(34,197,94,0.8)',
          }}
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity }}
        />
      ))}

      {/* Left glow */}
      <div
        className="absolute left-0 top-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: 'translateY(-50%)',
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
              02 — Our Creations
            </span>
            <div className="line-sep" />
          </div>
          <h2 className="font-display text-6xl lg:text-7xl font-light text-white mb-4">
            The Menu
          </h2>
          <p className="text-green-100/40 font-light max-w-md mx-auto">
            Seasonally inspired, meticulously crafted. Every dish tells a story.
          </p>
        </motion.div>

        {/* Menu layout: tabs + card */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* Left — dish list */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-3 w-full lg:w-72 flex-shrink-0"
          >
            {menuItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                onClick={() => setActiveItem(item)}
                className={`w-full text-left p-4 rounded-sm border transition-all duration-500 group ${
                  activeItem.id === item.id
                    ? 'border-green-500/50 bg-green-900/20'
                    : 'border-green-900/30 hover:border-green-500/20 bg-transparent'
                }`}
                style={
                  activeItem.id === item.id
                    ? { boxShadow: '0 0 20px rgba(34,197,94,0.1), inset 0 0 20px rgba(34,197,94,0.05)' }
                    : {}
                }
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono-custom text-[10px] text-green-500/50 tracking-widest uppercase">
                    {item.category}
                  </span>
                  <span
                    className={`font-display text-lg font-light transition-colors ${
                      activeItem.id === item.id ? 'text-green-400' : 'text-green-100/40'
                    }`}
                  >
                    ${item.price}
                  </span>
                </div>
                <h3
                  className={`font-display text-xl font-light transition-colors ${
                    activeItem.id === item.id ? 'text-white' : 'text-white/60'
                  } group-hover:text-white`}
                >
                  {item.name}
                </h3>

                {/* Active indicator */}
                {activeItem.id === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="mt-2 h-px bg-gradient-to-r from-green-500 to-transparent"
                  />
                )}
              </motion.button>
            ))}

            {/* Cart badge */}
            {cart.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-3 glass rounded-sm flex items-center justify-between"
              >
                <span className="font-mono-custom text-xs text-green-400 tracking-widest">
                  {cart.length} item{cart.length !== 1 ? 's' : ''} in cart
                </span>
                <button className="font-mono-custom text-[10px] text-green-500 hover:text-white border border-green-500/30 px-2 py-1 rounded-sm transition-colors">
                  View Order
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Center — dish display */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 flex flex-col items-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-md"
                style={{ perspective: '800px' }}
              >
                {/* Dish image */}
                <div
                  className="relative rounded-sm overflow-hidden"
                  style={{
                    aspectRatio: '4/3',
                    boxShadow: '0 0 80px rgba(34,197,94,0.15), 0 30px 60px rgba(0,0,0,0.5)',
                  }}
                >
                  <img
                    src={activeItem.image}
                    alt={activeItem.name}
                    className="w-full h-full object-cover dish-image"
                  />
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(3,12,5,0.9) 0%, transparent 50%, transparent 100%)',
                    }}
                  />

                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {activeItem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="glass px-2.5 py-1 rounded-sm font-mono-custom text-[10px] text-green-400 tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price badge */}
                  <div className="absolute top-4 right-4">
                    <div
                      className="flex items-baseline gap-0.5"
                      style={{ textShadow: '0 0 20px rgba(34,197,94,0.8)' }}
                    >
                      <span className="font-display text-green-400 text-3xl font-light">
                        ${activeItem.price}
                      </span>
                    </div>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                    <div className="flex gap-1">
                      {activeItem.ingredients.map((emoji, i) => (
                        <motion.span
                          key={i}
                          className="text-xl"
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 2 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        >
                          {emoji}
                        </motion.span>
                      ))}
                    </div>
                    <div className="flex gap-3 font-mono-custom text-[10px] text-green-100/50">
                      <span>⏱ {activeItem.prepTime}</span>
                      <span>🔥 {activeItem.calories} cal</span>
                    </div>
                  </div>
                </div>

                {/* Scanline effect */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-sm overflow-hidden"
                  style={{ mixBlendMode: 'overlay' }}
                >
                  <div
                    className="absolute left-0 right-0 h-0.5"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(34,197,94,0.3), transparent)',
                      animation: 'scanline 3s linear infinite',
                    }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right — details + add to cart */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Category */}
                <span className="font-mono-custom text-[10px] text-green-500 tracking-[0.4em] uppercase">
                  {activeItem.category}
                </span>

                {/* Name */}
                <h3 className="font-display text-4xl font-light text-white mt-2 mb-4 leading-tight">
                  {activeItem.name}
                </h3>

                {/* Separator */}
                <div className="line-sep mb-6" />

                {/* Description */}
                <p className="text-green-100/50 text-sm leading-relaxed mb-6">
                  {activeItem.description}
                </p>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { label: 'Prep Time', value: activeItem.prepTime },
                    { label: 'Calories', value: `${activeItem.calories} cal` },
                    { label: 'Category', value: activeItem.category },
                    { label: 'Price', value: `$${activeItem.price}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="glass p-3 rounded-sm">
                      <div className="font-mono-custom text-[9px] text-green-500/50 tracking-widest mb-1 uppercase">
                        {label}
                      </div>
                      <div className="font-display text-base text-green-300">{value}</div>
                    </div>
                  ))}
                </div>

                {/* Add to cart */}
                <motion.button
                  onClick={() => handleAdd(activeItem.id)}
                  whileTap={{ scale: 0.97 }}
                  className="w-full btn-primary py-4 rounded-sm font-mono-custom text-xs tracking-[0.2em] text-white uppercase relative"
                >
                  <AnimatePresence mode="wait">
                    {addedId === activeItem.id ? (
                      <motion.span
                        key="added"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center gap-2"
                      >
                        ✓ Added to Order
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center gap-2"
                      >
                        + Add to Order — ${activeItem.price}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                <button className="w-full btn-outline py-3 mt-3 rounded-sm font-mono-custom text-xs tracking-[0.2em] uppercase">
                  View Full Menu
                </button>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
