import React, {useEffect, useState} from "react";
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import Header from "src/components/Header/Header.js";
import Footer from "src/components/Footer/Footer.js";
import GridContainer from "src/components/Grid/GridContainer.js";
import GridItem from "src/components/Grid/GridItem.js";
import HeaderLinks from "src/components/Header/HeaderLinks.js";
import Parallax from "src/components/Parallax/Parallax.js";

import profile from "src/assets/img/apple-icon.png";

import styles from "src/assets/jss/nextjs-material-kit/pages/profilePage.js";

import Button from "../../components/CustomButtons/Button";
import Modal from "../../components/Modal";
import ListCourses from "../../components/ListCourses";
import {useSession} from "next-auth/client";
import axios from "axios";

const useStyles = makeStyles(styles);

export default function CoursesPage(props) {
    const courses = useStyles();
    const { ...rest } = props;
    const imageCourses = classNames(
        courses.imgRaised,
        courses.imgRoundedCircle,
        courses.imgFluid
    )

    const [modal, setModal] = useState(false)
    const [course, setCourse] = useState([])

    const [session, loading] = useSession()

    useEffect(() => {
        handleCourses()
    }, [])

    async function handleCourses() {
        const response = await axios
            .get('/api/courses')
            .then((response) => response)

        if (response) {
            setCourse(response.data.courses)
        }
    }

  return (
      <div>
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
          <Parallax small filter image={require("src/assets/img/profile-bg.jpg")} />
          <div className={classNames(courses.main, courses.mainRaised)}>
              <div>
                  <div className={courses.container}>
                      <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={6}>
                              <div className={courses.profile}>
                                  <div>
                                      <img src={profile} alt="..." className={imageCourses} />
                                  </div>
                                  <div className={courses.name}>
                                      <h3 className={courses.title}>Cadastro do Curso</h3>
                                  </div>

                                  <div>
                                      <Button color="primary" round onClick={() => setModal(true)}>
                                          Novo Curso
                                      </Button>

                                      <Modal modal={modal} setModal={setModal} listCourses={handleCourses} courses={courses} />
                                  </div>
                              </div>
                          </GridItem>
                      </GridContainer>

                      <ListCourses courses={course} />
                  </div>
              </div>
          </div>
          <Footer />
      </div>
  );
}

export function getStaticProps() {
  return { props: { courses: '' } }
}
