"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart } from "lucide-react"
import { axiosInstance } from "@/configs/AxiosInstance"

interface Product {
  id: number
  title: string
  price: number
  discount: number
  quantity: number
  imageUrl: string
  mainCategory: string
  category: string
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await axiosInstance.get("/product")
        const data = res?.data?.data || []
        // Pick only 4 products for "featured"
        setProducts(data.slice(0, 4))
      } catch (error) {
        console.error("Error fetching featured products:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchFeaturedProducts()
  }, [])

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Featured Products
            </h2>
            <p className="text-muted-foreground">
              Handpicked items just for you
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="hidden md:inline-flex rounded-full bg-transparent"
          >
            <Link href="/products">View All</Link>
          </Button>
        </div>

        {/* Products Grid */}
        {loading ? (
          <p className="text-center text-muted-foreground">Loading products...</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const originalPrice = product.price + product.discount
              const discountPercent = Math.round(
                (product.discount / originalPrice) * 100
              )

              return (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 bg-card border-0">
                    {/* Product Image */}
                    <div className="relative h-64 overflow-hidden bg-muted">
                      <img
                        src={product.imageUrl || "/placeholder.svg"}
                        alt={product.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                      {discountPercent > 0 && (
                        <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                          {discountPercent}% OFF
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                        {product.title}
                      </h3>

                      {/* Rating Placeholder */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < 4
                                  ? "fill-accent text-accent"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">(100+)</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg font-bold text-primary">
                          ₹{product.price.toFixed(2)}
                        </span>
                        {product.discount > 0 && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Add to Cart Button */}
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg flex items-center justify-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No featured products found.
          </p>
        )}

        {/* View All Button (Mobile) */}
        <div className="mt-8 md:hidden">
          <Button
            asChild
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6"
          >
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
