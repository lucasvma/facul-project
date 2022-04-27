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
import Small from "../Typography/Small";
import ExamRender from "../ExamRender/ExamRender";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
})

export default function ModalPerformingExam(props) {
    const [exam, setExam] = useState('')
    const [minimumGrade, setMinimumGrade] = useState(1)
    const [maxTime, setMaxTime] = useState(0)
    const [disableFinishExam, setDisableFinishExam] = useState(true)
    const [finishingExam, setFinishingExam] = useState(false)
    const [passedOnExam, setPassOnExam] = useState(false)

    useEffect(async () => {
        await axios.get(`/api/exam/${props.courseId}`)
            .then((response) => {
                if (response?.data?.returnedExam) {
                    const returnedExam = response.data.returnedExam
                    setExam(returnedExam.exam)
                    setMinimumGrade(returnedExam.minimumGrade)
                    setMaxTime(returnedExam.maxTime)
                }
            })
    }, [])

    useEffect(async () => {
        if (passedOnExam) {
            props.setEndCourse(true);
            // TODO show popup of passed or reproved
        }
    }, [passedOnExam])

    function closeModal() {
        if (props.dataToChange?.length > 0) {
            Object.assign(props.dataToChange, {})
        }
        props.handleCloseModalPerformingExam()
    }

    return (
        <Dialog
            classes={{
                root: props.classes.center,
                paper: props.classes.modal
            }}
            open={props.modalPerformingExam}
            TransitionComponent={Transition}
            keepMounted
            fullWidth={true}
            onClose={() => props.handleCloseModalPerformingExam()}
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
                        <Small>Iniciou o seu exame, boa sorte!</Small>
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
                <GridItem xs={12}>
                    <ExamRender classes={props.classes} exam={exam} minimumGrade={minimumGrade} maxTime={maxTime}
                                setDisableFinishExam={setDisableFinishExam} finishingExam={finishingExam}
                                setPassOnExam={setPassOnExam} courseId={props.courseId} isPerformingExam={true} />
                </GridItem>
            </DialogContent>

            <DialogActions className={props.classes.modalFooter + " " + props.classes.modalFooterCenter}>
                <Button onClick={() => closeModal()} color="danger">Fechar</Button>
                <Button onClick={() => setFinishingExam(true)} color="primary" disabled={disableFinishExam}>
                    Finalizar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
