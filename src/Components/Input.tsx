import React, {ChangeEvent, KeyboardEvent} from "react";

type PropsType = {
    title: string
    setTitle:(title:string) => void
    addTask: () => void
    todolistID:string
}

export function Input (props:PropsType) {



    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        // setError(null);
        if (e.charCode === 13) {
            props.addTask()
        }
    }

    return (

            <input value={props.title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   // className={error ? "error" : ""}
            />

    )
}