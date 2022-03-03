import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Components/TodoList";
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'

export function App() {
    //хуки
    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])
    let [filter, setFilter] = useState<FilterValuesType>('all')
    //функции
    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }
    const changeStatus = (checked: boolean, taskId: string) => {
        setTasks(tasks.map(el => el.id === taskId ? {...el, isDone: checked} : el))
    }
    //условие фильтрации
    let filteredTasks = tasks;
    if (filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone);
    }
    if (filter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone);
    }
    return (
        <div className="App">
            <TodoList title={'What to learn1'}
                      filteredTasks={filteredTasks}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filter={filter}
                      setFilter={setFilter}
            />
        </div>
    );
}