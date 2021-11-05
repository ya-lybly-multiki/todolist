import React from "react";
import './App.css';
import {Todolist} from './Todolist';
import {Input} from "./Components/Input";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./Store/Store";
import {addNewTodolistTasksAC} from "./Redux/TaskReducer";
import {
    addTodolistAC,
    todoListsType
} from "./Redux/TodolistReducer";
import {v1} from "uuid";

function App() {

    let dispatch=useDispatch();

    let todolist = useSelector<RootReducerType,Array<todoListsType>>(state => state.todolist)



    function addTodolist (title:string) {
        let newTaskId = v1();
        dispatch(addTodolistAC(title,newTaskId))
        dispatch(addNewTodolistTasksAC(newTaskId))

        }

    return (
        <div className="App">
        <div>
            <Input callBack={addTodolist} />
        </div>

            {todolist.map(todolist => <Todolist key={todolist.id} todolist={todolist}/>)}
        </div>
    );
}

export default App;
