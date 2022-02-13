import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./Components/todoList/TodoList";

export type FilterValuesType = 'all' | 'active' | 'completed'

export function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ])

    let [filter, setFilter] = useState<FilterValuesType>('all')

    let removeTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    function changeFilter(value: FilterValuesType) {
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
            />
        </div>
    );
}