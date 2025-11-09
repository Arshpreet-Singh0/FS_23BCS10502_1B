"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { axiosInstance } from "@/configs/AxiosInstance"
import { Product } from "@/components/product-grid";

export interface CartItem {
  quantity : number;
  product : Product
}

interface CartContextType {
  items: CartItem[]
  addItem: (productId: number, quantity: number) => Promise<void>
  removeItem: (id: number) => Promise<void>
  updateQuantity: (id: number, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  cartCount: number
  loading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  // Load token from localStorage (or cookie)
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) setToken(storedToken)
  }, [])

  // Fetch cart items from backend
  useEffect(() => {
    const fetchCart = async () => {
      if (!token) return
      setLoading(true)
      try {
        const res = await axiosInstance.get("/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const backendItems = res?.data?.data || []
        setItems(backendItems)
      } catch (error) {
        console.error("Failed to fetch cart:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [token])

  // Add to cart API
  const addItem = async (productId: number, quantity: number) => {
    if (!token) {
      console.warn("User not authenticated — cannot add to cart.")
      return
    }
    try {
      setLoading(true)
      await axiosInstance.post(
        "/cart",
        { product_id: productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      // Re-fetch cart after adding
      const res = await axiosInstance.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setItems(res?.data?.data || [])
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setLoading(false)
    }
  }

  // Remove item
  const removeItem = async (id: number) => {
    if (!token) return
    try {
      setLoading(true)
      await axiosInstance.delete(`/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setItems((prev) => prev.filter((item) => item.product?.id !== id))
    } catch (error) {
      console.error("Error removing cart item:", error)
    } finally {
      setLoading(false)
    }
  }

  // Update quantity
  const updateQuantity = async (id: number, quantity: number) => {
    if (!token) return
    try {
      
      setItems((prev) =>
        prev.map((item) =>
          item?.product?.id === id ? { ...item, quantity } : item
        )
      )
    } catch (error) {
      console.error("Error updating quantity:", error)
    } finally {
      setLoading(false)
    }
  }

  // Clear cart
  const clearCart = async () => {
    if (!token) return
    try {
      setLoading(true)
      await axiosInstance.delete("/cart/clear", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setItems([])
    } catch (error) {
      console.error("Error clearing cart:", error)
    } finally {
      setLoading(false)
    }
  }

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        cartCount,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
