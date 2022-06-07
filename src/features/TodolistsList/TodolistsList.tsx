import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../сomponents/AddItemForm";
import {Todolist} from "../../сomponents/Todolist";
import {
    changeFilterAC,
    createTodolistThunkTC,
    deleteTodolistThunkTC,
    fetchTodolistsTC,
    FilterValuesType,
    TodolistDomainType,
    updateTodolistThunkTC
} from "../../reducers/todolist-reducer";
import {useAppSelector} from "../../state/store";
import {useDispatch} from "react-redux";
import {createTaskTC} from "../../reducers/tasks-reducer";
import {TasksStateType} from "../../App";
import {useNavigate} from "react-router-dom";

export const TodolistsList = () => {
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const todoLists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchTodolistsTC())
        } else {
            navigate('login')
        }
    }, [isLoggedIn])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(createTaskTC(todolistId, title))
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeFilterAC({value, todolistId}))
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
        <>
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
        </>
    );
};
