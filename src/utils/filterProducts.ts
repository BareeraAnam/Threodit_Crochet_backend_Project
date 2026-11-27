import type { CategorySlug, Product, ProductColor } from '../types'

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc'
export type StockOption = 'in' | 'out'

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
]

export const PRICE_MIN = 0
export const PRICE_MAX = 100
export const PAGE_SIZE = 12

const CATEGORY_SLUGS: CategorySlug[] = [
  'bags',
  'hats',
  'accessories',
  'scarves',
  'home-decor',
]

export interface ShopFilters {
  search: string
  categories: CategorySlug[]
  colors: string[]
  stock: StockOption[]
  minPrice: number
  maxPrice: number
  sort: SortOption
}

export const DEFAULT_FILTERS: ShopFilters = {
  search: '',
  categories: [],
  colors: [],
  stock: [],
  minPrice: PRICE_MIN,
  maxPrice: PRICE_MAX,
  sort: 'featured',
}

function toPrice(value: string | null, fallback: number): number {
  if (value === null) return fallback
  const n = Number(value)
  if (!Number.isFinite(n)) return fallback
  return Math.min(PRICE_MAX, Math.max(PRICE_MIN, Math.round(n)))
}

/** URL se filters padhta hai (galat values ignore ho jati hain) */
export function parseFilters(params: URLSearchParams): ShopFilters {
  const categories = params
    .getAll('category')
    .filter((c): c is CategorySlug => CATEGORY_SLUGS.includes(c as CategorySlug))

  const stock = params
    .getAll('stock')
    .filter((s): s is StockOption => s === 'in' || s === 'out')

  const sortParam = params.get('sort')
  const sort: SortOption = SORT_OPTIONS.some((o) => o.value === sortParam)
    ? (sortParam as SortOption)
    : 'featured'

  let minPrice = toPrice(params.get('min'), PRICE_MIN)
  let maxPrice = toPrice(params.get('max'), PRICE_MAX)
  if (minPrice > maxPrice) [minPrice, maxPrice] = [maxPrice, minPrice]

  return {
    search: (params.get('search') ?? '').trim(),
    categories,
    colors: params.getAll('color'),
    stock,
    minPrice,
    maxPrice,
    sort,
  }
}

/** Filters ko URL mein likhta hai (default values likhta hi nahi) */
export function buildParams(filters: ShopFilters): URLSearchParams {
  const params = new URLSearchParams()
  if (filters.search) params.set('search', filters.search)
  filters.categories.forEach((c) => params.append('category', c))
  filters.colors.forEach((c) => params.append('color', c))
  filters.stock.forEach((s) => params.append('stock', s))
  if (filters.minPrice !== PRICE_MIN) params.set('min', String(filters.minPrice))
  if (filters.maxPrice !== PRICE_MAX) params.set('max', String(filters.maxPrice))
  if (filters.sort !== 'featured') params.set('sort', filters.sort)
  return params
}

export function filterAndSortProducts(
  products: Product[],
  filters: ShopFilters,
): Product[] {
  const words = filters.search.toLowerCase().split(/\s+/).filter(Boolean)

  const result = products.filter((p) => {
    if (words.length > 0) {
      const haystack = `${p.name} ${p.category} ${p.description} ${p.colors
        .map((c) => c.name)
        .join(' ')}`.toLowerCase()
      if (!words.every((w) => haystack.includes(w))) return false
    }
    if (filters.categories.length > 0 && !filters.categories.includes(p.category)) {
      return false
    }
    if (p.price < filters.minPrice || p.price > filters.maxPrice) return false
    if (
      filters.colors.length > 0 &&
      !p.colors.some((c) => filters.colors.includes(c.name))
    ) {
      return false
    }
    // Dono tick hon ya koi na ho to sab dikhao
    if (filters.stock.length === 1) {
      const wantInStock = filters.stock[0] === 'in'
      if (p.inStock !== wantInStock) return false
    }
    return true
  })

  const sorted = [...result]
  switch (filters.sort) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price)
      break
    case 'name-asc':
      sorted.sort((a, b) => a.name.localeCompare(b.name))
      break
    default:
      // Featured pehle, baaki apni asli tarteeb mein
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured))
  }
  return sorted
}

/** Sidebar ke counts data se nikalte hain (design ke takrate numbers se bachne ke liye) */
export function getCategoryCounts(
  products: Product[],
): Record<CategorySlug, number> {
  const counts: Record<CategorySlug, number> = {
    bags: 0,
    hats: 0,
    accessories: 0,
    scarves: 0,
    'home-decor': 0,
  }
  products.forEach((p) => {
    counts[p.category] += 1
  })
  return counts
}

export function getColorOptions(products: Product[]): ProductColor[] {
  const map = new Map<string, ProductColor>()
  products.forEach((p) =>
    p.colors.forEach((c) => {
      if (!map.has(c.name)) map.set(c.name, c)
    }),
  )
  return [...map.values()]
}

export function getStockCounts(products: Product[]): Record<StockOption, number> {
  return {
    in: products.filter((p) => p.inStock).length,
    out: products.filter((p) => !p.inStock).length,
  }
}