const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function getAllProducts(sort: string = 'newest') {
  try {
    const res = await fetch(`${API_URL}/api/products?sort=${sort}`, {
      cache: 'no-store'
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch products')
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getFeaturedProducts() {
  try {
    const res = await fetch(`${API_URL}/api/products?featured=true`, {
      cache: 'no-store'
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch featured products')
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

export async function getProductById(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/products/${id}`, {
      cache: 'no-store'
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch product')
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}