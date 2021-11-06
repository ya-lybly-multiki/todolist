import React, {ChangeEvent, KeyboardEvent} from "react";
import "../../App.css"


type PropsType = {
    title:string
    setTitle:(title:string)=>void
    callBack:(title:string)=>void
    error:string | null
}

export function Input({setTitle,title,error,...props}: PropsType) {




    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13 ) {
            props.callBack(title)
        }
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            {error && <div className="error-message">{error}</div>}

        </div>

    )
}