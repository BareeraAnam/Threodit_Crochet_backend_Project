import { posts } from '../../data/posts'
import BlogCard from '../blog/BlogCard'

interface BlogSectionProps {
  isPage?: boolean
}

export default function BlogSection({ isPage = false }: BlogSectionProps) {
  return (
    <div className={`page-container ${isPage ? 'py-8 md:py-14' : 'py-12 md:py-18'}`}>
      {/* Page Header */}
      <div className="mb-8 text-center md:mb-10">
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-heading sm:text-4xl md:text-5xl">
          Our Blog
        </h2>
        <p className="mt-2 text-sm text-muted sm:text-base md:mt-3">
          Tips, ideas and inspiration from the world of crochet
        </p>
      </div>

      {/* 4 Article cards in refined 2x2 desktop layout, centered with max-w-4xl */}
      <section aria-label="Blog articles" className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}
