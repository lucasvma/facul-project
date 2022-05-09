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

export default function ModalCourseCreate(props) {
    const classes = props.classes;

    const [creationData, setCreationData] = useState({
        title: '',
        initialDate: new Date(),
        finalDate: undefined,
        hasWorkLoad: false,
        hasPresence: false,
        hasEvaluation: false,
        hasExercises: false,
        hasEndButton: false,
        description: '',
        classes: [],
        publicAccess: false
    });

    async function handleCreate() {
        await axios.post('/api/courses', creationData)
            .then(response => console.log('Created with success', response.data))
            .catch(e => console.log('An error occurred trying to create the course', e))

        closeModal()
    }

    function closeModal() {
        props.setModalCreate(false)
        props.handleCourses()
    }

    return (
        <Dialog
            classes={{
                root: props.classes.center,
                paper: props.classes.modal
            }}
            open={props.modalCreate}
            TransitionComponent={Transition}
            keepMounted
            fullWidth={true}
            onClose={() => props.setModalCreate(false)}
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
                        <Small>Cadastrar Novo Curso</Small>
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
                        value={creationData.title}
                        onChange={(e) => setCreationData({...creationData, title: e.target.value})}
                        style={{
                            width: "100%",
                        }}
                    />
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                    <FormControl fullWidth>
                        <Datetime
                            value={creationData.initialDate}
                            onChange={(newInitialDate) => setCreationData({...creationData, initialDate: newInitialDate})}
                            inputProps={{placeholder: "Data Inicial"}}
                        />
                        <Datetime
                            value={creationData.finalDate}
                            onChange={(newFinalDate) => setCreationData({...creationData, finalDate: newFinalDate})}
                            inputProps={{placeholder: "Data Final"}}
                        />
                    </FormControl>
                </GridItem>

                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onClick={() => setCreationData({...creationData, hasWorkLoad: !creationData.hasWorkLoad})}
                                checked={creationData.hasWorkLoad}
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
                        value={creationData.workLoad}
                        disabled={!creationData.hasWorkLoad}
                        onChange={(e) => setCreationData({...creationData, workLoad: e.target.value})}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </GridItem>

                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onClick={() => setCreationData({...creationData, hasPresence: !creationData.hasPresence})}
                                checked={creationData.hasPresence}
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
                                onClick={() => setCreationData({...creationData, hasExercises: !creationData.hasExercises})}
                                checked={creationData.hasExercises}
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
                                onClick={() => setCreationData({...creationData, hasEvaluation: !creationData.hasEvaluation})}
                                checked={creationData.hasEvaluation}
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
                                onClick={() => setCreationData({...creationData, hasEndButton: !creationData.hasEndButton})}
                                checked={creationData.hasEndButton}
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
                        value={creationData.description}
                        onChange={(e) => setCreationData({...creationData, description: e.target.value})}
                    />
                </GridItem>

            </DialogContent>
            <DialogActions className={props.classes.modalFooter + " " + props.classes.modalFooterCenter}>
                <Button onClick={() => closeModal()} color="danger">Fechar</Button>
                <Button onClick={() => handleCreate()} color="primary">
                    Cadastrar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
