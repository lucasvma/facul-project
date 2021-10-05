<<<<<<< HEAD
import hydrate from 'next-mdx-remote/hydrate'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import CustomLink from '../../components/CustomLink'
import Layout from '../../components/Layout/Layout'
import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";
import Parallax from "../../components/Parallax/Parallax";
import Footer from "../../components/Footer/Footer";
=======
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head'
import Link from 'next/link'
import CustomLink from 'components/CustomLink/CustomLink'
import Layout from 'components/Layout/Layout'
import Header from "components/Header/Header";
import HeaderLinks from "components/Header/HeaderLinks";
import Parallax from "components/Parallax/Parallax";
import Footer from "components/Footer/Footer";
>>>>>>> master
import React from "react";

import classNames from "classnames";

<<<<<<< HEAD
import styles from "jss/nextjs-material-kit/pages/components.js";
import makeStyles from "@material-ui/core/styles/makeStyles";

const components = {
    a: CustomLink,
    TestComponent: dynamic(() => import('../../components/TestComponent')),
=======
import styles from "styles/jss/nextjs-material-kit/pages/components.js";
import makeStyles from "@material-ui/core/styles/makeStyles";
import dynamic from "next/dynamic";
import {dbHandler} from "../api/db/db";

const components = {
    a: CustomLink,
    TestComponent: dynamic(() => import('components/TestComponent/TestComponent')),
>>>>>>> master
    Head,
}

function CourseDescription({ content, frontMatter }) {
    return (
        <Layout>
            <div>
                <nav>
                    <Link href="/courses">
                        <a>Cursos</a>
                    </Link>
                </nav>
            </div>
            <div className="ccourse-header">
                <h1>{frontMatter.title}</h1>
                {frontMatter.description && (
                    <p className="description">{frontMatter.description}</p>
                )}
            </div>
            <main>{content}</main>

            <style jsx>{`
        .ccourse-header h1 {
          margin-bottom: 0;
        }
        .ccourse-header {
          margin-bottom: 2rem;
        }
        .description {
          opacity: 0.6;
        }
      `}</style>
        </Layout>
    );
}

const useStyles = makeStyles(styles);

export default function CoursePage(props) {
<<<<<<< HEAD
    const content = hydrate(props.source, { components })
=======
    const content = serialize(props.source, { components })
>>>>>>> master
    const courses = useStyles();
    const { ...rest } = props;
    const imageCourses = classNames(
        courses.imgRaised,
        courses.imgRoundedCircle,
        courses.imgFluid
    );
    return (
        <div>
            <Header
                color="transparent"
                brand="Share Info"
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 200,
                    color: "white"
                }}
                {...rest}
            />
            <Parallax small filter responsive image="/img/landing-bg.jpg">
                <div className={classNames(courses.main, courses.mainRaised)}>
                    <div>
                        <div className={courses.container}>
                            <CourseDescription content={content} frontMatter={props.frontMatter} />
                        </div>
                    </div>
                </div>
            </Parallax>
            <Footer />
        </div>
    )
}

export const getStaticProps = async ({ params }) => {
    return {
        props: {
            source: 'mdxSource',
            frontMatter: false,
        },
    }
}

export const getStaticPaths = async () => {
<<<<<<< HEAD
    return {
        paths: [
            { params: { slug: 'slug-1'} },
            { params: { slug: 'slug-2'} }
        ],
        fallback: false,
=======
    const db = await dbHandler()
    const collection = db.collection('courses')
    const courses = await collection.find().toArray()

    const paths = courses.map(course => ({
        params: { id: String(course._id) }
    }))

    return {
        paths,
        fallback: false
>>>>>>> master
    }
}
