import React, {useEffect, useState} from "react";
import classNames from "classnames";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import url from 'url'

import styles from "src/assets/jss/nextjs-material-kit/pages/components.js";
import Layout from "../components/Layout";
import { MongoClient } from "mongodb";
import axios from "axios";
import Header from "../components/Header/Header";
import HeaderLinks from "../components/Header/HeaderLinks";
import Parallax from "../components/Parallax/Parallax";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import profile from "../assets/img/apple-icon.png";
import Button from "../components/CustomButtons/Button";
import Modal from "../components/Modal";
import ListClasses from "../components/ListClasses";
import Footer from "../components/Footer/Footer";
import Home from "../components/Home";

const useStyles = makeStyles(styles);

export default function Components(props) {
    const classes = useStyles();
    const { ...rest } = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    )

    const [modal, setModal] = useState(false)
    const [grade, setGrades] = useState([])

    useEffect(() => {
        handleClasses()
    }, [])

    async function handleClasses() {
        const response = await axios
            .get('/api/classes')
            .then((response) => response)

        if (response) {
            setGrades(response.data.classes)
        }
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
                {...rest}
            />
            <Parallax small filter image={require("src/assets/img/profile-bg.jpg")} />
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div>
                        <div className={classes.container}>
                            <Home classes={grade} />
                        </div>
                    </div>
                </div>
            <Footer />
        </div>
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
