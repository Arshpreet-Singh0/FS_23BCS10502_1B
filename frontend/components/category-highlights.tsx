"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"

const categories = [
  {
    id: 1,
    name: "Fashion",
    image: "/colorful-fashion-clothing.jpg",
    color: "from-primary/20 to-primary/5",
  },
  {
    id: 2,
    name: "Electronics",
    image: "/modern-electronics.png",
    color: "from-accent/20 to-accent/5",
  },
  {
    id: 3,
    name: "Home Decor",
    image: "/modern-home-decor.png",
    color: "from-secondary/20 to-secondary/5",
  },
]

export default function CategoryHighlights() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Shop by Category</h2>
          <p className="text-muted-foreground text-lg">Explore our diverse collection</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.name.toLowerCase()}`}>
              <Card
                className={`overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 bg-gradient-to-br ${category.color} border-0`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-foreground">{category.name}</h3>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
