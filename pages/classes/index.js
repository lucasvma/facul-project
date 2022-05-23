import React, {useEffect, useState} from "react";
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import axios from 'axios';

import styles from "styles/jss/nextjs-material-kit/pages/profilePage.js";

import ModalClass from "../../components/ModalClass/ModalClass";
import ListClasses from "../../components/ListClasses/ListClasses";
import {useSession} from "next-auth/client";
import CustomInput from "../../components/CustomInput/CustomInput";
import Search from "@material-ui/icons/Search";

const useStyles = makeStyles(styles);

export default function ClassesPage(props) {
    const classes = useStyles();
    const {...rest} = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    )

    const [modal, setModal] = useState(false)
    const [allClasses, setAllClasses] = useState([])
    const [grades, setGrades] = useState([])
    const [data, setData] = useState(null)
    const [search, setSearch] = useState('')
    const [session] = useSession()

    useEffect(async () => {
        await handleClasses()
    }, [])

    useEffect(() => {
        if (data != null) {
            setModal(true)
        }
    }, [data])

    const handleClasses = async () => {
        await axios
            .get('/api/classes')
            .then((response) => setAllClasses(response.data.classes))
    }

    useEffect(async() => {
        if (allClasses?.length > 0) {
            setGrades(allClasses)
        }
    }, [allClasses])

    useEffect(async() => {
        await findClass()
    }, [search])

    async function findClass() {
        let exp = new RegExp(search.toLowerCase().trim(), 'i')
        setGrades(allClasses
            .filter(classToSearch => exp.test(classToSearch.title.toLowerCase())
                || exp.test(classToSearch.description.toLowerCase())))
    }

    return (
        <div>
            <Header
                color="transparent"
                brand="Share Info"
                rightLinks={<HeaderLinks/>}
                fixed
                changeColorOnScroll={{
                    height: 200,
                    color: "white"
                }}
                {...rest}
            />
            <Parallax small filter responsive image="/img/landing-bg.jpg"/>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6} style={{ paddingBottom: "40px" }}>
                                <div className={classes.profile}>
                                    {session &&
                                        <>
                                            <img src={session?.user?.image} alt="..." className={imageClasses}/>
                                        </>
                                    }
                                    <div className={classes.name}>
                                        <h3 className={classes.title}>Cadastro de Aula</h3>
                                    </div>

                                    <div>
                                        <Button color="primary" round onClick={() => setData(false)}>
                                            Nova Aula
                                        </Button>

                                        <ModalClass modal={modal} setModal={setModal} handleClasses={handleClasses}
                                                    classes={classes} dataToChange={data}/>
                                    </div>

                                    <div>
                                        <CustomInput
                                            black
                                            // inputRootCustomClasses={classes.inputRootCustomClasses}
                                            formControlProps={{
                                                // className: classes.formControl,
                                                onChange: (e) => {
                                                    setTimeout(() => {
                                                        const newSearch = e.target.value.toLowerCase()
                                                        if (search !== newSearch) {
                                                            setSearch(newSearch)
                                                        }
                                                    }, 1000)
                                                }
                                            }}
                                            inputProps={{
                                                placeholder: "Pesquisar",
                                                inputProps: {
                                                    "aria-label": "Pesquisar",
                                                    className: classes.searchInput,
                                                },
                                            }}
                                            value={search}
                                        />
                                        <Button justIcon round color="white"
                                                onClick={() => findClass()}>
                                            <Search className={classes.searchIcon}/>
                                        </Button>
                                    </div>
                                </div>
                            </GridItem>
                        </GridContainer>

                        <ListClasses setModal={setModal} handleClasses={handleClasses} classes={grades}
                                     setData={setData}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export function getStaticProps() {
    return {props: {classes: ''}}
}
