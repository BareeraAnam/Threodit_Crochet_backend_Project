import { ChevronDown } from 'lucide-react'
import { SORT_OPTIONS, type SortOption } from '../../utils/filterProducts'

interface SortSelectProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-select" className="text-sm text-muted">
        Sort by
      </label>
      <div className="relative">
        <select
          id="sort-select"
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="appearance-none rounded-card border border-line bg-surface py-2 pl-3 pr-9 text-sm font-medium text-heading"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-heading"
        />
      </div>
    </div>
  )
}