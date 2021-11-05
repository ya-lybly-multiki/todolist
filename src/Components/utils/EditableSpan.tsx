import React, {ChangeEvent, useState} from "react";

type PropsType = {
    title:string
}


export function EditableSpan ({title}:PropsType) {

    const [edit, setEdit] = useState<boolean>(false)
    const [newTitle,setNewTitle] = useState(title)

    const clicklSpan = () => {
       setEdit(true)
    }

    const addNewTitle = () => {
        setNewTitle(newTitle)
        setEdit(false)
    }

    const onChangeInput = (e:ChangeEvent<HTMLInputElement>) => {
      setNewTitle(e.currentTarget.value)
    }

    return ( edit
       ?   <input onChange={onChangeInput}
                  onBlur={addNewTitle}
                  value={newTitle} autoFocus/>
        :   <span onDoubleClick={clicklSpan}>{newTitle}</span>



    )
}