import React, { useState } from 'react';
import TodoList from "./TodoList/TodoList"
import Calendar from "./Calendar/Calendar"
import LinkBar from "./LinkBar/LinkBar"
import Record from "./Record/Record"
import "./style/Ball.css"
import 'react-calendar/dist/Calendar.css';

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

    const [value, onChange] = useState(new Date());

    return (
        <>
        <h1>{project.projectName}</h1>
        <div className="outside__box">
            <div className="inside__box1">
                <div className="todolist__root">
                    <TodoList
                        userID={userID}
                        projectID={project.id}
                        assignments={project.assignments} 
                    />
                </div>
                <div className="calendar__root">
                    <Calendar
                        onChange={onChange}
                        value={value}
                    />
                </div>
            </div>
            <div className="record__root">
                <Record />
            </div>
            <div className="linkbar__root">
                <LinkBar links={project.links} />
            </div>
        </div>
        </>
    )
};

export default Ball;