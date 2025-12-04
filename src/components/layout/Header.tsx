import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-50 mix-blend-difference text-pure"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <div className="text-sm font-mono tracking-widest relative z-50">
          QUESTION-MARK<span className="text-electric animate-pulse">.</span>AI
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-sm font-light tracking-wide">
          {['Services', 'Work', 'Philosophy', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="relative group overflow-hidden"
              data-cursor="interactive"
            >
              <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                {item}
              </span>
              <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-500 group-hover:translate-y-0 text-electric">
                {item}
              </span>
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden relative z-50 w-8 h-8 flex flex-col justify-center gap-1.5"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.span 
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="w-full h-px bg-current block transition-transform"
          />
          <motion.span 
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-full h-px bg-current block transition-opacity"
          />
          <motion.span 
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="w-full h-px bg-current block transition-transform"
          />
        </button>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-void flex items-center justify-center md:hidden"
          >
            <nav className="flex flex-col gap-8 text-center">
              {['Services', 'Work', 'Philosophy', 'Contact'].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-4xl font-display font-light uppercase tracking-tighter text-pure hover:text-electric transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
