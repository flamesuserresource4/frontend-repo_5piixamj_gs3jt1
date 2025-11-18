import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

const lines = [
  'Alis is the sweetest soul ever.',
  'She lights up every room she enters.',
  'She deserves all the love in the world.',
  'A beautiful person inside and out.',
  'Her vibe is unmatched.',
  'Her laughter is a melody, her presence a calm ocean.',
  'She turns ordinary moments into shimmering memories.',
  'She is soft as a cloud, brave as a storm, and kind like the moonlight.',
  'Every step she takes leaves a trail of tiny blue stars.',
  'Today and always, she deserves magic.'
]

function Card({ text }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-white/10 border border-white/30 rounded-2xl p-5 shadow-lg backdrop-blur-xl"
    >
      <p className="text-blue-50/95 leading-relaxed">{text}</p>
    </motion.div>
  )
}

export default function About() {
  const [endInView, setEndInView] = useState(false)
  const endRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setEndInView(true)
        })
      },
      { threshold: 0.6 }
    )
    if (endRef.current) io.observe(endRef.current)
    return () => io.disconnect()
  }, [])

  return (
    <div className="min-h-screen p-6 pt-16">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center text-3xl md:text-4xl font-serif tracking-wide drop-shadow-sm"
      >
        About Alis 💙
      </motion.h2>

      <div className="relative max-w-2xl mx-auto mt-8 space-y-4">
        <div className="absolute -z-10 inset-0 opacity-50 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute text-3xl animate-sway" style={{
              top: `${(i * 11) % 90}%`,
              left: `${(i * 17) % 80}%`,
            }}>🌹</div>
          ))}
        </div>
        {lines.map((t, i) => (
          <Card key={i} text={t} />
        ))}
        <div ref={endRef} />
      </div>

      <div className="mt-10 flex items-center justify-center">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: endInView ? 1 : 0, boxShadow: endInView ? '0 0 24px rgba(147,197,253,0.8)' : 'none' }}
          transition={{ duration: 0.6 }}
          onClick={() => navigate('/memories')}
          className="px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-400 to-sky-500 text-white font-medium border border-white/40"
        >
          Next
        </motion.button>
      </div>

      <div className="fixed bottom-4 right-4 text-5xl animate-wiggle">🐱</div>
    </div>
  )
}
