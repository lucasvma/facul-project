import React, { useState } from "react";

import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";
import Parallax from "../../components/Parallax/Parallax";
import classNames from "classnames";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Footer from "../../components/Footer/Footer";
import ListClass from "../../components/ListClass/ListClass";
import {MongoClient, ObjectId} from "mongodb";

import styles from "styles/jss/nextjs-material-kit/pages/profilePage.js";
import {makeStyles} from "@material-ui/core/styles";
import {connectToDatabase} from "../api/db/mongodb";
import {TextareaAutosize} from "@material-ui/core";
import Button from "../../components/CustomButtons/Button";
import axios from "axios";

const useStyles = makeStyles(styles);

export default function ClassPage({ course }) {
    const classes = useStyles()
    const [comment, setComment] = useState(false)

    function handleComment() {

    }

    return (
        <div>
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
            <Parallax small filter responsive image="/img/landing-bg.jpg">
                <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
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

                        <ListClass grade={course[0]} />

                        <GridItem xs={12}>
                            <TextareaAutosize
                                aria-label="minimum height"
                                rowsMin={5}
                                placeholder="Adicione um comentário"
                                style={{
                                    width: "80%",
                                    padding: "10px"
                                }}
                                onChange={(e) => setComment(e.target.value)}
                            />

                            <Button
                                color="primary"
                                round
                                onClick={handleComment()}
                                style={{
                                    justifyContent: "flex-end",
                                    alignItems: "flex-end"
                                }}
                            >
                                Comentar
                            </Button>
                        </GridItem>
                    </div>
                </div>
            </div>
            </Parallax>
            <Footer />
        </div>
    )
}

export async function getStaticProps({ params }) {
    const { db } = await connectToDatabase();

    const collection = db.collection('courses')
    const courseData = await collection.find(ObjectId(params.id)).toArray()

    const courseProgress = await fetch('http://localhost:3000/api/courseProgress')

    const course = {...courseData, ...courseProgress}

    return {
        props: {
            course: JSON.parse(JSON.stringify(course))
        }
    }
}

export async function getStaticPaths() {
    const { db } = await connectToDatabase();
    const collection = db.collection('courses')
    const courses = await collection.find().toArray()

    const paths = []

    JSON.parse(JSON.stringify(courses)).forEach(course => paths.push({ params: { id: course._id }}))

    return {
        fallback: false,
        paths
    }
}
