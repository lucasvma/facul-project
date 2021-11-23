import React, {useEffect} from "react";
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";

import styles from "styles/jss/nextjs-material-kit/pages/components.js";
import Header from "../components/Header/Header";
import HeaderLinks from "../components/Header/HeaderLinks";
import Parallax from "../components/Parallax/Parallax";
import Footer from "../components/Footer/Footer";
import {useSession} from 'next-auth/client'
import Router from "next/router";
import Users from "../components/Users/Users";
import axios from "axios";

const useStyles = makeStyles(styles);

export default function Components(props) {
    const classes = useStyles();
    const {...rest} = props;

    const [session] = useSession()
    const [users, setUsers] = React.useState([]);
    const isAdmin = session?.user.email === 'venturaml21@gmail.com'

    // if (!isAdmin) return Router.push('/home')

    useEffect(async () => {
        // if (!session) return Router.push('/login')

        await axios.get('/api/users')
            .then((response) => setUsers(response.data.users))
    }, [])

    if (!session) return null

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
                        <Users users={users} />
                    </div>
                </>
            </div>
            <Footer/>
        </>
    );
}

