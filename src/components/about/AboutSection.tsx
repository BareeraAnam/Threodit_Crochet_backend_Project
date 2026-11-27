import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Sparkles, Sprout } from 'lucide-react'

interface AboutSectionProps {
  isPage?: boolean
}

export default function AboutSection({ isPage = false }: AboutSectionProps) {
  return (
    <section
      aria-label="About Threodit - Our Story"
      className={`page-container ${isPage ? 'py-8 md:py-16' : 'py-12 md:py-20'}`}
    >
      {/* Top 2 Columns: Story & Lifestyle Image */}
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left: Text Content */}
        <div className="flex flex-col items-start text-left">
          <span className="text-xs font-bold tracking-[0.2em] text-primary-dark uppercase sm:text-sm">
            OUR STORY
          </span>

          <h2 className="mt-3 font-heading text-4xl font-semibold leading-[1.15] text-heading sm:text-5xl lg:text-[52px]">
            Crafted <br className="hidden sm:inline" />
            with Passion
          </h2>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-body sm:text-lg">
            At Threodit, we believe in the beauty of handmade. Our crochet pieces are
            made with love, care and attention to detail, bringing warmth and creativity
            into everyday life.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-btn bg-primary px-7 py-3.5 text-sm font-semibold text-heading shadow-sm transition-all hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark focus-visible:ring-offset-2 sm:text-base"
          >
            Our Collection <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        {/* Right: Lifestyle Image with Yellow Scribble */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Main Photo Frame */}
          <div className="relative overflow-hidden rounded-[32px] border border-line bg-surface shadow-soft sm:rounded-[40px]">
            <div className="aspect-[4/4.5] w-full">
              <img
                src="/images/about-lifestyle.jpg"
                alt="Woman wearing handmade crochet sun hat with daisy flower and crochet lace top"
                className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          {/* Decorative Yellow Loop Doodle */}
          <div
            className="pointer-events-none absolute -bottom-8 -left-4 hidden text-primary sm:block md:-bottom-10 md:-left-8"
            aria-hidden="true"
          >
            <svg
              width="140"
              height="70"
              viewBox="0 0 140 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-primary"
            >
              <path
                d="M10 20C40 60 70 65 85 45C95 30 85 10 70 25C50 45 90 60 130 35"
                stroke="#E5BD53"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom 3 Values */}
      <div className="mt-16 border-t border-line/80 pt-12 md:mt-24 md:pt-16">
        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3 sm:gap-6 md:divide-x md:divide-line/60">
          {/* Value 1 */}
          <div className="flex flex-col items-center px-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-primary-dark shadow-sm">
              <Heart size={26} aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold text-heading sm:text-xl">
              Handmade
            </h3>
            <p className="mt-1 text-sm text-muted">
              Each piece is unique
            </p>
          </div>

          {/* Value 2 */}
          <div className="flex flex-col items-center px-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-primary-dark shadow-sm">
              <Sprout size={26} aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold text-heading sm:text-xl">
              Sustainable
            </h3>
            <p className="mt-1 text-sm text-muted">
              Eco-friendly materials
            </p>
          </div>

          {/* Value 3 */}
          <div className="flex flex-col items-center px-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-primary-dark shadow-sm">
              <Sparkles size={26} aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold text-heading sm:text-xl">
              Support Small Business
            </h3>
            <p className="mt-1 text-sm text-muted">
              Made by passionate creators
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
