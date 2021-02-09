/*eslint-disable*/
import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router'

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import {Class, PeopleAlt, PictureAsPdf, PlaylistPlay, Settings} from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

// core components
import CustomDropdown from "src/components/CustomDropdown/CustomDropdown.js";
import Button from "src/components/CustomButtons/Button.js";

import styles from "src/assets/jss/nextjs-material-kit/components/headerLinksStyle.js";
import Explore from "@material-ui/icons/Explore";
import AccountCircle from "@material-ui/icons/AccountCircle";

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

  return (
    <List className={classes.list}>
        <ListItem className={classes.listItem}>
            <Button
                href="#pablo"
                className={classes.navLink + " " + classes.navLinkActive}
                onClick={e => e.preventDefault()}
                color="transparent"
            >
                <Explore className={classes.icons} /> Explorar
            </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
            <Button
                href="/profile"
                className={classes.navLink}
                onClick={e => e.preventDefault()}
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
                ]}
            />
        </ListItem>
    </List>
  );
}
