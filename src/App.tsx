import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./сomponents/Todolist";
import {AddItemForm} from "./сomponents/AddItemForm";
import ButtonAppBar from "./сomponents/ButtonAppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskAC} from "./reducers/tasks-reducer";
import {addTodolistAC, changeFilterAC, removeTodolistAC, updateTodolistAC} from "./reducers/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}

export function App() {
    //хуки
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    const dispatch = useDispatch()

    //функции
    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }
    const removeTask = (id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    }
    const updateTask = (todolistId: string, id: string, updateTitle: string) => {
        dispatch(updateTaskAC(todolistId, id, updateTitle))
    }
    const changeStatus = (checked: boolean, taskId: string, todolistId: string) => {
        dispatch(changeTaskStatusAC(checked, taskId, todolistId))
    }
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        dispatch(changeFilterAC(value, todolistId))
    }
    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }
    const updateTodolist = (todolistId: string, title: string) => {
        dispatch(updateTodolistAC(todolistId, title))
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