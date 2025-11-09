"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { axiosInstance } from "@/configs/AxiosInstance"
import ProductGrid from "@/components/product-grid"

export interface Product {
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

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")?.trim() || ""

  const [filters, setFilters] = useState({
    category: [] as string[],
    priceRange: [0, 5000],
    rating: 0,
  })
  const [products, setProducts] = useState<Product[]>([])
  const [sortBy, setSortBy] = useState("featured")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/product")
        setProducts(res?.data?.data || [])
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }
    fetchProducts()
  }, [])

  // ✅ Automatically apply category filter from search params
  useEffect(() => {
    if (categoryParam) {
      setFilters((prev) => ({
        ...prev,
        category: [categoryParam.toUpperCase(), categoryParam.toLowerCase(), categoryParam]
      }))
    }
  }, [categoryParam])

  // All unique categories
  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category))
    return Array.from(unique)
  }, [products])

  // Price Ranges
  const priceRanges = [
    { label: "Under ₹500", range: [0, 500] },
    { label: "₹500 - ₹1000", range: [500, 1000] },
    { label: "₹1000 - ₹2000", range: [1000, 2000] },
    { label: "₹2000 - ₹5000", range: [2000, 5000] },
    { label: "Above ₹5000", range: [5000, 999999] },
  ]

  // Apply filters + sorting
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Category filter
    if (filters.category.length > 0) {
      result = result.filter((p) =>
        filters.category.some(
          (cat) => p.category?.toLowerCase() === cat.toLowerCase()
        )
      )
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    )

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "newest":
        result.sort((a, b) => b.id - a.id)
        break
      default:
        break
    }

    return result
  }, [products, filters, sortBy])

  const toggleCategory = (category: string) => {
    setFilters((prev) => {
      const exists = prev.category.includes(category)
      const updated = exists
        ? prev.category.filter((c) => c !== category)
        : [...prev.category, category]
      return { ...prev, category: updated }
    })
  }

  const selectPriceRange = (range: [number, number]) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: range,
    }))
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">All Products</h1>
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-24 border border-border rounded-lg p-4 space-y-6 max-h-[80vh] overflow-y-auto bg-card shadow-sm">
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold mb-2">Category</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.category.some(
                          (c) => c.toLowerCase() === cat.toLowerCase()
                        )}
                        onChange={() => toggleCategory(cat)}
                        className="cursor-pointer"
                      />
                      <span className="text-sm capitalize">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-semibold mb-2">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((pr) => (
                    <label key={pr.label} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={
                          filters.priceRange[0] === pr.range[0] &&
                          filters.priceRange[1] === pr.range[1]
                        }
                        onChange={() => selectPriceRange([pr.range?.[0], pr.range?.[1]])}
                        className="cursor-pointer"
                      />
                      <span className="text-sm">{pr.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                onClick={() =>
                  setFilters({
                    category: [],
                    priceRange: [0, 5000],
                    rating: 0,
                  })
                }
                variant="outline"
                className="w-full mt-4 text-sm rounded-lg bg-transparent border-border hover:bg-muted"
              >
                Clear Filters
              </Button>
            </div>
          </aside>

          {/* Products Section */}
          <section className="lg:w-3/4 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-8 text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="pb-8">
                <ProductGrid products={filteredProducts} />
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  No products found matching your filters.
                </p>
                <Button
                  onClick={() =>
                    setFilters({
                      category: [],
                      priceRange: [0, 5000],
                      rating: 0,
                    })
                  }
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
