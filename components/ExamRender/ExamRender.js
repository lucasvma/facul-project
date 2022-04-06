import React, {useEffect, useState} from 'react';
// material-ui components
// @material-ui/icons
// core components
import Small from "../Typography/Small";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormControlLabel from "@material-ui/core/FormControlLabel";

async function readQuestion(exam) {
    const lines = exam.split('\n')
    const questions = []
    let question = {
        title: '',
        alternatives: []
    }

    await lines.forEach((line) => {
        if (line === "") {
            return;
        }
        if (line.substring(0, 3) === '---') {
            questions.push(question)
            question = {
                title: '',
                alternatives: []
            }
            return;
        }
        if (line.substring(0, 1) === '[') {
            if (line.substring(1, 2) === 'x') {
                question.alternatives.push({
                    text: line.substring(3),
                    isRight: true,
                    isChecked: false
                })
                return;
            }
            question.alternatives.push({
                text: line.substring(2),
                isRight: false,
                isChecked: false
            })
        } else {
            question.title = line
        }
    })
    return questions
}

async function checkResult(answers, template, minimumGrade) {
    let reachedGrade = 0
    answers.map((answer, index) => answer === template[index] ? reachedGrade += 1 : null)
    return reachedGrade >= minimumGrade
}

export default function ExamRender(props) {
    const [exam, setExam] = useState(null)
    const [template, setTemplate] = useState([])
    const [answers, setAnswers] = useState([])
    const minimumGrade = props.minimumGrade
    const [maxTime, setMaxTime] = useState(props.maxTime)

    useEffect(async () => {
        if (props.exam !== null) {
            const actualExam = await readQuestion(props.exam)
            setExam(actualExam)
            let returnedTemplate = []
            exam?.map((question, questionIndex) => {
                question.alternatives.map((alternative, alternativeIndex) => {
                    if (alternative.isRight) {
                        returnedTemplate[questionIndex] = alternativeIndex
                    }
                })
            })
            setTemplate(returnedTemplate)
        }
    }, [props.exam])

    const setAnswer = (answer, answersInThePosition) => {
        const newAnswers = answers
        newAnswers[answersInThePosition] = answer
        console.log('postion on', newAnswers)
        setAnswers(newAnswers)
        exam[answersInThePosition].alternatives[answer].isChecked = answers[answersInThePosition] === answer
    }

    const handleFinishExam = () => {
        return checkResult(answers, template, minimumGrade)
    }

    return exam === null
        ? <><p>Carregando exame...</p></>
        : (
            <>
                {exam.map((question, questionIndex) => (
                    <>
                        <h2>
                            <Small>{question.title}</Small>
                        </h2>
                        {question.alternatives.map((alternative, alternativeIndex) =>
                            (<>
                                <FormControlLabel
                                    control={
                                        <Radio
                                            defaultChecked={alternativeIndex === 0}
                                            checked={exam[questionIndex].alternatives[alternativeIndex].isChecked}
                                            onChange={() => setAnswer(alternativeIndex, questionIndex)}
                                            value={alternativeIndex}
                                            name={`alternative-${question.title}`}
                                            aria-label={`${question.title}`}
                                            icon={
                                                <FiberManualRecord className={props.classes.radioUnchecked}/>
                                            }
                                            checkedIcon={
                                                <FiberManualRecord className={props.classes.radioChecked}/>
                                            }
                                            classes={{
                                                checked: props.classes.radio,
                                                root: props.classes.radioRoot,
                                            }}
                                        />
                                    }
                                    classes={{
                                        label: props.classes.label,
                                        root: props.classes.labelRoot,
                                    }}
                                    label={alternative.text}
                                />
                                <br /></>)
                        )}
                    </>
                ))}
            </>
        )
}
