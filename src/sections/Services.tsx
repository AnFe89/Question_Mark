import { useRef } from 'react'
import { useInView } from 'framer-motion'

const services = [
  {
    id: '01',
    title: 'LLM Integration',
    description: 'Seamlessly integrate Large Language Models into your existing infrastructure for enhanced decision making.',
    visual: 'particle-stream'
  },
  {
    id: '02',
    title: 'Data Analysis',
    description: 'Transform raw data into actionable insights with our advanced machine learning algorithms.',
    visual: 'radar'
  },
  {
    id: '03',
    title: 'Knowledge Bases',
    description: 'Build intelligent knowledge bases that evolve with your organization.',
    visual: 'nodes'
  },
  {
    id: '04',
    title: 'Custom Solutions',
    description: 'Tailored AI solutions designed to meet your specific business challenges.',
    visual: 'morph'
  }
]

function ServiceItem({ service }: { service: typeof services[0], index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" })

  return (
    <div ref={ref} className="h-screen w-full flex items-center justify-center relative snap-center">
      <div className={`transition-all duration-700 ease-out ${isInView ? 'opacity-100 scale-100 blur-0' : 'opacity-20 scale-95 blur-sm'}`}>
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-32 max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-[15vw] md:text-[8vw] font-display font-light leading-none text-transparent" style={{ WebkitTextStroke: '1px #cfff05' }}>
            {service.id}
          </div>
          <div className="max-w-xl pt-4">
            <h3 className="text-3xl md:text-6xl font-light mb-4 md:mb-8 uppercase tracking-tight">{service.title}</h3>
            <p className="text-lg md:text-xl text-ghost font-light leading-relaxed">{service.description}</p>
          </div>
        </div>
      </div>
      
      {/* Abstract Visual Placeholder */}
      <div className={`absolute inset-0 -z-10 flex items-center justify-center transition-opacity duration-1000 ${isInView ? 'opacity-30' : 'opacity-0'} pointer-events-none`}>
        {service.visual === 'particle-stream' && (
           <div className="w-[40vw] h-[40vw] rounded-full bg-linear-to-tr from-electric/20 to-transparent blur-[100px] animate-pulse" />
        )}
        {service.visual === 'radar' && (
           <div className="w-[40vw] h-[40vw] border border-electric/20 rounded-full flex items-center justify-center">
             <div className="w-[30vw] h-[30vw] border border-electric/20 rounded-full" />
             <div className="w-[20vw] h-[20vw] border border-electric/20 rounded-full" />
           </div>
        )}
        {service.visual === 'nodes' && (
           <div className="grid grid-cols-3 gap-12 opacity-50">
             {[...Array(9)].map((_, i) => <div key={i} className="w-2 h-2 bg-electric rounded-full shadow-[0_0_10px_#cfff05]" />)}
           </div>
        )}
        {service.visual === 'morph' && (
           <div className="w-[30vw] h-[30vw] bg-electric/10 blur-3xl rounded-[30%_70%_70%_30%/30%_30%_70%_70%] animate-spin-slow" />
        )}
      </div>
    </div>
  )
}

export function Services() {
  return (
    <section id="services" className="relative bg-void">
      {services.map((service, index) => (
        <ServiceItem key={service.id} service={service} index={index} />
      ))}
    </section>
  )
}
