import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import Link from "next/link";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "src/components/Header/Header.js";
import HeaderLinks from "src/components/Header/HeaderLinks.js";
import Footer from "src/components/Footer/Footer.js";
import GridContainer from "src/components/Grid/GridContainer.js";
import GridItem from "src/components/Grid/GridItem.js";
import Button from "src/components/CustomButtons/Button.js";
import Parallax from "src/components/Parallax/Parallax.js";
// sections for this page
import SectionBasics from "src/pages-sections/Components-Sections/SectionBasics.js";
import SectionNavbars from "src/pages-sections/Components-Sections/SectionNavbars.js";
import SectionTabs from "src/pages-sections/Components-Sections/SectionTabs.js";
import SectionPills from "src/pages-sections/Components-Sections/SectionPills.js";
import SectionNotifications from "src/pages-sections/Components-Sections/SectionNotifications.js";
import SectionTypography from "src/pages-sections/Components-Sections/SectionTypography.js";
import SectionJavascript from "src/pages-sections/Components-Sections/SectionJavascript.js";
import SectionCarousel from "src/pages-sections/Components-Sections/SectionCarousel.js";
import SectionCompletedExamples from "src/pages-sections/Components-Sections/SectionCompletedExamples.js";
import SectionLogin from "src/pages-sections/Components-Sections/SectionLogin.js";
import SectionExamples from "src/pages-sections/Components-Sections/SectionExamples.js";
import SectionDownload from "src/pages-sections/Components-Sections/SectionDownload.js";

import styles from "src/assets/jss/nextjs-material-kit/pages/components.js";

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        brand="Share Info"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax image={require("src/assets/img/nextjs_header.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>NextJS Material Kit.</h1>
                <h3 className={classes.subtitle}>
                  A Badass Material Kit based on Material-UI and NextJS.
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <SectionBasics />
        <SectionNavbars />
        <SectionTabs />
        <SectionPills />
        <SectionNotifications />
        <SectionTypography />
        <SectionJavascript />
        <SectionCarousel />
        <SectionCompletedExamples />
        <SectionLogin />
        <GridItem md={12} className={classes.textCenter}>
          <Link href="/login">
            <a className={classes.link}>
              <Button color="primary" size="lg" simple>
                View Login Page
              </Button>
            </a>
          </Link>
        </GridItem>
        <SectionExamples />
        <SectionDownload />
      </div>
      <Footer />
    </div>
  );
}
