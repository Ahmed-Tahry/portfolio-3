"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Facebook, Github, Linkedin, Twitter } from "lucide-react"

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "Framer Motion",

  "REST APIs",
  "GraphQL",
  "WebSockets",

  "PostgreSQL",
  "Redis",
  "MongoDB",

  "Docker",
  "Kubernetes",
  "CI/CD",
  "Linux",

  "Microservices Architecture",
  "Event-Driven Architecture",
  "Message Queues",

  "Apache Kafka",
  "Apache Spark",
  "Hadoop",
  "Apache Airflow",

  "Data Warehousing",
  "ETL Pipelines",
  "Big Data Processing",

  "System Design",
  "Distributed Systems",
  "Scalability & Performance Optimization"
];


const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
}

export function AboutContent() {
  return (
    <div className="p-8">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        {/* Profile Section */}
        <motion.div variants={item} className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 border border-border flex items-center justify-center text-3xl font-bold text-primary">
            JD
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-1">Ahmed Tahri</h2>
            <p className="text-primary font-medium mb-2">Software Engineer</p>
            <p className="text-muted-foreground text-sm">Tunis, Tunis</p>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div variants={item}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">About</h3>
          <p className="text-foreground leading-relaxed">
            I’m a Software engineer focused on backend systems and machine learning. I’ve built scalable architectures using Django, Flask, RabbitMQ, Docker, and PostgreSQL, and worked on AI-driven projects involving sentiment analysis, LLM orchestration, and data pipelines. I design reliable systems and turn complex ideas into practical solutions. My goal is to build efficient software that solves real-world problems.
          </p>
        </motion.div>

        {/* Skills */}
        <motion.div variants={item}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="px-3 py-1">
                {skill}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={item}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Connect</h3>
          <div className="flex gap-3">
            <a href="https://github.com/Ahmed-Tahry/" className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 text-foreground" />
            </a>
            <a href="https://www.linkedin.com/in/ahmed-tahri-01045124a/" className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5 text-foreground" />
            </a>
            <a href="https://www.facebook.com/ahmed002a" className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-5 h-5 text-foreground" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
