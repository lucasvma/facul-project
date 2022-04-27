import React, {useEffect, useState} from "react";
import EditIcon from '@material-ui/icons/Edit';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Button from "../CustomButtons/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import {ListItem} from "@material-ui/core";
import Header from "../Header/Header";

import axios from "axios";
import {useRouter} from "next/router";
import {VisibilityOff} from "@material-ui/icons";
import GridContainer from "../Grid/GridContainer";
import NavPills from "../NavPills/NavPills";
import Schedule from "@material-ui/icons/Schedule";
import GridItem from "../Grid/GridItem";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../styles/jss/nextjs-material-kit/pages/componentsSections/pillsStyle";
import Dashboard from "@material-ui/icons/Dashboard";

const useStyles = makeStyles(styles);

export default function ListClass({courseClasses}) {
    const classes = useStyles();
    const router = useRouter()

    const [grades, setGrades] = useState(courseClasses)

    useEffect(async () => {
        const classes = await axios
            .get(`/api/course/classes/615f9421b4d4246fd9cc5aec`)
        setGrades(classes)
        console.log('grades', grades)
    }, [])

    const handleUpdate = async (data) => {
        console.log('handleUpdate')
        props.setData(data)
    }

    const handleRemove = async (id) => {
        await axios
            .delete(`/api/class/${id}`)
            .then(() => router.push("/home"))
    }

    const handleVisible = async (id, visibility) => {
        await axios
            .patch(`/api/class/visibility/${id}`, {visibility})
            .then(() => props.handleClasses())
    }

    return (
        <div className={classes.section}>
            <div className={classes.container}>
                <div id="navigation-pills">
                    <GridContainer justify="center">
                        <Header
                            color="transparent"
                            leftLinks={
                                <ListItem>
                                    <Button
                                        justIcon
                                        href="/classes"
                                        color="primary"
                                    >
                                        <KeyboardBackspaceIcon/>
                                    </Button>
                                </ListItem>
                            }
                            rightLinks={
                                <ListItem>
                                    <Button
                                        justIcon
                                        color="primary"
                                        // onClick={() => handleVisible(grade.id, grade.visibility)}
                                    >
                                        {'grade.visibility' ? <VisibilityIcon/> : <VisibilityOff/>}
                                    </Button>
                                    <Button
                                        justIcon
                                        color="primary"
                                        // onClick={() => handleUpdate(grade)}
                                    >
                                        <EditIcon/>
                                    </Button>
                                    <Button
                                        justIcon
                                        color="primary"
                                        // onClick={() => handleRemove(grade.id)}
                                    >
                                        <DeleteIcon/>
                                    </Button>
                                </ListItem>
                            }
                        />

                        <GridItem xs={12} sm={12} md={12} lg={6}>
                            <NavPills
                                color="rose"
                                horizontal={{
                                    tabsGrid: {xs: 12, sm: 4, md: 4},
                                    contentGrid: {xs: 12, sm: 8, md: 8},
                                }}
                                tabs={[
                                    {
                                        tabButton: "Dashboard",
                                        tabIcon: Dashboard,
                                        tabContent: (
                                            <span>
                                                <p>
                                                  Collaboratively administrate empowered markets via
                                                  plug-and-play networks. Dynamically procrastinate B2C
                                                  users after installed base benefits.
                                                </p>
                                               <br/>
                                               <p>
                                                 Dramatically visualize customer directed convergence
                                                 without revolutionary ROI. Collaboratively
                                                 administrate empowered markets via plug-and-play
                                                 networks. Dynamically procrastinate B2C users after
                                                 installed base benefits.
                                               </p>
                                               <br/>
                                               <p>
                                                 Dramatically visualize customer directed convergence
                                                 without revolutionary ROI. Collaboratively
                                                 administrate empowered markets via plug-and-play
                                                 networks. Dynamically procrastinate B2C users after
                                                 installed base benefits.
                                               </p>
                                             </span>
                                        ),
                                    },
                                    {
                                        tabButton: "Schedule",
                                        tabIcon: Schedule,
                                        tabContent: (
                                            <span>
                                               <p>
                                                 Efficiently unleash cross-media information without
                                                 cross-media value. Quickly maximize timely
                                                 deliverables for real-time schemas.
                                               </p>
                                                <br/>
                                                <p>
                                                  Dramatically maintain clicks-and-mortar solutions
                                                  without functional solutions. Dramatically visualize
                                                  customer directed convergence without revolutionary
                                                  ROI. Collaboratively administrate empowered markets
                                                  via plug-and-play networks. Dynamically procrastinate
                                                  B2C users after installed base benefits.
                                                </p>
                                              </span>
                                        ),
                                    },
                                ]}
                            />
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        </div>
    )
}
