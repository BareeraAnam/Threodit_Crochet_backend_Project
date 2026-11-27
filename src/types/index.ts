export type CategorySlug =
  | 'bags'
  | 'hats'
  | 'accessories'
  | 'scarves'
  | 'home-decor'

export interface ProductColor {
  name: string
  hex: string
}

export interface Product {
  id: string
  slug: string
  name: string
  price: number
  images: string[]
  category: CategorySlug
  description: string
  details: string[]
  colors: ProductColor[]
  colorImages?: Record<string, string[]>
  inStock: boolean
  featured: boolean
  rating: number
  reviewCount: number
}

export interface Category {
  id: CategorySlug | 'all'
  name: string
  image: string
  productCount: number
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  cover: string
  date: string
  readTime?: string
  content?: string[]
}

export interface CartItem {
  productId: string
  selectedColor: string
  quantity: number
  unitPrice: number
}