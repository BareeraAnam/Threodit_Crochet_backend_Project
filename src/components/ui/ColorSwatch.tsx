import type { ProductColor } from '../../types'

interface ColorSwatchProps {
  color: ProductColor
  selected: boolean
  onSelect: (name: string) => void
}

export default function ColorSwatch({
  color,
  selected,
  onSelect,
}: ColorSwatchProps) {
  return (
    <button
      type="button"
      aria-label={color.name}
      aria-pressed={selected}
      title={color.name}
      onClick={() => onSelect(color.name)}
      style={{ backgroundColor: color.hex }}
      className={`h-8 w-8 rounded-full border border-line transition ${
        selected ? 'ring-2 ring-primary-dark ring-offset-2 ring-offset-cream' : ''
      }`}
    />
  )
}