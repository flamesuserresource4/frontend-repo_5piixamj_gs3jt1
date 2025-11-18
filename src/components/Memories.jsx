import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const cards = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  title: `Memory ${i + 1}`,
  desc: 'A dreamy blue moment waiting to be filled with smiles and sparkle.',
  img: `https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=&sat=-50&hue=190`,
}))

export default function Memories() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen p-6 pt-14">
      <h2 className="text-center text-2xl md:text-3xl font-semibold text-blue-100">
        A Little Something for You, Alis 💙🦋
      </h2>

      <p className="max-w-2xl mx-auto mt-4 text-center text-blue-100/90">
        Here are tiny frames for favorite moments — ready to be filled with the softest blue memories. Hover to see a flutter of butterflies and a sprinkle of stars.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto mt-8">
        {cards.map((c) => (
          <motion.div
            key={c.id}
            whileHover={{ y: -6 }}
            className="relative rounded-3xl overflow-hidden border border-white/30 bg-white/10 backdrop-blur-xl shadow-xl"
          >
            <div className="absolute inset-0 pointer-events-none">
              {/* butterfly sparkle */}
              {[...Array(12)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute text-xs"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.8))',
                  }}
                >
                  {i % 2 === 0 ? '🦋' : '✨'}
                </motion.span>
              ))}
            </div>
            <img src={c.img} alt="memory" className="h-40 w-full object-cover opacity-90" />
            <div className="p-4">
              <h3 className="font-semibold text-blue-50">{c.title}</h3>
              <p className="text-sm text-blue-100/90">{c.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto text-center mt-10 text-blue-100/95">
        From the creator: May this little corner of blue remind you how deeply you are cherished. May every wish unfold softly like a butterfly wing. Happy Birthday, Alis — keep glowing.
      </div>

      <div className="flex items-center justify-center mt-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/final')}
          className="px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-400 to-sky-500 text-white font-medium border border-white/40 shadow-blue-400/30 shadow-lg"
        >
          Final Surprise 💙✨
        </motion.button>
      </div>
    </div>
  )
}
