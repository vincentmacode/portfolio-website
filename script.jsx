import { useState, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import * as THREE from 'three'
import 'vanta/dist/vanta.birds.min'

// The vanta bundle is a side-effect import that registers window.VANTA and
// resolves Three.js from whatever it is handed rather than importing it, which
// is why THREE is passed into the config below. The `import * as THREE` above
// therefore looks unused to a linter but is load-bearing.
function VantaBirds() {
  const [vantaEffect, setVantaEffect] = useState(null)
  const vantaRef = useRef(null)

  // vantaEffect is both written by this effect and listed as its dependency.
  // The first pass builds the instance, the re-run that the state change
  // triggers hits the guard and does nothing, and the cleanup registered on
  // that second pass is the only one closing over a live instance. An empty
  // dependency array would capture vantaEffect as null forever and leak the
  // WebGL context on unmount.
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(window.VANTA.BIRDS({
        el: vantaRef.current,
        THREE,
        // Must track the body background in styles.css; any mismatch shows as
        // a seam where the canvas ends. The bird colors are independent of the
        // --accent custom properties and are not meant to match them.
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

function revealOnScroll() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
  }, { threshold: 0.1 })
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
}

// #copyright and #quarter exist in index.html only as anchors for these
// writes. They fail differently if this never runs: #copyright is empty in the
// markup and stays blank, while #quarter ships a hardcoded value that silently
// goes stale.
function stampCurrentDates() {
  const now = new Date()
  document.getElementById('copyright').textContent = `© ${now.getFullYear()} Vincent Ma`
  const quarter = Math.floor(now.getMonth() / 3) + 1
  document.getElementById('quarter').textContent = `Q${quarter} ${now.getFullYear()}`
}

createRoot(document.getElementById('app')).render(<VantaBirds />)
revealOnScroll()
stampCurrentDates()
