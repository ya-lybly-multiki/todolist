import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
export  type todoListsType = { id: string, title: string, filter: FilterValuesType };

export let todolistID1 = v1();
export let todolistID2 = v1();



let initialState: Array<todoListsType> = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export function TodolistReducer (state = initialState, action:ActionsType): Array<todoListsType> {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(t => t.id !== action.todolistID)
        }
        case "CHANGE-FILTER": {
            return state.map(m => m.id === action.todolistID ? {...m, filter: action.value} : m)
        }
        case "ADD-TODOLIST": {

            return  [{id: action.newId, title: action.title, filter: 'all'},...state]

        } default: return state


    }
}


export type ActionsType = removeTodolistType | changeFilterACType | addTodolistACType

type removeTodolistType = ReturnType<typeof removeTodolistAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>
type addTodolistACType = ReturnType<typeof addTodolistAC>

export const removeTodolistAC = (todolistID: string) => {
  return {
      type:"REMOVE-TODOLIST",
      todolistID:todolistID
  } as const
}

export const changeFilterAC = (todolistID: string, value: FilterValuesType) => {
   return {
       type: "CHANGE-FILTER",
       todolistID,
       value
   } as const
}

export const addTodolistAC = (title:string,newId:string) => {
  return {
      type: "ADD-TODOLIST",
      title,
      newId
  } as const
}

