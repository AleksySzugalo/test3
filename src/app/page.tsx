import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductGrid from '@/components/ProductGrid'
import Hero from '@/components/Hero'
import { getFeaturedProducts } from '@/lib/api/products'

export default async function HomePage() {
  const products = await getFeaturedProducts()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
          <Suspense fallback={<div className="text-center py-12">Loading products...</div>}>
            <ProductGrid products={products} />
          </Suspense>
        </section>
      </main>
      <Footer />
    </div>
  )
}