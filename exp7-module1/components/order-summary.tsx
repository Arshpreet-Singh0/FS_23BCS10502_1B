"use client"

import { Card } from "@/components/ui/card"

const cartItems = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 129.99,
    quantity: 1,
    image: "/premium-wireless-headphones.png",
  },
  {
    id: 2,
    name: "Elegant Summer Dress",
    price: 79.99,
    quantity: 2,
    image: "/elegant-summer-dress-fashion.jpg",
  },
]

export default function OrderSummary() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 10
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <Card className="bg-card border-0 p-6 sticky top-24">
      <h3 className="text-xl font-bold text-foreground mb-6">Order Summary</h3>

      {/* Items */}
      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4 pb-4 border-b border-border">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="w-16 h-16 rounded-lg object-cover bg-muted"
            />
            <div className="flex-1">
              <p className="font-semibold text-foreground text-sm line-clamp-2">{item.name}</p>
              <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
              <p className="font-bold text-primary text-sm">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-3 border-t border-border pt-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-foreground font-semibold">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax (10%)</span>
          <span className="text-foreground font-semibold">${tax.toFixed(2)}</span>
        </div>

        <div className="bg-muted rounded-lg p-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="font-bold text-foreground">Total</span>
            <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Promo Code */}
      <div className="mt-6 pt-6 border-t border-border">
        <input
          type="text"
          placeholder="Enter promo code"
          className="w-full px-4 py-2 rounded-lg bg-muted border-0 focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground text-sm"
        />
        <button className="w-full mt-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg py-2 font-semibold text-sm transition-colors">
          Apply Code
        </button>
      </div>
    </Card>
  )
}
