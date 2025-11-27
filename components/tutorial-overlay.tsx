"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { X } from "lucide-react"

interface TutorialStep {
  id: number
  title: string
  description: string
  target: "dock" | "titlebar" | "controls" | "resize"
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Dock Navigation",
    description: "Click icons in the dock below to open different sections of my portfolio",
    target: "dock",
  },
  {
    id: 2,
    title: "Drag Windows",
    description: "Grab the title bar at the top to drag windows around",
    target: "titlebar",
  },
  {
    id: 3,
    title: "Window Controls",
    description: "Red closes, yellow minimizes, green maximizes the window",
    target: "controls",
  },
  {
    id: 4,
    title: "Resize Windows",
    description: "Drag the bottom-right corner to resize any window",
    target: "resize",
  },
]

interface TutorialOverlayProps {
  onComplete: () => void
}

export function TutorialOverlay({ onComplete }: TutorialOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSkip()
    }
  }

  const handleSkip = () => {
    setIsVisible(false)
    setTimeout(onComplete, 300)
  }

  const step = tutorialSteps[currentStep]

  // Known positions from the code:
  // - Window starts at x:100, y:60, size 500x400
  // - Dock is at bottom-4 (16px), centered horizontally
  // - Title bar is ~48px tall at top of window
  // - Traffic lights are in title bar, left side with px-4 padding
  // - Resize handle is at absolute bottom-right of window

  const getPositions = (target: string) => {
    // Window position and size from initialWindows
    const windowX = 100
    const windowY = 60
    const windowWidth = 500
    const windowHeight = 400

    switch (target) {
      case "dock":
        // Dock is centered at bottom, card should be above it
        return {
          card: { bottom: "90px", right: "calc(50% - 125px)", transform: "translateX(-50%)" },
          arrow: { bottom: "-45px", right: "calc(50% - 125px)", transform: "translateX(-50%)" },
          arrowDir: "down" as const,
          highlight: { bottom: "18px", right: "calc(50% - 125px)", transform: "translateX(-50%)", width: "250px", height: "64px" },
        }
      case "titlebar":
        // Title bar is at top of window (y:60), card below it pointing up
        return {
          card: { top: `${windowY + 70}px`, left: `${windowX + windowWidth / 2}px`, transform: "translateX(-50%)" },
          arrow: { top: "-45px", left: "50%", transform: "translateX(-50%)" },
          arrowDir: "up" as const,
          highlight: { top: `${windowY}px`, left: `${windowX}px`, width: `${windowWidth}px`, height: "48px" },
        }
      case "controls":
        // Traffic lights are top-left of window, inside title bar
        return {
          card: { top: `${windowY + 70}px`, left: `${windowX + 16}px` },
          arrow: { top: "-45px", left: "40px" },
          arrowDir: "up" as const,
          highlight: { top: `${windowY + 8}px`, left: `${windowX + 10}px`, width: "70px", height: "30px" },
        }
      case "resize":
        // Resize handle is bottom-right of window
        return {
          card: { top: `${windowY + windowHeight - 240}px`, left: `${windowX + windowWidth - 280}px` },
          arrow: { bottom: "-45px", right: "20px" },
          arrowDir: "down" as const,
          highlight: {
            top: `${windowY + windowHeight - 20}px`,
            left: `${windowX + windowWidth - 20}px`,
            width: "24px",
            height: "24px",
          },
        }
      default:
        return {
          card: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
          arrow: {},
          arrowDir: "down" as const,
          highlight: null,
        }
    }
  }

  const positions = getPositions(step.target)

  const ArrowSvg = ({ direction }: { direction: "down" | "up" | "left" | "right" }) => {
    const rotations = { down: 0, up: 180, left: 90, right: -90 }
    return (
      <motion.svg
        width="32"
        height="40"
        viewBox="0 0 40 50"
        className="text-primary"
        style={{ transform: `rotate(${rotations[direction]}deg)` }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: direction === "down" ? [0, 8, 0] : direction === "up" ? [0, -8, 0] : 0,
          x: direction === "left" ? [0, -8, 0] : direction === "right" ? [0, 8, 0] : 0,
        }}
        transition={{
          y: { duration: 0.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          x: { duration: 0.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          opacity: { duration: 0.3 },
        }}
      >
        <path
          d="M20 0 L20 40 M10 30 L20 42 L30 30"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    )
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] pointer-events-none"
        >
          {/* Semi-transparent overlay */}
          <div
            className="absolute inset-0 bg-background/60 backdrop-blur-sm pointer-events-auto"
            onClick={handleNext}
          />

          {/* Highlight area */}
          {positions.highlight && (
            <motion.div
              key={`highlight-${step.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute rounded-xl border-2 border-primary bg-primary/10 shadow-[0_0_20px_rgba(var(--primary),0.3)]"
              style={{
                top: positions.highlight.top,
                bottom: positions.highlight.bottom,
                left: positions.highlight.left,
                right: positions.highlight.right,
                width: positions.highlight.width,
                height: positions.highlight.height,
                transform: positions.highlight.transform,
              }}
            />
          )}

          {/* Skip button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={handleSkip}
            className="absolute top-6 right-6 p-2 rounded-full bg-secondary/80 hover:bg-secondary text-foreground pointer-events-auto transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Step indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-auto"
          >
            {tutorialSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentStep ? "bg-primary w-8" : index < currentStep ? "bg-primary/50" : "bg-muted"
                }`}
              />
            ))}
          </motion.div>

          {/* Tutorial card */}
          <motion.div
            key={step.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="absolute pointer-events-auto"
            style={{
              top: positions.card.top,
              bottom: positions.card.bottom,
              left: positions.card.left,
              right: positions.card.right,
              transform: positions.card.transform,
            }}
          >
            <div className="relative bg-card border border-border rounded-xl p-5 shadow-2xl shadow-primary/10 max-w-xs">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-primary/5 blur-xl -z-10" />

              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {step.id}
                </span>
                <h3 className="font-semibold text-foreground">{step.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{step.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {currentStep + 1} of {tutorialSteps.length}
                </span>
                <button
                  onClick={handleNext}
                  className="px-4 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  {currentStep < tutorialSteps.length - 1 ? "Next" : "Got it!"}
                </button>
              </div>

              {/* Arrow pointing to target */}
              <div
                className="absolute"
                style={{
                  top: positions.arrow.top,
                  bottom: positions.arrow.bottom,
                  left: positions.arrow.left,
                  right: positions.arrow.right,
                  transform: positions.arrow.transform,
                }}
              >
                <ArrowSvg direction={positions.arrowDir} />
              </div>
            </div>
          </motion.div>

          {/* Click anywhere hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground"
          >
            Click anywhere to continue
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
