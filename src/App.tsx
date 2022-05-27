import React, {useEffect} from "react";
import './App.css';
import ButtonAppBar from "./сomponents/ButtonAppBar";
import {CircularProgress, Container, LinearProgress} from "@mui/material";
import {TaskType} from "./api/todolist-api";
import {ErrorSnackbar} from "./сomponents/ErrorSnackbar";
import {Login} from "./features/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {TodolistsList} from "./features/TodolistsList/TodolistsList";
import {useAppSelector} from "./state/store";
import {initializeAppTC, RequestStatusType} from "./reducers/app-reducer";
import {useDispatch} from "react-redux";

export type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}

export function App() {
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div>
            <ButtonAppBar/>
            {status === 'loading' && <LinearProgress/>}
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodolistsList/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="404" element={<h1 style={{textAlign: 'center'}}>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to="404"/>}/>
                </Routes>
            </Container>
            <ErrorSnackbar/>
        </div>
    )
}
