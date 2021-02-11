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
                            as={`/class/${grade._id !== undefined ? grade._id : ''}`}
                            href={`/class/[slug]`}
                        >
                            <a>{grade.title !== undefined ? grade.title : ''}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </Layout>
    )
}
