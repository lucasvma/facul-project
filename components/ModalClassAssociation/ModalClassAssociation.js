import * as React from 'react';
import {Dialog, DialogActions, DialogContent} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {forwardRef, useEffect, useState} from "react";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import CustomInput from "../CustomInput/CustomInput";
import GridItem from "../Grid/GridItem";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
})

export default function ModalClassAssociation(props) {
    const [classes, setClasses] = useState([]);
    const [classTitles, setClassTitles] = useState([]);
    const [classInput, setClassInput] = useState("");

    const closeModal = () => {
        props.handleCloseModalClass()
        props.handleCourses()
    }

    useEffect(async () => {
        await axios
            .get(`/api/course/classes/${props.course._id}`)
            .then((response) => setClasses(response.data.filteredClasses))
    }, [])

    useEffect(() => {
        if (classes?.length > 0) {
            setClassTitles(classes
                            .map((grade) => props.course.classes.includes(grade._id) && grade.title)
                            .filter((classTitle) => classTitle))
        }
    }, [classes])

    useEffect(async() => {
        if (classInput !== "") {
            await axios.post('/api/classes',{ title: classInput, description: "", publicAccess: false })
                .then(async (response) => {
                    const insertedId = response.data?.insertedId
                    if (insertedId) {
                        await axios.get(`/api/class/${insertedId}`)
                            .then(async (response) => {
                                const classInserted = response.data.returnedClass
                                const updatedClassObject = classes
                                updatedClassObject.push(classInserted)
                                setClasses(updatedClassObject)

                                const classIds = classes.map((grade) => grade._id).filter((classId) => classId)
                                const classTitle = classes.map((grade) => grade.title).filter((classTitle) => classTitle)

                                await axios
                                    .patch(`/api/course/associate/${props.course._id}`, { classes: classIds })
                                    .then(() => setClassTitles(classTitle) && setClassInput(""))
                            })
                    }
                })
        }
    }, [classInput])

    const customList = (items) => (
        <Paper fullWidth={true}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value}-label`;

                    return (
                        <ListItem
                            key={value}
                            role="listitem"
                            button
                        >
                            <ListItemText id={labelId} primary={value}/>
                            <ListItemIcon>
                                <DeleteIcon/>
                            </ListItemIcon>
                        </ListItem>
                    );
                })}
                <ListItem/>
            </List>
        </Paper>
    );

    return (
        <Dialog
            classes={{
                root: props.classes.center,
                paper: props.classes.modal
            }}
            open={props.modalClass}
            TransitionComponent={Transition}
            keepMounted
            fullWidth={true}
            onClose={() => props.handleCloseModalClass()}
            aria-labelledby="modal-slide-title"
            aria-describedby="modal-slide-description"
        >
            <DialogTitle
                id="classic-modal-slide-title"
                disableTypography
                className={props.classes.modalHeader}
            >
                <IconButton
                    className={props.classes.modalCloseButton}
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={() => closeModal()}
                >
                    <Close className={props.classes.modalClose}/>
                </IconButton>
                <h4 className={props.classes.modalTitle}>
                    Associe aulas ao curso
                </h4>
            </DialogTitle>
            <DialogContent
                id="modal-slide-description"
                className={props.classes.modalBody}
            >
                <Grid container justifyContent="center" alignItems="center">
                    <GridItem item>
                        <CustomInput
                            labelText="Título da Nova Aula"
                            id="input-new-class"
                            formControlProps={{
                                fullWidth: true,
                            }}
                            value={classInput}
                            onKeyPress={(e) => e.key === 'Enter' && setClassInput(e.target.value)}
                        />
                    </GridItem>
                    <Grid item xs={12}>{customList(classTitles)}</Grid>
                </Grid>
            </DialogContent>
            <DialogActions className={props.classes.modalFooter + " " + props.classes.modalFooterCenter}>
                <Button onClick={() => props.handleCloseModalClass()} color="danger">Fechar</Button>
            </DialogActions>
        </Dialog>
    );
}
