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
import ListCourse from "../../components/ListCourse/ListCourse";

const useStyles = makeStyles(styles);

export default function CoursePage({ courseClasses }) {
    const classes = useStyles()

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

                    <ListCourse courseClasses={courseClasses} />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export async function getStaticProps({ params }) {
    let courseClasses = [
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
    ]

    try {
        // axios.defaults.baseURL = 'http://localhost:3000'

        // courseClasses = await axios
        //     .get(`/api/course/classes/${params.id}`)

        return {
            props: {
                // courseClasses: JSON.stringify(courseClasses.data.filteredClasses)
                courseClasses
            }
        }
    } catch (e) {
        console.log('error', e)
        return []
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
