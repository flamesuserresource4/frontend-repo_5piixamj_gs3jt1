import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAudio } from '../App'

export default function Final() {
  const { startMusic } = useAudio()

  useEffect(() => {
    startMusic()
  }, [])

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 text-center">
      {/* floating elements */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [20, -40, 0] }}
            transition={{ duration: 6 + i * 0.2, repeat: Infinity, repeatType: 'mirror' }}
            className="absolute text-3xl"
            style={{
              top: `${(i * 7) % 90}%`,
              left: `${(i * 13) % 90}%`,
              filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.6))',
            }}
          >
            {i % 3 === 0 ? '🦋' : i % 3 === 1 ? '🌹' : '✨'}
          </motion.div>
        ))}
      </div>

      <div className="relative">
        <div className="text-6xl md:text-7xl mb-4 drop-shadow">🐱🎁</div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-serif text-3xl md:text-4xl text-blue-50"
          style={{ textShadow: '0 0 12px rgba(147,197,253,0.6)' }}
        >
          Happy Birthday, Alis!
        </motion.h1>
        <p className="mt-4 max-w-2xl text-blue-100/95">
          You are loved more than you know. Wishing you a magical year ahead.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mt-8 text-blue-100"
        >
          ✨✨✨
        </motion.div>

        <div className="mt-10 text-sm text-blue-200/80">Made with love 💙</div>
      </div>
    </div>
  )
}
