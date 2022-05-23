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
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import Card from "../../components/Card/Card";
import {AccountBalance, AddShoppingCart, Equalizer, LocalAtm} from "@material-ui/icons";

ChartJS.register(
    ArcElement,
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
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
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
                    text: "Total de Acessos Mensais ao Curso",
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
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        ],
        datasets: [
            {
                label: "Valor do Faturamento (R$)",
                borderRadius: 20,
                data: [240, 600, 1100, 1400, 1620, 2000],
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
                    text: "Faturamento Mensal do Curso",
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
                max: 2000
            }
        },
    }

    const registrationsAndConclusionsData = {
        labels: [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        ],
        datasets: [
            {
                label: 'Total de Cadastros',
                data: [22, 30, 35, 40, 65, 90],
                backgroundColor: "rgba(1, 98, 255, 1)",
                yAxisID: 'y1',
            },
            {
                label: 'Total Conclusões',
                data: [5, 15, 15, 20, 35, 50],
                backgroundColor: "rgba(38, 111, 38, 1)",
                yAxisID: 'y',
            },
        ]
    }

    const registrationsAndConclusionsOptions = {
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Cadastros vs Conclusões do Curso'
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

    const useRateData = {
        labels: ['Repovado', 'Aprovado'],
        datasets: [
            {
                label: '# of Votes',
                data: [4, 19],
                backgroundColor: [
                    'rgba(200, 0, 0, 1)',
                    'rgba(1, 98, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const useRateOptions = {
        plugins: {
            legend: {
                title: {
                    text: "Taxa de Aproveitamento do Curso",
                    display: true,
                    color: "#000",
                    font: {
                        size: 12,
                    }
                }
            }
        },
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
                                            <h3 className={classes.title}>Relatório Administrativo</h3>
                                        </div>
                                    </>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <div style={{display: "flex", marginTop: "50px"}}>
                                    <Card>
                                        <CardHeader color="primary" className={classes.cardHeader} style={{ display: "flex" }}>
                                            <div>
                                                <AccountBalance className={classes.icons} />
                                            </div>
                                            <div style={{ marginTop: "-11px", marginLeft: "5px" }}>
                                                <h4><strong>Faturamento Mensal</strong></h4>
                                            </div>
                                        </CardHeader>
                                        <CardBody>
                                            <h3><strong>R$ 2.000,00</strong></h3>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardHeader color="primary" className={classes.cardHeader} style={{ display: "flex" }}>
                                            <div>
                                                <LocalAtm className={classes.icons} />
                                            </div>
                                            <div style={{ marginTop: "-11px", marginLeft: "5px" }}>
                                                <h4><strong>Lucro Líquido Mensal</strong></h4>
                                            </div>
                                        </CardHeader>
                                        <CardBody>
                                            <h3><strong>R$ 1.900,00</strong></h3>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardHeader color="primary" className={classes.cardHeader} style={{ display: "flex" }}>
                                            <div>
                                                <Equalizer className={classes.icons} />
                                            </div>
                                            <div style={{ marginTop: "-11px", marginLeft: "5px" }}>
                                                <h4><strong>Ticket Médio</strong></h4>
                                            </div>
                                        </CardHeader>
                                        <CardBody>
                                            <h3><strong>R$ 50,00</strong></h3>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardHeader color="primary" className={classes.cardHeader} style={{ display: "flex" }}>
                                            <div>
                                                <AddShoppingCart className={classes.icons} />
                                            </div>
                                            <div style={{ marginTop: "-11px", marginLeft: "5px" }}>
                                                <h4><strong>Total Vendas</strong></h4>
                                            </div>
                                        </CardHeader>
                                        <CardBody>
                                            <h3><strong>40</strong></h3>
                                        </CardBody>
                                    </Card>
                                </div>
                            </GridItem>

                            <GridItem xs={9} sm={9} md={9}>
                                <div style={{display: "flex", justifyContent: "center", marginTop: "50px", paddingLeft: "280px"}}>
                                    <Bar data={monthlyUsersData} width={300} options={monthlyUsersOptions} style={{marginRight: "50px"}} />
                                    <Bar data={monthlyBillingData} width={300} options={monthlyBillingOptions} style={{marginRight: "50px"}} />
                                    <Line data={registrationsAndConclusionsData} width={300} options={registrationsAndConclusionsOptions} />
                                </div>
                            </GridItem>

                            <GridItem xs={9} sm={9} md={9}>
                                <div style={{display: "flex", justifyContent: "center", marginTop: "50px", paddingLeft: "280px"}}>
                                    <Pie data={useRateData} width={300} options={useRateOptions} style={{marginRight: "50px"}} />
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
