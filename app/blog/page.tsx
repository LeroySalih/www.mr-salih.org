
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import PageHeader from '@/app/ui/page-header';


const POSTS_DIR = path.join(process.cwd(), 'app', 'blog', 'posts')
function parseFrontmatterTitle(content: string): string | null {
    const { data } = matter(content)
    return data.title || null
}

type PostInfo = { id: string; title: string }

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
                const title = parseFrontmatterTitle(content)
                posts.push({ id: dir, title: title ?? dir })
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
            <PageHeader title="Blog Posts" />
            <PostsList posts={posts} />
        </main>
    )
}