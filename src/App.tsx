import React from 'react';
import './App.css';
import {TodoList} from "./Components/todoList/TodoList";

function App() {
    let arrForTodolist1=[
        {id:1, title:'HTML&CSS', isDone:false},
        {id:2, title:'JS', isDone:true},
        {id:3, title:'React', isDone:false},
    ]

    let arrForTodolist2=[
        {id:1, title:'HTML&CSS2222', isDone:true},
        {id:2, title:'JS2222', isDone:false},
        {id:3, title:'React222', isDone:true},
    ]
    return (
        <div className = "App">
            <TodoList ogyrce={'What to learn1 '} arrForTodolist1={arrForTodolist1}/>
            <TodoList pomidorki={'What to learn2 '} arrForTodolist1={arrForTodolist2}/>

        </div>

    );
}

export default App;
