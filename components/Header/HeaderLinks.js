/*eslint-disable*/
import React, {useEffect} from "react";
import {useRouter} from 'next/router'

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import {BorderColor, Class, ExitToApp, PeopleAlt, PictureAsPdf, PlaylistPlay, Settings} from "@material-ui/icons";
import AccountCircle from "@material-ui/icons/AccountCircle";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "styles/jss/nextjs-material-kit/components/headerLinksStyle.js";

import {signOut, useSession} from 'next-auth/client'
import axios from "axios";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
    const classes = useStyles();
    const router = useRouter()
    const [session] = useSession()
    const isAdmin = session?.isAdmin
    let isAuthor = false

    const handleClick = (e, path) => {
        e.preventDefault()
        router.push(path)
    }

    useEffect(async () => {
        if (!isAdmin) {
            await axios.get('/api/request')
                .then((response) => isAuthor = response.data.status === 1)
        }
    }, [])

    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <Button
                    className={classes.navLink}
                    onClick={(e) => handleClick(e, '/profile')}
                    color="transparent"
                >
                    <AccountCircle className={classes.icons}/> Perfil
                </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
                <CustomDropdown
                    noLiPadding
                    navDropdown
                    buttonText="Configurações"
                    buttonProps={{
                        className: classes.navLink,
                        color: "transparent"
                    }}
                    buttonIcon={Settings}
                    dropdownList={[
                        isAdmin && (
                            <ListItem className={classes.listItem}>
                                <Button
                                    onClick={(e) => handleClick(e, '/users')}
                                    color="transparent"
                                    target="_blank"
                                    className={classes.navLink}
                                >
                                    <PeopleAlt className={classes.icons}/> Usuários
                                </Button>
                            </ListItem>),
                        (isAdmin || isAuthor) && (
                        <ListItem className={classes.listItem}>
                            <Button
                                onClick={(e) => handleClick(e, '/classes')}
                                color="transparent"
                                target="_blank"
                                className={classes.navLink}
                            >
                                <Class className={classes.icons}/> Aulas
                            </Button>
                        </ListItem>),
                        <ListItem className={classes.listItem}>
                            <Button
                                onClick={(e) => handleClick(e, '/courses')}
                                color="transparent"
                                target="_blank"
                                className={classes.navLink}
                            >
                                <PlaylistPlay className={classes.icons}/> Cursos
                            </Button>
                        </ListItem>,
                        <ListItem className={classes.listItem}>
                            <Button
                                onClick={(e) => handleClick(e, '/author')}
                                color="transparent"
                                target="_blank"
                                className={classes.navLink}
                            >
                                <BorderColor className={classes.icons}/> Autores
                            </Button>
                        </ListItem>,
                        isAdmin &&
                        (<ListItem className={classes.listItem}>
                            <Button
                                href="#"
                                color="transparent"
                                target="_blank"
                                className={classes.navLink}
                            >
                                <PictureAsPdf className={classes.icons}/> Relatórios
                            </Button>
                        </ListItem>),
                        <ListItem className={classes.listItem}>
                            <Button
                                color="transparent"
                                target="_blank"
                                className={classes.navLink}
                                onClick={(e) => {
                                    e.preventDefault()
                                    signOut()
                                }}
                            >
                                <ExitToApp className={classes.icons}/> Sair
                            </Button>
                        </ListItem>,
                    ]}
                />
            </ListItem>
        </List>
    );
}
