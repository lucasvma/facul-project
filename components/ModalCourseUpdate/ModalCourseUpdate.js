import React, {useEffect, useState} from 'react';
// material-ui components
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "../../components/CustomButtons/Button.js";
import axios from "axios";
import GridItem from "../Grid/GridItem";
import {TextareaAutosize, TextField} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";
import Small from "../Typography/Small";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
})

export default function ModalCourseUpdate(props) {
    const classes = props.classes;
    const [oldData, setOldData] = useState(null);

    const [updateData, setUpdateData] = useState({
        title: '',
        initialDate: new Date(),
        finalDate: undefined,
        workLoad: false,
        hasWorkLoad: false,
        hasPresence: false,
        hasEvaluation: false,
        hasExercises: false,
        hasEndButton: false,
        description: '',
        classes: [],
        publicAccess: false
    });

    useEffect(async () => {
        await axios.get(`/api/course/${props.courseId}`)
            .then((response) => setOldData(response.data.course))
    }, []);

    useEffect(() => {
        if (oldData !== null) {
            setUpdateData(oldData);
        }
    }, [oldData]);

    function handleUpdateCourse() {
        if (oldData.title !== updateData.title || oldData.description !== updateData.description
            || oldData.initialDate !== updateData.initialDate || oldData.finalDate !== updateData.finalDate
            || oldData.workLoad !== updateData.workLoad || oldData.hasWorkLoad !== updateData.hasWorkLoad
            || oldData.hasPresence !== updateData.hasPresence || oldData.hasEvaluation !== updateData.hasEvaluation
            || oldData.hasExercises !== updateData.hasExercises || oldData.hasEndButton !== updateData.hasEndButton) {
            axios.put(`/api/course/${props.courseId}`, updateData)
                .then(() => console.log('Updated with success'))
                .catch(() => console.log('An error occurred trying to update the course'))
        }
        closeModal()
    }

    function closeModal() {
        props.handleCloseModalUpdate()
        props.handleCourses()
    }

    return (
        <Dialog
            classes={{
                root: props.classes.center,
                paper: props.classes.modal
            }}
            open={props.modalUpdate}
            TransitionComponent={Transition}
            keepMounted
            fullWidth={true}
            onClose={() => props.handleCloseModalUpdate()}
            aria-labelledby="modal-slide-title"
            aria-describedby="modal-slide-description"
        >
            <DialogTitle
                id="classic-modal-slide-title"
                disableTypography
                className={props.classes.modalHeader}
                style={{display: "flex", justifyContent: "space-between", paddingBottom: 0}}
            >
                <div className={props.classes.typo} style={{marginLeft: "3%"}}>
                    <h2 className={props.classes.modalTitle}>
                        <Small>Atualizar Curso</Small>
                    </h2>
                </div>
                <IconButton
                    className={props.classes.modalCloseButton}
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={() => closeModal()}
                >
                    <Close className={props.classes.modalClose}/>
                </IconButton>
            </DialogTitle>
            <DialogContent
                id="modal-slide-description"
                className={props.classes.modalBody}
            >
                <GridItem xs={12}>
                    <TextField
                        id="title"
                        label="Título do Curso"
                        value={updateData.title}
                        onChange={(e) => setUpdateData({...updateData, title: e.target.value})}
                        style={{
                            width: "100%",
                        }}
                    />
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                    <FormControl fullWidth>
                        <Datetime
                            value={updateData.initialDate}
                            onChange={(newInitialDate) => setUpdateData({...updateData, initialDate: newInitialDate})}
                            inputProps={{placeholder: "Data Inicial"}}
                        />
                        <Datetime
                            value={updateData.finalDate}
                            onChange={(newFinalDate) => setUpdateData({...updateData, finalDate: newFinalDate})}
                            inputProps={{placeholder: "Data Final"}}
                        />
                    </FormControl>
                </GridItem>

                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onClick={() => setUpdateData({...updateData, hasWorkLoad: !updateData.hasWorkLoad})}
                                checked={updateData.hasWorkLoad}
                                checkedIcon={<Check className={classes.checkedIcon}/>}
                                icon={<Check className={classes.uncheckedIcon}/>}
                                classes={{
                                    checked: classes.checked,
                                    root: classes.checkRoot,
                                }}
                                color="primary"
                            />
                        }
                        classes={{label: classes.label, root: classes.labelRoot}}
                        label="Possui carga horária?"
                    />
                    <TextField
                        id="outlined-number"
                        type="number"
                        value={updateData.workLoad}
                        disabled={!updateData.hasWorkLoad}
                        onChange={(e) => setUpdateData({...updateData, workLoad: e.target.value})}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </GridItem>

                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onClick={() => setUpdateData({...updateData, hasPresence: !updateData.hasPresence})}
                                checked={updateData.hasPresence}
                                checkedIcon={<Check className={classes.checkedIcon}/>}
                                icon={<Check className={classes.uncheckedIcon}/>}
                                classes={{
                                    checked: classes.checked,
                                    root: classes.checkRoot,
                                }}
                                color="primary"
                            />
                        }
                        classes={{label: classes.label, root: classes.labelRoot}}
                        label="Possui presença?"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                onClick={() => setUpdateData({...updateData, hasExercises: !updateData.hasExercises})}
                                checked={updateData.hasExercises}
                                checkedIcon={<Check className={classes.checkedIcon}/>}
                                icon={<Check className={classes.uncheckedIcon}/>}
                                classes={{
                                    checked: classes.checked,
                                    root: classes.checkRoot,
                                }}
                                color="primary"
                            />
                        }
                        classes={{label: classes.label, root: classes.labelRoot}}
                        label="Possui exercícios?"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                onClick={() => setUpdateData({...updateData, hasEvaluation: !updateData.hasEvaluation})}
                                checked={updateData.hasEvaluation}
                                checkedIcon={<Check className={classes.checkedIcon}/>}
                                icon={<Check className={classes.uncheckedIcon}/>}
                                classes={{
                                    checked: classes.checked,
                                    root: classes.checkRoot,
                                }}
                                color="primary"
                            />
                        }
                        classes={{label: classes.label, root: classes.labelRoot}}
                        label="Possui avaliação?"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                onClick={() => setUpdateData({...updateData, hasEndButton: !updateData.hasEndButton})}
                                checked={updateData.hasEndButton}
                                checkedIcon={<Check className={classes.checkedIcon}/>}
                                icon={<Check className={classes.uncheckedIcon}/>}
                                classes={{
                                    checked: classes.checked,
                                    root: classes.checkRoot,
                                }}
                                color="primary"
                            />
                        }
                        classes={{label: classes.label, root: classes.labelRoot}}
                        label="Mostrar botão de finalização?"
                    />
                </GridItem>

                <GridItem xs={12}>
                    <TextareaAutosize
                        required
                        aria-label="minimum height"
                        rowsMin={20}
                        placeholder="Descrição do Curso .MD"
                        className={props.classes.textarea}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: 10
                        }}
                        value={updateData.description}
                        onChange={(e) => setUpdateData({...updateData, description: e.target.value})}
                    />
                </GridItem>

            </DialogContent>
            <DialogActions className={props.classes.modalFooter + " " + props.classes.modalFooterCenter}>
                <Button onClick={() => props.handleCloseModalUpdate()} color="danger">Fechar</Button>
                <Button onClick={() => handleUpdateCourse()} color="primary">
                    Atualizar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
