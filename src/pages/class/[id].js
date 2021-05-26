import React from "react";

import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";
import Parallax from "../../components/Parallax/Parallax";
import classNames from "classnames";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Footer from "../../components/Footer/Footer";
import ListClass from "../../components/ListClass";
import {MongoClient, ObjectId} from "mongodb";

import styles from "src/assets/jss/nextjs-material-kit/pages/profilePage.js";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

export default function ClassPage({ grade }) {
    const classes = useStyles();

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
            <Parallax small filter image={require("src/assets/img/profile-bg.jpg")} />
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>
                                <div className={classes.profile}>
                                    <div className={classes.name}>
                                        <h3 className={classes.title}></h3>
                                    </div>
                                </div>
                            </GridItem>
                        </GridContainer>

                        <ListClass title={grade[0].title} description={grade[0].description} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export const getStaticProps = async ({ params }) => {
    const uri = process.env.MONGODB_URI
    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const db = client.db('share-info')
    const collection = db.collection('classes')
    const grade = await collection.find(ObjectId(params.id)).toArray()

    return {
        props: {
            grade: JSON.parse(JSON.stringify(grade))
        },
    }
}

export async function getStaticPaths() {
    const uri = process.env.MONGODB_URI
    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const db = client.db('share-info')
    const collection = db.collection('classes')
    const grades = await collection.find().toArray()

    const paths = []

    JSON.parse(JSON.stringify(grades)).forEach(grade => paths.push({ params: { id: grade._id }}))

    return {
        fallback: false,
        paths
    }
}
