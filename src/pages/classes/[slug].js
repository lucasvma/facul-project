import fs from 'fs'
import matter from 'gray-matter'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import path from 'path'
import CustomLink from '../../components/CustomLink'
import Layout from '../../components/Layout'
import { classFilePaths, CLASSES_PATH } from '../../utils/mdxUtils'

const components = {
    a: CustomLink,
    TestComponent: dynamic(() => import('../../components/TestComponent')),
    Head,
}

export default function ClassPage({ source, frontMatter }) {
    const content = hydrate(source, { components })
    return (
        <Layout>
            <header>
                <nav>
                    <Link href="/classes">
                        <a>Aulas</a>
                    </Link>
                </nav>
            </header>
            <div className="class-header">
                <h1>{frontMatter.title}</h1>
                {frontMatter.description && (
                    <p className="description">{frontMatter.description}</p>
                )}
            </div>
            <main>{content}</main>

            <style jsx>{`
        .class-header h1 {
          margin-bottom: 0;
        }
        .class-header {
          margin-bottom: 2rem;
        }
        .description {
          opacity: 0.6;
        }
      `}</style>
        </Layout>
    )
}

export const getStaticProps = async ({ params }) => {
    const classFilePath = path.join(CLASSES_PATH, `${params.slug}.mdx`)
    const source = fs.readFileSync(classFilePath)

    const { content, data } = matter(source)

    const mdxSource = await renderToString(content, {
        components,
        // Optionally pass remark/rehype plugins
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
        },
        scope: data,
    })

    return {
        props: {
            source: mdxSource,
            frontMatter: data,
        },
    }
}

export const getStaticPaths = async () => {
    const paths = classFilePaths
        // Remove file extensions for page paths
        .map((path) => path.replace(/\.mdx?$/, ''))
        // Map the path into the static paths object required by Next.js
        .map((slug) => ({ params: { slug } }))

    return {
        paths,
        fallback: false,
    }
}
