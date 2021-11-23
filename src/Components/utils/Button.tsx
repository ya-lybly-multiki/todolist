import React, {ButtonHTMLAttributes,  DetailedHTMLProps,} from "react";
import "../../App.css"


type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type PropsType = DefaultButtonPropsType &{
    children: string
    filter?: string
    callBack:()=>void

}


const Button = ({children, callBack,filter,...restProps}:PropsType) => {



    const classBtn = filter === children ? "active-filter" : ""

    return (
        <button
            className={classBtn} onClick={callBack}>{children}</button>
    )
}


export default Button;