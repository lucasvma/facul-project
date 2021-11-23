import React, {useEffect, useState} from "react";
import EditIcon from '@material-ui/icons/Edit';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Button from "../CustomButtons/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import {CircularProgress, ListItem} from "@material-ui/core";
import Header from "../Header/Header";

import axios from "axios";
import {useRouter} from "next/router";
import {VisibilityOff} from "@material-ui/icons";
import GridContainer from "../Grid/GridContainer";
import NavPills from "../NavPills/NavPills";
import GridItem from "../Grid/GridItem";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../styles/jss/nextjs-material-kit/pages/componentsSections/pillsStyle";
import ReactMarkdown from 'react-markdown'

const useStyles = makeStyles(styles);

export default function ListCourse({courseClasses}) {
    const classes = useStyles();
    const router = useRouter()
    const [activeClass, setActiveClass] = useState(0);
    const courseId = router.query.id
    const [loadingRequest, setLoadingRequest] = useState(false)

    useEffect(async () => {
        setLoadingRequest(true)
        await axios.get(`/api/course/progress/${courseId}`)
            .then((response) => {
                if (response.data.classCourseProgress !== undefined) {
                    setActiveClass(response.data.classCourseProgress[0].currentProgress)
                    setLoadingRequest(false)
                }
            })
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

    const renderers = {
        image: ({alt, src, title}) => (
            <img
                alt={alt}
                src={src}
                title={title}
                style={{ maxWidth: 475 }}  />
        ),
    };

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

                        {loadingRequest ? (
                            <GridItem xs={12} sm={12} md={12} lg={6}>
                                <CircularProgress/>
                            </GridItem>
                        ) : (
                            <GridItem xs={12} sm={12} md={12} lg={6}>
                                {courseClasses.length === 0 && <h2>'Não há aulas disponíveis nesse curso'</h2>}
                                {courseClasses.length > 0 &&
                                <NavPills
                                    color="primary"
                                    horizontal={{
                                        tabsGrid: {xs: 12, sm: 4, md: 4},
                                        contentGrid: {xs: 12, sm: 8, md: 8},
                                    }}
                                    id={activeClass}
                                    active={activeClass}
                                    setActiveClass={setActiveClass}
                                    courseId={courseId}
                                    tabs={courseClasses.map((grade) => ({
                                            tabButton: grade.title,
                                            tabContent: (
                                                <>
                                                    <>
                                                        <h2>{grade.title}</h2>
                                                    </>
                                                    <>
                                                        <ReactMarkdown
                                                            children="![dsates](https://images-na.ssl-images-amazon.com/images/I/814D8NdbX+L.png)"
                                                            escapeHtml={false}
                                                            renderers={renderers}
                                                        />
                                                    </>
                                                </>
                                            )
                                        }
                                    ))}
                                />
                                }
                            </GridItem>
                        )
                        }
                    </GridContainer>
                </div>
            </div>
        </div>
    )
}
