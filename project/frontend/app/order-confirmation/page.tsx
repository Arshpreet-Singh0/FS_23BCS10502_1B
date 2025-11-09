"use client"

import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Package, Truck, MapPin, Mail } from "lucide-react"

export default function OrderConfirmationPage() {
  const orderNumber = "#ORD-2025-001234"
  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const orderItems = [
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

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 10
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Order Confirmed!</h1>
          <p className="text-lg text-muted-foreground">Thank you for your purchase</p>
        </div>

        {/* Order Number & Date */}
        <Card className="bg-card border-0 p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Order Number</p>
              <p className="text-2xl font-bold text-foreground">{orderNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Order Date</p>
              <p className="text-2xl font-bold text-foreground">{orderDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Estimated Delivery</p>
              <p className="text-2xl font-bold text-foreground">3-5 Business Days</p>
            </div>
          </div>
        </Card>

        {/* Order Status Timeline */}
        <Card className="bg-card border-0 p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Order Status</h2>
          <div className="space-y-6">
            {/* Order Placed */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="w-1 h-12 bg-green-200"></div>
              </div>
              <div>
                <p className="font-semibold text-foreground">Order Placed</p>
                <p className="text-sm text-muted-foreground">Your order has been confirmed</p>
              </div>
            </div>

            {/* Processing */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div className="w-1 h-12 bg-gray-200"></div>
              </div>
              <div>
                <p className="font-semibold text-foreground">Processing</p>
                <p className="text-sm text-muted-foreground">We're preparing your order</p>
              </div>
            </div>

            {/* Shipped */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                  <Truck className="w-6 h-6 text-gray-400" />
                </div>
                <div className="w-1 h-12 bg-gray-200"></div>
              </div>
              <div>
                <p className="font-semibold text-foreground">Shipped</p>
                <p className="text-sm text-muted-foreground">Your order is on its way</p>
              </div>
            </div>

            {/* Delivered */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-gray-400" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-foreground">Delivered</p>
                <p className="text-sm text-muted-foreground">Order delivered to your address</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-0 p-8 mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Order Items</h2>
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-border last:border-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover bg-muted"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      <p className="font-bold text-primary mt-2">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Shipping & Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card border-0 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Shipping Address</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  John Doe
                  <br />
                  123 Main Street
                  <br />
                  New York, NY 10001
                  <br />
                  United States
                </p>
              </Card>

              <Card className="bg-card border-0 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Contact Information</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  john@example.com
                  <br />
                  +1 (555) 123-4567
                </p>
              </Card>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-0 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-foreground mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6">
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

                <div className="bg-muted rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg py-3 font-semibold">
                  Track Order
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-lg border-border bg-transparent hover:bg-muted text-foreground py-3 font-semibold"
                >
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Help Section */}
        <Card className="bg-muted border-0 p-8 mt-8">
          <h3 className="text-lg font-bold text-foreground mb-4">Need Help?</h3>
          <p className="text-muted-foreground mb-4">
            If you have any questions about your order, please contact our customer support team.
          </p>
          <div className="flex gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 py-2 font-semibold">
              Contact Support
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-lg border-border bg-transparent hover:bg-background text-foreground px-6 py-2 font-semibold"
            >
              <Link href="/faq">View FAQ</Link>
            </Button>
          </div>
        </Card>
      </div>

      <Footer />
    </main>
  )
}
