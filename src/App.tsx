import React, {useCallback, useEffect} from "react";
import './App.css';
import {Todolist} from "./сomponents/Todolist";
import {AddItemForm} from "./сomponents/AddItemForm";
import ButtonAppBar from "./сomponents/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {addTaskAC} from "./reducers/tasks-reducer";
import {
    addTodolistAC,
    changeFilterAC,
    FilterValuesType,
    removeTodolistAC,
    setTodosAC,
    TodolistDomainType,
    updateTodolistAC
} from "./reducers/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType, todolistsAPI} from "./api/todolist-api";

export type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}

export function App() {
    //хуки

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodosAC(res.data))
            })
    }, [])

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const dispatch = useDispatch()

    //функции
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeFilterAC(value, todolistId))
    }, [dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])
    const updateTodolist = useCallback((todolistId: string, title: string) => {
        dispatch(updateTodolistAC(todolistId, title))
    }, [dispatch])

    return (
        <div>
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map((tl) => {
                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}} elevation={6}>
                                <Todolist
                                    todolistId={tl.id}
                                    title={tl.title}
                                    tasks={tasks[tl.id]}
                                    addTask={addTask}
                                    filter={tl.filter}
                                    changeFilter={changeFilter}
                                    removeTodolist={removeTodolist}
                                    updateTodolist={updateTodolist}
                                /></Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}