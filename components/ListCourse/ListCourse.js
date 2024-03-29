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
import rehypeRaw from 'rehype-raw'
import Small from "../Typography/Small";
import ModalPerformingExam from "../ModalPerformingExam/ModalPerformingExam";
import SnackbarContent from "../Snackbar/SnackbarContent";
import Clearfix from "../Clearfix/Clearfix";

const useStyles = makeStyles(styles);

export default function ListCourse({ courseClasses, accessStatus }) {
    const classes = useStyles()
    const router = useRouter()
    const [activeClassIndex, setActiveClassIndex] = useState(undefined)
    const courseId = router.query.id
    const [loadingRequest, setLoadingRequest] = useState(false)
    const [isLastClass, setIsLastClass] = useState(false)
    const [endCourse, setEndCourse] = useState(false)
    const [hasEndButton, setHasEndButton] = useState(false)
    const [courseData, setCourseData] = useState(null)
    const [modalPerformingExam, setPerformingExam] = useState(false)
    const handleOpenModalPerformingExam = () => setPerformingExam(true);
    const handleCloseModalPerformingExam = () => setPerformingExam(false);
    const [toastState, setToastState] = useState(false);
    const [ableToFinish, setAbleToFinish] = useState(false);

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
                    setActiveClassIndex(courseProgress.currentProgress)
                } else if (activeClassIndex === undefined) {
                    setActiveClassIndex(0)
                }
                setLoadingRequest(false)
            })
        await axios.get(`/api/course/${courseId}`)
            .then((response) => setCourseData(response.data.course))
    }, [])

    useEffect(async () => {
        setIsLastClass(activeClassIndex + 1 === courseClasses.length)
    }, [activeClassIndex])

    useEffect(async () => {
        if (endCourse) {
            handleCloseModalPerformingExam();
            setToastState(true);
            await axios
                .put(`/api/course/progress/${courseId}`, { currentProgress: activeClassIndex, isComplete: 1 })
                .then(() => {
                    setTimeout(() => {
                        setToastState(false);
                        router.push('/courses');
                    }, 5000)
                })
        }
    }, [endCourse])

    const handleEndCourse = () => {
        if (courseData.hasEvaluation) {
            handleOpenModalPerformingExam()
        }
        // setEndCourse(true)
    }

    function handleYoutubeVideo(markDownText) {
        const lines = markDownText.split('\n');
        let markDownReturn = '';
        let videoId = '5qap5aO4i9A';

        lines.forEach((line) => {
            try {
                videoId = line.includes('youtu.be') ? line.split('youtu.be/')[1] : line.split('v=')[1]
                videoId = videoId.substring(0, 11)
            } catch(e) {
                videoId = '5qap5aO4i9A'
            }
            if (line.search('youtube') !== -1) {
                markDownReturn += `<iframe width="500" height="500" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  `;
            } else {
                markDownReturn += `${line}  \n`;
            }
        })
        return markDownReturn;
    }

    const isAbleToFinishCourse = () => {
        return !loadingRequest && isLastClass && courseData?.hasEndButton && ableToFinish;
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

    if (accessStatus === 'UNREALIZED') {
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
                                        <h2>
                                            <Small>Oppppss este é um curso pago.</Small>
                                            <Small>Por favor, realize o pagamento deste curso para ter acesso às aulas.</Small>
                                        </h2>
                                    </ListItem>
                                }
                            />
                        </GridContainer>
                    </div>
                </div>
            </div>
        )
    }

    if (accessStatus === 'PENDING') {
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
                                        <h2>
                                            <Small>Oppppss este é um curso pago.</Small>
                                            <Small>Seu pagamento já está em processamento e em breve será liberado seu acesso.</Small>
                                        </h2>
                                    </ListItem>
                                }
                            />
                        </GridContainer>
                    </div>
                </div>
            </div>
        )
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
                                        href="/courses"
                                        color="primary"
                                    >
                                        <KeyboardBackspaceIcon/>
                                    </Button>
                                    <div style={{marginLeft: '40%'}}>
                                        <h1>
                                            <Small>{courseData?.title}</Small>
                                        </h1>
                                    </div>
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
                                        id={activeClassIndex}
                                        active={activeClassIndex}
                                        setActiveClassIndex={setActiveClassIndex}
                                        setHasEndButton={setHasEndButton}
                                        setAbleToFinish={setAbleToFinish}
                                        courseClassesLength={courseClasses?.length}
                                        courseId={courseId}
                                        tabs={courseClasses.map((grade) => ({
                                                tabButton: grade.title,
                                                tabContent: (
                                                    <>
                                                        <>
                                                            <h2>
                                                                <Small>{grade.title}</Small>
                                                            </h2>
                                                        </>
                                                        <>
                                                            <ReactMarkdown
                                                                rehypePlugins={[rehypeRaw]}
                                                                children={
                                                                    handleYoutubeVideo(grade.description)
                                                                }
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

                    {modalPerformingExam
                        && <ModalPerformingExam modalPerformingExam={modalPerformingExam}
                                                handleCloseModalPerformingExam={handleCloseModalPerformingExam}
                                                classes={classes} courseId={courseId} setEndCourse={setEndCourse} />}

                    {isAbleToFinishCourse() &&
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

                <div>
                    {toastState
                        && <SnackbarContent
                            message={
                                <span>
                                    <b>PARABÉNS:</b> Você concluiu o curso com sucesso e atingiu a média do exame
                                </span>
                            }
                            open={false}
                            close
                            color="success"
                            icon={Check}
                        />}
                    <Clearfix/>
                </div>
            </div>
        </div>
    )
}
