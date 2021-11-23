import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "styles/jss/nextjs-material-kit/pages/profilePage.js";
import {useSession} from "next-auth/client";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const [session] = useSession()

  return (
    <div>
      <Header
        color="transparent"
        brand="Share Info"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax small small filter image="/img/profile-bg.jpg" />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  {session &&
                    <>
                      <img src={session.user.image} alt="..." className={imageClasses}/>
                    </>
                  }
                  <div className={classes.name}>
                    <h3 className={classes.title}>Lucas Ventura</h3>
                    <h6>ADMIN</h6>
                    <h6>Full Stack Developer</h6>
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
            <div className={classes.description}>
              <p>
                Estudante de Ciência da Computação. Entusiasta de Cyber Segurança e Inteligência Artificial.
                  Desenvolvedor Full Stack. Trabalho com tecnologias como: Java API e Angular. Eu estudo PHP, JQuery,
                  NodeJs, ReactJs e SQL / NoSQL em projetos pessoais. Eu participo da comunidade de desenvolvedores
                  no <a href="https://twitter.com/LucasVenturaRJ">Twitter</a> e disponibilizo alguns projetos pessoais e de
                  estudos no meu <a href="https://github.com/lucasvma">GitHub</a>.{" "}
              </p>
            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                  {" "}
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
