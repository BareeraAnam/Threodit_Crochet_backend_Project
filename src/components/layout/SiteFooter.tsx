import { Link } from 'react-router-dom'
import { Heart, Mail, Phone, MapPin } from 'lucide-react'

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="page-container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 lg:gap-12">
          {/* Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="font-heading text-2xl font-bold text-brand-brown">
              Threodit
            </Link>
            <p className="text-sm text-body leading-relaxed">
              Handmade crochet accessories crafted with care, creativity, and comfort. Bringing warmth and artisanal beauty to your daily routine.
            </p>
            <div className="space-y-2 pt-1 text-xs text-muted">
              <p className="flex items-center gap-2">
                <MapPin size={14} className="shrink-0 text-primary-dark" />
                <span>123 Craft Street, New York, NY 10001</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="shrink-0 text-primary-dark" />
                <span>+1 234 567 890</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="shrink-0 text-primary-dark" />
                <span>hello@threodit.com</span>
              </p>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div className="space-y-3">
            <h4 className="font-heading text-base font-semibold text-heading">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/shop" className="text-muted transition hover:text-primary-dark">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-muted transition hover:text-primary-dark">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/shop?category=bags" className="text-muted transition hover:text-primary-dark">
                  Crochet Bags
                </Link>
              </li>
              <li>
                <Link to="/shop?category=hats" className="text-muted transition hover:text-primary-dark">
                  Hats & Beanies
                </Link>
              </li>
              <li>
                <Link to="/shop?category=scarves" className="text-muted transition hover:text-primary-dark">
                  Warm Scarves
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Community */}
          <div className="space-y-3">
            <h4 className="font-heading text-base font-semibold text-heading">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-muted transition hover:text-primary-dark">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted transition hover:text-primary-dark">
                  Journal & Articles
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted transition hover:text-primary-dark">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-muted transition hover:text-primary-dark">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <a href="/admin" className="text-muted transition hover:text-primary-dark flex items-center gap-1.5">
                  Admin Portal <span>↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="font-heading text-base font-semibold text-heading">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>Free worldwide shipping over $50</li>
              <li>7-Day easy hassle-free returns</li>
              <li>100% Cotton & wool materials</li>
              <li>Custom handcrafted orders</li>
            </ul>
            <p className="pt-2 text-xs text-muted">
              Questions? Reach us at <span className="font-medium text-heading">support@threodit.com</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-line py-5">
        <div className="page-container flex flex-col items-center justify-between gap-3 text-xs text-muted sm:flex-row">
          <p className="flex items-center gap-1.5">
            <span>&copy; {new Date().getFullYear()} Threodit Crochet Store. All rights reserved.</span>
            <span className="hidden sm:inline">Handcrafted with</span>
            <Heart size={12} className="hidden fill-primary-dark text-primary-dark sm:inline" />
          </p>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-primary-dark">Privacy Policy</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-primary-dark">Terms of Service</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-primary-dark">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}