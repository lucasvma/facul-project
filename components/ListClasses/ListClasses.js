import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../styles/jss/nextjs-material-kit/pages/componentsSections/navbarsStyle";
import {List, Link, ListItem, ListItemAvatar, Avatar, ListItemText} from "@material-ui/core";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import CommonActions from "../CommonActions/CommonActions";

const useStyles = makeStyles(styles);

export default function ListClasses(props) {
    const classes = useStyles();

    const handleUpdate = async (data) => {
        props.setData(data)
        props.setModal(true)
    }

    const handleRemove = async (id) => {
        await axios
            .delete(`/api/class/${id}`)
            .then(() => props.handleClasses())
    }

    const handleVisible = async (id) => {
        console.log('Remove visibility of class for all readers')
    }

    return (
        <Grid item xs={12} md={12}>
            <List className={classes.list}>
                {props.classes.map((grade) => (
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt="Class Image" src="public/img/faces/kendall.jpg" />
                        </ListItemAvatar>

                        <ListItemText
                            primary={
                                <Link
                                    href={`/class/${grade._id !== undefined ? grade._id : ''}`}
                                    className={classes.navLink}
                                    color="transparent"
                                >
                                    {grade.title !== undefined ? grade.title : ''}
                                </Link>
                            }
                            secondary="Simple class description"
                            key={grade._id !== undefined ? grade._id : ''}
                            className={classes.listItem}
                        />

                        <CommonActions grade={grade} handleUpdate={handleUpdate} handleRemove={handleRemove} handleVisible={handleVisible} />
                    </ListItem>
                ))}
            </List>
        </Grid>
    )
}
