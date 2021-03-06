import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Header from "src/components/Header/Header.js";
import HeaderLinks from "src/components/Header/HeaderLinks.js";
import Footer from "src/components/Footer/Footer.js";
import GridContainer from "src/components/Grid/GridContainer.js";
import GridItem from "src/components/Grid/GridItem.js";
import Button from "src/components/CustomButtons/Button.js";
import Card from "src/components/Card/Card.js";
import CardBody from "src/components/Card/CardBody.js";
import CardHeader from "src/components/Card/CardHeader.js";
import CardFooter from "src/components/Card/CardFooter.js";
import CustomInput from "src/components/CustomInput/CustomInput.js";
import { signIn, getProviders } from 'next-auth/client'

import styles from "src/assets/jss/nextjs-material-kit/pages/loginPage.js";

import image from "src/assets/img/bg7.jpg";
import Router from "next/router";

const useStyles = makeStyles(styles);

export default function SignIn(props) {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    setTimeout(function() {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { providers, ...rest } = props;

    console.log('providers', providers)

    function handleLogin() {
        Router.push("/home");
    }

    return (
        <div>
            <Header
                absolute
                color="transparent"
                brand="Share Info"
                rightLinks={<HeaderLinks />}
                {...rest}
            />
            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center"
                }}
            >
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={6} md={4}>
                            <Card className={classes[cardAnimaton]}>
                                <form className={classes.form}>
                                    <CardHeader color="primary" className={classes.cardHeader}>
                                        <h4>Faça seu Login na Plataforma</h4>
                                        <div className={classes.socialLine}>
                                            <Button
                                                justIcon
                                                href="#pablo"
                                                target="_blank"
                                                color="transparent"
                                                onClick={e => e.preventDefault()}
                                            >
                                                <i className={"fab fa-twitter"} />
                                            </Button>
                                            <Button
                                                justIcon
                                                href="#pablo"
                                                target="_blank"
                                                color="transparent"
                                                onClick={e => e.preventDefault()}
                                            >
                                                <i className={"fab fa-facebook"} />
                                            </Button>
                                            <Button
                                                justIcon
                                                href=""
                                                target="_blank"
                                                color="transparent"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    signIn('github')
                                                }}
                                            >
                                                <i className={"fab fa-github"} />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <p className={classes.divider}>Ou Insira os Dados</p>
                                    <CardBody
                                        as="form"
                                        method="post"
                                        action="/api/auth/callback/credentials"
                                    >
                                        <CustomInput
                                            labelText="E-mail"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "email",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Email className={classes.inputIconsColor} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <CustomInput
                                            labelText="Senha"
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "password",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Icon className={classes.inputIconsColor}>
                                                            lock_outline
                                                        </Icon>
                                                    </InputAdornment>
                                                ),
                                                autoComplete: "off"
                                            }}
                                        />
                                    </CardBody>
                                    <CardFooter className={classes.cardFooter} onClick={() => handleLogin()}>
                                        <Button simple color="primary" size="lg" >
                                            Entrar
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer whiteFont />
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: { providers }
    }
}
