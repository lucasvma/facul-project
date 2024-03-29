import React, {useEffect, useState} from "react";
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import axios from 'axios';

import styles from "styles/jss/nextjs-material-kit/pages/profilePage.js";

import ModalCourseCreate from "../../components/ModalCourseCreate/ModalCourseCreate";
import ListCourses from "../../components/ListCourses/ListCourses";
import {useSession} from "next-auth/client";

const useStyles = makeStyles(styles);

export default function CoursePage(props) {
    const classes = useStyles();
    const {...rest} = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    )

    const [modal, setModal] = useState(false)
    const [course, setCourse] = useState([])
    const [session] = useSession()

    useEffect(() => {
        handleCourses()
    }, [])

    async function handleCourses() {
        await axios
            .get('/api/courses')
            .then((response) => setCourse(response.data.courses))
    }

    return (
        <div>
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
                            <GridItem xs={12} sm={12} md={6} style={{ paddingBottom: "40px" }}>
                                <div className={classes.profile}>
                                    {session &&
                                        <>
                                            <img src={session?.user?.image} alt="..." className={imageClasses}/>
                                        </>
                                    }
                                    <div className={classes.name}>
                                        <h3 className={classes.title}>Cadastro do Curso</h3>
                                    </div>

                                    <div>
                                        <Button color="primary" round onClick={() => setModal(true)}>
                                            Novo Curso
                                        </Button>

                                        <ModalCourseCreate modal={modal} setModal={setModal} listClasses={handleCourses}
                                                           classes={classes}/>
                                    </div>
                                </div>
                            </GridItem>
                        </GridContainer>

                        <ListCourses courses={course}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export function getStaticProps() {
    return {props: {courses: ''}}
}
