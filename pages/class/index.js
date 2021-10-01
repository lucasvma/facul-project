import React, {useEffect, useState} from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import axios from 'axios';

import profile from "../../img/apple-icon.png";

import styles from "styles/jss/nextjs-material-kit/pages/profilePage.js";

import Modal from "../../components/Modal/Modal";
import ListClasses from "../../components/ListClasses/ListClasses";

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
        brand="Share Info"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter responsive image="/img/landing-bg.jpg" />
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
  return { props: { classes: '' } }
}
