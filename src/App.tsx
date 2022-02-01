import React from 'react';
import './App.css';
import {TodoList} from "./Components/todoList/TodoList";

function App() {
    const task1=[
        {id:1, title:'HTML&CSS', isDone:false},
        {id:2, title:'JS', isDone:true},
        {id:3, title:'React', isDone:false},
    ]

    const task2=[
        {id:1, title:'Hello world', isDone:true},
        {id:2, title:'I am Happy', isDone:false},
        {id:3, title:'Yo', isDone:true},
    ]
    return (
        <div className = "App">
            <TodoList title={'What to learn1 '} tasks={task1}/>
            <TodoList title={'What to learn2 '} tasks={task2}/>

        </div>

    );
}

export default App;
