import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Header from "src/components/Header/Header.js";
import Footer from "src/components/Footer/Footer.js";
import GridContainer from "src/components/Grid/GridContainer.js";
import GridItem from "src/components/Grid/GridItem.js";
import HeaderLinks from "src/components/Header/HeaderLinks.js";
import Parallax from "src/components/Parallax/Parallax.js";

import profile from "src/assets/img/apple-icon.png";

import styles from "src/assets/jss/nextjs-material-kit/pages/profilePage.js";

import fs from 'fs';
import matter from 'gray-matter'
import Link from 'next/link'
import path from 'path'
import Layout from '../../components/Layout'
import { coursesFilePaths, COURSES_PATH } from '../../utils/mdxUtils'

const useStyles = makeStyles(styles);

function CoursesDescription({ courses }) {
  return (
      <Layout>
        <h4>
          Selecione um curso do seu interesse:
        </h4>
        <ul>
          {courses.map((course) => (
              <li key={course.filePath}>
                  {console.log(course)}
                <Link
                    as={`/courses/${course.filePath.replace(/\.mdx?$/, '')}`}
                    href={`/courses/[slug]`}
                >
                  <a>{course.filePath}</a>
                </Link>
              </li>
          ))}
        </ul>
      </Layout>
  );
}

export default function CoursesPage(props) {
  const courses = useStyles();
  const { ...rest } = props;
  const imageCourses = classNames(
    courses.imgRaised,
    courses.imgRoundedCircle,
    courses.imgFluid
  );
  return (
    <div>
      <Header
        color="transparent"
        brand="NextJS Material Kit"
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
                    <h2 className={courses.title}>Cursos</h2>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <CoursesDescription courses={props.courses} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function getStaticProps() {
  const courses = coursesFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(COURSES_PATH, filePath))
    const { content, data } = matter(source)

    return {
      content,
      data,
      filePath,
    }
  })

  return { props: { courses } }
}
