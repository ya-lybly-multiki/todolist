import React, { useCallback, useState} from 'react';

import Button from "./Components/utils/Button";

import {Input} from "./Components/utils/Input";
import {changeFilterAC, FilterValuesType, removeTodolistAC, todoListsType} from "./Redux/TodolistReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./Store/Store";
import {addTaskAC} from "./Redux/TaskReducer";
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


export const Todolist = React.memo( ({todolistID}: PropsType) => {

    console.log("todolist")

    let [error, setError] = useState<string | null>(null)
    const [title, setTitle] = useState("")

    let dispatch = useDispatch();

    const todo = useSelector<RootReducerType, todoListsType>(state => state.todolist.filter(t => t.id === todolistID)[0])
    const tasks = useSelector<RootReducerType, Array<TaskType>>(state => state.tasks[todolistID])





    const addTaskHandlerForAddTitle = useCallback ((title: string) => {
        if (title.trim() !== "") {
            dispatch(addTaskAC(todolistID, title))
            setTitle("")
            setError(null)
        } else {
            setError("Title is required")
        }
    },[dispatch,todolistID])

    const tsarFoo = useCallback ((value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistID, value))
    },[dispatch,todolistID])


    const addTaskForTitle = useCallback (() => {
        addTaskHandlerForAddTitle(title)
    },[title,addTaskHandlerForAddTitle])


    const classNameBtn = useCallback((value: FilterValuesType) => {
        if (todo.filter === value) {
            return "active-filter"
        } else {
            return ""
        }
    }, [todo.filter])

    let tasksForTodolist = [...tasks];

    if (todo.filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (todo.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    return <div>
        <h3>
            <EditableSpan title={todo.title}/>
        </h3>

        <Button callBack={() => { dispatch(removeTodolistAC(todolistID))}} children={"x"}/>
        <Input error={error} title={title} setTitle={setTitle} callBack={addTaskForTitle}/>
        <Button  callBack={() => {
            addTaskHandlerForAddTitle(title)}} children={"+"}/>
        <ul>
            {
                tasksForTodolist.map(task => {
                    return <Task
                        task={task}
                        todolistId={todolistID}
                        key={task.id}
                       />
                })
            }
        </ul>
        <div>

            <Button callBack={() => tsarFoo("all")}
                    children={"all"}
                    className={classNameBtn('all')}/>
            <Button
                className={classNameBtn('active')}
                callBack={() => tsarFoo("active")} children={"active"} />
            <Button
                className={classNameBtn('completed')}
                callBack={() => tsarFoo("completed")} children={"completed"} />
        </div>
    </div>
})
