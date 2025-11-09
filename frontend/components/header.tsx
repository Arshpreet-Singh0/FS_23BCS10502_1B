"use client"

import Link from "next/link"
import { ShoppingCart, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/cart-context"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"

export default function Header() {
  const { cartCount } = useCart();
  const router = useRouter();
  const { user, loading, refreshUser } = useUser();

  if (loading) return <p>Loading user...</p>;

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">StyleHub</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-muted border-0 focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/products" className="text-foreground hover:text-primary transition-colors font-medium">
              Products
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/login">
                <User className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>
            {
              !loading && user ? (
                  <p>{user.name}</p>
              ) : (
                <div className="flex gap-4">
                  <Button className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6" onClick={()=>router.push("/login")}>
              Login in
            </Button>
                  <Button className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6" onClick={()=>router.push("/signup")}>
              Sign Up
            </Button>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </header>
  )
}
