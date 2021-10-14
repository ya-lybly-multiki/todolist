import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export  type todolistsType = { id: string, title: string, filter: FilterValuesType };
type TaskType={[key:string]: Array<TaskType>}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
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
    });


    function removeTask(todolistID: string, id: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== id)})

        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
    }

    function addTask(todolistID: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks,[todolistID]:[...tasks[todolistID],task]})
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    function changeStatus(todolistID: string,taskId: string, isDone: boolean) {
        setTasks({...tasks,[todolistID]:tasks[todolistID].map(m=>m.id===taskId ? {...m,isDone: isDone} : m)})
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // setTasks([...tasks]);
    }

    function removeTodolist (todolistID: string) {
        setTodolists(todolists.filter(t => t.id !== todolistID))
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        // console.log(todolistID)
        // setFilter(value);
        setTodolists(todolists.map(m => m.id === todolistID ? {...m, filter: value} : m))
    }


    return (
        <div className="App">
            {todolists.map(m => {
                let tasksForTodolist = tasks[m.id];

                if (m.filter === "active") {
                    tasksForTodolist = tasks[m.id].filter(t => !t.isDone);
                }
                if (m.filter === "completed") {
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone);
                }
                return (
                    <Todolist
                        key={m.id}
                        todolistID={m.id}
                        title="What to learn"
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={m.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}

        </div>
    );
}

export default App;
