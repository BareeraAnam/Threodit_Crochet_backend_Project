import { Heart, Sparkles, Truck, RotateCcw } from 'lucide-react'

export default function ProductBenefits() {
  const benefits = [
    {
      icon: Heart,
      title: 'Handmade',
      subtitle: 'with care',
    },
    {
      icon: Sparkles,
      title: 'High quality',
      subtitle: 'yarn',
    },
    {
      icon: Truck,
      title: 'Fast shipping',
      subtitle: 'worldwide',
    },
    {
      icon: RotateCcw,
      title: 'Easy returns',
      subtitle: '7 days',
    },
  ]

  return (
    <section
      aria-label="Product value guarantees"
      className="my-10 rounded-card border border-line bg-surface p-4 sm:p-6"
    >
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:divide-x md:divide-line">
        {benefits.map((item, index) => {
          const Icon = item.icon
          return (
            <div
              key={item.title}
              className={`flex flex-col items-center text-center ${
                index !== 0 ? 'md:pl-6' : ''
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-primary-dark">
                <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <h4 className="mt-3 font-heading text-base font-semibold text-heading">
                {item.title}
              </h4>
              <p className="mt-0.5 text-xs text-muted">
                {item.subtitle}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
