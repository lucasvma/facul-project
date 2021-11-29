import React, {useEffect, useState} from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Header from "../components/Header/Header";
import HeaderLinks from "../components/Header/HeaderLinks";
import Footer from "../components/Footer/Footer";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import Button from "../components/CustomButtons/Button";
import Card from "../components/Card/Card";
import CardBody from "../components/Card/CardBody";
import CardHeader from "../components/Card/CardHeader";
import CardFooter from "../components/Card/CardFooter";
import CustomInput from "../components/CustomInput/CustomInput";
import {getCsrfToken, signIn, useSession} from 'next-auth/client'

import styles from "styles/jss/nextjs-material-kit/pages/loginPage";

import image from "public/img/bg7.jpg";
import {Input, Link} from "@material-ui/core";
import Router from "next/router";

const useStyles = makeStyles(styles);

export default function LoginPage() {
    const [cardAnimaton, setCardAnimation] = useState("cardHidden");
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const [session] = useSession()

    useEffect(() => {
        if (session) return Router.push('/home')
    }, [])

    // if (session) return null

    function handleLogin() {
        signIn('credentials', {email, password})
    }

    return (
        <div>
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
                                                target="_blank"
                                                color="transparent"
                                                onClick={() => {
                                                    signIn('google')
                                                }}
                                            >
                                                <i className={"fab fa-google"}/>
                                            </Button>
                                            <Button
                                                justIcon
                                                target="_blank"
                                                color="transparent"
                                                onClick={() => {
                                                    signIn('github')
                                                }}
                                            >
                                                <i className={"fab fa-github"}/>
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <p className={classes.divider}>Ou Insira os Dados</p>
                                    <CardBody
                                        as="form"
                                        method="post"
                                        action="/api/auth/signin/credentials"
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
                                                        <Email className={classes.inputIconsColor}/>
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
                                    <CardFooter
                                        className={classes.cardFooter}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleLogin()
                                        }}
                                    >
                                        <small>Não é cadastrado? <Link href="/signup">Clique aqui</Link></small>
                                        <Button simple color="primary" size="lg">
                                            Entrar
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        </div>
    );
}
