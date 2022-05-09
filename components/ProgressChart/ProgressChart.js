import {Doughnut} from "react-chartjs-2";
import React, {useEffect, useState} from "react";
import axios from "axios";

const defaultData = {
    labels: [
        'Green',
        'Gray',
    ],
    datasets: [{
        data: [0, 100],
        backgroundColor: [
            '#388e3c',
            '#999999',
        ],
        hoverBackgroundColor: [
            '#388e3c',
            '#999999',
        ]
    }],
    text: '23%',
}

export default function ProgressChart({ courseId, classesCourseLength }) {
    const [classCourseProgress, setClassCourseProgress] = useState(undefined)
    const [chartData, setChartData] = useState(defaultData)

    useEffect(async () => {
        await axios.get(`/api/course/progress/${courseId}`)
            .then(async (response) => {
                const courseProgress = response.data?.classCourseProgress

                if (courseProgress !== undefined) {
                    setClassCourseProgress(response.data.classCourseProgress)
                }
            })
    }, [])

    useEffect(async () => {
        let changedChartData = defaultData

        if (classCourseProgress?.isComplete === 1) {
            changedChartData.datasets[0].data = [100, 0]
        } else if (classCourseProgress?.currentProgress + 1 === classesCourseLength) {
            changedChartData.datasets[0].data = [90, 10]
        } else {
            let green = ((classCourseProgress?.currentProgress + 1) * 100) / classesCourseLength
            let gray = 100 - green
            changedChartData.datasets[0].data = [green, gray]
        }

        setChartData(changedChartData)
    }, [classCourseProgress])

    return (
        <div style={{ width: "30px" }}>
            <Doughnut
                type="doughnut"
                data={chartData}
                width={30}
                height={30}
                options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    cutoutPercentage: 50,
                    elements: {
                        center: {
                            text: '1%',
                            fontStyle: 'Arial',
                        }
                    }
                }}
            />
        </div>
    )
}
