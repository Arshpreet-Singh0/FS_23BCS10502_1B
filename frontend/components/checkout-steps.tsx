"use client"

import { Check } from "lucide-react"

interface CheckoutStepsProps {
  currentStep: number
}

const steps = [
  { number: 1, title: "Shipping", description: "Address & Contact" },
  { number: 2, title: "Payment", description: "Payment Method" },
  { number: 3, title: "Review", description: "Order Summary" },
  { number: 4, title: "Confirmation", description: "Order Placed" },
]

export default function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <div className="flex items-center justify-between mb-12">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center flex-1">
          {/* Step Circle */}
          <div className="flex flex-col items-center flex-1">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                currentStep >= step.number ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {currentStep > step.number ? <Check className="w-6 h-6" /> : step.number}
            </div>
            <div className="mt-2 text-center">
              <p className="font-semibold text-foreground text-sm">{step.title}</p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`h-1 flex-1 mx-2 transition-all ${currentStep > step.number ? "bg-primary" : "bg-muted"}`}
            ></div>
          )}
        </div>
      ))}
    </div>
  )
}
