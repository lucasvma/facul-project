import React, {useEffect, useState} from "react";

// mterial-ui components
import Button from "../CustomButtons/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {ListAlt, VisibilityOff, PictureAsPdf} from "@material-ui/icons";
import AddBoxIcon from '@material-ui/icons/AddBox';
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../styles/jss/nextjs-material-kit/pages/profilePage";
import {useSession} from "next-auth/client";
import ModalClassAssociation from "../ModalClassAssociation/ModalClassAssociation";
import ModalExam from "../ModalExam/ModalExam";
import axios from "axios";
import ModalCourseUpdate from "../ModalCourseUpdate/ModalCourseUpdate";

const useStyles = makeStyles(styles);

export default function CommonActionsCourse({course, handleUpdate, handleRemove, handleVisible, handleCourses}) {
    const [modalClass, setModalClass] = useState(false);
    const [modalExam, setModalExam] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [passedOnExam, setPassedOnExam] = useState(false)
    const handleCloseModalClass = () => setModalClass(false);
    const handleCloseModalExam = () => setModalExam(false);
    const handleCloseModalUpdate = () => setModalUpdate(false);
    const classes = useStyles();
    const courseId = course._id
    const [session] = useSession()
    const isAdmin = session?.isAdmin
    const isOwner = session?.user?.email === course?.createBy

    useEffect(async () => {
        await axios.get(`/api/exam/passed/${courseId}`)
            .then((response) => setPassedOnExam(response?.data?.passedOnExam))
    }, [])

    function exportCertificate() {
        return (
            null
            // <GenerateCertificate />
        )
    }

    return (isAdmin || isOwner) && (
        <div courseId={courseId}>
            {passedOnExam && <Button
                justIcon
                color="transparent"
                aria-label="Baixar Certificado"
                onClick={() => exportCertificate()}
            >
                {<PictureAsPdf/>}
            </Button>}


            {course.hasEvaluation && <Button
                justIcon
                color="transparent"
                aria-label="Adicionar Exame"
                onClick={() => setModalExam(true)}
            >
                {<ListAlt/>}
            </Button>}

            <Button
                justIcon
                color="transparent"
                aria-label="associar aulas"
                onClick={() => setModalClass(true)}
            >
                {<AddBoxIcon/>}
            </Button>

            <Button
                justIcon
                color="transparent"
                aria-label="ocultar"
                onClick={() => handleVisible(courseId, course.visibility)}
            >
                {course.visibility ? <VisibilityIcon/> : <VisibilityOff/>}
            </Button>

            <Button
                justIcon
                color="transparent"
                onClick={() => setModalUpdate(true)}
            >
                <EditIcon/>
            </Button>

            <Button
                justIcon
                color="transparent"
                onClick={() => handleRemove(courseId)}
            >
                <DeleteIcon/>
            </Button>

            {/*{ modalMultiple && <ModalMultipleAssociation modalMultiple={modalMultiple} setModalMultiple={setModalMultiple} handleCourses={handleCourses}*/}
            {/*                                             classes={classes} course={course} /> }*/}
            {modalExam && <ModalExam modalExam={modalExam} handleCloseModalExam={handleCloseModalExam} classes={classes}
                                     courseId={courseId} />}
            {modalClass && <ModalClassAssociation modalClass={modalClass} handleCloseModalClass={handleCloseModalClass}
                                    handleCourses={handleCourses} classes={classes} course={course} />}
            {modalUpdate && <ModalCourseUpdate modalUpdate={modalUpdate} handleCloseModalUpdate={handleCloseModalUpdate}
                                               handleCourses={handleCourses} classes={classes} courseId={courseId} />}
        </div>
    );
}

CommonActionsCourse.propTypes = {};
