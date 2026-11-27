import { Minus, Plus } from 'lucide-react'

interface QuantityStepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  label?: string
}

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  label = 'Quantity',
}: QuantityStepperProps) {
  const btn =
    'flex h-10 w-10 items-center justify-center text-heading hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-40'

  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center rounded-btn border border-line bg-surface"
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className={btn}
      >
        <Minus size={16} />
      </button>
      <span
        aria-live="polite"
        className="min-w-8 text-center text-sm font-semibold text-heading"
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className={btn}
      >
        <Plus size={16} />
      </button>
    </div>
  )
}