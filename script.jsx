import { useState, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import * as THREE from 'three'
import 'vanta/dist/vanta.birds.min'

function VantaBirds() {
  const [vantaEffect, setVantaEffect] = useState(null)
  const vantaRef = useRef(null)

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(window.VANTA.BIRDS({
        el: vantaRef.current,
        THREE,
        backgroundColor: 0x0a0a0a,
        color1: 0xff6600,
        color2: 0x00aaff,
        birdSize: 1.5,
        quantity: 4,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00
      }))
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return <div ref={vantaRef} className="vanta-bg" />
}

createRoot(document.getElementById('app')).render(<VantaBirds />)

// Intersection Observer for reveal animations
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
}, { threshold: 0.1 })
document.querySelectorAll('.reveal').forEach(el => obs.observe(el))

// Footer copyright update
document.getElementById('copyright').textContent = `© ${new Date().getFullYear()} Vincent Ma`