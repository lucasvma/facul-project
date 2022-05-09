import React, {useEffect} from "react";
import styles from "../../styles/jss/nextjs-material-kit/components/generateCertificateStyle";
import {makeStyles} from "@material-ui/core/styles";
import { Page, Text, View, Document, StyleSheet, usePDF } from '@react-pdf/renderer';
import dynamic from "next/dynamic";

const classes = () => makeStyles(styles);

const Certificate = (
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

const CertificateNoSSR = (dynamic(() => import(<Certificate />), {
  ssr: false
}));

export default function GenerateCertificate() {
    const [instance, updateInstance] = usePDF({ document: CertificateNoSSR });

    if (instance.loading) return <div>Loading ...</div>;

    if (instance.error) return <div>Something went wrong: {error}</div>;

    return (
        <>
            <a href={instance.url} download="test.pdf">
                Download
            </a>
        </>
    );
}

const Icon = (classes) => (
    <svg className={classes.svg} id="Layer_1" width="100" height="100" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 94.65">
        <title>training</title>
        <path fillRule="evenodd"
              d="M21.92,0A10.36,10.36,0,1,1,11.57,10.35,10.35,10.35,0,0,1,21.92,0ZM14.61,22.7l3.68,9.65h.39l1.79-6.18-1-1.05c-.72-1.05-.47-2.25.87-2.47a9.91,9.91,0,0,1,1.45,0,8.37,8.37,0,0,1,1.59.06c1.24.28,1.37,1.48.75,2.44l-1,1.05L25,32.35h.38L28.7,22.7a4.52,4.52,0,0,0,.47.37,6.7,6.7,0,0,1,2.71.85,4.73,4.73,0,0,1,3,2l7.9,10.91,5.63,1.08V16.67h-8a1.86,1.86,0,1,1,0-3.72H77.56V7.52a1.87,1.87,0,0,1,3.73,0V13h39.53a1.86,1.86,0,1,1,0,3.72h-7.93V62.73H121a1.86,1.86,0,0,1,0,3.72H81.55V75a2.56,2.56,0,0,0,.26.2l11.62,11a1.85,1.85,0,1,1-2.54,2.68L81.55,80v8a1.87,1.87,0,0,1-3.73,0V79.68l-9.69,9.21a1.84,1.84,0,0,1-2.62-.07,1.82,1.82,0,0,1,.07-2.61l11.62-11h0a1.71,1.71,0,0,1,.62-.39V66.45H40.37a1.86,1.86,0,0,1,0-3.72h8V47.83L39.1,46A4.88,4.88,0,0,1,36,44.1l-3.93-5.45v.14l-.32,15.78,4,25.24,1.51,8.65c.85,5.78-8,9.21-10.19,1.62L21.91,59.66,16.66,90.57c-1,5.59-10.13,5.64-10.19-1.15l5.79-34.65-.44-18.71a7.9,7.9,0,0,0-1.19,2,12.61,12.61,0,0,0-1,4.58L8.83,53.55C8.39,59.25-.1,59.6,0,53.45c.05-2.76.3-5.54.6-8.37.58-5.42.7-8.78,3.79-14.18a18.3,18.3,0,0,1,4.5-5.21,12.14,12.14,0,0,1,4.88-2.32,7.26,7.26,0,0,0,.84-.67ZM52.13,38.26l10.46-11a2.47,2.47,0,1,1,3.58,3.4L56.33,41a4.89,4.89,0,0,1-4.2,7.46V62.73H109.2V16.67H52.13V38.26Z"/>
    </svg>
);