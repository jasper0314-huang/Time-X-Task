import { useState } from "react";
import { useMutation } from '@apollo/react-hooks'
import Item from "./TodoItem"
import Button from "./TodoButton"
import "../style/TodoList.css"
import {
    CREATE_ASSIGNMENT_MUTATION,
    UPDATE_ASSIGNMENT_MUTATION,
    DELETE_ASSIGNMENT_MUTATION
} from "../../../graphql"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';

/*
"assignments": [
    {
        "id": "6006c1fc74a4fd4df4c3a7f4",
        "assignmentName": "Final Project",
        "deadline": "1992-10-09T00:00:00Z,
        "record": [],
        "status": null,
        "isComplete": null
    }
]
*/

const TodoList = ({ userID, projectID, assignments, timingFunc }) => {
    const [pages, setPages] = useState([
        {show: true, buttonName: "All"},
        {show: false, buttonName: "Progress"},
        {show: false, buttonName: "Trivial"},
        {show: false, buttonName: "Completed"},
    ]);
    const [date, setDate] = useState(undefined);
    const [createAssignment] = useMutation(CREATE_ASSIGNMENT_MUTATION)
    const [updateAssignment] = useMutation(UPDATE_ASSIGNMENT_MUTATION)
    const [deleteAssignment] = useMutation(DELETE_ASSIGNMENT_MUTATION)
    
    const date2Human = (date) => {
        if (date === undefined)
            return "";
        return date.toLocaleDateString();
    }

    const deleteItem = (id) => {
        return async (event) => {
            const reply = await deleteAssignment({
                variables: {
                    userID: userID,
                    assignmentID: id
                }
            })
            console.log(reply);
        }
    }

    const addItem__button = (event) => {
        const box = event.target.parentNode.parentNode;
        if (box.childNodes[0].value !== '') {
            const todo = box.childNodes[0].value;
            let time = box.childNodes[1].childNodes[1].value;
            let deadline;
            if (date !== undefined && time !== "") {
                const date_obj = new Date(date);
                deadline = (new Date(
                    date_obj.getFullYear(),
                    date_obj.getMonth(),
                    date_obj.getDate(),
                    parseInt(time.substring(0, 3)),
                    parseInt(time.substring(3))
                )).toISOString();
                console.log(deadline);
            } else {
                deadline = undefined;
            }

            createAssignment({
                variables: {
                    userID: userID,
                    data: {
                        projectID: projectID,
                        assignmentName: todo,
                        deadline: deadline
                    }
                }
            })

            box.childNodes[0].value = "";
            box.childNodes[1].childNodes[1].value = "";
            setDate(undefined);
        }
    }

    const completeItem = (id, isComplete) => {
        return async (event) => {
            await updateAssignment({
                variables: {
                    userID: userID,
                    assignmentID: id,
                    data: { isComplete: !isComplete }
                }
            })
        }
    }

    const filterRule = () => {

        const datefilter = (e) => {
            if (date === undefined || e.deadline === null)
                return true;
            // filter by date
            console.log("e.deadline", e.deadline)
            console.log("date", date)
            if (new Date(e.deadline).toLocaleDateString() === date.toLocaleDateString())
                return true;
            return false
        }

        const rules = {
            "All": e => (true && datefilter(e)),
            "Progress": e => ((!e.isComplete && e.deadline !== null) && datefilter(e)),
            "Trivial": e => ((!e.isComplete && e.deadline === null) && datefilter(e)),
            "Completed": e => (e.isComplete && datefilter(e)),
        }
        for (let page of pages) {
            if (page.show)
                return rules[page.buttonName];
        }
        return e => (true);

    }

    const changePage = (buttonNmae) => {
        return (event) => {
            let triggerIdx = pages.findIndex(e => (e.buttonName === buttonNmae));
            let newPages = JSON.parse(JSON.stringify(pages));
            for(let i=0; i<pages.length; ++i) newPages[i].show = false;
            newPages[triggerIdx].show = true;
            setPages(newPages);
        }
    }

    const deleteCompleted = async (event) => {
        for (let a of assignments) {
            if (a.isComplete)
                await deleteItem(a.id); 
        }
    }

    const resetTime = (event) => {
        let newPages = JSON.parse(JSON.stringify(pages));
        for(let i=0; i<pages.length; ++i) newPages[i].show = false;
        newPages[0].show = true;
        setPages(newPages);

        const formChildNodes = event.target.parentNode.childNodes;
        setDate(undefined);
        formChildNodes[1].value = "";
    }

    const calendarSetDate = (d) => {
        let newPages = JSON.parse(JSON.stringify(pages));
        for(let i=0; i<pages.length; ++i) newPages[i].show = false;
        newPages[1].show = true;
        setPages(newPages);
        setDate(d);
    }

    return (
        <div className="todolist__main">
            <div className="todo-app_box">
                <section className="todo-app__main">
                    <div className="todo-app__input__box">
                        { projectID ? (
                            <>
                                <input className="todo-app__input" id="todo-input-assignment"
                                // onKeyUp={addItem} 
                                placeholder="What needs to be done?"></input>

                                <form className="todo-app__form">
                                    <input className="todo-app__input" id="todo-input-deadline" readOnly={true}
                                    placeholder="(no deadline)" value={date===undefined? null : date2Human(date)}></input>
                                    <input className="todo-app__input" id="todo-input-clocktime" type="time"></input>
                                    <input type="reset" value="Reset" onClick={resetTime} ></input>
                                    <input type="button" value="Enter" onClick={addItem__button} ></input>
                                </form>
                            </>
                        ) : (
                            <div> </div>
                        ) }
                    </div>
                    <ul className="todo-app__list" id="todo-list">
                        {
                            assignments.filter(filterRule()).sort((a, b) => {
                                return a.deadline? (a.deadline > b.deadline)? 1 : ((a.deadline < b.deadline)? -1 : 0) : -1;
                            }).map(e => (
                                <div>
                                    <Item
                                        assignment={e}
                                        deleteItem={deleteItem}
                                        completeItem={completeItem}
                                        timingFunc={timingFunc}
                                        showClock={projectID !== null}
                                    />
                                </div>
                            )) 
                        }
                    </ul>
                </section>
                    <footer className="todo-app__footer" id="todo-footer">
                        <div className="todo-app__total" id="todo-total">{assignments.length} left</div>
                        <ul className="todo-app__view-buttons" id="todo-view">
                            { pages.map(e => <Button buttonName={e.buttonName} show={e.show} changePage={changePage} />) }
                        </ul>
                        <div className="todo-app__clean" id="clear_completed_button">
                            <button onClick={deleteCompleted}>Clear completed</button>
                        </div>
                    </footer>
            </div>
            <div className="calendar__box">
                <Calendar
                    onChange={calendarSetDate}
                    value={date}
                />
            </div>
        </div>
    );
}

export default TodoList;