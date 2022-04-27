import React, {useEffect, useState} from "react";
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";

import styles from "styles/jss/nextjs-material-kit/pages/components.js";
import {MongoClient} from "mongodb";
import axios from "axios";
import Header from "../components/Header/Header";
import HeaderLinks from "../components/Header/HeaderLinks";
import Parallax from "../components/Parallax/Parallax";
import Footer from "../components/Footer/Footer";
import Home from "../components/Home/Home";
import {useSession} from 'next-auth/client'
import Router from "next/router";

const useStyles = makeStyles(styles);

export default function Components(props) {
    const classes = useStyles();
    const {...rest} = props;

    const [grade, setGrades] = useState([])
    const [session] = useSession()

    console.log('session loggedIn', session)

    useEffect(() => {
        if (!session) return Router.push('/login')
    }, [])

    useEffect(() => {
        handleClasses()
    }, [])

    async function handleClasses() {
        await axios
            .get('/api/classes/', {
                params: {
                    order: 'desc'
                }
            })
            .then((response) => setGrades(response.data.classes))
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
                <>
                    <div
                        className={classes.container}
                        style={{
                            padding: '40px 0'
                        }}
                    >
                        <Home classes={grade}/>
                    </div>
                </>
            </div>
            <Footer/>
        </>
    );
}

export const getStaticProps = async () => {
    const uri = process.env.MONGODB_URI
    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const db = client.db('share-info')
    const collection = db.collection('classes')
    const grade = await collection.find().toArray()

    return {
        props: {
            classes: JSON.parse(JSON.stringify(grade))
        },
    }
}
