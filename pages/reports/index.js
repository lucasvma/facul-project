import React, {useEffect, useState} from "react";
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "styles/jss/nextjs-material-kit/pages/profilePage.js";

import axios from "axios";
import {useSession} from "next-auth/client";

const useStyles = makeStyles(styles);

export default function ClassesPage(props) {
    const classes = useStyles();
    const {...rest} = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    )
    const [courseProgress, setCourseProgress] = useState([])
    const [session, loading] = useSession()
    const email = session?.user.email

    useEffect(async () => {
        if (loading) {
            return null
        }
        console.log('getting by reportsIndex')
        await axios.get('/api/course/progress')
            .then((response) => setCourseProgress(response.data?.courseProgress))
    }, [loading])

    useEffect(() => {
        console.log('courseProgress', courseProgress)
    }, [courseProgress])

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
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>
                                <div className={classes.profile}>
                                    {session &&
                                        <>
                                            <img src={session?.user?.image} alt="..." className={imageClasses}/>
                                        </>
                                    }

                                    <>
                                        <div className={classes.name}>
                                            <h3 className={classes.title}>Relatório de progresso</h3>
                                        </div>

                                        <>
                                            <p>
                                                Um autor pode criar e publicar novos conteúdos para o público.
                                            </p>
                                        </>
                                    </>
                                </div>
                            </GridItem>
                        </GridContainer>
                    </div>
                </>
            </div>
            <Footer/>
        </>
    );
}
