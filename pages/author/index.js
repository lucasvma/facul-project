import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import profile from "public/img/apple-icon.jpg";

import styles from "styles/jss/nextjs-material-kit/pages/profilePage.js";

import RequestAuthor from "../../components/RequestAuthor/RequestAuthor";

const useStyles = makeStyles(styles);

export default function ClassesPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  )

  const requestToBeAnAuthor = async () => {
    console.log('salvar a request no banco')
    console.log('hide botão de requisição')
    console.log('Inserir request abaixo com status de em Análise')
  }

  return (
    <>
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
        <>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <>
                    <img src={profile} alt="..." className={imageClasses} />
                  </>

                  <div className={classes.name}>
                    <h3 className={classes.title}>Seja um autor</h3>
                  </div>

                  <>
                    <p>
                      Um autor pode criar e publicar novos conteúdos para o público.
                    </p>

                    <Button color="primary" round onClick={() => requestToBeAnAuthor()}>
                        Requisitar
                    </Button>
                  </>
                </div>
              </GridItem>
            </GridContainer>

            <RequestAuthor clientId="1" />
          </div>
        </>
      </div>
      <Footer />
    </>
  );
}
