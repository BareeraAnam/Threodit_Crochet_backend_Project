import type { Product, ProductColor } from '../types'

const beige: ProductColor = { name: 'Beige', hex: '#D9C7A8' }
const pink: ProductColor = { name: 'Pink', hex: '#EFB1AC' }
const yellow: ProductColor = { name: 'Yellow', hex: '#E5BD53' }
const brown: ProductColor = { name: 'Brown', hex: '#7B4A2B' }
const black: ProductColor = { name: 'Black', hex: '#1A1A1A' }

const defaultProducts: Product[] = [
  {
    id: 'p1',
    slug: 'daisy-crochet-bag',
    name: 'Daisy Crochet Bag',
    price: 32,
    images: [
      '/images/daisy-bag-1.jpg',
      '/images/daisy-bag-2.jpg',
      '/images/daisy-bag-3.jpg',
      '/images/daisy-bag-4.jpg',
    ],
    colorImages: {
      Beige: [
        '/images/daisy-bag-1.jpg',
        '/images/daisy-bag-2.jpg',
        '/images/daisy-bag-3.jpg',
        '/images/daisy-bag-4.jpg',
      ],
      Yellow: [
        '/images/daisy-bag-1.jpg',
        '/images/daisy-bag-2.jpg',
        '/images/daisy-bag-3.jpg',
        '/images/daisy-bag-4.jpg',
      ],
      Pink: [
        '/images/daisy-bag-pink-1.jpg',
        '/images/daisy-bag-pink-2.jpg',
        '/images/daisy-bag-pink-3.jpg',
        '/images/daisy-bag-pink-4.jpg',
      ],
    },
    category: 'bags',
    description:
      'Handmade crochet bag with beautiful daisy flowers. Lightweight, durable and perfect for everyday use.',
    details: [
      'Material: 100% Cotton Yarn',
      'Size: 28cm x 22cm',
      'Lightweight & Durable',
      'Perfect for everyday use',
    ],
    colors: [yellow, beige, pink],
    inStock: true,
    featured: true,
    rating: 4.5,
    reviewCount: 28,
  },
  {
    id: 'p2',
    slug: 'pink-handbag',
    name: 'Pink Handbag',
    price: 28,
    images: [
      '/images/pink-handbag-1.jpg',
      '/images/pink-handbag-2.jpg',
      '/images/pink-handbag-3.jpg',
      '/images/pink-handbag-4.jpg',
    ],
    category: 'bags',
    description: 'A soft pink crochet handbag with sturdy handles and delicate floral texture.',
    details: [
      'Material: 100% Organic Cotton Yarn',
      'Size: 26cm x 20cm',
      'Reinforced top carry handles',
      'Gentle hand wash recommended',
    ],
    colors: [pink, beige],
    inStock: true,
    featured: true,
    rating: 4.0,
    reviewCount: 12,
  },
  {
    id: 'p3',
    slug: 'brown-crochet-bag',
    name: 'Brown Crochet Bag',
    price: 35,
    images: [
      '/images/brown-bag-1.jpg',
      '/images/brown-bag-2.jpg',
      '/images/brown-bag-3.jpg',
      '/images/brown-bag-4.jpg',
    ],
    category: 'bags',
    description: 'A roomy brown crochet shoulder bag handcrafted with rich earth tones for effortless everyday style.',
    details: [
      'Material: Heavyweight Cotton Cord',
      'Size: 32cm x 28cm',
      'Comfortable shoulder strap',
      'Spacious interior for daily essentials',
    ],
    colors: [brown, black],
    inStock: true,
    featured: true,
    rating: 4.5,
    reviewCount: 17,
  },
  {
    id: 'p4',
    slug: 'crochet-hat',
    name: 'Crochet Hat',
    price: 22,
    images: [
      '/images/crochet-hat-1.jpg',
      '/images/crochet-hat-2.jpg',
      '/images/crochet-hat-3.jpg',
      '/images/crochet-hat-4.jpg',
    ],
    colorImages: {
      Beige: [
        '/images/crochet-hat-1.jpg',
        '/images/crochet-hat-2.jpg',
        '/images/crochet-hat-3.jpg',
        '/images/crochet-hat-4.jpg',
      ],
      Yellow: [
        '/images/crochet-hat-yellow-1.jpg',
        '/images/crochet-hat-yellow-2.jpg',
        '/images/crochet-hat-yellow-3.jpg',
        '/images/crochet-hat-yellow-4.jpg',
      ],
    },
    category: 'hats',
    description: 'A charming handmade crochet bucket hat with breathable weave and delicate flower accent.',
    details: [
      'Material: 100% Breathable Cotton',
      'Size: One size fits most (56-58cm)',
      'Sun protective brim',
      'Foldable & packable design',
    ],
    colors: [beige, yellow],
    inStock: true,
    featured: true,
    rating: 4.5,
    reviewCount: 9,
  },
  {
    id: 'p5',
    slug: 'knitted-scarf',
    name: 'Knitted Scarf',
    price: 26,
    images: [
      '/images/knitted-scarf-1.jpg',
      '/images/knitted-scarf-2.jpg',
      '/images/knitted-scarf-3.jpg',
      '/images/knitted-scarf-4.jpg',
    ],
    category: 'scarves',
    description: 'A cosy, chunky knitted scarf with hand-fringed ends for warmth during chilly seasons.',
    details: [
      'Material: Premium Acrylic Wool Blend',
      'Length: 180cm x 30cm',
      'Soft, non-scratchy texture',
      'Hand wash with mild detergent',
    ],
    colors: [brown, beige],
    inStock: true,
    featured: false,
    rating: 4.0,
    reviewCount: 14,
  },
  {
    id: 'p6',
    slug: 'round-shoulder-bag',
    name: 'Round Shoulder Bag',
    price: 30,
    images: [
      '/images/round-shoulder-bag-1.jpg',
      '/images/round-shoulder-bag-2.jpg',
      '/images/round-shoulder-bag-3.jpg',
      '/images/round-shoulder-bag-4.jpg',
    ],
    category: 'bags',
    description: 'A stylish circular crochet shoulder bag with intricate spiral stitch patterns and secure closure.',
    details: [
      'Material: Natural Cotton Yarn',
      'Diameter: 24cm, Depth: 8cm',
      'Durable woven crossbody strap',
      'Holds phone, wallet, sunglasses & keys',
    ],
    colors: [brown, black],
    inStock: false,
    featured: false,
    rating: 4.0,
    reviewCount: 6,
  },
  {
    id: 'p7',
    slug: 'cream-lace-scarf',
    name: 'Cream Lace Scarf',
    price: 24,
    images: [
      '/images/cream-lace-scarf-1.jpg',
      '/images/cream-lace-scarf-2.jpg',
      '/images/cream-lace-scarf-3.jpg',
      '/images/cream-lace-scarf-4.jpg',
    ],
    category: 'scarves',
    description: 'An airy cream lace crochet scarf featuring delicate floral openwork motifs.',
    details: [
      'Material: Ultra-soft Cotton & Silk Yarn',
      'Length: 165cm x 25cm',
      'Lightweight all-season accessory',
      'Dry flat in shade',
    ],
    colors: [beige],
    inStock: true,
    featured: false,
    rating: 4.0,
    reviewCount: 5,
  },
  {
    id: 'p8',
    slug: 'rust-ribbed-scarf',
    name: 'Rust Ribbed Scarf',
    price: 27,
    images: [
      '/images/rust-ribbed-scarf-1.jpg',
      '/images/rust-ribbed-scarf-2.jpg',
      '/images/rust-ribbed-scarf-3.jpg',
      '/images/rust-ribbed-scarf-4.jpg',
    ],
    category: 'scarves',
    description: 'A warm rust ribbed knitted scarf designed with ribbed texture for maximum warmth and elasticity.',
    details: [
      'Material: Brushed Wool Blend',
      'Length: 190cm x 28cm',
      'Classic ribbed stretch knit',
      'Machine washable on gentle cycle',
    ],
    colors: [brown, yellow],
    inStock: true,
    featured: false,
    rating: 4.5,
    reviewCount: 8,
  },
  {
    id: 'p9',
    slug: 'berry-bloom-bag',
    name: 'Berry Bloom Bag',
    price: 34,
    images: [
      '/images/berry-bloom-bag-1.jpg',
      '/images/berry-bloom-bag-2.jpg',
      '/images/berry-bloom-bag-3.jpg',
      '/images/berry-bloom-bag-4.jpg',
    ],
    category: 'bags',
    description: 'A vibrant crochet tote bag with a berry-pink blossom motif and sturdy contrasting handles.',
    details: [
      'Material: 100% Double-ply Cotton',
      'Size: 30cm x 24cm',
      'Reinforced base and handles',
      'Eco-friendly handmade creation',
    ],
    colors: [pink, beige],
    inStock: true,
    featured: false,
    rating: 4.0,
    reviewCount: 4,
  },
]

function loadProducts(): Product[] {
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem('thr_adm_products')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p: Product) => {
            const def = defaultProducts.find((d) => d.id === p.id)
            return {
              ...p,
              colorImages: p.colorImages || def?.colorImages,
            }
          })
        }
      }
    } catch (e) {
      // ignore
    }
  }
  return defaultProducts
}

export const products: Product[] = loadProducts()