import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAudio } from '../App'

export default function Welcome() {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { ready, chime } = useAudio()

  useEffect(() => {
    const t = setTimeout(() => {
      chime()
    }, 250)
    return () => clearTimeout(t)
  }, [ready])

  const onLogin = () => {
    if (name.trim().toLowerCase() === 'alis') {
      setError('')
      setTimeout(() => navigate('/cake'), 1000)
    } else {
      setError('Oops! Only the birthday girl can enter!')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative"
      >
        <div className="absolute -top-10 -left-6 text-4xl">🦋</div>
        <div className="absolute -bottom-10 -right-6 text-4xl">🌹</div>
        <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-[0_10px_40px_rgba(59,130,246,0.25)] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/10 to-transparent" />
          <h1 className="text-center text-2xl md:text-3xl font-semibold tracking-wide text-blue-100 drop-shadow-sm">
            Welcome!! Please enter your name and click login!
          </h1>

          <div className="mt-8 space-y-4">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full rounded-2xl bg-white/20 border border-white/40 placeholder-blue-100/60 text-blue-50 px-5 py-4 outline-none shadow-inner focus:ring-4 focus:ring-blue-300/30"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onLogin}
              className="w-full rounded-2xl bg-gradient-to-r from-blue-400 via-sky-400 to-blue-500 text-white font-medium py-3.5 shadow-lg shadow-blue-500/30 border border-white/30 hover:shadow-blue-400/40"
            >
              Login
            </motion.button>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-blue-100/90 bg-white/10 border border-white/30 rounded-xl p-3"
              >
                {error}
              </motion.div>
            )}
          </div>

          <div className="absolute -bottom-3 -left-2 text-5xl drop-shadow">🐱</div>
        </div>
      </motion.div>
    </div>
  )
}
