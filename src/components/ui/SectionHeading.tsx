import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  eyebrow?: string
  centered?: boolean
  as?: 'h1' | 'h2'
  actionLabel?: string
  actionTo?: string
}

export default function SectionHeading({
  title,
  subtitle,
  eyebrow,
  centered = false,
  as: Tag = 'h2',
  actionLabel,
  actionTo,
}: SectionHeadingProps) {
  const size = Tag === 'h1' ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'

  return (
    <div
      className={`mb-8 flex items-end justify-between gap-4 ${
        centered ? 'flex-col items-center text-center' : ''
      }`}
    >
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-primary-dark">
            {eyebrow}
          </p>
        )}
        <Tag className={`${size} font-semibold`}>{title}</Tag>
        {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
      </div>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary-dark hover:underline"
        >
          {actionLabel} <ArrowRight size={16} aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}