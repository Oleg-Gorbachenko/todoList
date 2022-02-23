import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./Components/TodoList";
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'

export function App() {
    //хуки
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])

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

    return (
        <div className="App">
            <TodoList title={'What to learn1'}
                      tasks={tasks}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeStatus={changeStatus}
            />
        </div>
    );
}