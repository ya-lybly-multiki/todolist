import React, {ButtonHTMLAttributes,  DetailedHTMLProps,} from "react";
import "./../App.css"


type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type PropsType = DefaultButtonPropsType &{
    name: string
    filter?: string
    callBack:()=>void
}


const Button = ({name, callBack,filter,...restProps}:PropsType) => {

    const Function = () => {
        callBack()
    }

    const classBtn = filter === name ? "active-filter" : ""

    return (
        <button
            className={classBtn} onClick={Function}>{name}</button>
    )
}


export default Button;