import Link from "next/link";
import React from "react";
import CustomTabs from "../CustomTabs/CustomTabs";
import GridItem from "../Grid/GridItem";
import { makeStyles } from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/pages/componentsSections/tabsStyle";

const useStyles = makeStyles(styles);

export default function Home(props) {
    const classes = useStyles();
    return (
        <div>
            <h2 style={{ paddingLeft: '300px' }}>
                <small>Atividades recentes</small>
            </h2>

            {props.classes.map((grade) => (
                <GridItem xs={12} sm={12} md={6} style={{ paddingTop: '30px', margin: '0 auto' }}>
                    <CustomTabs
                        headerColor="primary"
                        tabs={[
                            {
                                tabName: grade.title !== undefined ? grade.title : '',
                                tabContent: (
                                    <p className={classes.textCenter}>
                                        <Link
                                            href={`/class/[slug]`}
                                            as={`/class/${grade._id !== undefined ? grade._id : ''}`}
                                        >
                                            {grade.description.substr(1, 50)}
                                        </Link>
                                        <br />
                                        <small>{grade.createdAt}</small>
                                    </p>
                                )
                            }
                        ]}
                    />
                </GridItem>
            ))}
        </div>
    )
}
