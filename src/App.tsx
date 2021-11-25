import React, {useCallback, useState} from "react";
import './App.css';
import {Todolist} from './Todolist';
import {Input} from "./Components/utils/Input";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./Store/Store";
import {addNewTodolistTasksAC} from "./Redux/TaskReducer";
import {
    addTodolistAC,
    todoListsType
} from "./Redux/TodolistReducer";
import {v1} from "uuid";
import Button from "./Components/utils/Button";

const App = () => {

    console.log("APP")

    const [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    let dispatch = useDispatch();

    let todolist = useSelector<RootReducerType, Array<todoListsType>>(state => state.todolist)


    const addTodolist = useCallback((title: string) => {
        let newTaskId = v1();
        if (title.trim() !== "") {
            dispatch(addTodolistAC(title, newTaskId))
            dispatch(addNewTodolistTasksAC(newTaskId))
            setTitle("")
            setError(null)

        } else {
            setError("Title is required")
        }
    },[dispatch])

    return (
        <div className="App">
            <div>
                <Input title={title} error={error}
                       setTitle={setTitle}
                       callBack={(title: string) => {addTodolist(title)}}/>
                <Button callBack={() => {
                    addTodolist(title)
                }} children={"+"}/>
            </div>

            {todolist.map(todolist => <Todolist key={todolist.id} todolistID={todolist.id}/>)}
        </div>
    );
}

export default App;
