"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCarousel from "@/components/product-carousel"
import SuggestedProducts from "@/components/suggested-products"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react"
import { axiosInstance } from "@/configs/AxiosInstance"
import { useCart } from "@/context/cart-context"
import { useParams } from "next/navigation"

interface Product {
  id: number
  title: string
  description: string
  price: number
  discount: number
  quantity: number
  imageUrl: string
  category: string
  mainCategory: string
}

export default function ProductDetailPage() {
  const {id} = useParams();
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedColor, setSelectedColor] = useState("Default")
  const [selectedSize, setSelectedSize] = useState("One Size")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCart()

  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/product/${id}`)
        setProduct(res?.data?.data)
      } catch (err) {
        console.error("Error fetching product:", err)
        setError("Failed to load product details.")
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground text-lg">Loading product details...</p>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-red-500 text-lg">{error || "Product not found."}</p>
      </main>
    )
  }

  const discountedPrice = product.price - product.discount
  const discountPercent = Math.round((product.discount / product.price) * 100)

  const handleAddToCart = () => {
    addItem(product?.id, quantity);
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Carousel */}
          <div>
            <ProductCarousel images={[product.imageUrl]} />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            {/* Title & Description */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.title}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-primary">
                  ₹{discountedPrice.toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <>
                    <span className="text-2xl text-muted-foreground line-through">
                      ₹{product.price.toFixed(2)}
                    </span>
                    <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full font-semibold">
                      {discountPercent}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Options */}
            <div className="space-y-6 mb-8">
              {/* Size */}
              {/* <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Size
                </label>
                <div className="flex gap-3 flex-wrap">
                  {["One Size", "S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedSize === size
                          ? "bg-primary text-primary-foreground ring-2 ring-primary"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div> */}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center text-foreground font-semibold"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold text-foreground w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center text-foreground font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
              <Button
                onClick={handleAddToCart}
                className={`w-full rounded-lg py-3 font-semibold flex items-center justify-center gap-2 transition-all ${
                  addedToCart
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground"
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {addedToCart ? "Added to Cart!" : "Add to Cart"}
              </Button>

              <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg py-3 font-semibold">
                Buy Now
              </Button>

              <div className="flex gap-3">
                <Button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  variant="outline"
                  className="flex-1 rounded-lg border-border bg-transparent hover:bg-muted text-foreground flex items-center justify-center gap-2"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isWishlisted ? "fill-accent text-accent" : ""
                    }`}
                  />
                  Wishlist
                </Button>

                <Button
                  variant="outline"
                  className="flex-1 rounded-lg border-border bg-transparent hover:bg-muted text-foreground flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </Button>
              </div>
            </div>

            {/* Stock Info */}
            {product.quantity > 0 ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-700 font-semibold">
                  ✓ In Stock - Ships within 2–3 business days
                </p>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700 font-semibold">Out of Stock</p>
              </div>
            )}

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-muted border-0 p-4 text-center">
                <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-semibold text-foreground">
                  Free Shipping
                </p>
              </Card>
              <Card className="bg-muted border-0 p-4 text-center">
                <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-semibold text-foreground">
                  Secure Payment
                </p>
              </Card>
              <Card className="bg-muted border-0 p-4 text-center">
                <RotateCcw className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-semibold text-foreground">
                  Easy Returns
                </p>
              </Card>
            </div>
          </div>
        </div>

        {/* Suggested Products */}
        {/* <SuggestedProducts currentProductId={product.id} /> */}
      </div>

      <Footer />
    </main>
  )
}
