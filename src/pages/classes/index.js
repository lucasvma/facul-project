import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Header from "src/components/Header/Header.js";
import Footer from "src/components/Footer/Footer.js";
import Button from "src/components/CustomButtons/Button.js";
import GridContainer from "src/components/Grid/GridContainer.js";
import GridItem from "src/components/Grid/GridItem.js";
import HeaderLinks from "src/components/Header/HeaderLinks.js";
import Parallax from "src/components/Parallax/Parallax.js";

import profile from "src/assets/img/apple-icon.png";

import styles from "src/assets/jss/nextjs-material-kit/pages/profilePage.js";

import fs from 'fs';
import matter from 'gray-matter'
import Link from 'next/link'
import path from 'path'
import Layout from '../../components/Layout'
import { classFilePaths, CLASSES_PATH } from '../../utils/mdxUtils'

const useStyles = makeStyles(styles);

function ClassDescription({ classes }) {
  return (
      <Layout>
        <h1>Home Page</h1>
        <ul>
          {classes.map((_class) => (
              <li key={_class.filePath}>
                <Link
                    as={`/classes/${_class.filePath.replace(/\.mdx?$/, '')}`}
                    href={`/classes/[slug]`}
                >
                  <a>{_class.data.title}</a>
                </Link>
              </li>
          ))}
        </ul>
      </Layout>
  );
}

export default function ClassesPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div>
      <Header
        color="transparent"
        brand="NextJS Material Kit"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={require("src/assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>Course Name</h3>
                    <h6>Subtitle</h6>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-twitter"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-instagram"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-facebook"} />
                    </Button>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <ClassDescription classes={props.classes} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function getStaticProps() {
  const classes = classFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(CLASSES_PATH, filePath))
    const { content, data } = matter(source)

    return {
      content,
      data,
      filePath,
    }
  })

  return { props: { classes } }
}
