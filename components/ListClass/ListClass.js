import Layout from "../Layout/Layout";
import React from "react";
import ReactMarkdown from 'react-markdown'
import EditIcon from '@material-ui/icons/Edit';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Button from "../CustomButtons/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import {List, ListItem} from "@material-ui/core";

export default function ListClass({ title, description }) {
    return (
        <Layout>
            <List>
                <ListItem>
                    <Button
                        justIcon
                        href="/classes"
                        color="transparent"
                    >
                        <KeyboardBackspaceIcon />
                    </Button>
                </ListItem>
                <ListItem>
                    <h2>{title}</h2>
                </ListItem>
                <ListItem>
                    <Button
                        justIcon
                        color="transparent"
                        onClick={(e) => handleRemoveClass('id')}
                    >
                        <VisibilityIcon />
                    </Button>
                    <Button
                        justIcon
                        color="transparent"
                        onClick={(e) => handleUpdateClass('id')}
                    >
                        <EditIcon />
                    </Button>
                    <Button
                        justIcon
                        color="transparent"
                        onClick={(e) => handleRemoveClass('id')}
                    >
                        <DeleteIcon />
                    </Button>
                </ListItem>
            </List>
            <ListItem>
                <ReactMarkdown>{description}</ReactMarkdown>
            </ListItem>
        </Layout>
    )
}
