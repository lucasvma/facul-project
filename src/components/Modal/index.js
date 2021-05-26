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

    function handleCreate(e) {
        e.preventDefault()

        axios.post('/api/classes', { title, description })

        props.setModal(false)

        props.listClasses()
    }

    return (
        <Dialog
            classes={{
                root: props.classes.center,
                paper: props.classes.modal
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
                className={props.classes.modalHeader}
            >
                <IconButton
                    className={props.classes.modalCloseButton}
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={() => props.setModal(false)}
                >
                    <Close className={props.classes.modalClose} />
                </IconButton>
                <h4 className={props.classes.modalTitle}>Cadastre uma nova aula</h4>
            </DialogTitle>
            <DialogContent
                id="modal-slide-description"
                className={props.classes.modalBody}
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
                    className={props.classes.textarea}
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
                className={props.classes.modalFooter + " " + props.classes.modalFooterCenter}
            >
                <Button onClick={() => props.setModal(false)}>Fechar</Button>
                <Button onClick={(e) => handleCreate(e)} color="success">
                    Cadastrar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
