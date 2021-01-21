import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks'
import TodoList from "./TodoList/TodoList"
import LinkBar from "./LinkBar/LinkBar"
import Record from "./Record/Record"
import "./style/Ball.css"
import 'react-calendar/dist/Calendar.css';
import MyPie from "./MyPie"


const GlobalBall = ({ user }) => {
    
    const data2records = (user) => {
        let ret  = [];
        for (let project of user.projects) {
            for (let assign of project.assignments) {
                for (let record of assign.records) {
                    ret.push({
                        "assignmentName": assign.assignmentName,
                        "startAt": record.startAt,
                        "duration": record.duration
                    })
                }
            }
        }
        return ret;
    }

    const data2stat = (user) => {
        let ret = [];
        for (let project of user.projects) {
            let project_time = 0;
            for (let assign of project.assignments) {
                for (let record of assign.records) {
                    project_time += record.duration;
                }
            }
            ret.push({
                name: project.projectName,
                value: project_time
            })
        }
        return ret;
    }


    return (
        <>
        <h1>{user.userName}</h1>
        <div className="outside__box">
            <div className="todolist__root">
                {/* <TodoList
                    userID={userID}
                    projectID={project.id}
                    assignments={project.assignments}
                    timingFunc={timingFunc}
                /> */}
            </div>

            <div className="inside__box">
                <div className="record__root"> 
                    <Record records={data2records(user)} />
                </div>

                <div className="linkbar__root">
                    <MyPie data={data2stat(user)}/>
                </div>
            </div>
            <div>
            </div>
        </div>
        </>
    )
};

export default GlobalBall;