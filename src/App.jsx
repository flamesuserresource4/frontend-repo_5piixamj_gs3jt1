import React, { useEffect, useRef, useState, createContext, useContext } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

// Audio Context & Hooks
const AudioCtx = createContext(null)

function AudioProvider({ children }) {
  const audioRef = useRef(null)
  const [ready, setReady] = useState(false)
  const musicRef = useRef({ playing: false, nodes: [] })

  // Create audio context on first user gesture
  useEffect(() => {
    const unlock = () => {
      if (!audioRef.current) {
        const ctx = new (window.AudioContext || window.webkitAudioContext)()
        audioRef.current = ctx
        setReady(true)
      } else if (audioRef.current.state === 'suspended') {
        audioRef.current.resume()
      }
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
    }
    window.addEventListener('pointerdown', unlock)
    window.addEventListener('keydown', unlock)
    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
    }
  }, [])

  const chime = () => {
    const ctx = audioRef.current
    if (!ctx) return
    const now = ctx.currentTime
    const freqs = [660, 880, 1320]
    freqs.forEach((f, i) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'sine'
      o.frequency.setValueAtTime(f, now)
      g.gain.setValueAtTime(0.0001, now)
      g.gain.exponentialRampToValueAtTime(0.2, now + 0.03)
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.8 + i * 0.05)
      o.connect(g).connect(ctx.destination)
      o.start(now + i * 0.03)
      o.stop(now + 1.2 + i * 0.05)
    })
  }

  const whoosh = () => {
    const ctx = audioRef.current
    if (!ctx) return
    const bufferSize = 2 * ctx.sampleRate
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
    }
    const whiteNoise = ctx.createBufferSource()
    whiteNoise.buffer = noiseBuffer
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 800
    filter.Q.value = 0.6
    const gain = ctx.createGain()
    gain.gain.value = 0.2

    whiteNoise.connect(filter).connect(gain).connect(ctx.destination)
    whiteNoise.start()
    whiteNoise.stop(ctx.currentTime + 0.6)
  }

  const startMusic = () => {
    const ctx = audioRef.current
    if (!ctx || musicRef.current.playing) return
    const chords = [
      [261.63, 329.63, 392.0], // C major
      [246.94, 329.63, 392.0], // Bdim-ish soft
      [233.08, 311.13, 392.0], // A#maj add2
      [261.63, 329.63, 392.0], // back to C
    ]
    const nodes = []
    const now = ctx.currentTime
    chords.forEach((chord, ci) => {
      chord.forEach((f) => {
        const o = ctx.createOscillator()
        const g = ctx.createGain()
        o.type = 'sine'
        o.frequency.setValueAtTime(f / 2, now + ci * 4) // lower, pad-like
        g.gain.setValueAtTime(0.0001, now + ci * 4)
        g.gain.linearRampToValueAtTime(0.05, now + ci * 4 + 1.0)
        g.gain.linearRampToValueAtTime(0.03, now + ci * 4 + 3.5)
        g.gain.linearRampToValueAtTime(0.0001, now + ci * 4 + 4)
        o.connect(g).connect(ctx.destination)
        o.start(now + ci * 4)
        o.stop(now + ci * 4 + 4.1)
        nodes.push({ o, g })
      })
    })
    musicRef.current = { playing: true, nodes }
  }

  const stopMusic = () => {
    musicRef.current.playing = false
  }

  return (
    <AudioCtx.Provider value={{ ready, chime, whoosh, startMusic, stopMusic }}>
      {children}
    </AudioCtx.Provider>
  )
}

export const useAudio = () => useContext(AudioCtx)

function StarsBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(60)].map((_, i) => (
        <span
          key={i}
          className="star absolute block rounded-full bg-white/80 shadow-[0_0_6px_rgba(255,255,255,0.9)]"
          style={{
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  )
}

function Decorative() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
      {/* Butterflies */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`b-${i}`}
          className="absolute text-[32px] md:text-[40px] animate-float-slow"
          style={{
            top: `${10 + i * 12}%`,
            left: `${(i * 17) % 90}%`,
            filter: 'drop-shadow(0 0 8px rgba(147,197,253,0.6))',
          }}
        >
          🦋
        </div>
      ))}
      {/* Roses */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`r-${i}`}
          className="absolute text-[30px] md:text-[36px] opacity-80 animate-sway"
          style={{
            bottom: `${(i * 15) % 40 + 5}%`,
            right: `${(i * 21) % 70 + 5}%`,
            filter: 'drop-shadow(0 0 10px rgba(191,219,254,0.5))',
          }}
        >
          🌹
        </div>
      ))}
      {/* Cute cat */}
      <div className="absolute bottom-4 left-4 text-[42px] md:text-[52px] animate-wiggle drop-shadow-[0_0_10px_rgba(191,219,254,0.9)]">
        🐱
      </div>
    </div>
  )
}

export default function App() {
  const location = useLocation()
  return (
    <AudioProvider>
      <div className="min-h-screen relative bg-gradient-to-br from-[#0a1a2f] via-[#0c2040] to-[#0a1830] text-blue-50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.35),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(147,197,253,0.25),transparent_40%)]" />
        <StarsBackground />
        <Decorative />
        <div className="relative min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 0.6 }}
              className="min-h-screen"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </AudioProvider>
  )
}
