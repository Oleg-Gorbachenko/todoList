import {v1} from 'uuid';
import {TasksStateType} from '../App';
import {addTaskAC, changeStatusAC, removeTaskAC, tasksReducers, updateTaskAC} from "./tasksReducers";

test('correct task should be removed', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const startState: TasksStateType = {
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
    }
    const taskID = startState[todoListId1][0].id

    const endState = tasksReducers(startState, removeTaskAC(taskID, todoListId1))

    expect(endState[todoListId1].length).toBe(3);
    expect(endState[todoListId1][0].title).toBe('JS');
});

test('correct task should be added', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const startState: TasksStateType = {
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
    }
    const newTodolistTitle = "Jest";
    const taskID = v1()
    const endState = tasksReducers(startState, addTaskAC(newTodolistTitle, todoListId1, taskID))

    expect(endState[todoListId1].length).toBe(5);
    expect(endState[todoListId1][0].title).toBe(newTodolistTitle);
});

test('correct task should change its name', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    let newTitle = "Redux Toolkit";


    const startState: TasksStateType = {
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
    }
    const taskID = startState[todoListId1][1].id
    const endState = tasksReducers(startState, updateTaskAC(todoListId1, taskID, newTitle));

    expect(endState[todoListId1][0].title).toBe('HTML&CSS');
    expect(endState[todoListId1][1].title).toBe(newTitle);
});

test('correct filter of task should be changed', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()


    let newIsDone: boolean = false;

    const startState: TasksStateType = {
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
    }
    const taskID = startState[todoListId1][1].id
    const endState = tasksReducers(startState, changeStatusAC(newIsDone, taskID, todoListId1,));

    expect(endState[todoListId1][0].isDone).toBe(true);
    expect(endState[todoListId1][1].isDone).toBe(newIsDone);
});
