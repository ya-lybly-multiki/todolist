import React, {ChangeEvent} from "react";
import {EditableSpan} from "../utils/EditableSpan";
import Button from "../utils/Button";

type PropsType = {
    checkedFunc:(e: ChangeEvent<HTMLInputElement>)=> void
    title:string
    onClickHandlerForRemove:(tId:string)=>void
    id:string
    isDone:boolean

}


export function Task ({checkedFunc,onClickHandlerForRemove,title,id,isDone}:PropsType) {

    return (
        <li>
            <input type={"checkbox"} checked={isDone} onChange={checkedFunc}/>
            <EditableSpan title={title}/>
            <Button  callBack={()=>onClickHandlerForRemove(id)} name={"X"}/>
        </li>
    )
}