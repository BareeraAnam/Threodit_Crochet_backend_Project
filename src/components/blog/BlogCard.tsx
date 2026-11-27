import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { BlogPost } from '../../types'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group flex flex-col rounded-card border border-line bg-surface p-3.5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-4">
      <Link
        to={`/blog/${post.slug}`}
        className="flex h-full flex-col rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark focus-visible:ring-offset-2"
        aria-label={`Read article: ${post.title}`}
      >
        {/* Compact Proportional Feature Image */}
        <div className="relative aspect-[16/10] max-h-[180px] w-full overflow-hidden rounded-md bg-[#F4EFE6] sm:max-h-[210px] sm:rounded-lg">
          <img
            src={post.cover}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Content Area */}
        <div className="flex flex-1 flex-col pt-3 sm:pt-3.5">
          <h3 className="font-heading text-base font-semibold leading-snug text-heading transition-colors group-hover:text-primary-dark sm:text-lg">
            {post.title}
          </h3>

          <time
            dateTime={post.date}
            className="mt-1.5 text-xs font-normal text-muted"
          >
            {post.date}
          </time>

          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-primary-dark sm:text-sm">
            <span>Read More</span>
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </article>
  )
}
