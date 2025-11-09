import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Target, Heart, Award } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To provide a seamless, inclusive shopping experience with premium quality products at affordable prices.",
    },
    {
      icon: Users,
      title: "Our Community",
      description:
        "We serve millions of customers worldwide, building lasting relationships through trust and excellent service.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description:
        "Your satisfaction is our priority. We listen, adapt, and continuously improve based on your feedback.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We're committed to offering the best products, prices, and customer experience in the industry.",
    },
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
    },
    {
      name: "Michael Chen",
      role: "Chief Product Officer",
      image: "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
    },
    {
      name: "Emma Rodriguez",
      role: "Head of Operations",
      image: "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
    },
    {
      name: "David Kim",
      role: "VP of Customer Success",
      image: "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
    },
  ]

  const stats = [
    { label: "Active Customers", value: "2.5M+" },
    { label: "Products Listed", value: "50K+" },
    { label: "Daily Orders", value: "100K+" },
    { label: "Countries Served", value: "50+" },
  ]

  return (
    <main className="min-h-screen bg-background">
        <Header />
      {/* Hero Section */}
      <section className="bg-linear-to-r from-primary/10 to-accent/10 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-pretty">
              Redefining Online Shopping
            </h1>
            <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
              StyleHub is on a mission to make quality products accessible to everyone, everywhere. Since our launch,
              we've been committed to delivering exceptional value and service to millions of customers worldwide.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8"
            >
              <Link href="/products">Explore Our Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-slide-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <p className="text-foreground/70 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-border"
                >
                  <div className="bg-primary/10 rounded-lg w-14 h-14 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">Meet Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="text-center animate-slide-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative mb-6 rounded-2xl overflow-hidden bg-muted h-64 w-full">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-foreground/70 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">Our Story</h2>
          <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
            <p>
              StyleHub was founded in 2020 with a simple vision: to make quality shopping accessible to everyone. What
              started as a small team of passionate e-commerce enthusiasts has grown into a thriving marketplace serving
              millions of customers across the globe.
            </p>
            <p>
              We believe that shopping should be easy, enjoyable, and rewarding. That's why we've invested heavily in
              our platform to ensure fast delivery, secure payments, and exceptional customer service. Our curated
              selection of fashion, electronics, and home products is carefully chosen to meet the diverse needs of our
              community.
            </p>
            <p>
              Today, StyleHub is proud to be one of the fastest-growing e-commerce platforms, known for our innovative
              approach, competitive prices, and unwavering commitment to customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-linear-to-r from-primary to-accent/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">Join Our Growing Community</h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Discover thousands of products, exclusive deals, and fast delivery. Start shopping with StyleHub today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-8"
            >
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10 rounded-full px-8 bg-transparent"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
