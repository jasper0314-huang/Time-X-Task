import React from "react";
import Img from "../img/x.png"

/*
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
*/

const todoItem = ({ assignment, deleteItem, completeItem }) => {
    const id = assignment.id;
    const isComplete = assignment.isComplete
    const deadline_display = assignment.deadline? (new Date(assignment.deadline)).toLocaleString() : "";
    return (
        <li className="todo-app__item" id={id + "_item"}>
            <div className="todo-app__checkbox">
                <input id={id + "_id"} type="checkbox" onClick={completeItem(id, isComplete)} checked={isComplete}></input>
                <label htmlFor={id + "_id"}></label>
            </div>
            <h3 className="todo-app__item-detail">
                <div id="item__assignment">{assignment.assignmentName}</div>
                <div id="item__deadline">{deadline_display}</div>
            </h3>
            <img src={Img} className="todo-app__item-x" id={id + "_img"} alt="X" onClick={deleteItem(id)}></img>
        </li>
    );
};

export default todoItem;