import React, {useState} from 'react';
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
import CustomInput from "../CustomInput/CustomInput";
import GridItem from "../Grid/GridItem";
import {TextareaAutosize} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
})

export default function Modal(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const type = props.classes !== undefined ? 'classes' : 'courses'

    function handleCreate(e) {
        e.preventDefault()

        axios.post(`/api/${type}`, { title, description })

        props.setModal(false)

        type === 'classes' ? props.listClasses() : this.props.listCourses()
    }

    return (
        <Dialog
            classes={{
                root: type === 'classes' ? props.classes.center : props.courses.center,
                paper: type === 'classes' ? props.classes.modal : props.courses.modal
            }}
            open={props.modal}
            TransitionComponent={Transition}
            keepMounted
            fullWidth={true}
            onClose={() => props.setModal(false)}
            aria-labelledby="modal-slide-title"
            aria-describedby="modal-slide-description"
        >
            <DialogTitle
                id="classic-modal-slide-title"
                disableTypography
                className={type === 'classes' ? props.classes.modalHeader : props.courses.modalHeader}
            >
                <IconButton
                    className={type === 'classes' ? props.classes.modalCloseButton : props.courses.modalCloseButton}
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={() => props.setModal(false)}
                >
                    <Close className={type === 'classes' ? props.classes.modalClose : props.courses.modalClose} />
                </IconButton>
                <h4 className={type === 'classes' ? props.classes.modalTitle : props.courses.modalTitle}>Cadastre uma nova aula</h4>
            </DialogTitle>
            <DialogContent
                id="modal-slide-description"
                className={type === 'classes' ? props.classes.modalBody : props.courses.modalBody}
            >
            <GridItem xs={12}>
                <CustomInput
                    labelText="Título da Aula"
                    formControlProps={{
                        fullWidth: true,
                        required: true,
                        onChange: (e) => {
                            setTitle(e.target.value)
                        }
                    }}
                    value={title}
                />
            </GridItem>

            <GridItem xs={12} >
                <TextareaAutosize
                    aria-label="minimum height"
                    rowsMin={20}
                    placeholder="Descrição da Aula .MD"
                    className={type === 'classes' ? props.classes.textarea : props.courses.textarea}
                    style={{
                        width: "100%",
                        padding: "10px"
                    }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </GridItem>

            </DialogContent>
            <DialogActions
                className={type === 'classes' ? props.classes.modalFooter : props.courses.modalFooter + " " +
                            type === 'classes' ? props.classes.modalFooterCenter : props.courses.modalFooterCenter}
            >
                <Button onClick={() => props.setModal(false)}>Fechar</Button>
                <Button onClick={(e) => handleCreate(e)} color="success">
                    Cadastrar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
