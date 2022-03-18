import React from "react";
import {Button} from "@material-ui/core";

type ButtonPropsType = {
    callBack: () => void
}

export const ButtonComponent = (props: ButtonPropsType) => {
    const onClickAddButton = () => {
        props.callBack()
    }
    return (
        <>
            <Button onClick={onClickAddButton}
                    variant="contained"
                    size="small"
                    sx={{maxWidth:'40px',maxHeight:'40px',minWidth:'40px',minHeight:'40px'}}
            >+</Button>
        </>
    )
}