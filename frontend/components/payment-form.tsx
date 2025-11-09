"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CreditCard, Smartphone, Truck } from "lucide-react"

interface PaymentFormProps {
  formData: any
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  handlePaymentMethodChange: (method: string) => void
}

export default function PaymentForm({ formData, handleInputChange, handlePaymentMethodChange }: PaymentFormProps) {
  return (
    <Card className="bg-card border-0 p-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">Payment Method</h2>

      <div className="space-y-6">
        {/* Payment Method Selection */}
        <div className="space-y-3">
          {/* Credit Card */}
          <label
            className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all"
            style={{ borderColor: formData.paymentMethod === "card" ? "var(--color-primary)" : "var(--color-border)" }}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod === "card"}
              onChange={(e) => handlePaymentMethodChange(e.target.value)}
              className="w-4 h-4"
            />
            <CreditCard className="w-5 h-5 ml-3 text-primary" />
            <span className="ml-3 font-semibold text-foreground">Credit/Debit Card</span>
          </label>

          {/* UPI */}
          <label
            className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all"
            style={{ borderColor: formData.paymentMethod === "upi" ? "var(--color-primary)" : "var(--color-border)" }}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={formData.paymentMethod === "upi"}
              onChange={(e) => handlePaymentMethodChange(e.target.value)}
              className="w-4 h-4"
            />
            <Smartphone className="w-5 h-5 ml-3 text-primary" />
            <span className="ml-3 font-semibold text-foreground">UPI Payment</span>
          </label>

          {/* Cash on Delivery */}
          <label
            className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all"
            style={{ borderColor: formData.paymentMethod === "cod" ? "var(--color-primary)" : "var(--color-border)" }}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={formData.paymentMethod === "cod"}
              onChange={(e) => handlePaymentMethodChange(e.target.value)}
              className="w-4 h-4"
            />
            <Truck className="w-5 h-5 ml-3 text-primary" />
            <span className="ml-3 font-semibold text-foreground">Cash on Delivery</span>
          </label>
        </div>

        {/* Card Details (shown only for card payment) */}
        {formData.paymentMethod === "card" && (
          <div className="space-y-4 pt-6 border-t border-border">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Cardholder Name</label>
              <Input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full px-4 py-2 rounded-lg bg-muted border-0 focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Card Number</label>
              <Input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full px-4 py-2 rounded-lg bg-muted border-0 focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Expiry Date</label>
                <Input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full px-4 py-2 rounded-lg bg-muted border-0 focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">CVV</label>
                <Input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength={3}
                  className="w-full px-4 py-2 rounded-lg bg-muted border-0 focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-700 text-sm font-semibold">✓ Your payment information is secure and encrypted</p>
            </div>
          </div>
        )}

        {/* UPI Details */}
        {formData.paymentMethod === "upi" && (
          <div className="bg-muted rounded-lg p-6 text-center">
            <p className="text-foreground font-semibold mb-2">UPI Payment</p>
            <p className="text-muted-foreground text-sm">
              You will be redirected to your UPI app to complete the payment
            </p>
          </div>
        )}

        {/* COD Details */}
        {formData.paymentMethod === "cod" && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <p className="text-green-700 font-semibold mb-2">Cash on Delivery</p>
            <p className="text-green-600 text-sm">Pay when your order arrives. No additional charges.</p>
          </div>
        )}
      </div>
    </Card>
  )
}
