import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartPage from '@/components/CartPage'

export default function Cart() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          <CartPage />
        </div>
      </main>
      <Footer />
    </div>
  )
}