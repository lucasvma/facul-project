import React from "react";

import GridContainer from "../Grid/GridContainer";
import {makeStyles} from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/pages/componentsSections/navbarsStyle";

import Badge from "../Badge/Badge";
import GridItem from "../Grid/GridItem";

const useStyles = makeStyles(styles);

const requestStatus = {
    0: {
        color: 'warning',
        name: 'Em Análise'
    },
    1: {
        color: 'success',
        name: 'Sucesso'
    },
    2: {
        color: 'danger',
        name: 'Recusada'
    }
}

export default function RequestAuthor({ request }) {
    const classes = useStyles();

    if (request?.length === 0) return null

    // TODO auto refresh component when request

    return (
        <>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6} justify="center" >
                    <div className={classes.title} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <h6 style={{ marginRight: "10px" }}>Status:</h6>

                        <Badge color={requestStatus[request.status].color}>{requestStatus[request.status].name}</Badge>
                    </div>
                </GridItem>
            </GridContainer>
        </>
    )
}
