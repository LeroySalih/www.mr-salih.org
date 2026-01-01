import PageHeader from "@/app/ui/page-header";
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import Link from "next/link";

const POSTS_DIR = path.join(process.cwd(), 'app', 'blog', 'posts');

type PostInfo = { id: string; title: string; date?: string | null; description?: string | null; author?: string | null; tags?: string[] }

async function getPosts(): Promise<PostInfo[]> {
    try {
        const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true })
        const dirs = entries.filter(e => e.isDirectory()).map(d => d.name)
        const posts: PostInfo[] = []
        for (const dir of dirs) {
            const mdPath = path.join(POSTS_DIR, dir, 'page.md')
            try {
                // check file exists and is readable
                await fs.access(mdPath)
                const content = await fs.readFile(mdPath, 'utf8')
                const parsed = matter(content)
                const title = parsed.data?.title ?? dir
                const date = parsed.data?.date ? String(parsed.data.date) : parsed.data?.created ? String(parsed.data.created) : null
                const description = parsed.data?.description ? String(parsed.data.description) : null;
                const author = parsed.data?.author ? String(parsed.data.author) : null
                const tags = Array.isArray(parsed.data?.tags) ? parsed.data.tags.map(String) : []
                posts.push({ id: dir, title, date, description, author, tags })
            } catch (e) {
                // skip dirs without a valid page.md
                continue
            }
        }
        return posts
    } catch (e) {
        return []
    }
}


export default async function Home() {
  const posts = await getPosts();
  const latestPosts = posts
    .sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 3);

  return (
    <div>
      <PageHeader title={"Welcome to Mr. Salih's Classroom"} subtitle={"Practical ideas, reflections, and EdTech guidance for teachers."} />

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Latest Posts</h2>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map(post => (
            <article key={post.id} className="p-4 border rounded-lg bg-white">
              <h3 className="text-lg font-semibold text-slate-800 hover:text-green-700">
                <Link href={`/blog/posts/${post.id}`}>{post.title}</Link>
              </h3>
              <p className="mt-2 text-sm text-slate-600">{post.description}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
