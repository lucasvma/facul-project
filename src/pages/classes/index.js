import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Header from "src/components/Header/Header.js";
import Footer from "src/components/Footer/Footer.js";
import Button from "src/components/CustomButtons/Button.js";
import GridContainer from "src/components/Grid/GridContainer.js";
import GridItem from "src/components/Grid/GridItem.js";
import HeaderLinks from "src/components/Header/HeaderLinks.js";
import Parallax from "src/components/Parallax/Parallax.js";
import axios from 'axios';

import profile from "src/assets/img/apple-icon.png";

import styles from "src/assets/jss/nextjs-material-kit/pages/profilePage.js";

import fs from 'fs';
import matter from 'gray-matter'
import path from 'path'
import { classFilePaths, CLASSES_PATH } from '../../utils/mdxUtils'
import Modal from "../../components/Modal";
import ListClasses from "../../components/ListClasses";
// import ReactMarkdown from 'react-markdown'

const useStyles = makeStyles(styles);

export default function ClassesPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  )

  const [modal, setModal] = useState(false)
  const [grade, setGrades] = useState([])

  useEffect(() => {
    handleClasses()
  }, [])

  async function handleClasses() {
    const response = await axios
        .get('/api/classes')
        .then((response) => response)

    if (response) {
      setGrades(response.data.classes)
    }
  }

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
                    <h3 className={classes.title}>Cadastro de Aula</h3>
                  </div>

                  <div>
                    <Button color="primary" round onClick={() => setModal(true)}>
                        Nova Aula
                    </Button>

                    <Modal modal={modal} setModal={setModal} listClasses={handleClasses} classes={classes} />
                  </div>
                </div>
              </GridItem>
            </GridContainer>

            <ListClasses classes={grade} />
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
