import { products } from '../data/products'
import HeroBanner from '../components/home/HeroBanner'
import FeatureStrip from '../components/home/FeatureStrip'
import SectionHeading from '../components/ui/SectionHeading'
import ProductCard from '../components/product/ProductCard'
import CategoriesSection from '../components/home/CategoriesSection'
import AboutSection from '../components/about/AboutSection'
import BlogSection from '../components/home/BlogSection'
import ContactSection from '../components/contact/ContactSection'

const featuredProducts = products.filter((p) => p.featured).slice(0, 4)

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Feature Strip */}
      <FeatureStrip />

      {/* 3. Featured Products (Shop Preview) */}
      <section
        aria-label="Featured products"
        className="page-container py-12 md:py-16"
      >
        <SectionHeading
          title="Featured Products"
          actionLabel="View All"
          actionTo="/shop"
        />

        <div className="grid grid-cols-1 gap-4 min-[360px]:grid-cols-2 md:grid-cols-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Categories Section (6 tiles + Promo Banner) */}
      <CategoriesSection />

      {/* 5. About Section (Our Story / Crafted with Passion + 3 Values) */}
      <AboutSection />

      {/* 6. Blog Section (Our Blog + 4 Editorial Article Cards) */}
      <BlogSection />

      {/* 7. Contact Section (Contact Us + Form + Map) */}
      <ContactSection />
    </>
  )
}