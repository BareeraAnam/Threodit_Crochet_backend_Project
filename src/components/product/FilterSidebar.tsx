import type { CategorySlug, ProductColor } from '../../types'
import { categories } from '../../data/categories'
import ColorSwatch from '../ui/ColorSwatch'
import PriceRangeSlider from './PriceRangeSlider'
import {
  PRICE_MAX,
  PRICE_MIN,
  type ShopFilters,
  type StockOption,
} from '../../utils/filterProducts'

interface FilterSidebarProps {
  filters: ShopFilters
  onChange: (changes: Partial<ShopFilters>) => void
  onClear: () => void
  hasActiveFilters: boolean
  categoryCounts: Record<CategorySlug, number>
  totalCount: number
  colorOptions: ProductColor[]
  stockCounts: Record<StockOption, number>
}

const stockRows: { value: StockOption; label: string }[] = [
  { value: 'in', label: 'In Stock' },
  { value: 'out', label: 'Out of Stock' },
]

function toggle<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((i) => i !== item) : [...list, item]
}

const headingClass = 'font-body text-base font-semibold text-heading'
const rowClass = 'flex cursor-pointer items-center gap-2 text-sm text-body'
const checkboxClass = 'h-4 w-4 rounded accent-primary-dark'

export default function FilterSidebar({
  filters,
  onChange,
  onClear,
  hasActiveFilters,
  categoryCounts,
  totalCount,
  colorOptions,
  stockCounts,
}: FilterSidebarProps) {
  const realCategories = categories.filter((c) => c.id !== 'all')

  return (
    <div className="space-y-6">
      {/* Categories */}
      <section>
        <h2 className={headingClass}>Categories</h2>
        <ul className="mt-3 space-y-2">
          {realCategories.map((category) => {
            const slug = category.id as CategorySlug
            return (
              <li key={slug}>
                <label className={rowClass}>
                  <input
                    type="checkbox"
                    className={checkboxClass}
                    checked={filters.categories.includes(slug)}
                    onChange={() =>
                      onChange({ categories: toggle(filters.categories, slug) })
                    }
                  />
                  <span>{category.name}</span>
                  <span className="text-muted">({categoryCounts[slug]})</span>
                </label>
              </li>
            )
          })}
          <li>
            <label className={rowClass}>
              <input
                type="checkbox"
                className={checkboxClass}
                checked={filters.categories.length === 0}
                onChange={() => onChange({ categories: [] })}
              />
              <span>All Products</span>
              <span className="text-muted">({totalCount})</span>
            </label>
          </li>
        </ul>
      </section>

      {/* Price */}
      <section className="border-t border-line pt-6">
        <h2 className={`${headingClass} mb-4`}>Price Range</h2>
        <PriceRangeSlider
          min={PRICE_MIN}
          max={PRICE_MAX}
          value={[filters.minPrice, filters.maxPrice]}
          onChange={([minPrice, maxPrice]) => onChange({ minPrice, maxPrice })}
        />
      </section>

      {/* Colors */}
      <section className="border-t border-line pt-6">
        <h2 className={headingClass}>Colors</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          {colorOptions.map((color) => (
            <ColorSwatch
              key={color.name}
              color={color}
              selected={filters.colors.includes(color.name)}
              onSelect={(name) =>
                onChange({ colors: toggle(filters.colors, name) })
              }
            />
          ))}
        </div>
      </section>

      {/* Availability */}
      <section className="border-t border-line pt-6">
        <h2 className={headingClass}>Availability</h2>
        <ul className="mt-3 space-y-2">
          {stockRows.map((row) => (
            <li key={row.value}>
              <label className={rowClass}>
                <input
                  type="checkbox"
                  className={checkboxClass}
                  checked={filters.stock.includes(row.value)}
                  onChange={() =>
                    onChange({ stock: toggle(filters.stock, row.value) })
                  }
                />
                <span>{row.label}</span>
                <span className="text-muted">({stockCounts[row.value]})</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClear}
          className="text-sm font-medium text-primary-dark hover:underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  )
}