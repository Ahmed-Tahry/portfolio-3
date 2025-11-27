"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, Mail, MapPin, Clock } from "lucide-react"

export function ContactContent() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="p-8 h-full flex items-center justify-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
          <p className="text-muted-foreground">Thanks for reaching out. I'll get back to you soon.</p>
          <Button variant="outline" className="mt-4 bg-transparent" onClick={() => setSubmitted(false)}>
            Send Another
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Get in Touch</h2>
        <p className="text-muted-foreground">Have a project in mind? Let's talk.</p>
      </motion.div>

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3 mb-6"
      >
        <div className="p-3 rounded-lg bg-secondary/50 border border-border">
          <Mail className="w-4 h-4 text-primary mb-1" />
          <p className="text-xs text-muted-foreground">Email</p>
          <p className="text-sm text-foreground truncate">ahmed.tahri12@outlook.fr</p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/50 border border-border">
          <MapPin className="w-4 h-4 text-primary mb-1" />
          <p className="text-xs text-muted-foreground">Location</p>
          <p className="text-sm text-foreground">Tunis,Tunis</p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/50 border border-border">
          <Clock className="w-4 h-4 text-primary mb-1" />
          <p className="text-xs text-muted-foreground">Response</p>
          <p className="text-sm text-foreground">{"< 24 hours"}</p>
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" placeholder="Project inquiry" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" placeholder="Tell me about your project..." rows={4} required />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>Sending...</>
          ) : (
            <>
              Send Message
              <Send className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </motion.form>
    </div>
  )
}
