import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import { posts } from '../data/posts'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import BlogCard from '../components/blog/BlogCard'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="page-container py-12 md:py-16">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Blog', to: '/blog' },
            { label: 'Article Placeholder' },
          ]}
        />
        <div className="mt-8">
          <EmptyState
            title="Article Demo Placeholder"
            message="This article is currently a placeholder or has not yet been published in our frontend catalogue."
          >
            <Button variant="dark" to="/blog">
              Return to Blog
            </Button>
          </EmptyState>
        </div>
      </div>
    )
  }

  const relatedPosts = posts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <article className="page-container py-8 md:py-12">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Blog', to: '/blog' },
            { label: post.title },
          ]}
        />
      </div>

      {/* Article Header */}
      <header className="mx-auto max-w-3xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-dark">
          <Tag size={13} aria-hidden="true" />
          <span>Handmade Journal</span>
        </div>

        <h1 className="font-heading text-3xl font-semibold leading-tight text-heading sm:text-4xl md:text-5xl">
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted sm:text-sm">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={15} aria-hidden="true" />
            {post.date}
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={15} aria-hidden="true" />
            {post.readTime || '5 min read'}
          </span>
        </div>
      </header>

      {/* Featured Image */}
      <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-banner border border-line bg-surface shadow-soft">
        <div className="aspect-[16/9] w-full">
          <img
            src={post.cover}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Article Body */}
      <div className="prose mx-auto mt-10 max-w-3xl space-y-6 text-base leading-relaxed text-body sm:text-lg">
        {post.content ? (
          post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))
        ) : (
          <p>{post.excerpt}</p>
        )}

        <div className="mt-8 rounded-card border border-line bg-surface p-6 shadow-soft">
          <h2 className="font-heading text-xl font-semibold text-heading sm:text-2xl">
            Threodit Crafting Tip
          </h2>
          <p className="mt-2 text-sm text-body sm:text-base">
            Every stitch is an investment of patience and care. When working with natural fibers, maintain even tension and take brief breaks to stretch your hands and wrists. Happy crocheting!
          </p>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="mx-auto mt-12 max-w-3xl border-t border-line pt-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-dark hover:underline"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to all articles
        </Link>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section aria-label="Related articles" className="mt-16 border-t border-line pt-12">
          <h2 className="mb-8 font-heading text-2xl font-semibold text-heading sm:text-3xl">
            More from the Blog
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {relatedPosts.map((related) => (
              <BlogCard key={related.slug} post={related} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
