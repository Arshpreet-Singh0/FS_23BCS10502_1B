import Header from "@/components/header"
import Hero from "@/components/hero"
import FeaturedProducts from "@/components/featured-products"
import CategoryHighlights from "@/components/category-highlights"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <CategoryHighlights />
      <FeaturedProducts />
      <Footer />
    </main>
  )
}
