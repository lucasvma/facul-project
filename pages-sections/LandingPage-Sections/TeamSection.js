import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "styles/jss/nextjs-material-kit/pages/landingPageSections/teamStyle.js";

import team1 from "/img/faces/avatar.jpg";
import team2 from "/img/faces/christian.jpg";
import team3 from "/img/faces/kendall.jpg";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
      <div className={classes.section}>
        <h2 className={classes.title}>Here is our team</h2>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={team1} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Gigi Hadid
                  <br />
                  <small className={classes.smallTitle}>Model</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    You can write here details about one of your team members. You
                    can give more details about what they do. Feel free to add
                    some <a href="#pablo">links</a> for people to be able to
                    follow them outside the site.
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button
                      justIcon
                      color="transparent"
                      className={classes.margin5}
                  >
                    <i className={classes.socials + " fab fa-twitter"} />
                  </Button>
                  <Button
                      justIcon
                      color="transparent"
                      className={classes.margin5}
                  >
                    <i className={classes.socials + " fab fa-instagram"} />
                  </Button>
                  <Button
                      justIcon
                      color="transparent"
                      className={classes.margin5}
                  >
                    <i className={classes.socials + " fab fa-facebook"} />
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={team2} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Lucas Ventura
                  <br />
                  <small className={classes.smallTitle}>Full Stack Developer</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    Estudante de Ciência da Computação. Entusiasta de Cyber Segurança e Inteligência Artificial.
                    Desenvolvedor Full Stack. Trabalho com tecnologias como: Java API e Angular. Eu estudo PHP, JQuery,
                    NodeJs, ReactJs e SQL / NoSQL em projetos pessoais. Eu participo da comunidade de desenvolvedores
                    no <a href="https://twitter.com/LucasVenturaRJ">Twitter</a> e disponibilizo alguns projetos pessoais e de
                    estudos no meu <a href="https://github.com/lucasvma">GitHub</a>.
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button
                      justIcon
                      color="transparent"
                      className={classes.margin5}
                  >
                    <i className={classes.socials + " fab fa-twitter"} />
                  </Button>
                  <Button
                      justIcon
                      color="transparent"
                      className={classes.margin5}
                  >
                    <i className={classes.socials + " fab fa-linkedin"} />
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={team3} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Kendall Jenner
                  <br />
                  <small className={classes.smallTitle}>Model</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    You can write here details about one of your team members. You
                    can give more details about what they do. Feel free to add
                    some <a href="#pablo">links</a> for people to be able to
                    follow them outside the site.
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button
                      justIcon
                      color="transparent"
                      className={classes.margin5}
                  >
                    <i className={classes.socials + " fab fa-twitter"} />
                  </Button>
                  <Button
                      justIcon
                      color="transparent"
                      className={classes.margin5}
                  >
                    <i className={classes.socials + " fab fa-instagram"} />
                  </Button>
                  <Button
                      justIcon
                      color="transparent"
                      className={classes.margin5}
                  >
                    <i className={classes.socials + " fab fa-facebook"} />
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
  );
}
