import React, {ChangeEvent} from 'react';

type CheckBoxPropsType = {
    isDone: boolean
    callBack: (checked: boolean) => void
}

export const CheckBox = (props: CheckBoxPropsType) => {
    const callBackHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callBack(event.currentTarget.checked)
    }
    return (
        <>
            <input type="checkbox"
                   checked={props.isDone}
                   onChange={callBackHandler}/>
        </>
    );
};

