import { useRef, useEffect, useState } from 'react'
import { useInView, useSpring } from 'framer-motion'

const stats = [
  { value: 20, label: 'Productivity Increase', suffix: '%' },
  { value: 44, label: 'Cost Reduction', suffix: '%' },
  { value: 63, label: 'Revenue Growth', suffix: '%' },
  { value: 14, label: 'Faster Decision Making', suffix: '%' },
]

function Counter({ value, suffix }: { value: number, suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const springValue = useSpring(0, { stiffness: 50, damping: 20, mass: 1 }) // Slower spring for counting
  
  useEffect(() => {
    if (inView) {
      springValue.set(value)
    }
  }, [inView, value, springValue])

  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest))
    })
  }, [springValue])

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      <span className="text-electric ml-1">{suffix}</span>
    </span>
  )
}

export function Stats() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-void relative overflow-hidden py-32">
      {/* Background Grid */}
      <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] opacity-5 pointer-events-none">
        {[...Array(400)].map((_, i) => (
          <div key={i} className="border-[0.5px] border-white/20" />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 max-w-6xl mx-auto px-8 relative z-10">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-start">
            <div className="text-[12vw] md:text-[8vw] font-mono leading-none text-electric mb-4">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-xl md:text-2xl font-light uppercase tracking-widest text-pure/80">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
