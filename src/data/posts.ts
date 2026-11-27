import type { BlogPost } from '../types'

const defaultPosts: BlogPost[] = [
  {
    slug: '10-easy-crochet-projects-for-beginners',
    title: '10 Easy Crochet Projects for Beginners',
    excerpt: 'Simple projects to start your crochet journey with basic stitches and easy patterns.',
    cover: '/images/blog-1.jpg',
    date: 'Sep 10, 2024',
    readTime: '5 min read',
    content: [
      'Crochet is one of the most soothing, mindful crafts anyone can pick up. With simply a single hook and a skein of yarn, you can craft tactile, functional items that bring handmade warmth into your daily life.',
      'For beginners, starting with manageable items builds hand-eye coordination and consistent tension without feeling overwhelmed. Projects like waffle-stitch dishcloths, mug rugs, chunky headbands, and simple granny squares let you practice the fundamental single and double crochet stitches with quick gratification.',
      'In this guide, we break down ten approachable, weekend-friendly patterns designed to boost your confidence and build muscle memory stitch by stitch.',
    ],
  },
  {
    slug: 'how-to-choose-the-right-yarn-for-your-project',
    title: 'How to Choose the Right Yarn for Your Project',
    excerpt: 'A comprehensive guide to picking the perfect yarn weight, fiber, and drape.',
    cover: '/images/blog-2.jpg',
    date: 'Aug 28, 2024',
    readTime: '6 min read',
    content: [
      'Walking into a yarn shop or exploring an online catalogue can feel delightfully overwhelming. Between wool, cotton, bamboo, acrylic, and alpaca, how do you know which fiber will best realize your vision?',
      'Fiber content dictates drape, heat retention, elasticity, and washability. For structured wearables like bucket hats, market bags, and table decor, plant-based fibers like 100% mercerized cotton or raffia provide crisp stitch definition without stretching out of shape.',
      'For cozy scarves, beanies, and winter sweaters, lightweight merino wool blends offer natural breathability, gentle stretch, and cloud-like warmth next to sensitive skin.',
    ],
  },
  {
    slug: 'creative-crochet-gift-ideas-for-every-occasion',
    title: 'Creative Crochet Gift Ideas for Every Occasion',
    excerpt: 'Thoughtful, handmade crochet gifts that bring joy to your friends and loved ones.',
    cover: '/images/blog-3.jpg',
    date: 'Aug 15, 2024',
    readTime: '4 min read',
    content: [
      'There is something deeply meaningful about receiving a gift crafted by hand. Every loop and stitch carries time, dedication, and affection that store-bought items simply cannot replicate.',
      'If you are looking for thoughtful presents for birthdays, housewarmings, bridal showers, or the holidays, consider handmade crochet scrunchies, delicate hair bows, sunflower coasters, and textured cozy baskets filled with treats.',
      'Pair your finished pieces with rustic cotton ribbons, personalized handwritten care tags, and sustainable packaging to turn every crochet creation into an unforgettable keepsake.',
    ],
  },
  {
    slug: 'caring-for-your-handmade-crochet-items',
    title: 'Caring for Your Handmade Crochet Items',
    excerpt: 'Washing, drying, and storage techniques to keep your crochet treasures pristine.',
    cover: '/images/blog-4.jpg',
    date: 'Aug 5, 2024',
    readTime: '5 min read',
    content: [
      'Handmade crochet items are heirloom treasures designed to last for years with proper care and gentle handling.',
      'Always wash delicate handmade pieces by hand in lukewarm water with a pH-neutral, no-rinse wool soak. Avoid harsh agitation or twisting, which can pull delicate fibers or disrupt your stitch pattern.',
      'After washing, roll the item inside a clean, dry terry towel and press down gently to remove excess water. Lay flat on a blocking mat or fresh towel, reshape to original dimensions, and allow to air-dry away from direct sunlight.',
    ],
  },
]

function loadPosts(): BlogPost[] {
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem('thr_adm_posts')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch (e) {
      // ignore
    }
  }
  return defaultPosts
}

export const posts: BlogPost[] = loadPosts()