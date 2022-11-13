import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type todolistsType = {
    id:string
    title: string
    filter: FilterValuesType
}

function App() {
    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });



    function removeTask(todoListId:string, id: string) {
        setTasks({...tasks,[todoListId]:tasks[todoListId].filter(t => t.id != id)});
    }

    function addTask(todoListId:string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks,[todoListId]:[task,...tasks[todoListId]] });
    }

    function changeStatus(todoListId:string, taskId: string, isDone: boolean) {
        console.log(todoListId)
        setTasks({...tasks,[todoListId]:tasks[todoListId].map(el => el.id === taskId ? {...el, isDone} : el)})
    }


     function changeFilter( todoListId: string, value: FilterValuesType) {
        setTodolists(todolists.map(filtered => filtered.id === todoListId ? {...filtered, filter:value} : filtered))
    }


    return (
        <div className="App">

            {
                todolists.map(el => {
                    let tasksForTodolist = tasks[el.id];
                    if (el.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                    }
                    if (el.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                    }


                    return(
                        <Todolist key={el.id}
                                  todoListId={el.id}
                                  title={el.title}
                                  tasks={tasksForTodolist}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeStatus}
                                  filter={el.filter}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;
