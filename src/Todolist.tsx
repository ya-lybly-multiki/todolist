import React, {ChangeEvent, useState} from 'react';

import Button from "./Components/utils/Button";

import {Input} from "./Components/utils/Input";
import {changeFilterAC, FilterValuesType, removeTodolistAC, todoListsType} from "./Redux/TodolistReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./Store/Store";
import {addTaskAC, changeStatusAC, removeTaskAC,} from "./Redux/TaskReducer";
import {EditableSpan} from "./Components/utils/EditableSpan";
import {Task} from "./Components/Task/Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
}


export function Todolist({todolistID}: PropsType) {

    let [error, setError] = useState<string | null>(null)
    const [title, setTitle] = useState("")

    let dispatch = useDispatch();

    const todo = useSelector<RootReducerType, todoListsType>(state => state.todolist.filter(t => t.id === todolistID)[0])
    const tasks = useSelector<RootReducerType, Array<TaskType>>(state => state.tasks[todolistID])

    let allTodoListTasks = tasks;
    let tasksForTodolist = allTodoListTasks;

    if (todo.filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (todo.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }


    const addTaskHandlerForAddTitle = (title: string) => {
        if (title.trim() !== "") {
            dispatch(addTaskAC(todolistID, title))
            setTitle("")
            setError(null)
        } else {
            setError("Title is required")
        }
    }
    const tsarFoo = (value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistID, value))
    }

    return <div>
        <h3>
            <EditableSpan title={title}/>
        </h3>

        <Button callBack={() => { dispatch(removeTodolistAC(todolistID))}} children={"x"}/>
        <Input error={error} title={title} setTitle={setTitle} callBack={(title: string) => {
            addTaskHandlerForAddTitle(title)
        }}/>
        <Button  callBack={() => {
            addTaskHandlerForAddTitle(title)}} children={"+"}/>
        <ul>
            {
                tasksForTodolist.map(t => {
                    return <Task
                        id={t.id}
                        isDone={t.isDone}
                        title={t.title}
                        onClickHandlerForRemove={(tId) => {
                            dispatch(removeTaskAC(todolistID, tId))}}
                        key={t.id}
                        checkedFunc={(e) => {
                            dispatch(changeStatusAC(todolistID, t.id, e.currentTarget.checked))
                        }}/>
                })
            }
        </ul>
        <div>

            <Button callBack={() => tsarFoo("all")} children={"all"} filter={todo.filter}/>
            <Button callBack={() => tsarFoo("active")} children={"active"} filter={todo.filter}/>
            <Button callBack={() => tsarFoo("completed")} children={"completed"} filter={todo.filter}/>
        </div>
    </div>
}
