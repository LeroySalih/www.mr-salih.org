export default function PostsList({ posts }: { posts: { id: string; title: string }[] }) {
  return (
    <ul>
      {posts.map(p => (
        <li key={p.id}>
          <a href={`/blog/posts/${p.id}`}>{p.title}</a>
        </li>
      ))}
    </ul>
  )
}
