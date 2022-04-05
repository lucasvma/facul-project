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
                    isRight: true
                })
                return;
            }
            question.alternatives.push({
                text: line.substring(2),
                isRight: false
            })
        } else {
            question.title = line
        }
    })
    console.log('questions', questions)
    return questions
}

export default function ExamRender(props) {
    const [exam, setExam] = useState(null)
    const [minimumGrade, setMinimumGrade] = useState(props.minimumGrade)
    const [maxTime, setMaxTime] = useState(props.maxTime)

    useEffect(async () => {
        if (props.exam !== '') {
            const actualExam = await readQuestion(props.exam)
            setExam(actualExam)
        }
    }, [props.exam])

    return exam === null
        ? <><p>Não há alternativas</p></>
        : (
            <>
                {exam.map((question) => (
                    <>
                        <h2>
                            <Small>{question.title}</Small>
                        </h2>
                        {question.alternatives.map((alternative) =>
                            (<>
                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={false}
                                            // onChange={() => setSelectedEnabled("a")}
                                            value="a"
                                            name={`alternative-${question.title}`}
                                            aria-label="A"
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
