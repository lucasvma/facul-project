import Layout from "../Layout/Layout";
import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../styles/jss/nextjs-material-kit/pages/componentsSections/navbarsStyle";
import {Link} from "@material-ui/core";
import Button from "../CustomButtons/Button";
import axios from "axios";

const useStyles = makeStyles(styles);

export default function ListClasses(props) {
    const classes = useStyles();

    async function handleUpdateClass(id) {
        props.setModal(true)
    }

    async function handleRemoveClass(id) {
        await axios
            .delete(`/api/class/${id}`)
            .then(() => props.handleClasses)
    }

    return (
        <Layout>
            <ul>
                {props.classes.map((grade) => (
                    <li>
                        <div key={grade._id !== undefined ? grade._id : ''} className={classes.listItem}>
                            <Link
                                href={`/class/${grade._id !== undefined ? grade._id : ''}`}
                                className={classes.navLink}
                                color="transparent"
                            >
                                {grade.title !== undefined ? grade.title : ''}
                            </Link>
                        </div>
                        <div className={classes.listItem} id={grade._id}>
                            <Button
                                justIcon
                                color="transparent"
                                onClick={(e) => handleRemoveClass(grade._id)}
                            >
                                <VisibilityIcon />
                            </Button>
                            <Button
                                justIcon
                                color="transparent"
                                onClick={(e) => handleUpdateClass(grade._id)}
                            >
                                <EditIcon />
                            </Button>
                            <Button
                                justIcon
                                color="transparent"
                                onClick={(e) => handleRemoveClass(grade._id)}
                            >
                                <DeleteIcon />
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </Layout>
    )
}
