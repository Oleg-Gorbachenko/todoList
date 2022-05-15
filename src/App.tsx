import React, {useCallback, useEffect} from "react";
import './App.css';
import {Todolist} from "./сomponents/Todolist";
import {AddItemForm} from "./сomponents/AddItemForm";
import ButtonAppBar from "./сomponents/ButtonAppBar";
import {Container, Grid, LinearProgress, Paper} from "@mui/material";
import {createTaskTC} from "./reducers/tasks-reducer";
import {
    changeFilterAC,
    createTodolistThunkTC,
    deleteTodolistThunkTC,
    fetchTodolistsTC,
    FilterValuesType,
    TodolistDomainType,
    updateTodolistThunkTC
} from "./reducers/todolist-reducer";
import {useDispatch} from "react-redux";
import {useAppSelector} from "./state/store";
import {TaskType} from "./api/todolist-api";
import {RequestStatusType} from "./reducers/app-reducer";
import {ErrorSnackbar} from "./сomponents/ErrorSnackbar";

export type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}

export function App() {
    //хуки
    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const todoLists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    // const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    const dispatch = useDispatch()

    //функции
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(createTaskTC(todolistId, title))
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeFilterAC(value, todolistId))
    }, [dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistThunkTC(todolistId))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistThunkTC(title))
    }, [dispatch])
    const updateTodolist = useCallback((todolistId: string, title: string) => {
        dispatch(updateTodolistThunkTC(todolistId, title))
    }, [dispatch])

    return (
        <div>
            <ButtonAppBar/>
            {status === 'loading' && <LinearProgress/>}
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map((tl) => {
                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}} elevation={6}>
                                <Todolist
                                    entityStatus={tl.entityStatus}
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
            <ErrorSnackbar/>
        </div>
    );
}