import React from "react";

// mterial-ui components
import Button from "../CustomButtons/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {VisibilityOff} from "@material-ui/icons";

export default function CommonActionsCourse({ course, handleUpdate, handleRemove, handleVisible }) {
    const id = course._id
    return (
        <div id={id} >
            <Button
                justIcon
                color="transparent"
                aria-label="ocultar"
                onClick={() => handleVisible(id, course.visibility)}
            >
                {course.visibility ? <VisibilityIcon /> : <VisibilityOff />}
            </Button>

            <Button
                justIcon
                color="transparent"
                onClick={() => handleUpdate(course)}
            >
                <EditIcon />
            </Button>

            <Button
                justIcon
                color="transparent"
                onClick={() => handleRemove(id)}
            >
                <DeleteIcon />
            </Button>
        </div>
    );
}

CommonActionsCourse.propTypes = {};
