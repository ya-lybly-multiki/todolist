import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';
import Button from "./Components/Button";
import {InputWithButton} from "./Components/InputWithButton";
import {Input} from "./Components/Input";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID:string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID:string,taskId: string) => void
    changeFilter: (todolistID: string,value: FilterValuesType) => void
    addTask: (todolistID: string,title: string) => void
    changeTaskStatus: (todolistID: string,taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)


    const addTaskHandlerForAddTitle = () => {
        props.addTask(props.todolistID, title)
    }

    const tsarFoo = (value: FilterValuesType) => {
        props.changeFilter(props.todolistID,value)
    }

    const addTaskForEnter = () => {
      props.addTask(props.todolistID, title)
    }

    const onClickHandlerForRemove = (tId:string) => props.removeTask(props.todolistID, tId)

    const removeTodolistBtn = () => props.removeTodolist(props.todolistID)

    return <div>
        <h3>{props.title}</h3>
        <Button  callBack={removeTodolistBtn} name={"X"}/>
        <Input title={title} setTitle={setTitle} addTask={addTaskForEnter} todolistID={props.todolistID}/>
        <Button callBack={addTaskHandlerForAddTitle} name={"+"}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID,t.id, e.currentTarget.checked);
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

            <Button callBack={() => tsarFoo("all")} name={"all"} filter={props.filter} />
            <Button callBack={() => tsarFoo("active")} name={"active"} filter={props.filter} />
            <Button callBack={() => tsarFoo("completed")} name={"completed"}  filter={props.filter} />
        </div>
    </div>
}
