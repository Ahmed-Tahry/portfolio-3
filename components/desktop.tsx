"use client"

import { useState, useCallback } from "react"
import { Dock } from "./dock"
import { Window } from "./window"
import { AboutContent } from "./about-content"
import { ProjectsContent } from "./projects-content"
import { ContactContent } from "./contact-content"
import { HomeContent } from "./home-content"
import { AnimatePresence, motion } from "framer-motion"
import { BootSequence } from "./boot-sequence"
import { TutorialOverlay } from "./tutorial-overlay"

export type WindowId = "home" | "projects" | "about" | "contact"

interface WindowState {
  id: WindowId
  title: string
  isOpen: boolean
  isMinimized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
}

const initialWindows: WindowState[] = [
  {
    id: "home",
    title: "Welcome",
    isOpen: false, // Start closed, will open after boot
    isMinimized: false,
    position: { x: 100, y: 60 },
    size: { width: 500, height: 400 },
    zIndex: 1,
  },
  {
    id: "projects",
    title: "Projects",
    isOpen: false,
    isMinimized: false,
    position: { x: 150, y: 80 },
    size: { width: 700, height: 500 },
    zIndex: 0,
  },
  {
    id: "about",
    title: "About Me",
    isOpen: false,
    isMinimized: false,
    position: { x: 200, y: 100 },
    size: { width: 550, height: 450 },
    zIndex: 0,
  },
  {
    id: "contact",
    title: "Contact",
    isOpen: false,
    isMinimized: false,
    position: { x: 250, y: 120 },
    size: { width: 450, height: 400 },
    zIndex: 0,
  },
]

export function Desktop() {
  const [windows, setWindows] = useState<WindowState[]>(initialWindows)
  const [highestZIndex, setHighestZIndex] = useState(1)
  const [isBooting, setIsBooting] = useState(true)
  const [showDesktop, setShowDesktop] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)

  const handleBootComplete = useCallback(() => {
    setIsBooting(false)
    setShowDesktop(true)
    setTimeout(() => {
      setWindows((prev) => prev.map((w) => (w.id === "home" ? { ...w, isOpen: true, zIndex: 1 } : w)))
      setTimeout(() => setShowTutorial(true), 500)
    }, 300)
  }, [])

  const bringToFront = useCallback(
    (id: WindowId) => {
      setHighestZIndex((prev) => prev + 1)
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: highestZIndex + 1 } : w)))
    },
    [highestZIndex],
  )

  const openWindow = useCallback(
    (id: WindowId) => {
      setHighestZIndex((prev) => prev + 1)
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: highestZIndex + 1 } : w)),
      )
    },
    [highestZIndex],
  )

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w)))
  }, [])

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)))
  }, [])

  const updatePosition = useCallback((id: WindowId, position: { x: number; y: number }) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, position } : w)))
  }, [])

  const updateSize = useCallback((id: WindowId, size: { width: number; height: number }) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, size } : w)))
  }, [])

  const getWindowContent = (id: WindowId) => {
    switch (id) {
      case "home":
        return <HomeContent onOpenWindow={openWindow} />
      case "projects":
        return <ProjectsContent />
      case "about":
        return <AboutContent />
      case "contact":
        return <ContactContent />
      default:
        return null
    }
  }

  return (
    <div className="relative h-screen w-screen bg-background overflow-hidden">
      {isBooting && <BootSequence onComplete={handleBootComplete} />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showDesktop ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary/30 via-background to-background"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showDesktop ? 0.02 : 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <AnimatePresence>
        {windows.map((window) =>
          window.isOpen && !window.isMinimized ? (
            <Window
              key={window.id}
              id={window.id}
              title={window.title}
              position={window.position}
              size={window.size}
              zIndex={window.zIndex}
              onClose={() => closeWindow(window.id)}
              onMinimize={() => minimizeWindow(window.id)}
              onFocus={() => bringToFront(window.id)}
              onPositionChange={(pos) => updatePosition(window.id, pos)}
              onSizeChange={(size) => updateSize(window.id, size)}
            >
              {getWindowContent(window.id)}
            </Window>
          ) : null,
        )}
      </AnimatePresence>

      {showDesktop && <Dock windows={windows} onOpenWindow={openWindow} />}

      {showTutorial && <TutorialOverlay onComplete={() => setShowTutorial(false)} />}
    </div>
  )
}
