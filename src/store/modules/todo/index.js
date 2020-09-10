// action types
export const TODO_ADDITION = `TODO/ADDITION`;
export const TODO_ALL_COMPLETE = `TODO/ALL_COMPLETE`;
export const TODO_COMPLETE = `TODO/COMPLETE`;
export const TODO_INCOMPLETE = `TODO/INCOMPLETE`;
export const TODO_DELETE = `TODO/DELETE`;
export const TODO_CHANGE_FILTER = `TODO/CHANGE_FILTER`;
export const TODO_All_CHECKED_TOGGLE = `TODO/TODO_All_CHECKED_TOGGLE`;
export const TODO_CLEAR_COMPLETE = `TODO/TODO_CLEAR_COMPLETE`;
export const TODO_EDITING = `TODO/EDITING`;
export const TODO_MODIFIED = `TODO/MODIFIED`;

// action creator function
export const additionAction = todoItem => ({type: TODO_ADDITION, payload: {todoItem}});
export const allCompleteAction = () => ({type: TODO_ALL_COMPLETE, payload: null});
export const completeAction = todoItemIndex => ({type: TODO_COMPLETE, payload: {todoItemIndex}});
export const incompleteAction = todoItemIndex => ({type: TODO_INCOMPLETE, payload: {todoItemIndex}});
export const deleteAction = todoItemIndex => ({type: TODO_DELETE, payload: {todoItemIndex}});
export const editingAction = todoItemIndex => ({type: TODO_EDITING, payload: {todoItemIndex}});
export const modifiedAction = modifiedDescription => ({type: TODO_MODIFIED, payload: {modifiedDescription}});
export const changeFilterAction = (targetFilter) => ({type: TODO_CHANGE_FILTER, payload: {targetFilter}});
export const toggleAllCheckedAction = () => ({type: TODO_All_CHECKED_TOGGLE, payload: null});
export const clearCompleteAction = () => ({type: TODO_CLEAR_COMPLETE, payload: null});


// state
const initialState = {
    todoItems: [],
    editItem : {},
    actionFilter: {
        all: true,
        active: false,
        complete: false,
    },
    todoAllChecked: false,
};

// reducer
const reducer = (state = initialState, action) => {

    const todoItemsArray = [...state.todoItems];

    switch (action.type) {

        case TODO_ADDITION :
            todoItemsArray.unshift({...action.payload.todoItem});
            return {
                ...state,
                todoItems: todoItemsArray
            }

        case TODO_ALL_COMPLETE :
            const resultTodoItemsArray = todoItemsArray.map(item => {
                item.isComplete = true;
                return item;
            });
            return {
                ...state,
                todoItems: resultTodoItemsArray,
                todoAllChecked: true,
            }

        case TODO_COMPLETE :
            todoItemsArray[action.payload.todoItemIndex] = {
                ...todoItemsArray[action.payload.todoItemIndex],
                isComplete: true
            };
            return {
                ...state,
                todoItems: todoItemsArray
            }

        case TODO_INCOMPLETE :
            todoItemsArray[action.payload.todoItemIndex] = {
                ...todoItemsArray[action.payload.todoItemIndex],
                isComplete: false
            };
            return {
                ...state,
                todoItems: todoItemsArray
            }

        case TODO_DELETE :
            return {
                ...state,
                todoItems: todoItemsArray.filter((item, index) => index !== action.payload.todoItemIndex)
            }

        case TODO_EDITING :
            todoItemsArray[action.payload.todoItemIndex] = {
                ...todoItemsArray[action.payload.todoItemIndex],
                isEditing: true
            };
            return {
                ...state,
                todoItems: todoItemsArray,
                editItem : {...todoItemsArray[action.payload.todoItemIndex]}
            }

        case TODO_MODIFIED :
            const targetTodoItemIndex = todoItemsArray.findIndex(item => item.isEditing);
            const targetTodoItemObj = {...todoItemsArray[targetTodoItemIndex]};
            targetTodoItemObj.description = action.payload.modifiedDescription;
            targetTodoItemObj.isEditing = false;
            todoItemsArray[targetTodoItemIndex] = targetTodoItemObj;
            return {
                ...state,
                todoItems: todoItemsArray,
                editItem : {}
            }

        case TODO_CHANGE_FILTER :
            return {
                ...state,
                actionFilter: action.payload.targetFilter
            }

        case TODO_All_CHECKED_TOGGLE :
            return {
                ...state,
                todoAllChecked: !state.todoAllChecked
            }

        case TODO_CLEAR_COMPLETE :

            return {
                ...state,
                todoItems: todoItemsArray.filter(item => !item.isComplete)
            }

        default :
            return state

    }

};

export default reducer
