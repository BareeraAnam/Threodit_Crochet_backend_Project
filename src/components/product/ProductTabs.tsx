import { useState } from 'react'
import { Check, Star, Truck, ShieldCheck } from 'lucide-react'
import type { Product } from '../../types'

interface ProductTabsProps {
  product: Product
}

type TabType = 'description' | 'shipping' | 'reviews'

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('description')

  const tabs: { id: TabType; label: string }[] = [
    { id: 'description', label: 'Description' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'reviews', label: `Reviews (${product.reviewCount})` },
  ]

  const mockReviews = [
    {
      id: 'rev-1',
      author: 'Amina K.',
      rating: 5,
      date: 'October 12, 2026',
      verified: true,
      comment:
        'The craftsmanship is extraordinary! The daisy flowers look even more beautiful in person, and the bag is surprisingly roomy.',
    },
    {
      id: 'rev-2',
      author: 'Sophia Chen',
      rating: 5,
      date: 'September 28, 2026',
      verified: true,
      comment:
        'Super soft 100% cotton yarn with zero loose threads. I get compliments whenever I carry it out. Fast delivery too!',
    },
    {
      id: 'rev-3',
      author: 'Elena Rostova',
      rating: 4,
      date: 'September 15, 2026',
      verified: true,
      comment:
        'Lightweight, perfectly sized for phone, wallet and keys. Very sturdy crochet handles.',
    },
  ]

  return (
    <div className="mt-12">
      {/* Tab Navigation */}
      <div className="flex border-b border-line gap-6 sm:gap-8 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-3 text-base sm:text-lg font-medium transition-colors whitespace-nowrap focus:outline-none ${
                isActive
                  ? 'text-heading font-semibold'
                  : 'text-muted hover:text-heading'
              }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.75 bg-primary-dark rounded-full" />
              )}
            </button>
          )
        })}
      </div>

      {/* Tab Panels */}
      <div className="py-6 sm:py-8">
        {/* Description Tab */}
        {activeTab === 'description' && (
          <div className="space-y-6">
            <p className="max-w-3xl text-base text-body leading-relaxed">
              This beautiful crochet bag is carefully handcrafted using premium quality yarn.
              It features lovely daisy flowers and is perfect for daily use, casual outings,
              or as a thoughtful gift for someone special.
            </p>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center pt-2">
              {/* Bullet list with custom check icons */}
              <ul className="space-y-3.5">
                {product.details && product.details.length > 0 ? (
                  product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm sm:text-base text-heading">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/70 text-brand-brown">
                        <Check size={14} strokeWidth={3} />
                      </span>
                      <span>{detail}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-center gap-3 text-sm sm:text-base text-heading">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/70 text-brand-brown">
                        <Check size={14} strokeWidth={3} />
                      </span>
                      <span>Material: 100% Cotton Yarn</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm sm:text-base text-heading">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/70 text-brand-brown">
                        <Check size={14} strokeWidth={3} />
                      </span>
                      <span>Size: 28cm x 22cm</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm sm:text-base text-heading">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/70 text-brand-brown">
                        <Check size={14} strokeWidth={3} />
                      </span>
                      <span>Lightweight & Durable</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm sm:text-base text-heading">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/70 text-brand-brown">
                        <Check size={14} strokeWidth={3} />
                      </span>
                      <span>Perfect for everyday use</span>
                    </li>
                  </>
                )}
              </ul>

              {/* Detail product image matching sample */}
              <div className="relative aspect-16/10 overflow-hidden rounded-card border border-line bg-surface shadow-soft max-w-md">
                <img
                  src={product.images[1] || product.images[0]}
                  alt={`${product.name} detail`}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        )}

        {/* Shipping Tab */}
        {activeTab === 'shipping' && (
          <div className="max-w-2xl space-y-6">
            <div className="rounded-card border border-line bg-surface p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-primary-dark">
                  <Truck size={18} />
                </div>
                <div>
                  <h4 className="font-heading text-base font-semibold text-heading">
                    Standard Delivery ($5.00 Flat Rate)
                  </h4>
                  <p className="text-sm text-body mt-1">
                    Delivered in 3–5 business days. Free shipping on all orders over $50.00!
                  </p>
                </div>
              </div>

              <div className="border-t border-line pt-4 flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-primary-dark">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="font-heading text-base font-semibold text-heading">
                    7-Day Easy Returns Guarantee
                  </h4>
                  <p className="text-sm text-body mt-1">
                    If you are not completely enchanted by your handmade piece, return it in original condition within 7 days for a hassle-free exchange or full refund.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-6 max-w-3xl">
            {/* Rating summary */}
            <div className="flex flex-wrap items-center gap-6 rounded-card border border-line bg-surface p-5">
              <div className="text-center sm:text-left">
                <div className="font-heading text-4xl font-bold text-heading">
                  {product.rating.toFixed(1)}
                </div>
                <div className="flex items-center gap-1 mt-1 justify-center sm:justify-start text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                      stroke="currentColor"
                    />
                  ))}
                </div>
                <p className="text-xs text-muted mt-1">
                  Based on {product.reviewCount} customer reviews
                </p>
              </div>

              <div className="h-12 w-px bg-line hidden sm:block" />

              <div className="flex-1 min-w-[200px] space-y-1.5 text-xs text-muted">
                <div className="flex items-center gap-2">
                  <span>5 stars</span>
                  <div className="h-2 flex-1 rounded-full bg-cream overflow-hidden">
                    <div className="h-full bg-primary-dark rounded-full w-[85%]" />
                  </div>
                  <span>85%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>4 stars</span>
                  <div className="h-2 flex-1 rounded-full bg-cream overflow-hidden">
                    <div className="h-full bg-primary-dark rounded-full w-[12%]" />
                  </div>
                  <span>12%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>3 stars</span>
                  <div className="h-2 flex-1 rounded-full bg-cream overflow-hidden">
                    <div className="h-full bg-primary-dark rounded-full w-[3%]" />
                  </div>
                  <span>3%</span>
                </div>
              </div>
            </div>

            {/* Reviews list */}
            <div className="space-y-4">
              {mockReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="rounded-card border border-line bg-surface p-4 sm:p-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-heading text-sm">
                        {rev.author}
                      </span>
                      {rev.verified && (
                        <span className="ml-2 inline-flex items-center rounded-btn bg-success/10 px-2 py-0.5 text-[11px] font-medium text-success">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted">{rev.date}</span>
                  </div>

                  <div className="flex items-center gap-0.5 text-yellow-500 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < rev.rating ? 'currentColor' : 'none'}
                        stroke="currentColor"
                      />
                    ))}
                  </div>

                  <p className="text-sm text-body mt-2 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
