import React, {useState} from "react";

import Header from "components/Header/Header";
import HeaderLinks from "components/Header/HeaderLinks";
import Parallax from "components/Parallax/Parallax";
import classNames from "classnames";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Footer from "components/Footer/Footer";
import ListClass from "components/ListClass/ListClass";
import {ObjectId} from "mongodb";

import styles from "styles/jss/nextjs-material-kit/pages/profilePage.js";
import {makeStyles} from "@material-ui/core/styles";
import {connectToDatabase} from "../api/db/mongodb";

const useStyles = makeStyles(styles);

export default function ClassPage({grade}) {
    const classes = useStyles()
    const [comment, setComment] = useState(false)

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

                    <ListClass courseClasses={grade}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export const getStaticProps = async ({params}) => {
    const {db} = await connectToDatabase();
    const collection = db.collection('classes')
    const grade = await collection.find({_id: ObjectId(params.id)}).toArray()

    return {
        props: {
            grades: JSON.parse(JSON.stringify(grade))
        },
    }
}

export async function getStaticPaths() {
    const {db} = await connectToDatabase();
    const collection = db.collection('classes')
    const grades = await collection.find().toArray()

    const paths = []

    JSON.parse(JSON.stringify(grades)).forEach(grade => paths.push({params: {id: grade._id}}))

    return {
        fallback: false,
        paths
    }
}
