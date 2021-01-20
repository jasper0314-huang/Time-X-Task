import React, { useState } from 'react';
import TodoList from "./TodoList/TodoList"
import LinkBar from "./LinkBar/LinkBar"
import Record from "./Record/Record"
import "./style/Ball.css"
import 'react-calendar/dist/Calendar.css';

import ReactStopwatchTimer from "../timer/ReactTimerStopwatch";

/*
{
    "id": "6006c18a74a4fd4df4c3a7f2",
    "projectName": "DSP",
    "links": [
        "https://cool.ntu.edu.tw",
        "https://ceiba.ntu.edu.tw"
    ],
    "assignments": [
        {
            "id": "6006c1fc74a4fd4df4c3a7f4",
            "assignmentName": "Final Project",
            "deadline": {
                "day": 9,
                "month": 10,
                "year": 1992,
                "hour": 0,
                "minute": 0,
                "second": 0,
                "formatted": "1992-10-09T00:00:00Z"
            },
            "record": [],
            "status": null,
            "isComplete": null
        }
    ]
}
*/

const Ball = ({ userID, project }) => {
    const fromTime = new Date(0, 0, 0, 0, 0, 0, 0);
    const [timing, setTiming] = useState(false);

    const timingFunc = (assignmentID) => {
        return (event) => {
            if (timing) {
                setTiming(false);
            } else {
                setTiming(true);
            }
        }
    }

    return (
        <>
        <h1>{project.projectName}</h1>
        <div className="outside__box">
            <div className="todolist__root">
                <TodoList
                    userID={userID}
                    projectID={project.id}
                    assignments={project.assignments}
                    timingFunc={timingFunc}
                />
            </div>

            <div className="inside__box">
                <div className="record__root"> 
                {
                    timing? (
                        <ReactStopwatchTimer
                            isOn={true}
                            className="react-stopwatch-timer__table"
                            watchType="stopwatch"
                            displayCircle={true} 
                            color="gray" 
                            hintColor="red" 
                            fromTime={fromTime}
                        />
                    ) : (
                        <Record />
                    )
                }
                </div>

                <div className="linkbar__root">
                    <LinkBar links={project.links} />
                </div>
            </div>
        </div>
        </>
    )
};

export default Ball;