import React, {useEffect, useState} from "react";

// mterial-ui components
import Button from "../CustomButtons/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {ListAlt, VisibilityOff, PictureAsPdf, MoneySharp, AttachMoney} from "@material-ui/icons";
import AddBoxIcon from '@material-ui/icons/AddBox';
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../styles/jss/nextjs-material-kit/pages/profilePage";
import {useSession} from "next-auth/client";
import ModalClassAssociation from "../ModalClassAssociation/ModalClassAssociation";
import ModalExam from "../ModalExam/ModalExam";
import axios from "axios";
import ModalCourseUpdate from "../ModalCourseUpdate/ModalCourseUpdate";
import ModalOrder from "../ModalOrder/ModalOrder";

const useStyles = makeStyles(styles);

export default function CommonActionsCourse({course, handleUpdate, handleRemove, handleVisible, handleCourses}) {
    const [modalClass, setModalClass] = useState(false);
    const [modalExam, setModalExam] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalOrder, setModalOrder] = useState(false)
    const [passedOnExam, setPassedOnExam] = useState(false)
    const handleCloseModalClass = () => setModalClass(false);
    const handleCloseModalExam = () => setModalExam(false);
    const handleCloseModalUpdate = () => setModalUpdate(false);
    const handleCloseModalOrder = () => setModalOrder(false);
    const classes = useStyles();
    const courseId = course._id
    const [session] = useSession()
    const isAdminOrOwner = session?.isAdmin || (session?.user?.email === course?.createBy)

    useEffect(async () => {
        await axios.get(`/api/exam/passed/${courseId}`)
            .then((response) => setPassedOnExam(response?.data?.passedOnExam))
    }, [])

    function exportCertificate() {
        return axios.get(`/api/course/certificate/${courseId}`)
            .then((response) => {
                const link = document.createElement('a');
                link.href = response.data.url;
                link.setAttribute('download', 'certificado.pdf');
                link.setAttribute('target', '_blank');
                document.body.appendChild(link);
                link.click();
            });
    }

    return (isAdminOrOwner) && (
        <div>
            {course?.isPaid &&
                <Button
                    justIcon
                    color="transparent"
                    aria-label="Comprar Curso"
                    onClick={() => setModalOrder(true)}
                >
                    {<AttachMoney/>}
                </Button>}

            {passedOnExam &&
                <Button
                    justIcon
                    color="transparent"
                    aria-label="Baixar Certificado"
                    onClick={() => exportCertificate()}
                >
                    {/*<a href={`/api/course/certificate/${courseId}`} download>*/}
                    {<PictureAsPdf/>}
                    {/*</a>*/}
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
            {modalOrder && <ModalOrder modalOrder={modalOrder} handleCloseModalOrder={handleCloseModalOrder}
                                               handleCourses={handleCourses} classes={classes} course={course} />}
        </div>
    );
}

CommonActionsCourse.propTypes = {};
