"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { X, Minus, Maximize2 } from "lucide-react"
import type { WindowId } from "./desktop"

interface WindowProps {
  id: WindowId
  title: string
  children: React.ReactNode
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
  onPositionChange: (position: { x: number; y: number }) => void
  onSizeChange: (size: { width: number; height: number }) => void
}

export function Window({
  id,
  title,
  children,
  position,
  size,
  zIndex,
  onClose,
  onMinimize,
  onFocus,
  onPositionChange,
  onSizeChange,
}: WindowProps) {
  const constraintsRef = useRef<HTMLDivElement>(null)
  const [isMaximized, setIsMaximized] = useState(false)
  const [preMaximizeState, setPreMaximizeState] = useState({ position, size })

  const handleMaximize = () => {
    if (isMaximized) {
      onPositionChange(preMaximizeState.position)
      onSizeChange(preMaximizeState.size)
      setIsMaximized(false)
    } else {
      setPreMaximizeState({ position, size })
      onPositionChange({ x: 0, y: 0 })
      onSizeChange({ width: window.innerWidth, height: window.innerHeight - 80 })
      setIsMaximized(true)
    }
  }

  return (
    <>
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none" />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          x: position.x,
          y: position.y,
          width: size.width,
          height: size.height,
        }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        drag={!isMaximized}
        dragMomentum={false}
        dragConstraints={constraintsRef}
        onDragEnd={(_, info) => {
          onPositionChange({
            x: position.x + info.offset.x,
            y: position.y + info.offset.y,
          })
        }}
        onPointerDown={onFocus}
        style={{ zIndex }}
        className="fixed rounded-xl overflow-hidden bg-card border border-border shadow-2xl shadow-black/50"
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-secondary/50 border-b border-border cursor-grab active:cursor-grabbing">
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors group flex items-center justify-center"
            >
              <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onMinimize()
              }}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors group flex items-center justify-center"
            >
              <Minus className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleMaximize()
              }}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors group flex items-center justify-center"
            >
              <Maximize2 className="w-1.5 h-1.5 text-green-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <div className="w-[52px]" /> {/* Spacer for centering */}
        </div>

        {/* Content */}
        <div className="overflow-auto" style={{ height: `calc(100% - 48px)` }}>
          {children}
        </div>

        {/* Resize handle */}
        {!isMaximized && (
          <motion.div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
            drag
            dragMomentum={false}
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            dragElastic={0}
            onDrag={(_, info) => {
              const newWidth = Math.max(300, size.width + info.delta.x)
              const newHeight = Math.max(200, size.height + info.delta.y)
              onSizeChange({ width: newWidth, height: newHeight })
            }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <svg className="w-4 h-4 text-muted-foreground/30" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 22H20V20H22V22ZM22 18H20V16H22V18ZM18 22H16V20H18V22ZM22 14H20V12H22V14ZM18 18H16V16H18V18ZM14 22H12V20H14V22Z" />
            </svg>
          </motion.div>
        )}
      </motion.div>
    </>
  )
}
