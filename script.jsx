import { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'

function VantaBirds() {
  const vantaRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isSmallScreen = window.matchMedia('(max-width: 768px)').matches

    if (prefersReducedMotion || isSmallScreen) {
      return undefined
    }

    let vantaEffect = null
    let isCancelled = false

    void (async () => {
      const [THREE] = await Promise.all([
        import('three'),
        import('vanta/dist/vanta.birds.min'),
      ])

      if (isCancelled || !vantaRef.current || !window.VANTA?.BIRDS) {
        return
      }

      vantaEffect = window.VANTA.BIRDS({
        el: vantaRef.current,
        THREE,
        backgroundColor: 0x0a0a0a,
        color1: 0xff6600,
        color2: 0x00aaff,
        birdSize: 1.5,
        quantity: 3,
      })
    })()

    return () => {
      isCancelled = true

      if (vantaEffect) {
        vantaEffect.destroy()
      }
    }
  }, [])

  return <div ref={vantaRef} style={{ width: '100%', height: '100%' }} />
}

createRoot(document.getElementById('app')).render(<VantaBirds />)

// Intersection Observer for reveal animations
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
}, { threshold: 0.1 })
document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
