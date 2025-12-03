import { motion } from 'framer-motion'

export function Header() {
  return (
    <motion.header 
      className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-40 mix-blend-difference text-pure"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      <div className="text-sm font-mono tracking-widest">
        QUESTION-MARK<span className="text-electric animate-pulse">.</span>AI
      </div>
      
      <nav className="flex gap-8 text-sm font-light tracking-wide">
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
    </motion.header>
  )
}
