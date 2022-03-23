import {
    addTodolistAC,
    updateTodolistAC,
    changeFilterAC,
    removeTodolistAC,
    todolistReducers
} from './todolistReducers';
import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../App';

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducers(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    let newTodolistTitle = "New Todolist";
    let newTodolistId = v1();

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducers(startState, addTodolistAC(newTodolistTitle,newTodolistId))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    let newTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducers(startState, updateTodolistAC(todoListId2, newTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducers(startState, changeFilterAC(newFilter,todolistId2,));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
