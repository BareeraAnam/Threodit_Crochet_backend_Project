interface PriceRangeSliderProps {
  min: number
  max: number
  value: [number, number]
  onChange: (value: [number, number]) => void
}

export default function PriceRangeSlider({
  min,
  max,
  value,
  onChange,
}: PriceRangeSliderProps) {
  const [low, high] = value
  const range = max - min
  const left = ((low - min) / range) * 100
  const right = 100 - ((high - min) / range) * 100

  return (
    <div>
      <div className="dual-range relative h-5">
        {/* Track aur beech ka peela hissa */}
        <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-line" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-swatch-yellow"
          style={{ left: `${left}%`, right: `${right}%` }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={low}
          aria-label="Minimum price"
          onChange={(e) => onChange([Math.min(Number(e.target.value), high), high])}
          style={{ zIndex: low > min + range / 2 ? 5 : 3 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={high}
          aria-label="Maximum price"
          onChange={(e) => onChange([low, Math.max(Number(e.target.value), low)])}
          style={{ zIndex: 4 }}
        />
      </div>
      <p className="mt-3 text-sm font-semibold text-heading">
        ${low} - ${high}
      </p>
    </div>
  )
}