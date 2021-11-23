import React from "react";

import GridContainer from "../Grid/GridContainer";
import {makeStyles} from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/pages/componentsSections/navbarsStyle";

import Badge from "../Badge/Badge";
import GridItem from "../Grid/GridItem";

const useStyles = makeStyles(styles);

export default function RequestAuthor({ requests }) {
    const classes = useStyles();

    return (
        <>
            <GridContainer  justify="center">
                <GridItem xs={12} sm={12} md={6} justify="center" >
                    <div className={classes.title}>
                        <h6>Status:</h6>
                    </div>

                    <div className={classes.title}>
                        {requests.find((request) => request.status === 0) &&
                            <Badge color="warning">Em Análise</Badge>
                        }
                        {requests.find((request) => request.status === 1) &&
                            <Badge color="success">Sucesso</Badge>
                        }
                        {requests.find((request) => request.status === 2) &&
                            <Badge color="danger">Recusada</Badge>
                        }
                    </div>
                </GridItem>
            </GridContainer>
        </>
    )
}
