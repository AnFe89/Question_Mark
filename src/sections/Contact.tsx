import { useState, useEffect } from 'react'

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+"

function ScrambleText({ text, hover }: { text: string, hover: boolean }) {
  const [displayText, setDisplayText] = useState(text)
  
  useEffect(() => {
    if (!hover) {
      setDisplayText(text)
      return
    }
    
    let iterations = 0
    const interval = setInterval(() => {
      setDisplayText(text.split('').map((_, index) => {
        if (index < iterations) return text[index]
        return chars[Math.floor(Math.random() * chars.length)]
      }).join(''))
      
      if (iterations >= text.length) clearInterval(interval)
      iterations += 1/3
    }, 30)
    
    return () => clearInterval(interval)
  }, [hover, text])

  return <span>{displayText}</span>
}

export function Contact() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section id="contact" className="min-h-screen flex flex-col items-center justify-center bg-void px-8 relative">
      <h2 className="text-[10vw] font-display font-light uppercase tracking-tighter mb-16 text-center leading-none">
        Let's build<br />something
      </h2>
      
      <a 
        href="mailto:hi@question-mark.ai"
        className="text-4xl md:text-6xl font-light text-electric hover:text-white transition-colors font-mono"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-cursor="interactive"
      >
        <ScrambleText text="hi@question-mark.ai" hover={isHovered} />
      </a>
      
      <div className="mt-32 flex flex-col items-center gap-4 text-ghost font-mono text-sm">
        <p>Berlin, Germany</p>
        <p>+49 (0) 123 456 789</p>
      </div>
    </section>
  )
}
