import Link from "next/link";


type PostItem = { id: string; title: string; date?: string | null; author?: string | null; tags?: string[] }

export default function PostsList({ posts }: { posts: PostItem[] }) {
  return (
    <ul className="p4">
      {posts.map(p => (
        <li key={p.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-4">
          <Link 
            className="text-4xl font-sans text-blue-600 hover:underline"
            href={`/blog/posts/${p.id}`}>{p.title}</Link>
          <div style={{ fontSize: '0.9em', color: '#555' }}>
            {p.date ? <span>{new Date(p.date).toLocaleDateString()}</span> : null}
            {p.author ? <span> — {p.author}</span> : null}
            {p.tags && p.tags.length > 0 ? (
              <span> • {p.tags.join(', ')}</span>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  )
}
