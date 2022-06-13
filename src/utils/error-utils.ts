import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../reducers/app-reducer";
import {ResponseType} from "../api/todolist-api";

export const handleServerNetworkError = (dispatch: Dispatch, message: string) => {
    dispatch(setAppErrorAC({error: message}))
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    if (data.messages) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'some error occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}