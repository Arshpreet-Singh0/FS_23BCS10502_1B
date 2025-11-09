"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CheckoutSteps from "@/components/checkout-steps"
import ShippingForm from "@/components/shipping-form"
import PaymentForm from "@/components/payment-form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/context/cart-context"

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const { items: cartItems, loading } = useCart()

  const [formData, setFormData] = useState({
    // Shipping Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    // Payment Info
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paymentMethod: "card",
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentMethodChange = (method: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }))
  }

  const handleNextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handlePlaceOrder = () => {
    console.log("Order placed:", { formData, cartItems })
    setCurrentStep(4) // Go to confirmation step
  }

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )
  const shipping = cartItems.length > 0 ? 10 : 0
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Checkout</h1>
          <p className="text-muted-foreground">Complete your purchase securely</p>
        </div>

        {/* Steps */}
        <CheckoutSteps currentStep={currentStep} />

        {currentStep === 4 ? (
          // Order Confirmation
          <div className="max-w-2xl mx-auto mt-12">
            <Card className="bg-card border-0 p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Order Confirmed!
                </h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for your purchase. Your order has been placed
                  successfully.
                </p>
              </div>

              <div className="bg-muted rounded-lg p-6 mb-6 text-left">
                <p className="text-sm text-muted-foreground mb-2">Order Number</p>
                <p className="text-2xl font-bold text-foreground mb-4">
                  #ORD-2025-001234
                </p>
                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent to{" "}
                  <span className="font-semibold text-foreground">
                    {formData.email}
                  </span>
                </p>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg py-3 font-semibold">
                  View Order Details
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-lg border-border bg-transparent hover:bg-muted text-foreground py-3 font-semibold"
                >
                  Continue Shopping
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Main Checkout Form */}
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <ShippingForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}
              {currentStep === 2 && (
                <PaymentForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handlePaymentMethodChange={handlePaymentMethodChange}
                />
              )}
              {currentStep === 3 && (
                <Card className="bg-card border-0 p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Review Your Order
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-muted rounded-lg p-4">
                      <h3 className="font-semibold text-foreground mb-2">
                        Shipping Address
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {formData.firstName} {formData.lastName}
                        <br />
                        {formData.address}
                        <br />
                        {formData.city}, {formData.state} {formData.zipCode}
                        <br />
                        {formData.country}
                      </p>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <h3 className="font-semibold text-foreground mb-2">
                        Payment Method
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {formData.paymentMethod === "card"
                          ? `Credit Card ending in ${formData.cardNumber.slice(
                              -4
                            )}`
                          : formData.paymentMethod === "upi"
                          ? "UPI Payment"
                          : "Cash on Delivery"}
                      </p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-700 text-sm font-semibold">
                        ✓ All information verified. Ready to place order.
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {currentStep > 1 && (
                  <Button
                    onClick={handlePreviousStep}
                    variant="outline"
                    className="flex-1 rounded-lg border-border bg-transparent hover:bg-muted text-foreground py-3 font-semibold"
                  >
                    Back
                  </Button>
                )}
                {currentStep < 3 && (
                  <Button
                    onClick={handleNextStep}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg py-3 font-semibold"
                  >
                    Continue
                  </Button>
                )}
                {currentStep === 3 && (
                  <Button
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground rounded-lg py-3 font-semibold"
                  >
                    Place Order
                  </Button>
                )}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-card border-0 p-6 sticky top-24">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Order Summary
                </h3>

                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-[350px] overflow-y-auto">
                  {loading ? (
                    <p className="text-muted-foreground text-sm">Loading cart...</p>
                  ) : cartItems.length > 0 ? (
                    cartItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-3 border-b border-border pb-3"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.title}
                            className="w-12 h-12 rounded-md object-cover"
                          />
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {item.product.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-foreground">
                          ₹{(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center">
                      Your cart is empty
                    </p>
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-3 mb-6">
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

                <p className="text-xs text-muted-foreground text-center">
                  ✓ Secure checkout with SSL encryption
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
