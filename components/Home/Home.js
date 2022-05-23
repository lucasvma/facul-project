import Link from "next/link";
import React, {useState} from "react";
import CustomTabs from "../CustomTabs/CustomTabs";
import GridItem from "../Grid/GridItem";
import {makeStyles} from "@material-ui/core/styles";
import Button from "../CustomButtons/Button";
import CustomInput from "../CustomInput/CustomInput";
import Search from "@material-ui/icons/Search";
import Header from "../Header/Header";

import styles from "styles/jss/nextjs-material-kit/pages/componentsSections/navbarsStyle";

const useStyles = makeStyles(styles);

export default function Home(props) {
    const classes = useStyles();
    const [search, setSearch] = useState('')
    const [classList, setClassList] = useState([])

    if (classList.length === 0 && props.classes.length === 0) {
        return (
            <div>
                <h2>Nenhum atividade encontrada</h2>
            </div>
        )
    }

    if (classList.length === 0 && props.classes.length !== 0) {
        setClassList(props.classes)
    }

    async function findClass() {
        setClassList(props.classes)
        if (search) {
            let exp = new RegExp(search.trim(), 'i')
            setClassList(classList.filter(classToSearch => exp.test(classToSearch.title) || exp.test(classToSearch.description)))
        }
    }

    return (
        <div>
            <Header
                brand="Atividades Recentes"
                color="primary"
                leftLinks=""
                rightLinks={
                    <div>
                        <CustomInput
                            white
                            inputRootCustomClasses={classes.inputRootCustomClasses}
                            formControlProps={{
                                className: classes.formControl,
                                onChange: (e) => {
                                    setTimeout(() => {
                                        if (search !== e.target.value) {
                                            setSearch(e.target.value)
                                            findClass()
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
                }
            />

            {classList.map((grade) => (
                <GridItem xs={12} sm={12} md={6} style={{paddingTop: '30px', margin: '0 auto'}}>
                    <CustomTabs
                        headerColor="primary"
                        tabs={[
                            {
                                tabName: grade.title !== undefined ? grade.title : '',
                                tabContent: (
                                    <p className={classes.textCenter}>
                                        <Link
                                            href={`/class/[slug]`}
                                            as={`/class/${grade._id}`}
                                        >
                                            {grade.description.substr(1, 50)}
                                        </Link>
                                        <br/>
                                        <small>{grade.createdAt}</small>
                                    </p>
                                )
                            }
                        ]}
                    />
                </GridItem>
            ))}
        </div>
    )
}
