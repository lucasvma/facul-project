import {primaryColor} from "../../nextjs-material-kit";
import {StyleSheet} from "@react-pdf/renderer";

const generateCertificateStyle =  StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    app: {
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        color: "white",
        backgroundColor: primaryColor,
        backgroundSize: "160%",
        backgroundPosition: "90% 150%",
        backgroundRepeat: "no-repeat",
        padding: "2.5rem",
        boxSizing: "border-box",
        margin: "0",
        fontFamily: 'IBM Plex Sans',
        fontSize: "20px"
    },
    svg: {
        position: "absolute",
        top: "0",
    },
    content: {
        position: "absolute",
        top: "12rem",
        right: "2.5rem",
        width: "65%",
    },
    contentP: {
        marginBottom: "1rem",
    },
    contentH1: {
        fontFamily: 'Poppins',
        color: "white",
        fontSize: "3rem !important",
        lineHeight: "1",
        marginBottom: "2rem",
    },
    contentH2: {
        fontSize: "2rem !important",
        fontWeight: "500",
        lineHeight: "1",
        marginBottom: "1rem",
    },
    byline: {
        position: "absolute",
        right: "2.5rem",
    },
    date: {
        position: "absolute",
        bottom: "2.5rem",
        fontSize: "0.75rem",
    },
    bold: {
        fontWeight: "500px",
    },
})

export default generateCertificateStyle;
