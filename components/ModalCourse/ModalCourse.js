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

export default function ModalCourse(props) {
    const [title, setTitle] = useState('')
    const [initialDate, setInitialDate] = useState(new Date());
    const [finalDate, setFinalDate] = useState(undefined);
    const [hasWorkLand, setHasWorkLand] = useState(false);
    const [hasPresence, setHasPresence] = useState(false);
    const [hasEvaluation, setHasEvaluation] = useState(false);
    const [hasExercises, setHasExercises] = useState(false);
    const [hasEndButton, setHasEndButton] = useState(false);
    const [workLand, setWorkLand] = useState(0);
    const [description, setDescription] = useState('')
    const [isUpdate, setIsUpdate] = useState(false)
    const [classes, setClasses] = useState(props.classes)

    useEffect(() => {
        setIsUpdate(!!props.dataToChange)
        setTitle(props.dataToChange ? props.dataToChange.title : '')
        setDescription(props.dataToChange ? props.dataToChange.description : '')
    }, [props.dataToChange])

    const modalName = !isUpdate ? 'Cadastrar Novo Curso' : 'Atualizar curso'

    async function handleCreate() {
        await axios.post('/api/courses', {
            title,
            initialDate,
            finalDate,
            hasWorkLand,
            hasPresence,
            hasEvaluation,
            hasExercises,
            hasEndButton,
            description,
            classes: [],
            publicAccess: false
        })
            .then(response => console.log('Created with success', response.data))
            .catch(e => console.log('An error occurred trying to create the course', e))

        closeModal()
    }

    async function handleUpdate() {
        if (props.dataToChange.title !== title || props.dataToChange.description !== description) {
            await axios.put(`/api/course/${props.dataToChange._id}`, {
                title,
                description
            })
                .then(r => console.log('Updated with success', r.data))
                .catch(e => console.log('An error occurred trying to update the course', e))

            closeModal()
        }
    }

    function closeModal() {
        if (props.dataToChange?.length > 0) {
            Object.assign(props.dataToChange, {})
        }

        props.setModalEdit(false)

        props.handleCourses()
    }

    return (
        <Dialog
            classes={{
                root: props.classes.center,
                paper: props.classes.modal
            }}
            open={props.modalEdit}
            TransitionComponent={Transition}
            keepMounted
            fullWidth={true}
            onClose={() => props.setModalEdit(false)}
            aria-labelledby="modal-slide-title"
            aria-describedby="modal-slide-description"
        >
            <DialogTitle
                id="classic-modal-slide-title"
                disableTypography
                className={props.classes.modalHeader}
                style={{display: "flex", justifyContent: "space-between", paddingBottom: 0}}
            >
                <div className={classes.typo} style={{marginLeft: "3%"}}>
                    <h2 className={props.classes.modalTitle}>
                        <Small>{modalName}</Small>
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{
                            width: "100%",
                        }}
                    />
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                    <FormControl fullWidth>
                        <Datetime
                            value={initialDate}
                            onChange={(newInitialDate) => setInitialDate(newInitialDate)}
                            inputProps={{placeholder: "Data Inicial"}}
                        />
                        <Datetime
                            value={finalDate}
                            onChange={(newFinalDate) => setFinalDate(newFinalDate)}
                            inputProps={{placeholder: "Data Final"}}
                        />
                    </FormControl>
                </GridItem>

                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onClick={() => setHasWorkLand(!hasWorkLand)}
                                checked={hasWorkLand}
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
                        value={workLand}
                        disabled={!hasWorkLand}
                        onChange={(e) => setWorkLand(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </GridItem>

                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onClick={() => setHasPresence(!hasPresence)}
                                checked={hasPresence}
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
                                onClick={() => setHasExercises(!hasExercises)}
                                checked={hasExercises}
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
                                onClick={() => setHasEvaluation(!hasEvaluation)}
                                checked={hasEvaluation}
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
                                onClick={() => setHasEndButton(!hasEndButton)}
                                checked={hasEndButton}
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </GridItem>

            </DialogContent>
            <DialogActions className={props.classes.modalFooter + " " + props.classes.modalFooterCenter}>
                <Button onClick={() => closeModal()} color="danger">Fechar</Button>
                <Button onClick={() => !isUpdate ? handleCreate() : handleUpdate()} color="primary">
                    {!isUpdate ? 'Cadastrar' : 'Atualizar'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
