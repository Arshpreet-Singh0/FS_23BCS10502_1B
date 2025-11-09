"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart } from "lucide-react"

const suggestedProductsData = [
  {
    id: 2,
    name: "Elegant Summer Dress",
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.6,
    reviews: 156,
    image: "/elegant-summer-dress-fashion.jpg",
  },
  {
    id: 3,
    name: "Modern Desk Lamp",
    price: 49.99,
    originalPrice: 79.99,
    rating: 4.7,
    reviews: 89,
    image: "/modern-minimalist-desk-lamp.jpg",
  },
  {
    id: 4,
    name: "Comfortable Running Shoes",
    price: 99.99,
    originalPrice: 149.99,
    rating: 4.9,
    reviews: 512,
    image: "/comfortable-running-shoes-athletic.jpg",
  },
  {
    id: 5,
    name: "Wireless Charging Pad",
    price: 34.99,
    originalPrice: 59.99,
    rating: 4.5,
    reviews: 203,
    image: "/premium-wireless-headphones.png",
  },
]

interface SuggestedProductsProps {
  currentProductId: number
}

export default function SuggestedProducts({ currentProductId }: SuggestedProductsProps) {
  const suggested = suggestedProductsData.filter((p) => p.id !== currentProductId)

  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {suggested.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 bg-card border-0 h-full flex flex-col">
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2 flex-grow">{product.name}</h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-bold text-primary">${product.price}</span>
                  <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
                </div>

                {/* Add to Cart Button */}
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg flex items-center justify-center gap-2 text-sm">
                  <ShoppingCart className="w-3 h-3" />
                  Add to Cart
                </Button>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
