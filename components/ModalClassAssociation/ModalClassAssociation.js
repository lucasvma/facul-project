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
import Remove from '@material-ui/icons/Remove';
import CustomInput from "../CustomInput/CustomInput";
import GridItem from "../Grid/GridItem";
import Input from "@material-ui/core/Input";
import classNames from "classnames";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
})

export default function ModalClassAssociation(props) {
    const [classes, setClasses] = useState([]);
    const [classTitles, setClassTitles] = useState([]);
    const [classInput, setClassInput] = useState("");
    const [enter, setEnter] = useState(false);

    const closeModal = () => {
        props.handleCloseModalClass()
        props.handleCourses()
    }

    const handleDisassociate = async (classTitle) => {
        const actualClasses = classes.map((grade) => classTitle !== grade.title && grade).filter((grade) => grade)
        const actualClassesIds = actualClasses.map((grade) => grade._id)
        const actualClassesTitles = actualClasses.map((grade) => grade.title)
        await axios
            .patch(`/api/course/associate/${props.course._id}`, { classes: actualClassesIds })
            .then(() => setClassTitles(actualClassesTitles))
    }

    useEffect(async () => {
        await axios
            .get(`/api/course/classes/${props.course._id}`)
            .then((response) => setClasses(response.data.filteredClasses))
    }, [])

    useEffect(() => {
        if (classes?.length > 0) {
            setClassTitles(classes.map((grade) => grade.title).filter((classTitle) => classTitle))
        }
    }, [classes])

    useEffect(async () => {
        if (classInput !== "" && enter) {
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
                                const classTitlesUpdated = classes.map((grade) => grade.title).filter((classTitle) => classTitle)

                                await axios
                                    .patch(`/api/course/associate/${props.course._id}`, { classes: classIds })
                                    .then(() => {
                                        setClassTitles(classTitlesUpdated)
                                        setClassInput("")
                                        setEnter(false)
                                    })
                            })
                    }
                })
        }
    }, [enter])

    const customList = (items) => (
        <Paper fullWidth={true}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value}-label`;

                    return (
                        <ListItem
                            key={value}
                            role="listitem"
                        >
                            <ListItemText id={labelId} primary={value}/>
                            <ListItemIcon>
                                <Button
                                    justIcon
                                    color="transparent"
                                    onClick={() => handleDisassociate(value)}
                                >
                                    <Remove />
                                </Button>
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
                    Associe as aulas ao: <strong>{props.course.title}</strong>
                </h4>
            </DialogTitle>
            <DialogContent
                id="modal-slide-description"
                className={props.classes.modalBody}
            >
                <Grid container justifyContent="center" alignItems="center">
                    <GridItem item style={{padding: 0}}>
                        <Input
                            placeholder="Título da Nova Aula"
                            fullWidth={true}
                            id="input-new-class"
                            value={classInput}
                            onKeyPress={(e) => e.key === 'Enter' && setEnter(true)}
                            onChange={(e) =>  setClassInput(e.target.value)}
                            style={{marginBottom: "4%"}}
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
