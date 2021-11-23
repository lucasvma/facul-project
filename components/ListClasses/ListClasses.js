import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../styles/jss/nextjs-material-kit/pages/componentsSections/navbarsStyle";
import {Avatar, Link, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import CommonActionsClass from "../CommonActionsClass/CommonActionsClass";

const useStyles = makeStyles(styles);

export default function ListClasses(props) {
    const classes = useStyles();

    const handleUpdate = async (data) => {
        console.log('handleUpdate')
        props.setData(data)
    }

    const handleRemove = async (id) => {
        await axios
            .delete(`/api/class/${id}`)
            .then(() => props.handleClasses())
    }

    const handleVisible = async (id, visibility) => {
        await axios
            .patch(`/api/class/visibility/${id}`, {visibility})
            .then(() => props.handleClasses())
    }

    return (
        <Grid item xs={12} md={12}>
            <List className={classes.list}>
                {props.classes.map((grade) => (
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt="Class Image" src="public/img/faces/kendall.jpg"/>
                        </ListItemAvatar>

                        <ListItemText
                            primary={
                                <Link
                                    href={`/class/${grade._id}`}
                                    className={classes.navLink}
                                    color="transparent"
                                >
                                    {grade.title || ''}
                                </Link>
                            }
                            secondary=""
                            key={grade._id}
                            className={classes.listItem}
                        />

                        <CommonActionsClass grade={grade} handleUpdate={handleUpdate} handleRemove={handleRemove}
                                            handleVisible={handleVisible}/>
                    </ListItem>
                ))}
            </List>
        </Grid>
    )
}
