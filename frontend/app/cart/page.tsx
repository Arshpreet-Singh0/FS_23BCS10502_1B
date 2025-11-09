"use client"

import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useState } from "react"

export default function CartPage() {
  const { items: cartItems, updateQuantity, removeItem, loading } = useCart()
  const [updatingItemId, setUpdatingItemId] = useState<number | null>(null)

  // Totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )
  const shipping = cartItems.length > 0 ? 10 : 0
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  // Handle quantity updates with visual feedback
  const handleQuantityChange = async (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return
    try {
      setUpdatingItemId(productId)
      await updateQuantity(productId, newQuantity)
    } finally {
      setUpdatingItemId(null)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">{cartItems.length} items in your cart</p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-16 text-muted-foreground text-lg">
            Loading your cart...
          </div>
        )}

        {!loading && cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card
                    key={item.product.id}
                    className="bg-card border-0 p-6 flex gap-6"
                  >
                    {/* Image */}
                    <Link
                      href={`/product/${item.product.id}`}
                      className="flex-shrink-0"
                    >
                      <img
                        src={item.product.imageUrl || "/placeholder.svg"}
                        alt={item.product.title}
                        className="w-24 h-24 rounded-lg object-cover hover:opacity-80 transition-opacity"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1">
                      <Link
                        href={`/product/${item.product.id}`}
                        className="hover:text-primary transition-colors"
                      >
                        <h3 className="font-semibold text-foreground text-lg mb-2">
                          {item.product.title}
                        </h3>
                      </Link>
                      <p className="text-muted-foreground text-sm mb-2 capitalize">
                        {item.product.category?.toLowerCase()}
                      </p>
                      <p className="font-bold text-primary text-lg">
                        ₹{item.product.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity + Actions */}
                    <div className="flex flex-col items-end justify-between">
                      <div className="flex items-center gap-3 bg-muted rounded-lg p-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.product.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1 || updatingItemId === item.product.id}
                          className="w-8 h-8 flex items-center justify-center hover:bg-primary/20 rounded transition-colors disabled:opacity-40"
                        >
                          <Minus className="w-4 h-4 text-foreground" />
                        </button>

                        <span className="w-8 text-center font-semibold text-foreground">
                          {updatingItemId === item.product.id ? (
                            <span className="animate-pulse">...</span>
                          ) : (
                            item.quantity
                          )}
                        </span>

                        <button
                          onClick={() =>
                            handleQuantityChange(item.product.id, item.quantity + 1)
                          }
                          disabled={updatingItemId === item.product.id}
                          className="w-8 h-8 flex items-center justify-center hover:bg-primary/20 rounded transition-colors disabled:opacity-40"
                        >
                          <Plus className="w-4 h-4 text-foreground" />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.product.id)}
                        disabled={updatingItemId === item.product.id}
                        className="text-red-500 hover:text-red-700 transition-colors mt-4 flex items-center gap-2 disabled:opacity-40"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm">Remove</span>
                      </button>

                      {/* Item Total */}
                      <p className="font-bold text-foreground text-lg mt-4">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Continue Shopping */}
              <Button
                asChild
                variant="outline"
                className="w-full mt-6 rounded-lg border-border bg-transparent hover:bg-muted text-foreground py-3 font-semibold"
              >
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-card border-0 p-6 sticky top-24">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground font-semibold">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground font-semibold">
                      ₹{shipping.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="text-foreground font-semibold">
                      ₹{tax.toFixed(2)}
                    </span>
                  </div>

                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-foreground">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground rounded-lg py-3 font-semibold"
                >
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    ✓ Secure checkout with SSL encryption
                  </p>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          !loading && (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground mb-8">
                Start shopping to add items to your cart
              </p>
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-8 py-3 font-semibold"
              >
                <Link href="/products">Start Shopping</Link>
              </Button>
            </div>
          )
        )}
      </div>

      <Footer />
    </main>
  )
}
