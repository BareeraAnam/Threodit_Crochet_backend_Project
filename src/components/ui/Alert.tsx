import type { ReactNode } from 'react'

type AlertVariant = 'success' | 'error' | 'info'

const styles: Record<AlertVariant, string> = {
  success: 'border-success/30 bg-success/10 text-success',
  error: 'border-error/30 bg-error/10 text-error',
  info: 'border-line bg-accent-soft text-heading',
}

export default function Alert({
  variant = 'info',
  children,
}: {
  variant?: AlertVariant
  children: ReactNode
}) {
  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={`rounded-card border px-4 py-3 text-sm ${styles[variant]}`}
    >
      {children}
    </div>
  )
}