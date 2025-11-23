import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProfilePage from '@/components/ProfilePage'
import { authOptions } from '@/lib/auth'

export default async function Profile() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin?callbackUrl=/profile')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">My Profile</h1>
          <ProfilePage session={session} />
        </div>
      </main>
      <Footer />
    </div>
  )
}