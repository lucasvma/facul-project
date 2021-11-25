import * as React from 'react';
import {forwardRef, useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import {Dialog, DialogActions, DialogContent} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import axios from "axios";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
})

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

export default function ModalAssociation(props) {
    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([]);
    const [classes, setClasses] = useState([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    const closeModal = () => {
        props.setModal(false)
        props.handleCourses()
    }

    const associateClasses = async () => {
        const classIds = classes.map((grade) => right.includes(grade.title) && grade._id).filter((classId) => classId)
        await axios
            .patch(`/api/course/associate/${props.course._id}`, {classes: classIds})
            .then((response) => closeModal())
    }

    useEffect(async () => {
        if (props.modal) {
            await axios
                .get('/api/classes')
                .then((response) => setClasses(response.data.classes))
        }
    }, [props.modal])

    useEffect(async () => {
        if (classes.length) {
            if (props.course.classes && props.course.classes.length > 0) {
                await setRight(classes.map((grade) => props.course.classes
                    .includes(grade._id) && grade.title)
                    .filter((classTitle) => classTitle))
                console.log('setted right')
            }
            console.log('setting left')
            await setLeft(classes
                .filter((element) => !right.includes(element.title))
                .map((grade) => grade.title))
        }
    }, [classes])

    const customList = (items) => (
        <Paper sx={{width: 200, height: 230, overflow: 'auto'}}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value}-label`;

                    return (
                        <ListItem
                            key={value}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value}/>
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
                    Associe aulas ao curso
                </h4>
            </DialogTitle>
            <DialogContent
                id="modal-slide-description"
                className={props.classes.modalBody}
            >
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item>{customList(left)}</Grid>
                    <Grid item>
                        <Grid container direction="column" alignItems="center">
                            <Button
                                sx={{my: 0.5}}
                                variant="outlined"
                                size="small"
                                onClick={handleAllRight}
                                disabled={left.length === 0}
                                aria-label="move all right"
                            >
                                ≫
                            </Button>
                            <Button
                                sx={{my: 0.5}}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedRight}
                                disabled={leftChecked.length === 0}
                                aria-label="move selected right"
                            >
                                &gt;
                            </Button>
                            <Button
                                sx={{my: 0.5}}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedLeft}
                                disabled={rightChecked.length === 0}
                                aria-label="move selected left"
                            >
                                &lt;
                            </Button>
                            <Button
                                sx={{my: 0.5}}
                                variant="outlined"
                                size="small"
                                onClick={handleAllLeft}
                                disabled={right.length === 0}
                                aria-label="move all left"
                            >
                                ≪
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>{customList(right)}</Grid>
                </Grid>
            </DialogContent>
            <DialogActions className={props.classes.modalFooter + " " + props.classes.modalFooterCenter}>
                <Button onClick={() => closeModal()} color="danger">Fechar</Button>
                <Button onClick={() => associateClasses()} color="success">
                    {'Salvar'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
