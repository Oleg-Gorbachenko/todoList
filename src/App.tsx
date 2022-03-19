import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Components/Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm";
import ButtonAppBar from "./Components/ButtonAppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {
    addNewTasksArrayAC,
    addTaskAC,
    changeStatusAC,
    removeTaskAC,
    returnTasksArrayAC,
    tasksReducers,
    updateTaskAC
} from "./reducers/tasksReducers";
import {
    addTodolistAC,
    changeFilterAC,
    removeTodolistAC,
    todolistReducers,
    updateTodolistAC
} from "./reducers/todolistReducers";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}

export function App() {
    const todoListId1 = v1()
    const todoListId2 = v1()
    //хуки
    const [todoLists, todoListsDispatch] = useReducer(todolistReducers, [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])
    const [tasks, tasksDispatch] = useReducer(tasksReducers, {
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
        const newTaskID = v1()
        tasksDispatch(addTaskAC(title, todolistId, newTaskID))
    }
    const removeTask = (id: string, todolistId: string) => {
        tasksDispatch(removeTaskAC(id, todolistId))
    }
    const updateTask = (todolistId: string, id: string, updateTitle: string) => {
        tasksDispatch(updateTaskAC(todolistId, id, updateTitle))
    }
    const changeStatus = (checked: boolean, taskId: string, todolistId: string) => {
        tasksDispatch(changeStatusAC(checked, taskId, todolistId))
    }
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        todoListsDispatch(changeFilterAC(value, todolistId))
    }
    const removeTodolist = (todolistId: string) => {
        todoListsDispatch(removeTodolistAC(todolistId))
        delete tasks[todolistId]
        tasksDispatch(returnTasksArrayAC())
    }
    const addTodolist = (title: string) => {
        let newTodolistID = v1()
        todoListsDispatch(addTodolistAC(title, newTodolistID))
        tasksDispatch(addNewTasksArrayAC(newTodolistID))
    }
    const updateTodolist = (todolistId: string, title: string) => {
        todoListsDispatch(updateTodolistAC(todolistId, title))
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