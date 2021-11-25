import React, {ButtonHTMLAttributes,  DetailedHTMLProps,} from "react";
import "../../App.css"


type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type PropsType = DefaultButtonPropsType &{
    children: string

    callBack:()=>void

}


const Button = React.memo( ({children, callBack,...restProps}:PropsType) => {





    return (
        <button onClick={callBack} {...restProps}>{children}</button>
    )
}
)

export default Button;