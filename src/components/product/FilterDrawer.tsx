import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import Button from '../ui/Button'

interface FilterDrawerProps {
  open: boolean
  onClose: () => void
  resultCount: number
  children: ReactNode
}

export default function FilterDrawer({
  open,
  onClose,
  resultCount,
  children,
}: FilterDrawerProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden' // peeche ka page scroll na ho

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Product filters"
    >
      <div className="absolute inset-0 bg-heading/40" onClick={onClose} />

      <div className="absolute left-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-cream shadow-soft">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-body text-lg font-semibold text-heading">
            Filters
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="rounded-full p-2 hover:bg-accent-soft"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>

        <div className="border-t border-line p-4">
          <Button fullWidth onClick={onClose}>
            Show {resultCount} {resultCount === 1 ? 'product' : 'products'}
          </Button>
        </div>
      </div>
    </div>
  )
}