import Link from "next/link";
import Layout from "../Layout";
import React from "react";

export default function ListClasses(props) {
    return (
        <Layout>
            <ul>
                {props.classes.map((grade) => (
                    <li key={grade._id !== undefined ? grade._id : ''}>
                        <Link
                            as={`/classes/${grade._id !== undefined ? grade._id : ''}`}
                            href={`/classes/[slug]`}
                        >
                            <a>{grade.title !== undefined ? grade.title : ''}</a>
                        </Link>
                    </li>
                ))}
            </ul>
            {/*<ReactMarkdown># Hello, *world*!</ReactMarkdown>*/}
        </Layout>
    )
}
