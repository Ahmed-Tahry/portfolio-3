"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const projects = [
  {
    id: 1,
    title: "Data Backup Method Utlity",
    description:
      "A command-line utility for backing up and restoring databases from multiple sources to various storage destinations.",
    image: "/data-backup-methods.jpg.webp",
    tags: ["Python", "PostgreSQL", "AWS", "Backup"],
    liveUrl: "#",
    githubUrl: "https://github.com/Ahmed-Tahry/Database-Backup-Utility",
  },
  {
    id: 2,
    title: "Clear Cast",
    description: "This project is a conversational AI agent that can fetch, analyze, and discuss news articles. It's built with FastAPI, LangChain, and LangGraph, and features a simple web interface for interaction.",
    image: "/agent news.png",
    tags: ["LLMs", "LangChain", "LangGraph", "Python","Next.js"],
    liveUrl: "#",
    githubUrl: "https://github.com/Ahmed-Tahry/NewsAgent",
  },
  {
    id: 3,
    title: "Ecommbasis",
    description: "Ecommerce managment website , Unifies multiple shopping platforms into a single dashboard for streamlined management.",
    image: "/Capture-98462.PNG",
    tags: ["Kubernetes", "Node.js", "Next.js", "Microservices","AzureDevOps"],
    liveUrl: "#",
    githubUrl: "https://github.com/Ahmed-Tahry/EcommerceWebapp",
  },
   {
    id: 4,
    title: "MarketMind",
    description: "MarketMind AI is an innovative platform designed to revolutionize digital marketing by leveraging multiple Large Language Models (LLMs).",
    image: "/Capture46546455664.PNG",
    tags: ["LLMs", "microservices", "Tailwind CSS", "React.js"],
    liveUrl: "#",
    githubUrl: "https://github.com/Ahmed-Tahry/MarketMind",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ProjectsContent() {
  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Selected Work</h2>
        <p className="text-muted-foreground">A collection of projects I'm proud of</p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={item}
            className="group relative bg-secondary/30 rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-colors"
          >
            <div className="flex flex-col sm:flex-row">
              {/* Project Image */}
              <div className="sm:w-48 h-32 sm:h-auto overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Project Info */}
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs px-2 py-0.5">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" className="w-8 h-8" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button size="icon" variant="ghost" className="w-8 h-8" asChild>
                      <a href={project.liveUrl}>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
