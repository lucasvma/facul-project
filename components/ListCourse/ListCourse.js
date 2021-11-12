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
import GridItem from "../Grid/GridItem";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../styles/jss/nextjs-material-kit/pages/componentsSections/pillsStyle";

const useStyles = makeStyles(styles);

export default function ListCourse({ courseId }) {
    const classes = useStyles();
    const router = useRouter()
    const [grades, setGrades] = useState([])

    useEffect(async () => {
        // await axios
        //     .get(`/api/course/classes/${courseId}`)
        //     .then((courseClasses) => setGrades(courseClasses))
        // console.log('grades', grades)
        setGrades([
            {
                _id: '6168b615b207f270f9530b23',
                title: 'imagem',
                description: '![teste](https://miro.medium.com/max/640/0*i1v1In2Tn4Stnwnl.jpg)',
                publicClass: null,
                createdAt: '2021-10-14T22:58:29.703Z',
                updateAt: '2021-10-20T02:25:19.847Z',
                visibility: true
            },
            {
                _id: '616e1bc2686d9c1d59c2e101',
                title: 'um dois tres',
                description: 'testando um dois',
                publicClass: null,
                createdAt: '2021-10-19T01:13:38.203Z',
                updateAt: '2021-10-20T02:28:27.402Z',
                visibility: true
            }
        ])
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
            .patch(`/api/class/visibility/${id}`, { visibility })
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
                                            <KeyboardBackspaceIcon />
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
                                            {'grade.visibility' ? <VisibilityIcon /> : <VisibilityOff />}
                                        </Button>
                                        <Button
                                            justIcon
                                            color="primary"
                                            // onClick={() => handleUpdate(grade)}
                                        >
                                            <EditIcon />
                                        </Button>
                                        <Button
                                            justIcon
                                            color="primary"
                                            // onClick={() => handleRemove(grade.id)}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </ListItem>
                                }
                            />

                            <GridItem xs={12} sm={12} md={12} lg={6}>
                                {grades.length === 0 && <h2>'Não há aulas disponíveis nesse curso'</h2>}
                                {grades.length > 0 &&
                                    <NavPills
                                        color="primary"
                                        horizontal={{
                                            tabsGrid: { xs: 12, sm: 4, md: 4 },
                                            contentGrid: { xs: 12, sm: 8, md: 8 },
                                        }}
                                        tabs={grades.map((grade) => ({
                                                    tabButton: grade.title,
                                                    tabContent: (
                                                        <span>
                                                        <h2>{grade.title}</h2>
                                                        <br />
                                                        <p>{grade.description}</p>
                                                        </span>
                                                    )
                                                }
                                            ))
                                        }
                                    />}
                            </GridItem>
                        </GridContainer>
                </div>
            </div>
        </div>
    )
}
