/*eslint-disable*/
import React from "react";
import { useRouter } from 'next/router'

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { Apps, CloudDownload, Class, ExitToApp, PeopleAlt, PictureAsPdf, PlaylistPlay, Settings } from "@material-ui/icons";
import AccountCircle from "@material-ui/icons/AccountCircle";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "styles/jss/nextjs-material-kit/components/headerLinksStyle.js";

import { signOut } from 'next-auth/client'

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
    const classes = useStyles();
    const router = useRouter()

    const handleClickCourses = (e) => {
        e.preventDefault()
        router.push('/courses')
    }

    const handleClickClasses = (e) => {
        e.preventDefault()
        router.push('/classes')
    }

    const handleClickProfile = (e) => {
        e.preventDefault()
        router.push('/profile')
    }

    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <Button
                    className={classes.navLink}
                    onClick={handleClickProfile}
                    color="transparent"
                >
                    <AccountCircle className={classes.icons} /> Perfil
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
                        <ListItem className={classes.listItem}>
                            <Button
                                href="#"
                                color="transparent"
                                target="_blank"
                                className={classes.navLink}
                            >
                                <PeopleAlt className={classes.icons} /> Usuários
                            </Button>
                        </ListItem>,
                        <ListItem className={classes.listItem}>
                            <Button
                                onClick={handleClickClasses}
                                color="transparent"
                                target="_blank"
                                className={classes.navLink}
                            >
                                <Class className={classes.icons} /> Aulas
                            </Button>
                        </ListItem>,
                        <ListItem className={classes.listItem}>
                            <Button
                                onClick={handleClickCourses}
                                color="transparent"
                                target="_blank"
                                className={classes.navLink}
                            >
                                <PlaylistPlay className={classes.icons} /> Cursos
                            </Button>
                        </ListItem>,
                        <ListItem className={classes.listItem}>
                            <Button
                                href="#"
                                color="transparent"
                                target="_blank"
                                className={classes.navLink}
                            >
                                <PictureAsPdf className={classes.icons} /> Relatórios
                            </Button>
                        </ListItem>,
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
                                <ExitToApp className={classes.icons} /> Sair
                            </Button>
                        </ListItem>,
                    ]}
                />
            </ListItem>
        </List>
    );
}
