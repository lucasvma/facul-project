import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// core components
import styles from "styles/jss/nextjs-material-kit/components/typographyStyle.js";

const useStyles = makeStyles(styles);

export default function Quote(props) {
    const {text, author} = props;
    const classes = useStyles();
    return (
        <blockquote className={classes.defaultFontStyle + " " + classes.quote}>
            <p className={classes.quoteText}>{text}</p>
            <small className={classes.quoteAuthor}>{author}</small>
        </blockquote>
    );
}

Quote.propTypes = {
    text: PropTypes.node,
    author: PropTypes.node,
};
