import React from "react";
import "./../App.css"

type PropsType = {
    callBack: () => void
    name: string
    filter?: string

}


const Button = (props:PropsType) => {
    
    const onClickHandler = () => {
      props.callBack()
    }
    
    return (
        <button  className={props.filter === props.name ? "active-filter" : ""}
            onClick={onClickHandler}>{props.name}</button>
    )
}

export default Button;