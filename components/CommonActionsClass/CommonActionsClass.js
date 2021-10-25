import React from "react";

// mterial-ui components
import Button from "../CustomButtons/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {VisibilityOff} from "@material-ui/icons";

export default function CommonActionsClass({ grade, handleUpdate, handleRemove, handleVisible }) {
    const id = grade._id
    return (
        <div id={id} >
            <Button
                justIcon
                color="transparent"
                aria-label="ocultar"
                onClick={() => handleVisible(id, grade.visibility)}
            >
                {grade.visibility ? <VisibilityIcon /> : <VisibilityOff />}
            </Button>

            <Button
                justIcon
                color="transparent"
                onClick={() => handleUpdate(grade)}
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

CommonActionsClass.propTypes = {};
