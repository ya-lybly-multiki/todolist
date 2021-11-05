
import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {todolistID1, todolistID2} from "./TodolistReducer";

export type TaskStateType=
    {[key:string]: Array<TaskType>}


let initialState:TaskStateType = {
    [todolistID1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: "HTML&CSS2", isDone: true},
        {id: v1(), title: "JS2", isDone: true},
        {id: v1(), title: "ReactJS2", isDone: false},
        {id: v1(), title: "Rest API2", isDone: false},
        {id: v1(), title: "GraphQL2", isDone: false},
    ]
};

export function TaskReducer (state = initialState, action:ActionsType) {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state,
                [action.todolistID]:
                    state[action.todolistID].filter(f => f.id !== action.id)}
        }
        case "ADD-TASK": {
            let task = { id: v1(), title: action.title, isDone: false}
            return {...state,
            [action.todolistID]: [task,...state[action.todolistID]]
            }
        }
        case "CHANGE-STATUS": {
            return {...state,
            [action.todolistID]: state[action.todolistID].
            map(m => m.id === action.taskId ? {...m, isDone:action.isDone} : m)
            }
        }
        case "ADD-NEW-TODOLIST-TASKS": {
            return {
                ...state,
                [action.id] : []
            }
        } default: return state
    }
}

export type ActionsType =
    removeTaskACType |
    addTaskACType |
    changeStatusACType |
    addNewTodolistTasksACType

type addTaskACType = ReturnType<typeof addTaskAC>
type removeTaskACType = ReturnType<typeof removeTaskAC>
type changeStatusACType = ReturnType<typeof changeStatusAC>
type addNewTodolistTasksACType = ReturnType<typeof addNewTodolistTasksAC>

export const removeTaskAC = (todolistID: string, id: string) => {
  return {
      type: "REMOVE-TASK",
      todolistID:todolistID,
      id:id
  } as const
}

export const addTaskAC = (todolistID: string, title: string) => {
   return {
       type: "ADD-TASK",
       todolistID,
       title
   } as const
}

export const changeStatusAC = (todolistID: string,taskId: string, isDone: boolean) => {
   return {
       type: "CHANGE-STATUS",
       todolistID,
       taskId,
       isDone
   } as const
}

export const addNewTodolistTasksAC = (id:string) => {
    return {
        type: "ADD-NEW-TODOLIST-TASKS",
        id
    } as const
}

