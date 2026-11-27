import { Link } from 'react-router-dom'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'dark' | 'outline'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  to?: string
  fullWidth?: boolean
  children: ReactNode
}

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-heading hover:brightness-95',
  dark: 'bg-primary-dark text-white hover:brightness-110',
  outline: 'border border-line bg-surface text-heading hover:bg-accent-soft',
}

export default function Button({
  variant = 'primary',
  to,
  fullWidth,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-btn px-6 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}