import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductGrid from '@/components/ProductGrid'
import ProductSort from '@/components/ProductSort'
import { getAllProducts } from '@/lib/api/products'

interface ProductsPageProps {
  searchParams: { sort?: string }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const sortBy = searchParams.sort || 'newest'
  const products = await getAllProducts(sortBy)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">All Products</h1>
            <ProductSort currentSort={sortBy} />
          </div>
          <Suspense fallback={<div className="text-center py-12">Loading products...</div>}>
            <ProductGrid products={products} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}