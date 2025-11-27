"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { WindowId } from "./desktop"

interface HomeContentProps {
  onOpenWindow: (id: WindowId) => void
}

export function HomeContent({ onOpenWindow }: HomeContentProps) {
  return (
    <div className="p-8 h-full flex flex-col justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-sm text-muted-foreground font-medium">Creative Developer</span>
        </div>

        <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Welcome to my digital workspace</h1>

        <p className="text-muted-foreground text-lg leading-relaxed mb-8 text-pretty">
          I’m a Software Engineer focused on building intelligent, scalable systems and solving complex problems. I’m driven by continuous learning and a strong desire to create meaningful, high-impact work.
        </p>

        <div className="flex flex-wrap gap-3">
          <Button onClick={() => onOpenWindow("projects")} className="group">
            View Projects
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" onClick={() => onOpenWindow("about")}>
            About Me
          </Button>
          <Button variant="ghost" onClick={() => onOpenWindow("contact")}>
            Get in Touch
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
