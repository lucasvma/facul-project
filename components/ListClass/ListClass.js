import Layout from "../Layout/Layout";
import React from "react";
import ReactMarkdown from 'react-markdown'
import EditIcon from '@material-ui/icons/Edit';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Button from "../CustomButtons/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import {List, ListItem} from "@material-ui/core";
import Header from "../Header/Header";

import axios from "axios";
import {useRouter} from "next/router";
import {VisibilityOff} from "@material-ui/icons";

export default function ListClass({ grade }) {
    const router = useRouter()

    const handleUpdate = async (data) => {
        console.log('handleUpdate')
        props.setData(data)
    }

    const handleRemove = async (id) => {
        await axios
            .delete(`/api/class/${id}`)
            .then(() => router.push("/login"))
    }

    const handleVisible = async (id, visibility) => {
        await axios
            .patch(`/api/class/visibility/${id}`, { visibility })
            .then(() => props.handleClasses())
    }

    return (
        <Layout>
            <List>
                <Header
                    color="transparent"
                    leftLinks={
                        <ListItem>
                            <Button
                                justIcon
                                href="/classes"
                                color="primary"
                            >
                                <KeyboardBackspaceIcon />
                            </Button>
                        </ListItem>
                    }
                    rightLinks={
                        <ListItem>
                            <Button
                                justIcon
                                color="primary"
                                onClick={() => handleVisible(grade.id, grade.visibility)}
                            >
                                {grade.visibility ? <VisibilityIcon /> : <VisibilityOff />}
                            </Button>
                            <Button
                                justIcon
                                color="primary"
                                onClick={() => handleUpdate(grade)}
                            >
                                <EditIcon />
                            </Button>
                            <Button
                                justIcon
                                color="primary"
                                onClick={() => handleRemove(grade.id)}
                            >
                                <DeleteIcon />
                            </Button>
                        </ListItem>
                    }
                />

                <ListItem
                    style={{
                        justifyContent: "center",
                        alignItems: "flex-center",
                        textAlign: "center"
                    }}
                >
                    <h2>{grade.title}</h2>
                </ListItem>

                <ListItem
                    style={{
                        justifyContent: "center",
                        alignItems: "flex-center",
                        textAlign: "center"
                    }}
                >
                    <ReactMarkdown>{grade.description}</ReactMarkdown>
                </ListItem>
            </List>
        </Layout>
    )
}
