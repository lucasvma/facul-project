import React, {useEffect, useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "styles/jss/nextjs-material-kit/components/navPillsStyle.js";
import axios from "axios";

const useStyles = makeStyles(styles);

export default function NavPills(props) {
    const [active, setActive] = useState(props.active);
    const handleChange = (event, active) => {
        setActive(active);
    };
    useEffect(async () => {
        if (active !== undefined && props.active !== active) {
            await axios.put(`/api/course/progress/${props.courseId}`, { currentProgress: active })
                .then((response) => {
                    props.setAbleToFinish(response.data.watchedClasses.length === props.courseClassesLength);
                    props.setActiveClassIndex(active);
                })
        }
    }, [active]);
    const classes = useStyles();
    const {tabs, color, horizontal, alignCenter} = props;
    const flexContainerClasses = classNames({
        [classes.flexContainer]: true,
        [classes.horizontalDisplay]: horizontal !== undefined,
    });
    const tabButtons = (
        <Tabs
            classes={{
                root: classes.root,
                fixed: classes.fixed,
                flexContainer: flexContainerClasses,
                indicator: classes.displayNone,
            }}
            value={active}
            onChange={handleChange}
            centered={alignCenter}
        >
            {tabs.map((prop, key) => {
                let icon = {};
                if (prop.tabIcon !== undefined) {
                    icon["icon"] = <prop.tabIcon className={classes.tabIcon}/>;
                }
                const pillsClasses = classNames({
                    [classes.pills]: true,
                    [classes.horizontalPills]: horizontal !== undefined,
                    [classes.pillsWithIcons]: prop.tabIcon !== undefined,
                });
                return (
                    <Tab
                        label={prop.tabButton}
                        key={key}
                        {...icon}
                        classes={{
                            root: pillsClasses,
                            selected: classes[color],
                            wrapper: classes.tabWrapper,
                        }}
                    />
                );
            })}
        </Tabs>
    );
    const tabContent = (
        <div className={classes.contentWrapper}>
            {tabs.map((prop, key) => {
                if (key !== active) {
                    return null;
                } else {
                    return (
                        <div className={classes.tabContent} key={key}>
                            {prop.tabContent}
                        </div>
                    );
                }
            })}
        </div>
    );
    return horizontal !== undefined ? (
        <GridContainer>
            <GridItem {...horizontal.tabsGrid}>{tabButtons}</GridItem>
            <GridItem {...horizontal.contentGrid}>{tabContent}</GridItem>
        </GridContainer>
    ) : (
        <div>
            {tabButtons}
            {tabContent}
        </div>
    );
}

NavPills.defaultProps = {
    active: 0,
    color: "primary",
};

NavPills.propTypes = {
    // index of the default active pill
    active: PropTypes.number,
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            tabButton: PropTypes.string,
            tabIcon: PropTypes.object,
            tabContent: PropTypes.node,
        })
    ).isRequired,
    color: PropTypes.oneOf([
        "primary",
        "warning",
        "danger",
        "success",
        "info",
        "rose",
    ]),
    horizontal: PropTypes.shape({
        tabsGrid: PropTypes.object,
        contentGrid: PropTypes.object,
    }),
    alignCenter: PropTypes.bool,
};
