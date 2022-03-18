import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Components/Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm";
import ButtonAppBar from "./Components/ButtonAppBar";
import {Container, Grid, Paper} from "@material-ui/core";

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todolistId: string]: Array<TaskType>
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
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const removeTask = (id: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)})
    }
    const updateTask = (todolistId: string, id: string, updateTitle: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, title: updateTitle} : t)})
    }
    const changeStatus = (checked: boolean, taskId: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: checked} : el)
        })
    }
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
    }
    const removeTodolist = (todolistId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const addTodolist = (title: string) => {
        let newTodolistID = v1()
        let newTodolist: TodoListType = {id: newTodolistID, title, filter: 'all'}
        setTodoLists([newTodolist, ...todoLists])
        setTasks({...tasks, [newTodolistID]: []})
    }
    const updateTodolist = (todolistId: string, title: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }

    return (
        <div>
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map((tl) => {
                        //условие фильтрации
                        let filteredTasks = tasks[tl.id];
                        if (tl.filter === 'completed') {
                            filteredTasks = filteredTasks.filter(t => t.isDone);
                        }
                        if (tl.filter === 'active') {
                            filteredTasks = filteredTasks.filter(t => !t.isDone);
                        }
                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}} elevation={6}>
                                <Todolist
                                    todolistId={tl.id}
                                    title={tl.title}
                                    filteredTasks={filteredTasks}
                                    removeTask={removeTask}
                                    addTask={addTask}
                                    changeStatus={changeStatus}
                                    filter={tl.filter}
                                    changeFilter={changeFilter}
                                    removeTodolist={removeTodolist}
                                    updateTask={updateTask}
                                    updateTodolist={updateTodolist}
                                /></Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}