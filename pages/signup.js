import React from "react";
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
import {getProviders, signIn} from 'next-auth/client'

import styles from "styles/jss/nextjs-material-kit/pages/loginPage";

import image from "public/img/bg7.jpg";
import {Link} from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function Signup(props) {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const {providers, ...rest} = props;

    const handleLogin = () => {
        console.log('email', email)
        console.log('password', password)
        signIn('credentials', {email, password})
    }

    return (
        <div>
            <Header
                absolute
                color="transparent"
                brand="Share Info"
                rightLinks={<HeaderLinks/>}
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
                                        <h4>Cadastre-se na Plataforma</h4>
                                        <div className={classes.socialLine}>
                                            <Button
                                                justIcon
                                                href="#pablo"
                                                target="_blank"
                                                color="transparent"
                                                onClick={e => e.preventDefault()}
                                            >
                                                <i className={"fab fa-twitter"}/>
                                            </Button>
                                            <Button
                                                justIcon
                                                href="#pablo"
                                                target="_blank"
                                                color="transparent"
                                                onClick={e => e.preventDefault()}
                                            >
                                                <i className={"fab fa-facebook"}/>
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
                                                <i className={"fab fa-github"}/>
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <p className={classes.divider}>Ou Insira os Dados</p>
                                    <CardBody>
                                        <CustomInput
                                            labelText="E-mail"
                                            name="email"
                                            value={email}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "email",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Email className={classes.inputIconsColor}/>
                                                    </InputAdornment>
                                                ),
                                                onChange: (e) => setEmail(e.target.value)
                                            }}
                                        />
                                        <CustomInput
                                            labelText="Senha"
                                            name="password"
                                            value={password}
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
                                                autoComplete: "off",
                                                onChange: (e) => setPassword(e.target.value)
                                            }}
                                        />
                                    </CardBody>
                                    <CardFooter className={classes.cardFooter}>
                                        <small>Já é cadastrado? <Link href="/login">Clique aqui</Link></small>
                                        <Button
                                            simple
                                            color="primary" size="lg"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleLogin()
                                            }}
                                        >
                                            Entrar
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer whiteFont/>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: {providers}
    }
}
