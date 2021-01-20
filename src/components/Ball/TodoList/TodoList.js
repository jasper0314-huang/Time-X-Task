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
import Img from "../img/x.png"
import { even } from "check-types";

/*
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
*/

const TodoList = ({ userID, projectID, assignments }) => {
    const [pages, setPages] = useState([
        {show: true, buttonName: "All"},
        {show: false, buttonName: "Active"},
        {show: false, buttonName: "Completed"},
    ]);
    const [value, setValue] = useState();
    const [createAssignment] = useMutation(CREATE_ASSIGNMENT_MUTATION)
    const [updateAssignment] = useMutation(UPDATE_ASSIGNMENT_MUTATION)
    const [deleteAssignment] = useMutation(DELETE_ASSIGNMENT_MUTATION)
    
    const date2Human = (date) => {
        if (date === undefined)
            return "";
        return date.toLocaleDateString();
    }

    const deleteItem = (id, reload=true) => {
        return async (event) => {
            const reply = await deleteAssignment({
                variables: {
                    assignmentID: id
                }
            })
            console.log(reply);

            // can be replace by subscribe
            if (reload)
                window.location.reload();
        }
    }

    const addItem = (event) => {
        if(event.keyCode === 13 && event.target.value !== '') {
            const todo = event.target.value;
            let time = event.target.parentNode.childNodes[2].value;
            if (time === undefined)
                time = "";
            
            console.log(todo);
            console.log(value);
            console.log(time);

            // createAssignment({
            //     variables: {
            //         userID,
            //         projectID,
            //         assignmentName: todo
            //     }
            // })

            // // can be replace by subscribe
            // window.location.reload();

            event.target.value = '';
            event.target.parentNode.childNodes[2].value = "";
            setValue("");
        }
    }

    const completeItem = (id, isComplete) => {
        return async (event) => {
            console.log(id, isComplete)
            await updateAssignment({
                variables: {
                    assignmentID: id,
                    data: { isComplete: !isComplete }
                }
            })
            // can be replace by subscribe
            window.location.reload();
        }
    }

    const filterRule = () => {
        if(pages[0].show) return (e => (true));
        else if(pages[1].show) return (e => (!e.isComplete));
        else return (e => (e.isComplete));
    }

    const changePage = (buttonNmae) => {
        return (event) => {
            let triggerIdx = pages.findIndex(e => (e.buttonName === buttonNmae));
            let newPages = JSON.parse(JSON.stringify(pages));
            for(let i=0; i<3; ++i) newPages[i].show = false;
            newPages[triggerIdx].show = true;
            setPages(newPages);
        }
    }

    const deleteCompleted = async (event) => {
        for (let a of assignments) {
            if (a.isComplete)
                await deleteItem(a.id, false); 
        }
        // can be replace by subscribe
        window.location.reload();
    }

    const resetTime = (event) => {
        const formChildNodes = event.target.parentNode.childNodes;
        setValue("");
        formChildNodes[1].value = "";
    }

    return (
        <div className="todolist__main">
            <div className="todo-app_box">
                <section className="todo-app__main">
                    <div className="todo-app__input__box">
                        <input className="todo-app__input" id="todo-input-assignment" onKeyUp={addItem} 
                        placeholder="What needs to be done?"></input>
                        <form className="todo-app__form">
                            <input className="todo-app__input" id="todo-input-deadline" readOnly={true}
                            placeholder="(no deadline)" value={value===""? null : date2Human(value)}></input>
                            <input className="todo-app__input" id="todo-input-clocktime" type="time"></input>
                            <input type="reset" value="Reset" onClick={resetTime} ></input>
                        </form>
                    </div>
                    <ul className="todo-app__list" id="todo-list">
                        {
                            assignments.filter(filterRule()).map(e => 
                            <Item 
                                assignment={e}
                                deleteItem={deleteItem}
                                completeItem={completeItem}
                            />) 
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
                    onChange={setValue}
                    value={value}
                />
            </div>
        </div>
    );
}

export default TodoList;