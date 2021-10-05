import Link from "next/link";
import Layout from "../Layout/Layout";
import React from "react";

export default function ListCourses(props) {
    if (props.courses === undefined) {
        return <p>Nenhum curso cadastrado.</p>
    }

    return (
        <Layout>
            <ul>
                {props.courses.map((course) => (
                    <li key={course._id !== undefined ? course._id : ''}>
                        <Link
                            as={`/course/${course._id !== undefined ? course._id : ''}`}
                            href={`/course/[slug]`}
                        >
                            <a>{course.title !== undefined ? course.title : ''}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </Layout>
    )
}
