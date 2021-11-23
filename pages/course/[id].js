import React from "react";

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
import {ObjectId} from "mongodb";

const useStyles = makeStyles(styles);

export default function CoursePage({courseClasses}) {
    const classes = useStyles()

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
            />
            <Parallax small filter responsive image="/img/landing-bg.jpg"/>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={6}>
                            <div className={classes.profile}>
                                <div className={classes.name}>
                                    <h3 className={classes.title}/>
                                </div>
                            </div>
                        </GridItem>
                    </GridContainer>

                    <ListCourse courseClasses={courseClasses}/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export const getStaticProps = async ({params}) => {
    const courseId = params.id
    const {db} = await connectToDatabase()
    // const email = session?.user.email
    const email = "venturaml21@gmail.com"

    const courseCollection = await db.collection("courses")
    const collectionClasses = await db.collection("classes")
    const courseProgressCollection = db.collection('courseProgress')

    const classesCourse = await courseCollection.findOne({
        _id: ObjectId(courseId),
    });
    const classes = await collectionClasses.find().toArray();

    const filteredClasses = await classes.filter((grade) =>
        classesCourse.classes.includes(grade._id.toString())
    )

    const classCourseProgress = await courseProgressCollection.findOne({
        courseId,
        email
    }, {currentProgress: 1, _id: 0})

    if (!classCourseProgress) {
        await courseProgressCollection.insertOne({
            courseId,
            email,
            currentProgress: 0,
            watchedClasses: [],
            createdAt: new Date()
        })
    }

    return {
        props: {
            courseClasses: JSON.parse(JSON.stringify(filteredClasses))
        }
    }
}

export async function getStaticPaths() {
    const {db} = await connectToDatabase();
    const collection = db.collection('courses')
    const courses = await collection.find().toArray()

    const paths = []

    JSON.parse(JSON.stringify(courses)).forEach(course => paths.push({params: {id: course._id}}))

    return {
        fallback: true,
        paths
    }
}
