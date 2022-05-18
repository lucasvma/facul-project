import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../styles/jss/nextjs-material-kit/pages/componentsSections/navbarsStyle";
import { Link, List, ListItem, ListItemText } from "@material-ui/core";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import CommonActionsCourse from "../CommonActionsCourse/CommonActionsCourse";
import {Chart, ArcElement} from 'chart.js'
import ProgressChart from "../ProgressChart/ProgressChart";
import Small from "../Typography/Small";
Chart.register(ArcElement);

const useStyles = makeStyles(styles);

export default function ListCourses(props) {
    const classes = useStyles();
    const [orders, setOrders] = useState([]);

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

    const courseHasBeenPaidOrItsFree = (course) => {
        if (course.isPaid) {
            return orders.some(order => order.courseId === course._id && order.paymentStatus === 'APPROVED');
        }
        return true;
    }

    useEffect(async () => {
        await axios
            .get('/api/orders')
            .then((response) => setOrders(response.data.orders))
    }, [])

    return (
        <Grid item xs={12} md={12}>
            <List className={classes.list}>
                {props?.courses && props.courses.map((course) => (
                    <ListItem>
                        {/*<ProgressChart courseId={course._id} classesCourseLength={course?.classes?.length} />*/}

                        <ListItemText
                            primary={
                                <Link
                                    href={courseHasBeenPaidOrItsFree(course) ? `/course/${course._id}` : '#'}
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

                        <CommonActionsCourse course={course} handleRemove={handleRemove} handleVisible={handleVisible}
                                             handleCourses={props.handleCourses} />
                    </ListItem>
                ))}
            </List>
        </Grid>
    )
}
