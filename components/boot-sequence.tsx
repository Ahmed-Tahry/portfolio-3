"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useMemo } from "react"

interface BootSequenceProps {
  onComplete: () => void
}

function generateParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    initialX: (i * 73) % 100, // Pseudo-random but deterministic
    initialY: (i * 47) % 100,
    targetY: -(((i * 31) % 200) + 100),
    duration: ((i * 17) % 3) + 2,
    delay: ((i * 13) % 20) / 10,
  }))
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [phase, setPhase] = useState<"logo" | "loading" | "welcome" | "done">("logo")
  const [progress, setProgress] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  const particles = useMemo(() => generateParticles(20), [])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const logoTimer = setTimeout(() => setPhase("loading"), 800)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 100)

    const welcomeTimer = setTimeout(() => setPhase("welcome"), 2000)

    const completeTimer = setTimeout(() => {
      setPhase("done")
      setTimeout(onComplete, 500)
    }, 3200)

    return () => {
      clearTimeout(logoTimer)
      clearInterval(progressInterval)
      clearTimeout(welcomeTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete, isMounted])

  if (!isMounted) {
    return <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center" />
  }

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
        >
          {/* Animated background gradient */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

            {/* Floating particles - using percentage-based positions */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{
                  opacity: 0,
                  left: `${particle.initialX}%`,
                  top: `${particle.initialY}%`,
                }}
                animate={{
                  opacity: [0, 0.5, 0],
                  y: [0, particle.targetY],
                  scale: [1, 1.5, 0.5],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: particle.delay,
                }}
                className="absolute w-1 h-1 rounded-full bg-primary/50"
              />
            ))}
          </motion.div>

          <div className="relative flex flex-col items-center">
            {/* Logo/Name */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
              className="relative"
            >
              {/* Glowing ring behind logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="absolute inset-0 -m-8 rounded-full bg-primary/20 blur-xl"
              />

              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute -inset-4 rounded-full border border-primary/20"
              />

              <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center shadow-2xl shadow-primary/30">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-bold text-primary-foreground"
                >
                  AT
                </motion.span>
              </div>
            </motion.div>

            {/* Name reveal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-8 text-center"
            >
              <motion.h1
                className="text-3xl font-bold text-foreground tracking-tight"
                initial={{ letterSpacing: "0.5em", opacity: 0 }}
                animate={{ letterSpacing: "0.05em", opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Ahmed Tahri
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-muted-foreground mt-2"
              >
                Creative Engineer
              </motion.p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: phase === "loading" || phase === "welcome" ? 1 : 0, width: 200 }}
              transition={{ delay: 0.6 }}
              className="mt-8 h-1 bg-secondary rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
              />
            </motion.div>

            {/* Welcome message */}
            <AnimatePresence mode="wait">
              {phase === "welcome" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 text-sm text-muted-foreground"
                >
                  Welcome to my workspace
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Corner decorations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 0.5 }}
            className="absolute top-8 left-8 w-32 h-32 border-l-2 border-t-2 border-primary/50"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 right-8 w-32 h-32 border-r-2 border-b-2 border-primary/50"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
