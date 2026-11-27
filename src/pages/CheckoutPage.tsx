import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ChevronDown, AlertCircle } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { products } from '../data/products'
import { formatPrice } from '../utils/currency'

interface ShippingForm {
  fullName: string
  email: string
  address: string
  city: string
  state: string
  zipCode: string
}

const defaultPreviewItems = [
  {
    name: 'Daisy Crochet Bag',
    price: 32,
    image: '/images/daisy-bag-1.jpg',
  },
  {
    name: 'Crochet Hat',
    price: 22,
    image: '/images/crochet-hat-1.jpg',
  },
  {
    name: 'Knitted Scarf',
    price: 26,
    image: '/images/knitted-scarf-1.jpg',
  },
]

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clearCart)

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'cod'>('card')
  const [shipping, setShipping] = useState<ShippingForm>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: 'NY',
    zipCode: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [orderComplete, setOrderComplete] = useState(false)

  // Use actual cart items if available, otherwise show sample items from screenshot
  const displayItems =
    items.length > 0
      ? items.map((cartItem) => {
          const product = products.find((p) => p.id === cartItem.productId)
          return {
            name: product?.name || 'Handmade Crochet Item',
            price: cartItem.unitPrice * cartItem.quantity,
            image: product?.images[0] || '/images/daisy-bag-1.jpg',
            quantity: cartItem.quantity,
          }
        })
      : defaultPreviewItems

  const subtotal = displayItems.reduce((sum, item) => sum + item.price, 0)
  const shippingCost = 5.0
  const total = subtotal + shippingCost

  function validate() {
    const errs: Record<string, string> = {}
    if (!shipping.fullName.trim()) errs.fullName = 'Full Name is required.'
    if (!shipping.email.trim()) {
      errs.email = 'Email Address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email)) {
      errs.email = 'Please enter a valid email address.'
    }
    if (!shipping.address.trim()) errs.address = 'Street address is required.'
    if (!shipping.city.trim()) errs.city = 'City is required.'
    if (!shipping.zipCode.trim()) errs.zipCode = 'ZIP Code is required.'
    return errs
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      // Save order to localStorage for Admin Panel
      try {
        const orderItems =
          items.length > 0
            ? items.map((cartItem) => {
                const product = products.find((p) => p.id === cartItem.productId)
                return {
                  name: product?.name || 'Crochet Item',
                  productId: cartItem.productId,
                  selectedColor: cartItem.selectedColor || 'Standard',
                  quantity: cartItem.quantity,
                  unitPrice: cartItem.unitPrice,
                }
              })
            : defaultPreviewItems.map((item, idx) => ({
                name: item.name,
                productId: `p${idx + 1}`,
                selectedColor: 'Standard',
                quantity: 1,
                unitPrice: item.price,
              }))

        const newOrder = {
          id: 'ORD-' + Date.now().toString().slice(-6),
          fullName: shipping.fullName.trim(),
          email: shipping.email.trim(),
          address: shipping.address.trim(),
          city: shipping.city.trim(),
          state: shipping.state.trim(),
          zipCode: shipping.zipCode.trim(),
          paymentMethod:
            paymentMethod === 'card'
              ? 'Credit / Debit Card'
              : paymentMethod === 'paypal'
              ? 'PayPal'
              : 'Cash on Delivery',
          items: orderItems,
          total: total,
          date: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
        }

        const existingRaw = localStorage.getItem('thr_adm_orders')
        const existingOrders = existingRaw ? JSON.parse(existingRaw) : []
        existingOrders.unshift(newOrder) // Put latest order at the top
        localStorage.setItem('thr_adm_orders', JSON.stringify(existingOrders))
      } catch (err) {
        console.error('Failed to save order to localStorage for admin panel', err)
      }

      setOrderComplete(true)
      clearCart()
    }
  }

  return (
    <div className="page-container py-8 md:py-14">
      <div className="mb-8 md:mb-10">
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-heading sm:text-4xl md:text-5xl">
          Checkout
        </h1>
      </div>

      {orderComplete ? (
        <div className="mx-auto max-w-lg rounded-banner border border-line bg-surface p-8 text-center shadow-soft">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="mt-4 font-heading text-2xl font-bold text-heading">
            Order Confirmed!
          </h2>
          <p className="mt-2 text-sm text-body sm:text-base">
            Thank you for your order! We are preparing your handmade crochet treasures with love and care. A confirmation receipt has been sent to your email.
          </p>
          <div className="mt-8">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-btn bg-primary px-8 py-3.5 text-sm font-semibold text-heading transition hover:brightness-95"
            >
              Continue Shopping <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left Column: Shipping & Payment Method (7 cols) */}
            <div className="space-y-10 lg:col-span-7">
              {/* Shipping Information */}
              <div>
                <h2 className="font-heading text-xl font-semibold text-heading sm:text-2xl">
                  Shipping Information
                </h2>

                <div className="mt-5 space-y-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="sr-only">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Full Name"
                      value={shipping.fullName}
                      onChange={(e) => {
                        setShipping({ ...shipping, fullName: e.target.value })
                        if (errors.fullName) setErrors({ ...errors, fullName: '' })
                      }}
                      className={`w-full rounded-card border bg-surface px-4 py-3 text-sm text-heading placeholder:text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark ${
                        errors.fullName ? 'border-error' : 'border-line'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-error">
                        <AlertCircle size={13} /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email Address"
                      value={shipping.email}
                      onChange={(e) => {
                        setShipping({ ...shipping, email: e.target.value })
                        if (errors.email) setErrors({ ...errors, email: '' })
                      }}
                      className={`w-full rounded-card border bg-surface px-4 py-3 text-sm text-heading placeholder:text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark ${
                        errors.email ? 'border-error' : 'border-line'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-error">
                        <AlertCircle size={13} /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label htmlFor="address" className="sr-only">
                      Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      placeholder="Address"
                      value={shipping.address}
                      onChange={(e) => {
                        setShipping({ ...shipping, address: e.target.value })
                        if (errors.address) setErrors({ ...errors, address: '' })
                      }}
                      className={`w-full rounded-card border bg-surface px-4 py-3 text-sm text-heading placeholder:text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark ${
                        errors.address ? 'border-error' : 'border-line'
                      }`}
                    />
                    {errors.address && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-error">
                        <AlertCircle size={13} /> {errors.address}
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label htmlFor="city" className="sr-only">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      placeholder="City"
                      value={shipping.city}
                      onChange={(e) => {
                        setShipping({ ...shipping, city: e.target.value })
                        if (errors.city) setErrors({ ...errors, city: '' })
                      }}
                      className={`w-full rounded-card border bg-surface px-4 py-3 text-sm text-heading placeholder:text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark ${
                        errors.city ? 'border-error' : 'border-line'
                      }`}
                    />
                    {errors.city && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-error">
                        <AlertCircle size={13} /> {errors.city}
                      </p>
                    )}
                  </div>

                  {/* State & ZIP Code */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <label htmlFor="state" className="sr-only">
                        State
                      </label>
                      <select
                        id="state"
                        value={shipping.state}
                        onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                        className="w-full appearance-none rounded-card border border-line bg-surface px-4 py-3 text-sm text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
                      >
                        <option value="NY">New York (NY)</option>
                        <option value="CA">California (CA)</option>
                        <option value="TX">Texas (TX)</option>
                        <option value="FL">Florida (FL)</option>
                        <option value="IL">Illinois (IL)</option>
                      </select>
                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                      />
                    </div>

                    <div>
                      <label htmlFor="zipCode" className="sr-only">
                        ZIP Code
                      </label>
                      <input
                        id="zipCode"
                        type="text"
                        placeholder="ZIP Code"
                        value={shipping.zipCode}
                        onChange={(e) => {
                          setShipping({ ...shipping, zipCode: e.target.value })
                          if (errors.zipCode) setErrors({ ...errors, zipCode: '' })
                        }}
                        className={`w-full rounded-card border bg-surface px-4 py-3 text-sm text-heading placeholder:text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark ${
                          errors.zipCode ? 'border-error' : 'border-line'
                        }`}
                      />
                      {errors.zipCode && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-error">
                          <AlertCircle size={13} /> {errors.zipCode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="font-heading text-xl font-semibold text-heading sm:text-2xl">
                  Payment Method
                </h2>

                <div className="mt-4 space-y-3">
                  {/* Credit / Debit Card */}
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-card border p-3.5 transition ${
                      paymentMethod === 'card'
                        ? 'border-primary-dark bg-surface shadow-sm'
                        : 'border-line bg-surface/60 hover:bg-surface'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="h-4 w-4 accent-primary-dark"
                    />
                    <span className="text-sm font-medium text-heading">
                      Credit / Debit Card
                    </span>
                  </label>

                  {/* PayPal */}
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-card border p-3.5 transition ${
                      paymentMethod === 'paypal'
                        ? 'border-primary-dark bg-surface shadow-sm'
                        : 'border-line bg-surface/60 hover:bg-surface'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={() => setPaymentMethod('paypal')}
                      className="h-4 w-4 accent-primary-dark"
                    />
                    <span className="text-sm font-medium text-heading">
                      PayPal
                    </span>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-card border p-3.5 transition ${
                      paymentMethod === 'cod'
                        ? 'border-primary-dark bg-surface shadow-sm'
                        : 'border-line bg-surface/60 hover:bg-surface'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="h-4 w-4 accent-primary-dark"
                    />
                    <span className="text-sm font-medium text-heading">
                      Cash on Delivery
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-card border border-line bg-surface p-5 shadow-soft sm:p-6">
                <h2 className="font-heading text-xl font-semibold text-heading sm:text-2xl">
                  Order Summary
                </h2>

                {/* Items List */}
                <div className="mt-5 divide-y divide-line/60">
                  {displayItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 py-3.5 first:pt-0">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-line bg-[#F4EFE6]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-body text-sm font-medium text-heading">
                          {item.name}
                        </h3>
                        <p className="mt-0.5 text-sm font-semibold text-heading">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="mt-6 space-y-2.5 border-t border-line/80 pt-4 text-sm">
                  <div className="flex justify-between text-body">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-body">
                    <span>Shipping</span>
                    <span>{formatPrice(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between border-t border-line/60 pt-3 text-base font-bold text-heading">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Place Order CTA Button */}
          <div className="mt-10 md:mt-12">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-btn bg-primary py-4 text-base font-semibold text-heading shadow-sm transition-all hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark focus-visible:ring-offset-2"
            >
              Place Order <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
