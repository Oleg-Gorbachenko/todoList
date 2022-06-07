import {TasksStateType} from '../App';
import {tasksReducer} from "./tasks-reducer";
import {addTodolistAC, TodolistDomainType, todolistReducer} from "./todolist-reducer";
import {TodolistType} from "../api/todolist-api";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    let todolist: TodolistType = {
        id: "blabla",
        title: "new todolist",
        order: 0,
        addedDate: ''
    };
    const action = addTodolistAC({item:todolist});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.item.id);
    expect(idFromTodolists).toBe(action.payload.item.id);
    expect(idFromTodolists).toBe(idFromTasks);
});
