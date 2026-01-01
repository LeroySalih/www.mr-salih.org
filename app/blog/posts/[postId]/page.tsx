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
import Link from 'next/link'

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
    // If the markdown file was accidentally wrapped in a code-fence (e.g. ```markdown ... ```)
    // strip the outer fence so gray-matter can parse YAML frontmatter correctly.
    const fenceRe = /^`{3,}[^\n]*\n([\s\S]*?)\n`{3,}\s*$/
    const fenceMatch = raw.match(fenceRe)
    const contentToParse = fenceMatch ? fenceMatch[1] : raw
    const parsed = matter(contentToParse)
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
    const createdDate = parsed.data?.date ?? parsed.data?.created ?? null

    return (
      <main>
        <nav aria-label="Breadcrumb" className="mb-4 text-sm" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
          <ol className="flex items-center space-x-42 text-gray-600 font-sans">
            <li>
              <Link href="/" className="hover:underline">Home</Link>
            </li>
            <li className="text-gray-400 ml-4"> &gt; </li>
            <li>
              <Link href="/blog" className="hover:underline">Blog</Link>
            </li>
            <li className="text-gray-400 ml-4"> &gt; </li>
            <li aria-current="page" className="text-gray-900">{title}</li>
          </ol>
        </nav>

        <article className="prose">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
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
