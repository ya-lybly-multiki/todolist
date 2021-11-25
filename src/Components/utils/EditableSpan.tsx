import React, {ChangeEvent, useState} from "react";

type PropsType = {
    title:string
}


export const EditableSpan = React.memo( ({title}:PropsType) => {

    console.log("lol")

    const [edit, setEdit] = useState<boolean>(false)
    const [newTitle,setNewTitle] = useState(title)

    const clickSpan = () => {
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
        :   <span onDoubleClick={clickSpan}>{newTitle}</span>



    )
})