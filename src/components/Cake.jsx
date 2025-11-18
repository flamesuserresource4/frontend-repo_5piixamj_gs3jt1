import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAudio } from '../App'

function Candle({ blown }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`h-10 w-1.5 rounded-full ${blown ? 'bg-blue-200' : 'bg-blue-300'} shadow-inner`} />
      <motion.div
        animate={{ opacity: blown ? 0 : [0.7, 1, 0.7] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="-mt-1 h-3 w-3 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.9)]"
      />
    </div>
  )
}

function Cake3D({ blown }) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute -top-14 left-1/2 -translate-x-1/2 flex gap-4">
        {[...Array(5)].map((_, i) => (
          <Candle key={i} blown={blown} />
        ))}
      </div>
      <div className="h-44 rounded-b-[40px] rounded-t-[20px] bg-gradient-to-br from-blue-200/70 via-blue-300/70 to-blue-200/70 border border-white/50 shadow-[inset_0_10px_30px_rgba(255,255,255,0.7),0_20px_80px_rgba(59,130,246,0.35)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.6),transparent_40%)]" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-4 w-3/4 rounded-full bg-blue-900/20 blur-md" />
      </div>
      <div className="-mt-3 h-8 w-full mx-auto rounded-full bg-gradient-to-b from-blue-200/70 to-blue-400/70 blur-[1px] border border-white/40" />
    </div>
  )
}

export default function CakePage() {
  const [blown, setBlown] = useState(false)
  const navigate = useNavigate()
  const { whoosh } = useAudio()

  const onBlow = () => {
    if (blown) return
    whoosh()
    setBlown(true)
    setTimeout(() => navigate('/about'), 1500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl md:text-3xl font-semibold text-blue-100 max-w-2xl"
      >
        OMG THE BIRTHDAY GIRL HAS ARRIVED!\nClick on the candles to blow them out and make your wishes!
      </motion.h2>

      <motion.div
        onClick={onBlow}
        className="mt-10 cursor-pointer"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Cake3D blown={blown} />
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={onBlow}
        className="mt-8 px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-400 to-sky-500 text-white font-medium shadow-lg shadow-blue-400/40 border border-white/40"
      >
        BLOW
      </motion.button>

      {blown && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pointer-events-none fixed inset-0"
        >
          {[...Array(50)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: -120 - Math.random() * 120,
                x: (Math.random() - 0.5) * 120,
              }}
              transition={{ duration: 1.4, delay: Math.random() * 0.4 }}
              className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-blue-100 shadow-[0_0_8px_rgba(191,219,254,1)]"
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}
