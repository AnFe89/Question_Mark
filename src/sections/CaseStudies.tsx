import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const caseStudies = [
  {
    year: '2023',
    client: 'VELOCITY',
    description: 'Data-driven operational insights',
    color: 'from-orange-500/20 to-red-500/20'
  },
  {
    year: '2023-2024',
    client: 'HORIZON',
    description: 'Deep learning predictive model for credit risk',
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    year: '2024-2025',
    client: 'SYNTHESIS',
    description: 'LLM integration, automation, customer care',
    color: 'from-purple-500/20 to-pink-500/20'
  }
]

function useMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  return isMobile
}

export function CaseStudies() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })
  const isMobile = useMobile()

  // We have 3 items, so we need to shift by 2 viewport widths (approx 66.66% of total width if container is 300vw?)
  // Actually, let's just use 100vw * (N-1) logic.
  // If we translate x by percentage, it's relative to the element width.
  // If the element is 300vw wide (flex row of 3 screens), we need to move it -200vw.
  // -200vw is -66.66% of 300vw.
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.66%'])

  return (
    <section ref={targetRef} id="work" className="relative h-[300vh] bg-void">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-0 w-[300vw]">
          {caseStudies.map((study, i) => (
            <div key={i} className="relative h-screen w-screen shrink-0 flex items-center justify-center p-4 md:p-16 group">
              {/* Background */}
              <div className={`absolute inset-0 bg-linear-to-br ${study.color} opacity-10 md:opacity-0 md:group-hover:opacity-10 transition-opacity duration-700`} />
              
              <div className="relative z-10 w-full max-w-6xl">
                <div className="text-sm font-mono text-electric mb-4">{study.year}</div>
                <h2 className="text-[15vw] md:text-[10vw] font-display font-light leading-none uppercase tracking-tighter mb-4 md:mb-8 transition-transform duration-500 md:group-hover:scale-105 origin-left">
                  {study.client}
                </h2>
                <motion.p 
                  className="text-lg md:text-2xl text-ghost font-light max-w-xl opacity-0 translate-y-8 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 delay-100"
                  whileInView={isMobile ? { opacity: 1, y: 0 } : {}}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {study.description}
                </motion.p>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
          <motion.div 
            className="h-full bg-electric" 
            style={{ scaleX: scrollYProgress, transformOrigin: '0%' }} 
          />
        </div>
      </div>
    </section>
  )
}
