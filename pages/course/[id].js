import React, { useState } from "react";

import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";
import Parallax from "../../components/Parallax/Parallax";
import classNames from "classnames";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Footer from "../../components/Footer/Footer";

import styles from "styles/jss/nextjs-material-kit/pages/profilePage.js";
import {makeStyles} from "@material-ui/core/styles";
import {connectToDatabase} from "../api/db/mongodb";
import ListCourse from "../../components/ListCourse/ListCourse";
import {ObjectID} from "bson-ext";
import {useRouter} from "next/router";
import {ObjectId} from "mongodb";
import axios from "axios";

const useStyles = makeStyles(styles);

export default function CoursePage() {
    const classes = useStyles()

    const router = useRouter();

    if (router.isFallback) {
        return (
            <>
                <h2>Loading</h2>
            </>
        )
    }

    return (
        <>
            <Header
                color="transparent"
                brand="Share Info"
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 200,
                    color: "white"
                }}
            />
            <Parallax small filter responsive image="/img/landing-bg.jpg" />
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={6}>
                            <div className={classes.profile}>
                                <div className={classes.name}>
                                    <h3 className={classes.title} />
                                </div>
                            </div>
                        </GridItem>
                    </GridContainer>

                    {/*<ListCourse courseClasses={courseClasses} />*/}
                </div>
            </div>
            <Footer />
        </>
    )
}

export function getServerSideProps({ params }) {
    console.log('params', params)
    return { props: { course: '' } }
}

