import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, Heart, Check, ArrowRight } from 'lucide-react'
import { products } from '../data/products'
import { categories } from '../data/categories'
import { formatPrice } from '../utils/currency'
import { useCartStore } from '../store/cartStore'
import type { ProductColor } from '../types'

import Breadcrumbs from '../components/ui/Breadcrumbs'
import ColorSwatch from '../components/ui/ColorSwatch'
import QuantityStepper from '../components/ui/QuantityStepper'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import SectionHeading from '../components/ui/SectionHeading'
import ProductCard from '../components/product/ProductCard'
import ImageGallery from '../components/product/ImageGallery'
import ProductBenefits from '../components/product/ProductBenefits'
import ProductTabs from '../components/product/ProductTabs'

export default function ProductDetailsPage() {
  const { slug } = useParams<{ slug: string }>()
  const addItem = useCartStore((s) => s.addItem)

  const product = products.find((p) => p.slug === slug)

  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product?.colors[0] || { name: 'Yellow', hex: '#E5BD53' },
  )
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [addedToast, setAddedToast] = useState(false)

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0])
      setQuantity(1)
      setAddedToast(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [slug, product])

  useEffect(() => {
    if (!addedToast) return
    const timer = setTimeout(() => setAddedToast(false), 3500)
    return () => clearTimeout(timer)
  }, [addedToast])

  if (!product) {
    return (
      <div className="page-container py-16">
        <EmptyState
          title="Product Not Found"
          message="We couldn't find the crochet item you're looking for."
        >
          <Button variant="dark" to="/shop">
            Back to Shop <ArrowRight size={16} />
          </Button>
        </EmptyState>
      </div>
    )
  }

  const categoryItem = categories.find((c) => c.id === product.category)
  const categoryLabel = categoryItem ? categoryItem.name : 'Bags'

  const breadcrumbItems = [
    { label: 'Home', to: '/' },
    { label: categoryLabel, to: `/shop?category=${product.category}` },
    { label: product.name },
  ]

  const handleAddToCart = () => {
    if (!product.inStock) return
    addItem({
      productId: product.id,
      selectedColor: selectedColor.name,
      quantity,
      unitPrice: product.price,
    })
    setAddedToast(true)
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.featured))
    .slice(0, 4)

  return (
    <div className="page-container py-6 sm:py-8 lg:py-10">
      {/* 1. Breadcrumbs */}
      <div className="mb-6 sm:mb-8">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* 2. Top Section: 2 Equal Columns Grid (50% Gallery, 50% Info, Zero Overlap) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* Left: Image Gallery */}
        <div className="w-full">
          <ImageGallery
            images={product.images}
            productName={product.name}
            currentColor={selectedColor}
            defaultColor={product.colors[0]}
            colorImages={product.colorImages}
          />
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col w-full">
          {/* Product Title */}
          <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-heading leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mt-2.5 flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-[#E5BD53]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                  stroke="currentColor"
                />
              ))}
            </div>
            <span className="text-sm text-muted">
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mt-3.5">
            <span className="font-heading text-2xl sm:text-3xl font-bold text-heading">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Short Description */}
          <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-body max-w-lg">
            {product.description}
          </p>

          {/* Color Selection */}
          <div className="mt-6">
            <span className="block text-sm font-semibold text-heading">
              Color
            </span>

            <div className="mt-2.5 flex items-center gap-3">
              {product.colors.map((color) => (
                <ColorSwatch
                  key={color.name}
                  color={color}
                  selected={selectedColor.name === color.name}
                  onSelect={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Action Row: Stepper + Add to Cart + Wishlist Button */}
          <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Quantity Stepper */}
            <QuantityStepper
              value={quantity}
              onChange={setQuantity}
              min={1}
              max={10}
            />

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-btn px-8 text-sm font-semibold text-white transition-all duration-200 ${
                addedToast
                  ? 'bg-success hover:brightness-105'
                  : 'bg-primary-dark hover:brightness-110'
              } disabled:cursor-not-allowed disabled:opacity-50`}
            >
              {addedToast ? (
                <>
                  <Check size={17} strokeWidth={2.5} />
                  Added!
                </>
              ) : (
                'Add to Cart'
              )}
            </button>

            {/* Wishlist Heart Button */}
            <button
              type="button"
              onClick={() => setIsWishlisted((prev) => !prev)}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              title={isWishlisted ? 'Wishlisted' : 'Save to wishlist'}
              className={`flex h-11 w-11 items-center justify-center rounded-btn border transition ${
                isWishlisted
                  ? 'border-error bg-error/10 text-error'
                  : 'border-line bg-surface text-heading hover:bg-accent-soft'
              }`}
            >
              <Heart
                size={19}
                fill={isWishlisted ? 'currentColor' : 'none'}
                stroke="currentColor"
              />
            </button>
          </div>

          {/* Notification when added to cart */}
          {addedToast && (
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-success animate-in fade-in duration-200">
              <Check size={15} />
              <span>
                Added {quantity} × {product.name} ({selectedColor.name}) to cart.
              </span>
              <Link to="/cart" className="underline font-semibold ml-1 text-primary-dark">
                View Cart →
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* 3. Value Guarantees Strip */}
      <ProductBenefits />

      {/* 4. Description / Shipping / Reviews Tabs */}
      <ProductTabs product={product} />

      {/* 5. Related Products */}
      {relatedProducts.length > 0 && (
        <section
          aria-label="Related products"
          className="mt-16 border-t border-line pt-8"
        >
          <SectionHeading
            title="You May Also Like"
            actionLabel="View All"
            actionTo="/shop"
          />

          <div className="grid grid-cols-1 gap-4 min-[360px]:grid-cols-2 md:grid-cols-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
