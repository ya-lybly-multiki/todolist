import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../utils/EditableSpan";
import Button from "../utils/Button";
import {useDispatch} from "react-redux";
import {changeStatusAC, removeTaskAC} from "../../Redux/TaskReducer";
import {TaskType} from "../../Todolist";

type PropsType = {

    todolistId:string
    task:TaskType
}


export const Task = React.memo( ({todolistId,task}:PropsType) => {
    console.log("lol")

    const dispatch = useDispatch()



    const changeStatus = useCallback( (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(changeStatusAC(todolistId,task.id,e.currentTarget.checked))
    },[dispatch,todolistId,task.id])

    const onClickHandlerForRemove = useCallback (() => {
        dispatch(removeTaskAC(todolistId,task.id))
    },[dispatch,todolistId,task.id])



    return (
        <li>
            <input type={"checkbox"} checked={task.isDone} onChange={changeStatus}/>
            <EditableSpan title={task.title}/>
            <Button  callBack={onClickHandlerForRemove} children={"X"}/>
        </li>
    )
})