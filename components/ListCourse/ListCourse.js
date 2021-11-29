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
    const classes = useStyles();
    const router = useRouter()
    // TODO FIX - 0 useState modifying the database but it can't
    const [activeClass, setActiveClass] = useState(0);
    const courseId = router.query.id
    const [loadingRequest, setLoadingRequest] = useState(false)
    const [isLastClass, setIsLastClass] = useState(false)

    useEffect(async () => {
        setLoadingRequest(true)
        await axios.get(`/api/course/progress/${courseId}`)
            .then(async (response) => {
                if (response.data?.classCourseProgress?.currentProgress) {
                    setActiveClass(response.data.classCourseProgress.currentProgress)
                    setIsLastClass(checkIfIsLastClass())
                } else {
                    await newProgress()
                }
                setLoadingRequest(false)
            })
    }, [])

    useEffect(async () => {
        setIsLastClass(checkIfIsLastClass())
    }, [activeClass])

    async function newProgress() {
        await axios.post(`/api/course/progress/${courseId}`)
            .then(() => console.log('Novo progresso iniciado'))
    }

    function checkIfIsLastClass() {
        return activeClass + 1 === courseClasses.length
    }

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

    const completeCourse = async () => {
        await axios
            .put(`/api/course/progress/${courseId}`, { currentProgress: activeClass, isComplete: 1 })
            .then(() => console.log('Novo progresso iniciado'))
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
                                onClick={() => completeCourse()}
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
