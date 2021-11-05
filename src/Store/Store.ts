import {combineReducers, createStore} from "redux";
import {TaskReducer} from "../Redux/TaskReducer";
import {TodolistReducer} from "../Redux/TodolistReducer";


export type RootReducerType = ReturnType<typeof RootReducer>

let RootReducer = combineReducers({
    todolist:TodolistReducer,
    tasks:TaskReducer
})



export let store = createStore(RootReducer)

