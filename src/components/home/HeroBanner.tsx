import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'

interface HeroData {
  eyebrow: string
  h1: string
  h2: string
  desc: string
  cta: string
  bg: string
}

const defaultHero: HeroData = {
  eyebrow: 'Handmade with love',
  h1: 'Every Stitch',
  h2: 'Tells a Story',
  desc: 'Discover unique crochet accessories made with care, creativity and comfort.',
  cta: 'Shop Now',
  bg: '#F2D385',
}

function getHeroData(): HeroData {
  if (typeof window === 'undefined') return defaultHero
  try {
    const raw = localStorage.getItem('thr_adm_hero')
    if (raw) {
      const p = JSON.parse(raw)
      return {
        eyebrow: p.eyebrow || defaultHero.eyebrow,
        h1: p.h1 || defaultHero.h1,
        h2: p.h2 || defaultHero.h2,
        desc: p.desc || defaultHero.desc,
        cta: p.cta || defaultHero.cta,
        bg: p.bg || defaultHero.bg,
      }
    }
  } catch (e) {
    // ignore
  }
  return defaultHero
}

export default function HeroBanner() {
  const [hero, setHero] = useState<HeroData>(getHeroData)

  useEffect(() => {
    setHero(getHeroData())
  }, [])

  return (
    <section
      aria-labelledby="hero-heading"
      className="page-container pt-4 md:pt-6"
    >
      <div
        className="relative overflow-hidden rounded-banner"
        style={{ backgroundColor: hero.bg }}
      >
        <div className="grid items-center md:grid-cols-2">
          {/* Left: text */}
          <div className="relative z-10 px-6 pb-6 pt-10 md:px-12 md:py-16 lg:py-20">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-brown md:text-[13px]">
              {hero.eyebrow}
            </p>

            <h1
              id="hero-heading"
              className="mt-4 text-4xl font-semibold leading-tight text-brand-brown md:text-[56px]"
            >
              <span className="block">{hero.h1}</span>
              {hero.h2 && <span className="block">{hero.h2}</span>}
            </h1>

            <p className="mt-5 max-w-sm text-base text-brand-brown/90 leading-relaxed">
              {hero.desc}
            </p>

            <Button to="/shop" variant="dark" className="mt-8">
              {hero.cta} <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>

          {/* Right: photo seamlessly blended without box borders */}
          <div className="relative h-72 md:h-full md:min-h-110 overflow-hidden">
            <img
              src="/images/hero.jpg"
              alt="Crochet daisy handbag next to balls of pink yarn"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
              style={{
                WebkitMaskImage:
                  'linear-gradient(to right, transparent 0%, black 25%, black 100%)',
                maskImage:
                  'linear-gradient(to right, transparent 0%, black 25%, black 100%)',
              }}
              className="absolute inset-0 h-full w-full object-cover object-center md:object-right"
            />
          </div>
        </div>

        {/* Decorative squiggle 1: Center loop doodle matching sample */}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 50"
          fill="none"
          className="pointer-events-none absolute bottom-10 left-[44%] z-20 hidden w-20 md:block"
        >
          <path
            d="M10 35 C30 50, 45 40, 50 25 C55 10, 40 5, 35 15 C30 28, 60 40, 85 20"
            stroke="#9C5C1C"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Decorative squiggle 2: Top Right curly arrow matching sample */}
        <svg
          aria-hidden="true"
          viewBox="0 0 80 80"
          fill="none"
          className="pointer-events-none absolute right-8 top-8 z-20 hidden w-16 md:block"
        >
          <path
            d="M50 15 C65 20, 70 35, 55 45 C40 55, 30 40, 40 30 C50 20, 65 35, 60 60"
            stroke="#9C5C1C"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M50 55 L60 60 L68 50"
            stroke="#9C5C1C"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  )
}