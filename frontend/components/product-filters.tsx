"use client"

import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Star } from "lucide-react"

interface ProductFiltersProps {
  filters: {
    category: string[]
    priceRange: [number, number]
    rating: number
    color: string[]
    brand: string[]
  }
  setFilters: (filters: any) => void
}

const categories = ["Fashion", "Electronics", "Home Decor"]
const colors = ["Black", "White", "Blue", "Red", "Gray", "Silver"]
const brands = ["AudioTech", "StyleWear", "LightCo", "SportFit", "TechGear", "ComfortHome", "DenimCo", "TechWatch"]
const ratings = [5, 4, 3, 2, 1]

export default function ProductFilters({ filters, setFilters }: ProductFiltersProps) {
  const handleCategoryChange = (category: string) => {
    setFilters({
      ...filters,
      category: filters.category.includes(category)
        ? filters.category.filter((c) => c !== category)
        : [...filters.category, category],
    })
  }

  const handleColorChange = (color: string) => {
    setFilters({
      ...filters,
      color: filters.color.includes(color) ? filters.color.filter((c) => c !== color) : [...filters.color, color],
    })
  }

  const handleBrandChange = (brand: string) => {
    setFilters({
      ...filters,
      brand: filters.brand.includes(brand) ? filters.brand.filter((b) => b !== brand) : [...filters.brand, brand],
    })
  }

  const handleRatingChange = (rating: number) => {
    setFilters({
      ...filters,
      rating: filters.rating === rating ? 0 : rating,
    })
  }

  const handlePriceChange = (value: number[]) => {
    setFilters({
      ...filters,
      priceRange: [value[0], value[1]],
    })
  }

  return (
    <div className="space-y-6">
      {/* Price Filter */}
      <Card className="bg-card border-0 p-6">
        <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
        <Slider
          min={0}
          max={300}
          step={10}
          value={filters.priceRange}
          onValueChange={handlePriceChange}
          className="mb-4"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </Card>

      {/* Category Filter */}
      <Card className="bg-card border-0 p-6">
        <h3 className="font-semibold text-foreground mb-4">Category</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={filters.category.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <span className="text-sm text-foreground">{category}</span>
            </label>
          ))}
        </div>
      </Card>

      {/* Rating Filter */}
      <Card className="bg-card border-0 p-6">
        <h3 className="font-semibold text-foreground mb-4">Rating</h3>
        <div className="space-y-3">
          {ratings.map((rating) => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer">
              <Checkbox checked={filters.rating === rating} onCheckedChange={() => handleRatingChange(rating)} />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < rating ? "fill-accent text-accent" : "text-muted-foreground"}`}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-1">& up</span>
              </div>
            </label>
          ))}
        </div>
      </Card>

      {/* Color Filter */}
      <Card className="bg-card border-0 p-6">
        <h3 className="font-semibold text-foreground mb-4">Color</h3>
        <div className="space-y-3">
          {colors.map((color) => (
            <label key={color} className="flex items-center gap-3 cursor-pointer">
              <Checkbox checked={filters.color.includes(color)} onCheckedChange={() => handleColorChange(color)} />
              <span className="text-sm text-foreground">{color}</span>
            </label>
          ))}
        </div>
      </Card>

      {/* Brand Filter */}
      <Card className="bg-card border-0 p-6">
        <h3 className="font-semibold text-foreground mb-4">Brand</h3>
        <div className="space-y-3">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer">
              <Checkbox checked={filters.brand.includes(brand)} onCheckedChange={() => handleBrandChange(brand)} />
              <span className="text-sm text-foreground">{brand}</span>
            </label>
          ))}
        </div>
      </Card>
    </div>
  )
}
