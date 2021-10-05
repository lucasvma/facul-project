import React, { useState } from "react";

<<<<<<< HEAD
import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";
import Parallax from "../../components/Parallax/Parallax";
import classNames from "classnames";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Footer from "../../components/Footer/Footer";
import ListClass from "../../components/ListClass/ListClass";
=======
import Header from "components/Header/Header";
import HeaderLinks from "components/Header/HeaderLinks";
import Parallax from "components/Parallax/Parallax";
import classNames from "classnames";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Footer from "components/Footer/Footer";
import ListClass from "components/ListClass/ListClass";
>>>>>>> master
import {MongoClient, ObjectId} from "mongodb";

import styles from "styles/jss/nextjs-material-kit/pages/profilePage.js";
import {makeStyles} from "@material-ui/core/styles";
import {dbHandler} from "../api/db/db";
import {TextareaAutosize} from "@material-ui/core";
<<<<<<< HEAD
import Button from "../../components/CustomButtons/Button";
=======
import Button from "components/CustomButtons/Button";
>>>>>>> master

const useStyles = makeStyles(styles);

export default function ClassPage({ grade }) {
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
<<<<<<< HEAD
            <Parallax small filter responsive image="/img/landing-bg.jpg">
=======
            <Parallax small filter responsive image="img/landing-bg.jpg">
>>>>>>> master
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

                        <ListClass title={grade[0].title} description={grade[0].description} />

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
<<<<<<< HEAD
    const uri = process.env.MONGODB_URI

=======
>>>>>>> master
    const db = await dbHandler()
    const collection = db.collection('classes')
    const grades = await collection.find().toArray()

    const paths = []

    JSON.parse(JSON.stringify(grades)).forEach(grade => paths.push({ params: { id: grade._id }}))

    return {
        fallback: false,
        paths
    }
}
