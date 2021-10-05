import Layout from "../Layout/Layout";
import React from "react";
import ReactMarkdown from 'react-markdown'
import Link from "next/link";
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

export default function ListClass({ title, description }) {
    return (
        <Layout>
            <div>
                <nav>
                    <Link href="/classes">
                        <KeyboardBackspaceIcon />
                    </Link>
                </nav>
            </div>
            <nav>
                <h2>{title}</h2>

                <EditIcon />
                <CloseIcon />
            </nav>
            <ReactMarkdown>{description}</ReactMarkdown>
        </Layout>
    )
}
