import {
  Flower2,
  BadgeCheck,
  Truck,
  Headset,
  type LucideIcon,
} from 'lucide-react'

const features: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Flower2, title: 'Unique Designs', text: 'Handcrafted pieces' },
  { icon: BadgeCheck, title: 'Premium Quality', text: 'Soft & durable' },
  { icon: Truck, title: 'Fast Shipping', text: 'Across the USA' },
  { icon: Headset, title: '24/7 Support', text: "We're here to help" },
]

export default function FeatureStrip() {
  return (
    <section
      aria-label="Why shop with Threodit"
      className="page-container py-10 md:py-14"
    >
      <ul className="grid grid-cols-2 gap-y-8 md:grid-cols-4">
        {features.map(({ icon: Icon, title, text }) => (
          <li
            key={title}
            className="flex flex-col items-center px-4 text-center md:border-l md:border-line md:first:border-l-0"
          >
            <Icon
              size={32}
              strokeWidth={1.5}
              className="text-primary-dark"
              aria-hidden="true"
            />
            <p className="mt-3 text-sm font-semibold text-heading">{title}</p>
            <p className="mt-1 text-[13px] text-muted">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}