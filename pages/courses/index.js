import React, {useEffect, useState} from "react";
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "styles/jss/nextjs-material-kit/pages/profilePage.js";

import Button from "../../components/CustomButtons/Button";
import ListCourses from "../../components/ListCourses/ListCourses";
import {useSession} from "next-auth/client";
import axios from "axios";
import ModalCourse from "../../components/ModalCourse/ModalCourse";

const useStyles = makeStyles(styles);

export default function CoursesPage(props) {
    const classes = useStyles();
    const {...rest} = props;
    const imageCourses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    )

    const [modalEdit, setModalEdit] = useState(false)
    const [modalAssociation, setModalAssociation] = useState(false)
    const [courses, setCourses] = useState([])
    const [data, setData] = useState(null)
    const [session] = useSession()
    const [isAuthor, setIsAuthor] = useState(false)
    const [isAdmin, setIsAdmin] = useState(session?.isAdmin)

    useEffect(() => {
        handleCourses() && handleIsAuthor()
    }, [])

    useEffect(() => {
        if (data != null) {
            setModalEdit(true)
        }
    }, [data])

    useEffect(async () => {
        setIsAdmin(session?.isAdmin)
        if (isAdmin) {
            handleCourses() && handleIsAuthor()
        }
    }, [session])

    async function handleCourses() {
        await axios
            .get('/api/courses')
            .then((response) => setCourses(response.data.courses))
    }

    async function handleIsAuthor() {
        !isAdmin && await axios
                        .get('/api/request')
                        .then((response) => setIsAuthor(response?.data?.request?.status === 1))
    }

    return (
        <>
            <Header
                color="transparent"
                brand="Share Info"
                rightLinks={<HeaderLinks/>}
                fixed
                changeColorOnScroll={{
                    height: 200,
                    color: "white"
                }}
                {...rest}
            />
            <Parallax small filter responsive image="/img/landing-bg.jpg"/>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>
                                <div className={classes.profile}>
                                    {session &&
                                        <>
                                            <img src={session?.user?.image} alt="..." className={imageCourses}/>
                                        </>
                                    }
                                    <div className={classes.name}>
                                        <h3 className={classes.title}>Cadastro do Curso</h3>
                                    </div>

                                    <>
                                        <Button color="primary" round onClick={() => setModalEdit(true)}>
                                                Novo Curso
                                            </Button>

                                            <ModalCourse modalEdit={modalEdit} setModalEdit={setModalEdit}
                                                handleCourses={handleCourses} classes={classes} dataToChange={data} />

                                    </>
                                </div>
                            </GridItem>
                        </GridContainer>

                        <ListCourses setModalEdit={setModalEdit} handleCourses={handleCourses} courses={courses}
                                     setData={setData} />
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export function getStaticProps() {
    return {props: {courses: ''}}
}
