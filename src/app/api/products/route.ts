import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import dbConnect from '@/lib/db'
import Product from '@/models/Product'
import { authOptions } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    await dbConnect()

    const { searchParams } = new URL(req.url)
    const featured = searchParams.get('featured')
    const sort = searchParams.get('sort') || 'newest'

    let query = {}
    if (featured === 'true') {
      query = { featured: true }
    }

    let sortQuery: any = { createdAt: -1 }
    
    switch (sort) {
      case 'newest':
        sortQuery = { createdAt: -1 }
        break
      case 'oldest':
        sortQuery = { createdAt: 1 }
        break
      case 'price-low':
        sortQuery = { price: 1 }
        break
      case 'price-high':
        sortQuery = { price: -1 }
        break
      case 'name-asc':
        sortQuery = { name: 1 }
        break
      case 'name-desc':
        sortQuery = { name: -1 }
        break
      default:
        sortQuery = { createdAt: -1 }
    }

    const products = await Product.find(query).sort(sortQuery)
    return NextResponse.json(products)
  } catch (error) {
    console.error('Get products error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    const data = await req.json()
    const product = await Product.create(data)

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}