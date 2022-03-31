import {TasksStateType} from '../App';
import {addTaskAC, changeStatusAC, removeTaskAC, tasksReducers, updateTaskAC} from "./tasksReducers";

test('correct task should be removed', () => {


    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
        ],
        'todoListId2': [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Bread', isDone: true},
            {id: '3', title: 'Apples', isDone: false},
            {id: '4', title: 'Chocolate', isDone: false},
        ]
    }

    const endState = tasksReducers(startState, removeTaskAC('1', 'todoListId1'))

    expect(endState['todoListId1'].length).toBe(3);
    expect(endState['todoListId1'][0].title).toBe('JS');
});

test('correct task should be added', () => {

    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
        ],
        'todoListId2': [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Bread', isDone: true},
            {id: '3', title: 'Apples', isDone: false},
            {id: '4', title: 'Chocolate', isDone: false},
        ]
    }
    const newTodolistTitle = "Jest";
    const endState = tasksReducers(startState, addTaskAC(newTodolistTitle, 'todoListId1', '5'))

    expect(endState['todoListId1'].length).toBe(5);
    expect(endState['todoListId1'][0].title).toBe(newTodolistTitle);
});

test('correct task should change its name', () => {

    let newTitle = "Redux Toolkit";

    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
        ],
        'todoListId2': [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Bread', isDone: true},
            {id: '3', title: 'Apples', isDone: false},
            {id: '4', title: 'Chocolate', isDone: false},
        ]
    }

    const endState = tasksReducers(startState, updateTaskAC('todoListId1', '2', newTitle));

    expect(endState['todoListId1'][0].title).toBe('HTML&CSS');
    expect(endState['todoListId1'][1].title).toBe(newTitle);
});

test('correct filter of task should be changed', () => {

    let newIsDone: boolean = false;

    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
        ],
        'todoListId2': [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Bread', isDone: true},
            {id: '3', title: 'Apples', isDone: false},
            {id: '4', title: 'Chocolate', isDone: false},
        ]
    }

    const endState = tasksReducers(startState, changeStatusAC(newIsDone, '2', 'todoListId1',));

    expect(endState['todoListId1'][0].isDone).toBe(true);
    expect(endState['todoListId1'][1].isDone).toBe(newIsDone);
});
