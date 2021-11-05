import React, {ChangeEvent} from 'react';

import Button from "./Components/Button";

import {Input} from "./Components/Input";
import {changeFilterAC, FilterValuesType, removeTodolistAC, todoListsType} from "./Redux/TodolistReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./Store/Store";
import {addTaskAC, changeStatusAC, removeTaskAC, } from "./Redux/TaskReducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist:todoListsType
}


export function Todolist({todolist}:PropsType) {
    let dispatch=useDispatch();

    const tasks = useSelector<RootReducerType, Array<TaskType>>(state => state.tasks[todolist.id])
    let tasksForTodolist = [...tasks];

    if (todolist.filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }
    const addTaskHandlerForAddTitle = (title:string) => {
        addTask(todolist.id,title)
    }

    const tsarFoo = (value: FilterValuesType) => {
        changeFilter(todolist.id,value)
    }


    function removeTask(todolistID: string, id: string) {
        dispatch(removeTaskAC(todolistID,id))

    }

    function addTask(todolistID: string, title: string) {
        dispatch(addTaskAC(todolistID,title))

    }

    function changeStatus(todolistID: string,taskId: string, isDone: boolean) {
        dispatch(changeStatusAC(todolistID,taskId,isDone))

    }

    function removeTodolist (todolistID: string) {
        dispatch(removeTodolistAC(todolistID))
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {

        dispatch(changeFilterAC(todolistID,value))
    }

    const onClickHandlerForRemove = (tId:string) => removeTask(todolist.id, tId)

    const removeTodolistBtn = () => removeTodolist(todolist.id)

    return <div>
        <h3>{todolist.title}</h3>

        <Button callBack={removeTodolistBtn} name={"x"}/>
        <Input callBack={addTaskHandlerForAddTitle}/>
        <ul>
            {
                tasksForTodolist.map(t => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeStatus(todolist.id,t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button  callBack={()=>onClickHandlerForRemove(t.id)} name={"X"}/>

                    </li>
                })
            }
        </ul>
        <div>

            <Button callBack={() => tsarFoo("all")} name={"all"} filter={todolist.filter} />
            <Button callBack={() => tsarFoo("active")} name={"active"} filter={todolist.filter} />
            <Button callBack={() => tsarFoo("completed")} name={"completed"}  filter={todolist.filter} />
        </div>
    </div>
}
