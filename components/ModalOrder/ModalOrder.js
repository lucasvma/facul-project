import * as React from 'react';
import {Dialog, DialogActions, DialogContent} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {forwardRef, useEffect, useState} from "react";
import Slide from "@material-ui/core/Slide";
import GridItem from "../Grid/GridItem";
import Small from "../Typography/Small";
import axios from "axios";
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const currency = "BRL";
const style = {
    "layout": "vertical",
    "color": "black"
};

export default function ModalOrder(props) {
    const [order, setOrder] = useState(undefined);
    const [total, setTotal] = useState("1");
    const courseId = props.course._id

    const closeModal = () => {
        props.handleCloseModalOrder();
        props.handleCourses();
    }

    useEffect(async () => {
        setTotal(props.course.value)
    }, [])

    const handleOnCreateOrder = async (orderId) => {
        await axios
            .get(`/api/order/${courseId}`)
            .then(async (response) => {
                const responseOrder = response.data.order
                if (responseOrder === undefined) {
                    await axios
                        .post('/api/orders', { courseId, paypalOrderId: orderId, total })
                        .then((insertedOrder) => setOrder(insertedOrder.data.order))
                } else {
                    await axios
                        .patch(`/api/order/${courseId}`, { paypalOrderId: orderId, oldPaypalOrderId: responseOrder.paypalOrderId })
                        .then(() => {
                            let newOrder = {...responseOrder, paypalOrderId: orderId}
                            setOrder(newOrder)
                        })
                }
            })
        return orderId
    }

    const handleOnApproveOrder = async (data) => {
        await axios
            .put(`/api/order/${courseId}`, { paypalOrderId: data.orderID, paymentStatus: 'APPROVED' })
            .then((updatedOrder) => setOrder(updatedOrder.data.order))
    }

    return (
        <Dialog
            classes={{
                root: props.classes.center,
                paper: props.classes.modal
            }}
            open={props.modalOrder}
            TransitionComponent={Transition}
            keepMounted
            fullWidth={true}
            onClose={() => props.handleCloseModalOrder()}
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
                        <Small>Resumo do Pedido:</Small>
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
                <Grid container justify="center" alignItems="center">
                    <GridItem item>
                        <strong>Curso:</strong> {props.course.title}
                    </GridItem>
                    <GridItem item>
                        <strong>Quantidade:</strong> 1
                    </GridItem>
                    <GridItem item>
                        <strong>Total:</strong> R${props.course.value},00
                    </GridItem>
                    {
                        order?.paymentStatus !== 'APPROVED' &&
                        <PayPalScriptProvider options={{
                            "client-id": "AXBLsa2b5U6a8_i2erM6WQ1JIy34tOAAs3xr0shJpTrsCPBYzqszc8w1yhlm_Gkquqo6VCRH7-TG026c",
                            "currency": "BRL"
                        }}>
                            <PayPalButtons
                                style={style}
                                disabled={false}
                                forceReRender={[total, currency, style]}
                                fundingSource={undefined}
                                createOrder={(data, actions) => {
                                    return actions.order
                                        .create({
                                            intent: "CAPTURE",
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        currency_code: currency,
                                                        value: total,
                                                    },
                                                },
                                            ],
                                            application_context : {
                                                shipping_preference: 'NO_SHIPPING'
                                            }
                                        })
                                        .then((orderId) => handleOnCreateOrder(orderId));
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order.capture()
                                        .then(() => handleOnApproveOrder(data));
                                }}
                            />
                        </PayPalScriptProvider>
                    }
                    {
                        order?.paymentStatus === 'APPROVED' &&
                        <GridItem item>
                            <strong>Parabéns seu pagamento foi aprovado</strong>
                        </GridItem>
                    }
                </Grid>
            </DialogContent>
            <DialogActions className={props.classes.modalFooter + " " + props.classes.modalFooterCenter}>
                <Button onClick={() => props.handleCloseModalOrder()} color="danger">Fechar</Button>
            </DialogActions>
        </Dialog>
    );
}
