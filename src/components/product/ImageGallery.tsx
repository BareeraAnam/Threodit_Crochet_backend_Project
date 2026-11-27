import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, Image as ImageIcon } from 'lucide-react'
import type { ProductColor } from '../../types'

interface ImageGalleryProps {
  images: string[]
  productName: string
  currentColor?: ProductColor
  defaultColor?: ProductColor
  colorImages?: Record<string, string[]>
}

export default function ImageGallery({
  images,
  productName,
  currentColor,
  colorImages,
}: ImageGalleryProps) {
  // Agar selected color ke specific clean photos available hain to wo use honge
  const activeColorImages =
    currentColor && colorImages?.[currentColor.name] && colorImages[currentColor.name].length > 0
      ? colorImages[currentColor.name]
      : images

  const displayImages = activeColorImages && activeColorImages.length > 0 ? activeColorImages : ['/images/placeholder.jpg']

  // Har product ke liye exactly 4 thumbnails honge sample design ke mutabiq
  const galleryList =
    displayImages.length >= 4
      ? displayImages.slice(0, 4)
      : [
          displayImages[0] || '/images/placeholder.jpg',
          displayImages[1] || displayImages[0] || '/images/placeholder.jpg',
          displayImages[2] || displayImages[0] || '/images/placeholder.jpg',
          displayImages[3] || displayImages[0] || '/images/placeholder.jpg',
        ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [imageError, setImageError] = useState<Record<number, boolean>>({})

  // Jab user color change kare, main picture pehle angle par reset ho jaye
  useEffect(() => {
    setActiveIndex(0)
    setImageError({})
  }, [currentColor?.name])

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? galleryList.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === galleryList.length - 1 ? 0 : prev + 1))
  }

  const handleImageError = (index: number) => {
    setImageError((prev) => ({ ...prev, [index]: true }))
  }

  return (
    <div className="flex flex-col-reverse items-start gap-3 sm:flex-row sm:gap-4 w-full">
      {/* 4 Thumbnails Column - Har product par consistently aayega */}
      <div className="flex shrink-0 items-center gap-2.5 overflow-x-auto pb-1 sm:flex-col sm:gap-3 sm:overflow-visible sm:pb-0">
        <div className="flex gap-2.5 sm:flex-col sm:gap-3">
          {galleryList.map((img, idx) => {
            const isSelected = activeIndex === idx
            const hasError = imageError[idx]

            return (
              <button
                key={`${img}-${idx}`}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`View ${productName} thumbnail ${idx + 1}`}
                aria-pressed={isSelected}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-card border transition-all duration-200 focus:outline-none sm:h-20 sm:w-20 ${
                  isSelected
                    ? 'border-primary-dark ring-2 ring-primary-dark ring-offset-2 ring-offset-cream'
                    : 'border-line bg-surface hover:border-primary-dark/60'
                }`}
              >
                {!hasError ? (
                  <img
                    src={img}
                    alt={`${productName} thumbnail ${idx + 1}`}
                    loading="lazy"
                    onError={() => handleImageError(idx)}
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-accent-soft/40 text-muted">
                    <ImageIcon size={20} className="opacity-50" />
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Scroll down indicator matching screenshot */}
        <div className="hidden w-full justify-center pt-1 text-muted/70 sm:flex" aria-hidden="true">
          <ChevronDown size={18} />
        </div>
      </div>

      {/* Main Product Image Container */}
      <div className="relative aspect-4/5 w-full flex-1 overflow-hidden rounded-banner border border-line bg-surface shadow-soft group">
        {!imageError[activeIndex] ? (
          <img
            src={galleryList[activeIndex]}
            alt={`${productName} view ${activeIndex + 1}`}
            onError={() => handleImageError(activeIndex)}
            className="h-full w-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-102"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-accent-soft/20 p-8 text-center">
            <ImageIcon size={48} className="text-muted/40" />
          </div>
        )}

        {/* Carousel Navigation Arrows */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-heading shadow-sm backdrop-blur-sm transition hover:scale-110 hover:bg-cream active:scale-95"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next image"
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-heading shadow-sm backdrop-blur-sm transition hover:scale-110 hover:bg-cream active:scale-95"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
