import React, {useEffect, useState} from "react";
import {List, ListItem} from "@material-ui/core";

import axios from "axios";
import {useRouter} from "next/router";
import GridContainer from "../Grid/GridContainer";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../styles/jss/nextjs-material-kit/pages/componentsSections/pillsStyle";

const useStyles = makeStyles(styles);

export default function RequestAuthor({ clientId }) {
    const classes = useStyles();
    const router = useRouter()

    console.log('clientId', clientId)

    useEffect(async () => {
        const classes = await axios
            .get(`/api/course/classes/615f9421b4d4246fd9cc5aec`)
    }, [])

    const handleUpdate = async (data) => {
        console.log('handleUpdate')
    }

    const handleRemove = async (id) => {
        await axios
            .delete(`/api/class/${id}`)
            .then(() => router.push("/home"))
    }

    const handleVisible = async (id, visibility) => {
        await axios
            .patch(`/api/class/visibility/${id}`, { visibility })
            .then(() => props.handleClasses())
    }

    return (
        <div className={classes.section}>
            <div className={classes.container}>
                <div id="navigation-pills">
                    <GridContainer justify="center">
                        <List className={classes.list}>
                            <ListItem className={classes.listItem}>
                                <b>Status:</b> Em Análise
                            </ListItem>
                        </List>
                    </GridContainer>
                </div>
            </div>
        </div>
    )
}
