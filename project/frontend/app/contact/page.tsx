"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
    setSubmitted(true)
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    setTimeout(() => setSubmitted(false), 5000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "info@stylehub.com",
      link: "mailto:info@stylehub.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (234) 567-890",
      link: "tel:+1234567890",
    },
    {
      icon: MapPin,
      title: "Address",
      value: "123 Style Street, Fashion City, FC 12345",
      link: null,
    },
    {
      icon: Clock,
      title: "Business Hours",
      value: "Mon-Fri: 9AM-6PM EST",
      link: null,
    },
  ]

  return (
    <main className="min-h-screen bg-background">
        <Header />
      {/* Hero Section */}
      <section className="bg-linear-to-r from-primary/10 to-accent/10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-pretty">Get in Touch</h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Our friendly team is ready to help and will respond as soon as
            possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow text-center"
                >
                  <div className="bg-primary/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-primary hover:text-primary/80 transition-colors text-sm break-all"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-foreground/70 text-sm">{info.value}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 md:py-20 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Send us a Message</h2>
              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-green-800 font-medium">Thank you for your message! We'll get back to you soon.</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (234) 567-890"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a subject</option>
                      <option value="product_inquiry">Product Inquiry</option>
                      <option value="order_issue">Order Issue</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* FAQ or Additional Info */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-3">How long does shipping take?</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    Standard shipping typically takes 5-7 business days. Express shipping is available for 2-3 day
                    delivery in most areas.
                  </p>
                </div>
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-3">What is your return policy?</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    We offer a 30-day return policy on most items. Products must be in original condition with all tags
                    attached.
                  </p>
                </div>
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-3">Is my payment information secure?</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    Yes, we use industry-standard SSL encryption and comply with PCI DSS standards to protect your
                    payment information.
                  </p>
                </div>
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-3">How can I track my order?</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    Once your order ships, you'll receive a tracking number via email that you can use to monitor your
                    delivery in real-time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-linear-to-r from-accent to-primary/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground mb-6">Ready to Shop?</h2>
          <p className="text-lg text-accent-foreground/90 mb-8">
            Browse our collection and find exactly what you're looking for.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 rounded-full px-8"
          >
            <a href="/products">Start Shopping</a>
          </Button>
        </div>
      </section>
      <Footer />
    </main>
  )
}
