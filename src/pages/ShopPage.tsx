import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import { products } from '../data/products'
import { categories } from '../data/categories'
import {
  DEFAULT_FILTERS,
  PAGE_SIZE,
  PRICE_MAX,
  PRICE_MIN,
  buildParams,
  filterAndSortProducts,
  getCategoryCounts,
  getColorOptions,
  getStockCounts,
  parseFilters,
  type ShopFilters,
} from '../utils/filterProducts'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import ProductCard from '../components/product/ProductCard'
import SortSelect from '../components/product/SortSelect'
import FilterSidebar from '../components/product/FilterSidebar'
import FilterDrawer from '../components/product/FilterDrawer'

// Poore catalogue ke counts, ek baar nikal lete hain
const categoryCounts = getCategoryCounts(products)
const colorOptions = getColorOptions(products)
const stockCounts = getStockCounts(products)

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [pageState, setPageState] = useState({ key: '', count: PAGE_SIZE })

  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  // URL hi filters ka asli source hai
  const queryKey = searchParams.toString()
  const filters = parseFilters(searchParams)
  const results = filterAndSortProducts(products, filters)

  // Filters badlein to "Show more" wapas 12 par aa jata hai
  const visibleCount = pageState.key === queryKey ? pageState.count : PAGE_SIZE
  const visibleProducts = results.slice(0, visibleCount)

  const activeCount =
    filters.categories.length +
    filters.colors.length +
    filters.stock.length +
    (filters.minPrice !== PRICE_MIN || filters.maxPrice !== PRICE_MAX ? 1 : 0)
  const hasActiveFilters = activeCount > 0 || filters.search !== ''

  function updateFilters(changes: Partial<ShopFilters>) {
    setSearchParams(buildParams({ ...filters, ...changes }), { replace: true })
  }

  function clearFilters() {
    setSearchParams(buildParams({ ...DEFAULT_FILTERS, sort: filters.sort }), {
      replace: true,
    })
  }

  function showMore() {
    setPageState({ key: queryKey, count: visibleCount + PAGE_SIZE })
  }

  const categoryName = categories.find(
    (c) => c.id === filters.categories[0],
  )?.name
  const title = filters.search
    ? `Results for “${filters.search}”`
    : filters.categories.length === 1 && categoryName
      ? categoryName
      : 'All Products'

  const range =
    visibleProducts.length === 1 ? '1' : `1–${visibleProducts.length}`
  const countText =
    results.length === 0
      ? 'No products found'
      : `Showing ${range} of ${results.length} ${results.length === 1 ? 'product' : 'products'}`

  const sidebar = (
    <FilterSidebar
      filters={filters}
      onChange={updateFilters}
      onClear={clearFilters}
      hasActiveFilters={hasActiveFilters}
      categoryCounts={categoryCounts}
      totalCount={products.length}
      colorOptions={colorOptions}
      stockCounts={stockCounts}
    />
  )

  return (
    <div className="page-container py-8 md:py-12">
      <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-10">
        {/* Desktop sidebar */}
        <aside
          aria-label="Product filters"
          className="hidden lg:sticky lg:top-24 lg:block lg:self-start"
        >
          {sidebar}
        </aside>

        {/* Results */}
        <div>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold md:text-[40px]">{title}</h1>
              <p className="mt-1 text-sm text-muted" aria-live="polite">
                {countText}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="inline-flex items-center gap-2 rounded-card border border-line bg-surface px-3 py-2 text-sm font-medium text-heading lg:hidden"
              >
                <SlidersHorizontal size={16} aria-hidden="true" />
                Filters
                {activeCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold">
                    {activeCount}
                  </span>
                )}
              </button>
              <SortSelect
                value={filters.sort}
                onChange={(sort) => updateFilters({ sort })}
              />
            </div>
          </div>

          {results.length === 0 ? (
            <EmptyState
              title="No products found"
              message="Try a different search or remove some filters."
            >
              <Button variant="dark" onClick={clearFilters}>
                Clear all filters
              </Button>
            </EmptyState>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 min-[360px]:grid-cols-2 md:grid-cols-3 md:gap-6">
                {visibleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    preferredColor={filters.colors.length === 1 ? filters.colors[0] : undefined}
                  />
                ))}
              </div>

              {results.length > visibleCount && (
                <div className="mt-10 text-center">
                  <Button variant="outline" onClick={showMore}>
                    Show more products
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <FilterDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        resultCount={results.length}
      >
        {sidebar}
      </FilterDrawer>
    </div>
  )
}