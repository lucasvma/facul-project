import React from "react";

// mterial-ui components
import Button from "../CustomButtons/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export default function CommonActions({ grade, handleUpdate, handleRemove, handleVisible }) {
    const id = grade._id
    return (
        <div id={id} >
            <Button
                justIcon
                color="transparent"
                onClick={() => handleVisible(id)}
            >
                <VisibilityIcon />
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

CommonActions.propTypes = {};
