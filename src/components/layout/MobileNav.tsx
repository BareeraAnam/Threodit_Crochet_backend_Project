import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'

interface MobileNavProps {
  open: boolean
  onClose: () => void
  links: { to: string; label: string }[]
}

export default function MobileNav({ open, onClose, links }: MobileNavProps) {
  // Escape dabane par menu band
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Main menu"
    >
      <div className="absolute inset-0 bg-heading/40" onClick={onClose} />
      <nav className="absolute right-0 top-0 h-full w-72 bg-cream p-6 shadow-soft">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="mb-6 ml-auto block rounded-full p-2 hover:bg-accent-soft"
        >
          <X size={22} />
        </button>
        <ul className="flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `block rounded-btn px-3 py-3 text-base font-medium ${
                    isActive
                      ? 'bg-accent-soft text-primary-dark'
                      : 'text-heading hover:bg-surface'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}