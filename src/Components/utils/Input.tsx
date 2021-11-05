import React, {ChangeEvent, KeyboardEvent, useState} from "react";


type PropsType = {
    title?:string
    setTitle:(title:string)=>void
}

export function Input({setTitle,title}: PropsType) {


    let [error, setError] = useState<string | null>(null)



    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        if (e.charCode === 13) {
            // addTask();
        }
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />


        </div>

    )
}