import {
    addTodolistAC,
    changeFilterAC,
    FilterValuesType,
    removeTodolistAC,
    TodolistDomainType,
    todolistReducer,
    updateTodolistAC
} from './todolist-reducer';
import {v1} from 'uuid';

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistReducer(startState, removeTodolistAC({todolistId:todolistId1}))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = {
        id: "blabla",
        title: "New Todolist",
        order: 0,
        addedDate: ''
    };

    const endState = todolistReducer(startState, addTodolistAC({item:newTodolistTitle}))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle.title);
    expect(endState[0].filter).toBe('all');
});

test('correct todolist should change its name', () => {

    let newTitle = "New Todolist";

    const endState = todolistReducer(startState, updateTodolistAC({todolistId:todolistId2, title:newTitle}));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const endState = todolistReducer(startState, changeFilterAC({value:newFilter, todolistId:todolistId2}));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
