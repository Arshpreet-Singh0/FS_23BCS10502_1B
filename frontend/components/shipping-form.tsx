"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface ShippingFormProps {
  formData: any
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export default function ShippingForm({ formData, handleInputChange }: ShippingFormProps) {
  return (
    <Card className="bg-card border-0 p-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">Shipping Address</h2>

      <div className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="John"
              className="w-full px-4 py-2 rounded-lg bg-muted border-0 focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Doe"
              className="w-full px-4 py-2 rounded-lg bg-muted border-0 focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              className="w-full px-4 py-2 rounded-lg bg-muted border-0 focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-2 rounded-lg bg-muted border-0 focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>

        {/* Address Field */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Street Address</label>
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="123 Main Street"
            className="w-full px-4 py-2 rounded-lg bg-muted border-0 focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* City, State, Zip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">City</label>
            <Input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="New York"
              className="w-full px-4 py-2 rounded-lg bg-muted border-0 focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">State</label>
            <Input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="NY"
              className="w-full px-4 py-2 rounded-lg bg-muted border-0 focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">ZIP Code</label>
            <Input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              placeholder="10001"
              className="w-full px-4 py-2 rounded-lg bg-muted border-0 focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg bg-muted border-0 focus:ring-2 focus:ring-primary text-foreground cursor-pointer"
            required
          >
            <option value="">Select a country</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="India">India</option>
          </select>
        </div>
      </div>
    </Card>
  )
}
