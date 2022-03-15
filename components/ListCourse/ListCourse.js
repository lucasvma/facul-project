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
import {Check, VisibilityOff} from "@material-ui/icons";
import GridContainer from "../Grid/GridContainer";
import NavPills from "../NavPills/NavPills";
import GridItem from "../Grid/GridItem";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../styles/jss/nextjs-material-kit/pages/componentsSections/pillsStyle";
import ReactMarkdown from 'react-markdown'

const useStyles = makeStyles(styles);

export default function ListCourse({ courseClasses }) {
    const classes = useStyles()
    const router = useRouter()
    // TODO FIX - 0 useState when starting modifying the database but it can't
    const [activeClass, setActiveClass] = useState(undefined)
    const courseId = router.query.id
    const [loadingRequest, setLoadingRequest] = useState(false)
    const [isLastClass, setIsLastClass] = useState(false)
    const [endCourse, setEndCourse] = useState(false)

    useEffect(async () => {
        setLoadingRequest(true)
        await axios.get(`/api/course/progress/${courseId}`)
            .then(async (response) => {
                const courseProgress = response.data?.classCourseProgress
                if (courseProgress?.currentProgress === null) {
                    await axios.post(`/api/course/progress/${courseId}`)
                        .then((response) => console.log('Novo progresso iniciado', response))
                        .catch((error) => console.log('error', error))
                } else if (courseProgress?.currentProgress !== undefined) {
                    setActiveClass(courseProgress.currentProgress)
                } else if (activeClass === undefined) {
                    setActiveClass(0)
                }
                setLoadingRequest(false)
            })
    }, [])

    useEffect(async () => {
        setIsLastClass(activeClass + 1 === courseClasses.length)
    }, [activeClass])

    useEffect(async () => {
        endCourse && await axios
                        .put(`/api/course/progress/${courseId}`, { currentProgress: activeClass, isComplete: 1 })
                        .then(() =>  router.push('/courses'))
    }, [endCourse])

    const handleEndCourse = () => {
        setEndCourse(true)
    }

    const handleUpdate = async (data) => {
        console.log('handleUpdate')
        // props.setData(data)
    }

    const handleRemove = async (id) => {
        // await axios
        //     .delete(`/api/class/${id}`)
        //     .then(() => router.push("/home"))
    }

    const handleVisible = async (id, visibility) => {
        // await axios
        //     .patch(`/api/class/visibility/${id}`, {visibility})
        //     .then(() => props.handleClasses())
    }

    const renderers = {
        image: ({alt, src, title}) => (
            <img
                alt={alt}
                src={src}
                title={title}
                style={{maxWidth: 475}}/>
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
                                        href="/courses"
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
                                {courseClasses?.length === 0 && <h2>'Não há aulas disponíveis nesse curso'</h2>}
                                {courseClasses?.length > 0 &&
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
                                                                children={grade.description}
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
                        )}
                    </GridContainer>

                    {!loadingRequest && isLastClass &&
                        (<div
                            style={{
                                textAlign: "right"
                            }}
                        >
                            <Button
                                color="primary"
                                round
                                onClick={() => handleEndCourse()}
                            >
                                Finalizar <Check />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
