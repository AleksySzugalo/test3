import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CheckoutForm from '@/components/CheckoutForm'
import { authOptions } from '@/lib/auth'

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin?callbackUrl=/checkout')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>
          <CheckoutForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}