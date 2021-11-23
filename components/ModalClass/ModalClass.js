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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
})

export default function ModalClass(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [publicAccess, setPublicAccess] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)

    useEffect(() => {
        setIsUpdate(!!props.dataToChange)
        if (!props.dataToChange) {
            setTitle('')
            setDescription('')
        } else {
            console.log('dataToChange', props.dataToChange)
            setTitle(props.dataToChange.title)
            setDescription(props.dataToChange.description)
        }
    }, [props.dataToChange])

    const modalName = !isUpdate ? 'Cadastre uma nova aula' : 'Atualize a aula'

    async function handleCreate() {
        await axios.post('/api/classes',
            {title, description, publicAccess})
            .then(r => console.log('Created with success', r.data))
            .catch(e => console.log('An error occurred trying to create the class', e))

        closeModal()
    }

    async function handleUpdate() {
        if (props.dataToChange.title !== title || props.dataToChange.description !== description) {
            await axios.put(`/api/class/${props.dataToChange._id}`, {
                title,
                description
            })
                .then(r => console.log('Updated with success', r.data))
                .catch(e => console.log('An error occurred trying to update the class', e))

            closeModal()
        }
    }

    function closeModal() {
        if (props.dataToChange.length > 0) {
            Object.assign(props.dataToChange, {})
        }

        props.setModal(false)

        props.handleClasses()
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
                    onClick={() => closeModal()}
                >
                    <Close className={props.classes.modalClose}/>
                </IconButton>
                <h4 className={props.classes.modalTitle}>
                    {modalName}
                </h4>
            </DialogTitle>
            <DialogContent
                id="modal-slide-description"
                className={props.classes.modalBody}
            >
                <GridItem xs={12}>
                    <TextField
                        id="title"
                        label="Insira o título da aula"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>

                <GridItem xs={12}>
                    <TextareaAutosize
                        required
                        aria-label="minimum height"
                        rowsMin={20}
                        placeholder="Descrição da Aula .MD"
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
                <Button onClick={() => !isUpdate ? handleCreate() : handleUpdate()} color="success">
                    {!isUpdate ? 'Cadastrar' : 'Atualizar'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
