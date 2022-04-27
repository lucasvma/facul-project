import React, {useEffect, useRef, useState} from 'react';
import FileUpload from 'react-material-file-upload';
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
import {ButtonBase, Input, TextareaAutosize, TextField} from "@material-ui/core";
import Small from "../Typography/Small";
import ExamRender from "../ExamRender/ExamRender";
import CloudUpload from '@material-ui/icons/CloudUpload';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
})

export default function ModalExam(props) {
    const [exam, setExam] = useState('')
    const [minimumGrade, setMinimumGrade] = useState(1)
    const [maxTime, setMaxTime] = useState(0)
    const [isUpdate, setIsUpdate] = useState(false)
    const ref = useRef();

    const modalName = !isUpdate ? 'Adicione as alternativas da avaliação' : 'Atualize as alternativas da avaliação'

    const handleChangeFile = (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result)
            setExam(text)
        };
        reader.readAsText(e.target.files[0]);
    }

    useEffect(async () => {
        await axios.get(`/api/exam/${props.courseId}`)
            .then((response) => {
                if (response?.data?.returnedExam) {
                    const returnedExam = response.data.returnedExam
                    setIsUpdate(true)
                    setExam(returnedExam.exam)
                    setMinimumGrade(returnedExam.minimumGrade)
                    setMaxTime(returnedExam.maxTime)
                }
            })
    }, [])

    async function handleCreate() {
        await axios.post('/api/exams', { exam, minimumGrade, maxTime, courseId: props.courseId })
            .then(r => console.log('Created with success', r.data))
            .catch(e => console.log('An error occurred trying to create the class', e))

        closeModal()
    }

    async function handleUpdate() {
        await axios.put(`/api/exam/${props.courseId}`, { exam, minimumGrade, maxTime })
            .then(() => closeModal())
            .catch(() => console.log('An error occurred trying to update the exam'))
    }

    function closeModal() {
        if (props.dataToChange?.length > 0) {
            Object.assign(props.dataToChange, {})
        }

        props.handleCloseModalExam()
    }

    return (
        <Dialog
            classes={{
                root: props.classes.center,
                paper: props.classes.modal
            }}
            open={props.modalExam}
            TransitionComponent={Transition}
            keepMounted
            fullWidth={true}
            onClose={() => props.handleCloseModalExam()}
            aria-labelledby="modal-slide-title"
            aria-describedby="modal-slide-exam"
        >
            <DialogTitle
                id="classic-modal-slide-title"
                disableTypography
                className={props.classes.modalHeader}
                style={{display: "flex", justifyContent: "space-between", paddingBottom: 0}}
            >
                <div className={props.classes.typo} style={{marginLeft: "3%"}}>
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
                id="modal-slide-exam"
                className={props.classes.modalBody}
            >
                <GridItem xs={12} style={{display: "flex", justifyContent: "space-between"}}>
                    <TextField
                        id="outlined-number"
                        type="number"
                        label="Nota mínima para concluir?"
                        value={minimumGrade}
                        onChange={(e) => setMinimumGrade(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        type="number"
                        label="Tempo limite (horas)?"
                        value={maxTime}
                        onChange={(e) => setMaxTime(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </GridItem>

                <GridItem xs={12}>
                    <ButtonBase component="label" color="primary" round>
                        Upload
                        <CloudUpload style={{marginLeft: '10%'}} />
                        <input
                            ref={ref}
                            type="file"
                            hidden
                            accept=".txt"
                            onChange={handleChangeFile}
                        />
                    </ButtonBase>
                </GridItem>

                <GridItem xs={12}>
                    <TextareaAutosize
                        required
                        aria-label="minimum height"
                        rowsMin={20}
                        placeholder="Descrição da Avaliação"
                        className={props.classes.textarea}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: 10
                        }}
                        value={exam}
                        onChange={(e) => setExam(e.target.value)}
                    />
                </GridItem>

                <GridItem>
                    <ExamRender classes={props.classes} exam={exam} minimumGrade={minimumGrade} maxTime={maxTime}
                                isPerformingExam={false} />
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
