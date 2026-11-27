import { useState, type FormEvent } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, User, ShoppingBag, Menu } from 'lucide-react'
import { useCartStore, selectCartCount } from '../../store/cartStore'
import MobileNav from './MobileNav'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const cartCount = useCartStore(selectCartCount)

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/shop?search=${encodeURIComponent(q)}` : '/shop')
    setSearchOpen(false)
    setQuery('')
  }

  const iconBtn =
    'relative rounded-full p-2 text-heading hover:bg-accent-soft'

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur">
      <div className="page-container flex h-16 items-center justify-between">
        <Link to="/" className="font-heading text-2xl font-semibold text-brand-brown">
          Threodit
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-primary-dark ${
                      isActive
                        ? 'border-b-2 border-primary-dark text-primary-dark'
                        : 'text-heading'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className={iconBtn}
            aria-label="Search products"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search size={20} />
          </button>
          <a
            href="/admin"
            className={iconBtn}
            aria-label="Admin Portal"
            title="Admin Portal"
          >
            <User size={20} />
          </a>
          <Link
            to="/cart"
            className={iconBtn}
            aria-label={`Cart, ${cartCount} items`}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold text-heading">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            className={`${iconBtn} md:hidden`}
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {searchOpen && (
        <form
          onSubmit={handleSearch}
          role="search"
          className="page-container pb-3"
        >
          <label htmlFor="site-search" className="sr-only">
            Search products
          </label>
          <input
            id="site-search"
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bags, hats, scarves..."
            className="w-full rounded-card border border-line bg-surface px-4 py-2.5 text-sm"
          />
        </form>
      )}

      <MobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
      />
    </header>
  )
}