// const dot = document.getElementById('cursorDot');
// const ring = document.getElementById('cursorRing');
// let mx = 0, my = 0, rx = 0, ry = 0;

// Hide custom cursor on touch devices and show default cursor
// const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
// if (isCoarsePointer) {
//   if (dot) dot.style.display = 'none';
//   if (ring) ring.style.display = 'none';
//   document.body.style.cursor = 'auto';
// } else if (dot && ring) {
  // Update cursor position on mouse move
  // document.addEventListener('mousemove', e => {
  //   mx = e.clientX; my = e.clientY;
  //   dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  // });

  // Animate the ring to follow the cursor with a delay
  // (function animRing() {
  //   rx += (mx - rx) * 0.12;
  //   ry += (my - ry) * 0.12;
  //   ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  //   requestAnimationFrame(animRing);
  // })();

  // Add hover effect on interactive elements
//   document.querySelectorAll('a, button, .project-row, .exp-entry, .skill-list li').forEach(el => {
//     el.addEventListener('mouseenter', () => ring.classList.add('big'));
//     el.addEventListener('mouseleave', () => ring.classList.remove('big'));
//   });
// }

import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import BIRDS from 'vanta/dist/vanta.birds.min'

export default function MyComponent() {
  const [vantaEffect, setVantaEffect] = useState(null)
  const vantaRef = useRef(null)

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(BIRDS({
        el: vantaRef.current,
        THREE,                  // pass THREE from npm
        backgroundColor: 0x0a0a0a,
        color1: 0xff6600,
        color2: 0x00aaff,
        birdSize: 1.5,
        quantity: 3
      }))
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()  // cleanup on unmount
    }
  }, [vantaEffect])

  return (
    <div ref={vantaRef} style={{ width: '100%', height: '100vh' }}>
      {/* your foreground content here */}
    </div>
  )
}

// Intersection Observer for reveal animations
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
