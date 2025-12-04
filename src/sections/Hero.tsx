import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { NeuralMesh } from '../components/canvas/NeuralMesh'

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } }
  }

  const charVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } as import('framer-motion').Transition }
  }

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <NeuralMesh />
      
      <motion.div 
        className="relative z-10 text-center w-full px-4"
        style={{ y: y1, opacity }}
      >
        <motion.h1 
          className="text-[15vw] md:text-[15vw] leading-[0.8] font-display font-light uppercase tracking-tighter mix-blend-difference select-none flex flex-col md:block"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          data-cursor="text"
        >
          <div className="overflow-hidden">
            {'QUESTION'.split('').map((char, i) => (
              <motion.span key={i} variants={charVariants} className="inline-block">{char}</motion.span>
            ))}
          </div>
          <div className="overflow-hidden md:ml-[10vw]">
            {'MARK'.split('').map((char, i) => (
              <motion.span key={i} variants={charVariants} className="inline-block">{char}</motion.span>
            ))}
          </div>
        </motion.h1>

        <motion.p 
          className="mt-12 text-xl md:text-2xl font-light text-ghost tracking-wide max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ y: y2 }}
        >
          Intelligence designed for your future
        </motion.p>
        
        <motion.div
           className="mt-16 flex justify-center"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 2 }}
        >
           <a href="#services" className="group relative inline-flex items-center gap-4 text-sm uppercase tracking-widest text-pure/80 hover:text-pure transition-colors" data-cursor="interactive">
             <span>Enter the future</span>
             <span className="h-px w-0 bg-electric transition-all duration-300 group-hover:w-full absolute -bottom-2 left-0"></span>
             <span className="transform transition-transform duration-300 group-hover:translate-x-2 text-electric">→</span>
           </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
