"use client"

import type React from "react"
import { useState } from "react"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MessageSquare, HelpCircle, Bug, Lightbulb, Loader2 } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // محاكاة الإرسال
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // إعادة تعيين البيانات
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      type: "general",
    })

    setIsSubmitting(false)

    // عرض إشعار النجاح
    toast.success("Your message has been sent successfully!")
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif font-bold text-4xl lg:text-5xl text-foreground mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question, suggestion, or just want to say hello? We&#39;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-serif font-semibold text-xl mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className=" mb-3">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className=" mb-3">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="type" className=" mb-3">Message Type</Label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="feature">Feature Request</option>
                      <option value="bug">Bug Report</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="subject" className=" mb-3">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Brief description of your message"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className=" mb-3">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className=" h-40"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2">
                    {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardContent >
                <h3 className="font-serif font-semibold text-lg mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">hello@bookverse.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-sm text-muted-foreground">Usually within 24 hours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="font-serif font-semibold text-lg mb-4">Common Topics</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">How to search for books</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Bug className="h-4 w-4 text-primary" />
                    <span className="text-sm">Report technical issues</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    <span className="text-sm">Suggest new features</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span className="text-sm">General feedback</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="font-serif font-semibold text-lg mb-4">About Our Data</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  BookVerse is powered by the Open Library, a project of the Internet Archive. All book data is sourced
                  from this comprehensive, community-driven database.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
