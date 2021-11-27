import React, {useState} from "react";

// mterial-ui components
import Button from "../CustomButtons/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {ListAlt, VisibilityOff} from "@material-ui/icons";
import ModalAssociation from "../ModalAssociation/ModalAssociation";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../styles/jss/nextjs-material-kit/pages/profilePage";
import {useSession} from "next-auth/client";

const useStyles = makeStyles(styles);

export default function CommonActionsCourse({course, handleUpdate, handleRemove, handleVisible, handleCourses}) {
    const [modal, setModal] = useState(false)
    const classes = useStyles();
    const id = course._id
    const [session] = useSession()
    const isAdmin = session?.isAdmin
    const isOwner = session?.user?.email === course?.createBy

    return (isAdmin || isOwner) && (
        <div id={id}>
            <Button
                justIcon
                color="transparent"
                aria-label="associar aulas"
                onClick={() => setModal(true)}
            >
                {<ListAlt/>}
            </Button>

            <Button
                justIcon
                color="transparent"
                aria-label="ocultar"
                onClick={() => handleVisible(id, course.visibility)}
            >
                {course.visibility ? <VisibilityIcon/> : <VisibilityOff/>}
            </Button>

            <Button
                justIcon
                color="transparent"
                onClick={() => handleUpdate(course)}
            >
                <EditIcon/>
            </Button>

            <Button
                justIcon
                color="transparent"
                onClick={() => handleRemove(id)}
            >
                <DeleteIcon/>
            </Button>

            {modal &&
            <ModalAssociation modal={modal} setModal={setModal} handleCourses={handleCourses} classes={classes}
                              course={course}/>}
        </div>
    );
}

CommonActionsCourse.propTypes = {};
