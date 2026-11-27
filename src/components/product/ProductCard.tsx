import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Check } from 'lucide-react'
import type { Product } from '../../types'
import { formatPrice } from '../../utils/currency'
import { useCartStore } from '../../store/cartStore'

export default function ProductCard({
  product,
  preferredColor,
}: {
  product: Product
  preferredColor?: string
}) {
  const addItem = useCartStore((s) => s.addItem)
  const [added, setAdded] = useState(false)

  const activeColorObj = preferredColor
    ? product.colors.find((c) => c.name.toLowerCase() === preferredColor.toLowerCase())
    : undefined

  useEffect(() => {
    if (!added) return
    const timer = setTimeout(() => setAdded(false), 1500)
    return () => clearTimeout(timer)
  }, [added])

  function handleAdd() {
    addItem({
      productId: product.id,
      selectedColor: activeColorObj?.name || product.colors[0].name,
      quantity: 1,
      unitPrice: product.price,
    })
    setAdded(true)
  }

  return (
    <article>
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative aspect-4/5 overflow-hidden rounded-card bg-accent-soft">
          <img
            src={
              (activeColorObj && product.colorImages?.[activeColorObj.name]?.[0]) ||
              product.images[0]
            }
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />

          {!product.inStock && (
            <span className="absolute left-2 top-2 z-10 rounded-btn bg-heading px-2 py-1 text-xs font-medium text-white">
              Out of stock
            </span>
          )}
        </div>
        <h3 className="mt-3 font-body text-sm font-semibold text-heading">
          {product.name}
        </h3>
      </Link>

      <div className="mt-1 flex items-center justify-between">
        <p className="text-sm font-semibold text-heading">
          {formatPrice(product.price)}
        </p>
        <button
          type="button"
          onClick={handleAdd}
          disabled={!product.inStock}
          aria-label={`Add ${product.name} to cart`}
          className="flex h-9 w-9 items-center justify-center rounded-btn bg-accent-soft text-primary-dark hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {added ? <Check size={18} /> : <ShoppingBag size={18} />}
        </button>
      </div>
    </article>
  )
}