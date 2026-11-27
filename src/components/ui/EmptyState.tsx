import type { ReactNode } from 'react'
import { Inbox } from 'lucide-react'
import Button from './Button'

interface EmptyStateProps {
  title: string
  message?: string
  actionLabel?: string
  actionTo?: string
  children?: ReactNode
}

export default function EmptyState({
  title,
  message,
  actionLabel,
  actionTo,
  children,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-card border border-line bg-surface px-6 py-14 text-center">
      <Inbox size={40} className="text-primary-dark" aria-hidden="true" />
      <h2 className="mt-4 text-2xl font-semibold">{title}</h2>
      {message && <p className="mt-2 max-w-md text-muted">{message}</p>}
      {actionLabel && actionTo && (
        <Button to={actionTo} className="mt-6">
          {actionLabel}
        </Button>
      )}
      {children && <div className="mt-6">{children}</div>}
    </div>
  )
}