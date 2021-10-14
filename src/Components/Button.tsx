import React from "react";

type PropsType = {
    callBack: () => void
    name: string
}


const Button = (props:PropsType) => {
    
    const onClickHandler = () => {
      props.callBack()
    }
    
    return (
        <button onClick={onClickHandler}>{props.name}</button>
    )
}

export default Button;