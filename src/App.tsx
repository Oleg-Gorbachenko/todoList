import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./Components/TodoList";
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todolistId:string]: Array<TaskType>
}
export function App() {
    const todoListId1 = v1()
    const todoListId2 = v1()
    //хуки
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Apples', isDone: false},
            {id: v1(), title: 'Chocolate', isDone: false},
        ]
    })
    //функции
    const addTask = (title: string, todolistId: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let a = tasks[todolistId]
        tasks[todolistId] = [newTask, ...a]
        setTasks({...tasks})
    }
    const removeTask = (id: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)})
    }
    const changeStatus = (checked: boolean, taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: checked} : el)})
    }
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let todolist = todoLists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value;
            setTodoLists([...todoLists])
        }
    }
    const removeTodolist = (todolistId: string) => {
        let filteredTodolist = todoLists.filter(tl=> tl.id!==todolistId)
        setTodoLists(filteredTodolist)
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todoLists.map((tl) => {
                //условие фильтрации
                let filteredTasks = tasks[tl.id];
                if (tl.filter === 'completed') {
                    filteredTasks = filteredTasks.filter(t => t.isDone);
                }
                if (tl.filter === 'active') {
                    filteredTasks = filteredTasks.filter(t => !t.isDone);
                }
                return <TodoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    filteredTasks={filteredTasks}
                    removeTask={removeTask}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={tl.filter}
                    changeFilter={changeFilter}
                    removeTodolist={removeTodolist}
                />
            })}
        </div>
    );
}