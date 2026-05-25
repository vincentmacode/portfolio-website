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
        quantity: 3
      }))
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return <div ref={vantaRef} style={{ width: '100%', height: '100%' }} />
}

createRoot(document.getElementById('app')).render(<VantaBirds />)

// Intersection Observer for reveal animations
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
}, { threshold: 0.1 })
document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
