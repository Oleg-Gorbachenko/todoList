import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./Components/todoList/TodoList";
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'

export function App() {
    let [filter, setFilter] = useState<FilterValuesType>('all')
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])

    const addTask = (title:string) => {
       let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

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
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}