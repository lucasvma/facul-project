import { serialize } from 'next-mdx-remote/serialize'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import CustomLink from 'components/CustomLink/CustomLink'
import Layout from 'components/Layout/Layout'
import {connectToDatabase} from "../api/db/mongodb";

const components = {
    a: CustomLink,
    TestComponent: dynamic(() => import('components/TestComponent/TestComponent')),
    Head,
}

export default function ClassPage({ source, frontMatter }) {
    const content = serialize(source, { components })
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
    return {
        props: {
            source: params.slug,
            frontMatter: false,
        },
    }
}

export const getStaticPaths = async () => {
    const { db } = await connectToDatabase();
    const collection = db.collection('classes')
    const grades = await collection.find().toArray()

    const paths = grades.map(grade => ({
        params: { id: String(grade._id) }
    }))

    return {
        paths,
        fallback: false
    }
}
