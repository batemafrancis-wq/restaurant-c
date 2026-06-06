import { useState, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface TablePin {
  id: number;
  x: number;
  y: number;
  label: string;
  seats: number;
  available: boolean;
  vibe: string;
}

const tablePins: TablePin[] = [
  { id: 1, x: 22, y: 38, label: 'Table 01', seats: 2, available: true, vibe: 'Window View' },
  { id: 2, x: 45, y: 28, label: 'Table 02', seats: 4, available: true, vibe: 'Center Stage' },
  { id: 3, x: 68, y: 42, label: 'Table 03', seats: 2, available: false, vibe: 'Garden Side' },
  { id: 4, x: 32, y: 65, label: 'Table 04', seats: 6, available: true, vibe: 'Private Alcove' },
  { id: 5, x: 72, y: 70, label: 'Table 05', seats: 4, available: true, vibe: 'Bar Adjacent' },
  { id: 6, x: 55, y: 58, label: 'Table 06', seats: 8, available: false, vibe: 'Private Dining' },
];

export default function SpaceSection() {
  const [selectedTable, setSelectedTable] = useState<TablePin | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);
  const [reservationTable, setReservationTable] = useState<TablePin | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  }, [offset]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = Math.max(-200, Math.min(200, e.clientX - startPos.x));
    const newY = Math.max(-100, Math.min(100, e.clientY - startPos.y));
    setOffset({ x: newX, y: newY });
  }, [isDragging, startPos]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handlePinClick = (table: TablePin, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTable(selectedTable?.id === table.id ? null : table);
  };

  const openReservation = (table: TablePin) => {
    setReservationTable(table);
    setShowModal(true);
    setSelectedTable(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
    }, 2500);
  };

  return (
    <section id="space" ref={ref} className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 80% 50%, rgba(5,46,22,0.6) 0%, #030c05 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center gap-4 justify-center mb-6">
            <div className="line-sep" />
            <span className="font-mono-custom text-green-500 text-xs tracking-[0.4em] uppercase">
              03 — The Space
            </span>
            <div className="line-sep" />
          </div>
          <h2 className="font-display text-6xl lg:text-7xl font-light text-white mb-4">
            Our Atmosphere
          </h2>
          <p className="text-green-100/40 font-light max-w-md mx-auto">
            Explore our intimate dining space. Click on any table to reserve your perfect spot.
          </p>
        </motion.div>

        {/* Interactive drag hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <motion.span
            animate={{ x: [-3, 3, -3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-green-500/60 text-lg"
          >
            ↔
          </motion.span>
          <span className="font-mono-custom text-xs text-green-500/50 tracking-widest uppercase">
            Click and drag to explore our space
          </span>
          <motion.span
            animate={{ x: [3, -3, 3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-green-500/60 text-lg"
          >
            ↔
          </motion.span>
        </motion.div>

        {/* The 3D space container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative"
        >
          <div
            ref={containerRef}
            className={`relative overflow-hidden rounded-sm ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{
              aspectRatio: '16/9',
              maxHeight: '600px',
              border: '1px solid rgba(34,197,94,0.15)',
              boxShadow: '0 0 80px rgba(34,197,94,0.1)',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Restaurant background image */}
            <div
              className="absolute inset-[-5%] w-[110%] h-[110%] transition-transform"
              style={{
                transform: `translate(${offset.x * 0.3}px, ${offset.y * 0.3}px)`,
                backgroundImage: "url('/images/restaurant-interior.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* Atmosphere overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(3,12,5,0.3) 0%, transparent 40%, transparent 60%, rgba(3,12,5,0.5) 100%)',
              }}
            />

            {/* Table grid overlay */}
            <div className="absolute inset-0 table-grid opacity-30" />

            {/* Table pins */}
            {tablePins.map((table, i) => (
              <motion.div
                key={table.id}
                className="absolute"
                style={{
                  left: `${table.x}%`,
                  top: `${table.y}%`,
                  transform: `translate(-50%, -50%) translate(${offset.x * 0.05}px, ${offset.y * 0.05}px)`,
                  zIndex: selectedTable?.id === table.id ? 10 : 5,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                {/* Pin glow */}
                <div
                  className="absolute inset-[-6px] rounded-full ping-custom"
                  style={{
                    background: table.available
                      ? 'rgba(34,197,94,0.3)'
                      : 'rgba(239,68,68,0.3)',
                  }}
                />

                {/* Pin button */}
                <button
                  onClick={(e) => handlePinClick(table, e)}
                  className="relative w-5 h-5 rounded-full flex items-center justify-center transition-transform hover:scale-125"
                  style={{
                    background: table.available
                      ? 'linear-gradient(135deg, #15803d, #22c55e)'
                      : 'linear-gradient(135deg, #991b1b, #ef4444)',
                    boxShadow: table.available
                      ? '0 0 12px rgba(34,197,94,0.8)'
                      : '0 0 12px rgba(239,68,68,0.8)',
                  }}
                >
                  <span className="text-[8px] text-white font-bold">{table.id}</span>
                </button>

                {/* Tooltip */}
                <AnimatePresence>
                  {selectedTable?.id === table.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 10 }}
                      className="absolute bottom-8 left-1/2 -translate-x-1/2 glass-dark rounded-sm p-4 w-52 z-20"
                      style={{ border: '1px solid rgba(34,197,94,0.2)' }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-display text-lg text-white">{table.label}</h4>
                          <p className="font-mono-custom text-[10px] text-green-400 tracking-wider">
                            {table.vibe}
                          </p>
                        </div>
                        <span
                          className="font-mono-custom text-[9px] px-2 py-1 rounded-full"
                          style={{
                            background: table.available
                              ? 'rgba(34,197,94,0.15)'
                              : 'rgba(239,68,68,0.15)',
                            color: table.available ? '#22c55e' : '#ef4444',
                            border: `1px solid ${table.available ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                          }}
                        >
                          {table.available ? 'Available' : 'Reserved'}
                        </span>
                      </div>

                      <p className="font-mono-custom text-[10px] text-green-100/40 mb-3">
                        👥 Seats {table.seats} guests
                      </p>

                      {table.available && (
                        <button
                          onClick={() => openReservation(table)}
                          className="w-full btn-primary py-2 rounded-sm font-mono-custom text-[10px] tracking-widest text-white uppercase"
                        >
                          Reserve This Table
                        </button>
                      )}

                      {/* Arrow */}
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                        style={{
                          borderLeft: '6px solid transparent',
                          borderRight: '6px solid transparent',
                          borderTop: '6px solid rgba(34,197,94,0.2)',
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Corner decorations */}
            {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos) => (
              <div key={pos} className={`absolute ${pos} w-8 h-8 pointer-events-none`}>
                <div className="w-full h-full border-t border-l border-green-500/30" />
              </div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 right-4 glass px-3 py-2 rounded-sm flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500" style={{ boxShadow: '0 0 4px #22c55e' }} />
                <span className="font-mono-custom text-[9px] text-green-400 tracking-wider">Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500" style={{ boxShadow: '0 0 4px #ef4444' }} />
                <span className="font-mono-custom text-[9px] text-red-400 tracking-wider">Reserved</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Table grid cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-8"
        >
          {tablePins.map((table) => (
            <button
              key={table.id}
              onClick={() => table.available && openReservation(table)}
              disabled={!table.available}
              className={`p-3 rounded-sm border text-left transition-all duration-300 ${
                table.available
                  ? 'border-green-900/30 hover:border-green-500/40 hover:bg-green-900/10 cursor-pointer'
                  : 'border-red-900/20 opacity-50 cursor-not-allowed'
              }`}
            >
              <div
                className="w-6 h-6 rounded-full mb-2 flex items-center justify-center font-mono-custom text-[10px] text-white"
                style={{
                  background: table.available
                    ? 'linear-gradient(135deg, #15803d, #22c55e)'
                    : '#991b1b',
                }}
              >
                {table.id}
              </div>
              <div className="font-display text-sm text-white">{table.label}</div>
              <div className="font-mono-custom text-[9px] text-green-500/50 tracking-wider mt-0.5">
                {table.vibe}
              </div>
              <div
                className="font-mono-custom text-[9px] mt-1"
                style={{ color: table.available ? '#22c55e' : '#ef4444' }}
              >
                {table.available ? `👥 ${table.seats} seats` : 'Reserved'}
              </div>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Reservation Modal */}
      <AnimatePresence>
        {showModal && reservationTable && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: 'rgba(3,12,5,0.9)', backdropFilter: 'blur(10px)' }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-dark rounded-sm p-8 max-w-md w-full"
              style={{ border: '1px solid rgba(34,197,94,0.2)' }}
            >
              {!submitted ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-display text-3xl font-light text-white">
                        Reserve {reservationTable.label}
                      </h3>
                      <p className="font-mono-custom text-xs text-green-400 tracking-widest mt-1">
                        {reservationTable.vibe} · {reservationTable.seats} Seats
                      </p>
                    </div>
                    <button
                      onClick={() => setShowModal(false)}
                      className="w-8 h-8 rounded-full border border-green-500/20 flex items-center justify-center text-green-500/60 hover:text-green-400 transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="line-sep mb-6" />

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { label: 'Full Name', type: 'text', placeholder: 'Your name' },
                      { label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                      { label: 'Phone Number', type: 'tel', placeholder: '+1 (555) 000-0000' },
                    ].map(({ label, type, placeholder }) => (
                      <div key={label}>
                        <label className="font-mono-custom text-[10px] text-green-500/60 tracking-widest uppercase block mb-1.5">
                          {label}
                        </label>
                        <input
                          type={type}
                          placeholder={placeholder}
                          required
                          className="w-full bg-transparent border border-green-900/50 rounded-sm px-4 py-3 text-white placeholder-green-100/20 focus:outline-none focus:border-green-500/50 font-light text-sm transition-colors"
                        />
                      </div>
                    ))}

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-mono-custom text-[10px] text-green-500/60 tracking-widest uppercase block mb-1.5">
                          Date
                        </label>
                        <input
                          type="date"
                          required
                          className="w-full bg-transparent border border-green-900/50 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-green-500/50 text-sm transition-colors"
                          style={{ colorScheme: 'dark' }}
                        />
                      </div>
                      <div>
                        <label className="font-mono-custom text-[10px] text-green-500/60 tracking-widest uppercase block mb-1.5">
                          Time
                        </label>
                        <select
                          required
                          className="w-full bg-[#030c05] border border-green-900/50 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-green-500/50 text-sm transition-colors"
                        >
                          {['6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'].map(
                            (t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-primary py-4 rounded-sm font-mono-custom text-xs tracking-[0.2em] text-white uppercase mt-2"
                    >
                      Confirm Reservation
                    </button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl"
                    style={{
                      background: 'linear-gradient(135deg, #15803d, #22c55e)',
                      boxShadow: '0 0 40px rgba(34,197,94,0.5)',
                    }}
                  >
                    ✓
                  </motion.div>
                  <h3 className="font-display text-3xl font-light text-white mb-2">
                    Reservation Confirmed
                  </h3>
                  <p className="font-mono-custom text-xs text-green-400 tracking-widest">
                    We'll see you soon at {reservationTable.label}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
