import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeAutolink from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'

const POSTS_DIR = path.join(process.cwd(), 'app', 'blog', 'posts')

export default async function Page({ params }: { params: { postId: string } | Promise<{ postId: string }> }) {
  const resolvedParams = await params
  const { postId } = resolvedParams || {}
  if (!postId || typeof postId !== 'string') {
    return (
      <main>
        <h1>Not found</h1>
        <p>Missing post id.</p>
      </main>
    )
  }

  const mdPath = path.join(POSTS_DIR, postId, 'page.md')
  try {
    const raw = await fs.readFile(mdPath, 'utf8')
    const parsed = matter(raw)
    const processed = await unified()
      .use(remarkParse as any)
      .use(remarkGfm as any)
      .use(remarkRehype as any, { allowDangerousHtml: true })
      .use(rehypeRaw as any)
      .use(rehypeSlug as any)
      .use(rehypeAutolink as any, { behavior: 'wrap' })
      .use(rehypeStringify as any)
      .process(parsed.content)
    const html = String(processed)
    const title = parsed.data?.title ?? postId

    return (
      <main>
        <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      </main>
    )
  } catch (e) {
    return (
      <main>
        <h1>Not found</h1>
        <p>Post `{postId}` not found.</p>
      </main>
    )
  }
}
