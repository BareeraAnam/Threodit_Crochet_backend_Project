import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, ArrowRight, Minus, Plus, CheckCircle2, X } from 'lucide-react'
import { useCartStore, selectCartSubtotal } from '../store/cartStore'
import { products } from '../data/products'
import { formatPrice } from '../utils/currency'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'

// Helper to get active coupons from localStorage or defaults
function getAvailableCoupons(): Record<string, { label: string; rate: number; isFlat?: boolean }> {
  const defaultCoupons: Record<string, { label: string; rate: number; isFlat?: boolean }> = {
    CROCHET10: { label: '10% Off Your Order', rate: 0.1 },
    THREODIT15: { label: '15% Off Handcrafted Special', rate: 0.15 },
    SAVE5: { label: '$5.00 Off Order', rate: 5, isFlat: true },
  }
  if (typeof window === 'undefined') return defaultCoupons

  try {
    const raw = localStorage.getItem('thr_adm_coupons')
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        const merged: Record<string, { label: string; rate: number; isFlat?: boolean }> = {}
        parsed.forEach((c: { code: string; label: string; rate: number; type: string; active?: boolean }) => {
          if (c.active !== false && c.code) {
            merged[c.code.toUpperCase()] = {
              label: c.label || `${c.code} Discount`,
              rate: Number(c.rate),
              isFlat: c.type === 'flat',
            }
          }
        })
        return Object.keys(merged).length > 0 ? merged : defaultCoupons
      }
    }
  } catch (e) {
    // ignore
  }
  return defaultCoupons
}

export default function CartPage() {
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const subtotal = useCartStore(selectCartSubtotal)

  const availableCoupons = getAvailableCoupons()

  // Coupon state
  const [couponInput, setCouponInput] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [couponError, setCouponError] = useState('')

  const activeCouponData = appliedCoupon ? availableCoupons[appliedCoupon] : null
  const discountAmount = activeCouponData
    ? activeCouponData.isFlat
      ? Math.min(subtotal, activeCouponData.rate)
      : subtotal * activeCouponData.rate
    : 0

  const shipping = items.length > 0 ? 5.0 : 0
  const total = Math.max(0, subtotal - discountAmount + shipping)

  function handleApplyCoupon() {
    const cleanCode = couponInput.trim().toUpperCase()
    if (!cleanCode) {
      setCouponError('Please enter a coupon code.')
      return
    }

    if (availableCoupons[cleanCode]) {
      setAppliedCoupon(cleanCode)
      setCouponInput('')
      setCouponError('')
    } else {
      const sample = Object.keys(availableCoupons)[0] || 'CROCHET10'
      setCouponError(`Invalid coupon code. Try ${sample} for a discount.`)
    }
  }

  function handleRemoveCoupon() {
    setAppliedCoupon(null)
    setCouponError('')
  }

  if (items.length === 0) {
    return (
      <div className="page-container py-14 md:py-20">
        <EmptyState
          title="Your Cart is Empty"
          message="Looks like you haven't added any handmade crochet treasures yet."
        >
          <Button variant="dark" to="/shop">
            Explore Collection <ArrowRight size={16} />
          </Button>
        </EmptyState>
      </div>
    )
  }

  return (
    <div className="page-container py-8 sm:py-12 md:py-16">
      {/* Centered Column Layout matching 08_Cart.png */}
      <div className="mx-auto w-full max-w-2xl">
        {/* Page Heading: "Your Cart" */}
        <h1 className="font-heading text-3xl font-bold tracking-tight text-heading sm:text-4xl md:text-5xl">
          Your Cart
        </h1>

        {/* Cart Items List */}
        <div className="mt-8 divide-y divide-[#EADDCB]/80 border-b border-[#EADDCB]/80 sm:mt-10">
          {items.map((item) => {
            const product = products.find((p) => p.id === item.productId)
            const image =
              (item.selectedColor && product?.colorImages?.[item.selectedColor]?.[0]) ||
              product?.images[0] ||
              '/images/daisy-bag-1.jpg'
            const name = product?.name || 'Crochet Product'
            const lineTotal = item.unitPrice * item.quantity

            return (
              <div
                key={`${item.productId}-${item.selectedColor}`}
                className="flex flex-col gap-3.5 py-5 first:pt-2 last:pb-6 sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Product Thumbnail & Title + Price */}
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-line/40 bg-[#F5EFE6] sm:h-22 sm:w-22">
                    <img
                      src={image}
                      alt={name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="font-heading text-base font-semibold text-heading sm:text-lg">
                      {name}
                    </h2>
                    <p className="mt-1 text-sm font-normal text-muted sm:text-base">
                      {formatPrice(item.unitPrice)}
                    </p>
                  </div>
                </div>

                {/* Quantity Pill, Trash Button & Line Total */}
                <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-4 pl-24 sm:pl-0">
                  {/* Quantity Stepper Pill */}
                  <div className="flex items-center rounded-xl border border-[#D9D0C3] bg-white/70 px-3 py-1 shadow-2xs">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.productId, item.selectedColor, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                      className="text-muted transition hover:text-heading disabled:opacity-30 disabled:hover:text-muted"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="min-w-[28px] text-center text-sm font-medium text-heading">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.productId, item.selectedColor, item.quantity + 1)
                      }
                      aria-label="Increase quantity"
                      className="text-muted transition hover:text-heading"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  {/* Trash Icon */}
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId, item.selectedColor)}
                    aria-label={`Remove ${name} from cart`}
                    className="rounded-full p-1.5 text-muted transition hover:bg-error/10 hover:text-error"
                  >
                    <Trash2 size={17} />
                  </button>

                  {/* Line Total */}
                  <div className="min-w-[68px] text-right">
                    <span className="font-heading text-base font-bold text-heading sm:text-lg">
                      {formatPrice(lineTotal)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Coupon Code Input Row */}
        <div className="mt-6 sm:mt-7">
          <div className="flex gap-2.5 sm:gap-3">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => {
                setCouponInput(e.target.value)
                if (couponError) setCouponError('')
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleApplyCoupon()
                }
              }}
              placeholder="Enter coupon code"
              className="flex-1 rounded-xl border border-[#D9D0C3] bg-white/70 px-4 py-3 text-sm text-heading placeholder:text-muted/70 focus:outline-none focus:ring-1 focus:ring-primary-dark transition"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              className="rounded-xl bg-[#F6CD48] px-7 py-3 text-sm font-semibold text-heading shadow-xs transition hover:bg-[#E8B832] active:scale-95"
            >
              Apply
            </button>
          </div>

          {couponError && (
            <p className="mt-2 text-xs text-error">{couponError}</p>
          )}

          {appliedCoupon && activeCouponData && (
            <div className="mt-3 flex items-center justify-between rounded-xl bg-success/10 px-4 py-2.5 text-xs text-success sm:text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>
                  Coupon <strong>{appliedCoupon}</strong> applied ({activeCouponData.label})
                </span>
              </div>
              <button
                type="button"
                onClick={handleRemoveCoupon}
                aria-label="Remove coupon"
                className="rounded p-1 transition hover:bg-success/20"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Bill Summary Rows Stacked Directly Underneath */}
        <div className="mt-6 space-y-3.5 text-sm sm:text-base">
          <div className="flex justify-between text-heading">
            <span className="font-medium text-heading">Subtotal</span>
            <span className="font-semibold text-heading">{formatPrice(subtotal)}</span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between text-success">
              <span className="font-medium">Discount ({appliedCoupon})</span>
              <span className="font-semibold">-{formatPrice(discountAmount)}</span>
            </div>
          )}

          <div className="flex justify-between text-heading">
            <span className="font-medium text-heading">Shipping</span>
            <span className="font-semibold text-heading">{formatPrice(shipping)}</span>
          </div>

          <div className="flex justify-between border-t border-transparent pt-3 text-xl font-bold text-heading sm:text-2xl">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        {/* Full-width Proceed to Checkout CTA Button */}
        <div className="mt-6 sm:mt-7">
          <Link
            to="/checkout"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F6CD48] py-4 text-center font-heading text-base font-semibold text-heading shadow-sm transition hover:bg-[#E8B832] hover:shadow-md active:scale-[0.99] sm:text-lg"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}
