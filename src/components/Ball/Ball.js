import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks'
import TodoList from "./TodoList/TodoList"
import LinkBar from "./LinkBar/LinkBar"
import Record from "./Record/Record"
import "./style/Ball.css"
import 'react-calendar/dist/Calendar.css';
import {
    CREATE_RECORD_MUTATION
} from "../../graphql"

import ReactStopwatchTimer from "../timer/ReactTimerStopwatch";
import { set } from 'mongoose';

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
            "records": [{
                "startAt": "",
                "duration": 10
            }],
            "status": null,
            "isComplete": null
        }
    ]
}
*/

const Ball = ({ userID, project }) => {
    const [timing, setTiming] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [createRecord] = useMutation(CREATE_RECORD_MUTATION)
    const [intervalId, setintervalId] = useState(0);
    const [timingNode, settimingNode] = useState(null);

    const timingFunc = (assignmentID) => {
        return async (event) => {
            if (event.target.id === assignmentID + "_img")
                return;
            if (timing) {
                timingNode.style.backgroundColor = "white";
                settimingNode(null);
                // mutation
                const duration = parseInt((Date.now() - startTime) / 1000);
                const ISO = (new Date(startTime)).toISOString();

                createRecord({
                    variables: {
                        userID: userID,
                        data: {
                            assignmentID: assignmentID,
                            startAt: ISO,
                            duration: duration
                        }
                    }
                })

                setTiming(false);
            } else {
                const node = document.getElementById(assignmentID + "_item");
                node.style.backgroundColor = "red";
                settimingNode(node);
                setStartTime(Date.now());
                setTiming(true);
            }
        }
    }

    const project2records = (project) => {
        let ret  = [];
        for (let assign of project.assignments) {
            for (let record of assign.records) {
                ret.push({
                    "assignmentName": assign.assignmentName,
                    "startAt": record.startAt,
                    "duration": record.duration
                })
            }
        }
        return ret;
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
                            isOn={timing}
                            className="react-stopwatch-timer__table"
                            watchType="stopwatch"
                            displayCircle={true} 
                            color="gray" 
                            hintColor="red" 
                            setintervalId={setintervalId}
                        />
                    ) : (
                        <Record records={project2records(project)} />
                    )
                }
                </div>

                <div className="linkbar__root">
                    <LinkBar links={project.links} userID={userID} projectID={project.id} />
                </div>
            </div>
        </div>
        </>
    )
};

export default Ball;