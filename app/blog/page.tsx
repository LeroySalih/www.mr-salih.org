
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import PageHeader from '@/app/ui/page-header';

const POSTS_DIR = path.join(process.cwd(), 'app', 'blog', 'posts')

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

import PostsList from './PostsList'

export default async function Page() {
    const posts = await getPosts()
    return (
        <main>
            <PageHeader title="Blog Posts" subtitle="Thoughts on teaching, technology, and learning." />
            <div>
                <PostsList posts={posts} />
            </div>
        </main>
    )
}