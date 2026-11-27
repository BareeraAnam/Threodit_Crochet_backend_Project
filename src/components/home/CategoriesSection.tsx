import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { categories } from '../../data/categories'

interface CategoriesSectionProps {
  isPage?: boolean
}

export default function CategoriesSection({ isPage = false }: CategoriesSectionProps) {
  return (
    <div className={`page-container ${isPage ? 'py-8 md:py-14' : 'py-12 md:py-18'}`}>
      {/* Page Header */}
      <div className="mb-8 text-center md:mb-12">
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-heading sm:text-4xl md:text-5xl">
          Shop by Category
        </h2>
        <p className="mt-2 text-sm text-muted sm:text-base md:mt-3">
          Explore our handmade crochet collection
        </p>
      </div>

      {/* 6 Category Tiles (3 columns desktop, 2 columns mobile) */}
      <section aria-label="Product categories">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {categories.map((cat) => {
            const targetUrl = cat.id === 'all' ? '/shop' : `/shop?category=${cat.id}`

            return (
              <Link
                key={cat.id}
                to={targetUrl}
                className="group flex flex-col rounded-card border border-line bg-surface p-3 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-4"
                aria-label={`${cat.name}, ${cat.productCount} Products`}
              >
                {/* Consistent tile image container */}
                <div className="relative aspect-square w-full overflow-hidden rounded-md bg-[#F4EFE6] sm:rounded-lg">
                  <img
                    src={cat.image}
                    alt={`Handmade crochet ${cat.name}`}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Name & Count */}
                <div className="pt-3 pb-1 text-center sm:pt-4 sm:pb-2">
                  <h3 className="font-heading text-base font-semibold text-heading transition-colors group-hover:text-primary-dark sm:text-lg md:text-xl">
                    {cat.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted sm:text-sm">
                    {cat.productCount} Products
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Promotional Banner */}
      <section
        aria-label="Promotional feature"
        className="mt-12 overflow-hidden rounded-banner bg-primary p-6 sm:p-8 md:mt-16 md:p-12"
      >
        <div className="flex flex-col-reverse items-center justify-between gap-6 md:flex-row md:gap-10">
          {/* Left Text & CTA */}
          <div className="w-full text-left md:max-w-lg">
            <h3 className="font-heading text-2xl font-bold leading-tight text-heading sm:text-3xl md:text-4xl">
              Handmade Gifts for Every Occasion
            </h3>
            <p className="mt-2 text-sm text-heading/85 sm:text-base md:mt-3">
              Discover unique crochet items that make perfect gifts for your loved ones.
            </p>
            <div className="mt-6 md:mt-8">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-btn bg-primary-dark px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark focus-visible:ring-offset-2 sm:text-base"
              >
                Shop Now <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right Banner Image */}
          <div className="w-full max-w-[280px] shrink-0 sm:max-w-[340px] md:max-w-[380px]">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-sm">
              <img
                src="/images/category-promo.jpg"
                alt="Colorful crochet yarn balls with wooden hooks and handmade crafts"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
