
import type { Category } from '../types'

const defaultCategories: Category[] = [
  {
    id: 'bags',
    name: 'Bags',
    image: '/images/category-bags.jpg',
    productCount: 12,
  },
  {
    id: 'hats',
    name: 'Hats',
    image: '/images/category-hats.jpg',
    productCount: 8,
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: '/images/category-accessories.jpg',
    productCount: 10,
  },
  {
    id: 'scarves',
    name: 'Scarves',
    image: '/images/category-scarves.jpg',
    productCount: 7,
  },
  {
    id: 'home-decor',
    name: 'Home Decor',
    image: '/images/category-home-decor.jpg',
    productCount: 6,
  },
  {
    id: 'all',
    name: 'All Products',
    image: '/images/category-all.jpg',
    productCount: 32,
  },
]

function loadCategories(): Category[] {
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem('thr_adm_categories')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch (e) {
      // ignore
    }
  }
  return defaultCategories
}

export const categories: Category[] = loadCategories()
