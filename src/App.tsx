import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MenuSection from './components/MenuSection';
import SpaceSection from './components/SpaceSection';
import StorySection from './components/StorySection';
import FooterSection from './components/FooterSection';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030c05] overflow-x-hidden">
      {/* Custom cursor */}
      <CustomCursor />

      {/* Loading screen */}
      <AnimatePresence>
        {!isLoaded && (
          <LoadingScreen key="loader" onComplete={handleLoadComplete} />
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Navbar />
            <main>
              <HeroSection />
              <MenuSection />
              <SpaceSection />
              <StorySection />
              <FooterSection />
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating book table button (mobile) */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="fixed bottom-6 right-6 z-40 md:hidden"
          >
            <button
              onClick={() => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary px-5 py-3 rounded-sm font-mono-custom text-[10px] tracking-widest text-white uppercase shadow-lg"
              style={{ boxShadow: '0 0 30px rgba(34,197,94,0.4)' }}
            >
              Book Table
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
