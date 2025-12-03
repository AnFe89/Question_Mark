import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

function Word({ children, range, progress }: { children: string, range: [number, number], progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.1, 1])
  return (
    <motion.span style={{ opacity }} className={children.includes('reality') ? 'text-electric' : 'text-pure'}>
      {children}
    </motion.span>
  )
}

export function Philosophy() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'start 0.2']
  })

  const text = "We believe AI should amplify human potential, not replace it. Every solution we build starts with understanding your reality."
  const words = text.split(' ')

  return (
    <section ref={ref} id="philosophy" className="min-h-screen flex items-center justify-center bg-void px-8 py-32">
      <div className="max-w-4xl text-center">
        <p className="text-3xl md:text-5xl font-light leading-relaxed flex flex-wrap justify-center gap-x-3 gap-y-2">
          {words.map((word, i) => {
            const start = i / words.length
            const end = start + (1 / words.length)
            return (
              <Word key={i} range={[start, end]} progress={scrollYProgress}>
                {word}
              </Word>
            )
          })}
        </p>
      </div>
    </section>
  )
}
