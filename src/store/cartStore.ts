import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '../types'

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string, color: string) => void
  updateQuantity: (productId: string, color: string, quantity: number) => void
  clearCart: () => void
}

const defaultCartItems: CartItem[] = [
  { productId: 'p1', selectedColor: 'Beige', quantity: 1, unitPrice: 32 },
  { productId: 'p4', selectedColor: 'Beige', quantity: 1, unitPrice: 22 },
  { productId: 'p5', selectedColor: 'Brown', quantity: 1, unitPrice: 26 },
]

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: defaultCartItems,
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) =>
              i.productId === item.productId &&
              i.selectedColor === item.selectedColor,
          )
          if (existing) {
            return {
              items: state.items.map((i) =>
                i === existing
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            }
          }
          return { items: [...state.items, item] }
        }),
      removeItem: (productId, color) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.selectedColor === color),
          ),
        })),
      updateQuantity: (productId, color, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.selectedColor === color
              ? { ...i, quantity: Math.max(1, quantity) }
              : i,
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'threodit-cart' },
  ),
)

export const selectCartCount = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.quantity, 0)

export const selectCartSubtotal = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)