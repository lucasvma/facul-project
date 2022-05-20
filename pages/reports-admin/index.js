import React, {useEffect, useState} from "react";
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "styles/jss/nextjs-material-kit/pages/profilePage.js";

import axios from "axios";
import {useSession} from "next-auth/client";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
);

const useStyles = makeStyles(styles);

export default function ClassesPage(props) {
    const classes = useStyles();
    const {...rest} = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    )
    const [courseProgress, setCourseProgress] = useState([])
    const [session, loading] = useSession()
    const email = session?.user.email

    useEffect(async () => {
        if (loading) {
            return null
        }
        console.log('getting by reportsIndex')
        await axios.get('/api/course/progress')
            .then((response) => setCourseProgress(response.data?.courseProgress))
    }, [loading])

    useEffect(() => {
        console.log('courseProgress', courseProgress)
    }, [courseProgress])

    const monthlyUsersData = {
        labels: [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
        ],
        datasets: [
            {
                label: "Total de Usuários",
                borderRadius: 20,
                data: [10, 16, 37, 59, 73, 97],
                backgroundColor: "rgba(1, 98, 255, 1)",
                barThickness: 10,
            },
        ]
    }

    const monthlyUsersOptions = {
        plugins: {
            legend: {
                position: "top",
                align: "center",
                labels: {
                    boxWidth: 6,
                    usePointStyle: true,
                    pointStyle: "circle",
                },
                title: {
                    text: "Cadastro de Usuários Mensais",
                    display: true,
                    color: "#000",
                    font: {
                        size: 12,
                    }
                }
            }
        },
        scales: {
            yAxis: {
                max: 100
            }
        },
    }

    const monthlyBillingData = {
        labels: [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
        ],
        datasets: [
            {
                label: "Valor do Faturamento (R$)",
                borderRadius: 20,
                data: [120, 300, 550, 700, 810, 970],
                backgroundColor: "rgba(38, 111, 38, 1)",
                barThickness: 10,
            },
        ]
    }

    const monthlyBillingOptions = {
        plugins: {
            legend: {
                position: "top",
                align: "center",
                labels: {
                    boxWidth: 6,
                    usePointStyle: true,
                    pointStyle: "circle",
                },
                title: {
                    text: "Faturamentos Mensais",
                    display: true,
                    color: "#000",
                    font: {
                        size: 12,
                    }
                }
            }
        },
        scales: {
            yAxis: {
                max: 1000
            }
        },
    }

    const authorRequestsData = {
        labels: [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
        ],
        datasets: [
            {
                label: 'Total de Autores',
                data: [5, 10, 30, 40, 70, 90],
                backgroundColor: "rgba(1, 98, 255, 1)",
                yAxisID: 'y1',
            },
            {
                label: 'Solicitações para ser Autor',
                data: [10, 30, 35, 40, 65, 90],
                backgroundColor: "rgba(184, 52, 42, 1)",
                yAxisID: 'y',
            },
        ]
    }

    const authorRequestsOptions = {
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Total Autores vs Requisições'
            }
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
            },
        }
    }

    return (
        <>
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
                <>
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>
                                <div className={classes.profile}>
                                    {session &&
                                        <>
                                            <img src={session?.user?.image} alt="..." className={imageClasses}/>
                                        </>
                                    }

                                    <>
                                        <div className={classes.name}>
                                            <h3 className={classes.title}>Relatório Admin</h3>
                                        </div>
                                    </>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={9} sm={9} md={9}>
                                <div style={{display: "flex", justifyContent: "center", marginTop: "50px", paddingLeft: "280px"}}>
                                    <Bar data={monthlyUsersData} width={300} options={monthlyUsersOptions} style={{marginRight: "50px"}} />
                                    <Bar data={monthlyBillingData} width={300} options={monthlyBillingOptions} style={{marginRight: "50px"}} />
                                    <Line data={authorRequestsData} width={300} options={authorRequestsOptions} />
                                </div>
                            </GridItem>
                        </GridContainer>
                    </div>
                </>
            </div>
            <Footer/>
        </>
    );
}
