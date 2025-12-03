import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [cursorState, setCursorState] = useState<'default' | 'interactive' | 'text'>('default')
  
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  
  // Smooth mouse with spring
  const springConfig = { stiffness: 500, damping: 28, mass: 0.5 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Check for interactive elements
      const isInteractive = target.closest('a, button, input, textarea, [data-cursor="interactive"], [role="button"]')
      // Check for text elements (if not interactive)
      const isText = !isInteractive && target.closest('p, h1, h2, h3, h4, h5, h6, span, li, [data-cursor="text"]')
      
      if (isInteractive) {
        setCursorState('interactive')
      } else if (isText) {
        setCursorState('text')
      } else {
        setCursorState('default')
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', checkHover)
    
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', checkHover)
    }
  }, [mouseX, mouseY])

  // Variants for cursor shape
  const variants = {
    default: {
      height: 16, // 8px radius * 2? Spec says 8px circle. Assuming diameter 8px? "8px circle" usually means diameter.
      width: 16,
      backgroundColor: 'rgba(207, 255, 5, 0)',
      border: '1px solid #cfff05',
      borderRadius: '50%',
    },
    interactive: {
      height: 48,
      width: 48,
      backgroundColor: 'rgba(207, 255, 5, 0.1)',
      border: '1px solid #cfff05', // "border glows" - maybe add box-shadow?
      borderRadius: '50%',
    },
    text: {
      height: 24,
      width: 2,
      backgroundColor: '#cfff05',
      border: '0px solid transparent',
      borderRadius: '0%',
    }
  }

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        variants={variants}
        animate={cursorState}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      {/* Trail/Ghosting effect could be added here with separate springs/delays */}
    </>
  )
}
