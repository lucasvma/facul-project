import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../styles/jss/nextjs-material-kit/pages/componentsSections/navbarsStyle";
import {Avatar, Link, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import CommonActionsCourse from "../CommonActionsCourse/CommonActionsCourse";

const useStyles = makeStyles(styles);

export default function ListCourses(props) {
    const classes = useStyles();

    const handleUpdate = async (data) => {
        props.setData(data)
    }

    const handleRemove = async (id) => {
        await axios
            .delete(`/api/course/${id}`)
            .then(() => props.handleCourses())
    }

    const handleVisible = async (id, visibility) => {
        await axios
            .patch(`/api/course/visibility/${id}`, {visibility})
            .then(() => props.handleCourses())
    }

    return (
        <Grid item xs={12} md={12}>
            <List className={classes.list}>
                {props.courses.map((course) => (
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt="Course Image" src="public/img/faces/kendall.jpg"/>
                        </ListItemAvatar>

                        <ListItemText
                            primary={
                                <Link
                                    href={`/course/${course._id}`}
                                    className={classes.navLink}
                                    color="transparent"
                                >
                                    {course.title}
                                </Link>
                            }
                            secondary=""
                            key={course._id}
                            className={classes.listItem}
                        />

                        <CommonActionsCourse course={course} handleUpdate={handleUpdate} handleRemove={handleRemove}
                                             handleVisible={handleVisible} handleCourses={props.handleCourses}/>
                    </ListItem>
                ))}
            </List>
        </Grid>
    )
}
