"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Home, FolderKanban, User, Mail } from "lucide-react"
import type { WindowId } from "./desktop"

interface WindowState {
  id: WindowId
  title: string
  isOpen: boolean
  isMinimized: boolean
}

interface DockProps {
  windows: WindowState[]
  onOpenWindow: (id: WindowId) => void
}

const dockItems = [
  { id: "home" as WindowId, icon: Home, label: "Home" },
  { id: "projects" as WindowId, icon: FolderKanban, label: "Projects" },
  { id: "about" as WindowId, icon: User, label: "About" },
  { id: "contact" as WindowId, icon: Mail, label: "Contact" },
]

export function Dock({ windows, onOpenWindow }: DockProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: "spring", damping: 20 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl shadow-black/30">
        {dockItems.map((item) => {
          const windowState = windows.find((w) => w.id === item.id)
          const isActive = windowState?.isOpen && !windowState?.isMinimized

          return (
            <DockIcon
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={isActive}
              onClick={() => onOpenWindow(item.id)}
            />
          )
        })}
      </div>
    </motion.div>
  )
}

interface DockIconProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  isActive?: boolean
  onClick: () => void
}

function DockIcon({ icon: Icon, label, isActive, onClick }: DockIconProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.2, y: -8 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative group"
    >
      <div
        className={`
        p-3 rounded-xl transition-all duration-200
        ${
          isActive
            ? "bg-primary/20 text-primary"
            : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
        }
      `}
      >
        <Icon className="w-6 h-6" />
      </div>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="dock-indicator"
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
        />
      )}

      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-border">
        {label}
      </div>
    </motion.button>
  )
}
