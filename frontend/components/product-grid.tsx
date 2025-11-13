"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discount: number;
  quantity: number;
  imageUrl: string;
  category: string;
  mainCategory : string;
}


interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const router = useRouter();
  const { addItem } = useCart();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products?.map((product) => (
          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 bg-card border-0 h-full flex flex-col ">
            {/* Product Image */}
            <div className="relative h-64 overflow-hidden bg-muted">
              <img
                src={product.imageUrl|| "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                {Math.round((product.discount/product.price)*100)}% OFF
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col grow">
              <h3 className="font-semibold text-foreground mb-2 line-clamp-2 grow">{product.title}</h3>

              {/* Rating */}
              {/* <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">({product.reviews})</span>
              </div> */}

              {/* Price */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-bold text-primary">₹ {product.price-product.discount}</span>
                <span className="text-sm text-muted-foreground line-through">₹{product.price}</span>
              </div>

              {/* Add to Cart Button */}
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg flex items-center justify-center gap-2 mt-auto" onClick={()=>addItem(product?.id, 1)}>
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </Button>


              <Button className="w-full bg-accent hover:bg-primary/90 text-primary-foreground rounded-lg flex items-center justify-center gap-2 mt-5" onClick={()=>router.push(`/product/${product.id}`)}>
               
               Buy Now
              </Button>
            </div>
          </Card>
      ))}
    </div>
  )
}
