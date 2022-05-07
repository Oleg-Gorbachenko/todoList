import React, {ChangeEvent} from 'react';
import {TaskStatuses} from "../api/todolist-api";

type CheckBoxPropsType = {
    isDone: boolean
    callBack: (status: TaskStatuses) => void
}

export const CheckBox = (props: CheckBoxPropsType) => {
    const callBackHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = event.currentTarget.checked

        props.callBack(newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)
    }

    return (
        <input type="checkbox"
               checked={props.isDone}
               onChange={callBackHandler}/>
    );
}

