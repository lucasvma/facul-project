import React from "react";
import styles from "../../styles/jss/nextjs-material-kit/components/generateCertificateStyle";
import {makeStyles} from "@material-ui/core/styles";
import { Page, Text, View, Document } from '@react-pdf/renderer';

const classes = () => makeStyles(styles);

export default function GenerateCertificate() {
    return (
        <Document>
            <Page size="A4" orientation="landscape" debug={true} style={classes.page}>
                <View style={classes.section}>
                    <Text>Certificate of completion</Text>
                </View>
                <View style={classes.section}>
                    <Text>Awarded to</Text>
                </View>
                <View style={classes.section}>
                    <Text>Lucas Ventura</Text>
                </View>
                <View style={classes.section}>
                    <Text>for Completing:</Text>
                </View>
                <View style={classes.section}>
                    <Text>This Fucking Course Completing!</Text>
                </View>
                <View style={classes.section}>
                    <Text>Issued on <b>March 15 2021</b></Text>
                </View>

                {/*<div className={classNames(classes.app)}>*/}
                {/*    <Icon classes={classes} />*/}
                {/*    <p className={classes.byline}>Certificate of completion</p>*/}

                {/*    <div className={classes.content}>*/}
                {/*        <p className={classes.contentP}> Awarded to</p>*/}
                {/*        <h1 className={classes.contentH1}>Lucas Ventura</h1>*/}
                {/*        <p className={classes.contentP}> for completing:</p>*/}
                {/*        <h2 className={classes.contentH2}>Creating PDFs with React & Make.cm</h2>*/}
                {/*    </div>*/}

                {/*    <p className={classes.date}>*/}
                {/*        Issued on <span className={classes.bold}>March 15 2021</span>*/}
                {/*    </p>*/}
                {/*</div>*/}
            </Page>
        </Document>
    );
}
