import Link from "next/link";

type PostItem = { id: string; title: string; date?: string | null; description?: string | null; author?: string | null; tags?: string[] }

export default function PostsList({ posts }: { posts: PostItem[] }) {
  return (
    <div>
      {posts.map(p => (
        <article key={p.id} className="border-b pb-4 mb-6">
          <Link
            className="text-2xl font-semibold text-slate-800 hover:text-green-700"
            href={`/blog/posts/${p.id}`}>{p.title}</Link>
          <div className="text-sm text-slate-500 mt-1">
            {p.date ? <span>{new Date(p.date).toLocaleDateString()}</span> : null}
            {p.author ? <span> — {p.author}</span> : null}
            {p.tags && p.tags.length > 0 ? (
              <span className="ml-2 inline-block">
                {p.tags.map(tag => (
                  <span key={tag} className="inline-block bg-slate-100 rounded-full px-2 py-0.5 text-xs font-medium text-slate-600 mr-1">
                    {tag}
                  </span>
                ))}
              </span>
            ) : null}
          </div>
          {p.description && (
            <p className="mt-2 text-sm text-slate-600">{p.description}</p>
          )}
        </article>
      ))}
    </div>
  )
}
